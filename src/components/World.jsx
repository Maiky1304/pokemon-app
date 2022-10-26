import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRandomPokemonQuery } from "../api/pokeapi";
import { addPokemon } from "../reducers/worldSlice";
import "./World.css";
import Pokemon from "./world/Pokemon";

const World = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useRandomPokemonQuery();

  useEffect(() => {
    if (!data) {
      return;
    }

    for (const item of data) {
      dispatch(addPokemon(item));
    }
  }, [dispatch, data]);

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error :(";
  }

  return (
    <div className="world">
      {data.map((set, index) => (
        <Pokemon key={index} url={set.url} />
      ))}
    </div>
  );
};

export default World;
