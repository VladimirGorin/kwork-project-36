const fs = require('fs');

module.exports.get_admins = () => {
    let users = JSON.parse(fs.readFileSync('./assets/data/users.json'))
    let admins = []

    for(let user in users){
        if(users[user]?.admin){
            admins.push(users[user].id)
        }
    }

    return admins
}

module.exports.set_admin = (id) => {
    let users = JSON.parse(fs.readFileSync('./assets/data/users.json'))

    for(let user in users){
        if(users[user].id == id){
            users[user].admin = true
        }
    }

    fs.writeFileSync("./assets/data/users.json", JSON.stringify(users, null, '\t'))
}