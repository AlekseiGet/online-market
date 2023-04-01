import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Row } from 'react-bootstrap';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //функция под регистрацию и под вход
    const click = async () => {
           let data;
        try {
             if (isLogin) {
                 data = await login(email, password)  
             }else {
                 data = await registration(email, password)
             }
                 user.setUser(data)//сохратяю данные о пользователе data или user?
                 user.setIsAuth(true)
                 if (user.user.role === "ADMIN") {
                     user.setIsAdmin(true)
                 }
                 history(SHOP_ROUTE)
        } catch (e) {
            alert(`${e.message} сделай перебор ошибок`)
        }
        
    }

    return (
        <Container
        className="d-flex justify-content-center align-items-center "
        style={{height: window.innerHeight - 54}} >
            <Card style={{width: 600}} className="p-5 " >
                <h2  className='m-auto' >{isLogin ? "Авторизация" : "Регистрация" } </h2>
                <Row className='d-flex flex-column' >
                    <Form.Control
                    className='mt-3'
                    placeholder='введите ваш адресс...'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='введите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Form className='d-flex justify-content-between mt-3 pl-3 pr3' >
                        {isLogin ?
                             <div >
                              Нет аккаунта?  <Link to={REGISTRATION_ROUTE} >Зарегестрироваться</Link>   
                            </div>
                        :
                            <div >
                             Есть аккаунта?  <Link to={LOGIN_ROUTE} >Входите</Link>
                            </div>
                        }
                       
                        <Button  variant={"outline-success"} onClick={click}>
                             {isLogin ? "Войти" : "Регистрация"}
                        </Button>
                    </Form>
                    
                </Row>
            </Card>
        </Container>
    );
});

export default Auth;

// "Авторизация"