const fs = require('fs');
const http = require('http');
const url = require('url');


/////////////////////////////////////////
// FILES

// Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written 😁');
            });
        });
    });
});


/////////////////////////////////////////
// SERVER

// we can use tyhe sync-version of dea-file here because we only need to read it once (when the server starts)
// so even through sync is blocking, it's not blocking anything important
// it won't get executed on each request, only once when the server starts
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

// Load the templates
const tplOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tplCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tplProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Routing
    //--------------------

    // Overview page (home page) route
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(tplOverview);
    }

    // Product page route
    else if (pathName === '/product') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(tplProduct);
    }

    // API route
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        // here we have access to the data, so we can send it back to the client
        res.end(data);
    }

    // Not found route
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'some-custom-header': 'hello-world'
        });
        res.end('<h1>404 - Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
