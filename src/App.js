import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoinList from "./components/CoinList/";
import CoinDetails from "./components/CoinDetails";
import CoinTrending from "./components/CoinTrending";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/rocketbase" element={<CoinList />}></Route>
          <Route exact path="/details/:id" element={<CoinDetails />}></Route>
          <Route exact path="/trending" element={<CoinTrending />}></Route>
          <Route exact path="/error" element={<Error />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
