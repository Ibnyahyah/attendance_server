const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

const app = require('./app');

// Database configuration
const DB_URL = process.env.MONGO_DB_URL;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database.....');
  })
  .catch((e) => {
    console.log('Error connecting to Database');
    console.log(e);
    console.log('Shutting down.....');
    process.exit(1);
  });

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});
