import { pokemonList, loading, limit } from "./pokemonList.js";

const main = document.getElementById(`main`);
const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const [searchInputControl] =
    document.getElementsByClassName(`searchInputControl`);

const pokemonListArea = document.getElementById(`pokemonListArea`);

document.querySelector(`header > img`).addEventListener(`click`, () => {
    window.scrollTo({ top: 0, behavior: `smooth` });
    searchInputControl.innerHTML = ``;
    searchText.value = ``;
    const searchResult = pokemonSearch(``);
    searchEventAll(searchResult);
});

// 검색 돋보기 클릭 이벤트
searchBtn.addEventListener(`click`, () => {
    const idOrName = searchText.value;
    if (idOrName.length > 0) {
        // 정규식 검색, 다중 검색
        const searchResult = pokemonSearch(idOrName);
        searchEventAll(searchResult);
    }
});

// 검색창 속성값 삭제
searchInputControl.addEventListener(`click`, () => {
    searchInputControl.innerHTML = ``;
    searchText.focus();
});

// 검색 엔터키 이벤트
searchText.addEventListener(`keyup`, () => {
    if (window.event.keyCode === 13) {
        const idOrName = searchText.value;
        // 정규식 검색, 다중 검색
        const searchResult = pokemonSearch(idOrName);
        // 엔터키가 눌렸을 때
        searchEventAll(searchResult);
    }
});

// 클릭, 엔터 이벤트 공통
export const searchEventAll = (target) => {
    if (loadNextPokemons) clearInterval(loadNextPokemons);

    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    target.forEach((element) => {
        addHtml(element);
    });
};

// 카드 HTML 요소 만드는 함수
const makeCard = (item) => {
    const pokeImg = `./images/poke-ball.png`;
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCard`);
    newTag.setAttribute(`id`, `pokemonCard_${item.id}`);
    newTag.addEventListener(`click`, cardClickHandler);

    // 속성 타입 선택
    const typeClass1 = selectTypes(item.types[0]);
    const typeClass1Path = `./images/type-images/${typeClass1}.svg`;
    const typeClass2 = selectTypes(item.types[1]);
    const typeClass2Path = `./images/type-images/${typeClass2}.svg`;

    /* eslint-disable indent */
    newTag.innerHTML = `
                <p class="pokemonName"><img src="${pokeImg}" alt="" />${
                    item.name
                }</p>
                <p class="id"># ${item.id}</p>
                <div class="image-gif">
                    <img class="image" src="${item.img}" alt="" /><br />
                </div>
                <div class="types">
                    ${
                        item.types.length === 1
                            ? `<span class="type1 ${typeClass1}" style="border: 1px solid; width: 90%; margin-left: 5%"><img class="types-icon-1" src=${typeClass1Path} alt="" width="20" height="20"/>${item.types[0]}</span>`
                            : ``
                    }
                    ${
                        item.types.length === 2
                            ? `<span class="type1 ${typeClass1}"><img class="types-icon-2" src=${typeClass1Path} alt="" width="20" height="20" />${item.types[0]}</span><span class="type2 ${typeClass2}"><img class="types-icon-2" src=${typeClass2Path} alt="" width="20" height="20" />${item.types[1]}</span>`
                            : ``
                    }
                </div>
                `;
    return newTag;
    /* eslint-enable indent */
};

const cardClickHandler = (e) => {
    const id = e.currentTarget.id.replace(/[^0-9]/g, ``);
    const pokemon = pokemonList.find((p) => p.id.toString() === id);

    displayDetailCard(pokemon);
};

const background = document.querySelector(`#background`);
const detailContainer = document.getElementById(`detail-container`);
const detailGenera = detailContainer.querySelector(`#genera`);
const detailId = document.querySelector(`#detail-id`);
const mainImg = document.querySelector(`#main-image`);
const detailName = document.querySelector(`#detail-name`);
const detailDesc = document.querySelector(`#detail-desc`);
const detailHeight = document.querySelector(`#height`);
const detailWeight = document.querySelector(`#weight`);
const detailImgs = detailContainer.querySelector(`#image-wrap`);

const displayDetailCard = (pokemon) => {
    const detailTypes = document.createElement(`div`);
    detailTypes.id = `type-wrap`;

    pokemon.types.forEach((type) => {
        const enType = selectTypes(type);

        const typeTag = document.createElement(`div`);
        typeTag.id = `type-${enType}`;
        typeTag.classList.add(`detail-type`);
        typeTag.classList.add(enType);
        typeTag.innerHTML = `<img class="detail-type-icon" src="images/type-images/${enType}.svg"/>${type}`;

        detailTypes.appendChild(typeTag);
    });

    detailGenera.innerText = pokemon.genera;
    detailGenera.appendChild(detailTypes);

    detailId.innerText = `No.${String(pokemon.id).padStart(4, `0`)}`;

    mainImg.src = pokemon.img;

    detailName.innerText = pokemon.name;

    detailDesc.innerText = pokemon.flavorText.replace(/\n/g, ` `);

    detailHeight.innerText = pokemon.height;

    detailWeight.innerText = pokemon.weight;

    pokemon.imgs.forEach((img) => {
        detailImgs.innerHTML += `<img class="detail-image" src=${img}>`;
    });

    document.body.style.overflow = `hidden`;
    detailContainer.scrollTo(0, 0);
    background.className = `__visible`;
    detailContainer.className = `__visible`;
};

document.getElementById(`detail-close-btn`).addEventListener(`click`, () => {
    document.body.style.removeProperty(`overflow`);
    background.className = `__invisible`;
    detailContainer.className = `__invisible`;
    detailGenera.innerHTML = ``;
    detailImgs.innerHTML = ``;
});

// 포켓몬 카드 결과 영역에 추가
const addHtml = (item) => {
    pokemonListArea.appendChild(makeCard(item));
};

// 포켓몬 검색 함수
const pokemonSearch = (input) => {
    const regex = new RegExp(`${input}`, `g`);
    return pokemonList.filter((pockemon) => pockemon.name.match(regex));
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
const loadNextPokemons = setInterval(() => {
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

// 속성 타입 선택
const selectTypes = (type) => {
    if (type === `노말`) {
        return `normal`;
    } else if (type === `격투`) {
        return `fighting`;
    } else if (type === `비행`) {
        return `flying`;
    } else if (type === `독`) {
        return `poison`;
    } else if (type === `땅`) {
        return `ground`;
    } else if (type === `바위`) {
        return `rock`;
    } else if (type === `벌레`) {
        return `bug`;
    } else if (type === `고스트`) {
        return `ghost`;
    } else if (type === `강철`) {
        return `steel`;
    } else if (type === `불꽃`) {
        return `fire`;
    } else if (type === `물`) {
        return `water`;
    } else if (type === `풀`) {
        return `grass`;
    } else if (type === `전기`) {
        return `electric`;
    } else if (type === `에스퍼`) {
        return `psychic`;
    } else if (type === `얼음`) {
        return `ice`;
    } else if (type === `드래곤`) {
        return `dragon`;
    } else if (type === `악`) {
        return `dark`;
    } else if (type === `페어리`) {
        return `fairy`;
    } else {
        return ``;
    }
};
