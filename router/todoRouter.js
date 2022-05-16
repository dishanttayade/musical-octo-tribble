const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const todos_url = `https://jsonplaceholder.typicode.com/todos`;

async function AllTodos (req, res) {
    let ans;
    try{
        const result = await fetch(todos_url);
        ans = await result.json();
        ans.forEach(element => {
            delete element['userId']
        });
        // console.log(result);
        res.json(ans);
        // console.log(ans);//true
        return ans;
    }catch(err) {
        return res.json({
            status: "fail",
            message: err.message
        })
    }
}

router.get('/', AllTodos)


module.exports = router;