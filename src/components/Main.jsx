import React, { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";

function Main({ searchTerm }) {
  const [pokemon, setPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadMorePokemon = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + 20);
  };

  const handleCardClick = (poke) => {
    setSelectedPokemon(poke);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
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

  useEffect(() => {
    if (searchTerm) {
      const filteredPokemon = pokemon.filter(
        (poke) =>
          poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          poke.id === parseInt(searchTerm)
      );
      setDisplayedPokemon(filteredPokemon.slice(0, itemsToShow));
    } else {
      setDisplayedPokemon(pokemon.slice(0, itemsToShow));
    }
  }, [searchTerm, pokemon, itemsToShow]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center pt-5">
        {displayedPokemon.map((poke) => {
          return (
            <div key={poke.id} onClick={() => handleCardClick(poke)}>
              <PokeCard
                key={poke.name}
                name={poke.name}
                id={poke.id}
                image={poke.sprites.front_default}
                types={poke.types}
              />
            </div>
          );
        })}
      </div>
      {itemsToShow < pokemon.length && !searchTerm && (
        <div className="flex justify-center my-4">
          <button
            onClick={loadMorePokemon}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          >
            Load More
          </button>
        </div>
      )}
      {isModalOpen && selectedPokemon && (
        <div className="modal modal-open">
          <div className="modal-box flex-col justify-items-center">
            <h2 className="text-2xl font-bold">
              {`#${String(selectedPokemon.id).padStart(3, "0")} ${
                selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)
              }`}
            </h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <div className="py-4">
              <p>
                <strong>Type:</strong>{" "}
                {selectedPokemon.types.map((type) => type.type.name).join(", ")}
              </p>
              <p>
                <strong>Height:</strong> {selectedPokemon.height}
              </p>
              <p>
                <strong>Weight:</strong> {selectedPokemon.weight}
              </p>
            </div>
            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
