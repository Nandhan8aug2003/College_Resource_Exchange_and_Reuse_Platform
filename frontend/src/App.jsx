import { Routes, Route } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
}

export default App;