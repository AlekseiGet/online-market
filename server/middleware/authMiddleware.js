// здесь декодирую токен и проверяю его на валидность
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  
   if (req.method === "OPTIONS") {
      next()
   } 
   try {
    // токен обычно помещают в headers.authorization
      const token = req.headers.authorization.split(' ')[1] // по пробелу нужно два слова отлепить и по первому индексу получить сам токен
      if (!token) {// если токена нет то возвращаю ошибку
          return res.status(401).json({ message: "Не авторизован" })
      }
       const decoded = jwt.verify(token, process.env.SECRET_KEY )//.verify проверяет на валидность
       req.user = decoded //в поле user добавляем данные которые вытащили и во всех функциях он будет доступен
       next()
   } catch (e) {
     res.status(401).json({message: "Не авторизован"})
   }
}