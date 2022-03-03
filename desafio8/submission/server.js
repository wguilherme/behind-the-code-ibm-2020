const express = require("express")
const app = express()
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ModelId = "69f57d89-2f6e-4c2a-a72f-e86abdc68a73"
const nluApiKey = "a5rp1mAv0sHO4axYZsp-YjbbGgzEP3r_UPFRrm8NZmfV"
const nluUrl = "https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/6a931651-1484-4c73-be6d-217dd6339d05"

// NLU
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { text } = require("body-parser");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: nluApiKey,
  }),
  serviceUrl: nluUrl,
});

app.post("/",  upload.any(), async (req, res) => {

  // carro selecionado
  let car = req.body.car

  if(!req.body.text) {

    let audio = req.files[0].path;
    let textToAnalyze = await sst(audio)
    let resultNlu = await nlu(textToAnalyze)

    res.status(200).json(resultNlu)

    

    let response = await filterNlu(resultNlu) 
    
    res.status(200).json(response)
 }
  else {

    console.log(req.body.text)
      
    let textToAnalyze = req.body.text

    let resultNlu = await nlu(textToAnalyze)   

    let response = await filterNlu(resultNlu)

    // response.recommendation = await recommendCar(resultNlu,response.entities);


    res.status(200).json(response)

   } 
 })

 
 async function sst(audioFile) {

   console.log('Processando STT')   

   const speech = require('@google-cloud/speech');
   const fs = require('fs');
   const client = new speech.SpeechClient();
   const fileName = audioFile;

   const file = await fs.readFileSync(fileName);
   const audioBytes = await file.toString('base64');
   const audio = {
     content: audioBytes,
   };
   const config = {
   //   encoding: 'FLAC',
   //   sampleRateHertz: 16000,
     languageCode: 'pt-BR[',
     audioChannelCount: 2
   };
   const request = {
     audio: audio,
     config: config,
   }; 

   const [response] = await client.recognize(request);
   const transcription = await response.results.map(result => result.alternatives[0].transcript).join('\n');


   console.log(`Transcription: ${transcription}`);
   
   return transcription

 }

 async function nlu(text){
  const analyzeParams = {

    'features': {
     'entities': {
        'sentiment':true,
        "model": ModelId,
        // 'limit':2
     },
    },
    'text': text
  };

  var nluObj;

  await naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {

    console.log('entrou no NLU')
    console.log(JSON.stringify(analysisResults, null, 2));

    nluObj = analysisResults;

    console.log('#2323', analysisResults);

  })
  .catch(err => {
    console.log('error:', err);
  });

  return nluObj;
 }

 async function filterNlu(nlu, recommended){

  let response = {};
  let filteredEntities = [];
  let entities = nlu.result.entities


if(entities){
  entities.forEach(e => {

    let entity = {
      entity: e.type,
      sentiment: e.sentiment.score,
      mention: e.text,
    }

    filteredEntities.push(entity)
          
});


}

  if(recommended){
    response.recommendation = recommended;

  } else {

    response.recommendation = ""
  }


  response.entities = filteredEntities

  return response
 }

async function recommendCar(response){

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
  const minorEntity = await response.sort(compare);
  var clearArr = []
  var winners = []
  var x = 0;

  await minorEntity.forEach(item  => {            
     const calc = Math.abs(item.value - minorEntity[0].value);

     if (calc < 0.1 && x > 0 ) { clearArr.push(item) }
     x++
})
 
  await priorityTable.forEach(item => {
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

  return recommendCar

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

app.listen(3050, () => console.log("Rodando na porta 3050..."))