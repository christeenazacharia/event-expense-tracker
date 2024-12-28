import React, { useState, useEffect } from 'react';
import './AddMember.css';

const AddMember = () => {
  const [mlist, setMemberList] = useState([]);
  const [clist, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({
    mem_id: '',
    mem_name: '',
    mem_add: '',
    mem_phn: '',
    mem_email: '',
    mem_class: '',
    fk_cat: '',
    mem_pass: '',
  });

  const getallCategory = () => {
    fetch('http://localhost/expense_back/get_category.php')
      .then((result) => result.json())
      .then((responds) => setCategoryList(responds));
  };

  useEffect(() => {
    getallCategory();
  }, []);

  const save_member = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    fetch('http://localhost/expense_back/save_member.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert('saved successfully');
          getallMember();
        } else {
          alert(data.Message);
        }
      });
  };

  const getallMember = () => {
    fetch('http://localhost/expense_back/get_member.php')
      .then((result) => result.json())
      .then((responds) => setMemberList(responds));
  };

  useEffect(() => {
    getallMember();
  }, []);

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
      <div className="row" style={{ height: "100vh" }}>
        
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Members List</h2>
          <div className="table-container flex-grow-1 overflow-auto">
          <table className="table table-bordered table-striped">
  <thead>
    <tr className="table-header">
      <th className="table-cell">Sl.No</th>
      <th className="table-cell">Name</th>
      <th className="table-cell">Address</th>
      <th className="table-cell">Class</th>
 
      <th className="table-cell">Phone</th>
      
      
    </tr>
  </thead>
  <tbody>
  
          {mlist.map((item, index) => (
      <tr key={index} className="table-row">
        <td className="table-cell">{index + 1}</td>
        <td className="table-cell">{item.mem_name}</td>
        <td className="table-cell">{item.mem_add}</td>
        <td className="table-cell">{item.mem_class}</td>
        
        <td className="table-cell">{item.mem_phn}</td>
       
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </div>

        {/* Right Side - Add New Expense Form */}
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Add Member</h2>
          <form onSubmit={save_member}>
          <label htmlFor="fk_cat" className="form-label">Category</label>
          <select
            onChange={handle_change}
            className="form-select"
            name="fk_cat"
            required
          >
            <option value="">Select Category</option>
            {clist.map((item) => (
              <option key={item.cat_id} value={item.cat_id}>
                {item.cat_name}
              </option>
            ))}
          </select>

          <label className="form-label">Name</label>
          <input
            onChange={handle_change}
            type="text"
            className="form-control"
            name="mem_name"
            required
          />

          <label className="form-label">Address</label>
          <input
            onChange={handle_change}
            type="text"
            className="form-control"
            name="mem_add"
            required
          />

          <label className="form-label">Phone</label>
          <input
            onChange={handle_change}
            type="text"
            className="form-control"
            name="mem_phn"
            required
          />

          <label className="form-label">Email</label>
          <input
            onChange={handle_change}
            type="email"
            className="form-control"
            name="mem_email"
          />

          <label className="form-label">Class</label>
          <input
            onChange={handle_change}
            type="text"
            className="form-control"
            name="mem_class"
            required
          />

          <label className="form-label">Password</label>
          <input
            onChange={handle_change}
            type="password"
            className="form-control"
            name="mem_pass"
            
          />

<div class="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">
                      save</button>
                   
                  </div>
        </form>

         
          
        </div>
        
      </div>
    </div>
















    
    </>
  );
};

export default AddMember;
