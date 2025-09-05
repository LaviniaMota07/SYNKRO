import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Title from "./components/Title";
import Menu from "./components/Menu";
//import Options from "./components/Options";
//import SongSelect from "./components/SongSelect";
//import Gameplay from "./components/GamePlay";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Title />

        <Routes>
          <Route path="/" element={<Menu />} />
          {/*<Route path="/options" element={<Options />} />
          <Route path="/songselect" element={<SongSelect />} />
          <Route path="/gameplay" element={<Gameplay />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;