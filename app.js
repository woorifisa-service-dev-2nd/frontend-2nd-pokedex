import { pokomonList } from "./poketmonList.js";
const searchText = document.getElementById(`searchText`);
const searchBtn = document.getElementById(`searchBtn`);
const pokemonName = document.getElementsByClassName(`pokemonName`);
const pokemonId = document.getElementsByClassName(`id`);
const image = document.getElementsByClassName(`image`);
const type1 = document.getElementsByClassName(`type1`);
const type2 = document.getElementsByClassName(`type2`);
// 검색 돋보기 클릭 이벤트
searchBtn.addEventListener(`click`, () => {
    searchEventAll();
});
// 검색 엔터키 이벤트
searchText.addEventListener('keyup', () => {
    if (window.event.keyCode === 13) {
        // 엔터키가 눌렸을 때
        searchEventAll();
    }
})
// 클릭, 엔터 이벤트 공통
const searchEventAll = () => {
    const idOrName = searchText.value;
    const pokemonListArea = document.getElementById(`pokemonListArea`);
    pokemonListArea.innerHTML = ``;

    // 정규식 검색, 다중 검색
    const searchResult = pokemonSearch2(idOrName);
    searchResult.forEach((element) => {
        addHtml(element);
    });
}
// 포켓몬 리스트 추가
const addHtml = (item) => {
    const pokemonListArea = document.getElementById(`pokemonListArea`);
    const pokeImg = `poke-ball.png`;
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCrad`);
    newTag.setAttribute(`id`, `pokemonCrad_${item.id}`);

    // 속성 타입 선택
    const typeId1 = selectTypes(item.types[0]);
    const typeId2 = selectTypes(item.types[1]);

    newTag.innerHTML = `
                <p class="pokemonName"><img src="${pokeImg}" alt="" />${item.name}</p>
                <p class="id"># ${item.id}</p>
                <div class="image-gif">
                    <img class="image" src="${item.img}" alt="" /><br />
                </div>
                <div class="types">
                    ${item.types.length === 1 ? `<span id="${typeId1}" class="type1" style="border: 1px solid; width: 90%; margin-left: 5%">${item.types[0]}</span>` : ``}
                    ${item.types.length === 2 ? `<span id="${typeId1}" class="type1">${item.types[0]}</span><span id="${typeId2}" class="type2">${item.types[1]}</span>` : ``}
                </div>
                `;
    pokemonListArea.appendChild(newTag);
};

// 속성 타입 선택
const selectTypes = (type) => {
    if (type === `노말`) {
        return `normal`;
    }
    else if (type === `격투`) {
        return `fighting`;
    }
    else if (type === `비행`) {
        return `flying`;
    }
    else if (type === `독`) {
        return `poison`;
    }
    else if (type === `땅`) {
        return `ground`;
    }
    else if (type === `바위`) {
        return `rock`;
    }
    else if (type === `벌레`) {
        return `bug`;
    }
    else if (type === `고스트`) {
        return `ghost`;
    }
    else if (type === `강철`) {
        return `steel`;
    }
    else if (type === `불꽃`) {
        return `fire`;
    }
    else if (type === `물`) {
        return `water`;
    }
    else if (type === `풀`) {
        return `grass`;
    }
    else if (type === `전기`) {
        return `electric`;
    }
    else if (type === `에스퍼`) {
        return `psychic`;
    }
    else if (type === `얼음`) {
        return `ice`;
    }
    else if (type === `드래곤`) {
        return `dragon`;
    }
    else if (type === `악`) {
        return `dark`;
    }
    else if (type === `페어리`) {
        return `fairy`;
    }
    else {
        return ``;
    }
}

const pokemonSearch2 = (input) => {
    const regex = new RegExp(`${input}`, `g`);
    return pokomonList.filter((pockemon) => pockemon.name.match(regex));
};
const typeButtons = document.querySelectorAll(`button`);
const typeButtonHandler = (event) => {
    // pokemonSearch(`이상해`);
    // searchInputControl.innerHTML =
    //     `<span class="searchTypeResult"><img src=${event.currentTarget.childNodes[1].src} width="32" height="32" />
    //         <span>${event.currentTarget.childNodes[3].innerText}</span></span>
    // ` +
    //     searchText.outerHTML +
    //     searchBtn.outerHTML;
    const pokemonListArea = document.getElementById(`pokemonListArea`);
    pokemonListArea.innerHTML = ``;
    const target = pokomonList.filter((pockemon) =>
        pockemon.types.includes(event.currentTarget.childNodes[3].innerText),
    );
    // 3. 아래 pokemonListArea 에 포켓몬 보여주기
    console.log(target);
    target.forEach((element) => {
        addHtml(element);
    });
};

typeButtons.forEach(button => {
    if (button.id !== `searchBtn`) {
        // console.log(button.id);
        button.addEventListener(`click`, typeButtonHandler);
    }
});
