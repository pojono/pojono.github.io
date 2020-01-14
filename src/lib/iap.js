'use strict';
const iap = require('in-app-purchase');
const moment = require('moment');
const { JWT } = require('google-auth-library');
const { google } = require('googleapis');

google.options({
  auth: new JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/androidpublisher'],
  ),
});

const androidGoogleApi = google.androidpublisher({ version: 'v3' });
const androidPackageName = process.env.ANDROID_PACKAGE_NAME;

iap.config({
  // If you want to exclude old transaction, set this to true. Default is false:
  appleExcludeOldTransactions: true,
  applePassword: process.env.APPLE_SHARED_SECRET,

  googleServiceAccount: {
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  },

  /* Configurations all platforms */
  test: process.env.IAP_TEST_MODE, // For Apple and Google Play to force Sandbox validation only
  verbose: true, // Output debug logs to stdout stream
});

async function getActiveSubscriptions() {
  return knex('subscriptions')
    .where('end_date', '>=', new Date())
    .where('fake', false)
    .select(['id', 'latest_receipt', 'user_id', 'app']);
}

async function updateSubscription({
  app,
  environment,
  origTxId,
  userId,
  validationResponse,
  latestReceipt,
  startDate,
  endDate,
  productId,
  isCancelled,
}) {
  const data = {
    app,
    environment,
    user_id: userId,
    orig_tx_id: origTxId,
    validation_response: JSON.stringify(validationResponse),
    latest_receipt: latestReceipt,
    start_date: startDate,
    end_date: endDate,
    product_id: productId,
    is_cancelled: isCancelled,
  };
  // find by user id and update
}

async function processPurchase(app, userId, receipt) {
  await iap.setup();
  const validationResponse = await iap.validate(receipt);

  // TODO: rewrite with my lib ErrorIf
  // assert(
  //     (app === 'android' && validationResponse.service === 'google') ||
  //     (app === 'ios' && validationResponse.service === 'apple'),
  // );

  const purchaseData = iap.getPurchaseData(validationResponse);
  const firstPurchaseItem = purchaseData[0];

  const isCancelled = iap.isCanceled(firstPurchaseItem);
  // const isExpired = iap.isExpired(firstPurchaseItem);
  const { productId } = firstPurchaseItem;
  const origTxId =
    app === 'ios'
      ? firstPurchaseItem.originalTransactionId
      : firstPurchaseItem.transactionId;
  const latestReceipt =
    app === 'ios' ? validationResponse.latest_receipt : JSON.stringify(receipt);
  const startDate =
    app === 'ios'
      ? new Date(firstPurchaseItem.originalPurchaseDateMs)
      : new Date(parseInt(firstPurchaseItem.startTimeMillis, 10));
  const endDate =
    app === 'ios'
      ? new Date(firstPurchaseItem.expiresDateMs)
      : new Date(parseInt(firstPurchaseItem.expiryTimeMillis, 10));

  let environment = '';
  // validationResponse contains sandbox: true/false for Apple and Amazon
  // Android we don't know if it was a sandbox account
  if (app === 'ios') {
    environment = validationResponse.sandbox ? 'sandbox' : 'production';
  }

  await updateSubscription({
    userId,
    app,
    environment,
    productId,
    origTxId,
    latestReceipt,
    validationResponse,
    startDate,
    endDate,
    isCancelled,
  });

  // From https://developer.android.com/google/play/billing/billing_library_overview:
  // You must acknowledge all purchases within three days.
  // Failure to properly acknowledge purchases results in those purchases being refunded.
  if (app === 'android' && validationResponse.acknowledgementState === 0) {
    await androidGoogleApi.purchases.subscriptions.acknowledge({
      packageName: androidPackageName,
      subscriptionId: productId,
      token: receipt.purchaseToken,
    });
  }
}

function checkIfHasSubscription(subscription) {
  if (!subscription) return false;
  if (subscription.isCancelled) return false;
  const nowMs = new Date().getTime();
  return (
    moment(subscription.startDate).valueOf() <= nowMs &&
    moment(subscription.endDate).valueOf() >= nowMs
  ); // TODO grace period?
}

/*
app.post(
    '/iap/save-receipt',
    asyncHandler(async (req, res) => {
        const { userId } = req;
        const { appType, purchase } = req.body;

        assert(['ios', 'android'].includes(appType));

        const receipt =
            appType === 'ios'
                ? purchase.transactionReceipt
                : {
                    packageName: androidPackageName,
                    productId: purchase.productId,
                    purchaseToken: purchase.purchaseToken,
                    subscription: true,
                };

        await processPurchase(appType, userId, receipt);
        res.end();
    }),
);
*/
setInterval(validateAllSubscriptions, 24 * 60 * 60 * 1000);

async function validateAllSubscriptions() {
  const subscriptions = await getActiveSubscriptions();
  for (const subscription of subscriptions) {
    try {
      if (subscription.app === 'ios') {
        await processPurchase(
          subscription.app,
          subscription.user_id,
          subscription.latest_receipt,
        );
      } else {
        await processPurchase(
          subscription.app,
          subscription.user_id,
          JSON.parse(subscription.latest_receipt),
        );
      }
    } catch (err) {
      console.error('Failed to validate subscription', subscription.id);
    }
  }
}
