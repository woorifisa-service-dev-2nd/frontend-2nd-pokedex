import { pokemonList, loading, limit } from "../pokemonList.js";
import { addHtml } from "./ui.js";

// 최초 10마리 불러왔으면 로딩 화면 중지
const loadingCheck = setInterval(() => {
    if (!loading) {
        main.classList.remove(`loading`);
        main.childNodes[1].style.display = `none`;
        pokemonList.forEach((pokemon) => addHtml(pokemon));
        clearInterval(loadingCheck);
    }
}, 1000);

// 3초 간격으로 이후에 로드해 온 결과 화면에 추가
export const loadNextPokemons = setInterval(() => {
    // 현재 화면에 표시된 포켓몬 아이디 구하기
    const currentPokemonIds = [];
    for (let index = 0; index < pokemonListArea.children.length; index++) {
        const element = pokemonListArea.children[index].id;
        currentPokemonIds.push(Number(element.split(`_`)[1]));
    }
    // 새로 추가된 포켓몬 찾아서 화면에 추가
    const newPokemons = pokemonList.filter(
        (pokemon) => !currentPokemonIds.includes(pokemon.id),
    );
    newPokemons.forEach((pokemons) => addHtml(pokemons));

    // 다 로드했으면 타이머 해제
    if (pokemonList.length >= limit) {
        clearInterval(loadNextPokemons);
    }
}, 3000);
