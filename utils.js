const https = require('https');
function findLinks (host, path="/", cb) {
  const options = {
    host,
    path
  };
const req = https.get(options, (res) => {
  console.log('STATUS: ' + res.statusCode);
  if (+res.statusCode === 200){
  const bodyChunks = [];
  res.on('data', (chunk) => {
    bodyChunks.push(chunk);
  }).on('end', () => {
    const body = Buffer.concat(bodyChunks);
    const outerLinks = []
    const links = body.toString().match(/href="\S*"/gi).map(url => url.slice(6, -1));
    links.forEach(async (link, index)=> {
      const req = https.get({host, path: link}, res => {
        if (res.statusCode === 404) outerLinks.push(link);
        if (index === links.length -1) cb(null, outerLinks);
      })
  })
  });
req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
}
});
}
findLinks('broken-links-api.herokuapp.com', '/', (err, links) => {
  console.log(links);
});