import { expect, test } from 'vitest'; // vitest에서 제공하는 expect(), test() import
import { getPokemonDetail } from './pokemonList.js';

test(`getPokemonDetail() 값이 잘 리턴되는가?`, async () => {
    const pokemonNameEn = `bulbasaur`; // 이상해씨 영어 이름

    const expected = {
        "newUrl": `https://pokeapi.co/api/v2/pokemon-species/1/`,
        "id": 1,
        "name": `이상해씨`,
        "enName": `Fushigidane`,
        "flavorText": `태어났을 때부터 등에\n이상한 씨앗이 심어져 있으며\n몸과 함께 자란다고 한다.`,
        "genera": `씨앗포켓몬`,
        "types": [
            `풀`,
            `독`
        ],
        "img": `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`,
        "height": 7,
        "weight": 69,
        "imgs": [
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png`,
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`
        ]
    };

    const result = await getPokemonDetail(pokemonNameEn);
    // console.log(result);
    // console.log(expected);

    expect(result).toEqual(expected);


});