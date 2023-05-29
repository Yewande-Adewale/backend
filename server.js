const express = require('express' )
const PORT = 7000;

const app = express();
app.use( express.json())

    const employmentSystem= [
            {
                id: 1,
                staffName: "Grace",
                staffAge: 27,
                staffSalary: 4000,
                staffPosition: "supervisor",
                staffQualification: "Bsc",
                staffGender: "female"
            },
            {
                id: 2,
                staffName: "Peter",
                staffAge: 30,
                staffSalary: 3000,
                staffPosition: "instructor",
                staffQualification: "Hnd",
                staffGender: "male"
            },
    ]

    app.get( '/', (req, res) => {
        res.status( 200 ).json( {
            message: "Welcome to the Employment System"
        })
    } );
    
    app.get( '/employmentRecords', (req, res) => {
        res.status( 200 ).json( {
            data: employmentSystem
        })
    } );
    app.get( '/employmentRecords/:id', ( req, res ) => {
        const staffId = parseInt( req.params.id );
        const staff = employmentSystem.find( ( item ) => ( item.id === staffId ) );
        if ( !staff ) {
            res.status( 404 ).json( {
                data: "user not found."
        
            })
        } else {
            res.status( 200 ).json({
                data: staff
            })
        }
        })

app.post('/employmentRecords', (req,res) =>{
    const newStaff = req.body;
     newStaff.id = employmentSystem.length +1;
     weeklyTask.push(newStaff);
     res.status( 200 ).json({
         data: newStaff
        });
    
     })

//
app.patch('/employmentRecords/:id', function(req,res){
    const staffId = parseInt(req.params.id);
    const updatedStaff= req.body;
    const index = employmentSystem.findIndex((item) => (item.id === staffId))
    if(index !== -1){
        employmentSystem[index] ={ ...employmentSystem[index], ...updatedStaff}
        res.status(200).json({
            new: employmentSystem[index]
        })
    }else{
        res.send("Wrong id sent")
    }
})


 app.delete("/employmentRecords/:id", (req,res)=>{
    const staffId = parseInt(req.params.id)
    const index = employmentSystem.findIndex((item)=>(item.id === staffId))
    if (!index){
        res.status(404).json({
            message: `This id: ${staffId} does not exist`

        })
    }else{
        deletedstaff = employmentSystem[index]
        employmentSystem.splice(index, 1)
        res.status(200).json({
            deletedData: deletedstaff
        })
    }
 })




app.listen( PORT, () => {
console.log("Sever is listening to port " + PORT)
})



