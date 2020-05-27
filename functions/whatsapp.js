const got = require("got");

// Get the weather from the weatherstack API. See the documentation for more
// details: https://weatherstack.com/documentation
const getWeather = async (lat, long, accessKey) => {
  const url = new URL("http://api.weatherstack.com/current");
  url.searchParams.set("access_key", accessKey);
  url.searchParams.set("query", `${lat},${long}`);
  const response = await got(url, {
    responseType: "json",
  });
  const {
    current: { temperature, weather_icons, weather_descriptions },
  } = response.body;
  const text = `It is currently ${weather_descriptions[0].toLowerCase()} and ${temperature}°C`;
  return { text, image: weather_icons[0] };
};

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.MessagingResponse();
  const message = twiml.message();
  const body = event.Body.toLowerCase();
  if (body.includes("contact")) {
    // If the message includes "contact" send a VCard with contact details
    message.media("/vcard.vcf");
  } else if (event.Latitude && event.Longitude) {
    // If the message is a location message, use the weatherstack API to get the
    // current weather.
    const { text, image } = await getWeather(
      event.Latitude,
      event.Longitude,
      context.WEATHER_API_KEY
    );
    message.body(text);
    message.media(image);
  } else if (body.includes("twilio")) {
    // If the message includes "twilio", send a message with the location of the
    // Twilio office in Melbourne.
    // Note that we use the REST API here so that we can set the
    // persistentAction parameter which is not supported in TwiML.
    const client = context.getTwilioClient();
    await client.messages.create({
      to: event.From,
      from: "whatsapp:+14155238886",
      body:
        "Come say hi at the Twilio Melbourne office when we all go back to work.",
      persistentAction: ["geo:-37.8146784,144.9636009|Twilio Melbourne"],
    });
  } else if (body.includes("picture")) {
    // If the message contains "picture" send back a picture of Alex
    message.body("Meet my friend Alex.");
    message.media("/alex.png");
  } else {
    // Otherwise send a formatted message.
    message.body(
      "_Thanks_ for coming to the WhatsApp webinar! Hope you learned a lot about **WhatsApp**."
    );
  }
  callback(null, twiml);
};
