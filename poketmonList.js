const text = document.getElementById(`poketmon`);
const img = document.getElementById(`img`);
const optionsFrom = (method, body, headers) => {
  method, body, headers;
};
// 전체 포켓몬을 줄세워 데려오기
const getPocketmonList = (start, end) => {
  // url = `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0`; //id : 0~1291
  url = `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`;
  const options = optionsFrom(`GET`);
  // 프로미스 공부 필요;;저도 이해가 안가요
  const array = fetch(url, options)
    .then((response) => {
      return response.json();
    }) // promise, return
    .then((object) => {
      return object.results.map((obj) => {
        return getItem(obj.name);
      });
    });

  // {name, url} Array: *1292
  return array;
};

// 해당 id의

const getItem = (name) => {
  // 설명 가져오기
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((spInfo) => spInfo.json())
    .then((o) => {
      // console.log(o);
      const PocketMon = {
        new_url: o.species.url,
        id: o.id,
        name: `이름`,
        flavorText: ``,
        genera: `종`,
        types: o.types,
        img:
          o?.sprites?.versions?.[`generation-v`]?.[`black-white`]?.animated
            ?.front_default || o?.sprites?.front_default,
        height: o.height,
        weight: o.weight,
      };

      return PocketMon;
    })
    .then((PocketMon) => {
      fetch(PocketMon.new_url, { method: `GET` })
        .then((spInfo) => spInfo.json())
        .then((o) => {
            
            PocketMon.flavorText = o.flavor_text_entries.filter(
                (v) => v.language.name === `ko`
                )[0].flavor_text;
                
                PocketMon.name = o.names[2].name;
                PocketMon.genera = o.genera[1].genus;
                console.log(PocketMon);
          // console.log(
          //   `id ${o.id} text ${koreanFlavorText[0].flavor_text}, names ${names[2].name} genreko ${generaKo[1].genus}`
          // );

          return true;
        });
    });
};

getPocketmonList(0, 750); // id 386~ 진화종 1291
