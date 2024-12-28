import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';  // Import Outlet
import { useLocation } from 'react-router-dom';
import illustration from '../../theme/assets/img/illustration.png';
import './UserHome.css'

const UserHome = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mem_name = params.get('mem_name');  // Get username from the URL

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  // Navigate to StaffCollection with username as query param
  const navigateToIncome = () => {
    navigate(`/user/view-income?mem_name=${mem_name}`);
    
  };
  const navigateToExpense = () => {
    navigate(`/user/add-expense?mem_name=${mem_name}`);
    
  };
  const navigateToLogout = () => {
    navigate(`/logout`);
    
  };
  return (
    <>
    
    
      <link href="../../theme/assets/img/favicon.png" rel="icon"/>
      <link href="../../theme/assets/img/apple-touch-icon.png" rel="apple-touch-icon"/>
    
      <link href="https://fonts.gstatic.com" rel="preconnect"/>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet"/>
    
    
      <link href="../../theme/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/quill/quill.snow.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/quill/quill.bubble.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
      <link href="../../theme/assets/vendor/simple-datatables/style.css" rel="stylesheet"/>
    
    
      <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                <div className="d-flex justify-content-center w-100">
                    <h className="navbar-brand" >Welcome {mem_name}</h>
                    </div>
                </div>
            </nav>

       
    
    
            <aside id="sidebar" class="sidebar">

<ul class="sidebar-nav" id="sidebar-nav">


<ul className="nav flex-column">
          
          <li className="nav-item">
            <button className="nav-link" onClick={navigateToExpense}>
              Expense
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={navigateToIncome}>
              Income
            </button>
          </li>
         
          <li className="nav-item">
            <button className="nav-link" onClick={navigateToLogout}>
              Logout
            </button>
          </li>
        </ul>
   
    
           
         
    
          
         
    
          
         
        </ul>
        

      </aside>
    
      <main id="main" class="main">
    
      
    
        <section class="section">
        <Outlet />
        </section>
    
      </main> 
    
    
      
    
      <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
    
     
      <script src="../../theme/assets/vendor/apexcharts/apexcharts.min.js"></script>
      <script src="../../theme/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="../../theme/assets/vendor/chart.js/chart.umd.js"></script>
      <script src="../../theme/assets/vendor/echarts/echarts.min.js"></script>
      <script src="../../theme/assets/vendor/quill/quill.js"></script>
      <script src="../../theme/assets/vendor/simple-datatables/simple-datatables.js"></script>
      <script src="../../theme/assets/vendor/tinymce/tinymce.min.js"></script>
      <script src="../../theme/assets/vendor/php-email-form/validate.js"></script>
    
      <script src="../../theme/assets/js/main.js"></script>
    
    
    </>
  );
};

export default UserHome;