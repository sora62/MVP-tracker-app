require('dotenv').config();
const app = require('./index');

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
