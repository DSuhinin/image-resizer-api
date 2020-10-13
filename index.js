const log = require("debug")("express:");
const app = require("./src/app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  log(`service is start listening on port ${port}`);
});
