const typeListAll = [
    { id: 1, ko: `노말`, name: `normal` },
    { id: 2, ko: `격투`, name: `fighting` },
    { id: 3, ko: `비행`, name: `flying` },
    { id: 4, ko: `독`, name: `poison` },
    { id: 5, ko: `땅`, name: `ground` },
    { id: 6, ko: `바위`, name: `rock` },
    { id: 7, ko: `벌레`, name: `bug` },
    { id: 8, ko: `고스트`, name: `ghost` },
    { id: 9, ko: `강철`, name: `steel` },
    { id: 10, ko: `불꽃`, name: `fire` },
    { id: 11, ko: `물`, name: `water` },
    { id: 12, ko: `풀`, name: `grass` },
    { id: 13, ko: `전기`, name: `electric` },
    { id: 14, ko: `에스퍼`, name: `psychic` },
    { id: 15, ko: `얼음`, name: `ice` },
    { id: 16, ko: `드래곤`, name: `dragon` },
    { id: 17, ko: `악`, name: `dark` },
    { id: 18, ko: `페어리`, name: `fairy` },
];

const mapEngTypeNameToKorTypeName = (data) => {
    return data.map((item) => {
        const enName = item.type.name;
        return typeListAll.find((type) => type.name === enName).ko;
    });
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

const getPockemonByType = (id) => {
    fetch(`https://pokeapi.co/api/v2/type/${id}`)
        .then((res) => res.json())
        .then((result) => console.log(result.pokemon));
};

const getPoketmonByType = (type) => {
    // fetch(`https://pokeapi.co/api/v2/pokemon/16/`)
    //     .then((res) => res.json())
    //     .then((res) => console.log(res));
    // const pokemonId 포켓몬 id = res.id
    // const pokemonType 포켓몬 type = res.types {slot:number, type: {name:string, url:string}}[]
    // 포켓몬 img = res?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default || pokemonInfo?.sprites?.front_default
    // 키 res.height
    // 몸무게 res.weight

    /// / ability res.abilities https://pokeapi.co/api/v2/ability/77/다시요청보내긴해야 함

    fetch(`https://pokeapi.co/api/v2/pokemon-species/16`);
};

// const pokemonName 한국어 이름 res.names.find(name=>name.langguage.name === ko)
// res.flaver_text_entries : {flavor_text:string, language:{name:string, url:string}}[] -> 여기에서 language.name이 ko인 거 찾기 여러 개인듯
// 종 res.genera : {genus:string, language:{name:string, url:string}}[] -> 여기에서 language.name이 ko인 것 찾기

const typeButtonHandler = (event) => {
    // 현재 클릭된 타입 이미지
    console.log(event.currentTarget.childNodes[1].src);
    // 현재 클릭된 타입 이름
    console.log(event.currentTarget.childNodes[3].innerText);
};

getPockemonByType(typeListAll[0].id);

normalButton.addEventListener(`click`, typeButtonHandler);
fightingButton.addEventListener(`click`, typeButtonHandler);
flyingButton.addEventListener(`click`, typeButtonHandler);
poisonButton.addEventListener(`click`, typeButtonHandler);
groundButton.addEventListener(`click`, typeButtonHandler);
rockButton.addEventListener(`click`, typeButtonHandler);
bugButton.addEventListener(`click`, typeButtonHandler);
ghostButton.addEventListener(`click`, typeButtonHandler);
steelButton.addEventListener(`click`, typeButtonHandler);
fireButton.addEventListener(`click`, typeButtonHandler);
waterButton.addEventListener(`click`, typeButtonHandler);
grassButton.addEventListener(`click`, typeButtonHandler);
electricButton.addEventListener(`click`, typeButtonHandler);
psychicButton.addEventListener(`click`, typeButtonHandler);
iceButton.addEventListener(`click`, typeButtonHandler);
dragonButton.addEventListener(`click`, typeButtonHandler);
darkButton.addEventListener(`click`, typeButtonHandler);
fairyButton.addEventListener(`click`, typeButtonHandler);
