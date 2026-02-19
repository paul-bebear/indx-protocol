import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { BlogIndex, BlogPost } from './pages/blog';
import { useState } from 'react';
import { LeadCaptureModal } from './components/LeadCaptureModal';

function App() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-carbon font-sans antialiased flex flex-col relative pt-20">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <ErrorBoundary>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
              <Route path="/about" element={<AboutUs onOpenModal={() => setIsModalOpen(true)} />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="*" element={<Home onOpenModal={() => setIsModalOpen(true)} />} />
            </Routes>
          </ErrorBoundary>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialUrl=""
      />
    </div>
  );
}

export default App;
