module.exports = {
  server: {
    port: 3001,
    url: 'http://localhost:3001',
  },
  logs: {
    showHeaders: false,
  },
  jwt: {
    expiresIn: 3600000,
    secret: 'TopSecret',
  },
  swagger: {
    enable: true,
    path: 'swagger',
    scheme: 'http',
  },
  db: {
    migrations: ['./src/infrastructure/database/typeorm/migrations/*.ts'],
    migrationsDir: './src/infrastructure/database/typeorm/migrations/',
    logging: false,
  },
  sms: {
    minRepeatTime: 60000,
    codeLifetime: 5 * 60000,
    notRandom: '1234',
    useCognito: false,
    phoneWithoutSms: '73141592653',
    codeWithoutSms: '0112',
  },
  picture: {
    width: 256,
  },
  daysForNewBadge: 7,
  sessionIdleDuration: 10,
  iap: {
    androidPackageName: 'com.prostoapp',
    googleServiceAccountEmail:
      'receipt-validation@api-7666775156156181384-601301.iam.gserviceaccount.com',
    googleServiceAccountPrivateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKQE/+ssDc04zC\nXevu6bMFQ4/EJHdjsDiqUGYTvJcy1Q67Hbp9IJSDGXK0oa6uZ88+IhiNPg524E/v\nJIbacQHTQyBUis1LLoLlSWNvNviafi6Ai8mv9/1n6B4ktGi9QsTpFhu48Dal4WST\nbXsg4YpffkMmuhPNGb1V+qDEf+NlokgMCFTt4l20hdUi1MP1KVs9efZrjHllZjuZ\nQ9nL+6xUaLh1R6J5Wq2VUFXXKx6MeAx6c57ahCXSUvUOANd5LHQ8eV+G6yn1SV7e\n2u61y0+I6bGTfPDTJ8kNKLz/m0HxONY5RIX75GcnfhA1R/Uqz1IszM69kPcjE1nD\nkDsmLrExAgMBAAECggEAAyIF+OoCJ3BmL1K6V1bmMMOl521MwNusD+TBAJvDpfZ2\n/0XOJwuLeWLVou2YFkpPlcTFXmApmtbgCYkdRvAIaT2t6llXE2c9JXnilZrVxzoD\nOS3jcOAeyeDdamJaUkfqGigRjO/v7MWGEaK0VlEEpSuJfhx5JLEn1/wlNlBM+bOQ\n9NVNU/pYfX8FgKXFFQ/z2b3M4o036mNiiTHiMl2mkEGMsUzf/1/Q5vuoaRz9L9Fa\nbH/7Epb14ddsy4S1jWVoWNwJ0MEK0gA8+nsQvHlLDt+0B1Dp/iUewXYpwWCOj3Uk\n+XwiCNResxFtS/U5/lTUB37FhWCcwU1xOnJ/e4fdRQKBgQDsRP2ATUBfzXS46cFS\nnIi61kVzgkv56eA3yhHwWcdpg3Yz2y/pJ7Q6v85PCsDJhgGpBrSPLRD3VJU2A7I3\nGhW8EfcX/+y53pq0YPwzRcTIJ2LXS653exnxdqKcDQGgC8dKyKAf0YJEtz5Zr631\nOq7C3XNA+i6o3liAwxs5ZhJypQKBgQDbJBLi7kIQ9qdOZg5ZsX3NwRfysBc/wUyq\nL96NHXoIEMgO0jzvLQrJ2R9Kt7Vgd30XV5TEnte010Zl9OYAiiX1o0Pr83bCZNvm\nbS36B45AqJUdshpIMQUarBic+GS1wE314NBTg6ZCPu9wbdHHM98Vi9TTcTt0ruYR\nxwWSx0E6nQKBgBXDoSpxc02f6nGiLsnCW6ICXPFv/jmuPpZFCfP/ASyKDJhoR3iN\nzL9grcuALRQjQQHl+Tn7J8Xwx7HrEz6aK4hgi0dtrsvMYqndCT5b3e2mGyfD8/VT\npKcmi4IefJjWnOwZoQ5tSTe1PYwbb8XYOwL+TUCeCzBJExQBZP+blHV1AoGAG56c\nUsW8xe6Qf60VOfDI7lnb7taK15pBU2HdJuQEMWgMDvIog+ylY3NeIkitL49f0MVV\nFsL+ZOiNEuSe6IqA5kjBkseIvE+B97TjCpRRNY0J3khIT7j977KpF3+nEdE/AjJn\nj18UYV0VSJJO0lCTWV/aXxvyZm50yODQrwM2EXECgYAjjLz4OXvUH+VOYz75Zbd8\nGGfSJQ1h8L3xnfL/ZCg/fd6wpGpgv7AtjCLIR/OUprKX72pK3+6Sb7/qLKkE1zkS\nYgVQUnbDpIwLGTpMjbNFENU/biZRUXd/9uxPDXVGy7yqEapiW7Up+acbJVM9Ja3M\nxeM76kCoqmyp+L/KVrgbFQ==\n-----END PRIVATE KEY-----\n',
    appleSharedSecret: 'b66c14a5404944e0afbae43da689fb0e',
    testMode: true,
    debugLogs: true,
    checkingPeriod: 24 * 60, // minutes
  },
  telegram: {
    chatId: '-397651856',
    token: '972600463:AAEI9vGgLyPJbzfTxowAhwso_vym53A2i7Y',
  },
  load_testing: false,
  promocode: {
    discount: ['DEFAULT_DISCOUNT_CODE1', 'DEFAULT_DISCOUNT_CODE2'],
    trial: ['DEFAULT_TRIAL_CODE1', 'DEFAULT_TRIAL_CODE2'],
  },
};
