import http from "http";
import { Configuration, OpenAIApi } from "openai";

// Setup Constants from ENV Vars.
const OPENAI_API_KEY = process.env.OPENAI_SWISSLATOR_KEY;

// Set up OpenAI API client
const openai = new OpenAIApi(new Configuration({apiKey: OPENAI_API_KEY,}));

// Function to translate Swiss German text
async function translateSwissGerman(text) {
  const prompt = `Translate the following Swiss German text to English: ${text}`;
  try {
    // Call the OpenAI API to generate translation
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 400,
      temperature: 0.3,
      top_p: 1.0,
      n: 1
    });
    // Extract and return the translated text
    const translation = response.data.choices[0].text.trim();
    return translation;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// // Example usage
// const swissGermanText = `Hüt isch d Thermik ächli besser gsy aus geschter, Nord- und Oschtüberdruck isch immer no dütlich prognoschtiziert gsy. Ohni Christoph wäri äuä nid überd Grimsel, und ohni Stephi und ihri Tips vom Morgä wäri äuä au nid id Südtäler. Beidi Entscheidigä hani nid bereut...

// Merci vöu vöu Mou Raoul für Choscht und Logis.

// Sion aktiv bis 17:05 Uhr. Am frühen Nachmittag 300m AGL unterflogen.`;

// translateSwissGerman(swissGermanText)
//   .then(translation => {
//     console.log(`Swiss German: ${swissGermanText}`, "\n");
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(error => {
//     console.error('Translation failed:', error);
//   });