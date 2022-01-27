const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

let totalpsotNum;  //전체 게시글 개수,,,postNumber변수 ++해주기 위해서 


// /api 정상적으로 미들웨어를 통해 접속 확인하는 거
router.get("/", (req, res) => {
    console.log("router.get / loading")
    res.send("./main.html");
});

// /api/posts ....db에서 데이터목록 받아오기
router.get("/posts", async (req, res) => {

    // const postNumber = req.query.postNumber;
    const { writer, title, writeDay, contents, password, postNumber }
        = req.query;



    const posts = await Post.find({ writer, title, writeDay, contents, password, postNumber })
        .sort( "-postNumber" ).exec(); 
    console.log("게시글 갯수 : ", posts.length)
    totalpsotNum = posts.length;


    console.log("get: /posts 실행")
    res.json({ posts, 'msg': '/api/posts경로의 전체글 보여주기' });

});


// postNumber해당 페이지를 디테일 페이지에 띄워주기 위한 라우터(postNumber에 해당하는 )
router.get("/posts/detail/:postNumber", async (req, res) => {
    const { postNumber } = req.params;
    console.log(postNumber);

    const num = await Post.find({ postNumber: Number(postNumber) });
    console.log(num);
    res.json({ num });
});

//삭제 
router.delete("/posts/:postNumber", async (req, res) => {
    console.log('delete api로 들어왔습니다.');
    const { postNumber } = req.params;

    const password = req.body.password
    const existsPost = await Post.find({ postNumber: Number(postNumber) });
    
    
    const dbpw = await Post.find( {postNumber:Number(postNumber)}, {_id: 0, password:1} )
    console.log('디비 비밀번호:',dbpw[0].password)
    console.log('입력비번:',password)

    if(dbpw[0].password === password){
        if (existsPost.length) {
            await Post.deleteOne({ postNumber: Number(postNumber) });
            res.json({ msg: 'done'})
        }
    }else{
        res.json( {msg : '비밀번호 오류'} )
    }

    

});

//수정  put 모두 수정!!!!!!!!!!!!!!!!!!
router.put("/posts/:postNumber", async (req, res) => {
    const { postNumber } = req.params;

    const { title, writer, contents, password } = req.body
    console.log( title, writer, contents )

    
    const existsPost = await Post.find({ postNumber: Number(postNumber) });

    const dbpw = await Post.find( {postNumber:Number(postNumber)}, {_id: 0, password:1} )
    console.log('디비 비밀번호:',dbpw[0].password)
    console.log('입력비번:',password)
    if(dbpw[0].password === password){
        if (existsPost.length) {
            await Post.updateOne({ postNumber: Number(postNumber) }, { $set: { title, writer, contents } });
            res.json({ msg: 'done'})
        }
    }else{
        res.json( {msg : '비밀번호 오류'} )
    }
    
    

});



// 글쓰기
router.post("/posts", async (req, res) => {

    // postNumber
    const { writer, title, writeDay, contents, password, } = req.body;

    console.log('글쓰기에서 게시글 갯수 변수 :', totalpsotNum)
    // console.log('postNumber:',postNumber)
    const postNumber = Number(totalpsotNum + 1);
    console.log('postNumber:', postNumber)

    await Post.create({ writer, title, writeDay, contents, password, postNumber })



    res.json({ result: "success" });

})

module.exports = router;