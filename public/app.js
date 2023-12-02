import { pokemonList, loading, limit } from "./pokemonList.js";

const main = document.getElementById("main");
const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const [searchInputControl] =
    document.getElementsByClassName("searchInputControl");

const pokemonListArea = document.getElementById(`pokemonListArea`);

// 검색 돋보기 클릭 이벤트
searchBtn.addEventListener(`click`, () => {
    searchEventAll();
});

// 검색 엔터키 이벤트
searchText.addEventListener("keyup", () => {
    if (window.event.keyCode === 13) {
        // 엔터키가 눌렸을 때
        searchEventAll();
    }
});

// 클릭, 엔터 이벤트 공통
export const searchEventAll = () => {
    if (loadNextPokemons) clearInterval(loadNextPokemons);
    const idOrName = searchText.value;
    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    // 정규식 검색, 다중 검색
    const searchResult = pokemonSearch(idOrName);
    searchResult.forEach((element) => {
        addHtml(element);
    });
};

// 카드 HTML 요소 만드는 함수
const makeCard = (item) => {
    const pokeImg = `./images/poke-ball.png`;
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCrad`);
    newTag.setAttribute(`id`, `pokemonCrad_${item.id}`);

    // 속성 타입 선택
    const typeClass1 = selectTypes(item.types[0]);
    const typeClass1Path = `./images/type-images/${typeClass1}.svg`;
    const typeClass2 = selectTypes(item.types[1]);
    const typeClass2Path = `./images/type-images/${typeClass2}.svg`;

    newTag.innerHTML = `
                <p class="pokemonName"><img src="${pokeImg}" alt="poke-ball" class="poke-ball"/>${
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
};

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
    // 새로운 포켓몬 로드 중지
    if (loadNextPokemons) clearInterval(loadNextPokemons);

    // 입력창에 속성값 표시
    searchInputControl.innerHTML = `<span class="searchTypeResult"><img src=${event.currentTarget.childNodes[1].src} width="32" height="32" />
            <span>${event.currentTarget.childNodes[3].innerText}</span></span>
    `;

    // 결과창 리셋하고 높이 자동 조절
    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    const target = pokemonList.filter((pokemon) =>
        pokemon.types.includes(event.currentTarget.childNodes[3].innerText),
    );

    // 아래 pokemonListArea 에 포켓몬 보여주기
    target.forEach((element) => {
        addHtml(element);
    });
};

typeButtons.forEach((button) =>
    button.addEventListener(`click`, typeButtonHandler),
);

// 최초 10마리 불러왔으면 로딩 화면 중지
let loadingCheck = setInterval(() => {
    if (!loading) {
        main.classList.remove("loading");
        main.childNodes[1].style.display = "none";
        pokemonList.forEach((pokemon) => addHtml(pokemon));
        clearInterval(loadingCheck);
    }
}, 1000);

// 3초 간격으로 이후에 로드해 온 결과 화면에 추가
let loadNextPokemons = setInterval(() => {
    // 현재 화면에 표시된 포켓몬 아이디 구하기
    let currentPokemonIds = [];
    for (let index = 0; index < pokemonListArea.children.length; index++) {
        const element = pokemonListArea.children[index].id;
        currentPokemonIds.push(Number(element.split("_")[1]));
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
