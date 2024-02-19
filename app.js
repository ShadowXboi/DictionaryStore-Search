const http = require('http');
const url = require('url');

// Array to store dictionary entries (word: definition)
let dictionary = [];

const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Check for preflight requests (OPTIONS) and handle them immediately
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const { pathname, query } = url.parse(req.url, true);

  if (pathname === '/api/definitions' && req.method === 'POST') {
    // Handle POST request to create new entry in the dictionary
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const newEntry = JSON.parse(body);

      const existingEntryIndex = dictionary.findIndex(
        (entry) => entry.word === newEntry.word
      );

      if (existingEntryIndex !== -1) {
        res.writeHead(409, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: `Warning! '${newEntry.word}' already exists.`,
          })
        );
      } else {
        dictionary.push(newEntry);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            requestNumber: dictionary.length,
            message: `New entry recorded: "${newEntry.word}: ${newEntry.definition}"`,
          })
        );
      }
    });
  } else if (pathname === '/api/definitions' && req.method === 'GET') {
    // Handle GET request to retrieve definitions
    const word = query.word;

    const entry = dictionary.find((entry) => entry.word === word);

    if (entry) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(entry));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          requestNumber: dictionary.length + 1,
          message: `Word '${word}' not found!`,
        })
      );
    }
  } else {
    // Handle other requests (e.g., return 404 Not Found)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
