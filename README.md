# Building with the Twilio API for WhatsApp

This example code is from the [how to build a location-aware WhatsApp application Twilio webinar](https://ahoy.twilio.com/location-aware-whatsapp-apac-webinar) and the [Building with the Twilio API for WhatsApp](https://www.twilio.com/go/whatsapp-webinar-may2021-apac-1). It demonstrates how to build a WhatsApp bot that reacts to different inputs, including location. It can send messages that include text, images, files and locations.

This bot responds to a number of commands:

- **contact**: sends a VCard with Phil's contact details
- **picture**: sends a picture of Alex, the Twilio developer evangelism team mascot
- If you send your **location**, it looks up restaurants from the Foursquare API and sends you an image, description and location of a nearby restaurant
- If you send anything else it will respond with a default message

* [Running this bot yourself](#running-this-bot-yourself)
  * [Setup the Twilio Sandbox for WhatsApp](#setup-the-twilio-sandbox-for-whatsapp)
  * [Running the bot locally](#running-the-bot-locally)
  * [Deploying to Twilio Functions](#deploying-to-twilio-functions)
* [Further resources](#further-resources)

## Running this bot yourself

To run this bot yourself you will need:

- A Twilio account ([sign up for a free Twilio account here](https://www.twilio.com/try-twilio))
- [Node.js](https://nodejs.org/en/download/)
- A WhatsApp account
- [A Foursquare developer account](https://developer.foursquare.com/)

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

Create a Foursquare application and get your Foursquare API client ID and secret from the [Foursquare developers portal](https://developer.foursquare.com/) and enter them in `.env`.

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

## Further resources

- [Twilio API for WhatsApp docs](https://www.twilio.com/docs/whatsapp/api)
- [WhatsApp guide for getting opt-in from your users](https://developers.facebook.com/docs/whatsapp/guides/opt-in/)
- [Build a WhatsApp chatbot with Ruby, Sinatra and Twilio](https://www.twilio.com/blog/whatsapp-chatbot-ruby-sinatra-twilio)
- [Build a location-aware WhatsApp weather bot with Ruby, Sinatra and Twilio](https://www.twilio.com/blog/location-aware-whatsapp-bot-ruby-sinatra-twilio)
- [Using Location Data in WhatsApp to find nearby healthy restaurants using Twilio and JavaScript](https://www.twilio.com/blog/glorious-food)
- [Using WhatsApp with the Twilio Conversations API](https://www.twilio.com/docs/conversations/using-whatsapp-conversations)
- [Using WhatsApp with Twilio Autopilot](https://www.twilio.com/docs/autopilot/channels/whatsapp)
