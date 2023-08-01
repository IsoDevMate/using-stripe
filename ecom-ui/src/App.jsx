import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Success } from "./transc-statuspages/success";
import { Cancel } from "./transc-statuspages/cancel";
import { StripePayment } from "./components/card";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<StripePayment />} />
        <Route path="/success" element={<Success /> } />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}
