import express from "express"
import cookieParser from "cookie-parser"

const app = express()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import dealerRouter from "./routes/dealer.routes.js";
import customerRouter from "./routes/customer.routes.js"
import productRouter from "./routes/product.routes.js"
import saleRouter from "./routes/sale.route.js"


//routes declaration
app.use("/api/v1/dealer",dealerRouter);
app.use("/api/v1/customer",customerRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/sale",saleRouter);


export { app }