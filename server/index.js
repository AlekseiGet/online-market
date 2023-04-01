require('dotenv').config()//для того чтобы сервер мог считывать это файл
const express = require('express')
const sequelize = require('c:/Users/batma/Desktop/React/online-store/server/db')
const fileUpLoad = require('express-fileupload') // установить нужно npm i express-fileupload
const models = require('c:/Users/batma/Desktop/React/online-store/server/models/models') //подключаю всю базу при запущенном PG Admin4
const cors = require('cors')// настраиваю cors чтобы отправлять запросы
const router = require('c:/Users/batma/Desktop/React/online-store/server/routes/index')  //подключил роутер
const errorHandLer = require('c:/Users/batma/Desktop/React/online-store/server/middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000  // забираю PORT из переменных окружения
const app = express()

app.use(cors())
app.use(express.json()) // чтобы приложение могло парсить json формат
app.use(express.static(path.resolve(__dirname, "static")))// указать серверу что файлы из папки static раздавать как статику
app.use(fileUpLoad({})) // передаём пустой объект с опциями
app.use('/api', router)
/* 
//создаю первый get метод а потом удалил
app.get('/', (req, res) => {
    res.status(200).json({message: 'WORKING !!!'} )//200 значит запрос обработан правильно
} )
*/



/*мидлвеар который работает с ошибками ОБЯЗАТЕЛЬНО должен быть в конце
Этот является замыкающим и поэтому внутри него не вызываем функцию next
и на нем работа прекращается и вертаем на клиент ответ
*/
app.use(errorHandLer)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()//сверяет состояние базы данных со схемой 11.25
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        alert(`${e} server/index.js не стартанул Postgress`)
    }
}

start()
 
// время 1.10 переход к фронту
/* в терминале cd server -вошел в папку
               npm run dev - запустил скрипт
    запустил программу pgAdmin 4  пароль "give_me_your_money" 
    в браузере запустил   https://app.diagrams.net/ и открыл файл 123123
    запустил программу Postman (время 25.15 ) 
    
    55 минута утановка модулей  для VSC
    npm i jsonwebtoken  - для генерации токена
    npm i bcrypt  - для хешиирования паролей и не хранить их в базе данных
    https://jwt.io/ декодировщик токенов    
 */ 
