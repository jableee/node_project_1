const mongoose = require("mongoose");

// 몽고 디비 연결하는 connect함수?
const connect = () => {
    mongoose
        .connect("mongodb://localhost:27017/myboard", { ignoreUndefined: true })
        .catch((err) => { console.error(err); })
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;