const axios = require('axios');

const filtrarContactos = async (respuestas) => {
    const prompt = generarPrompt(respuestas);

    const respuesta = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });

    return respuesta.data.choices[0].text.trim();
};

const generarPrompt = (respuestas) => {
    return `Analiza las siguientes respuestas y clasifica la seriedad del comprador en función de su urgencia, capacidad financiera y compromiso: ${JSON.stringify(respuestas)}`;
};

module.exports = {
    filtrarContactos
};

