import React, { useEffect, useState } from 'react';
import './AddCategory.css';

const AddCategory = () => {
  const [clist, setCategoryList] = useState([]);
  const [formData, setFormData] = useState({ cname: '' });

  const getallCategory = () => {
    fetch('http://localhost/expense_back/get_category.php')
      .then((result) => result.json())
      .then((responds) => {
        setCategoryList(responds);
      });
  };

  useEffect(() => {
    getallCategory();
  }, []);

  const save_category = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('cname', formData.cname);
    fetch('http://localhost/expense_back/save_category.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert('saved successfully');
          getallCategory();
        } else {
          alert(data.Message);
        }
      });
  };

  const handle_change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const delete_category = (cid) => {
    const data = new FormData();
    data.append('cid', cid);
    fetch('http://localhost/expense_back/delete_category.php', {
      method: 'POST',
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert('Deleted');
          getallCategory();
        } else {
          alert(data.Message);
        }
      });
  };

  return (
    <>
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Category List</h2>
          <div className="table-container flex-grow-1 overflow-auto">
          <table className="table table-bordered table-striped">
  <thead>
    <tr className="table-header2">
      <th className="table-cell">Sl.No</th>
      <th className="table-cell">Category</th>
      <th className="table-cell">Action</th>
      
    </tr>
  </thead>
  <tbody>
  
                  {clist.map((item, index) => (
      <tr key={index} className="table-row">
        <td className="table-cell">{index + 1}</td>
        <td className="table-cell">{item.cat_name}</td>
        
        <td className="table-cell"><button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            onClick={() => delete_category(item.cat_id)}
                        
                          >
                            Delete
                          </button></td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </div>

        {/* Right Side - Add New Expense Form */}
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Add Category</h2>

          <form className="row g-3" onSubmit={save_category}>
              <div className="col-auto">
                <label htmlFor="cname" className="form-label">
                  Category Name
                </label>
              </div>
              <div className="col-auto">
                <input
                  onChange={handle_change}
                  type="text"
                  name="cname"
                  value={formData.cname}
                  className="form-control"
                  required
                />
              </div>
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

export default AddCategory;
