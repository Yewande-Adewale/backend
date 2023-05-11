const fs=require('fs').promises;
fs.readFile("./sample.txt", "utf8")
.then(()=>{
    console.log(data)
})
.catch((error)=>{
    console.log(error);
 }); 