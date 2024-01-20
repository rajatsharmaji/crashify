const Vendor = require("../../../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addVendor = async function (req, res) {
  const name = req.body.name;
  let email = req.body.email;
  email = email.toLowerCase();
  const address = req.body.address;
  const phone = req.body.phone;
  const zone = req.body.zone;
  const password = req.body.password;

  //console.log(name, email, phone);
  try {
    let vendor = await Vendor.findOne({
      email: email,
    });
    let vendor1 = await Vendor.findOne({
      phone: phone,
    });

    if (vendor || vendor1) {
      return res.status(401).json({
        msg: "Vendor Already Exists",
      });
    } else {
      vendor = new Vendor({
        name: name,
        email: email,
        address: address,
        phone: phone,
        zone: zone,
        password: password,
      });
      const salt = await bcrypt.genSalt(10);
      var hashpassword = await bcrypt.hash(password, salt);
      vendor.password = hashpassword;
      vendor
        .save()
        .then(() => {
          res.status(200).send({
            message: "Created Successfully",
            userData: {
              vendor,
            },
          });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  } catch (err) {
    //console.log(err.message);
    res.status(400).send("Error in Saving");
  }
};

const login = async function (req, res) {
  let { email, password } = req.body;
  email = email.toLowerCase();
  try {
    if (email) {
      var user = await Vendor.findOne({
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
      res.status(401).json({
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

const check = async function (req, res) {
  var userId;
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(" ")[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, "accessTokenSecret");
    } catch (e) {
      return res.status(401).send("unauthorized vendor");
    }
    userId = decoded.userId;
    //console.log(userId);
  } else {
    return res.status(401).send("unauthorized.Session expired");
  }

  let vendor;
  vendor = await Vendor.findById(userId);
  if (vendor != null) {
    res.status(200).send("true");
    return true;
  } else {
    res.status(401).send("false");
    return false;
  }
};
module.exports = {
  addVendor: addVendor,
  login: login,
  check: check,
};
