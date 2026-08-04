import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoachList from './coachs/CoachList';
import Applayout from './ui/Applayout';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CoachItem from './coachs/CoachItem';
import ModalWindow from './ui/ModalWindow';
import ScheduleMain from './schedule/ScheduleMain';
import ButtonToTop from './ui/ButtonToTop';
import LoginForm from '../src/Auth/LoginForm';
import ProtectRoute from '../src/Auth/ProtectRoute';
import Dashboard from './admin/Dashboard';
import SetPassword from './Auth/setPassword';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route element={<Applayout />}>
          <Route path="/" element={<CoachList />} />
          <Route path="/coach/:id" element={<CoachItem />} />
          <Route path="/shedule" element={<ScheduleMain />} />
        </Route>
        <Route path="/staff-entry-x8z2" element={<LoginForm />} />
        <Route
          path="/staff-admin-x2z8"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/coach/:id"
            element={
              <ModalWindow>
                <CoachItem />
              </ModalWindow>
            }
          />
        </Routes>
      )}
    </>
  );
}

function App() {
  const [isInviteFlow, setIsInviteFlow] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('type=invite') || hash.includes('type=recovery')) {
      setIsInviteFlow(true);
    }
  }, []);

  if (isInviteFlow) {
    return <SetPassword />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <ButtonToTop />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
