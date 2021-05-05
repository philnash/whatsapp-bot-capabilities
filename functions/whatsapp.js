const got = require("got");
const client = got.extend({
  prefixUrl: "https://api.foursquare.com/v2",
  responseType: "json",
});

// Get nearby businesses from the Yelp API
const getNearbyPlaces = async (lat, long, clientId, clientSecret) => {
  const response = await client.get("venues/search", {
    searchParams: {
      ll: `${lat},${long}`,
      categoryId: "4d4b7105d754a06374d81259",
      client_id: clientId,
      client_secret: clientSecret,
      v: "20210504",
      radius: 1000,
    },
  });
  const venues = response.body.response.venues;
  if (venues.length === 0) {
    return {
      text: "Sorry, couldn't find anywhere near you.",
    };
  }
  const place =
    response.body.response.venues[
      Math.floor(Math.random() * response.body.response.venues.length)
    ];
  const placeDetailsResponse = await client.get(`venues/${place.id}`, {
    searchParams: {
      client_id: clientId,
      client_secret: clientSecret,
      v: "20210504",
    },
  });
  const placeDetails = placeDetailsResponse.body.response.venue;
  let text = place.name;
  text += placeDetails.url ? `\nUrl: ${placeDetails.url}` : "";
  text += placeDetails.rating ? `\nRating: ${placeDetails.rating}` : "";
  text +=
    place.categories.length > 0
      ? `\nCategories: ${place.categories.map((c) => c.name).join(", ")}`
      : "";
  return {
    text,
    image: `${placeDetails.bestPhoto.prefix}300${placeDetails.bestPhoto.suffix}`,
    name: placeDetails.name,
    location: placeDetails.location,
  };
};

exports.handler = async (context, event, callback) => {
  const twiml = new Twilio.twiml.MessagingResponse();
  const message = twiml.message();
  const body = event.Body.toLowerCase();
  if (body.includes("contact")) {
    // If the message includes "contact" send a VCard with contact details
    message.media("/vcard.vcf");
  } else if (event.Latitude && event.Longitude) {
    // If the message is a location message, use the FourSquare API to get a
    // nearby restaurant.
    const { text, image, name, location } = await getNearbyPlaces(
      event.Latitude,
      event.Longitude,
      context.FOURSQUARE_ID,
      context.FOURSQUARE_SECRET
    );
    message.body(text);
    if (image) {
      message.media(image);
      const client = context.getTwilioClient();
      await client.messages.create({
        to: event.From,
        from: "whatsapp:+14155238886",
        body: name,
        persistentAction: `geo:${location.lat},${location.lng}|${name}`,
      });
    }
  } else if (body.includes("picture")) {
    // If the message contains "picture" send back a picture of Alex
    message.body("Meet my friend Alex.");
    message.media("/alex.png");
  } else {
    // Otherwise send a formatted message.
    message.body(
      "_Thanks_ for coming to the WhatsApp webinar! Hope you learned a lot about *WhatsApp*."
    );
  }
  callback(null, twiml);
};
