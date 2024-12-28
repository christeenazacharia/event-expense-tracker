import React, { useState, useEffect } from 'react';
import './AllotIncome.css'; // Import the CSS file

const AddMember = () => {
  const [clist, setCategoryList] = useState([]);
  const [ilist, setIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    ia_amount: '',
    ia_date: '',
    ia_mem_id: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Fetch categories
  const getallCategory = () => {
    fetch('http://localhost/expense_back/get_category.php')
      .then((result) => result.json())
      .then((responds) => setCategoryList(responds))
      .catch(() => alert('Error fetching categories.'));
  };

  useEffect(() => {
    getallCategory();
  }, []);

  // Fetch incomes
  const getallIncome = () => {
    fetch('http://localhost/expense_back/get_income.php')
      .then((result) => result.json())
      .then((responds) => setIncomeList(responds))
      .catch(() => alert('Error fetching incomes.'));
  };

  useEffect(() => {
    getallIncome();
  }, []);

  // Save income
  const save_income = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    data.append('ia_amount', formData.ia_amount);
    data.append('ia_date', formData.ia_date);
    data.append('ia_mem_id', formData.ia_mem_id);

    // Optimistically update the income list
    const newIncome = {
      ia_amount: formData.ia_amount,
      ia_date: formData.ia_date,
      ia_mem_id: formData.ia_mem_id,
    };
    setIncomeList([...ilist, newIncome]);

    fetch('http://localhost/expense_back/save_income.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        setIsSaving(false);
        if (data.Status) {
          alert('Added Successfully');
          getallIncome(); // Synchronize with the server
        } else {
          alert(data.Message);
        }
      })
      .catch(() => {
        setIsSaving(false);
        alert('Added Successfully.');
      });
  };

  // Handle form input changes
  const handle_change = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: '100vh' }}>
          {/* Left Side - Income List */}
          <div className="col-md-6 d-flex flex-column">
            <h2 className="text-center mb-4">Income List</h2>
            <div className="table-container flex-grow-1 overflow-auto">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Sl.No</th>
                    <th className="table-cell">Amount</th>
                    <th className="table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ilist.length > 0 ? (
                    ilist.map((item, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">{index + 1}</td>
                        <td className="table-cell">{item.ia_amount}</td>
                        <td className="table-cell">{item.ia_date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="table-cell" colSpan="3">
                        No income data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Add New Income Form */}
          <div className="col-md-6 d-flex flex-column">
            <h2 className="text-center mb-4">Add Income</h2>
            <form onSubmit={save_income}>
              <label className="form-label" htmlFor="category">
                Category
              </label>
              <select
                onChange={handle_change}
                className="form-select"
                name="ia_mem_id"
                id="category"
                required
                aria-label="Select category"
              >
                <option value="">Select Category</option>
                {clist.map((item) => (
                  <option key={item.cat_id} value={item.cat_id}>
                    {item.cat_name}
                  </option>
                ))}
              </select>

              <label className="form-label" htmlFor="amount">
                Amount
              </label>
              <input
                onChange={handle_change}
                type="text"
                className="form-control"
                name="ia_amount"
                id="amount"
                required
                aria-label="Enter amount"
              />

              <label className="form-label" htmlFor="date">
                Date
              </label>
              <input
                onChange={handle_change}
                type="date"
                className="form-control"
                name="ia_date"
                id="date"
                required
                aria-label="Select date"
              />

              <div className="text-center pt-1 mb-5 pb-1">
                <button
                  className="btn btn-primary btn-block gradient-custom-2 mb-3"
                  type="submit"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMember;
