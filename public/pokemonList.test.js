import { getPokemonNames } from "./pokemonList.js";
import { describe, expect, test } from "vitest";

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
