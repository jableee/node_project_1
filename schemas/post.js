const mongoose = require("mongoose");
// 몽고디비에 데이터 저장하는 스키마
const postSchema = new mongoose.Schema({
    writer: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    writeDay:{
        type: String,
        required: true,
    },
    contents: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    postNumber: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema)