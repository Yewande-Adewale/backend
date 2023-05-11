const fs=require("fs").promises;
fs.unlink("./sample.txt","delete a file","utf8")
.then(()=>{
    console.log("File has been deleted")
})
.catch((error)=>{
    console.log(error);
});

