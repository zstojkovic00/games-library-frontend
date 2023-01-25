import './App.css';
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home"
import Login from "./pages/login"
import Join from "./pages/join"
import { Route, Routes} from "react-router-dom";
import GameDisplay from "./pages/GameDisplay";

function App() {



  return (
    <div className="App">
      <Navbar/>
        <div className="container">
           <Routes >
               <Route path="/" element={<Home/>} />
               <Route path="game/:id" element={<GameDisplay />} />
               <Route path="/login" element={<Login/>} />
               <Route path="/join" element={<Join/>} />
           </Routes>
        </div>
    </div>
  );
}

export default App;
