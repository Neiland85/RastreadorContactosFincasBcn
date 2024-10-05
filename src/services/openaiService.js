const axios = require('axios');
require('dotenv').config();

const filtrarContactos = async (respuestas) => {
    try {
        if (!respuestas || !respuestas.urgencia || !respuestas.finanzas || !respuestas.compromiso) {
            throw new Error('Datos de contacto incompletos');
        }

        const apiKey = process.env.OPENAI_API_KEY;
        const prompt = generarPrompt(respuestas);

        const respuesta = await axios.post('https://api.openai.com/v1/completions', {
            model: 'code-cushman-001',
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.3
        }, {
            headers: {
	'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  
        'Content-Type': 'application/json'            }
        });

        return respuesta.data.choices[0].text.trim();
    } catch (error) {
        console.log('Error al hacer la petición a OpenAI:', error);
        throw new Error('Error al filtrar contactos con OpenAI');
    }
};

const generarPrompt = (respuestas) => {
    return `
    Eres un experto en ventas inmobiliarias. Un cliente te ha proporcionado la siguiente información:

    1. Urgencia: ${respuestas.urgencia}
    2. Finanzas: ${respuestas.finanzas}
    3. Compromiso: ${respuestas.compromiso}

    Evalúa la seriedad del cliente en base a estos factores y da una recomendación detallada.
    `;
};

module.exports = {
    filtrarContactos
};

