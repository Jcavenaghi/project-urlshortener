require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
const urlparser = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

const urls = [];

var newurl = 1;

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.post("/api/shorturl", function(req,res) {
  let myUrl = req.body.url;
  const some = dns.lookup(urlparser.parse(myUrl).hostname, (err,address) => {
    if (!address) {
      res.json({error: "invalid url"})
    } else {
      url_data = {original_url: myUrl, short_url: newurl}
      urls.push(url_data)
      newurl = newurl + 1
      res.json(url_data);
    }
  })  

})

app.get("/api/shorturl/:shorturl", function(req,res) {
  s_url = req.params.shorturl;
  s_url = parseInt(s_url)
  console.log(typeof(s_url))
  const data_url = urls.find(item => item.short_url === s_url);
  res.redirect(data_url.original_url);
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
