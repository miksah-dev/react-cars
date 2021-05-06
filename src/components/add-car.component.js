import React, { Component } from "react";
import { connect } from "react-redux";
import { createCar } from "../actions/cars";

class AddCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeModelYear = this.onChangeModelYear.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeChassis = this.onChangeChassis.bind(this);
    this.onChangeDoors = this.onChangeDoors.bind(this);

    this.saveCar = this.saveCar.bind(this);
    this.newCar = this.newCar.bind(this);

    this.state = {
      id: null,
      brand: "",
      model: "",
      modelyear: 0,
      color: "",
      chassis: "",
      doors: 0,

      submitted: false,
    };
  }

  onChangeBrand(e) {
    this.setState({
      brand: e.target.value,
    });
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value,
    });
  }

  onChangeModelYear(e) {
      this.setState({
        modelyear: e.target.value,
      });
  }

  onChangeColor(e) {
      this.setState({
        color: e.target.value,
      });
  }

  onChangeChassis(e) {
      this.setState({
        chassis: e.target.value,
      });
  }

  onChangeDoors(e) {
      this.setState({
        doors: e.target.value,
      });
  }

  saveCar() {
      const { brand, model, modelyear, color, chassis, doors } = this.state;

      this.props
        .createCar(brand, model, modelyear, color, chassis, doors)
        .then((data) => {
            this.setState({
                id: data.id,
                brand: data.brand,
                model: data.model,
                modelyear: data.modelyear,
                color: data.color,
                chassis: data.chassis,
                doors: data.doors,

                submitted: true,
            });
            console.log(data);
        })
        /* catch possoble errors and log  */
        .catch((e) => {
            console.log(e);
        });
  }

  newCar() {
      this.setState({
          id: null,
          brand: "",
          model: "",
          modelyear: 0,
          color: "",
          chassis: "",
          doors: 0,
          published: false,

          submitted: false,
      })
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCar}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
                name="brand"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="modelyear">Model year</label>
              <input
                type="number"
                className="form-control"
                id="modelyear"
                required
                value={this.state.modelyear}
                onChange={this.onChangeModelYear}
                name="modelyear"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                className="form-control"
                id="color"
                required
                value={this.state.color}
                onChange={this.onChangeColor}
                name="color"
              />
            </div>

            <div className="form-group">
              <label htmlFor="chassis">Chassis</label>
              <input
                type="text"
                className="form-control"
                id="chassis"
                required
                value={this.state.chassis}
                onChange={this.onChangeChassis}
                name="chassis"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doors">Doors</label>
              <input
                type="number"
                className="form-control"
                id="doors"
                required
                value={this.state.doors}
                onChange={this.onChangeDoors}
                name="doors"
              />
            </div>

            <button onClick={this.saveCar} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createCar })(AddCar);