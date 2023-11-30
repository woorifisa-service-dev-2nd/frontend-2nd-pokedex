const express = require(`express`);

// 하나의 고유한 서버 인스턴스 생성해서 app이라는 변수에 할당
const app = express();

app.use(express.json());

const key = `lbBtjYruWTWQuqCbMaJOz2xf2suJqyeOOB1Xdp2baNY`;

app.get(`/`, (req, res) => {
    res.sendFile(__dirname + `./index.html`);
});

app.listen(3000);
