const http = require('http');

// Test if we can connect to localhost:8000
const req = http.request({
  hostname: 'localhost',
  port: 8000,
  path: '/api/posts/',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response length:', data.length);
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed successfully, count:', parsed.count);
    } catch {
      console.log('Response (first 200 chars):', data.substring(0, 200));
    }
  });
});

req.on('error', (error) => {
  console.error('Connection error:', error.message);
  console.error('Error code:', error.code);
});

req.setTimeout(5000, () => {
  console.error('Request timeout');
  req.destroy();
});

req.end();
