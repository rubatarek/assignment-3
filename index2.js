//part 2

const http = require('http');
const fs = require('fs');
let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
const sever = http.createServer(async (req, res) => {
    let {url,method} = req;
    if (url == "/users" && method == "POST") {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        let { name, age, email } = JSON.parse(data);
        let existingUser = users.find((user) => user.email == email);
        if (existingUser) {
          return res.end("User with this email already exists");
          
        }
        let newUser = {
            id: users.length + 1,
            name, age, email
        }
        users.push(newUser);
        fs.writeFileSync('users.json', JSON.stringify(users));
        res.end("User added successfully");
});
    }else if (url == "/users" && method == "GET") {
        res.end(JSON.stringify(users));
    }else if(url=="/users-by-id" && method == "GET"){
        let id=''
req.on("data",(chunk)=>{
    id=JSON.parse(chunk).id;
    })
req.on("end",()=>{
    let userData=users.find((user)=>user.id==id);
    if(userData){
    res.end(JSON.stringify(userData));
    }else{
        res.end("User not found");
    }
})
    }else if(url=="/users-by-id" && method == "PATCH"){
        let id ;
        let data;
        req.on("data", (chunk) => {
            id = JSON.parse(chunk).id;
            data = JSON.parse(chunk);
        });
        req.on("end", () => {
            let existedUser=users.find((user) => {
                return user.id == id;
            });
            if(!existedUser){
                return res.end("User not found");
            }
            let{name,age} = data;
            existedUser.name = name 
            existedUser.age = age;
            fs.writeFileSync('users.json', JSON.stringify(users));
            res.end("User updated successfully");
        });

    }else if(url=="/users-by-id" && method == "DELETE"){
        let id ;
        req.on("data", (chunk) => {
            id = JSON.parse(chunk).id;
        });
        req.on("end", () => {
            let userIndex = users.findIndex((user) => user.id == id);
            if (userIndex > -1) {
                users.splice(userIndex, 1);
                fs.writeFileSync('users.json', JSON.stringify(users));
                res.end("User deleted successfully");
            } else {
                res.end("User not found");
            }
        });
    }
});
const port = 3000;
sever.listen(3000, () => {
    console.log("Server is running on port ", 3000);
});