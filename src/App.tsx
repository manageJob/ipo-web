import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import GetHello from './api/GetHello';
function App() {

  const onExport = () => {
    console.log('Start');
    
    GetHello(5)
        .then((res: any) => {
          console.log(res?.data, "-ssss");
        })
        .catch((err) => {
        
        });

        console.log('End');
    
  }




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Start IPO
        </p>

        <Button
                    type="primary"
                   
                    size="middle"
                    onClick={onExport}
                  
                  >
                    Click Api
                  </Button>
      </header>
    </div>
  );
}

export default App;
