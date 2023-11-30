const text = document.getElementById('poketmon');
const img = document.getElementById('img');
const optionsFrom = (method, body, headers) => {
    method,
        body,
        headers
}
//전체 포켓몬을 줄세워 데려오기
const getPocketmonList = () => {
    url = `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0`; //id : 0~1291
    const options = optionsFrom(
        'GET',
    )
    //프로미스 공부 필요;;저도 이해가 안가요
    const array = fetch(url, options)
        .then((response) => { return response.json(); })//promise, return
        .then((object) => { console.log(object.results); });//{name, url} Array: *1292
}


const getPocketFrom = (name, url) => {
    gUrl = `https://pokeapi.co/api/v2/pokemon/${name}`
    const options = optionsFrom(
        'GET',
    )
    //url -> "front_default" 이미지 png, gif 선택
    fetch(url, options)
        .then((response) => { console.log(response.json()); })
    //.then((object) => {console.log(object.results)})
    return
    //사진
    //이름
    //속성
    //종류
    //신장
    //무게
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
//onst object = [getPocketmonList()];
const pocketMonArray = getPocketmonList().then((ob) => { console.log(ob); })
console.log(pocketMonArray);
//console.log(typeof object[0]);
//getPocketFrom(getPocketmonList()[0].name);