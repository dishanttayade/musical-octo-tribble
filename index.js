const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
// const userRouter = require('./controllers/users');
// const todoRouter = require('./controllers/todos');
const userRouter = require('./router/userRouter');
const todoRouter = require('./router/todoRouter');


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
	next();
})
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'router/index.html'));
})

// app.post('/users', async (req, res) => {
//     try{
//         data = await fetch(`https://jsonplaceholder.typicode.com/users/`)
//         res.json(data);        
//     }catch (err){
//         res.status(400).json({message: err.message});
//     }
// })

app.use('/user', userRouter);
app.use('/todos', todoRouter);

// app.post('/users', userController.usershere);

// app.get('/users');

app.listen(port, ()=> {
    console.log(`The server is running on http://localhost:${port}/`);
});