import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import Login from './pages/login/login.jsx';
import Chat from './pages/chat/Chat.jsx';
import Skills from './pages/cadastro/Skills.jsx';
import Home from './pages/home/Home.jsx'
import Comunidade from './pages/chat/Comunidade.jsx'
import Interesses from './pages/cadastro/Interesses.jsx'
import Perfil from './pages/profile/perfil.jsx'
import Trilhas from './pages/trilhas/trilhas.jsx'





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
        <Route path="/comunidades" element={<Comunidade />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interesses" element={<Interesses />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/trilhas" element={<Trilhas />} />





        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);