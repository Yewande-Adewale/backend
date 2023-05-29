const express = require('express' )
const PORT = 7000;

const app = express();
app.use(express.json())

const shoppingCart = [
    {
        id: 1,
        productsList: "milk",
        quantity:2,
        selectFromProduts: "Groceries"
    },

   {  
    id: 2,
        productsList: "pot",
        quantity:1,
        selectFromProduts: "kitchenware"
        
   }
]

//welcome
app.get('/', (req, res) => {
    res.status( 200 ).json( {
        message: "Welcome to wendy's mart"
    })
});

 
app.get('/aboutwendy', (req, res) => {
        res.status( 200 ).json({
             data: shoppingCart
         })
     } );

    
    //new item
app.get( '/aboutwendy/:id', ( req, res ) => {
    const customerId = parseInt( req.params.id );
    const wendy= shoppingCart.find( ( item ) => ( item.id === customerId ) );
    if ( !wendy) {
        res.status( 404 ).json( {
            toothpaste: "item not found."
    
        })
    } else {
        res.status( 200 ).json({
            data: wendy
        })
    }
    })

    app.post('/addtoCart', (req,res) =>{
        const newCustomer= req.body;
         newCustomer.newCustomerid= shoppingCart.length +1;
         blogPage.push(newCustomer);
         res.status( 200 ).json({
             data: newCustomer
            });
        
         })

   //
    app.patch('/addtocart/:id', function(req,res){
        const customerId = parseInt(req.params.id);
        const updatedCustomer = req.body;
        const index = shoppingCart.findIndex((item) => (item.id === customerId))
        if(index !== -1){
            shoppingCart[index] ={ ...shoppingCart[index], ...updatedCustomer}
            res.status(200).json({
                new: shoppingCart[index]
            })
        }else{
            res.send("Not avialiable sent")
        }
    })


     app.delete("/addtoCart/:id", (req,res)=>{
        const customerId = parseInt(req.params.id)
        const index = shoppingCart.findIndex((item)=>(item.id === customerId))
        if (!index){
            res.status(404).json({
                message: `This item: ${pageId} does not exist`
    
            })
        }else{
            deletedCustomer = wendy[index]
            shoppingCart.splice(index, 1)
            res.status(200).json({
                deletedData: deletedCustomer
            })
        }
     })
    
    


app.listen( PORT, () => {
    console.log("item is available and running on port " + PORT)
})
