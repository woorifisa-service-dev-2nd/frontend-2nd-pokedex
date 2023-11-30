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

searchBtn.addEventListener(`click`, async () => {
    const idOrName = searchText.value;

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

const pokemonSearch = (a, b, c, d, e) => {
    pokemonName.innerHTML = `<img class='poke-ball' src="poke-ball.png" alt="" />${map.get(
        a,
    )}`;
    pokemonId.innerHTML = `# ${b}`;
    type1.innerHTML = c;
    type2.innerHTML = d;
    image.setAttribute(`src`, e);
};
