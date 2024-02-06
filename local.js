var { handler } = require('./index');
const fs = require('fs');

handler({
    width: 1200,
    height: 900,
    content: "Your content here",
    executablePath: '/opt/homebrew/bin/chromium'
})
    .then(response => {
        const json = JSON.parse(response.body);
        fs.writeFileSync('./screenshot.png', json.screenshot, 'base64')
    })
    .catch(error => console.error(error));