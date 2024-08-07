import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddPokemon from './components/AddPokemon';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
      </Routes>
    </Router>
  );
}

export default App;
