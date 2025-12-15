import app from "./app.js"
import {db} from "./utils/db.js"

//db connection:
db();

const PORT = process.env.PORT || 5000;

// localhost run :
app.listen(PORT, ()=>{
    console.log(`running at localhost port ${PORT}`)
})