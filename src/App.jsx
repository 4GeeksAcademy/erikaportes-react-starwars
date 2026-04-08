import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:type/:uid" element={<Details />} />
        </Routes>

      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;