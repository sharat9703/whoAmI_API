const express = require('express');
const app = express();
const path = require('path');
// Middleware to parse JSON request bodies

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"public",'index.html'));
});

app.get("/api/:whoami", function(req, res){
    let str = req.params.whoami;
    let match = "whoami";
    let k = 0;
    for(let i of str.split("")){
        if(i != match[k++]){
            res.send("Not found");
        }
    }
    let obj = {
                "ipaddress": req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                "language" :  req.headers['accept-language'],
                "software" :  req.headers['user-agent']
            } 
    res.status(200).json(obj);
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
});

module.exports = app;