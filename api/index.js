const { Configuration, OpenAIApi } = require("openai");

// Setup Constants from ENV Vars.
const OPENAI_API_KEY = process.env.OPENAI_SWISSLATOR_KEY;

// Set up OpenAI API client
const configuration = new Configuration({apiKey: OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

// Function to translate Swiss German text
async function translateSwissGerman(text) {
  const prompt = `Translate the following Swiss German text to English:\n\n${text}`;
  try {
    // Call the OpenAI API to generate translation
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      maxTokens: 100,
      temperature: 0.5,
      topP: 1.0,
      n: 1,
      stop: '\n'
    });

    // Extract and return the translated text
    const translation = response.data.choices[0].text.trim();
    return translation;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Example usage
const swissGermanText = 'Grüezi, wie gohts?';
translateSwissGerman(swissGermanText)
  .then(translation => {
    console.log(`Swiss German: ${swissGermanText}`);
    console.log(`Translation: ${translation}`);
  })
  .catch(error => {
    console.error('Translation failed:', error);
  });