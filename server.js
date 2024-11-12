const exp = require("constants");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MongoClient, ObjectId } = require("mongodb");

let db;
const url =
  "mongodb+srv://jsyoo1229:iloveit1229@cluster0.9uogdx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("forum");

    app.listen(8080, () => {
      console.log("http://localhost:8080에서 서버 실행중");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.get("/news", (req, res) => {
  res.send("오늘의 뉴스");
});

app.get("/shop", (req, res) => {
  res.send("쇼핑페이지");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.get("/list", async (req, res) => {
  let posts = await db.collection("post").find().toArray();
  console.log(posts);
  // res.send(posts[0].title)
  res.render("list.ejs", { posts: posts });
});

app.get("/time", (req, res) => {
  res.render("time.ejs", { newDate: new Date() });
});

app.get("/detail/:id", async (req, res) => {
  let detailList = await db
    .collection("post")
    .findOne({ _id: new ObjectId(req.params.id) });

  res.render("detail.ejs", { detailList: detailList });
});

app.post("/writing", async (req, res) => {
  console.log(req.body);
  await db
    .collection("post")
    .insertOne({ title: req.body.title, content: req.body.content });
  res.redirect("/list");
});

app.get("/edit/:id", async (req, res) => {
  let post = await db
    .collection("post")
    .findOne({ _id: ObjectId(req.params.id) });
  res.render("edit.ejs", { post: post });
});

app.post("/edit", async (req, res) => {
  let post = await db
    .collection("post")
    .updateOne(
      { _id: ObjectId(req.body.id) },
      { $set: { title: req.body.title, content: req.body.content } }
    );
  res.redirect("/list");
});

app.delete("/delete", async (req, res) => {
  await db.collection("post").deleteOne({ _id: ObjectId(req.query.id) });
  res.send("삭제완료");
});

app.get('/list/:id', async (req, res) => {
    let result = await db.collection("post").find().skip((req.params.id-1)*5).limit(5).toArray()
    res.render("list.ejs", {result: result})
  });


  app.get('/list/:id', async (req, res) => {
    let result = await db.collection("post").find({_id: {$gt: new ObjectId(req.params.id)}}).limit(5).toArray()
    res.render("list.ejs", {result: result})
  });  
