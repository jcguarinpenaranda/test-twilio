let assert = require('assert');
let sendMessage = require('../sendMessage');

describe('sendMessage', function(){
  let okNumber = "+573014203939"
  let notOkNumber = "1234";

  it('should send a message to a working number', function(done){
    sendMessage(okNumber, 'hola')
    .then(data=>{
      assert.ok(data);
      done();
    }, e=>{
      assert.fail(e);
      done();
    })
  })

  it('should not send a message to a wrong number', function(done){
    sendMessage(notOkNumber, 'hola')
    .then(data=>{
      assert.fail(data);
      done();
    }, e=>{
      assert.ok(e);
      done();
    })
  });  

})