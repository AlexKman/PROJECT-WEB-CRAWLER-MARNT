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
    const brokenLinks = []
    const links = body.toString().match(/href="\S*"/gi).map(url => url.slice(6, -1));
    let i = 0;
    links.forEach((link, index)=> {
      const req = https.get({host, path: link}, res => {
        i++
        if (res.statusCode === 404) brokenLinks.push(link);
        if (i === links.length) {
          cb(null, brokenLinks)
          };
      })
  })
  });
req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
}
});
}
findLinks('broken-links-api.herokuapp.com', '/',(err, links) => {
  console.log(links);
})
module.exports = {findLinks};