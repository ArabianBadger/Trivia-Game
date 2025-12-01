import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import AddQuestion from "./components/AddQuestion";
import EditQuestion from "./components/EditQuestion";
import Play from "./pages/Play";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<AddQuestion />} />
        <Route path="/admin/edit/:id" element={<EditQuestion />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
