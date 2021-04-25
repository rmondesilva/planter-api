const express = require('express');
const app = express();
const port = 9000;

const { Gpio } = require('onoff');
const relay1 = new Gpio(18, 'out');
// Turn it off
relay1.writeSync(1);

const waterInSeconds = 1;
let isWatering = false;

// Routes
app.get('/', (req, res) => {
  res.send('Planter API');
});

app.post('/pour-water', async (req, res) => {
  relay1.writeSync(0);
  await setTimeout(() => {
    relay1.writeSync(1);
  }, waterInSeconds * 1000);
  res.send('Watering completed.');
});

// Start the server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
