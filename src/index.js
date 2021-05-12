const app = require("./app");

require("./connection");

const PORT = 3000;

async function init() {
  await app.listen(PORT);
  console.log(`Server on port ${PORT}`);
}

init();
