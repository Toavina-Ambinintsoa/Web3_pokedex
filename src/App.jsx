import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PokemonList from "./components/PokemonList";
import NewPokemon from "./components/NewPokemon";
import PokemonPage from "./components/PokemonPage";

function App() {
  const [pokemons, setPokemons] = useState([]);

  return (
    <Routes>
      <Route
        path="/home"
        element={<PokemonList pokemons={pokemons} setPokemons={setPokemons} />}
      />
      <Route
        path="/newpokemon"
        element={<NewPokemon setPokemons={setPokemons} />}
      />
      <Route path="/pokemon/:pokemonName" element={<PokemonPage />} />
    </Routes>
  );
}

export default App;