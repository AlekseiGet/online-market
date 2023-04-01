import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ERROR_ROUTE } from "./utils/consts.js"
import Admin from "./pages/Admin"
import Shop from "./pages/Shop"
import Auth from './pages/Auth'
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Error from "./pages/Error.jsx"


//Только для авторизованых пользователей
export const authRoutes = [
    {path: BASKET_ROUTE, Component: Basket},
    { path: SHOP_ROUTE, Component: Shop },
    { path: LOGIN_ROUTE, Component: Auth },
    { path: REGISTRATION_ROUTE, Component: Auth },
    { path: DEVICE_ROUTE + '/:id', Component: DevicePage },
    { path: ERROR_ROUTE, Component: Error }
]

//Для всех пользователей
export const publicRoutes = [
    {path: SHOP_ROUTE, Component: Shop},
    {path: LOGIN_ROUTE, Component: Auth },
    {path: REGISTRATION_ROUTE, Component: Auth},
    {path: DEVICE_ROUTE + '/:id' ,  Component: DevicePage },
    { path: ERROR_ROUTE, Component: Error }
  ]

  //Только для Админа
export const adminRoutes = [
    { path: ADMIN_ROUTE, Component: Admin },
    { path: ERROR_ROUTE, Component: Error },
    { path: SHOP_ROUTE, Component: Shop },
    { path: LOGIN_ROUTE, Component: Auth },
    { path: REGISTRATION_ROUTE, Component: Auth },
    { path: DEVICE_ROUTE + '/:id', Component: DevicePage }
]
