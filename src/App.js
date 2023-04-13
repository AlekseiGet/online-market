import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from 'mobx-react-lite';
import { Context } from ".";
import { check } from "./http/userApi";
import { Spinner }from 'react-bootstrap'

const App = observer(() => {
  const {user} = useContext(Context)

  useEffect(() => {
     check().then(data => {  // Тут что то не так
      // user.setUser(true)//не понял зачем изменил на true
     //user.setIsAuth(true)
     }).finally(() => user.setIsLoading(false))
  },[])
  
   useEffect(() => {   //При перезагрузке достаю из localStorage
    if (localStorage.auth) {//Если auth сохранилось в localStorage  
      user.setIsAuth(true) 
      user.setUser({
        email: localStorage.email,
        exp: localStorage.exp,
        iat: localStorage.iat,
        id: localStorage.id,
        role: localStorage.role
      
      } )   
    }
    if (localStorage.admin) {//Если admin сохранилось в localStorage  
      user.setIsAdmin(true)    
    }
    
  }, [])
   
  if (user.isloading) {
    return <Spinner animation={'grow'}/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter  />
    </BrowserRouter>
  );
});

export default App;
