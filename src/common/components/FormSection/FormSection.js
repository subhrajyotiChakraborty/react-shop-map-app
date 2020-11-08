import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import StoreForm from "./StoreForm/StoreForm";
import OrderForm from "./OrderForm/OrderForm";
import * as classes from "./FormSection.module.css";

class FormSection extends Component {
  render() {
    return (
      <div className={classes.formSectionWrapper}>
        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          className={classes.crossBtnIcon}
          onClick={this.props.formSectionHandler}
        />
        {this.props.showStoreForm ? (
          <StoreForm firebase={this.props.firebase} />
        ) : (
          <OrderForm />
        )}
      </div>
    );
  }
}

export default FormSection;
