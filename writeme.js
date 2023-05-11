const fs=require('fs')
fs.writeFile("./sample.txt","write to a file",(error)=>{
        if(error){
            console.log(error);
        }else{
            console.log("file has been written")
        }
     });  