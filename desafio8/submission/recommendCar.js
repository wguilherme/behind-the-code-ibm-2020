const priorityTable =  [
      "SEGURANCA",
      "CONSUMO",
      "DESEMPENHO",
      "MANUTENCAO",
      "CONFORTO",
      "DESIGN",
      "ACESSORIOS"
   ]
   
const recommendList = {
      SEGURANCA:['TORO','FIAT 500'],
      CONSUMO:['ARGO', 'TORO'],
      DESEMPENHO:['MAREA','TORO'],
      MANUTENCAO:['FIORINO', 'ARGO'],
      CONFORTO:['CRONOS', 'MAREA','TORO'],
      DESIGN:['TORO', 'ARGO'],
      ACESSORIOS:['ARGO', 'FIAT 500'],
  }
async function recommendCar(response){
   
      const minorEntity = await response.sort(compare);
      var clearArr = []
      var winners = []
      var x = 0;
   
      minorEntity.forEach(item  => {            
         const calc = Math.abs(item.value - minorEntity[0].value);
   
         if (calc < 0.1 && x > 0 ) { clearArr.push(item) }
         x++
   })
     
      priorityTable.forEach(item => {
         clearArr.forEach(i => {
            i.entity === item;
               winners.push(i)
         })
      })   
   
      console.log('e o grande vencedor é', winners[0])
   
      const negativeKey = winners[0].entity;
   
      console.log('key', negativeKey)
   
      var recommendedCar = ''
   
      if(recommendedCar === recommendList[negativeKey][0]){

         recommendedCar = recommendList[negativeKey][1]
      } 
      
      else {recommendedCar = recommendList[negativeKey][0] }
   
      console.log('a recomendação é', recommendedCar)
   
   }

function compare( a, b ) {
if ( a.value < b.value ){
   return -1;
}
if ( a.value > b.value ){
   return 1;
}
return 0;
}

var x = [
   {
      "entity": "DESIGN",
      "value": -0.8
   },
   {
      "entity": "CONFORTO",
      "value": -0.67
   },
   {
      "entity": "CONSUMO",
      "value": -0.77
   },
   {
      "entity": "DESEMPENHO",
      "value": -0.89
   },
   {
      "entity": "DESIGN",
      "value": -0.88
   },
   {
      "entity": "CONSUMO",
      "value": -0.72
   },
   {
      "entity": "CONFORTO",
      "value": -0.71
   },
   {
      "entity": "ACESSORIOS",
      "value": -0.31
   }
   
]

recommendCar(x) 
