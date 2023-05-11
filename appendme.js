const fs=require("fs").promises;
fs.appendFile("./sample.txt","\n add to a file","utf8")
        .then(()=>{
            console.log("not successful")
        })
        .catch((data)=>{
            console.log(data);  
        })
