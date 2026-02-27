const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/crops", require("./routes/crops"));

app.listen(5000, ()=>console.log("🚀 Server running on port 5000"));
const weatherRoute = require("./routes/weather");
app.use("/api/weather", weatherRoute);
function displayProducts() {
    const container = document.querySelector(".products");
    container.innerHTML = "";

    products.forEach(product => {

        const cheapest = product.sellers.reduce((min, seller) =>
            seller.price < min.price ? seller : min
        );

        let sellerList = "";

        product.sellers.forEach(seller => {
            const highlight = seller.price === cheapest.price ? "cheapest" : "";

            sellerList += `
                <div class="${highlight}">
                    ${seller.name} - ₹${seller.price}
                </div>
            `;
        });

        container.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <div>${sellerList}</div>
                <h4 style="color:#00ff88;">Best Price: ₹${cheapest.price}</h4>
                <button class="btn" onclick="addToCart('${product.name}', ${cheapest.price})">
                    Buy at Lowest Price
                </button>
            </div>
        `;
    });
}

displayProducts();