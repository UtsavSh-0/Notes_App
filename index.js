const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const {connectToMongoDB}=require("./connect");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const notesRoute=require("./routes/url");
const {restrictToLoggedinUserOnly}=require('./middlewares/auth');
const app=express();
app.use(express.static(path.join(__dirname, "public")));
const PORT=8000;

connectToMongoDB("mongodb://127.0.0.1:27017/notes-13")
    .then(()=>console.log("MONGO-DB CONNECTED SUCCESSFULLY"))
    .catch((err)=>console.log("MONGO-DB ERROR FIX IT : ",err));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use((req,res,next)=>{
    res.locals.currentUser=null;
    next();
});

app.use("/",staticRoute);
app.use("/",userRoute);
app.use("/api/notes",notesRoute);
// app.use("/url",restrictToLoggedinUserOnly,urlRoute);

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
});