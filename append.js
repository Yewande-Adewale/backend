const fs=require('fs')
fs.appendFile("./sample.txt","\nadd to a file",(error)=>{
    if(error){
        console.log(file has been written);  
    }
});
