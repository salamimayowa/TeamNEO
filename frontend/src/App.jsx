import { Navigate, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/CheckoutPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import DriverScannerPage from './pages/DriverScannerPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';
import TicketSuccessPage from './pages/TicketSuccessPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SeatMapPage from './pages/SeatMapPage.jsx';
import GetStartedPage from './pages/GetStartedPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<GetStartedPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/seat-map/:scheduleId" element={<SeatMapPage />} />
        <Route path="/ticket" element={<TicketSuccessPage />} />
        <Route path="/tickets" element={<MyTicketsPage />} />
        <Route path="/scanner" element={<DriverScannerPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;