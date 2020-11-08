import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "react-sidebar";
import { ToastContainer } from "react-toastify";

import firebase from "./firebase/firebase";
import Map from "./components/Map/Map";
import Header from "./common/components/Header/Header";
import SidebarContent from "./common/components/SidebarContent/SidebarContent";
import StoreList from "./components/StoreList/StoreList";
import OrderList from "./components/OrderList/OrderList";
import FormSection from "./common/components/FormSection/FormSection";
import * as classes from "./App.module.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormOpen: false,
      showStoreForm: false,
      showSideBar: true,
    };
  }

  openFormSectionHandler = (showStoreFormContent) => {
    if (showStoreFormContent) {
      this.setState({
        showStoreForm: true,
        isFormOpen: true,
      });
    } else {
      this.setState({
        showStoreForm: false,
        isFormOpen: true,
      });
    }
  };

  closeFormSectionHandler = () => {
    this.setState({
      isFormOpen: false,
    });
  };

  toggleSideBarHandler = () => {
    this.setState((prevState) => {
      return {
        showSideBar: !prevState.showSideBar,
      };
    });
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <ToastContainer />
        <Header toggleSideBar={this.toggleSideBarHandler} />
        <Sidebar
          sidebar={
            <SidebarContent
              formSectionHandler={this.openFormSectionHandler}
              closeFormSectionHandler={this.closeFormSectionHandler}
            />
          }
          docked={this.state.showSideBar}
          styles={{ sidebar: { background: "rgb(52, 58, 64)" } }}
          shadow={false}
        >
          <Sidebar
            pullRight
            sidebar={
              <FormSection
                showStoreForm={this.state.showStoreForm}
                formSectionHandler={this.closeFormSectionHandler}
                firebase={firebase}
              />
            }
            styles={{ sidebar: { background: "rgb(52, 58, 64)" } }}
            open={this.state.isFormOpen}
            shadow={false}
          >
            <Switch>
              <Route path="/map" component={Map} />
              <Route path="/stores" component={StoreList} />
              <Route path="/orders" component={OrderList} />
              <Redirect to="/map" />
            </Switch>
          </Sidebar>
        </Sidebar>
      </Fragment>
    );
  }
}

export default App;
