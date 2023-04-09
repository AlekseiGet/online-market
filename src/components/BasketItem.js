import { useContext} from 'react';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import DeviseItem from './DeviseItem';
import { deleteOneDeviceInBasket } from '../http/deviceApi'; 
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchBasket } from '../http/deviceApi';

const BasketItem = observer( ( ice ) => {
 
   const { device, user } = useContext(Context)

  const remove = async () => {
 
   if (window.confirm("Передумал покупать ?")) { 
        await deleteOneDeviceInBasket(user.user.id, ice.ice.id ) //Удалить предмет
         fetchBasket(user.user.id).then(data => device.setDevice(data)) //Получить заново корзину
        }
      else{
        alert(" Это хорошо")     
      }  
    } 

    return (
        <Col>
          <DeviseItem device={ice.ice} />
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={remove} >Удалить из корзины</Button>
        </Col> 
    );
});
//Сейчас
export default BasketItem;