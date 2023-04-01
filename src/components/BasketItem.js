import { useContext} from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import DeviseItem from './DeviseItem';
import { deleteOneDeviceInBasket } from '../http/deviceApi';



const BasketItem = ({ device, delEllement }) => {


   const remove = () => {
     if (window.confirm("Передумал покупать ?")) { 
         alert('Сейчас удалю')
         deleteOneDeviceInBasket(device.info[0].deviceId) // передал deviceId в функцию для отправки на сервер

         delEllement(device.info[0].deviceId) //передал в родителя для манипуляций с массивом
        }
      else{
        alert(" Это хорошо")     
      }
    } 
      
    return (
        <Col key={device.createdAt}>
            <DeviseItem device={device} />
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={remove} >Удалить из корзины</Button>
        </Col> 
    );
};

export default BasketItem;