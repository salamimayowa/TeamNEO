import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout.jsx';
import DriverScannerPage from './pages/DriverScannerPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MyTicketsPage from './pages/MyTicketsPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets" element={<MyTicketsPage />} />
        <Route path="/scanner" element={<DriverScannerPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
