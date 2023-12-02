export let pokemonList = [];
export let loading;
loading = true;

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
};

// 전체 포켓몬을 줄세워 데려오기 *{name, url} Array: end-start+1개
const getPokemonNames = async (start, end) => {
    // url = `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0`; //id : 0~1291
    const url = `http://localhost:3000/pokemons?start=${start}&end=${end}`;

    // ={name, url} Array: *1292

    return await fetch(url, options)
        .then((response) => response.json())
        .then((names) => {
            return names.map((name) => {
                return getPokemonDetail(name);
            });
        });
};

const getPokemonDetail = async (name) => {
    const url = `http://localhost:3000/pokemon?name=${name}`;

    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => data);
};

// getPoketmonList(0, 1292); // 0~1292
// getPokemonNames(0, 10).then(async (res) => {
//     await Promise.all(res).then((res) => {
//         console.log("~10", res);
//         pokemonList = pokemonList.concat(res);
//         console.log("list", pokemonList);
//     });
// }); // 0~1292
// getPokemonNames(10, 10).then(async (res) => {
//     await Promise.all(res).then((res) => {
//         console.log("~20", res);
//         pokemonList = pokemonList.concat(res);
//         console.log("list", pokemonList);
//     });
// });
// getPokemonNames(20, 10).then(async (res) => {
//     await Promise.all(res).then((res) => {
//         pokemonList = pokemonList.concat(res);
//         console.log("~30", pokemonList);
//     });
// });

const getPokemonGroups = async (limit) => {
    let offset = 0;
    while (offset < limit) {
        await getPokemonNames(offset, 10).then(async (res) => {
            await Promise.all(res).then((res) => {
                pokemonList = pokemonList.concat(res);
            });
        });
        offset += 10;
        loading = false;
    }
    return pokemonList;
};

getPokemonGroups(30).then((res) => console.log("final", res));
