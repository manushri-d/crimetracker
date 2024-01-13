import React, {useState} from "react";
import './App.css';
import { Login } from "./Login";
import { UserPage } from "./UserPage";
import { Register } from "./Register";
import { Home } from "./Home";
import { Specifics } from "./Specifics";
import { Report } from "./Report";


function App() {
  const [curpage, setCur] = useState('login');
   
  const changeState = (curstate) => {
    setCur(curstate);
  }


  return (
    <div className="App">
      {curpage === 'login' ? (
        <Login onPageSwitch={changeState} />
      ) : curpage === 'register' ? (
        <Register onPageSwitch={changeState} />
      ) : curpage === 'hello' ? (
        <UserPage onPageSwitch={changeState} />
      ) : curpage === 'specifics' ? (
        <Specifics onPageSwitch={changeState} />
      ) : curpage === 'report' ? (
        <Report onPageSwitch={changeState} />
      ) : (
        <Home onPageSwitch={changeState} />
      )}
    </div>
  );

}

export default App;




