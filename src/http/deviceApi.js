import { $authHost, $host } from "./index";

//запрос  $authHost
export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const deleteType = async (type) => {
    const { data } = await $authHost.delete('api/type/'+ type.id)    
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (brand) => {
    const { data } = await $authHost.delete('api/brand/' + brand.id)
    return data
}



export const createDevice = async (device) => {
    try {
        const { data } = await $authHost.post('api/device', device)
        return data
    } catch (e) {
        alert("Поля не заполнены!!!, Уже есть такой")
    }   
}

export const deleteDevice = async (device) => {
    const { data } = await $authHost.delete('api/device/' + device.id)
    return data
}



export const addBasketDevice = async (device) => { // Добавление в корзину
    const { data } = await $authHost.post('api/basket', device)
    return data
}


export const replaceRatingDevice = async (device) => { // Изменение рейтинга
    const { data } = await $authHost.patch('api/device', device)
    return data
}

export const creatRatingDevice = async (device) => { // Создание файла с данными рейтинга
    const { data } = await $authHost.post('api/rating', device)
    return data
}

export const fetchRatingDevice = async (id) => { // Получение всех объектов с данными рейтинга по id devace
    const { data } = await $host.get('api/rating/' + id)
    return data
}


export const fetchBasket = async (id) => { // Получаю ID всех device выбраных пользователем
  const { data } = await $host.get('api/basket/' + id)
    return data 
}


export const deleteOneDeviceInBasket = async (id) => {  //Удалить один девайс из корзины
    const { data } = await $authHost.delete('api/basket/' + id)
    return data
}



export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const fetchBrand = async () => {
    const { data } = await $host.get('api/brand' )
    return data
}

export const fetchDevice = async (typeId, brandId, page, limit = 5) => {//передал сюда typeId, brandId, page, limit по умолчанию равен 5
    const { data } = await $host.get('api/device', {
        params: {//в опциях можно эти параметры указать удобным для меня видом
            typeId, brandId, page, limit //они автоматически подставятся в строку запроса если переменная не пустая
        }
    })
    return data
}

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}