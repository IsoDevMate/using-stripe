import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import { Success } from "./transc-statuspages/success";
import { Cancel } from "./transc-statuspages/cancel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/success" element={<Success /> } />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}
