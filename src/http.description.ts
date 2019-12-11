const HTTP_CODE_DESCRIPTION: string = `

HTTP STATUS: 200 и 201 - всё хорошо. В поле data может быть null, массив или запрашиваемый объект.
    "success": true,
    "timestamp": "2019-11-14T10:06:14.109Z",
    "data": null

HTTP STATUS: 400 - ошибка валидации. statusCode всегда 400.
    "statusCode": 400,
    "error": "Bad Request",
    "message": [ /* Подробное описание ошибки валидации */ ]

HTTP STATUS: 400 - неправильный запрос. Ниже список всех возможных ошибок.
    "statusCode": 1003,
    "error": "Sms request too often"

HTTP STATUS: 401 - неправильный Bearer токен.
    "statusCode": 401,
    "error": "Unauthorized"

HTTP STATUS: 500 - серверу плохо.
    "statusCode": 500,
    "message": "Internal server error"
  `;

export default HTTP_CODE_DESCRIPTION;
