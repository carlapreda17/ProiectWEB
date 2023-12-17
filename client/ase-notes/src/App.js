import './assets/App.css';
import './assets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/"} element={<Homepage/>}></Route>
            <Route path={"/sign-up"} element={<SignUp/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={'/main-page'} element={<MainPage/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
