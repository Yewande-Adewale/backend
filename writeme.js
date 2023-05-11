const fs=require("fs").promises;
fs.writeFile("./sample.txt","write to a file","utf8")
        .then(()=>{
            console.log("written successfully")
        })
            .catch((error)=>{
         console.log(error);
        });
    