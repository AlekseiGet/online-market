 const {Brand} = require('../models/models')
 const ApiError = require('../error/ApiError')
const Sequelize = require('../db')

class BrandController {
    async create(req, res, next) {
        try {
            const { name } = req.body // Здесь может быть косяк
                const brand = await Brand.create({ name })
            return res.json(brand)
            
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }       
    }
    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }
    }
    async delete(req, res, next) {     
        try {
            const id = req.params.id //получаю из запроса id
            const brands = await Brand.sequelize.query(' DELETE FROM public.brands WHERE id = ?', { replacements: [id] })
            return res.json(brands)
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }      
    }

}

module.exports = new BrandController()