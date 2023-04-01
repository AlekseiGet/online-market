const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.addDev)
router.get('/:id', basketController.getAll)
router.delete('/:id', basketController.delOne)

module.exports = router