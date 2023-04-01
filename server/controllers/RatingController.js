 
const uuid = require('uuid')// для генерации уникльного id установить пакет npm i uuid
const path = require('path')
const { Device, DeviceInfo, Rating } = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {
    async getRating(req, res, next) { // Получил все с оценками
        try {
             const id = req.params.id
        const ratimng = await Rating.findAll(// нахожу все по id
            {
                where: {
                    deviceId: id,
                }
            }
        )
            return res.json(ratimng)
        } catch (e) {
            return next(ApiError.badRequest(e.messsage)) 
        }
             
}
    
    async newRating(req, res, next) {  //Изменил оценку
        try {

             let { id, rating, userId } = req.body 
                 
             const checkUser = await Rating.findOne(// Проверка ставил ли уже оценку
                 {
                     where: {
                         userId: userId,
                         deviceId: id
                     }  
                 }
             )
      
            if (! checkUser){
                const ratimng = await Rating.create({
                   rate: rating,
                   userId: userId,
                   deviceId: id
                 })  
            return res.json(ratimng)
            }else{
              return res.json("Уже ставил оценку")
            }     
            
        } catch (e) {
            return ApiError.badRequest(e.messsage) 
        }
             
    }
}

module.exports = new RatingController()