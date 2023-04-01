import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import BrandVBar from '../components/BrandVBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchTypes, fetchBrand, fetchDevice } from '../http/deviceApi';
import Pages from '../components/Pages';


const Shop = observer ( () => {
    const {device} = useContext(Context)
  
    useEffect(()=> {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrand(data))
        fetchDevice(null,  null, 1, 5).then(data => {   //typeId, brandId, текущая страница, ограниченое по количеству  ЗДЕСЬ
             device.setDevice(data.rows)
             device.setTotalCount(data.count)//узнать сколько товара получили после запроса
            })
    }, [])
  

    useEffect(()=>{//срабатывает при изменении фильтрации выбора
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {   //выбраный тип из DeviceStore, выбраный бренд, текущая страница полученая из STORE, limit ЗДЕСЬ
            device.setDevice(data.rows)
            device.setTotalCount(data.count)//узнать сколько товара получили после запрос
        })
    }, [device.page, device.selectedType, device.selectedBrand, device.limit])//будет вызываться каждый раз когда изменим страницу, бренд , тип


    
 

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                        <TypeBar/>
                  </Col> 
                  <Col>
                        <BrandVBar/>
                  </Col>
                {device.devices.length ?                       
                                      <Col md={9}>
                                         
                                         <DeviceList/>
                                         <Pages/>
                                      </Col> 
                                 :
                                 <Row><h1>" Устройства не найдены"</h1> </Row>                                                              
                }
                
                <ul>
                    <li>при перезагрузке теряются права</li>        
                    <li>Сделать поиск</li>
                </ul>
                
              
            </Row>
        </Container>
       
    );
});

export default Shop;

