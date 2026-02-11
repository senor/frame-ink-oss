import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardPage from '../views/DashboardPage/DashboardPage';
import StyleGuide from '../views/StyleGuide';
import { GlobalFilters } from '../components/ui/GlobalFilters';

export default function App() {
  return (
    <>
      <GlobalFilters />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
