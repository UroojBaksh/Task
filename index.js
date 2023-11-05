require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');



const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const action = req.body.queryResult.action;

  if (action === 'getOrderStatus') {
    const orderID = req.body.queryResult.parameters['orderId'];
    console.log('Received order ID:', orderID);
    try {
      const response = await axios.post('https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus', { orderId: orderID });
      const shipmentDate = new Date(response.data.shipmentDate);
      const formattedDate = shipmentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

      const fulfillmentText = `Your order ${orderID} will be shipped on ${formattedDate}`;
      return res.json({ fulfillmentText });
    } catch (error) {
      console.error('Error fetching order status:', error);
      return res.json({ fulfillmentText: 'Sorry, something went wrong while fetching your order status.' });
    }
  }

  res.json({ fulfillmentText: 'Sorry, I did not understand that.' });
});
app.get('/', (req, res) => {
    res.send('Ngrok is working and can reach the Express server!');
  });

const PORT = process.env.PORT || 3001 ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});