const fs= require ("fs");
fs.unlink("./sample.txt",(error)=>{
    if(error){
        throw error;
    }
    console.log("Delete a File Successfully")
});