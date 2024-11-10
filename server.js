const exp = require('constants')
const express = require('express')
const app = express()

app.listen(8080, ()=>{
    console.log('http://localhost:8080에서 서버 실행중')
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

app.use(express.static(__dirname + '/public'));

