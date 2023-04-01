  import {makeAutoObservable } from "mobx"
  

 export default class UserStore {
    constructor() {//он будет вызываться при создании объекта данного класса
       this._isAuth = false //ДОЛЖНО БЫТЬ FALSE  _  нижнее подчёркивани чтобы обозначить что переменная изменятся не может
       this._user = {}
       this._allUsers = {}
       this._selectedUser ={}
       this._isAdmin = false  //Хочу что бы проверял админ или нет
       makeAutoObservable(this)//mobx будет следить за изменениями компонента и при изменении компоненты будут перерендиваться ,будет показывать авторизован пользователь или нет
    }
//Экшин функции которые как то изменяют состояние ...
     setIsAuth(bool) { //принимает булевое значение и присваивает
        this._isAuth = bool
     }
// Экшин для изменения пользователя     
     setUser(user) { 
         this._user = user
     }

    setAllUsers(allUsers) {
       this._allUsers = allUsers
    }

    setIsAdmin(bool) { //Для проверки админ или нет
       this._isAdmin = bool
    }

    setSelectedUser(selectedUser) { //Для проверки админ или нет
       this._selectedUser = selectedUser
    }
/**  геттеры  для получения переменных из нашего состояния
     компьютед функции они вызываются только в том случае если переменная которая была внутри была изменена
*/
     get isAuth(){
        return this._isAuth
     } 
     get user() {
        return this._user
     }
     get isAdmin() {
       return this._isAdmin
    }
     get allUsers() {
        return this._allUsers
    }

    get selectedUser() {
       return this._selectedUser
    }
}

//пробрасую это в index.js