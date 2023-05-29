const express = require('express' )
const PORT = 7000;

const app = express();
app.use( express.json() )

const contactBook = [
    {
        id: 1,
        Name: "Ubani",
        Category: "work",
        Number: 08060,
        emailAddress: "farad@gmail.com",
        nickName: "senior dev",
        Location: "Festac"

    },

   {  
       id: 2,
       Name: "Daniel",
    Category: "School",
    Number: 08070,
    emailAddress: "dan@gmail.com",
    nickName: "Dan",
    Location: "Festac"
   }
]

//welcome
app.get('/', (req, res) => {
    res.status( 200 ).json( {
        message: "Welcome new contacts"
    })
});

//showing all saved contacts 
app.get('/contactRecords', (req, res) => {
        res.status( 200 ).json({
             data: contactBook
         })
     } );

    
    //one contact
app.get( '/contactRecords/:id', ( req, res ) => {
    const contactId = parseInt( req.params.id );
    const contact= contactBook.find( ( item ) => ( item.id === contactId ) );
    if ( !contact) {
        res.status( 404 ).json( {
            data: "task not found."
    
        })
    } else {
        res.status( 200 ).json({
            data: contact
        })
    }
    })

    app.post('/contactRecords', (req,res) =>{
        const newContact = req.body;
         newContact.id = contactBook.length +1;
         contactBook.push(newContact);
         res.status( 200 ).json({
             data: newContact
            });
        
         })

   //
    app.patch('/contactRecords/:id', function(req,res){
        const contactId = parseInt(req.params.id);
        const updatedContact = req.body;
        const index = contactBook.findIndex((item) => (item.id === contactId))
        if(index !== -1){
            contactBook[index] ={ ...contactBook[index], ...updatedContact}
            res.status(200).json({
                new: contactBook[index]
            })
        }else{
            res.send("Wrong id sent")
        }
    })


     app.delete("/contactRecords/:id", (req,res)=>{
        const contactId = parseInt(req.params.id)
        const index = contactBook.findIndex((item)=>(item.id === contactId))
        if (!index){
            res.status(404).json({
                message: `This id: ${contactId} does not exist`
    
            })
        }else{
            deletedcontact = contactBook[index]
            contactBook.splice(index, 1)
            res.status(200).json({
                deletedData: deletedcontact
            })
        }
     })
    
    


app.listen( PORT, () => {
    console.log("Sever is listening to port " + PORT)
})
