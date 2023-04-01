// бАЗА ДАННЫХ
//импорртирую секвалайз и делаю реструктуризацию
const { Sequelize } = require('sequelize')
//на выходе экспортирую объект который создаём из этого класса

//Указываю конфигурацию
module.exports = new Sequelize(
   process.env.DB_NAME, //Название базы данных
   process.env.DB_USER, //Пользователь
   process.env.DB_PASSWORD, //Пароль тот что указал при запуске PG ADMIN 4
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
   )
