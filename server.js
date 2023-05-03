require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./utils/initModel');

db.authenticate()
  .then(() => console.log('Database authenticate'))
  .catch((error) => console.log(error));

initModel();

db.sync()
  .then(() => console.log('Database Synced'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
