import express from "express"
import path from "path"

const __dirname = path.resolve()
const app = express()
const PORT = 8800

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "src")))


app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`);
})