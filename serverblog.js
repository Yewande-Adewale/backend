const express = require('express' )
const PORT = 7000;

const app = express();
app.use(express.json())

const blogPage = [
    {
        id: 1,
        newUserName: "Ubani",
        newUserLastname: "Friday",
        newUserEmail: "farad@gmail.com"
    },

   {  
        id: 2,
        newUserName: "Jerry",
        newUserLastname: "Sam",
        newUserEmail: "jerry@gmail.com"
   }
]

//welcome
app.get('/', (req, res) => {
    res.status( 200 ).json( {
        message: "Welcome to my home page"
    })
});

 
app.get('/aboutPage', (req, res) => {
        res.status( 200 ).json({
             data: blogPage
         })
     } );

    
    //new user
app.get( '/aboutPage/:id', ( req, res ) => {
    const pageId = parseInt( req.params.id );
    const blog= blogPage.find( ( item ) => ( item.id === pageId ) );
    if ( !blog) {
        res.status( 404 ).json( {
            data: "task not found."
    
        })
    } else {
        res.status( 200 ).json({
            data: blog
        })
    }
    })

    app.post('/aboutPage', (req,res) =>{
        const newUser = req.body;
         newUser.newUserid= blogPage.length +1;
         blogPage.push(newUser);
         res.status( 200 ).json({
             data: newUser
            });
        
         })

   //
    app.patch('/aboutPage/:id', function(req,res){
        const pageId = parseInt(req.params.id);
        const updatedUser = req.body;
        const index = blogPage.findIndex((item) => (item.id === pageId))
        if(index !== -1){
            blogPage[index] ={ ...blogPage[index], ...updatedUser}
            res.status(200).json({
                new: blogPage[index]
            })
        }else{
            res.send("Wrong id sent")
        }
    })


     app.delete("/aboutPage/:id", (req,res)=>{
        const pageId = parseInt(req.params.id)
        const index = blogPage.findIndex((item)=>(item.id === pageId))
        if (!index){
            res.status(404).json({
                message: `This id: ${pageId} does not exist`
    
            })
        }else{
            deletedUser = blog[index]
            blogPage.splice(index, 1)
            res.status(200).json({
                deletedData: deletedUser
            })
        }
     })
    
    


app.listen( PORT, () => {
    console.log("blog is alive and running on port " + PORT)
})
