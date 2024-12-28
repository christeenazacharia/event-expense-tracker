import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AddExpense.css";

const AddExpense = () => {
  const [explist, setExpList] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    remarks: "",
  });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mem_name = params.get("mem_name"); // Get mem_id from URL

  // Fetch expense details for the specific mem_id
  const getExpenseDetails = (mem_name) => {
    if (!mem_name) {
      console.error("Member ID is not provided in the URL");
      return;
    }

    fetch(`http://localhost/expense_back/get_expense.php?mem_name=${mem_name}`)
      .then((result) => result.json())
      .then((responds) => {
        console.log("API Response:", responds);
        setExpList(responds); // Set the fetched expenses
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  };

  useEffect(() => {
    if (mem_name) {
      getExpenseDetails(mem_name);
    }
  }, [mem_name]);

  // Handle form submission to save new expense
  const saveExpense = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("date", formData.date);
    data.append("amount", formData.amount);
    data.append("remarks", formData.remarks);
    data.append("mem_name", mem_name);

    fetch("http://localhost/expense_back/save_expense.php", {
      method: "POST",
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        console.log("Save Response:", data);
        if (data.Status) {
          alert("Expense successfully saved");
          getExpenseDetails(mem_name); // Refresh the expense list
        } else {
          alert(data.Message);
        }
      });
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Expense List</h2>
          <div className="table-container flex-grow-1 overflow-auto">
          <table className="table table-bordered table-striped">
  <thead>
    <tr className="table-header">
      <th className="table-cell">Sl.No</th>
      <th className="table-cell">Date</th>
      <th className="table-cell">Amount</th>
      <th className="table-cell">Remarks</th>
    </tr>
  </thead>
  <tbody>
    {explist.map((item, index) => (
      <tr key={item.ed_id} className="table-row">
        <td className="table-cell">{index + 1}</td>
        <td className="table-cell">{item.ed_date}</td>
        <td className="table-cell">{item.ed_amount}</td>
        <td className="table-cell">{item.ed_remarks}</td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </div>

        {/* Right Side - Add New Expense Form */}
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Add Expense</h2>
          <form className="expense-form" onSubmit={saveExpense}>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                name="remarks"
                className="form-control"
                value={formData.remarks}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div class="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                      save</button>
                   
                  </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AddExpense;