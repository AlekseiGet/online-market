const uuid = require('uuid')// для генерации уникльного id установить пакет npm i uuid
const path = require('path')
const {Device, DeviceInfo, Rating} = require('../models/models')
const ApiError = require('../error/ApiError')

class DviceController {
    //создание в базу
    async create(req, res, next) {
        /**
         * resolve( адаптирует указаный путь к операционной системе
         * __dirname  путь до текущей папки  (controllers)
         * '..'  вернуться на диреторию назад
         * 'static'  куда 
         */
        try {
          let {name, price, brandId, typeId, info} = req.body;
          const {img} = req.files
          let fileName = uuid.v4() + ".jpg"  // функция сгенерирует уникальный id и добавить .jpg
          img.mv(path.resolve(__dirname, '..', 'static', fileName))//для перемещения файла в заданную папку 
          const device = await Device.create({ name, price, brandId, typeId,  img: fileName })

          if (info) {
            info = JSON.parse(info)// парсить массив для фронта
            info.forEach(i =>      //для каждого эллемента массива вызываю функцию create
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                })
                )
        } 
  
        return res.json(device)
        } catch (e) {
            return next (ApiError.badRequest(e.messsage))
        }

       
    }
    //получение по запросу 
    async getAll(req, res, next) {
        try {
            let {brandId, typeId, limit, page, sort} = req.query
            page = page || 1 // по умолчанию одна странца
            limit = limit || 9  //по умолчанию не больше 9
            let offset = page * limit - limit// отступ
            let devices;
         
            //Пусть многострочно зато можно быстро понять не взрывая мозг
               if (!brandId && !typeId) {
                   if (sort) {
                           if (sort == 1) { //по рейтингу

                               devices = await Device.findAndCountAll(
                                   {
                                       order: [['rating', 'DESC']], limit, offset
                                   },
                               )
                           }

                           if (sort == 2) { //цена от меньшей к большей

                               devices = await Device.findAndCountAll(
                                   {
                                       order: [['price',]], limit, offset
                                   },
                               )
                           }

                           if (sort == 3) { //цена от большей к меньшей

                               devices = await Device.findAndCountAll(
                                   {
                                       order: [['price', 'DESC']], limit, offset
                                   },
                               )
                           }
                   }else{
                    devices = await Device.findAndCountAll({limit, offset})
                   }
                     
               }
               if (brandId && !typeId ) {
                   if (sort) {
                       if (sort == 1) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { brandId },
                                   order: [['rating', 'DESC']], limit, offset
                               },
                           )
                       }

                       if (sort == 2) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { brandId },
                                   order: [['price',]], limit, offset
                               },
                           )
                       }

                       if (sort == 3) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { brandId },
                                   order: [['price', 'DESC']], limit, offset
                               },
                           )
                       }
                   } else {
                    devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
                    }
                   
               }
               if (!brandId && typeId) {
                   if (sort) {
                       if (sort == 1) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId},
                                   order: [['rating', 'DESC']], limit, offset
                               },
                           )
                       }

                       if (sort == 2) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId},
                                   order: [['price',]], limit, offset
                               },
                           )
                       }

                       if (sort == 3) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId},
                                   order: [['price', 'DESC']], limit, offset
                               },
                           )
                       }
                   } else {
                    devices = await Device.findAndCountAll({ where: { typeId}, limit, offset })
                    }
                   
               }
               if (brandId && typeId) {
                   if (sort) {
                       if (sort == 1) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId, brandId },
                                   order: [['rating', 'DESC']], limit, offset
                               },
                           )
                       }

                       if (sort == 2) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId, brandId },
                                   order: [['price',]], limit, offset
                               },
                           )
                       }

                       if (sort == 3) {

                           devices = await Device.findAndCountAll(
                               {
                                   where: { typeId, brandId },
                                   order: [['price', 'DESC']], limit, offset
                               },
                           )
                       }
                   } else {
                    devices = await Device.findAndCountAll({ where: {typeId ,  brandId}, limit, offset })
                    }
                   
               }
                      
          return res.json(devices)
        } catch (e) {
           return next(ApiError.badRequest(e.messsage)) 
        }
        
    }

    //фунуция получения одного конкретного девайса по id устройства 
    async getOne(req, res, next) {
       
         try {
            const {id} = req.params 
            if (isNaN(id)) {           //если  в запросе строка
              
                 const name = id  // Для поиска по графе name
                const device = await Device.findAndCountAll(
                     {
                         where: { name },
                     },
                 )
                return res.json(device)
             
            } else {               //если число в запрсе
                 const device = await Device.findOne(
              {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
               },
                )
                return res.json(device)
            }
           
        } catch (e) {
            return next(ApiError.badRequest(e.messsage)) 
        }     
    }

    //функция удаления
    async delete(req, res, next) {
        const id = req.params.id//получаю из запроса id
        let devices;
        try {
            devices = await Device.sequelize.query(' DELETE FROM public.devices WHERE id = ?', {
                replacements: [id]
            })
            return res.json(devices)// был id
        } catch (e) {
            return next(ApiError.badRequest(e.messsage)) 
        }  
    }

    // Функция изменения рейтинга
      async replaceRating(req, res, next) {
        try {
           let { id, rating } = req.body 
            const user = await Device.sequelize.query(`UPDATE public.devices SET rating = ${rating} WHERE id = ?`, { replacements: [id] })  
 
            return res.json(user)
            
        } catch (e) {
            return next(ApiError.badRequest(e.messsage)) 
        }
        
    }
  
}

module.exports = new DviceController()