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

const express = require(`express`);
const request = require("request");

// 하나의 고유한 서버 인스턴스 생성해서 app이라는 변수에 할당
const app = express();

// 속성한글 이름을 위 typeListAll데이터에서 찾아 매핑
const mapEngTypeNameToKorTypeName = (data) => {
    return data.map((item) => {
        const enName = item.type.name;
        return typeListAll.find((type) => type.name === enName).ko;
    });
};

app.use(express.static("public"));
app.use(express.json());

app.get(`/`, (req, res) => {
    res.sendFile(`index.html`);
});

const setOptions = (url) => {
    return {
        url,
        method: `GET`,
        headers: {
            "Content-Type": "application/json",
        },
    };
};

/**
 *  포켓몬 start~end까지 이름과  url 불러오는 요청
 */
app.get(`/pokemons`, (req, res) => {
    const end = req.query.end;
    const start = req.query.start;
    // ={name, url} Array: *1292

    request(
        setOptions(
            `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`,
        ),
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const names = JSON.parse(body).results.map((obj) => obj.name);
                res.json(names);
            }
        },
    );
});

app.get(`/pokemon`, (req, res) => {
    const name = req.query.name;

    request(
        setOptions(`https://pokeapi.co/api/v2/pokemon/${name}`),
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const result = JSON.parse(body);
                const pokemon = {
                    newUrl: result.species.url,
                    id: result.id,
                    name: `이름`,
                    enName: `enName`,
                    flavorText: `flavorText`,
                    genera: `genera`,
                    types: mapEngTypeNameToKorTypeName(result.types), // 한글 속성으로 변경
                    img:
                        result?.sprites?.versions?.[`generation-v`]?.[
                            `black-white`
                        ]?.animated?.front_default ||
                        result?.sprites?.front_default,
                    height: result.height,
                    weight: result.weight,
                };

                // pokomon-spcies/{name}
                request.get(
                    setOptions(pokemon.newUrl),
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            const result = JSON.parse(body);

                            pokemon.flavorText =
                                result.flavor_text_entries.filter(
                                    (v) => v.language.name === `ko`,
                                )[0].flavor_text;

                            pokemon.name = result.names[2].name;
                            pokemon.enName = result.names[1].name;
                            pokemon.genera = result.genera[1].genus;
                            res.send(pokemon);
                        }
                    },
                );
            }
        },
    );
});

app.listen(3000);
