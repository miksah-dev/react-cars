import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCar, deleteCar } from "../actions/cars";
import CarDataService from "../services/car.service";

class Car extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeModelYear = this.onChangeModelYear.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeChassis = this.onChangeChassis.bind(this);
    this.onChangeDoors = this.onChangeDoors.bind(this);

    this.getCar = this.getCar.bind(this);
    // this.updateStatus = this.updateStatus.bind(this);
    this.updateCar = this.updateCar.bind(this);
    this.removeCar = this.removeCar.bind(this);

    this.state = {
      currentCar: {
        id: null,
        brand: "",
        model: "",
        modelyear: 0,
        color: "",
        chassis: "",
        doors: 0,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getCar(this.props.match.params.id);
  }

  onChangeBrand(e) {
    const brand = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCar: {
          ...prevState.currentCar,
          brand: brand,
        },
      };
    });
  }

  onChangeModel(e) {
    const model = e.target.value;

    this.setState((prevState) => ({
      currentCar: {
        ...prevState.currentCar,
        model: model,
      },
    }));
  }

  onChangeModelYear(e) {
    const modelyear = e.target.value;

    this.setState((prevState) => ({
      currentCar: {
        ...prevState.currentCar,
        modelyear: modelyear,
      },
    }));
  }

  onChangeColor(e) {
    const color = e.target.value;

    this.setState((prevState) => ({
      currentCar: {
        ...prevState.currentCar,
        color: color,
      },
    }));
  }

  onChangeChassis(e) {
    const chassis = e.target.value;

    this.setState((prevState) => ({
      currentCar: {
        ...prevState.currentCar,
        chassis: chassis,
      },
    }));
  }

  onChangeDoors(e) {
    const doors = e.target.value;

    this.setState((prevState) => ({
      currentCar: {
        ...prevState.currentCar,
        doors: doors,
      },
    }));
  }

  getCar(id) {
    CarDataService.get(id)
      .then((response) => {
        this.setState({
          currentCar: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  updateCar() {
    this.props
      .updateCar(this.state.currentCar.id, this.state.currentCar)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The car was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeCar() {
    this.props
      .deleteCar(this.state.currentCar.id)
      .then(() => {
        this.props.history.push("/cars");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCar } = this.state;

    return (
      <div>
        {currentCar ? (
          <div className="edit-form">
            <h4>Car</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={currentCar.brand}
                  onChange={this.onChangeBrand}
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentCar.model}
                  onChange={this.onChangeModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="modelyear">Title</label>
                <input
                  type="number"
                  className="form-control"
                  id="modelyear"
                  value={currentCar.modelyear}
                  onChange={this.onChangeModelYear}
                />
              </div>
              <div className="form-group">        
                <label htmlFor="color">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  value={currentCar.color}
                  onChange={this.onChangeColor}
                />  
              </div>        
              <div className="form-group">
                <label htmlFor="chassis">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="chassis"
                  value={currentCar.chassis}
                  onChange={this.onChangeChassis}
                />
              </div>
              <div className="form-group">
                <label htmlFor="doors">Title</label>
                <input
                  type="number"
                  className="form-control"
                  id="doors"
                  value={currentCar.doors}
                  onChange={this.onChangeDoors}
                />
              </div>
            </form>
  
            <button
              className="badge badge-danger mr-2"
              onClick={this.removeCar}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCar}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}       

export default connect(null, { updateCar, deleteCar })(Car);