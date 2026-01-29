import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Verification } from './pages/Verification';
import { UseCases } from './pages/UseCases';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-text font-sans antialiased overflow-hidden flex flex-col relative selection:bg-brand-cyan/20 selection:text-brand-cyan">
      <Navbar />

      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <ErrorBoundary>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/use-cases" element={<UseCases />} />
            </Routes>
          </ErrorBoundary>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
