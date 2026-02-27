const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];

router.post("/register", async(req,res)=>{
  const hashed = await bcrypt.hash(req.body.password,10);

  users.push({
    id: Date.now(),
    name:req.body.name,
    email:req.body.email,
    password:hashed
  });

  res.json({msg:"User Registered"});
});

router.post("/login", async(req,res)=>{
  const user = users.find(u=>u.email === req.body.email);
  if(!user) return res.status(400).json({msg:"User not found"});

  const valid = await bcrypt.compare(req.body.password,user.password);
  if(!valid) return res.status(400).json({msg:"Wrong password"});

  const token = jwt.sign({id:user.id},"secretkey",{expiresIn:"1d"});
  res.json({token});
});

module.exports = router;