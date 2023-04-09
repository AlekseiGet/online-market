const ApiError = require('../error/ApiError')
const { Device, BasketDevice, DeviceInfo } = require('../models/models')

class BasketController {
    async addDev(req, res) {//создал объекты с id пользователя и id товара
        try {
              let { basketId, deviceId } = req.body;
              const basketItem = await BasketDevice.create({ basketId, deviceId })
          return res.json(basketItem)
        } catch (e) {
          next(ApiError.badRequest(e.messsage)) 
        }
      
     }

    async getAll(req, res) { //по id пользователя нахожу все его товары 
       
        const basketId = req.params.id
        let red = [];
        const basket = await BasketDevice.findAll(
            {
            where: {
                    basketId         
            },
        }) 

       
     for (const iterator of basket) {//перебрал и вызвал для каждого товара функцию
         const black = await Device.findOne(
                   {
                       where:  iterator.deviceId ,
                   }
         ) 
         red.push(black)         
            }
         
        return res.json(red) 
    }

    async delOne(req, res) { // нахожу один экземпляр и если есть удаляю его
   
        let { basketId, deviceId } = req.query
      
         try {
           
            const row = await BasketDevice.findOne(
                {
                   where: { deviceId, basketId },
                });

            if (row) {
              await row.destroy(); 
              } 

            return res.json()
            
        } catch (error) {
             next(ApiError.badRequest(e.messsage))  
        }

  
    }
};

module.exports = new BasketController();

