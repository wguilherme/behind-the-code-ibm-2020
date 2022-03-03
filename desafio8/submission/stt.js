async function main() {

   const speech = require('@google-cloud/speech');
   const fs = require('fs');
    const client = new speech.SpeechClient();

   const fileName = './resources/audio.flac';
   const file = fs.readFileSync(fileName);

   const audioBytes = file.toString('base64');
   const audio = {
     content: audioBytes,
   };
   const config = {
   //   encoding: 'FLAC',
   //   sampleRateHertz: 16000,
     languageCode: 'pt-BR',
     audioChannelCount: 2
   };
   const request = {
     audio: audio,
     config: config,
   }; 

   const [response] = await client.recognize(request);
   const transcription = response.results
     .map(result => result.alternatives[0].transcript)
     .join('\n');
   console.log(`Transcription: ${transcription}`);
 }
 main().catch(console.error);
 