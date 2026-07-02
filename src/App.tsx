import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Game from "@/pages/Game";
import GameOver from "@/pages/GameOver";
import Collection from "@/pages/Collection";
import Shop from "@/pages/Shop";
import Leaderboard from "@/pages/Leaderboard";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="w-full h-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/gameover" element={<GameOver />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}
