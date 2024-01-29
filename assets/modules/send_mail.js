const nodemailer = require('nodemailer');
const { email_port, email_host } = require('../settings/settings.js')
const html = require('./emailHtml.js')
const fs = require('fs')

module.exports.send_mail = (to_mail, balanceEuro, balanceBtc, bitcoin_address, bitcoin_img, site) => {

  const pathToFolder = `./assets/data/sites/${site}/`
  let emailPassword;
  let emailLogin;
  let text;

  fs.access(`../data/sites/${site}/`, function (error) {
    if (error) {
      const info = JSON.parse(fs.readFileSync(`${pathToFolder}email_settings.json`))
      const settings = JSON.parse(fs.readFileSync(`${pathToFolder}settings.json`))

      emailPassword = info["pass"]
      emailLogin = info["login"]
      text = info["text"]
      const precent = settings?.commissionPrecent 

      let output = html.generateHTML(info["domain"], balanceEuro, balanceBtc, bitcoin_address, bitcoin_img, info["domainHeader"], info["domainFooter"], info["domainLink"], precent)

      let smtpTransport;
      try {
        smtpTransport = nodemailer.createTransport({
          host: email_host,
          port: email_port,
          secure: true, // true for 465, false for other ports 587
          auth: {
            user: emailLogin,
            pass: emailPassword
          }
        }
        );
      } catch (e) {
        return console.log('Error: ' + e.name + ":" + e.message);
      }

      let mailOptions = {
        from: emailLogin, // sender address
        to: `${emailLogin}, ${to_mail}`, // list of receivers
        subject: text, // Subject line
        text: text, // plain text body
        html: output // html body
      };

      smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        } else {
          console.log('Message sent: %s', info.messageId);
        }
      })

    } else {
      console.log("Файл не найден email");
    }
  });
}