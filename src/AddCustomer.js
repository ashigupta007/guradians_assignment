import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Navigate, Link } from "react-router-dom";
import { validateInput } from "./validator";
import {NavigationButton, EmergencyContact,TxtInput, DisplayData } from "./components"


// component for adding new customer.
class AddNewCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      name: "",
      email: "",
      phone_num: "",
      allergies: "",
      curr_medication: "",
      medical_condition: "",
      emergency_contacts: [""],
      redirect: false,
      show_navigation_btn: true,
    };
  }
  componentDidMount = () => {
    // checking if previously data was being saved. if so then hide navigation buttons and show save button
    let user_data = localStorage.getItem("userInfo");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      let req_key = [
        "name",
        "email",
        "phone_num",
        "allergies",
        "curr_medication",
        "medical_condition",
        "emergency_contacts",
      ];
      let flag = true;
      for (let items of req_key) {
        if (user_data[items] === undefined) {
          flag = false;
        }
      }
      if (flag) {
        this.setState({ activeStep: 3, ...user_data, show_navigation_btn : false });
      }
    }
  };

    // fucntion for going to next step
    // it first checks the validation for current page inputs, if everything is okay then it moves to next step
  nextStep = () => {
    if (this.state.activeStep < 4) {
      if (this.state.activeStep === 0) {
        // for validation of inputs
        if (
          !(
            // validate function returns true if it is valid. taked two input : value to be checked, 
            // and type of the value i.e. name or mobile number
            validateInput(this.state.name, "name") &&
            validateInput(this.state.email, "email") &&
            validateInput(this.state.phone_num, "mobile_number")
          )
        ) {
            // using alert box for informing if validation is not correct
          window.alert("All fields are mandatory");
          return;
        }
      } else if (this.state.activeStep === 1) {
        if (
          !(
            validateInput(this.state.allergies, "text") &&
            validateInput(this.state.curr_medication, "text") &&
            validateInput(this.state.medical_condition, "text")
          )
        ) {
             // using alert box for informing if validation is not correct
          window.alert("All fields are mandatory");
          return;
        }
      } else if (this.state.activeStep === 2) {
        if (this.state.emergency_contacts.length > 0) {
          if (
            !this.state.emergency_contacts.reduce((acc, curr) => {
              acc = acc && validateInput(curr, "mobile_number");
              return acc;
            }, true)
          ) {
             // using alert box for informing if validation is not correct
            window.alert("All fields are mandatory");
            return;
          }
        }
      }

      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };
//   function for going to previous step.
  prevStep = () => {
    if (this.state.activeStep !== 0) {
      this.setState({ activeStep: this.state.activeStep - 1 });
    }
  };
// used to seetCurrent step in case of user wants to edit some details
  setCurrentStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };
//   function for saving user data
  saveDetails = () => {
    let userDetails = { ...this.state };
    delete userDetails["activeStep"];
    delete userDetails["redirect"];
    window.localStorage.setItem("userInfo", JSON.stringify(userDetails));
    this.setState({ redirect: true });
  };

  render() {
    return this.state.redirect ? (
      <Navigate to="/" />
    ) : (
      <div>
        <div className="stickyHeader">
          <Link to="/">Go Back</Link>
        </div>

        <Paper elevation={2} className="paper-w50">
          <div className="stepContainer">
            {/* step starts here */}

            {/* this is the first step accepting name, email and mobile number */}
            {this.state.activeStep === 0 ? (
              <div>
                <table className="formContainer">
                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        name: e.target.value,
                      });
                    }}
                    value={this.state.name}
                    title="Name"
                    type="name"
                    error_msg="Name must contain First Name and Last Name"
                  />
                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        email: e.target.value,
                      });
                    }}
                    value={this.state.email}
                    title="Email"
                    type="email"
                    error_msg="Email is not valid"
                  />
                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        phone_num: e.target.value,
                      });
                    }}
                    value={this.state.phone_num}
                    title="Phone No."
                    type="mobile_number"
                    error_msg="Mobile number should be of 10 digits and contain no space"
                  />
                </table>
              </div>
            ) : (
              ""
            )}
            {/* this is the second step accepting allergies, current medication and current situations or symptoms */}
            {this.state.activeStep === 1 ? (
              <div>
                <table className="formContainer">
                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        allergies: e.target.value,
                      });
                    }}
                    value={this.state.allergies}
                    title="Allergies"
                    type="text"
                    error_msg="Allergies must be provided"
                    multiline={true}
                  />
                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        curr_medication: e.target.value,
                      });
                    }}
                    value={this.state.curr_medication}
                    title="Current Medication"
                    type="text"
                    error_msg="Current Medication must be provided"
                    multiline={true}
                  />

                  <TxtInput
                    onChange={(e) => {
                      this.setState({
                        medical_condition: e.target.value,
                      });
                    }}
                    value={this.state.medical_condition}
                    title="Medical Condition"
                    type="text"
                    error_msg="Medical Condition must be provided"
                    multiline={true}
                  />
                </table>
              </div>
            ) : (
              ""
            )}
        {/* third step accepting thr emmergency contacts. component declared in components.js */}
            {this.state.activeStep === 2 ? (
              <EmergencyContact
                getContacts={(contacts) => {
                  this.setState({ emergency_contacts: contacts });
                }}
                onBlur={(e) => {
                  this.validateInput(e.target.value, "mobile_number");
                }}
                value={this.state.emergency_contacts}
                add_new_contact = {()=>{
                    this.setState({
                        emergency_contacts : [...this.state.emergency_contacts, ""]
                    })
                }}
              />
            ) : (
              ""
            )}
        {/* last step showing all the data and user can changes any input if it is incorrect */}
            {this.state.activeStep === 3 ? (
              <div>
                <table className="formContainer">
                    {/* returns a single row, component declared in comoponents.js */}
                  <DisplayData
                    title="Name"
                    value={this.state.name}
                    setCurrentStep={this.setCurrentStep}
                    page_no={0}
                  />
                  <DisplayData
                    title="Email"
                    value={this.state.email}
                    setCurrentStep={this.setCurrentStep}
                    page_no={0}
                  />
                  <DisplayData
                    title="Phone Number"
                    value={this.state.phone_num}
                    setCurrentStep={this.setCurrentStep}
                    page_no={0}
                  />
                  <DisplayData
                    title="Allergies"
                    value={this.state.allergies}
                    setCurrentStep={this.setCurrentStep}
                    page_no={1}
                  />
                  <DisplayData
                    title="Current Medication"
                    value={this.state.curr_medication}
                    setCurrentStep={this.setCurrentStep}
                    page_no={1}
                  />
                  <DisplayData
                    title="Medical Condition"
                    value={this.state.medical_condition}
                    setCurrentStep={this.setCurrentStep}
                    page_no={1}
                  />
                  <DisplayData
                    title="Emergency Contact"
                    value={this.state.emergency_contacts.map((items) => {
                      return <p key={items}>{items}</p>;
                    })}
                    setCurrentStep={this.setCurrentStep}
                    page_no={2}
                  />
                </table>
                {this.state.show_navigation_btn ? (
                  <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    this.saveDetails();
                  }}
                >
                  Save
                </Button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </Paper>
        {/* navigation buttons or save button is here */}
        {this.state.show_navigation_btn ? (
            <NavigationButton prevStep={this.prevStep} nextStep ={this.nextStep} activeStep ={this.state.activeStep}/>
          
        ) : (
            <div className="flexContainer">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                this.saveDetails();
              }}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default AddNewCustomer;