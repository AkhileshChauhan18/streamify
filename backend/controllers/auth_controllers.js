const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const signin = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    function valid(email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
    if (!valid(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    const newuser = await userModel.create({
      fullname,
      email,
      password,
    });
    if (!newuser) {
      return res.status(500).json({ error: "Failed to create user" });
    }
    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(201).json({ success: true, user: newuser});
    return res
      .status(201)
      .json({ message: "User created successfully", user: newuser });
  } catch (err) {
    console.error("Error in signin:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
 try{
  if(!email || !password) {
    res.status(400).json({error :"ALL FIELDS ARE REQUIRED"})

  }
  const requset_user= await userModel.findOne({email});
  if(!requset_user){
     res.status(401).json({error :"Invalid username "})
  }
  const isPassword = await requset_user.matchPassword(password);
  if(!isPassword){
    res.status(401).json({error:" password"})
  }
  
  const token = jwt.sign({userid:requset_user._id},process.env.JWT_SECRET_KEY,{
    expiresIn :"7d"
  })

  res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(201).json({ success: true, user: requset_user });
  
 }catch(err){
  res.status(500).json({error : "Internal server error"})
  console.log(err);
 }
};

const signout = async (req, res) => {
  res.clearCookie("token");
  res.status(400).json({success:true,message:"User signed out successfully"});
};
module.exports = {
  signin,
  login,
  signout,
};
