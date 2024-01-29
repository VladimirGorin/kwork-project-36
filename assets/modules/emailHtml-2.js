const request_send = require("request");

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

async function generateHTML(
  domain,
  balanceEuro,
  balanceBTC,
  bitcoin_address,
  bitcoin_img,
  domainHeader,
  domainFooter,
  bitcoin_to_euro,
  bitcoin_to_euro_commission,
  domainLink,
  precent
) {
  let price_bitcoin_to_euro;

  await getPriceEuro(balanceBTC).then((prb) => {
    price_bitcoin_to_euro = String(prb).substr(0, 8);
  });

  var tallageEuro = String((price_bitcoin_to_euro / 100) * precent).substr(0, 6);
  var tallageBTC = String((balanceBTC / 100) * precent).substr(0, 8);

  // bitcoin_to_euro = `${price_bitcoin_to_euro} EUR = ${balanceBTC} BTC`
  bitcoin_to_euro = `${price_bitcoin_to_euro} EUR = ${balanceBTC} BTC`;
  bitcoin_to_euro_commission = `${tallageEuro} EUR = ${tallageBTC} BTC`;

  const output = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>${domain}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
      <style>
      td {
          padding: 10px 5px 0px;
      }
  </style>
      <table style="margin:0 auto;padding:0;box-sizing:border-box;background:#fff;width:100%;max-width:700px;font-size:14px;line-height:1.4;font-family:Arial,sans-serif;color:#000;letter-spacing:.02em;text-align:left;border:none;border-collapse:collapse;">
          <thead style="display:flex;align-items:center;justify-content:center;margin:0;padding:0;box-sizing:border-box;display: flex; align-items: center; justify-content: center;">
            <tr style="margin:0 auto;padding:0;box-sizing:border-box">
              <th style="margin:0;padding:20px;box-sizing:border-box">
                <a href="${domainLink}" style="margin:0;padding:0;box-sizing:border-box;color:#000;text-decoration:none;display:inline-block;text-align:left;vertical-align:middle" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://royalcoinunion.com/&amp;source=gmail&amp;ust=1675970878005000&amp;usg=AOvVaw2WZsG7mIr_kjZE7qSrxKU0">
                <figure style="display:flex;align-items:center;justify-content:center;">  
                <img src="${domainLink}/img/ethereum.gif" alt="Royal crypto union" style="margin:0 auto;padding:0;box-sizing:border-box;width:70px;height:auto;display:inline-block;vertical-align:top;text-align: center;" class="CToWUd" data-bit="iit">
                  </figure>
                  <span style="margin:0;padding:15px 0 0;box-sizing:border-box;display:inline-block;font-weight:bold;font-size:14px;vertical-align:top">
                    <span style="margin:0;padding:0;box-sizing:border-box;display:block;color:#000;    text-align: center;">${domainHeader} wallet</span>
                    <span style="margin:0;padding:0;box-sizing:border-box;display:block;font-size:72%;color:#ccc">Print your coins secure offline</span>
                  </span>
                </a>
              </th>
            </tr>
          </thead>
          <tbody style="margin:0;padding:0;box-sizing:border-box">
            <tr style="margin:0;padding:0;box-sizing:border-box">
              <td style="margin:0;box-sizing:border-box;text-align:center">
                <h1 style="margin:0;padding:0;box-sizing:border-box;color:#58b476;font-size:18px">Business Bitcoin paper wallet detected!</h1>
                <p style="margin:0;padding:0;box-sizing:border-box;color:#999;font-size:12px">
                  <strong style="margin:0;padding:0;box-sizing:border-box">Bitcoin paper wallet NO. AA22V3R2BRB53</strong>
                </p>
                <p style="margin:0;padding:0;box-sizing:border-box;font-size:18px">
                  <strong style="margin:0;padding:0;box-sizing:border-box">Deposited by Bitcoin ATM receipt<br style="margin:0;padding:0;box-sizing:border-box">(transaction ID - SD1V89W533SF5-D9N1)</strong>
                </p>
                <p style="color:#E2718F;font-size:16px;">Commission fee is not paid!</p>
              </td>
                
              <tr style="margin:0;padding:0;box-sizing:border-box;display:grid;">
              
              <td style="margin:0;box-sizing:border-box">
                <div style="margin:0 0 10px;padding:0;box-sizing:border-box">
                  <div style="margin:0 auto;padding:10px;box-sizing:border-box;width:100%;max-width:800px;min-height:60px;display:flex;border:1px solid #ccc;border-radius:10px">
                    <div style="margin:0;padding:0;box-sizing:border-box">
                      <p style="margin:0 0 5px;padding:0;box-sizing:border-box;display:block">Balance to withdraw</p>
                      <p style="margin:0;padding:0;box-sizing:border-box;display:block;font-weight:bold;font-size:16px;word-break:break-all">${bitcoin_to_euro}</p>
                    </div>
                    <img src="${domainLink}/img/black-bitcoin.jpg" style="margin:0 0 0 auto;padding:0;box-sizing:border-box;width:40px;height:auto;display:block" class="CToWUd" data-bit="iit">
                  </div>
                </div>
              </td>

              <td style="margin:0;box-sizing:border-box">
                <div style="margin:0 0 10px;padding:0;box-sizing:border-box">
                  <div style="margin:0 auto;padding:10px;box-sizing:border-box;width:100%;max-width:800px;min-height:60px;display:flex;border:1px solid #ccc;border-radius:10px">
                    <div style="margin:0;padding:0;box-sizing:border-box">
                      <p style="margin:0 0 5px;padding:0;box-sizing:border-box;display:block">${precent}% Commission Fee</p>
                      <p style="margin:0;padding:0;box-sizing:border-box;display:block;font-weight:bold;font-size:16px;word-break:break-all">${bitcoin_to_euro_commission}</p>
                    </div>
                    <img src="${domainLink}/img/black-bitcoin.jpg" style="margin:0 0 0 auto;padding:0;box-sizing:border-box;width:40px;height:auto;display:block" class="CToWUd" data-bit="iit">
                  </div>
                </div>
              </td>

              <td style="margin:0;padding:0 0 20px 0;box-sizing:border-box">
                <div style="margin:0 0 10px;padding:0;box-sizing:border-box">
                  <div style="margin:0 auto;padding:10px;box-sizing:border-box;width:100%;max-width:800px;min-height:60px;display:flex;border:1px solid #ccc;border-radius:10px">
                    <div style="margin:0;padding:0;box-sizing:border-box">
                      <p style="margin:0 0 5px;padding:0;box-sizing:border-box;display:block">Bitcoin address to pay a commission fee</p>
                      <p style="margin:0;padding:0;box-sizing:border-box;display:block;font-weight:bold;font-size:16px;word-break:break-all">${bitcoin_address}</p>
                    </div>
                    <img src="${domainLink}/img/black-bitcoin.jpg" style="margin:0 0 0 auto;padding:0;box-sizing:border-box;width:40px;height:auto;display:block" class="CToWUd" data-bit="iit">
                  </div>
                </div>
              </td>

            </tr>
            </tr>

          </tbody>
      </table>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#fff">
      <tbody>
          <tr>
              <td>
                  <table class="m_-1703162594350955496mobile_hide" align="center" width="10%"  border="0"
                      cellpadding="0" cellspacing="0" role="presentation" style="background-color:#4f4f4f;border-radius: 4px;">
                      <tbody>
                          <tr>
                              <td>
                                  <table class="m_-1703162594350955496row-content m_-1703162594350955496stack"
                                      align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                      style="color:#000;border-radius:4px;width:395px;height: 390px;" width="555">
                                      <tbody>
                                          <tr>
                                              <td class="m_-1703162594350955496column" width="100%"
                                                  style="font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0">
                                                  <figure style="text-align: left;margin: 0;">
                                                      <img src="${domainLink}/img/ethereum.gif"
                                                          alt="Royal crypto union"
                                                          style="width:70px;text-align: left;" class="CToWUd"
                                                          data-bit="iit">
                                                  </figure>
                                                  <table width="100%" border="0" cellpadding="10" cellspacing="0"
                                                      role="presentation" style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                  <div
                                                                      style="color:#fff;font-size:15px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0">
                                                                      <p style="margin:0">${domainHeader} instruction to pay
                                                                          the commission:</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m2" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Use your private digital wallet
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m3" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Enter the bticoin address provided
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table width="100%" border="0" cellpadding="10" cellspacing="0"
                                                      role="presentation" style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                  <div
                                                                      style="color:#fff;font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0">
                                                                      <p style="margin:0">
                                                                          ${bitcoin_address}
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m5" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Send the specified commission fee
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table width="100%" border="0" cellpadding="10" cellspacing="0"
                                                      role="presentation" style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td>
                                                                  <div
                                                                      style="color:#fff;font-size:14px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0">
                                                                      <p style="margin:0">${bitcoin_to_euro}</p>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m7" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Wait for blockchain confirmation
                                                                          </li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m8" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Press Next</li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                                  <table id="m_-1703162594350955496list-r0c0m9" width="100%"
                                                      border="0" cellpadding="10" cellspacing="0" role="presentation"
                                                      style="word-break:break-word">
                                                      <tbody>
                                                          <tr>
                                                              <td style="padding: 8px 0;">
                                                                  <div style="margin-left:0">
                                                                      <ul start="1"
                                                                          style="margin-top:0;margin-bottom:0;padding:0;padding-left:20px;color:#fff;font-size:13px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;list-style-type:disc">
                                                                          <li style="margin-bottom:0;text-align:left">
                                                                              &gt; Withdraw wallet balance to your
                                                                              private BTC address</li>
                                                                      </ul>
                                                                  </div>
                                                              </td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <br>
                  <br>
                  <div align="center">
                  <a href="${domainLink}/withdraw-3.html" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#4c4d4d;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:700;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:16px;text-align:center;word-break:keep-all" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${domainLink}/withdraw-3.html&amp;source=gmail&amp;ust=1686137830954000&amp;usg=AOvVaw1eWIDYxBMlwI4i8BQ8Mi8-"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:normal"><span dir="ltr" style="word-break:break-word;line-height:32px">Pay commission fee</span></span></a>
                  </div>
                  <figure style="display:flex;align-items:center;justify-content:center;">  
                  <img src="${domainLink}/img/ethereum.gif" alt="Royal crypto union" style="margin:0 auto;padding:0;box-sizing:border-box;width:70px;height:auto;display:block" class="CToWUd" data-bit="iit">
                </figure>
              </td>
          </tr>
      </tbody>
  </table>
      
`;

  return output;
}

module.exports = {
  generateHTML: generateHTML,
};
