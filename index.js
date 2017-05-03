// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let getFamilyNumbers = require('./getFamilyNumbers');
let sendMessage = require('./sendMessage');

// para entender las peticiones con body
app.use(bodyParser.json({}));

/**
 * Al hacer un POST a esta ruta 
 * con los parámetros to y msg, se envía
 * un mensaje de texto con twilio
 */
app.post('/send', function(req, res){
  if(!req.body.to || !req.body.msg){
    res.json({ ok:false, error: "Missing parameters msg or to" })
    return;
  }

  // enviar el mensaje
  sendMessage(req.body.to, req.body.msg)
  .then(response => {
    res.json(response);
  })
  .catch(e=>{
    res.json(e);
  });
});

/**
 * 
 */
app.post('/attack', function(req,res){
  if(!req.body.uid){
    res.json({ ok:false, error: "Missing parameter uid" })
    return;
  }

  getFamilyNumbers(req.body.uid)
  .then((numbers=[])=>{
    // enviarle un mensaje a cada numero
    let promisesMensajes = [];

    // enviar todos los mensajes
    numbers.forEach(number=>{
      let promiseMensaje = sendMessage(number,'Tu familiar está teniendo un ataque');

      promisesMensajes.push(promiseMensaje);
    });

    // aqui se espera a que todos los mensajes se envíen
    Promise.all(promisesMensajes)
    .then((data)=>{
      res.json({ok: true, data});
    })
    .catch(e=>{
      res.json({ok: false, error: e})    
    });

  })
  .catch(e=>{
    res.json({ok: false, error: e})
  });
  
});

app.listen(process.env.PORT || 12345, function(){
  console.log('running');
})