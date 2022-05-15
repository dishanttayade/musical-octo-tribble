const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const users_url = `https://jsonplaceholder.typicode.com/users/`;
const todos_url = `https://jsonplaceholder.typicode.com/todos/`;


const AllUsers = async (req, res) =>{
    try{
        const result = await fetch(users_url)
        const ans  =  await result.json();
        // console.log(ans);
        res.json(ans)
        // console.log(ans);
        return ans;
    }
    catch(err){
        console.log(err);
        return res.json({
            status: "fail",
            message: err.message
        })
    }
}

router.get('/', AllUsers);

const UserID = async (req, res) =>{
    try{
        const result = await fetch(users_url+`${req.params.id}`);
        const user = await result.json();
   
        delete user['address'];
        delete user['company'];
        delete user['username'];
        delete user['website'];
        
        const result2 = await fetch(todos_url);
        const todolist = await result2.json();
        // let todos = todolist.find(item => item.userId == req.params.id);
        let todos = []
        for(let item of todolist){
            if(item['userId'] == req.params.id){
                // console.log(item);
                todos.push(item);
            }
        }
        // console.log(todos);
        user['todos'] = todos;
        res.json(user);
    }catch (err) {
        return res.json({
            status: "fail",
            message: err.message
        })
    }
}

router.get('/:id', UserID)


// router.get('/',)

module.exports = router;