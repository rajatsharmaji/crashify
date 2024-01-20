import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";
import classes from "./OrderCard.module.css";

const SocialCard = ({ userData }) => {
  const [color, setColor] = useState("primary");
  const [buttonText, setbuttonText] = useState("Available");

  function lockButtonClicked() {
    if (!userData.owner) {
      // Handle the case where userData.owner is null or undefined
      return;
    }

    if (buttonText === "Available") {
      Axios.patch(
        "https://tapwaste.herokuapp.com/posts/updateOrders",
        {
          id: userData._id,
          acquired: false,
        },
        {}
      )
        .then((response) => {
          if (response.status === 202) {
            alert("Order Updated!!");
            setColor("success");
            setbuttonText("Acquired");
          } else if (response.status === 401) {
            alert("Unable to update!");
          }
        })
        .catch((err) => {
          // Handle the error
          console.error(err);
        });
    } else {
      Axios.patch(
        "https://tapwaste.herokuapp.com/posts/updateOrders",
        {
          id: userData._id,
          acquired: true,
        },
        {}
      ).then((response) => {
        if (response.status === 202) {
          alert("Order Updated!!");
          setColor("primary");
          setbuttonText("Available");
        } else if (response.status === 401) {
          alert("Unable to update");
        }
      });
    }
  }

  return (
    <div className={classes.card}>
      <div className={classes.cardtitle}>
        {userData.owner ? userData.owner.name.toUpperCase() : "Unknown Owner"}
      </div>
      <div className={classes.cardbody}>
        <div className={classes.location}>
          <p>Address : {userData.owner ? userData.owner.address.toUpperCase() : "Unknown Address"}</p>
          <p>Pincode : {userData.owner ? userData.owner.pincode : "Unknown Pincode"}</p>
        </div>
        <div className={classes.phoneNumber}>
          <p>Mobile No. : {userData.owner ? userData.owner.phone : "Unknown Phone"}</p>
        </div>
        <p>Estimate Amount : Rs. {userData.amount}</p>
        <Button variant={color} onClick={lockButtonClicked}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SocialCard;
