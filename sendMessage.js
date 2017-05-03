var authToken = "ecf244e28f6f1d07f2cdfe56810db1ae";
var accountSid = 'ACcb6884d71165422958e419e168435cfc';
let client = require('twilio')(accountSid, authToken);
let yo = "<instertar numero>"

/**
 * @param {string} telephone
 * @param {string} text
 */
module.exports = function(telephone, text){
  return new Promise((resolve,reject)=>{
    client.messages.create({
        body: text,
        to: telephone,
        from: "+15005550006" // cambiar este número
    }, function(err, sms) {
        if(err){
          reject({error: err, ok: false});
          return;
        }
        resolve({ok: true, response: sms});

    });
  })
}