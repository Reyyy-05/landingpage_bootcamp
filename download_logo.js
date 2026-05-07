const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream("x:/Albar/landingpage_bootcamp/public/images/logo-creativemu.png");
https.get("https://creativemuacademy.com/wp-content/uploads/2021/09/Logo-Creativemu-New-01.png", function(response) {
  response.pipe(file);
  file.on("finish", () => {
    file.close();
    console.log("Download completed.");
  });
}).on("error", (err) => {
  fs.unlink("x:/Albar/landingpage_bootcamp/public/images/logo-creativemu.png", () => {});
  console.error("Error: ", err.message);
});
