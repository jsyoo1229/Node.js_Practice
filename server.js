const exp = require('constants')
const express = require('express')
const app = express()

const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://jsyoo1229:iloveit1229@cluster0.9uogdx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('forum')

    app.listen(8080, ()=>{
        console.log('http://localhost:8080에서 서버 실행중')
    })

  }).catch((err)=>{
    console.log(err)
  })





app.get('/news', (req, res)=>{
    res.send('오늘의 뉴스')
})

app.get('/shop', (req, res)=>{
    res.send('쇼핑페이지')
})

app.get('/',  (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res)=>{
    res.sendFile(__dirname + '/about.html')
})

app.get('/list', async (req, res)=>{
    let posts = await db.collection('post').find().toArray()
    console.log(posts)
    res.send(posts[0].title)
})


app.use(express.static(__dirname + '/public'));

