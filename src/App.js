import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<main />} />
         
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
