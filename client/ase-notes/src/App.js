import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUp from "./pages/SignUp";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
            <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        </Routes>
      </Router>
  );
}

export default App;