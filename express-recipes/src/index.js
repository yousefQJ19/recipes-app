const express = require("express");
const path = require('path');
const cors=require("cors")

const app = express();
const recipesRouter=require("./Router/router")
const usersRouter = require('./Router/usersRouter');
const {handleError}=require("./utility/error")

const auth = require('./middleware/auth.js');

const corsOptions = {
    origin: 'http://localhost:8080',  // Replace with your client's URL
    optionsSuccessStatus: 200  // For older browsers compatibility
};

app.use(cors(corsOptions))

app.use((req, res, next) => {
    const { method, path } = req;
    console.log(
        `New request to: ${method} ${path} at ${new Date().toISOString()}`  
    );
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(auth.initialize());


app.get("/", (req, res) => {
    res.redirect("/api/v1/recipes");
});


app.use('/', recipesRouter);
app.use("/users", usersRouter);




app.use(handleError)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});