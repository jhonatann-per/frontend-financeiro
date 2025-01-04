import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Cadastrar } from '../pages/Cadastrar';
import { Editar } from '../pages/Editar';

const Rotas = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path='/cadastrar' element={<Cadastrar />} />
      <Route path='/editar/:id' element={<Editar/>} />
    </Routes>
  </Router>
);

export default Rotas;
