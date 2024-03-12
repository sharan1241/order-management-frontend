import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Homepage from "./Homepage";
import ItemPage from "./ItemPage";
import CartPage from './CartPage';
import Login from './Login';
import Register from './Register';
import BillsPage from './BillsPage';
import CustomerPage from './CustomerPage';
import { message } from 'antd';

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Routes>
          < Route path="/" element={
        <ProtectedRoute>
           <Homepage/>
        </ProtectedRoute>
        }/>
        <Route path="/items" element={
        <ProtectedRoute>
          <ItemPage/>
        </ProtectedRoute>
        }/>
        <Route path="/cart" element={
        <ProtectedRoute>
          <CartPage/>
        </ProtectedRoute>
        }/>
        <Route path="/bills" element={
        <ProtectedRoute>
          <BillsPage/>
        </ProtectedRoute>
        }/>
        <Route path="/customers" element={
        <ProtectedRoute>
          <CustomerPage/>
        </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}