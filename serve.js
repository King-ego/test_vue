import express from 'express'
const port = 8080
const app = express()

app.use(express.static('/dist/'))
app.get(/.*/, function (req, res) {
  res.sendFile('/dist/index.html')
})
app.listen(port)

console.log('Server started...')
