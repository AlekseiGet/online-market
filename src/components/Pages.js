import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import {Pagination} from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Pages = observer(() => {
   const {device} = useContext(Context)
   const pagesCount = Math.ceil(device.totalCount / device.limit)//Получил, разделил, округлил
   const pages = []

   for (let i = 0; i < pagesCount; i++) {
     pages.push(i + 1) // цепляю текущий счётчик в цикле и + 1 это будет номер страници
   }
     //выделяю как то страницу active={device.page === page}  то она будет активной


  function increment() {
    if (device.limit < device.totalCount) {
      device.setLimit(device.limit + 1)
    }
    
  }
  function decrement() {
    if (device.limit > 1) {
      device.setLimit( device.limit - 1)
    }
    
  }
  
   return (
    <Col>
        <Pagination className= 'mt-5'>
            {pages.map(page => 
                <Pagination.Item active={device.page === page} key={page} onClick={() => device.setPage(page)}>
                    {page}
                    </Pagination.Item>
                )}
         </Pagination> 
         <span>Колличество отображаемых эллементов {device.limit}</span>
        <Col>
          <Button variant={"outline-dark"} className="mt-4 p-2" onClick={increment}>Увеличить количество</Button> 
          <Button variant={"outline-dark"} className="mt-4 p-2" onClick={decrement}>Уменьшить количество</Button>
        </Col>       
   </Col>
    );
});

export default Pages;