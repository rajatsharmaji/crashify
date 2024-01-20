const express = require("express");
const User = require("../../../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async function (req, res) {
  const name = req.body.name;
  let email = req.body.email;
  email = email.toLowerCase();
  const address = req.body.address;
  const phone = req.body.phone;
  const zone = req.body.zone;
  const pincode = req.body.pincode;
  const password = req.body.password;
  //console.log(name, email, phone);
  try {
    let user = await User.findOne({
      email: email,
    });
    let user1 = await User.findOne({
      phone: phone,
    });
    if (user || user1) {
      res.status(401).json({
        msg: "User Already Exists",
      });
    } else {
      user = new User({
        name: name,
        email: email,
        address: address,
        phone: phone,
        zone: zone,
        pincode: pincode,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      var hashpassword = await bcrypt.hash(password, salt);
      user.password = hashpassword;
      user
        .save()
        .then(() => {
          res.status(200).send({
            message: "Created Successfully",
            userData: {
              user,
            },
          });
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

const login = async function (req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    if (email) {
      var user = await User.findOne({
        email: email,
      });
      if (!user) {
        return res.status(400).json({
          message: "User Does Not Exist",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect Password !",
        });
      }
      var accessToken = jwt.sign(
        { email: email, userId: user._id.toString() },
        "accessTokenSecret",
        { expiresIn: "1 days" }
      );
      user.jwtToken = accessToken;
      await user.save();
      res.status(200).json({
        message: "LoggedIn Successfully",
        accessToken: accessToken,
      });
    } else {
      res.status(500).json({
        message: "Incorrect Input",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  register: register,
  login: login,
};
