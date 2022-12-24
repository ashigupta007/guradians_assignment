import React from "react";

// imports for material ui components, used for beautification only
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";

// helper functions and css defined locally
import { getObjectFromCSV, sortTable } from "./helper";
import "./App.css";

// main class for show the list of the hospitals
class HospitalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospital_list: [], //contains original parsed data
      table_data: [], // contains data that is shown in the real time, may be different in case of searching
      search_text: "",
      headers: [],
      sortBy: "", // contains which column is selected for sorting
    };
  }
  componentDidMount = () => {
    // reading and parsing data returned from papaParse in helper.js
    let data = new Promise(function (resolve, reject) {
      resolve(getObjectFromCSV());
    });
    data.then((res) => {
      this.setState({
        hospital_list: res,
        headers: Object.keys(res[0]),
        table_data: res,
      });
    });
  };

  //  function for  searching of table
  searchHospital = (search_value) => {
    if (search_value.length > 0) {
      let filtered_data = this.state.hospital_list.filter((items) => {
        if (items["Name"].toLowerCase().includes(search_value.toLowerCase())) 
          return items;
        return false
      });
      this.setState({
        search_text: search_value,
        table_data: filtered_data,
      });
    } else {
      this.setState({
        table_data: this.state.hospital_list,
        search_text: search_value,
      });
    }
  };
  //  function for  sorting table
  sortColumn = (column) => {
    let sorting_order =
      this.state.sortBy === column ? "descending" : "ascending";
    let sorting_by = this.state.sortBy === column ? "" : column;
    this.setState({
      table_data: sortTable(column, sorting_order, this.state.table_data),
      sortBy: sorting_by,
    });
  };

  render() {
    return (
      <div>
        <div className="stickyHeader">
          <TextField
            type="text"
            placeholder="Search By Name or City"
            value={this.state.search_text}
            onChange={(e) => {
              this.searchHospital(e.target.value);
            }}
            size="small"
          />

          <Link to="/addnew">Got an Emergency?</Link>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name{" "}
                  <IconButton
                    onClick={() => {
                      this.sortColumn("Name");
                    }}
                  >
                    <SortByAlphaIcon />
                  </IconButton>
                </TableCell>
                <TableCell>Addrss</TableCell>
                <TableCell>Lat</TableCell>
                <TableCell>Lng</TableCell>
                <TableCell>
                  Area{" "}
                  <IconButton
                    onClick={() => {
                      this.sortColumn("Area");
                    }}
                  >
                    <SortByAlphaIcon />
                  </IconButton>
                </TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.table_data.map((items) => {
                return (
                  <TableRow>
                    <TableCell>{items["Name"]}</TableCell>
                    <TableCell>{items["Address"]}</TableCell>
                    <TableCell>{items["Lat"]}</TableCell>
                    <TableCell>{items["Lng"]}</TableCell>
                    <TableCell>{items["Area"]} </TableCell>
                    <TableCell>{items["Type"]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default HospitalList;
