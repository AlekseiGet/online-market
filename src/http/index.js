import axios from "axios";
 
// для обычных запросов которые не требуют авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Ккаждому запросу автоматически будет добавлять hadarAvtorisaition и подставляться токен
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


/** 
Функция которая парметром принимает config  и в поле headers.authorization добавляем токен
 который будем получать по локальному ключу
 При авторизации мы его будем добалять в локальное хранилище
*/
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')} `
    return config
}

$authHost.interceptors.request.use(authInterceptor)
/**
 * Будет подставлять токен перед каждым запросом в ХЕДЕРАВТОРИЗАШИН
 */
export {
    $host,
    $authHost,
  
}