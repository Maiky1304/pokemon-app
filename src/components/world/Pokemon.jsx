import React, { useEffect } from "react";
import "./Pokemon.css";
import { extractIdFromUrl, usePokemonByIdQuery } from "../../api/pokeapi";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducers/inventorySlice";
import { useSelector } from "react-redux";
import { updatePokemon } from "../../reducers/worldSlice";

const Pokemon = ({ url }) => {
  const {
    data: pokemon,
    isLoading,
    error,
  } = usePokemonByIdQuery(extractIdFromUrl(url));
  const world = useSelector((state) => state.world.value);
  const entity = world.find((entity) => entity.url === url);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemon) {
      return;
    }

    dispatch(
      updatePokemon({
        find: {
          url,
        },
        update: {
          hp: pokemon.stats[0].base_stat,
        },
      })
    );
  }, [dispatch, pokemon, url]);

  function handleAttack() {
    const damage = Math.floor(Math.random() * pokemon.hp) + 1;

    let newHp = entity.hp;
    newHp -= damage;
    if (newHp <= 0) {
      newHp = -1;
    }

    dispatch(
      updatePokemon({
        find: {
          url,
        },
        update: {
          hp: newHp,
        },
      })
    );
  }

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error";
  }

  if (entity.hp <= 0) {
    if (entity.hp === -1) {
      dispatch(addItem(entity));
    }

    return null;
  }

  return (
    <div className="pokemon">
      <header className="pokemon--header">
        <figure>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </figure>

        <span>{entity.hp} HP</span>
      </header>

      <footer className="pokemon--footer">
        <h2>{pokemon.name}</h2>
        <button onClick={handleAttack}>Attack</button>
      </footer>
    </div>
  );
};

export default Pokemon;
