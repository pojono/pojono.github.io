/* если сегодня то не меняем
   если вчера то +1
   если позавчера то 1

   вчера - это промежуток
   от начала текущего дня с поправкой на часовой пояс минус 24 часа
   до начала текущего дня с поправкой на часовой пояс
 */

const moment = require('moment');

function strike(currentDate, lastActivity, utcDiff) {
  // определить текущую дату в часовом поясе пользователя
  const todayDate = moment
    .utc(currentDate)
    .add(utcDiff, 'minutes')
    .startOf('day');

  // определить дату последней активности пользователя
  const lastActivityDate = moment
    .utc(lastActivity)
    .add(utcDiff, 'minutes')
    .startOf('day');

  // если даты совпадают - возвращаем 0
  return todayDate.diff(lastActivityDate, 'days');
}

function test(cases) {
  for (let case_ of cases) {
    const result = strike(case_.currentDate, case_.lastActivity, case_.utcDiff);
    console.log(case_.result === result);
    console.log(result);
  }
}

test([
  {
    currentDate: '2020-07-27 10:31:36',
    lastActivity: '2020-07-27 08:31:36',
    utcDiff: 0,
    result: 0,
  },
  {
    currentDate: '2020-07-27 00:31:36',
    lastActivity: '2020-07-26 23:59:36',
    utcDiff: 0,
    result: 1,
  },
  {
    currentDate: '2020-07-27 00:31:36',
    lastActivity: '2020-07-25 23:59:36',
    utcDiff: 0,
    result: 2,
  },
  {
    currentDate: '2020-07-29 01:31:36',
    lastActivity: '2020-07-28 20:31:36',
    utcDiff: -180,
    result: 1,
  },
  {
    currentDate: '2020-07-29 01:31:36',
    lastActivity: '2020-07-28 23:31:36',
    utcDiff: -180,
    result: 0,
  },
  {
    currentDate: '2020-07-28 23:31:36',
    lastActivity: '2020-07-27 20:59:36',
    utcDiff: -180,
    result: 2,
  },
]);
