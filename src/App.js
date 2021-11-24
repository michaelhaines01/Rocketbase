import "./App.css";
import Header from "./components/header";
import CoinList from "./components/coinlist/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinDetail from "./components/coindetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<CoinList />}></Route>
        <Route exact path="/details/:id" element={<CoinDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
