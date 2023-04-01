const ApiError = require('../error/ApiError')
const { Device, BasketDevice, DeviceInfo } = require('../models/models')

class BasketController {
    async addDev(req, res) {
        try {
              let { basketId, deviceId } = req.body;
              const basketItem = await BasketDevice.create({ basketId, deviceId })//создал объекты с id пользователя и id товара
          return res.json(basketItem)
        } catch (e) {
            
        }
      
     }

    async getAll(req, res) { 
       
        const basketId = req.params.id
        const basket = await BasketDevice.findAll(
            {
            where: {
                    basketId //по id пользователя нахожу все его товары         
            },
        })   
      
        let red = [];

        for (const iterator of basket) {//перебрал и вызвал для каждого товара функцию
             const black = await Device.findOne(
                    {
                        where:  iterator.deviceId ,
                        include: [{ model: DeviceInfo, as: 'info' }],
                    }
                )     
              black.info[0].deviceId =iterator.id //по нему я при удалении найду id удаляемого
             red.push(black) 
            }

        return res.json(red) 
    }

    async delOne(req, res) { 

        const id = req.params.id
        const basketItem = await BasketDevice.sequelize.query(' DELETE FROM public.basket_devices WHERE id = ?', { replacements: [id] })
        return res.json(basketItem)  
    }
};

module.exports = new BasketController();

