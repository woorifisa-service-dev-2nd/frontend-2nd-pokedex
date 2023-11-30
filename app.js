import { pokomonList } from "./poketmonList.js";

// const testlist = pokomonList[0];

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

// const pokemonName = document.getElementById(`pokemonName`);
// const pokemonId = document.getElementById(`id`);
// const image = document.getElementById(`image`);
// const type1 = document.getElementById(`type1`);
// const type2 = document.getElementById(`type2`);

const pokemonName = document.getElementsByClassName(`pokemonName`);
const pokemonId = document.getElementsByClassName(`id`);
const image = document.getElementsByClassName(`image`);
const type1 = document.getElementsByClassName(`type1`);
const type2 = document.getElementsByClassName(`type2`);

searchBtn.addEventListener(`click`, () => {
    const idOrName = searchText.value;
    console.log(searchText.value);

    const te = document.getElementById(`pokemonListArea`);
    te.innerHTML = ``;

    console.log(pokomonList[0]);

    console.log(idOrName);

    const searchPokemon = pokomonList.filter(
        (element) =>
            element.name === idOrName || element.id.toString() === idOrName,
    );

    const searchResult = pokemonSearch2(idOrName);

    // addHtml(searchResult);

    searchResult.forEach((element) => {
        addHtml(element);
    });

    searchPokemon.forEach((element) => {
        pokemonSearch(
            element.name,
            element.id,
            element.types[0],
            element.types[1],
            element.img,
        );
    });
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

        console.log(pokomonList);

        const testlist = pokomonList[0];

        pokemonSearch(
            testlist.name,
            testlist.id,
            testlist.types[0],
            testlist.types[1],
            testlist.img,
        );
    }
};

const pokemonSearch = (a, b, c, d, e) => {
    if (d !== undefined) type2[0].innerHTML = d;
    else type2[0].innerHTML = ``;

    pokemonName[0].innerHTML = a;
    pokemonId[0].innerHTML = `# ${b}`;
    type1[0].innerText = c;
    // type2[0].innerHTML = d;
    image[0].setAttribute(`src`, e);

    addHtml(b);
};

const addHtml = (item) => {
    const pokemonListArea = document.getElementById(`pokemonListArea`);
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCrad`);
    newTag.setAttribute(`id`, `pokemonCrad_${item.id}`);
    newTag.innerHTML = `
                <p class="pokemonName">${item.name}</p>
                <p class="id"># ${item.id}</p>
                <img class="image" src="${item.img}" alt="" /><br />
                <span class="type1">${item.types[0]}</span>
                <span class="type2">${item.types[1]}</span>`;

    pokemonListArea.appendChild(newTag);
};

const pokemonSearch2 = (input) => {
    const regex = new RegExp(`${input}`, `g`);
    return pokomonList.filter((pockemon) => pockemon.name.match(regex));
};

const [
    normalButton,
    fightingButton,
    flyingButton,
    poisonButton,
    groundButton,
    rockButton,
    bugButton,
    ghostButton,
    steelButton,
    fireButton,
    waterButton,
    grassButton,
    electricButton,
    psychicButton,
    iceButton,
    dragonButton,
    darkButton,
    fairyButton,
] = document.getElementsByClassName(`type_button`);

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
