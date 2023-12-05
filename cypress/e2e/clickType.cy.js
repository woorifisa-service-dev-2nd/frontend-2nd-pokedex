describe(`template spec`, () => {
    const testList = [
        { en: `normal`, ko: `노말` },
        { en: `fighting`, ko: `격투` },
        { en: `flying`, ko: `비행` },
        { en: `poison`, ko: `독` },
        { en: `ground`, ko: `땅` },
        { en: `rock`, ko: `바위` },
        { en: `bug`, ko: `벌레` },
        { en: `ghost`, ko: `고스트` },
        { en: `steel`, ko: `강철` },
        { en: `fire`, ko: `불꽃` },
        { en: `water`, ko: `물` },
        { en: `grass`, ko: `풀` },
        { en: `electric`, ko: `전기` },
        { en: `psychic`, ko: `에스퍼` },
        { en: `ice`, ko: `얼음` },
        { en: `dragon`, ko: `드래곤` },
        { en: `dark`, ko: `악` },
        { en: `fairy`, ko: `페어리` },
    ];

    it(`속성을 클릭하면 해당 타입이 검색창에 입력`, () => {
        cy.visit(`http://localhost:3000/`);
        testList.forEach((o) => {
            cy.get(`#${o.en}`).click();
            cy.get(`.searchTypeResult span`).should(`have.text`, o.ko);
        });
    });
});
