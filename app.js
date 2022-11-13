const express = require("express");

const cors = require("cors");

const app = express()
const routerUser = require("./src/routers/users/user.router")

const routerAuth = require("./src/routers/auth/auth.routers")
const {middlewareToken} = require("./src/middleware/jwt.middleware")

app.use(cors())
app.use(express.json())

app.use(routerAuth)
app.use(routerUser)


app.use((req, res)=>{
    res.status(400).send({
        ok: false,
        message: "Endpoint no encontrado",
        info: null
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Ejecucion de api: http://localhost:${PORT}`)
})