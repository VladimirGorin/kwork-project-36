const fs = require('fs');

module.exports.set_bitcoin_keys = (user, chatId, bot, site) => {
    fs.access(`../data/sites/${site}/`, function(error){
        if (error) {
            const users_keys = require(`../data/sites/${site}/users-keys.json`)
            let message = `Excellent! The key has been saved`
            users_keys.push({bitcoin_key:user.bitcoin_key,bitcoin_title:user.bitcoin_title})
            fs.writeFileSync(`./assets/data/sites/${site}/users-keys.json`, JSON.stringify(users_keys, null, '\t'))
            bot.sendMessage(chatId, message)

        } else {
            bot.sendMessage(chatId, "You have entered an invalid site, please try again")
        }
    });

}

module.exports.remove_bitcoin_keys = (user, chatId, bot, site) => {
    fs.access(`../data/sites/${site}/`, function(error){
        if (error) {
            const users_keys = require(`../data/sites/${site}/users-keys.json`)
            let message = `Excellent! The key has been saved`
            for(key in users_keys){
                users_keys[key].bitcoin_key = user.bitcoin_key
            }

            fs.writeFileSync(`./assets/data/sites/${site}/users-keys.json`, JSON.stringify(users_keys, null, '\t'))
            bot.sendMessage(chatId, message)

        } else {
            bot.sendMessage(chatId, "You have entered an invalid site, please try again")
        }
    });

}

