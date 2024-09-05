import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'


import UserList from './Components/UserList';
import UserForm from './Components/UserForm'
import UserDetails from './Components/UserDetails';

function App() {
  
  return (
   
      <div className="App">
        <Routes>
          <Route path="/" element={<UserList/>} />
          <Route path="/create" element={<UserForm/>} />
          <Route path="/edit/:id" element={<UserForm/>} />
          <Route path="/user/:id" element={<UserDetails/>} />
        </Routes>
      </div>
   
  );
}

export default App;