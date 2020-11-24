import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase/app";
import { Form, Row, Col, Button } from "react-bootstrap";

import * as classes from "../FormSection.module.css";
import * as actions from "../../../../store/actions";
import { showToast } from "../../../utils/toast";

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage:
        "https://image.flaticon.com/icons/png/512/1892/1892627.png",
      storeName: "",
      lat: 0,
      long: 0,
      imageUploadInProgress: false,
    };
  }

  selectImageHandler = (event) => {
    this.setState({
      imageUploadInProgress: true,
      selectedImage: "",
    });
    const me = this;
    const file = event.target.files[0];
    const bucketName = "images";
    const storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        // Observe state change events such as progress, pause, and resume
      },
      function (error) {
        // Handle unsuccessful uploads
        console.log(error);
        showToast(false, error.message);
        me.setState({
          imageUploadInProgress: false,
          selectedImage:
            "https://image.flaticon.com/icons/png/512/1892/1892627.png",
        });
      },
      function () {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("downloadURL => ", downloadURL);
          showToast(true, "Image uploaded successfully!!");
          me.setState({
            selectedImage: downloadURL,
            imageUploadInProgress: false,
          });
        });
      }
    );
  };

  createShopHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.state.imageUploadInProgress) {
      return;
    }
    const { storeName, lat, long } = this.state;
    if (!storeName.trim().length || lat === 0 || long === 0) {
      showToast(false, "All fields are required");
      return;
    }

    this.props.createShop({
      store_name: this.state.storeName,
      store_image: this.state.selectedImage,
      lat: this.state.lat,
      long: this.state.long,
    });
    this.resetForm();
  };

  inputChangeHandler = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: name === "lat" || name === "long" ? Number(value) : value,
    });
  };

  resetForm = () => {
    this.setState({
      selectedImage:
        "https://image.flaticon.com/icons/png/512/1892/1892627.png",
      storeName: "",
      lat: 0,
      long: 0,
    });
  };

  render() {
    return (
      <div className={classes.form}>
        <div
          className={[classes.storeImage]}
          style={{ backgroundImage: `url(${this.state.selectedImage})` }}
        >
          {this.state.imageUploadInProgress ? (
            <p className={classes.loadingText}>Loading...</p>
          ) : null}
        </div>
        <input
          type="file"
          name="store-image"
          id="store-image"
          accept="image/x-png,image/gif,image/jpeg"
          hidden
          onChange={this.selectImageHandler}
        />
        <p
          onClick={() => document.getElementById("store-image").click()}
          className={classes.uploadImageText}
        >
          Upload Image
        </p>
        <Form noValidate onSubmit={this.createShopHandler}>
          <Form.Group as={Row} controlId="formStoreName">
            <Form.Label column sm="4">
              <p className={classes.formLabel}>Store Name</p>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="name"
                name="storeName"
                value={this.state.storeName}
                onChange={this.inputChangeHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formLatitude">
            <Form.Label column sm="4">
              <p className={classes.formLabel}>Latitude</p>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="latitude"
                name="lat"
                value={this.state.lat}
                onChange={this.inputChangeHandler}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formLongitude">
            <Form.Label column sm="4">
              <p className={classes.formLabel}>Longitude</p>
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder="longitude"
                name="long"
                value={this.state.long}
                onChange={this.inputChangeHandler}
              />
            </Col>
          </Form.Group>
          <div className={classes.formButtonSection}>
            <Button
              disabled={this.state.imageUploadInProgress}
              type="submit"
              variant="outline-info"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.shops.loading,
    error: state.shops.error,
    shops: state.shops.shops,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createShop: (shopData) => dispatch(actions.createShop(shopData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreForm);
