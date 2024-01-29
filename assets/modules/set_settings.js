const settings = require("../settings/settings.js");
const fs = require("fs");

module.exports.set_settings = (link, chatId, bot, step, site) => {
  let pathToFolder = `./assets/data/sites/${site}/`;
  const oldSettings = JSON.parse(
    fs.readFileSync(`${pathToFolder}settings.json`)
  );

  fs.access(`../data/sites/${site}/`, function (error) {
    if (error) {
      switch (step) {
        case "qr":
          let message1 = `Excellent! The qr has been saved in site`;
          fs.writeFileSync(
            `${pathToFolder}qr_settings.json`,
            JSON.stringify({ qr_code_link: link }, null, "\t")
          );

          bot.sendMessage(chatId, message1);
          break;
        case "price":
          let message2 = `Excellent! The price has been saved in site`;
          fs.writeFileSync(
            `${pathToFolder}price_settings.json`,
            JSON.stringify({ price_euro: link }, null, "\t")
          );

          bot.sendMessage(chatId, message2);
          break;
        case "address":
          let message3 = `Excellent! The address has been saved in site`;
          fs.writeFileSync(
            `${pathToFolder}address_settings.json`,
            JSON.stringify({ address: link }, null, "\t")
          );

          bot.sendMessage(chatId, message3);
          break;

        case "api-key":
          let message4 = `Excellent! The api has been saved in site`;
          fs.writeFileSync(
            `${pathToFolder}api_key.json`,
            JSON.stringify({ api_key: link }, null, "\t")
          );

          bot.sendMessage(chatId, message4);
          break;

        case "clear-users":
          let message5 = `Excellent! The keys has been deleted`;
          fs.writeFileSync(`${pathToFolder}users-keys.json`, "[]");

          bot.sendMessage(chatId, message5);
          break;
        case "set_replain_id":
          let message6 = `Excellent! The id has been saved`;

          fs.writeFileSync(
            `${pathToFolder}settings.json`,
            JSON.stringify({ ...oldSettings, replainId: link }, null, "\t")
          );

          bot.sendMessage(chatId, message6);
          break;
        case "commission_precent":
          let message8 = `Excellent! The precent has been saved`;

          fs.writeFileSync(
            `${pathToFolder}settings.json`,
            JSON.stringify({ ...oldSettings, commissionPrecent: link }, null, "\t")
          );

          bot.sendMessage(chatId, message8);
          break;
        case "site_name":
          let message7 = `Excellent! The siteName has been saved`;
          const capitalizedWord = link.charAt(0).toUpperCase() + link.slice(1);
          const toLower = link.toLowerCase();

          const oldEmailSettings = JSON.parse(
            fs.readFileSync(`${pathToFolder}email_settings.json`)
          );

          fs.writeFileSync(
            `${pathToFolder}settings.json`,
            JSON.stringify({ ...oldSettings, siteName: link }, null, "\t")
          );

          fs.writeFileSync(
            `${pathToFolder}phone_settings.json`,
            JSON.stringify({ from: capitalizedWord }, null, "\t")
          );

          fs.writeFileSync(
            `${pathToFolder}email_settings.json`,
            JSON.stringify(
              {
                ...oldEmailSettings,
                login: `info@${toLower}.com`,
                loginTwo: `support@${toLower}.com`,
                domain: capitalizedWord,
                text: capitalizedWord,
                domainHeader: capitalizedWord,
                domainLink: `https://${toLower}.com`,
                domainFooter: capitalizedWord,
              },
              null,
              "\t"
            )
          );

          bot.sendMessage(chatId, message7);
          break;
        default:
          break;
      }
    } else {
      bot.sendMessage(
        chatId,
        "You have entered an invalid site, please try again"
      );
    }
  });
};
