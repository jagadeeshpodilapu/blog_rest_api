const http=require('http');

const app=require('./app');
const {port}=require('./config/keys');

//create a server

const server=http.createServer(app);

//listen server

server.listen(port,()=>console.log(`Server is running on port ${port}`));
