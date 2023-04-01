import { useState, useContext, useEffect } from 'react';
import DeviseItem from '../components/DeviseItem';
import { deleteOneDeviceInBasket, fetchBasket } from '../http/deviceApi';
import { Context } from '../index';
import Button from 'react-bootstrap/esm/Button';
import classses from './Basket.module.css'
import { Col, Row } from 'react-bootstrap';
import BasketItem from '../components/BasketItem';

const Basket = () => {
    const { user } = useContext(Context)
    const [filling, setFilling] = useState([])
    

     useEffect(() => {
         fetchBasket(user.user.id).then(data => setFilling(data)) 
     }, []) 

   const delEllement = (idItem) =>{
     
          let result = []
       for (let i = 0; i < filling.length; i++) {//собрал новый массив исключая удалённый - idItem
                                                 //не используя запрос к серверу
           if (filling[i].info[0].deviceId != idItem) { //ид объекта повторяется поэтому использую ид которое я добавлял в серверной части
              result.push(filling[i])
            }       
       }
       setFilling(result)
      
   }
        
    return (
        <div >
        <h1>Корзина: {user.user.email}</h1>
            
            <Row className='d-flex'>
            {filling.length ?
                filling.map(device =>              
                    <BasketItem key={device.info[0].deviceId} device={device} filling={filling} delEllement={delEllement} />
                  )
                :
                <div> Корзина пуста </div>
            }
            </Row>
        </div>
    );
};

export default Basket;