import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../index';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import BigStar from "../assets/VeryBigStar.png"
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import { useParams } from 'react-router-dom';
import { fetchOneDevice, replaceRatingDevice, creatRatingDevice, fetchRatingDevice } from '../http/deviceApi';
import replacement from "../image/404.jpg";
import { addBasketDevice } from '../http/deviceApi'
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';



const DevicePage =() => {
      const { user } = useContext(Context)
      const history = useNavigate()
      const [device, setDevice] = useState({info: []})
      const [rating, setRating] = useState(0)
      const [hasEstimation, setHasEstimation] = useState(false)
      const {id} = useParams()//параметры строки запроса
      const [foto, setFoto] = useState(replacement)
      const [getOldRatingDevice, setGetOldRatingDevice] = useState([])
    
      useEffect(() => {
          fetchOneDevice(id).then(data => setDevice(data))
      },[id] )
      
      useEffect(()=>{
        if (device.img) {
                setFoto(process.env.REACT_APP_API_URL + device.img)           
        } 
        if (device.rating > 0) { //если оценка больше 0 значит как минимум одна оценка предмета есть
            setRating(device.rating)
            fetchRatingDevice(device.id).then(data => setGetOldRatingDevice(data))     
        }          
      }, [device])
      
      useEffect(() => {
        //если оценка больше 0 значит как минимум одна оценка предмета есть
        for (let i = 0; i < getOldRatingDevice.length; i++) {//Пробегаю по массиву в поиске именно твоей оценки   
            if (getOldRatingDevice[i].userId === user.user.id) {
                setHasEstimation(true)
            }
        }
      }, [getOldRatingDevice])

      const notImage = ()=> {
          setFoto(replacement)
      } 

      const addToCart = () =>{
        alert(`Добавил ${device.id}`) 
        const formData = new FormData()
        formData.append('basketId', user.user.id)  
        formData.append('deviceId', device.id) 
        addBasketDevice(formData)
        history(SHOP_ROUTE)
      }
    
      const buy = () => {
         alert("Купить? Приходи или позвони *909 343434433443")      
     }
 /**
  *  const estimation = async () => {//Узнаю оценку
        if (user.user.id) {
            let newRating = prompt('ваша оценка от 1 до 5, числом') // сюда вставить что то покрасивее чем это
            if (newRating > 0 && newRating <= 5) {    //Если поставил правильную оценку, когда переделаю можно убрать 
                if (getOldRatingDevice.length) { //если оценка больше 0 значит как минимум одна оценка предмета есть
                    let hasEstimation = false
                   
                    for (let i = 0; i < getOldRatingDevice.length; i++) {//Пробегаю по массиву в поиске именно твоей оценки   
                        if (getOldRatingDevice[i].userId === user.user.id) {
                            hasEstimation = true
                         }
                    }
                   
                    if (!hasEstimation) {//Изменил оценку 

                        let summ = 0;
                        for (let r = 0; r < getOldRatingDevice.length; r++) {//Собираю все оценки
                            summ = summ + getOldRatingDevice[r].rate
                        }
                        newRating = Math.round((summ + Number(newRating)) / getOldRatingDevice.length) //Усреднить нужно
                        newEstimation(newRating)
                        alert("Спасибо за твою оценку");
                        console.log(newRating);
                    }else{
                        alert(" Ты уже ставил тут оценку")
                    }
                  
                } else { //Если оценка 0 значит ты не ставл и значит можно присто добавить её
                    newEstimation(newRating) //Изменил оценку
                    alert("Это первая оценка");
                } 

            } else {
               alert('Какая то неправильная оценка')
            }
        } else {
            alert("Только для авторизованых пользователей")
        }
   
    }
  */
   

    const estimation = async () => {//Узнаю оценку
        if (user.user.id) {
            if (!hasEstimation) {//Если ты не ставил оценку
                let newRating = prompt('ваша оценка от 1 до 5, числом') // сюда вставить что то покрасивее чем это
                if (newRating > 0 && newRating <= 5) {    //Если поставил правильную оценку, когда переделаю можно убрать
                    if (getOldRatingDevice.length) { //если оценка больше 0 значит как минимум одна оценка предмета есть
                        let summ = 0;
                        for (let r = 0; r < getOldRatingDevice.length; r++) {//Собираю все оценки
                            summ = summ + getOldRatingDevice[r].rate
                        }
                        newRating = Math.round((summ + Number(newRating)) / getOldRatingDevice.length) //Усреднить нужно
                        newEstimation(newRating)
                        setHasEstimation(true)
                        alert("Спасибо за твою оценку");
                    } else { //Если оценка 0 значит ты не ставл и значит можно присто добавить её
                        newEstimation(newRating) //Изменил оценку
                        setHasEstimation(true)
                        alert("Это первая оценка");
                    }       
                } else {
                    alert('Какая то неправильная оценка')
                }
            }else{
                alert("Твоя оценка уже есть")
            }
        } else {
            alert("Только для авторизованых пользователей")
        }
    }

    const newEstimation = (newRating) => { // Изменяю рейтинг & создаю в базе объект с инфо о рейтинге
        const formData = new FormData()
        formData.append('id', device.id )
        formData.append('rating', newRating)
        formData.append('userId', user.user.id)
        replaceRatingDevice(formData) // Изменяю рейтинг
        creatRatingDevice(formData)  //создаю в базе объект с инфо о рейтинге
        setRating(newRating)
    }
       

    return (
        <Container className='mt-3' >
            <Row>
               <Col nd={4}>
                    <Image width={600} height={600} src={foto} onError={notImage}/>
               </Col> 
               <Col nd={4}>
                   <Row className='d-flex flex-column align-items-center ' >
                       <h2 style={{textAlign: "center"}} >{device.name}</h2>
                        <div className="d-flex align-items-center justify-content-center" onClick={estimation}
                            style={{background: `url(${BigStar}) no-repeat center center `, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }} >
                           {rating}
                       </div>
                   </Row>
               </Col>
               <Col nd={4}>
                   <Card
                    className='d-flex flex-column align-items-center justify-content-around'
                    style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                     <h3>От: {device.price} рубл.</h3>
                        {user.isAuth ?
                          <Button variant={'outline-dark'} onClick={addToCart}>Добавить в корзину</Button>
                          :
                            <Button variant={'outline-dark'} onClick={buy}>Купить</Button>
                     }
                        
                   </Card>
               </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h2>Характеристики</h2>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}> {//каждая вторая строка серая
                    }
                        {info.title}: {info.description}
                    </Row>
                    )}
            </Row>
        </Container>
    );
};

export default DevicePage;
//"Cтраница устройства, характеристики, добавление в корзину"