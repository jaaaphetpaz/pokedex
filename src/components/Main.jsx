import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";

function Main() {
  const [pokemon, setPokemon] = useState([]);

  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=9")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Problem occured", err);
      });
  };

  //   async function grabData() {
  //     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  //     const data = await response.json();
  //     setPokemon(data.results);
  //   }

  async function grabData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9");
    const data = await response.json();

    const detailedPokemonData = await Promise.all(
      data.results.map(async (poke) => {
        const res = await fetch(poke.url);
        const details = await res.json();
        return { name: poke.name, ...details };
      })
    );

    setPokemon(detailedPokemonData);
  }

  useEffect(() => {
    grabData();
  }, []);

  console.log(pokemon);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center">
        {pokemon.map((poke) => {
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
    </>
  );
}

export default Main;
