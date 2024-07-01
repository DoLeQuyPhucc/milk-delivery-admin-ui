import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for ReactToastify

function App() {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ top: '1rem', left: '1rem' }}
      />
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
