import { describe, expect, test, beforeEach } from "vitest";
import {
    getPokemonNames,
    getPokemonDetail,
    testGetPokemonGroups,
} from "./pokemonList.js";

describe(`getPokemonDetail() 함수 테스트 written by 송원섭`, () => {
    test(`이상해씨 정보`, async () => {
        const pokemonNameEn = `bulbasaur`; // 이상해씨 영어 이름

        const expected = {
            newUrl: `https://pokeapi.co/api/v2/pokemon-species/1/`,
            id: 1,
            name: `이상해씨`,
            enName: `Fushigidane`,
            flavorText: `태어났을 때부터 등에\n이상한 씨앗이 심어져 있으며\n몸과 함께 자란다고 한다.`,
            genera: `씨앗포켓몬`,
            types: [`풀`, `독`],
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif`,
            height: 7,
            weight: 69,
            imgs: [
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`,
            ],
        };

        const result = await getPokemonDetail(pokemonNameEn);

        expect(result).toEqual(expected);
    });
});

describe(`getPokemonNames 함수 테스트 written by 조명하`, () => {
    test(`offset=0, limit=10인 경우`, async () => {
        const offset = 0;
        const limit = 10;
        const expected = [
            `bulbasaur`,
            `ivysaur`,
            `venusaur`,
            `charmander`,
            `charmeleon`,
            `charizard`,
            `squirtle`,
            `wartortle`,
            `blastoise`,
            `caterpie`,
        ];
        const result = await getPokemonNames(offset, limit).then((res) => res);
        expect(result).toEqual(expected);
    });
});

/**
 * pokemonList 가 전역 변수라서
 * 테스트 중 localhost 에 접속하면 안되는 이슈로
 * 테스트용 메서드 사용
 */
describe.skip(`getPokemonGroups 테스트 written by 박은혜`, async () => {
    let pokemonList = [];

    beforeEach(() => {
        pokemonList = [];
    });

    test(`limit 개수 만큼 데이터를 응답받는지 테스트`, async () => {
        const start = 0;
        const offset = 10;
        const end = 20;
        const expected = end;

        await testGetPokemonGroups(start, offset, end, pokemonList);

        const result = pokemonList.length;

        expect(result).toBe(expected);
    });
});
