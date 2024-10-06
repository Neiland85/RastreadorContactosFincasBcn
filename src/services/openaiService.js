const axios = require('axios');
require('dotenv').config();

const filtrarContactos = async (respuestas) => {
    const prompt = generarPrompt(respuestas);
    
    const apiKey = process.env.OPENAI_API_KEY;
    const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].text.trim();
};

const generarPrompt = (respuestas) => {
    return `Eres un experto en ventas inmobiliarias. 
    Un cliente te ha proporcionado la siguiente información:
    Urgencia: ${respuestas.urgencia}
    Finanzas: ${respuestas.finanzas}
    Compromiso: ${respuestas.compromiso}

    Evalúa la seriedad del cliente basándote en esta información y ofrece una recomendación detallada.`;
};

module.exports = {
    filtrarContactos
};

