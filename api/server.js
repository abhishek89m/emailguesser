const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.REACT_APP_URL,
  })
);
app.use(express.json());

const guessRouter = require('./routes/guess');

app.use('/guess', guessRouter);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
