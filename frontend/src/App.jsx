import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import CreateBill from "./pages/CreateBill";
import SavedBills from "./pages/SavedBills";
import ViewBill from "./pages/ViewBill";

// App = Navbar (always visible) + one page based on the URL
const App = () => {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBill />} />
          <Route path="/bills" element={<SavedBills />} />
          <Route path="/bill/:id" element={<ViewBill />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
