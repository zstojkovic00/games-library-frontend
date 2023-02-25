import './App.css';
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/home"
import Login from "./pages/login"
import Join from "./pages/join"
import { Route, Routes} from "react-router-dom";
import GameDisplay from "./pages/GameDisplay";
import MyGames from "./pages/MyGames"
import Settings from "./pages/Settings";
import Publishers from "./pages/Publishers";
import PublishDisplay from "./pages/PublishDisplay";

function App() {



  return (
    <div className="App">
      <Navbar/>
        <div className="container">
           <Routes >
               <Route path="/" element={<Home/>} />
               <Route path="games/:id" element={<GameDisplay />} />
                <Route path="/settings" element={<Settings />} />
               <Route path="/publishers" element={<Publishers />} />
               <Route path="/publisher/:id" element={<PublishDisplay />} />
               <Route path="/login" element={<Login/>} />
               <Route path="/join" element={<Join/>} />
               <Route path="/my-games" element={<MyGames/>} />

           </Routes>
        </div>
    </div>
  );
}

export default App;
