require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const dbCoonec=require('./config/dbConn')
const cors=require('cors')

console.log(process.env.MY_SECRET)
dbCoonec()
app.use(cors())
app.use(express.json())
app.use('/users',require('./routes/userRoute'))
app.use('/contacts',require('./routes/contactRoute'))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))