import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Topnav from "./components/navbar/topnav";
import Navbar from "./components/navbar/navbar";
import FooterContainer from "./components/footer/footerContainer";
import Authentication from "./components/auth/authentication";
import ContentFactory from "./components/contentFactory/contentFactory";
import Contact from "./components/contact/contact";
import Certificates from "./components/contentFactory/certificates";
import Users from "./components/auth/users";
import ChangePassword from "./components/userAdmin/authentication";
import Home from "./components/home/home";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Helmet>
            <meta charset="utf-8" />
            <title>Schweiss Technic Academie</title>
            <meta name="description" content="Schweiss Technic Academie" />
            <link rel="canonical" href="" />
          </Helmet>
          <Topnav />
          <Route>
            <Navbar />
          </Route>

          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/link/contact" component={Contact} />
              <Route exact path="/link/certificates" component={Certificates} />
              <Route path="/link/:link" component={ContentFactory} />
              <Route path="/admin" component={Authentication} />
              <Route path="/users" component={Users} />
              <Route path="/changepassword" component={ChangePassword} />
            </Switch>
          </main>

          <FooterContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
