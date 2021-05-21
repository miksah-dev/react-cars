import {
  CREATE_CAR,
  RETRIEVE_CARS,
  UPDATE_CAR,
  DELETE_CAR,
  DELETE_ALL_CARS
} from "./types";

import CarDataService from "../services/car.service";

export const createCar = (brand, model, modelyear, color, chassis, doors) => async (dispatch) => {
  try {
    const res = await CarDataService.create({ brand, model, modelyear, color, chassis, doors });

    dispatch({
      type: CREATE_CAR,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveCars = () => async function (dispatch) {
  try {
    const res = await CarDataService.getAll();

    dispatch({
      type: RETRIEVE_CARS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const updateCar = (id, data) => async function (dispatch) {
  try {
    const res = await CarDataService.update(id, data);

    dispatch({
      type: UPDATE_CAR,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCar= (id) => async (dispatch) => {
  try {
    await CarDataService.delete(id);

    dispatch({
      type: DELETE_CAR,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllCars = () => async (dispatch) => {
  try {
    const res = await CarDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_CARS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findCarByBrand = (brand) => async (dispatch) => {
  try {
    console.log("find: ", brand)
    const res = await CarDataService.findByBrand(brand);

    dispatch({
      type: RETRIEVE_CARS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};