import { selectTypes, pokemonListArea } from "../app.js";
import { pokemonList } from "../pokemonList.js";

// 포켓몬 디테일
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

// 카드 HTML 요소 만드는 함수
const makeCard = (item) => {
    const pokeImg = `../images/poke-ball.png`;
    const newTag = document.createElement(`div`);
    newTag.setAttribute(`class`, `pokemonCard`);
    newTag.setAttribute(`id`, `pokemonCard_${item.id}`);
    newTag.addEventListener(`click`, cardClickHandler);

    // 속성 타입 선택
    const typeClass1 = selectTypes(item.types[0]);
    const typeClass1Path = `../images/type-images/${typeClass1}.svg`;
    const typeClass2 = selectTypes(item.types[1]);
    const typeClass2Path = `../images/type-images/${typeClass2}.svg`;

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

// 포켓몬 카드 결과 영역에 추가
export const addHtml = (item) => {
    pokemonListArea.appendChild(makeCard(item));
};

const cardClickHandler = (e) => {
    const id = e.currentTarget.id.replace(/[^0-9]/g, ``);
    const pokemon = pokemonList.find((p) => p.id.toString() === id);

    displayDetailCard(pokemon);
};

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
