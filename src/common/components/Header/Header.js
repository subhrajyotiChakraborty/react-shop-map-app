import React, { Component } from "react";
import { withRouter } from "react-router";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import * as classes from "./Header.module.css";

class Header extends Component {
  render() {
    // console.log(this.props);
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand>
          <FontAwesomeIcon
            onClick={this.props.toggleSideBar}
            icon={faBars}
            className={classes.threeBarMenuIcon}
          />
          <p
            onClick={() => this.props.history.push("/map")}
            className={classes.appName}
          >
            AppName
          </p>
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default withRouter(Header);
