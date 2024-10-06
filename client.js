const axios = require('axios');

let data = JSON.stringify({
  "respuestas": {
    "urgencia": "alta",
    "finanzas": "buenas",
    "compromiso": "firme"
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/filtrar',
  headers: { 
    'Content-Type': 'application/json'
  },
  data: data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});

