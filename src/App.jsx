import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProtectedRoute } from './components/features/ProtectedRoute';

import { useAuth } from './recoil/useAuth';

import Header from './components/layouts/header';
import Footer from './components/layouts/footer';
import ScrollToTop from './components/features/scrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Attraction from './pages/attractionPage/attractionPage';
import Dining from './pages/dining/diningPage';
import Events from './pages/events/eventPage';
import { Login, SignUp } from './pages/auth';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import Dashboard from './admin/dashboard';
import DataForm from './admin/dataForm';
import AttractionDetail from './pages/attractionPage/detailsPage';
import DiningDetail from './pages/dining/detailsPage';
import EventDetail from './pages/events/detailPage';

import { RecoilRoot } from 'recoil';

const router = [
  { path: '/', element: <Home /> },
  { path: '/attractions', element: <Attraction /> },
  { path: '/attractions/:slug', element: <AttractionDetail /> },
  { path: '/dining', element: <Dining /> },
  { path: '/dining/:slug', element: <DiningDetail /> },
  { path: '/events', element: <Events /> },
  { path: '/events/:slug', element: <EventDetail /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '*', element: <NotFound /> },
  { path: '/profile', element: <Profile /> },
  { path: '/search', element: <SearchResults /> },
];

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const AdminLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
        />
        <Routes>
          {/* Admin protected routes with layout */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin">
                <Route index element={<Dashboard />} />
                <Route path="add" element={<DataForm />} />
                <Route path="update" element={<DataForm />} />
              </Route>
            </Route>
          </Route>

          {/* Public routes */}
          <Route element={<Layout />}>
            {router.map((e, idx) => (
              <Route key={idx} path={e.path} element={e.element} />
            ))}
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
