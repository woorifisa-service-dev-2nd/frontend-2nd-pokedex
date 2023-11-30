const [
    normalButton,
    fightingButton,
    flyingButton,
    poisonButton,
    groundButton,
    rockButton,
    bugButton,
    ghostButton,
    steelButton,
    fireButton,
    waterButton,
    grassButton,
    electricButton,
    psychicButton,
    iceButton,
    dragonButton,
    darkButton,
    fairyButton,
] = document.getElementsByClassName(`type_button`);

const typeButtonHandler = (event) => {
    // 현재 클릭된 타입 이미지
    console.log(event.currentTarget.childNodes[1].src);
    // 현재 클릭된 타입 이름
    console.log(event.currentTarget.childNodes[3].innerText);
};

normalButton.addEventListener(`click`, typeButtonHandler);
fightingButton.addEventListener(`click`, typeButtonHandler);
flyingButton.addEventListener(`click`, typeButtonHandler);
poisonButton.addEventListener(`click`, typeButtonHandler);
groundButton.addEventListener(`click`, typeButtonHandler);
rockButton.addEventListener(`click`, typeButtonHandler);
bugButton.addEventListener(`click`, typeButtonHandler);
ghostButton.addEventListener(`click`, typeButtonHandler);
steelButton.addEventListener(`click`, typeButtonHandler);
fireButton.addEventListener(`click`, typeButtonHandler);
waterButton.addEventListener(`click`, typeButtonHandler);
grassButton.addEventListener(`click`, typeButtonHandler);
electricButton.addEventListener(`click`, typeButtonHandler);
psychicButton.addEventListener(`click`, typeButtonHandler);
iceButton.addEventListener(`click`, typeButtonHandler);
dragonButton.addEventListener(`click`, typeButtonHandler);
darkButton.addEventListener(`click`, typeButtonHandler);
fairyButton.addEventListener(`click`, typeButtonHandler);
