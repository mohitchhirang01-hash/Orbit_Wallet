const https = require('https');
https.get('https://www.orbitwallet.in/', (res) => {
    let data = '';
    res.on('data', (c) => data += c);
    res.on('end', () => {
        const matches = data.match(/href="([^"]+)"[^>]*>Privacy Policy/i);
        console.log(matches ? matches[1] : 'Not Found');
    });
});
