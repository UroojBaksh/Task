## Order Status Bot API

## Project Description
This project comprises a REST API designed to integrate with a DialogFlow ES bot, facilitating a seamless and interactive user experience for customers inquiring about their order status. Our solution elevates customer service by providing real-time updates on orders through a conversational interface. The API is the backend engine for the DialogFlow bot, handling webhooks and communicating with an external order status service to retrieve shipment dates.

## Features
Webhook Endpoint: The API includes an endpoint to receive and process webhook requests from the DialogFlow bot.
Order ID Retrieval: Upon receiving a user's request, the API extracts the order ID provided by the user within the conversational flow.
External API Integration: Utilizing the axios HTTP client, the API makes a POST request to an external service, using the order ID to retrieve the corresponding shipment date.
Dynamic Responses: Based on the received data, the API crafts a WebhookResponse containing the shipment date and delivers it back to the DialogFlow bot, which then communicates the information to the user in a friendly, conversational manner.

## How It Works
Conversational Flow: The DialogFlow ES bot starts a conversation with the user, who asks about the status of their order. The bot collects the order ID from the user.
Webhook Processing: The provided order ID is sent to the REST API through a webhook request.
Shipment Date Retrieval: The API receives the webhook, extracts the order ID, and sends a POST request to the external order status API.
Response Generation: Once the API obtains the shipment date, it formats the date and includes it in a WebhookResponse, which is sent back to the DialogFlow bot.
User Notification: The DialogFlow bot informs the user of the expected shipment date, completing the query cycle.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```bash
node -v
npm -v
```

### Installing

A step by step series of examples that tell you how to get a development environment running.

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/yourprojectname.git
```

Navigate to the project directory:

```bash
cd yourprojectname
```

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
node index.js
```

Your server should now be running on `localhost:3001`.

### Connecting with ngrok

To expose your local development server to the Internet, you can use `ngrok`. This is useful for testing purposes, especially if you want to integrate with external services like Dialogflow's fulfillment webhook.

#### Setting up ngrok

Install ngrok globally using npm:

```bash
npm install ngrok -g
```

Run ngrok to tunnel your local port (where your app is running) to the outside world:

```bash
ngrok http 3001
```

After running this command, `ngrok` will provide you with a public URL (e.g., https://12345678.ngrok.io). You can use this URL as your webhook URL in services like Dialogflow.

## Running the tests

Explain how to run the automated tests for this system (if applicable).

## Deployment
## 1. Create Free AWS Account
Create free AWS Account at https://aws.amazon.com/

## 2. Create and Lauch an EC2 instance and SSH into machine
I would be creating a t2.medium ubuntu machine for this demo.

## 3. Install Node and NPM
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs

node --version
```

## 4. Clone your project from Github
```
git clone https://github.com/piyushgargdev-01/short-url-nodejs
```

## 5. Install dependencies and test app
```
sudo npm i pm2 -g
pm2 start index

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot
pm2 startup ubuntu
```

## 6. Setup Firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## 7. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8001; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo nginx -s reload
```

## 8. Add SSL with LetsEncrypt
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

## Built With

* [Node.js](https://nodejs.org/) - The runtime server environment
* [Express](https://expressjs.com/) - The web framework used
* [Axios](https://github.com/axios/axios) - Used to make HTTP requests

## Additional Information
The API is written in Node.js, utilizing the Express framework for easy endpoint management and axios for efficient HTTP requests.
Deployment is handled on an AWS EC2 instance, ensuring scalability and reliability.
Nginx is configured as a reverse proxy to route traffic from the public domain to the local server running the API, providing an extra layer of security and improved performance.
## Authors

* **Urooj** - 
