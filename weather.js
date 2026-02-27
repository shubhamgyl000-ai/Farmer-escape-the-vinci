const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "YOUR_OPENWEATHER_API_KEY";

router.get("/:city", async (req, res) => {
    try {
        const city = req.params.city;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        res.json({
            city: weather.data.name,
            temperature: weather.data.main.temp,
            humidity: weather.data.main.humidity,
            wind: weather.data.wind.speed,
            condition: weather.data.weather[0].main,
            description: weather.data.weather[0].description
        });

    } catch (error) {
        res.status(500).json({ message: "City not found" });
    }
});

module.exports = router;
router.get("/location/:lat/:lon", async (req, res) => {
    try {
        const { lat, lon } = req.params;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        res.json({
            city: weather.data.name,
            temperature: weather.data.main.temp,
            humidity: weather.data.main.humidity,
            wind: weather.data.wind.speed,
            description: weather.data.weather[0].description
        });

    } catch (error) {
        res.status(500).json({ message: "Weather fetch failed" });
    }
});
router.get("/location/:lat/:lon", async (req, res) => {
    try {
        const { lat, lon } = req.params;

        const weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=metric`
        );

        res.json({
            city: weather.data.name,
            temperature: weather.data.main.temp,
            humidity: weather.data.main.humidity,
            wind: weather.data.wind.speed,
            description: weather.data.weather[0].description
        });

    } catch (error) {
        res.status(500).json({ message: "Weather fetch failed" });
    }
});
function recommendCrop(temp) {
    if (temp > 32) return "Cotton 🌿";
    if (temp > 22) return "Wheat 🌾";
    return "Mustard 🌱";
}
<p>🌱 Recommended Crop: ${recommendCrop(data.temperature)}</p>