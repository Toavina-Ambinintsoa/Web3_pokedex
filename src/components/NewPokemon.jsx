import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPokemon({ setPokemons }) {
  const [inputs, setInputs] = useState({
    name: "",
    talents: "",
    type: "",
    attack: ""
  });
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!inputs.name.trim()) newErrors.name = "Le nom du Pokémon est obligatoire";
  if (!inputs.talents.trim()) newErrors.talents = "Les talents sont obligatoires";
  if (!inputs.type.trim()) newErrors.type = "La caractéristique est obligatoire";
  if (!inputs.attack.trim()) newErrors.attack = "L'attaque est obligatoire";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const newPokemon = {
      id: Date.now(),
      name: inputs.name.toLowerCase(),
      types: [{ type: { name: inputs.type.toLowerCase() } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "/pokeball.png"
          }
        }
      }
    };

    setPokemons(prev => [newPokemon, ...prev]);

    navigate("/home"); // ✅ redirection automatique
  }
};

  return (
    <div className="flex justify-center background h-screen">
      <div className="flex flex-col w-7xl items-center shadow-xl p-10 gap-15">
        <h1 className="text-2xl font-bold mb-4 font-pokemon">
          Créer un nouveau Pokémon
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col text-2xl gap-5 w-full max-w-xl">
          <input
            name="name"
            value={inputs.name}
            onChange={handleChange}
            type="text"
            placeholder="Nom du Pokémon"
            className="font-pokemon border-2 rounded-xl text-center h-12 p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            name="talents"
            value={inputs.talents}
            onChange={handleChange}
            type="text"
            placeholder="Talents du Pokémon"
            className="font-pokemon border-2 rounded-xl text-center h-12 p-2"
          />
          {errors.talents && <p className="text-red-500 text-sm">{errors.talents}</p>}

          <input
            name="type"
            value={inputs.type}
            onChange={handleChange}
            type="text"
            placeholder="Caractéristique (Water, Fire...)"
            className="font-pokemon border-2 rounded-xl text-center h-12 p-2"
          />
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}

          <input
            name="attack"
            value={inputs.attack}
            onChange={handleChange}
            type="text"
            placeholder="Attaque du Pokémon (degats par attaque)"
            className="font-pokemon border-2 rounded-xl text-center h-12 p-2"
          />
          {errors.attack && <p className="text-red-500 text-sm">{errors.attack}</p>}

          <button
            type="submit"
            className="text-black bg-gray-400 p-2 rounded hover:bg-amber-30 mt-2 shadow hover:shadow-lg transition-shadow font-pokemon"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
}