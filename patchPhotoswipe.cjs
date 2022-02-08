const fs = require("node:fs");

const path = require.resolve("photoswipe/package.json");
console.log("Patching PhotoSwipe: " + path);
const data = JSON.parse(fs.readFileSync(path));
delete data["main"];
fs.writeFileSync(path, JSON.stringify(data, null, 2));
