const app = require("./app");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 4002;

// LISTEN
app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});