import React, { Component } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import Topnav from "./components/navbar/topnav";
import Navbar from "./components/navbar/navbar";
import FooterContainer from "./components/footer/footerContainer";
import Authentication from "./components/auth/authentication";
import ContentFactory from "./components/contentFactory/contentFactory";
import Contact from "./components/contact/contact";

import Users from "./components/auth/users";
import ChangePassword from "./components/userAdmin/authentication";
import Home from "./components/home/home";
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App notranslate">
          <Helmet>
            <meta charset="utf-8" />
            <title>Schweiß Technik Akademie</title>
            <meta name="description" content="Schweiß Technik Akademie" />
            <link rel="canonical" href="https://st-akademie.de" />
          </Helmet>
          <Topnav />
          <Route>
            <Navbar />
          </Route>

          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/contact" component={Contact} /> 
              <Route path="/en/:link" component={ContentFactory} />
              <Route path="/de/:link" component={ContentFactory} />
              <Route path="/tr/:link" component={ContentFactory} />
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
