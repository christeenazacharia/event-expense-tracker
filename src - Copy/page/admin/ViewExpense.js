import React, { useState, useEffect } from 'react';
import './ViewExpense.css';

const SearchExpense = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    fk_cat: '',
    start_date: '',
    end_date: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();

    fetch('http://localhost/expense_back/search_expense.php', {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status) {
          setResults(data.Data);
          setError('');
        } else {
          setResults([]);
          setError(data.Message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Something went wrong.');
      });
  };

  // Fetch categories to populate the category dropdown
  const getAllCategories = () => {
    fetch('http://localhost/expense_back/get_category.php')
      .then((result) => result.json())
      .then((responds) => {
        setCategoryList(responds);
      });
  };

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>

<div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">ExpenseList</h2>
          <div className="table-container flex-grow-1 overflow-auto">
          <table className="table table-bordered table-striped">
  <thead>
    <tr className="table-header">
      <th className="table-cell">Expense ID</th>
      <th className="table-cell">Date</th>
      <th className="table-cell">Amount</th>
      <th className="table-cell">Remarks</th>
    
    </tr>
  </thead>
  <tbody>
 
        {results.map((item, index) => (
      <tr key={index} className="table-row">
        <td className="table-cell">{item.ed_id}</td>
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
          <h2 className="text-center mb-4">Search expense</h2>
          <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            onChange={handleChange}
            className="form-select"
            name="fk_cat"
            required
          >
            <option value="">Select Category</option>
            {categoryList.map((item) => (
              <option key={item.cat_id} value={item.cat_id}>
                {item.cat_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div class="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                      Search</button>
                   
                  </div>
      </form>




         
          
        </div>
        
      </div>
    </div>





















   
    </>
  );
};

export default SearchExpense;
