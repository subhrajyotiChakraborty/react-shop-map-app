import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

import * as classes from "./SidebarContent.module.css";

const SidebarContent = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebarButton}>
        <Button
          block
          variant="outline-info"
          onClick={() => {
            props.closeSidebar();
            props.formSectionHandler(true);
          }}
        >
          Create Store
        </Button>
      </div>
      <div className={classes.sidebarButton}>
        <Button
          block
          variant="outline-info"
          onClick={() => {
            props.closeFormSectionHandler();
            props.closeSidebar();
            props.history.push("/stores");
          }}
        >
          View Stores
        </Button>
      </div>
      <div
        className={classes.sidebarButton}
        onClick={() => {
          props.closeSidebar();
          props.formSectionHandler(false);
        }}
      >
        <Button block variant="outline-info">
          Create Order
        </Button>
      </div>
      <div className={classes.sidebarButton}>
        <Button
          block
          variant="outline-info"
          onClick={() => {
            props.closeFormSectionHandler();
            props.closeSidebar();
            props.history.push("/orders");
          }}
        >
          View Orders
        </Button>
      </div>
    </div>
  );
};

export default withRouter(SidebarContent);
