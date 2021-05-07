import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveCars, findCarByBrand, deleteAllCars } from "../actions/cars";

class CarsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBrand = this.onChangeSearchBrand.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.findCarByBrand = this.findCarByBrand.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);

    this.state = {
      currentCar: null,
      currentIndex: -1,
      searchBrand: "",
    };
  }

  componentDidMount() {
    this.props.retrieveCars();
  }

  onChangeSearchBrand(e) {
    const searchBrand = e.target.value;

    this.setState({
      searchBrand: searchBrand,
    });
  }

  refreshData() {
    this.setState({
      currentCar: null,
      currentIndex: -1,
    });
  }

  setActiveCar(car, index) {
    this.setState({
      currentCar: car,
      currentIndex: index,
    });
  }
 removeAllCars() {
    this.props
      .deleteAllCars()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findCarByBrand() {
    this.refreshData();

    this.props.findCarByBrand(this.state.searchBrand);
  }
    
  render() {
    const { searchBrand, currentCar, currentIndex } = this.state;
    const { cars } = this.props;
    
    return (
      <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by brand"
                  value={searchBrand}
                  onChange={this.onChangeSearchBrand}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.findCarByBrand}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          <div className="col-md-6">
            <h4>Cars List</h4>
          
          <ul className="list-group">
            {cars.map((car, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCar(car, index)}
                  key={index}
                >
                  {car.brand}
                </li>
              ))}
          </ul>

      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={this.removeAllCars}
      >
      Remove All
      </button>

      </div>
        <div className="col-md-6">
          {currentCar ? (
            <div>
              <h4>Car</h4>
              <div>
                <label>
                  <strong>Brand:</strong>
                </label>{" "}
                {currentCar.brand}
              </div>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentCar.model}
              </div>
              <div>
                <label>
                  <strong>Model year:</strong>
                </label>{" "}
                {currentCar.modelyear}
              </div>
              <div>
                <label>
                  <strong>Color:</strong>
                </label>{" "}
                {currentCar.color}
              </div>
              <div>
                <label>
                  <strong>Chassis:</strong>
                </label>{" "}
                {currentCar.chassis}
              </div>
              <div>
                <label>
                  <strong>Doors:</strong>
                </label>{" "}
                {currentCar.doors}
              </div>

              <Link
                to={"/cars/" + currentCar.id}
                type="button"
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Car...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars,
  };
};

export default connect(mapStateToProps, { retrieveCars, findCarByBrand, deleteAllCars })(CarsList);
