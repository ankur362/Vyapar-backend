import express from "express"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import dealerRouter from "./routes/dealer.routes.js";


//routes declaration
app.use("/api/v1/dealer",dealerRouter);

export { app }