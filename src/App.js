import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import PageDetail from './pages/PageDetail';
import ServicesPageDetail from "./pages/ServicesPageDetail";
import Header from './header/Header';
import Footer from './footer/Footer';
import { LiveQueryProvider } from '@sanity/preview-kit';
import LandingPageDetail from "./pages/LandingPageDetail";
import { client } from './sanityClient'
import './App.css';
function RedirectServiceToEnglish() {
  const { slug } = useParams();
  return <Navigate to={`/en/services/${slug}`} replace />;
}

function Layout() {
  const location = useLocation();

  const isServicesPage = location.pathname.includes("/services");

  return (
    <div className="app">
      {/* Hide Header for services */}
      {!isServicesPage && <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:slug" element={<MovieDetail />} />
          <Route path="/pages/:slug" element={<PageDetail />} />
          <Route path="/landing/:slug" element={<LandingPageDetail />} />
          <Route
            path="/:lang/services/:slug"
            element={<ServicesPageDetail key={window.location.pathname} />}
          />
          <Route path="/services/:slug" element={<RedirectServiceToEnglish />} />
          <Route path="/" element={<PageDetail />} />
        </Routes>
      </main>

      {/* Hide Footer also */}
      {!isServicesPage && <Footer />}
    </div>
  );
}
function App() {

  return (
    <LiveQueryProvider client={client}>
      <Router>
        <Layout />
      </Router>
    </LiveQueryProvider>
  );
}

export default App;