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
  const [loading, setLoading] = useState(true)//идёт загрузка или нет

  useEffect(() => {
     check().then(data => {  // Тут что то не так
      // user.setUser(true)//не понял зачем изменил на true
     //user.setIsAuth(true)
     } ).finally(() => setLoading(false))
  },[])//массив пустой  -- отработает один раз - при запуске



  if (loading) {
    return <Spinner animation={'grow'}/>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
