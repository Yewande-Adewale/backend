const fs=require("fs");
fs.readFile("./EloquentJavascript.pdf",(error,data)=>{
    if(error){
        console.log(error);
    }else{
        console.log(data,toString());
    }
});