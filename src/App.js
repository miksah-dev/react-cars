import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCar from "./components/add-car.component";
import Car from "./components/car.component";
import CarsList from "./components/cars-list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/cars"} className="navbar-brand">
            Miksah
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cars"} className="nav-link">
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cars"]} component={CarsList} />
            <Route exact path="/add" component={AddCar} />
            <Route path="/cars/:id" component={Car} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;