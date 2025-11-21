import app from "./app.js"
import {db} from "./utils/db.js"

//db connection:
db();


// localhost run :
app.listen(process.env.port, ()=>{
    console.log(`running at localhost port ${process.env.port}`)
})