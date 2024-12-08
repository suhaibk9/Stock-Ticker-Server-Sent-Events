const express = require('express');
const app = express();
app.use(express.static('public'));
const stocks = {
  AAPL: 130.21,
  GOOGL: 1500.43,
  AMZN: 3200.0,
};
const updateStockPrices = () => {
  Object.keys(stocks).forEach((stock) => {
    const random = Math.random() * 20 - 10;
    stocks[stock] += random;
  });
};
app.get('/stocks', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const intervalId = setInterval(() => {
    updateStockPrices();
    const data = JSON.stringify(stocks);
    res.write(`data: ${data}\n\n`);
  }, 1000);
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
