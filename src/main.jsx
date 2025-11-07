import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Login from './pages/login/Login.jsx';
import Chat from './pages/chat/Chat.jsx';
import Skills from './pages/cadastro/Skills.jsx';


import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>


        
        <Route path="/" element={<App />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/skills" element={<Skills />} />

        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);