import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    randomPokemon: builder.query({
      query: () => `pokemon?limit=1154`,
      transformResponse: (response) => {
        // Some logic to randomize the actual displayed result
        const results = response.results;
        const randomPokemon = [];

        for (let i = 0; i < 9; i++) {
          let pick = Math.floor(Math.random() * results.length);
          while (randomPokemon.includes(pick)) {
            pick = Math.floor(Math.random() * results.length);
          }
          randomPokemon.push(pick);
        }

        return randomPokemon.map((pointer) => results[pointer]);
      },
    }),
    pokemonById: builder.query({
      query: (id) => ({ url: `pokemon/${id}` }),
      transformResponse: (response) => ({
        ...response,
        name: prettifyPokemonName(response.name),
        hp: response.stats[0].base_stat,
      }),
    }),
  }),
});

export function prettifyPokemonName(name) {
  return name
    .split("-")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");
}

export function extractIdFromUrl(url) {
  return url.split("/")[6];
}

export const { useRandomPokemonQuery, usePokemonByIdQuery } = pokeApi;
export default pokeApi;
