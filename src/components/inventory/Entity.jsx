import React from "react";
import "./Entity.css";
import { extractIdFromUrl, usePokemonByIdQuery } from "../../api/pokeapi";

const Entity = ({ url }) => {
  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonByIdQuery(extractIdFromUrl(url));

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error";
  }

  return (
    <div className="entity">
      <header className="entity--header">
        <figure>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </figure>
      </header>

      <footer className="entity--footer">
        <h2>{pokemon.name}</h2>
      </footer>
    </div>
  );
};

export default Entity;
