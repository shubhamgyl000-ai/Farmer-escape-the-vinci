const router = require("express").Router();

router.get("/", (req,res)=>{
  res.json([
    {
      crop:"Wheat",
      temperature:"10°C - 25°C",
      rainfall:"50-100 cm",
      soil:"Loamy / Clay Loam",
      season:"Rabi"
    },
    {
      crop:"Rice",
      temperature:"20°C - 35°C",
      rainfall:"100-200 cm",
      soil:"Clayey Soil",
      season:"Kharif"
    },
    {
      crop:"Maize",
      temperature:"18°C - 27°C",
      rainfall:"50-100 cm",
      soil:"Fertile Loamy",
      season:"Kharif"
    },
    {
      crop:"Mustard",
      temperature:"10°C - 25°C",
      rainfall:"25-40 cm",
      soil:"Sandy Loam",
      season:"Rabi"
    }
  ]);
});

module.exports = router;
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