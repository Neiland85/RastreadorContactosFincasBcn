const axios = require('axios');
require('dotenv').config();  // Cargar variables de entorno

// Función para filtrar contactos usando OpenAI
const filtrarContactos = async (respuestas) => {
    try {
        const apiKey = process.env.OPENAI_API_KEY;  // Obtener la clave API desde .env
        const prompt = generarPrompt(respuestas);  // Generar el prompt con las respuestas

        // Configuración de la petición a OpenAI
        const respuesta = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',  // Usar el modelo GPT-3
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        // Devolver la respuesta generada por OpenAI
        return respuesta.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error al hacer la petición a OpenAI:', error.message);
        throw new Error('Error al filtrar contactos con OpenAI');
    }
};

// Función para generar el prompt basado en las respuestas del usuario
const generarPrompt = (respuestas) => {
    return `
    Eres un agente inmobiliario experto. Un cliente ha proporcionado la siguiente información:

    1. **Urgencia**: ${respuestas.urgencia}
    2. **Finanzas**: ${respuestas.finanzas}
    3. **Compromiso**: ${respuestas.compromiso}

    Basándote en esta información, ¿cómo calificarías la seriedad de este cliente para comprar una propiedad en los próximos meses? Responde de forma detallada, analizando cada uno de los puntos.
    `;
};

module.exports = {
    filtrarContactos
};

