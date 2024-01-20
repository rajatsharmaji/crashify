import React, { Component } from "react";
import { Container, Image, Row, Button } from "react-bootstrap";
import Axios from "axios";

import classes from "./Cart.module.css";
import ProductControl from "../components/ProductControl";

import NewsImg from "../assets/images/news.png";
import BoxImg from "../assets/images/box.png";
import BookImg from "../assets/images/study.png";
import PlasticImg from "../assets/images/plastic.png";
import AluImg from "../assets/images/pressure-cooker.png";
import AcImg from "../assets/images/air-conditioner.png";
import FridgeImg from "../assets/images/refrigerator.png";
import WashingImg from "../assets/images/notification.png";
import BatteryImg from "../assets/images/starter.png";
import EwasteImg from "../assets/images/iphone.png";
import CaseImg from "../assets/images/cpu.png";
import LcdImg from "../assets/images/lcd.png";

const PRODUCT_PRICES = {
  paper: 6,
  cardboard: 8,
  books: 5,
  plastic: 7,
  aluminium: 50,
  ac: 1000,
  fridge: 500,
  washingmachine: 700,
  battery: 100,
  ewaste: 70,
  cpu: 1200,
  lcd: 700,
};

const productTypes = {
  paper: "paper",
  cardboard: "cardboard",
  books: "books",
  plastic: "plastic",
  aluminium: "aluminium",
  ac: "ac",
  fridge: "fridge",
  washingmachine: "washingmachine",
  battery: "battery",
  ewaste: "ewaste",
  cpu: "cpu",
  lcd: "lcd",
};

const token = sessionStorage.getItem("btoken");
// const token = localStorage.getItem("btoken");

class CartPage extends Component {
  state = {
    products: {
      paper: 0,
      cardboard: 0,
      books: 0,
      plastic: 0,
      aluminium: 0,
      ac: 0,
      fridge: 0,
      washingmachine: 0,
      battery: 0,
      ewaste: 0,
      cpu: 0,
      lcd: 0,
    },
    estimatedPrice: 0,
  };

  // database logic
  //write here

