import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import {main} from "./components/main.js";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<main />} />
            {/* <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} /> */}
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
