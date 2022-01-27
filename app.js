const express = require("express");
const connect = require("./schemas"); //db연결함수 호출
const app = express();
const port = 3000;

//db연결
connect();

// 라우터 연결해주기
const postRouter = require("./routes/posts");

const requestMiddleWare = (req, res, next) => {
    console.log("Request URL: ", req.originalUrl, " - ", new Date());
    next();
}

app.use(express.urlencoded())
app.use(express.static("static"))
app.use(express.json());  //json형식 알아듣게 하는 미들웨어 !! 주의 : .json()괄호 꼭 붙힐것
app.use(requestMiddleWare); //요청url과 시간보여주기

app.use("/api", [postRouter]);

app.get("/", (req, res) => {
    res.send("Hello start page");
});

app.get("/detail.html", (req, res) => {

})

app.listen(port, () => {
    console.log(port, "blog_hanghae포트로 서버가 열렸어요!");
});