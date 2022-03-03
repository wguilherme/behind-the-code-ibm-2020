const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: '8ASobKGJS0elWEUuXabdFcipbRBbUr52bj1T3DXneVsp',
  }),
  serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/55181981-caff-43e0-bc62-c4046ace52ea',
});

const analyzeParams = {

  'features': {
   'entities': {
      'sentiment':true,
      "model": "f3a00257-33f1-4120-bf71-a84608008e6b",
      // 'limit':2
   },
  },
  'text': 'Testei o volante e não gostei. Mas o JEEP é muito bom, a manta abafou legal o som do motor'
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });