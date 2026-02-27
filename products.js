const router = require("express").Router();
const multer = require("multer");

let products = [
  {id:1, name:"Wheat Seeds", price:500, category:"Seeds"},
  {id:2, name:"Rice Seeds", price:600, category:"Seeds"},
  {id:3, name:"Organic Fertilizer", price:800, category:"Fertilizer"},
  {id:4, name:"Pesticide Spray", price:400, category:"Pesticide"}
];

const storage = multer.diskStorage({
  destination:"./uploads",
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});

const upload = multer({storage});

// Get Products
router.get("/", (req,res)=>{
  res.json(products);
});

// AI Seed Quality (Mock AI)
router.post("/check-seed", upload.single("seedImage"), (req,res)=>{
  const quality = Math.random() > 0.5 ?
    "🌾 High Quality Seed (Good Germination)" :
    "⚠ Low Quality Seed (Poor Germination)";
  
  res.json({result:quality});
});

module.exports = router;