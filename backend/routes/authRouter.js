const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const users = require("../models/userModel");
const router = express.Router();
// const saltRounds = 10
const secretKey = process.env.SECRET_KEY

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.json({message:"All data is required"})
  }
  users.findOne({ email: email }).then((data) => {
    if(data){
      // bcrypt.hash(password,saltRounds, (err,hashPassword)=>{
        // bcrypt.compare(password, data.password, function (err, result) {
          // if(result){
          if(email == data.email && password == data.password){
            const payload = { id: data._id, email: data.email, role: data.role };
            const token = jwt.sign(payload, secretKey, { expiresIn: "1m" });
            localStorage.setItem("token",token)

            const dataStorage = localStorage.getItem('token');
            console.log(dataStorage);

            res.json({message:"Logged in",data,token})
          }else{
            res.json({message:"Password is incorrect."})
          }
        // });
      // })
    }else{
      res.json({message:"Account information not found"})
    }
  });
});

router.post("/register", (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, address, jobPosition, telephoneNumber, role, status, startDate, endDate } = req.body;
  if (!email || !password || !confirmPassword || !firstName || !lastName || !address || !jobPosition || !telephoneNumber || !role || !status || !startDate) {
    return res.json({ message: "All data is requied" });
  }
  if(password != confirmPassword){
    return res.json({ message: "Password no match" });
  }
  users.findOne({ email }).then((data)=>{
    if (data) {
      return res.json({ message: "This email already exists" });
    }else{
      // bcrypt.hash(password, saltRounds, (err, hashPasswordBuffer)=> {
      //   const hashPassword = hashPasswordBuffer.toString('utf8');
        users.create({ email, password, firstName, lastName, address, jobPosition, telephoneNumber, role, status, startDate, endDate }).then(() => {
          res.json({ message: "Create User success" });
        });
      // });
    }
  })
});

router.get("/logout", (req, res) => {

  // ลบข้อมูลจาก Local Storage
  localStorage.removeItem('token');

  // ล้างข้อมูลทั้งหมดใน Local Storage
  // localStorage.clear();

  res.json({ message: "Logged out" });
});

module.exports = router;
