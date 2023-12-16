import './assets/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/"} element={<Homepage></Homepage>}></Route>
            <Route path={"/sign-up"} element={<SignUp></SignUp>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
