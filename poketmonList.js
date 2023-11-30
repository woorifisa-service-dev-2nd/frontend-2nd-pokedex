// 속성-한글 데이터
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

export let pokomonList;

// 전체 포켓몬을 줄세워 데려오기 *{name, url} Array: end-start+1개
const getPocketmonList = (start, end) => {
    // url = `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0`; //id : 0~1291
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`;
    const options = { method: `GET` };
    // ={name, url} Array: *1292
    return fetch(url, options)
        .then((response) => response.json())
        .then((object) => {
            // console.log(object);
            return object.results.map((obj) => getItem(obj.name));
        });
};

// 속성한글 이름을 위 typeListAll데이터에서 찾아 매핑
const mapEngTypeNameToKorTypeName = (data) => {
    return data.map((item) => {
        const enName = item.type.name;
        return typeListAll.find((type) => type.name === enName).ko;
    });
};

// 해당 name을 가진 포켓몬의 정보를 담은 객체 반환
const getItem = (name) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((spInfo) => spInfo.json())
        .then((o) => {
            return {
                newUrl: o.species.url,
                id: o.id,
                name: `이름`,
                enName: `enName`,
                flavorText: `flavorText`,
                genera: `genera`,
                types: mapEngTypeNameToKorTypeName(o.types), // 한글 속성으로 변경
                img:
                    o?.sprites?.versions?.[`generation-v`]?.[`black-white`]
                        ?.animated?.front_default || o?.sprites?.front_default,
                height: o.height,
                weight: o.weight,
            };
        })
        .then((PocketMon) => {
            // console.log(PocketMon);
            return fetch(PocketMon.newUrl, {
                method: `GET`,
                headers: {
                    Accept: `application / json`,
                },
            })
                .then((spInfo) => spInfo.json())
                .then((o) => {
                    PocketMon.flavorText = o.flavor_text_entries.filter(
                        (v) => v.language.name === `ko`,
                    )[0].flavor_text;

                    PocketMon.name = o.names[2].name;
                    PocketMon.enName = o.names[1].name;
                    PocketMon.genera = o.genera[1].genus;
                    // console.log(PocketMon);
                    return PocketMon;
                });
        });
};

// getPocketmonList(0, 1292); // 0~1292

getPocketmonList(0, 500).then((res) => {
    Promise.all(res).then((res) => {
        pokomonList = res;
        console.log(pokomonList);
    });
});
