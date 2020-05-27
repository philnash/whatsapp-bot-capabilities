# How to build a location-aware WhatsApp application

This example code is from the [how to build a location-aware WhatsApp application Twilio webinar](https://ahoy.twilio.com/location-aware-whatsapp-apac-webinar). It demonstrates how to build a WhatsApp bot that reacts to different inputs, including location. It can send messages that include text, images, files and locations.

This bot responds to a number of commands:

- **contact**: sends a VCard with Phil's contact details
- **picture**: sends a picture of Alex, the Twilio developer evangelism team mascot
- **twilio**: sends the location of the Twilio office in Melbourne
- If you send your **location**, it looks up the current weather in your location
- If you send anything else it will respond with a default message

## Running this bot yourself

To run this bot yourself you will need:

- A Twilio account ([sign up for a free Twilio account here](https://www.twilio.com/try-twilio))
- [Node.js](https://nodejs.org/en/download/)
- A WhatsApp account
- [A free weatherstack account](https://weatherstack.com)

Then, clone the repository:

```bash
git clone https://github.com/philnash/whatsapp-bot-capabilities.git
cd whatsapp-bot-capabilities
```

Install the dependencies:

```bash
npm install
```

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Get your Twilio Account Sid and Auth Token from your [Twilio console](https://www.twilio.com/console) and enter them in `.env`.

Get your weatherstack API Access Key from the [weatherstack dashboard](https://weatherstack.com/dashboard) and enter it in `.env`.

### Setup the Twilio Sandbox for WhatsApp

Go to your Twilio account and [follow the prompts to set up the Twilio Sandbox for WhatsApp](https://www.twilio.com/console/sms/whatsapp/learn)

### Running the bot locally

You can run the bot locally, which will use ngrok to tunnel through to your account. Start the application with:

```bash
npm start -- --ngrok
```

Then take the URL for the `/whatsapp` function (which should look like `https://RANDOM_SUBDOMAIN.ngrok.io/whatsapp`) and paste it into the [Twilio WhatsApp Sandbox configuration](https://www.twilio.com/console/sms/whatsapp/sandbox).

Then send your bot a message.

### Deploying to Twilio Functions

To deploy the function, you can run:

```bash
npm run deploy
```

When the script is finished you will see a URL that looks like `https://whatsapp-bot-webinar-XXXX-dev.twil.io/whatsapp`. Take that URL and paste it into the [Twilio WhatsApp Sandbox configuration](https://www.twilio.com/console/sms/whatsapp/sandbox).

Then send your bot a message.
