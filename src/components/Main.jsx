import React, { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";

function Main() {
  const [pokemon, setPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);

  const loadMorePokemon = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + 20);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const pokemonList = response.data.results;

      const detailedPokemon = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setPokemon(detailedPokemon);
      setDisplayedPokemon(detailedPokemon.slice(0, itemsToShow));
    };
    fetchPokemon();
  }, [itemsToShow]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center">
        {displayedPokemon.map((poke) => {
          return (
            <PokeCard
              key={poke.name}
              name={poke.name}
              id={poke.id}
              image={poke.sprites.front_default}
              types={poke.types}
            />
          );
        })}
      </div>
      {itemsToShow < pokemon.length && (
        <div className="flex justify-center my-4">
          <button
            onClick={loadMorePokemon}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default Main;