  addProductHandler = (type) => {
    const oldCount = this.state.products[type];
    const newCount = oldCount + 1;
    const updatedProducts = {
      ...this.state.products,
    };
    updatedProducts[type] = newCount;
    const priceAddition = PRODUCT_PRICES[type];
    const oldPrice = this.state.estimatedPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ estimatedPrice: newPrice, products: updatedProducts });
  };

  removeProductHandler = (type) => {
    const oldCount = this.state.products[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedProducts = {
      ...this.state.products,
    };
    updatedProducts[type] = newCount;
    const priceDeduction = PRODUCT_PRICES[type];
    const oldPrice = this.state.estimatedPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ estimatedPrice: newPrice, products: updatedProducts });
  };

  handleButtonClick = (event) => {
    event.preventDefault();
    if (!token) {
      alert("Please Login to place an order!!");
      return;
    }
    if (this.state.estimatedPrice <= 100) {
      alert("Order value must be greater than 100.");
      return;
    }
    Axios.post(
      "http://localhost:5000/posts/addOrder",
      {
        amount: this.state.estimatedPrice,
        acquired: false,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Order Placed!!");
        } else {
          alert("Please Login to place an order!!");
        }
      })
      .catch((err) => {
        alert("Please Login as a User to place an order");
      });
  };

  render() {
    const disableInfo = {
      ...this.state.products,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <div>
        <Container className={classes.imgForCart}>
          <Row
            id="services"
            className="d-flex justify-content-center text-center"
          >
            <h2 className={classes.head}>Add what you want to sell!!</h2>
          </Row>

          <Row className="d-flex justify-content-center">
            <div className="item col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Newspaper</h5>
              <h5>(in kg)</h5>
              <Image src={NewsImg} />
              <ProductControl
                disabled={disableInfo["paper"]}
                number={this.state.products.paper}
                productAdded={() => this.addProductHandler(productTypes.paper)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.paper)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>CardBoard</h5>
              <h5>(in kg)</h5>
              <Image src={BoxImg} />
              <ProductControl
                disabled={disableInfo["cardboard"]}
                number={this.state.products.cardboard}
                productAdded={() =>
                  this.addProductHandler(productTypes.cardboard)
                }
                productRemoved={() =>
                  this.removeProductHandler(productTypes.cardboard)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Books</h5>
              <h5>(in kg)</h5>
              <Image src={BookImg} />
              <ProductControl
                disabled={disableInfo["books"]}
                number={this.state.products.books}
                productAdded={() => this.addProductHandler(productTypes.books)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.books)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center">
              <h5 className={classes.itemHead}>Mixed Plastic</h5>
              <h5>(in kg)</h5>
              <Image src={PlasticImg} />
              <ProductControl
                disabled={disableInfo["plastic"]}
                number={this.state.products.plastic}
                productAdded={() =>
                  this.addProductHandler(productTypes.plastic)
                }
                productRemoved={() =>
                  this.removeProductHandler(productTypes.plastic)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Aluminium</h5>
              <h5>(in kg)</h5>
              <Image src={AluImg} />
              <ProductControl
                disabled={disableInfo["aluminium"]}
                number={this.state.products.aluminium}
                productAdded={() =>
                  this.addProductHandler(productTypes.aluminium)
                }
                productRemoved={() =>
                  this.removeProductHandler(productTypes.aluminium)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>AC</h5>
              <h5>(in units)</h5>
              <Image src={AcImg} />
              <ProductControl
                disabled={disableInfo["ac"]}
                number={this.state.products.ac}
                productAdded={() => this.addProductHandler(productTypes.ac)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.ac)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Refrigerator</h5>
              <h5>(in units)</h5>
              <Image src={FridgeImg} />
              <ProductControl
                disabled={disableInfo["fridge"]}
                number={this.state.products.fridge}
                productAdded={() => this.addProductHandler(productTypes.fridge)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.fridge)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Washing Machine</h5>
              <h5>(in units)</h5>
              <Image src={WashingImg} />
              <ProductControl
                disabled={disableInfo["washingmachine"]}
                number={this.state.products.washingmachine}
                productAdded={() =>
                  this.addProductHandler(productTypes.washingmachine)
                }
                productRemoved={() =>
                  this.removeProductHandler(productTypes.washingmachine)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>Battery</h5>
              <h5>(in units)</h5>
              <Image src={BatteryImg} />
              <ProductControl
                disabled={disableInfo["battery"]}
                number={this.state.products.battery}
                productAdded={() =>
                  this.addProductHandler(productTypes.battery)
                }
                productRemoved={() =>
                  this.removeProductHandler(productTypes.battery)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>E-Waste</h5>
              <h5>(in kg)</h5>
              <Image src={EwasteImg} />
              <ProductControl
                disabled={disableInfo["ewaste"]}
                number={this.state.products.ewaste}
                productAdded={() => this.addProductHandler(productTypes.ewaste)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.ewaste)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>CPU</h5>
              <h5>(in units)</h5>
              <Image src={CaseImg} />
              <ProductControl
                disabled={disableInfo["cpu"]}
                number={this.state.products.cpu}
                productAdded={() => this.addProductHandler(productTypes.cpu)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.cpu)
                }
              />
            </div>

            <div className="col-lg-4 col-md-6 text-center mb-5">
              <h5 className={classes.itemHead}>LCD-LED</h5>
              <h5>(in units)</h5>
              <Image src={LcdImg} />
              <ProductControl
                disabled={disableInfo["lcd"]}
                number={this.state.products.lcd}
                productAdded={() => this.addProductHandler(productTypes.lcd)}
                productRemoved={() =>
                  this.removeProductHandler(productTypes.lcd)
                }
              />
            </div>
          </Row>
          <div className="col text-center mb-5">
            <h1>Estimated Price is: ₹ {this.state.estimatedPrice}</h1>
          </div>

          <div className="col text-center mb-4">
            <Button
              href="/"
              variant="success"
              size="lg"
              onClick={this.handleButtonClick}
            >
              Place Order
            </Button>
          </div>
          <Row id="footer" className="d-flex justify-content-center mt-5">
            <i
              className="social-icon fab fa-facebook-f"
              style={{ marginRight: 20, color: "green" }}
            >
              {" "}
            </i>
            <i
              className="social-icon fab fa-twitter"
              style={{ marginRight: 20, color: "green" }}
            >
              {" "}
            </i>
            <i
              className="social-icon fab fa-instagram"
              style={{ marginRight: 20, color: "green" }}
            >
              {" "}
            </i>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CartPage;
