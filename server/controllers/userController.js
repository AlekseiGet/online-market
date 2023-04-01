  const ApiError = require('../error/ApiError')
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken') //импортирую файл контроллера
  const {User, Basket} = require('../models/models')

  const generateJwt = (id, email, role) => {
      return jwt.sign(
          { id, email, role }, // передаю центральную часть jwt токена в которую будут вшиваться какие то данные, 
          process.env.SECRET_KEY, //второй параметр это секретный ключь 
          { expiresIn: '24h' }
      )
  }

  class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
           if (!email || !password) {
               return next(ApiError.badRequest('Некоректный email  или  password'))
           }

           const candidate =  await User.findOne({where: {email}})
                if (candidate) {
                    return next(ApiError.badRequest('Пользователь с таким email уже существует '))
                }

                const hashPassword = await bcrypt.hash(password, 5) // хеширование пароля и сколько раз
                const user = await User.create({email, role, password: hashPassword}) // создаю пользоватеря передаю емеил роль пароль передаю захешированым
            const basket = await Basket.create({ userId: user.id}) //создаю корзину и передаю туда id пользователя
                const token = generateJwt(user.id, user.email, user.role)//генерирую токен вызывая функцию 
                 return res.json({token}) // после того как token сгенерирован возвращаем его на клиент. время 1.00
             } catch (e) {
                 next(ApiError.badRequest(e.messsage)) 
             }
           
    }

    async login(req, res, next) {
        try {
               const { email, password } = req.body// из тела запроса получаю email, password
           const user = await User.findOne({where: {email}}) //убедиться что пользователь существует
           if (!user) {// если пользователь не найден возвр ошибку
               return next(ApiError.internal('Пользователь не найден') )
           }
           let comparePassword = bcrypt.compareSync(password, user.password)// .compareSync сравнивает пароли первый тот что написал пользователь, второй из базы данных
           if (!comparePassword) {
               return next(ApiError.internal('Указан неверный пароль'))  
           }
           const token = generateJwt(user.id, user.email, user.role)//генерирую токен вызывая функцию 
           return res.json({ token })
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }    
    }

    async check(req, res, next) { 
        /**   проверяет авторизован или нет
        вся функция сводится к тому чтобу генерировать новый токен и отправлять его обратно на клиент
         передаю все необходимые параметры в функцию
         */
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }
        
    }

      async getAll(req, res) {//находить всех пользователей с ролью АДМИН
        try {
            const users = await User.findAll({
              where: {
                  role: "ADMIN"
              }
            })
            return res.json(users)
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }         
      }
      
      async replaceRole(req, res, next) {//находить одного пользрвателя и меняю права на user      
          try {
              const id = req.params.id
              const user = await User.sequelize.query("UPDATE public.users SET role = 'USER' WHERE id = ?", { replacements: [id]})   //:: character varying приведение к типу оказалось ненужно          
              return res.json(user)
          } catch (e) {
              next(ApiError.badRequest(e.messsage)) 
          }          
      }
}

module.exports = new UserController()