const express = require('express' )
const PORT = 7000;

const app = express();
app.use( express.json() )

const weeklyTask = [
    {
        id: 1,
        Days: "Monday",
        Presentation: "Bio Report",
        Date: "May 09",
        Time: "3pm",
        Location: "Ikeja"

    },

   {    id: 2,
        Days: "Thursday",
        Presentation: "Drone Exhibition",
        Date: "May 13",
        Time: "10am",
        Location: "Airport"
   }
]

//welcome
app.get('/', (req, res) => {
    res.status( 200 ).json( {
        message: "Welcome to the todo list"
    })
});

//showing all tasks for the week
app.get('/taskRecords', (req, res) => {
        res.status( 200 ).json({
             data: weeklyTask
         })
         // res.send(task)
     } );

    
    //one task for the week
app.get( '/taskRecords/:id', ( req, res ) => {
    const taskId = parseInt( req.params.id );
    const task = weeklyTask.find( ( item ) => ( item.id === taskId ) );
    if ( !task ) {
        res.status( 404 ).json( {
            data: "task not found."
    
        })
    } else {
        res.status( 200 ).json({
            data: task
        })
    }
    })

    app.post('/taskRecords', (req,res) =>{
        const newTask = req.body;
         newTask.id = weeklyTask.length +1;
         weeklyTask.push(newTask);
         res.status( 200 ).json({
             data: newTask
            });
        
         })

   //
    app.patch('/taskRecords/:id', function(req,res){
        const taskId = parseInt(req.params.id);
        const updatedTask = req.body;
        const index = weeklyTask.findIndex((item) => (item.id === taskId))
        if(index !== -1){
            weeklyTask[index] ={ ...weeklyTask[index], ...updatedTask}
            res.status(200).json({
                new: weeklyTask[index]
            })
        }else{
            res.send("Wrong id sent")
        }
    })


     app.delete("/taskRecords/:id", (req,res)=>{
        const taskId = parseInt(req.params.id)
        const index = weeklyTask.findIndex((item)=>(item.id === taskId))
        if (!index){
            res.status(404).json({
                message: `This id: ${taskId} does not exist`
    
            })
        }else{
            deletedTask = weeklyTask[index]
            weeklyTask.splice(index, 1)
            res.status(200).json({
                deletedData: deletedTask
            })
        }
     })
    
    


app.listen( PORT, () => {
    console.log("Sever is listening to port " + PORT)
})


