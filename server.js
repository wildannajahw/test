const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.get("/photos", async (req, res) => {
    try {
        const { tags } = req.query;
        const response = await axios.get(
            "https://www.flickr.com/services/feeds/photos_public.gne",
            {
                params: {
                    format: "json",
                    nojsoncallback: 1,
                    tags,
                },
            }
        );
        res.send(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
});

const port = process.env.PORT || 3000; // Set default port to 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});