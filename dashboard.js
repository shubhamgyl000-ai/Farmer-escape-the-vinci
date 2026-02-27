function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

function recommendCrop(temp) {
    if (temp > 30) return "Cotton 🌿";
    if (temp > 20) return "Wheat 🌾";
    return "Mustard 🌱";
}

async function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(async (pos) => {

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await fetch(`/api/weather/location/${lat}/${lon}`);
        const data = await res.json();

        document.getElementById("temp").innerText = data.temperature + "°C";
        document.getElementById("humidity").innerText = data.humidity + "%";

        const crop = recommendCrop(data.temperature);
        document.getElementById("crop").innerText = crop;

        document.getElementById("cropResult").innerHTML =
            `<div class="card">Best Crop Based on Weather: ${crop}</div>`;

    });
}