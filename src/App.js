import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListHospital from "./ListHospital";
import AddNewCustomer from "./AddCustomer";
// entry point of our app
// declared routes for the app. 

function App(){
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/addnew" element={<AddNewCustomer />} />
            <Route path="/" element={<ListHospital />} />
          </Routes>
        </Router>
      </div>
    );
  }

export default App;
