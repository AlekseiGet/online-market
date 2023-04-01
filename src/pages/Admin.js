import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import ChangeAdmin from '../components/modals/ChangeAdmin';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import Delete from '../components/modals/Delete'; 
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';

const Admin = () => {
    const { user } = useContext(Context)
    const [brandViseble, setBrandViseble ] = useState(false)
    const [typeViseble, setTypeViseble] = useState(false)
    const [deviceViseble, setDeviceViseble] = useState(false)
    const [deleteViseble, setDeleteViseble] = useState(false)
    const [changeAdminViseble, setChangeAdminViseble] = useState(false)

    return (
        <Container className='d-flex flex-column' >
            {user.isAdmin ? 
          <Row>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setTypeViseble(true)}>Добавить тип </Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setBrandViseble(true)}>Добавить бренд</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setDeviceViseble(true)}>Добавить устройство</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setDeleteViseble(true)}>Удаление</Button>
            <Button variant={"outline-dark"} className="mt-4 p-2" onClick={() => setChangeAdminViseble(true)}>Изменить Администратора</Button>

            <CreateBrand show={brandViseble} onHide={() => setBrandViseble(false)} />
            <CreateDevice show={deviceViseble} onHide={() => setDeviceViseble(false)}/>
            <CreateType show={typeViseble} onHide={() => setTypeViseble(false)}/>
            <Delete show={ deleteViseble } onHide={() => setDeleteViseble(false)}/>
            <ChangeAdmin show={changeAdminViseble} onHide={() => setChangeAdminViseble(false)} />
          </Row>
            :      
               <h1>Не Админу здесь делать нечего.</h1>
}
        </Container >
    ) 
    
};

export default Admin;
//"Страница администратора"