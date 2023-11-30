import { pokomons } from "./poketmonList.js";

const map = new Map();

map.set(`1`, `bulbasaur`);
map.set(`이상해씨`, `bulbasaur`);
map.set(`bulbasaur`, `이상해씨`);
map.set(`4`, `charmander`);
map.set(`파이리`, `charmander`);
map.set(`charmander`, `파이리`);
map.set(`7`, `squirtle`);
map.set(`꼬부기`, `squirtle`);
map.set(`squirtle`, `꼬부기`);

const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const pokemonName = document.getElementById(`pokemonName`);
const pokemonId = document.getElementById(`id`);
const image = document.getElementById(`image`);
const type1 = document.getElementById(`type1`);
const type2 = document.getElementById(`type2`);
const [searchInputControl] = document.getElementsByClassName(`searchInputArea`);

searchBtn.addEventListener(`click`, async () => {
    const idOrName = searchText.value;
    console.log(searchText.value);

    const item = await getPekemonInfo(`${map.get(idOrName)}`);

    console.log(item.pokemonName);

    pokemonSearch(
        item.pokemonName,
        item.pokemonId,
        item.type1,
        item.type2,
        item.image,
    );
});

const getPekemonInfo = async (idOrName) => {
    let test;
    await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`, {
        method: `GET`,
    })
        .then((res) => res.json())
        .then((res) => {
            const img =
                res?.sprites?.versions?.[`generation-v`]?.[`black-white`]
                    ?.animated?.front_default || res?.sprites?.front_default;

            let type1 = ``;
            let type2 = ``;
            if (res.types.length === 2) {
                type1 = res.types[0].type.name;
                type2 = res.types[1].type.name;
            } else if (res.types.length === 1) {
                type1 = res.types[0].type.name;
                type2 = ``;
            }

            test = {
                pokemonName: res.species.name,
                pokemonId: res.id,
                type1,
                type2,
                image: img,
            };
        });

    return test;
};

const enterkey = async () => {
    if (window.event.keyCode === 13) {
        // 엔터키가 눌렸을 때
        const idOrName = searchText.value;

        const item = await getPekemonInfo(`${map.get(idOrName)}`);

        pokemonSearch(
            item.pokemonName,
            item.pokemonId,
            item.type1,
            item.type2,
            item.image,
        );
    }
};

const pokemonSearch = (input) => {
    pokomons.forEach((pockemon) => {
        const regex = new RegExp(`${input}`, `g`);

        if (pockemon.name.match(regex)) {
            console.log(pockemon);
        }
    });
};

const typeButtons = document.querySelectorAll(`button`);

const typeButtonHandler = (event) => {
    pokemonSearch(`이상해`);
    searchInputControl.innerHTML =
        `<span class="searchTypeResult"><img src=${event.currentTarget.childNodes[1].src} width="32" height="32" />
            <span>${event.currentTarget.childNodes[3].innerText}</span></span>
    ` +
        searchText.outerHTML +
        searchBtn.outerHTML;

    const target = pokomons.filter((pockemon) =>
        pockemon.types.includes(event.currentTarget.childNodes[3].innerText),
    );

    // 3. 아래 pokemonListArea 에 포켓몬 보여주기
    console.log(target);
};

typeButtons.forEach((button) =>
    button.addEventListener(`click`, typeButtonHandler),
);
