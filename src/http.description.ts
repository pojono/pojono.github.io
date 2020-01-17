const HTTP_CODE_DESCRIPTION: string = `

Поля, присутствующие во всех ответах сервера:

    success: BOOLEAN,
    timestamp: DATETIME,
    requestId: STRING,
    statusCode: NUMBER,

Для различных statusCode будут отправлены дополнительные поля:

    statusCode = 200 | 201
    
      data - содержит запрашиваемую информацию или NULL
    
    statusCode = 400 | 401 | 500 | >1000
    
      error - содержит информацию об ошибке (STRING)
    
    statusCode = 400 && error = 'Validation Error' 
    
      message - содержит информацию о валидации (ARRAY)

Далее описаны все возможные statusCode:
      
    200. OK
    201. Created
    400. Validation Error
    401. Unauthorized
    500. Internal Server Error      
  `;

export default HTTP_CODE_DESCRIPTION;
