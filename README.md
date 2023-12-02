# frontend-2nd-service by Myunagha Cho

## 활용 기술 - HTML, CSS, JS

## 주제 및 팀(팀원) 소개

## 협업 방식

## 기능 시연(실제로 시연 or gif 이미지 등)

## 핵심 기능 설명 및 구현 방법

- 포켓몬 검색, 포켓몬 속성 검색, 포켓몬 정규식 검색

``` javascript
    // 포켓몬 검색, 리스트 추가
    const searchResult = pokemonSearch(idOrName);
    searchResult.forEach((element) => {
        addHtml(element);
    });
```

``` javascript
    // 정규식 검색, 다중 검색
    const pokemonSearch = (input) => {
        const regex = new RegExp(`${input}`, `g`);
        return pokomonList.filter((pockemon) => pockemon.name.match(regex));
    };
```

``` javascript
    // 속성 타입별 이벤트
    const typeButtons = document.querySelectorAll(`button`);

    const typeButtonHandler = (event) => {
        const pokemonListArea = document.getElementById(`pokemonListArea`);
        pokemonListArea.innerHTML = ``;
        const target = pokomonList.filter((pockemon) =>
        pockemon.types.includes(event.currentTarget.childNodes[3].innerText),
        );
        // pokemonListArea 에 포켓몬 보여주기
        target.forEach((element) => {
            addHtml(element);
        });
    };

    typeButtons.forEach(button => {
        if (button.id !== `searchBtn`) {
            button.addEventListener(`click`, typeButtonHandler);
        }
    });
```

## 트러블 슈팅

- 포켓몬 검색 시 해당 문자가 포함된 모든 포켓몬 출력하기 위해 정규식 사용

``` javascript
    const regex = new RegExp(`${input}`, `g`);
```

## 회고(느낀점) - 팀원 전부 각자 느낀점

- 송원섭 : 파파고 api를 사용해 보면서 이번 프로젝트도 쉽게 따라 할 수 있을 것이라고 생각이 들었지만 막상 진행해보니 환경 세팅부터 기능 구현까지 쉽지 않았다. 저번 프로젝트와 마찬가지로 깃허브 사용에 미숙한 부분이 있어 공부해야겠다.

## 도메인 용어 정의

## ESLint 규칙 및 적용 후기
