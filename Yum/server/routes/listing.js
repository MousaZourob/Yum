const {
  Client,
  defaultAxiosInstance,
} = require("@googlemaps/google-maps-services-js");
const router = require("express").Router();
const client = new Client({});

router.post("/location", (req, res) => {
  const location = req.body.post_code;
  let latLong = {};
  console.log("requested" + location);
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
    .then((response) => {
      console.log("Found data");
      console.log(response.data);
    });
});

module.exports = router;
