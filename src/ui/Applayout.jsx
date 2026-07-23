import { Outlet } from 'react-router-dom';
import Header from './Header';
import FilterOperations from './FilterOperations';

function Applayout() {
  return (
    <div className="grid gap-8 bg-mist-50">
      <Header />
      <FilterOperations />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Applayout;
