import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

class VehicleTable extends Component {
    state = {
        showModal: false,
        adding: false,

        editedCar: null,

        newCode: "",
        newLicensePlate: "",
        newMileage: "",
        newModel: "",

        cars: [
            {
                code: "aaaaaa",
                licensePlate: "aa1111ss",
                mileage: 123,
                model: "model",
            },
            {
                code: "bbbbbb",
                licensePlate: "aa1111ss",
                mileage: 123,
                model: "model",
            },
            {
                code: "cccccc",
                licensePlate: "aa1111ss",
                mileage: 123,
                model: "model",
            },
        ],
    };

    enableEditMode = id => {
        this.setState({
            showModal: true,
            adding: false,
            editedCar: id,
            newCode: this.state.cars[id].code,
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
            .get()
            .then(response => {
                this.setState({ cars: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    deleteCarHandler = id => {
        axios
            .delete("" + id.toString())
            .then(response => {
                this.loadCars();
            })
            .catch(error => {
                console.log(error);
            });
    };

    editCarHandler = () => {
        axios
            .post("", {})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.loadCars();
    };

    enableAdding = () => {
        this.setState({
            newCode: null,
            newMileage: null,
            newLicensePlate: null,
            newModel: null,
            showModal: false,
            adding: true,
        });
    };

    addCarHandler = () => {};

    render() {
        const vehicles = this.state.cars.map((car, index) => {
            return (
                <Row
                    key={index}
                    style={{
                        backgroundColor: "lightBlue",
                        margin: "2px",
                        borderRadius: "5px",
                        padding: "10px",
                    }}
                >
                    <Col>{car.model}</Col>
                    <Col>{car.code}</Col>
                    <Col>{car.licensePlate}</Col>
                    <Col>{car.mileage}</Col>
                    <Col>
                        <button
                            style={{ margin: "0px 10px", borderRadius: "10px" }}
                            onClick={() => this.enableEditMode(index)}
                        >
                            Edit
                        </button>
                        <button
                            style={{ margin: "0px 10px", borderRadius: "10px" }}
                            onClick={() => this.deleteCarHandler(index)}
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
                            left: "40%",
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
                        <input
                            placeholder="code"
                            value={this.state.newCode}
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newCode: event.target.value });
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
                    </div>
                ) : null}

                {this.state.adding ? (
                    <div
                        style={{
                            padding: "20px",
                            position: "fixed",
                            top: "30%",
                            left: "40%",
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
                        <input
                            placeholder="code"
                            type="text"
                            style={{ display: "block", margin: "10px" }}
                            onChange={event => {
                                this.setState({ newCode: event.target.value });
                            }}
                        />
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onCick={this.addCarHandler}
                        >
                            Add
                        </button>
                        <button
                            style={{ margin: "5px", borderRadius: "5px" }}
                            onClick={() => this.setState({ adding: false })}
                        >
                            Cancel
                        </button>
                    </div>
                ) : null}
                <Container className="container-fluid">{vehicles}</Container>
            </div>
        );
    }
}

export default VehicleTable;
