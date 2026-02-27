// Load Products
async function loadProducts(){
const res = await fetch("/api/products");
const data = await res.json();

const container = document.getElementById("products");

data.forEach(p=>{
container.innerHTML += `
<div>
<h3>${p.name}</h3>
<p>Price: ₹${p.price}</p>
<p>Category: ${p.category}</p>
<hr>
</div>`;
});
}

loadProducts();

// Load Crops
async function loadCrops(){
const res = await fetch("/api/crops");
const data = await res.json();

const container = document.getElementById("cropContainer");

data.forEach(c=>{
container.innerHTML += `
<div>
<h3>${c.crop}</h3>
<p>Temperature: ${c.temperature}</p>
<p>Rainfall: ${c.rainfall}</p>
<p>Soil: ${c.soil}</p>
<p>Season: ${c.season}</p>
<hr>
</div>`;
});
}

loadCrops();

// AI Seed Upload
document.getElementById("seedForm")?.addEventListener("submit", async(e)=>{
e.preventDefault();
const formData = new FormData(e.target);

const res = await fetch("/api/products/check-seed",{
method:"POST",
body:formData
});

const data = await res.json();
document.getElementById("result").innerText = data.result;
});
async function getLocationWeather() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(`/api/weather/location/${lat}/${lon}`);
        const data = await res.json();

        document.getElementById("weatherResult").innerHTML = `
            <div class="weather-card">
                <h3>${data.city}</h3>
                <p>🌡 Temperature: ${data.temperature} °C</p>
                <p>💧 Humidity: ${data.humidity}%</p>
                <p>🌬 Wind: ${data.wind} m/s</p>
                <p>🌥 ${data.description}</p>
            </div>
        `;

    }, () => {
        alert("Please allow location access");
    });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    alert("Item Added to Cart 🛒");
}

function openCart() {
    document.getElementById("cartModal").style.display = "flex";
    renderCart();
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalSpan = document.getElementById("cartTotal");

    cartItemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>₹${item.price}</p>
                <div>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    totalSpan.innerText = total;
}

function changeQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function checkout() {
    alert("Order Placed Successfully ✅");
    cart = [];
    saveCart();
    renderCart();
}
const products = [
    {
        name: "Wheat Seeds",
        sellers: [
            { name: "Amazon", price: 520 },
            { name: "Flipkart", price: 499 },
            { name: "Local Supplier", price: 480 }
        ]
    },
    {
        name: "Rice Seeds",
        sellers: [
            { name: "Amazon", price: 610 },
            { name: "Flipkart", price: 590 },
            { name: "AgroStore", price: 575 }
        ]
    }
];
async function detectWeather() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(`/api/weather/location/${lat}/${lon}`);
        const data = await res.json();

        document.getElementById("weatherResult").innerHTML = `
            <div class="card">
                <h3>📍 ${data.city}</h3>
                <p>🌡 Temperature: ${data.temperature}°C</p>
                <p>💧 Humidity: ${data.humidity}%</p>
                <p>🌬 Wind Speed: ${data.wind} m/s</p>
                <p>🌥 ${data.description}</p>
            </div>
        `;

    }, () => {
        alert("Please allow location access.");
    });

}
async function getWeather() {
    const city = document.getElementById("city").value;

    const res = await fetch(`/api/weather/${city}`);
    const data = await res.json();

    const forecast = data.list.slice(0, 5);

    let output = `<h3>${data.city.name}</h3>`;

    forecast.forEach(item => {
        output += `
            <div class="forecast-card">
                <p><b>${new Date(item.dt_txt).toLocaleString()}</b></p>
                <p>🌡 Temp: ${item.main.temp} °C</p>
                <p>💧 Humidity: ${item.main.humidity}%</p>
                <p>🌥 ${item.weather[0].description}</p>
            </div>
        `;
    });

    document.getElementById("weatherResult").innerHTML = output;
}
