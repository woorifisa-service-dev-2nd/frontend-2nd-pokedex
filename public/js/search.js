import { pokemonList } from "../pokemonList.js";

// 포켓몬 검색 함수
export const searchPokemon = (input) => {
    const regex = new RegExp(`${input}`, `g`);
    return pokemonList.filter((pockemon) => pockemon.name.match(regex));
};
