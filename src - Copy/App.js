import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddCategory from './page/admin/AddCategory';
import AddMember from './page/admin/AddMember';
import AllotIncome from './page/admin/AllotIncome';
import AdminHome from './page/admin/AdminHome';
import ViewExpense from './page/admin/ViewExpense';

import UserHome from './page/user/UserHome';
import AddExpense from './page/user/AddExpense'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import ExpLogin from './page/login/ExpLogin';
import ViewIncome from './page/user/ViewIncome';
import Logout from './page/login/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/admin" element={<AdminHome />}>
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-member" element={<AddMember />} />
            <Route path="allot-income" element={<AllotIncome />} />
            <Route path="view-expense" element={<ViewExpense />} />
          </Route>

    
          <Route path="/user" element={<UserHome />}>
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="view-income" element={<ViewIncome />} />
         
          </Route>
          <Route path="/" element={<ExpLogin />}>
          <Route path="/logout" element={<Logout />}></Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;