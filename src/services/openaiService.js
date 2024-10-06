const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const filtrarContactos = async (respuestas) => {
    const prompt = generarPrompt(respuestas);

    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error al hacer la petición a OpenAI:', error.response ? error.response.data : error.message);
        throw new Error('Error al filtrar contactos con OpenAI');
    }
};

const generarPrompt = (respuestas) => {
    return `
        Eres un experto en ventas inmobiliarias. Un cliente te ha proporcionado la siguiente información:
        - Urgencia: ${respuestas.urgencia}
        - Finanzas: ${respuestas.finanzas}
        - Compromiso: ${respuestas.compromiso}

        Evalúa la seriedad del cliente en base a estos factores y proporciona una recomendación detallada.
    `;
};

module.exports = { filtrarContactos };

