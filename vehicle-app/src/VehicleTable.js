import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

class VehicleTable extends Component {
    state = {
        showModal: false,
        adding: false,

        errorMessage: '',

        editedCar: null,

        newLicensePlate: "",
        newMileage: "",
        newModel: "",

        cars: [],
    };

    enableEditMode = id => {
        this.setState({
            errorMessage: '',
            showModal: true,
            adding: false,
            editedCar: id,
            newMileage: this.state.cars[id].mileage,
            newLicensePlate: this.state.cars[id].licensePlate,
            newModel: this.state.cars[id].model,
        });
    };

    componentDidMount() {
        this.loadCars();
    }

    loadCars = () => {
        axios
            .get('https://localhost:44382/api/cars')
            .then(response => {
                this.setState({ cars: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    deleteCarHandler = id => {
        axios
            .delete("https://localhost:44382/api/cars/" + id.toString())
            .then(response => {
                this.loadCars();
            })
            .catch(error => {
                console.log(error);
            });
    };

    editCarHandler = () => {
        axios
            .put("https://localhost:44382/api/cars" + this.state.editedCar, {
                model: this.state.newModel,
                licensePlate: this.state.newLicensePlate,
                mileage: +this.state.newMileage
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                this.setState({errorMessage: 'shit!'});
            });
        this.loadCars();
    };

    enableAdding = () => {
        this.setState({
            errorMessage: '',
            newCode: null,
            newMileage: null,
            newLicensePlate: null,
            newModel: null,
            showModal: false,
            adding: true,
        });
    };

    addCarHandler = () => {
        axios.post('https://localhost:44382/api/cars', {
            model: this.state.newModel,
            licensePlate: this.state.newLicensePlate,
            mileage: +this.state.newMileage
        })
            .then(response => {
                console.log(response);
            })
            .catch(error=> {
                this.setState({errorMessage: 'shit!'});
            })
    };

    render() {
        const vehicles = this.state.cars.map(car => {
            return (
                <Row
                    key={car.code}
                    style={{
                        backgroundColor: "lightBlue",
                        margin: "2px",
                        borderRadius: "5px",
                        padding: "10px",
                    }}
                >
                    <Col>{car.code}</Col>
                    <Col>{car.model}</Col>
                    <Col>{car.licensePlates}</Col>
                    <Col>{car.mileage}</Col>
                    <Col>
                        <button
                            style={{ margin: "0px 10px", borderRadius: "10px" }}
                            onClick={() => this.enableEditMode(car.code)}
                        >
                            Edit
                        </button>
                        <button
                            style={{ margin: "0px 10px", borderRadius: "10px" }}
                            onClick={() => this.deleteCarHandler(car.code)}
                        >
                            Delete
                        </button>
                    </Col>
                </Row>
            );
        });

        return (
            <div style={{ textAlign: "center" }}>
                <button
                    style={{ margin: "20px auto", borderRadius: "10px" }}
                    onClick={this.enableAdding}
                >
                    Add New
                </button>
                {this.state.showModal ? (
                    <div
                        style={{
                            padding: "20px",
                            position: "fixed",
                            top: "30%",
                            left: "42%",
                            textAlign: "center",
                            borderRadius: "20px",
                            border: "1px solid red",
                            backgroundColor: "white",
                            zIndex: "100",
                        }}
                    >
                        <input
                            placeholder="model"
                            value={this.state.newModel}
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newModel: event.target.value });
                            }}
                        />
                        <input
                            placeholder="plate"
                            value={this.state.newLicensePlate}
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newLicensePlate: event.target.value });
                            }}
                        />
                        <input
                            placeholder="mileage"
                            value={this.state.newMileage}
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newMileage: event.target.value });
                            }}
                        />
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onClick={this.editCarHandler}
                        >
                            Submit
                        </button>
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onClick={() => this.setState({ showModal: false })}
                        >
                            Cancel
                        </button>
                        <p style = {{color: 'red'}}>{this.state.errorMessage}</p>
                    </div>
                ) : null}

                {this.state.adding ? (
                    <div
                        style={{
                            padding: "20px",
                            position: "fixed",
                            top: "30%",
                            left: "42%",
                            textAlign: "center",
                            borderRadius: "20px",
                            border: "1px solid red",
                            backgroundColor: "white",
                            zIndex: "100",
                        }}
                    >
                        <input
                            placeholder="model"
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newModel: event.target.value });
                            }}
                        />
                        <input
                            placeholder="plate"
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newLicensePlate: event.target.value });
                            }}
                        />
                        <input
                            placeholder="mileage"
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newMileage: event.target.value });
                            }}
                        />
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onClick={this.addCarHandler}
                        >
                            Add
                        </button>
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onClick={() => this.setState({ adding: false })}
                        >
                            Cancel
                        </button>
                        <p style = {{color: 'red'}}>{this.state.errorMessage}</p>
                    </div>
                ) : null}
                <Container className="container-fluid">{vehicles}</Container>
            </div>
        );
    }
}

export default VehicleTable;
