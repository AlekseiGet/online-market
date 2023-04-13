import { useContext, useEffect } from 'react';
import { fetchBasket } from '../http/deviceApi';
import { Context } from '../index';
import {  Row } from 'react-bootstrap';
import BasketItem from '../components/BasketItem';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
    const {device , user } = useContext(Context)
 
    useEffect(() => {//что бы дать время на запись из  localStorage.
        if (user.user.id) {
           fetchBasket(user.user.id).then(data => device.setDevice(data)) 
       }    
     }, [user.user.id]) 

    return (
        <div >
        <h1>Корзина: {user.user.email}</h1>
            
            <Row className='d-flex'>
               {device.devices.length ?
                   device.devices.map(ice =>              
                       <BasketItem key={Math.random()} ice={ice} />
                  )
                :
                <div> Корзина пуста </div>
            }
            </Row>
        </div>
    );
});
export default Basket;