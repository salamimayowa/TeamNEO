import { Navigate, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import DriverScannerPage from './pages/DriverScannerPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';
import TicketSuccessPage from './pages/TicketSuccessPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/ticket" element={<TicketSuccessPage />} />
        <Route path="/tickets" element={<MyTicketsPage />} />
        <Route path="/scanner" element={<DriverScannerPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;