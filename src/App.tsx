import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListGroup from "./components/ListGroup";
import ArtPage from "./components/ArtPage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<ListGroup heading={"Gallery"} />} />
          <Route path="art" element={<ArtPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
