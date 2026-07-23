import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CoachList from './coachs/coachList';
import Applayout from './ui/Applayout';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CoachItem from './coachs/CoachItem';
import ModalWindow from './ui/ModalWindow';
import ScheduleMain from './schedule/ScheduleMain';

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
