const express = require("express")
const cors = require("cors")
const productRouter = require("./router/product.routes")
require("dotenv").config()


const app = express()
const PORT = process.env.PORT || 3000
app.use(cors()) //barcha clintga apidan foydalanishga ruxat berish
app.use(express.json()) // malumotlarni jsondan almashish


// router
app.use(productRouter)

app.listen(PORT)