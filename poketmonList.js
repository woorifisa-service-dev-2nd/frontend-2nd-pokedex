const text = document.getElementById(`poketmon`);
const img = document.getElementById(`img`);
const optionsFrom = (method, body, headers) => {
  method, body, headers;
};

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

// 전체 포켓몬을 줄세워 데려오기
const getPocketmonList = (start, end) => {
  // url = `https://pokeapi.co/api/v2/pokemon?limit=1292&offset=0`; //id : 0~1291
  url = `https://pokeapi.co/api/v2/pokemon?limit=${end}&offset=${start}`;
  const options = optionsFrom(`GET`);

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

// 속성 한글 매핑
const mapEngTypeNameToKorTypeName = (data) => {
  return data.map((item) => {
    const enName = item.type.name;
    return typeListAll.find((type) => type.name === enName).ko;
  });
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
        enName: `nana`,
        flavorText: ``,
        genera: `종`,
        types: mapEngTypeNameToKorTypeName(o.types), // TODO
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
          PocketMon.enName = o.names[1].name;
          PocketMon.genera = o.genera[1].genus;
          console.log(PocketMon);

          // console.log(
          //   `확인용 : id ${o.id} text ${koreanFlavorText[0].flavor_text}, names ${names[2].name} genreko ${generaKo[1].genus}`
          // );

          return PocketMon;
        });
    });
};

// getPocketmonList(0, 750); // id 386~ 진화종 1291

getPocketmonList(0, 500);
