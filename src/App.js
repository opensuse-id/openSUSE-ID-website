import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import TentangOpenSUSE from './pages/TentangOpenSUSE';
import TentangKami from './pages/TentangKami';
import KodeEtik from './pages/KodeEtik';
import BlogPage from './pages/BlogPage';
import BlogPost from './pages/BlogPost';
import TulisArtikel from './pages/TulisArtikel';
import Repositori from './pages/Repositori';
import DonasiPage from './pages/DonasiPage';
import HubungiPage from './pages/HubungiPage';
import AsiaSummit2016 from './pages/AsiaSummit2016';
import AsiaSummit2019 from './pages/AsiaSummit2019';
import AsiaSummit2026 from './pages/AsiaSummit2026';
import Layout from './components/Layout';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tentang-opensuse" element={<TentangOpenSUSE />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/kode-etik" element={<KodeEtik />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/tulis-artikel" element={<TulisArtikel />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/repositori" element={<Repositori />} />
            <Route path="/donasi" element={<DonasiPage />} />
            <Route path="/hubungi" element={<HubungiPage />} />
            <Route path="/konferensi/opensuse-asia-summit-2016" element={<AsiaSummit2016 />} />
            <Route path="/konferensi/opensuse-asia-summit-2019" element={<AsiaSummit2019 />} />
            <Route path="/konferensi/opensuse-asia-summit-2026" element={<AsiaSummit2026 />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
