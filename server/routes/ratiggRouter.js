const Router = require('express')
const router = new Router()
const retingController = require('../controllers/RatingController')


router.post('/', retingController.newRating)
router.get('/:id', retingController.getRating)

module.exports = router