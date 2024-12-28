import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ExpLogin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import illustration from '../../theme/assets/img/illustration.png';

function ExpLogin() {
    const [formData, setFormData] = useState({
        mem_name: '',
        mem_pass: ''
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checklogin = (e) => {
        e.preventDefault();

        if (!formData.mem_name || !formData.mem_pass) {
            alert("Please fill in all fields!");
            return;
        }

        const data = new FormData();
        data.append("mem_name", formData.mem_name);
        data.append("mem_pass", formData.mem_pass);

        setLoading(true);

        fetch('http://localhost/expense_back/get_login.php', {
            method: "POST",
            body: data
        })
            .then((response) => {
                if (!response.ok) throw new Error("Server Error");
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                if (data.Status === "true") {
                    if (data.Role === "admin") {
                        navigate('/admin');
                    } else {
                        navigate(`/user?mem_name=${formData.mem_name}`);
                    }
                } else {
                    alert(data.Message || "Invalid login credentials!");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
         <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                <div className="d-flex justify-content-center w-100">
                    <h className="navbar-brand" href="/">Daksh 2024</h>
                    </div>
                </div>
            </nav>
          
        <div className="container-fluid login-container">
            {/* Navbar */}
            

          
            
            <section class="h-100 gradient-form" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6">
              <div class="card-body p-md-5 mx-md-4">

                
                <form onSubmit={checklogin}>
                

                  <div data-mdb-input-init class="form-outline mb-4">
                  <p class="login-heading">Please login to your account</p>
                  <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="mem_name"
                                    placeholder="Enter your username"
                                    value={formData.mem_name}
                                    onChange={handleChange}
                                    required
                                />
                    <label class="form-label" for="form2Example11">Username</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                  <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="mem_pass"
                                    placeholder="Enter your password"
                                    value={formData.mem_pass}
                                    onChange={handleChange}
                                    required
                                />
                    <label class="form-label" for="form2Example22">Password</label>
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Log
                      in</button>
                   
                  </div>

                 

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
              <img src={illustration} alt="Illustration" className="img-fluid illustration-img" />

                <h4 class="mb-4">EXPENSE TRACKER</h4>
                <p class="small-h">The Daksh Expense Tracker is  designed to help manage and track all the financial aspects of the Daksh college fest. Whether it’s managing the budget for events, tracking expenses for food stalls, or keeping a record of various purchases and incomes, this app simplifies the entire process. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        </div>
        </>
    );
}

export default ExpLogin;
