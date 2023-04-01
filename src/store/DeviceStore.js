import { makeAutoObservable } from "mobx"

export default class DeviceStore {
    constructor() {//он будет вызываться при создании объекта данного класса
        this._types =[]
        this._brands = []
        this._devices = []
        this._rating = [0]  //для изменения оценки
        this._selectedType ={}//для кликабельности
        this._selectedBrand = {}//для кликабельности
        this._selectedDevice = {}
        this._page = 1 // отвечает за текущую страницу
        this._totalCount = 0  // за общее количество товара доступного по запросу
        this._limit = 5 // колличество товара на одной станице

        makeAutoObservable(this)//mobx будет следить за изменениями компонента и при изменении компоненты будут перерендиваться ,будет показывать авторизован пользователь или нет
    }

    setTypes(types) { 
        this._types= types
    } 
    setBrand(brands) {
        this._brands = brands
    }
    setDevice(devices) {
        this._devices = devices
    }
    setRating(rating) {
        this._rating = rating  //для изменения оценки
    }
    setSelectedType(type) {
        this.setPage(1) //чтобы при перезагрузке страницы при выборе начиналось с 1 страницы
       this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1) //чтобы при перезагрузке страницы при выборе начиналось с 1 страницы
        this._selectedBrand = brand
    }
    setSelectedDevice(device) {
        this.setPage(1) //чтобы при перезагрузке страницы при выборе начиналось с 1 страницы
        this._selectedDevice = device
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setLimit(limit) {
        this._limit = limit
    }


  
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get rating() {   //для изменения оценки
        return this._rating
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get selectedDevice() {
        return this._selectedDevice
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}

//пробрасую это в index.js