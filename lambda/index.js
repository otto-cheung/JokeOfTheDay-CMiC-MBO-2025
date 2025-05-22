const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

exports.handler = async () => {
  const url = dotenv.parsed.JOKE_API_URL;

  const joke = await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });

  const response = {
    category: joke.category,
    setup: joke.setup,
    delivery: joke.delivery
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(response),
  };
};