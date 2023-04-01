const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration)//функцию не вызываю а передаю как объект (через)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)//проверяет авторизован пользователь или нет
router.get('/', userController.getAll)
router.patch('/:id', userController.replaceRole)
/*
router.get('/auth', (req, res ) => {
    res.json({ message: 'ALL WORKING' })// по адрессу http://localhost:5000/api/user/auth  выведет это сообщение
})
*/


module.exports = router