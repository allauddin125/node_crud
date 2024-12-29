import './App.css';
import Footer from './component/Footer';
import Nav from './component/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './component/SignUp';
import Privatecom from './component/Privatecomp'
import Login from './component/Login';
import Addproduct from './component/Addproduct';
import Productlist from './component/Productlist';
import Update from './component/Update';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Nav/>
       <Routes>
        <Route element={<Privatecom/>}>
        <Route path="/" element={<Productlist/>}/>
        <Route path="/add" element={<Addproduct/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        <Route path="/logout" element={<h1>sssss</h1>}/>
        <Route path="/profile" element={<h1>ddddd</h1>}/>
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
       </Routes>
     </BrowserRouter>
     <Footer/>
    </div>
  );
}

export default App;
