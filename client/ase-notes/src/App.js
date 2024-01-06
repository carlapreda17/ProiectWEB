import './assets/App.css';
import './assets/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import MainPage from "./pages/MainPage";
import TextNote from "./pages/TextNote";
import PaginaMaterie from "./pages/PaginaMaterie";
function App() {
  return (
    <Router>
        <Routes>
            <Route path={"/"} element={<Homepage/>}></Route>
            <Route path={"/sign-up"} element={<SignUp/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={'/main-page'} element={<MainPage/>}></Route>
            <Route path={'/text-note'} element={<TextNote/>}></Route>
            <Route path="/materie/:id_materie" element={<PaginaMaterie />} />
        </Routes>
    </Router>
  );
}

export default App;
