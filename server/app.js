const express = require("express")
const { connectToMongoDB, disconnectFromMongoDB } = require("./config/db")
// const session=require("express-session")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express()

app.use(cors({
    origin:"http://localhost:5173",credentials:true
    // sample code for multiple origins origin:["http://localhost:5173","http://localhost:5174",]
}))

app.use(cookieParser())  // allow cookies

// app.use(session({
//     secret:"my-session-secret-key",
//     resave:false,
//     saveUninitialized:false,
//     cookie:{
//         httpOnly:true,
//         secure:false,  // true for https / production
//         sameSite:"lax",
//         maxAge:60*60*1000 // 1 hr in milliseconds
//     }
// }))

app.use(express.json())


  


//////Routers////////////

const userRouter = require("./routers/user")
const productRouter = require("./routers/product")
const serviceRouter = require("./routers/service")



app.use("/user", userRouter)   //localhost:5000/user/
app.use("/product", productRouter)
app.use("/service", serviceRouter)

//////Routers end///////////


app.get("/", function (req, res) {
  
    res.send("Server started.....")
})




    

    app.listen(5000, () => {

            connectToMongoDB().then(function (res) {
                    console.log("Database Connected")
                }).catch(function (err) {
                    console.log(err)
                })

        console.log("Server running on port 5000");
    });


