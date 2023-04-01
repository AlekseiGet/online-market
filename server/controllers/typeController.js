const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');
const Sequelize = require('../db')


class TypeController {
    async create(req, res, next) {   
            try {
            const {name} = req.body // Здесь может быть косяк
                const type = await Type.create({name})
            return res.json(type)
          
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }
        
        
     
    }
    async getAll(req, res, next) { 
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (e) {
            next(ApiError.badRequest(e.messsage)) 
        }
    }
    async delete(req, res, next) {    
        try {
            const id =  req.params.id//получаю из запроса id
            const types = await Type.sequelize.query(' DELETE FROM public.types WHERE id = ?', {replacements: [id]})
            return res.json(types)    
        } catch (e) {
           next(ApiError.badRequest(e.messsage)) 
        }            
    }
    
}

module.exports = new TypeController()