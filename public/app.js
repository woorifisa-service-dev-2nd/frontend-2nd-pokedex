import { pokemonList } from "./pokemonList.js";
import { searchPokemon } from "./js/search.js";
import { addHtml } from "./js/ui.js";
import { loadNextPokemons } from "./js/load.js";

const main = document.getElementById(`main`);
const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const [searchInputControl] =
    document.getElementsByClassName(`searchInputControl`);

export const pokemonListArea = document.getElementById(`pokemonListArea`);

document.querySelector(`header > img`).addEventListener(`click`, () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
    searchInputControl.innerHTML = ``;
    searchText.value = ``;
    const searchResult = searchPokemon(``);
    searchEventAll(searchResult);
});

// 검색 돋보기 클릭 이벤트
searchBtn.addEventListener(`click`, () => {
    const idOrName = searchText.value;
    if (idOrName.length > 0) {
        // 정규식 검색, 다중 검색
        const searchResult = searchPokemon(idOrName);
        searchEventAll(searchResult);
    }
});

// 검색창 속성값 삭제
searchInputControl.addEventListener(`click`, () => {
    searchInputControl.innerHTML = ``;
    searchText.focus();
});

// 검색 엔터키 이벤트
searchText.addEventListener(`keyup`, event => enterEvent(event));

function enterEvent(event) {
    let key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13) {
        const idOrName = searchText.value;
        // 정규식 검색, 다중 검색
        const searchResult = searchPokemon(idOrName);
        // 엔터키가 눌렸을 때
        searchEventAll(searchResult);
    }
}

// 클릭, 엔터 이벤트 공통
export const searchEventAll = (target) => {
    if (loadNextPokemons) clearInterval(loadNextPokemons);

    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    target.forEach((element) => {
        addHtml(element);
    });
};

const typeButtons = document.querySelectorAll(`.type_button`);

// 속성 버튼 클릭 이벤트 핸들러 함수
const typeButtonHandler = (event) => {
    if (loadNextPokemons) clearInterval(loadNextPokemons);

    // 입력창에 속성값 표시
    searchInputControl.innerHTML = `<span class="searchTypeResult"><img src=${event.currentTarget.childNodes[1].src} width="32" height="32" />
            <span>${event.currentTarget.childNodes[3].innerText}</span></span>
    `;
    searchText.value = ``;

    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    const selectedType = searchInputControl.children[0].children[1].innerText;

    const target = pokemonList.filter((pokemon) =>
        pokemon.types.includes(selectedType),
    );
    searchEventAll(target);
};

typeButtons.forEach((button) =>
    button.addEventListener(`click`, typeButtonHandler),
);

// 속성 타입 선택
 export const selectTypes = (type) => {
    switch (type) {
        case '노말':
            return 'normal';
        case '격투':
            return 'fighting';
        case '비행':
            return 'flying';
        case '독':
            return 'poison';
        case '땅':
            return 'ground';
        case '바위':
            return 'rock';
        case '벌레':
            return 'bug';
        case '고스트':
            return 'ghost';
        case '강철':
            return 'steel';
        case '불꽃':
            return 'fire';
        case '물':
            return 'water';
        case '풀':
            return 'grass';
        case '전기':
            return 'electric';
        case '에스퍼':
            return 'psychic';
        case '얼음':
            return 'ice';
        case '드래곤':
            return 'dragon';
        case '악':
            return 'dark';
        case '페어리':
            return 'fairy';
        default:
            return '';
    }
};
