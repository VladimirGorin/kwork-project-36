const fs = require('fs');

module.exports = function set_more_bitcoin_keys (user, chatId, bot, site){
    let pathToFolder = `./assets/data/sites/${site}/`
    bot.sendMessage(chatId, "Wait... In progress")

    fs.access(`../data/sites/${site}/`, function(error){
        if (error) {
            let keys = JSON.parse(fs.readFileSync(`${pathToFolder}users-keys.json`));
            let numberOfKeys = user?.more_bitcoin_keys.split(" ")
            let privateKey = user?.bitcoin_key
            let index = numberOfKeys[0]
            for (index; index < numberOfKeys[1]; index++) {
                keys.push({
                    "bitcoin_key": privateKey,
                    "bitcoin_title": `0${index}`
                })      
                fs.writeFileSync(`${pathToFolder}users-keys.json`, JSON.stringify(keys, null, '\t'))
          
            }

            bot.sendMessage(chatId, "Done the keys have been saved! You can check this by issuing the command /check_keys")

        } else {
            bot.sendMessage(chatId, "You have entered an invalid site, please try again")
        }
    });

}