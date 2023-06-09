import React, { useContext, useEffect, useState } from 'react';
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
import SearchBar from '../components/SearchBar';


const Shop = observer ( () => {
    const {device} = useContext(Context)
  
    useEffect(()=> {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrand(data))
        fetchDevice(null,  null, 1, 5, null).then(data => {   //typeId, brandId, текущая страница, ограниченое по количеству  ЗДЕСЬ
             device.setDevice(data.rows)
             device.setTotalCount(data.count)//узнать сколько товара получили после запроса
            })
    }, [])
  

    useEffect(()=>{//срабатывает при изменении фильтрации выбора
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, device.sort[1]).then(data => {   //выбраный тип из DeviceStore, выбраный бренд, текущая страница полученая из STORE, limit ЗДЕСЬ
            device.setDevice(data.rows)
            device.setTotalCount(data.count)//узнать сколько товара получили после запрос
        })
    }, [device.page, device.selectedType, device.selectedBrand, device.limit, device.sort])//будет вызываться каждый раз когда изменим страницу, бренд , тип


    return (
        <Container>
            <Row className='mt-2'>
                 <Col>
                       <SearchBar/>           
                 </Col>

                {device.devices ? 
                     <Row>
        
                        <Col md={3}>
                        <TypeBar/>
                        </Col> 

                        <Col >
                        <BrandVBar/>
                        </Col> 

                        <Col md={9}>                                       
                     <DeviceList/>
                     <Pages/>
                        </Col> 
                    </Row>
                                 :
                      <Row><h1>" Устройства не найдены"</h1> </Row>                                                              
                }              
                
                
              
            </Row>
        </Container>
       
    );
});

export default Shop;

