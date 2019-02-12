const https = require('https');
const findBroken = (host) => {
  const broken = [];
  const notBroken = []
  findLinks(host, '/', (err, brokenLink, notBrokenLink) => {
    console.log(broken.sort());
    if (err) throw err;
    else if (brokenLink) {(broken.push(brokenLink))}
    else if (notBrokenLink) {notBroken.push(notBrokenLink)}
  });
function findLinks (host, path="/", cb) {
  const options = {
    host,
    path
  };
const req = https.get(options, (res) => {
  console.log('STATUS: ' + res.statusCode);
  if (+res.statusCode === 404) cb(null, (`${path}`))// broken link
  else if (+res.statusCode === 200){
  // Buffer the body entirely for processing as a whole.
  const bodyChunks = [];
  res.on('data', (chunk) => {
    bodyChunks.push(chunk);
  }).on('end', () => {
    const body = Buffer.concat(bodyChunks);
    // console.log(body.toString()); // whole body
    // links
    const links = body.toString().match(/href="\S*"/gi).map(url => url.slice(6, -1));
    links.forEach(link => {
      console.log(broken.length) 
      console.log(`${host}${link}`);
      console.log(broken.includes(`${link}`))
      if (!broken.includes(`${link}`) && link.includes('.html') && ) findLinks(host, link, cb)
      });
  })
  } else {
    console.log('different code');
  }
req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
})
}
}
findBroken('broken-links-api.herokuapp.com');