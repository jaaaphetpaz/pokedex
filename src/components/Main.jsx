import React, { useEffect, useState } from "react";

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

  async function grabData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await response.json();
    setPokemon(data.results);
  }

  useEffect(() => {
    grabData();
  }, []);

  console.log(pokemon);

  return (
    <>
      {pokemon.map((poke) => {
        return <h1>{poke.name}</h1>;
      })}
    </>
  );
}

export default Main;
