import { pokemonList, loading } from "./pokemonList.js";

const main = document.getElementById(`main`);
const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const [searchInputControl] =
    document.getElementsByClassName(`searchInputControl`);

const pokemonListArea = document.getElementById(`pokemonListArea`);

// 검색 돋보기 클릭 이벤트
searchBtn.addEventListener(`click`, () => {
    searchEventAll();
});

// 검색창 속성값 삭제
searchInputControl.addEventListener(`click`, () => {
    searchInputControl.innerHTML = ``;
    searchText.focus();
})

// 검색 엔터키 이벤트
searchText.addEventListener(`keyup`, () => {
    if (window.event.keyCode === 13) {
        // 엔터키가 눌렸을 때
        searchEventAll();
    }
});

// 클릭, 엔터 이벤트 공통
export const searchEventAll = () => {
    const idOrName = searchText.value;
    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    // 정규식 검색, 다중 검색
    const searchResult = pokemonSearch(idOrName);
    searchResult.forEach((element) => {
        addHtml(element);
    });
};

// 포켓몬 리스트 추가
const addHtml = (item) => {
    const pokeImg = `./images/poke-ball.png`;
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCard`);
    newTag.setAttribute(`id`, `pokemonCard_${item.id}`);

    // 속성 타입 선택
    const typeClass1 = selectTypes(item.types[0]);
    const typeClass2 = selectTypes(item.types[1]);

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
                            ? `<span class="type1 ${typeClass1}" style="border: 1px solid; width: 90%; margin-left: 5%">${item.types[0]}</span>`
                            : ``
                    }
                    ${
                        item.types.length === 2
                            ? `<span class="type1 ${typeClass1}">${item.types[0]}</span><span class="type2 ${typeClass2}">${item.types[1]}</span>`
                            : ``
                    }
                </div>
                `;
    /* eslint-enable indent */
    pokemonListArea.appendChild(newTag);
};

const pokemonSearch = (input) => {
    const regex = new RegExp(`${input}`, `g`);
    return pokemonList.filter((pockemon) => pockemon.name.match(regex));
};

const typeButtons = document.querySelectorAll(`.type_button`);

const typeButtonHandler = (event) => {
    searchInputControl.innerHTML = `<span class="searchTypeResult"><img src=${event.currentTarget.childNodes[1].src} width="32" height="32" />
            <span>${event.currentTarget.childNodes[3].innerText}</span></span>
    `;

    console.log(`text`, event.currentTarget.childNodes[3].innerText);

    searchText.value = ``;
    pokemonListArea.innerHTML = ``;
    main.style.height = `auto`;

    const target = pokemonList.filter((pokemon) =>
        pokemon.types.includes(event.currentTarget.childNodes[3].innerText),
    );

    // 3. 아래 pokemonListArea 에 포켓몬 보여주기
    console.log(target);

    target.forEach((element) => {
        addHtml(element);
    });
};

typeButtons.forEach((button) =>
    button.addEventListener(`click`, typeButtonHandler),
);

const loadingCheck = setInterval(() => {
    if (!loading) {
        // console.log("done", pokemonList);
        main.classList.remove(`loading`);
        main.childNodes[1].style.display = `none`;

        clearInterval(loadingCheck);
    }
}, 1000);

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
