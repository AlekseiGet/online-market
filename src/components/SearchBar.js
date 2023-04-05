import React, { useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchDevice, fetchOneDevice} from '../http/deviceApi';
import { Col, Dropdown } from 'react-bootstrap';

const SearchBar = observer(() => {
    const {device} = useContext(Context)
    const [search, setSearch] = useState('')

    const searchOne = () => {  //Поиск по вводу запроса
        if (search) {
            fetchOneDevice(search).then(data => device.setDevice(data.rows))
        } else {
            alert('Нужно написать что найти')
        }
    }

    const showAll = () => {  // Показат все
        fetchDevice(null, null, 1, 5).then(data => {   //typeId, brandId, текущая страница, ограниченое по количеству  ЗДЕСЬ
            device.setDevice(data.rows)
            device.setTotalCount(data.count)//узнать сколько товара получили после запроса
        })
        device.setSelectedType(false);
        device.setSelectedBrand(false)
    }

    

    return (
          <Col>
            <button onClick={showAll}>показать все</button>
            <input type='text' name='name' value={search} onChange={e => setSearch(e.target.value)} placeholder='Что будем искать?' />
            <button onClick={searchOne}>Найти</button>  
            <Dropdown>
                <Dropdown.Toggle>{device.sort[0] || "Сортровать по"}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => device.setSort(['По рейтингу', 1])}>По рейтингу</Dropdown.Item>
                    <Dropdown.Item onClick={() => device.setSort(["Цена от меньшей", 2])}>Цена от меньшей</Dropdown.Item>
                    <Dropdown.Item onClick={() => device.setSort(['Цена от большей', 3])}>Цена от большей</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
         </Col>
    );
});

export default SearchBar;