import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './AddExpense.css'
const ViewIncome = () => {
  const [incomeList, setIncomeList] = useState([]); // State to store income data
  const [error, setError] = useState(null); // State to store error messages, if any

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mem_name = params.get("mem_name"); // Get mem_name from URL

  // Fetch income details for the specific mem_name
  const getIncomeDetails = (mem_name) => {
    if (!mem_name) {
      console.error("Member name is not provided in the URL");
      setError("Member name is missing. Please provide a valid member name.");
      return;
    }

    fetch(`http://localhost/expense_back/get_income_user.php?mem_name=${mem_name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === false) {
          setError(data.message); // Handle backend error messages
          setIncomeList([]); // Reset the income list
        } else {
          setIncomeList(data); // Set the fetched incomes
          setError(null); // Clear any existing error
        }
      })
      .catch((error) => {
        console.error("Error fetching incomes:", error);
        setError("Failed to fetch income data. Please try again later.");
      });
  };

  useEffect(() => {
    if (mem_name) {
      getIncomeDetails(mem_name);
    }
  }, [mem_name]);

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        {/* Income List Table */}
        <div className="col-md-12 d-flex flex-column">
          <h2 className="text-center mb-4">Income List</h2>

          {/* Show Error Message if Exists */}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="table-container flex-grow-1 overflow-auto">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Render Income Rows */}
                {incomeList.length > 0 ? (
                  incomeList.map((item, index) => (
                    <tr key={item.ia_id}>
                      <td>{index + 1}</td>
                      <td>{item.ia_date}</td>
                      <td>{item.ia_amount}</td>
                    </tr>
                  ))
                ) : (
                  !error && (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No income data available
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewIncome;
