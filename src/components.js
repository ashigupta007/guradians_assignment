import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { validateInput } from "./validator";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";


// component for navigation buttons
export function NavigationButton(props){

    return <div className="navigationContainer">
            <Button
              onClick={() => {
                props.prevStep();
              }}
              variant="contained"
              disabled={props.activeStep === 0}
            >
              {" "}
              Previous
            </Button>
            <Button
              onClick={() => {
                props.nextStep();
              }}
              variant="contained"
              disabled={props.activeStep === 3}
            >
              Next{" "}
            </Button>
          </div>
}

// component for generating emergency contacts form

export function EmergencyContact() {
    let temp = [];
    for (let i = 0; i < this.props.value.length; i++) {
      temp.push(
        <TxtInput
          onChange={(e) => {
            var allContact = this.props.value;
            allContact[i] = e.target.value;
            this.props.getContacts(allContact);
          }}
          value={this.props.value[i]}
          title={"Emergency Contact " + (i + 1)}
          type="mobile_number"
          error_msg="Atleast 1 emergency mobile number must be provided and all numbers should be valid"
          key={i}
        />
      );
    }

    return (
      <div>
        <table className="formContainer">
          {temp.map((items) => {
            return items;
          })}
        </table>
        <div>
          <Button
            onClick={() => {
                this.props.add_new_contact()
            }}
          >
            Add more
          </Button>
        </div>
      </div>
    );
  }

//   component for text field and its label
export class TxtInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
    };
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>
          <TextField
            id="outlined-basic"
            label={this.props.title}
            variant="outlined"
            size="small"
            multiline={this.props.multiline}
            onChange={(e) => {
              this.props.onChange(e);
            }}
            onBlur={(e) => {
              this.setState({
                valid: validateInput(e.target.value, this.props.type),
              });
            }}
            className="singleLine_input"
            value={this.props.value}
          />
        </td>
        <td className="error_msg_container">
          {this.state.valid ? "" : this.props.error_msg}
        </td>
      </tr>
    );
  }
}
// returns single row of user info.
export function DisplayData(props) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.value}</td>
      <td>
        <IconButton
          onClick={() => {
            props.setCurrentStep(props.page_no);
          }}
        >
          <EditIcon />
        </IconButton>
      </td>
    </tr>
  );
}
