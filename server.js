const express = require(`express`);

// 하나의 고유한 서버 인스턴스 생성해서 app이라는 변수에 할당
const app = express();

app.use(express.json());

app.get(`/`, (req, res) => {
    res.sendFile(__dirname + `./index.html`);
});

app.get(`pockemonNames`, (req, res) => {
    // const url = `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`;
    // const options = { method: `GET` };
    // // ={name, url} Array: *1292
    // return fetch(
    //     `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`,
    //     options,
    // )
    //     .then((response) => response.json())
    //     .then((object) => {
    //         // console.log(object);
    //         return object.results.map((obj) => getItem(obj.name));
    //     });
});

app.get(`/pockemons`, (req, res) => {});

app.listen(3000);
