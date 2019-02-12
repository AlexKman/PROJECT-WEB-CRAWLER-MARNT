const https = require('https');
function findLinks (host, path="/", cb) {
  const options = {
    host,
    path
  };
const req = https.get(options, (res) => {
  if (+res.statusCode === 200){
  const bodyChunks = [];
  res.on('data', (chunk) => {
    bodyChunks.push(chunk);
  }).on('end', () => {
    const body = Buffer.concat(bodyChunks);
    const brokenLinks = []
    const workingLinks = [];
    const links = body.toString().match(/href="\S*"/gi).map(url => url.slice(6, -1));
    let i = 0;
    links.forEach((link, index)=> {
      const req = https.get({host, path: link}, res => {
        i++
        if (res.statusCode === 404) brokenLinks.push(link);
        else if (res.statusCode === '200') {
          workingLinks.push(link);
          // recursive check
        }
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

module.exports = {findLinks};