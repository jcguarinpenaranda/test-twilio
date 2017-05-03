/***
 * @param {string} uid
 * @return {Promise<any[]>}
 */
function getFamilyNumbers(uid){
  return new Promise((resolve,reject)=>{
    // acá te conectás a la base de datos 
    // y retornás los números de la familia
    resolve(['+573014203939', '+573017001358']);
  });
}

module.exports = getFamilyNumbers;