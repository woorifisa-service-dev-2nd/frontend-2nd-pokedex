export let pokemonList = [];
export let loading;
export let limit;

// 처음은 로딩화면 보여주는 걸로 시작
loading = true;

const options = {
    method: `GET`,
    headers: {
        "Content-Type": `application/json`,
    },
};

// 포켓몬 이름 리스트 요청 : offset 부터 limit 개 가져옴
const getPokemonNames = async (offset, limit) => {
    const url = `http://localhost:3000/pokemons?offset=${offset}&limit=${limit}`;

    return await fetch(url, options)
        .then((response) => response.json())
        .then((names) => {
            return names.map((name) => {
                return getPokemonDetail(name);
            });
        });
};

// 포켓몬 상세정보 요청
const getPokemonDetail = async (name) => {
    const url = `http://localhost:3000/pokemon?name=${name}`;
    return await fetch(url, options)
        .then((response) => response.json())
        .then((data) => data);
};

// 포켓몬 10마리씩 끊어서 요청 보내기
const getPokemonGroups = async () => {
    let offset = 0;
    while (offset < limit) {
        // 일단 데이터 불러올 때까지 기다렸다가 불러온 이후에 로딩 끄기 위해 block
        await getPokemonNames(offset, 10).then(async (names) => {
            // 10마리 데이터 다 불러올 때까지 기다렸다가 데이터만 모아서 pokemonList에 추가
            await Promise.all(names).then((res) => {
                pokemonList = pokemonList.concat(res);
            });
        });

        offset += 10;
        if (loading) loading = false; // 일단 한 번 데이터 가져오면 로딩화면 끄기
    }
    return pokemonList;
};

// 한도 개수 지정
limit = 30;
getPokemonGroups().then((res) => console.log(`final`, res));
