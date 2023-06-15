require( './Config/config' );
const express = require( 'express' );
const familyRouter = require('./Router/familyRouter')
const PORT = 9000;


const app = express();
app.use( express.json() );
app.use( "/uploads", express.static( "uploads" ) );

app.use('/api', familyRouter)

app.listen( PORT, () => {
    console.log(`listening to port: ${ PORT }`);
});