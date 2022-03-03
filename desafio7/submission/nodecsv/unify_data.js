const fs = require("fs"); 
// Lê o json base
const json = require("./filtrados4.json"); 
const dadosLimpos = [];

// abre um loop de 1 a 17k
for (let i = 0; i < 18000; i++){
   var rowFound = verifyRowNumber(i);
   var duplicate = verifyDuplicates(i);

   if(rowFound && !duplicate){

      console.log('encontrado e permissão para salvar ok')
      
      const uniqueItem = json.find(element => element.row === i);
      
      dadosLimpos.push(uniqueItem)
   }
}


function verifyRowNumber(index){
   let retorno = false;

   json.forEach(item => {if (item.row === index){retorno = true}});
   
   return retorno ? true : false
}

function verifyDuplicates(rowNumber){
   
   let retorno = false;

   dadosLimpos.forEach( itemArray => {      
      // console.log(itemArray.row)
      if (itemArray.row === rowNumber){
         console.log('Este item já existe no ARRAY. Salvamento ignorado')
         retorno = true;
         return
      } else {
         retorno = false;
      }
   }
   );

   return retorno ? true : false
}
// console.log(dadosLimpos)

fs.writeFile ("filtrados5.json", JSON.stringify(dadosLimpos), function(err) {
   if (err) throw err;
   console.log('writed');
   })

