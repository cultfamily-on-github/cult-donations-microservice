const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const busboy = require('busboy');

http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('POST request');
        const bb = busboy({ headers: req.headers });
        const fileName = "geil.png"
        bb.on('file', (name, file, info) => {
            const saveTo = path.join(__dirname, `busboy-upload-${fileName}`);
            file.pipe(fs.createWriteStream(saveTo));
        });
        bb.on('close', () => {
            res.writeHead(200, { 'Connection': 'close' });
            res.end(`That's all folks!`);
        });
        req.pipe(bb);
        return;
        // bb.on('file', (name, file, info) => {
        //   const { filename, encoding, mimeType } = info;
        //   console.log(
        //     `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        //     filename,
        //     encoding,
        //     mimeType
        //   );
        //   file.on('data', (data) => {
        //     console.log(`File [${name}] got ${data.length} bytes`);
        //   }).on('close', () => {
        //     console.log(`File [${name}] done`);
        //   });
        // });
        bb.on('field', (name, val, info) => {
            console.log(`Field [${name}]: value: %j`, val);
        });
        bb.on('close', () => {
            console.log('Done parsing form!');
            res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end();
        });
        req.pipe(bb);
    } else if (req.method === 'GET') {
        res.writeHead(200, { Connection: 'close' });
        res.end(`
      <html>
        <head></head>
        <body>
          <form method="POST" enctype="multipart/form-data">
            <input type="file" name="filefield"><br />
            <input type="text" name="textfield"><br />
            <input type="submit">
          </form>
        </body>
      </html>
    `);
    }
}).listen(8000, () => {
    console.log('Listening on http://localhost:8000');
});