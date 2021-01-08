const {
  Client,
  defaultAxiosInstance,
} = require("@googlemaps/google-maps-services-js");
const router = require("express").Router();
const client = new Client({});

router.post("/location", (req, res) => {
  const location = req.body.post_code;
  let latLong = {};
  client
    .geocode(
      {
        params: {
          components: "country:CA|postal_code:" + location,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000,
      },
      defaultAxiosInstance
    )
    .then((response) => res.send(response.data));
});

module.exports = router;
