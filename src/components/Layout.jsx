import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <ImageWithFallback
                src="https://raw.githubusercontent.com/opensuse-id/openSUSE-ID-artwork/master/openSUSE-ID-logo/openSUSE-ID-logo.png" 
                alt="openSUSE.ID" 
                className="h-10 transition-transform group-hover:scale-105"
                showIcon={false}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link 
                to="/" 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-[#73ba25] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Beranda
              </Link>
              <Link 
                to="/tentang-opensuse" 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/tentang-opensuse') 
                    ? 'bg-[#73ba25] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tentang openSUSE
              </Link>
              <Link 
                to="/tentang-kami" 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/tentang-kami') 
                    ? 'bg-[#73ba25] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tentang Kami
              </Link>
              <Link 
                to="/kode-etik" 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/kode-etik') 
                    ? 'bg-[#73ba25] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Kode Etik
              </Link>
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all flex items-center">
                  Blog <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <Link 
                    to="/blog" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors rounded-t-xl"
                  >
                    Semua Artikel
                  </Link>
                  <Link 
                    to="/blog?category=panduan" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Panduan
                  </Link>
                  <Link 
                    to="/blog?category=kegiatan" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Kegiatan
                  </Link>
                  <Link
                    to="/blog?category=wajah-opensuse-id"
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Wajah openSUSE.ID
                  </Link>
                  <Link
                    to="/tulis-artikel"
                    className="block px-4 py-3 font-semibold text-[#5ea01d] hover:bg-gray-50 transition-colors rounded-b-xl border-t border-gray-100"
                  >
                    ✍️ Tulis Artikel
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all flex items-center">
                  Konferensi <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <Link 
                    to="/konferensi/opensuse-asia-summit-2016" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors rounded-t-xl"
                  >
                    openSUSE.Asia Summit 2016
                  </Link>
                  <Link 
                    to="/konferensi/opensuse-asia-summit-2019" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    openSUSE.Asia Summit 2019
                  </Link>
                  <Link 
                    to="/konferensi/opensuse-asia-summit-2026" 
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors rounded-b-xl"
                  >
                    openSUSE.Asia Summit 2026
                  </Link>
                </div>
              </div>
              <Link 
                to="/repositori" 
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/repositori') 
                    ? 'bg-[#73ba25] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Repositori
              </Link>
              <Link 
                to="/donasi" 
                className={`ml-2 px-6 py-2 font-medium rounded-lg transition-all shadow-sm flex items-center ${
                  isActive('/donasi') 
                    ? 'bg-[#5ea01d] text-white' 
                    : 'bg-[#73ba25] hover:bg-[#5ea01d] text-white transform hover:scale-105'
                }`}
              >
                <Heart className="mr-2 h-4 w-4" fill="currentColor" />
                Donasi
              </Link>
              <Link 
                to="/hubungi" 
                className="ml-2 px-6 py-2 bg-[#1c9dd9] hover:bg-[#1889c0] text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-sm"
              >
                Hubungi
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t">
              <Link 
                to="/" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                to="/tentang-opensuse" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang openSUSE
              </Link>
              <Link 
                to="/tentang-kami" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link
                to="/blog"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/tulis-artikel"
                className="block px-4 py-3 font-semibold text-[#5ea01d] hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✍️ Tulis Artikel
              </Link>
              <div className="border-t border-gray-200 my-2"></div>
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">Konferensi</p>
              <Link 
                to="/konferensi/opensuse-asia-summit-2016" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                openSUSE.Asia Summit 2016
              </Link>
              <Link 
                to="/konferensi/opensuse-asia-summit-2019" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                openSUSE.Asia Summit 2019
              </Link>
              <Link 
                to="/konferensi/opensuse-asia-summit-2026" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                openSUSE.Asia Summit 2026
              </Link>
              <Link 
                to="/repositori" 
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Repositori
              </Link>
              <Link 
                to="/donasi" 
                className="block px-4 py-3 bg-[#73ba25] text-white hover:bg-[#5ea01d] rounded-lg transition-colors mx-4 mt-2 text-center font-medium flex items-center justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="mr-2 h-4 w-4" fill="currentColor" />
                Donasi
              </Link>
              <Link 
                to="/hubungi" 
                className="block px-4 py-3 bg-[#1c9dd9] text-white hover:bg-[#1889c0] rounded-lg transition-colors mx-4 mt-2 text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hubungi
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="pt-16">{children}</main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <ImageWithFallback
                src="https://raw.githubusercontent.com/opensuse-id/openSUSE-ID-artwork/master/openSUSE-ID-logo/openSUSE-ID-logo.png" 
                alt="openSUSE.ID" 
                className="h-10 mb-4"
                showIcon={false}
              />
              <p className="text-gray-400 mb-4 max-w-md">
                Komunitas openSUSE Indonesia - Mempromosikan penggunaan Linux dan open source di Indonesia.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigasi</h3>
              <nav className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Beranda</Link>
                <Link to="/tentang-opensuse" className="block text-gray-400 hover:text-white transition-colors">Tentang openSUSE</Link>
                <Link to="/blog" className="block text-gray-400 hover:text-white transition-colors">Blog</Link>
                <Link to="/repositori" className="block text-gray-400 hover:text-white transition-colors">Repositori</Link>
                <Link to="/donasi" className="block text-gray-400 hover:text-white transition-colors">Donasi</Link>
                <Link to="/hubungi" className="block text-gray-400 hover:text-white transition-colors">Hubungi Kami</Link>
              </nav>
            </div>
            <div>
              <h3 className="font-bold mb-4">Komunitas</h3>
              <nav className="space-y-2">
                <a href="https://t.me/openSUSE_ID" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
                <a href="https://www.facebook.com/groups/opensuse.indonesia" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a href="https://www.instagram.com/openSUSE_ID" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://x.com/openSUSE_ID" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </a>
                <a href="https://www.youtube.com/@openSUSE_ID" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
                <a href="https://www.threads.com/opensuse_id" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                  </svg>
                  Threads
                </a>
                <a href="https://threads.net/@opensuse_id" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.9152 3.48287C11.7664 2.40802 8.14445 3.12764 5.63603 5.63606C3.11905 8.15303 2.40311 11.7912 3.49389 14.9474C3.67429 15.4694 3.39738 16.0388 2.87538 16.2192C2.35339 16.3996 1.78399 16.1227 1.6036 15.6007C0.272337 11.7487 1.14318 7.30048 4.22182 4.22184C7.28998 1.15368 11.7184 0.278322 15.5613 1.59011C16.084 1.76853 16.3631 2.33687 16.1847 2.85954C16.0063 3.38221 15.4379 3.66129 14.9152 3.48287Z" fill="currentColor"></path>
                    <path d="M19.058 6.41586C19.8864 6.41586 20.558 5.74429 20.558 4.91586C20.558 4.08744 19.8864 3.41586 19.058 3.41586C18.2296 3.41586 17.558 4.08744 17.558 4.91586C17.558 5.74429 18.2296 6.41586 19.058 6.41586Z" fill="currentColor"></path>
                    <path d="M4.94202 20.5842C5.77044 20.5842 6.44202 19.9126 6.44202 19.0842C6.44202 18.2557 5.77044 17.5842 4.94202 17.5842C4.11359 17.5842 3.44202 18.2557 3.44202 19.0842C3.44202 19.9126 4.11359 20.5842 4.94202 20.5842Z" fill="currentColor"></path>
                    <path d="M22.3964 8.39931C22.216 7.87732 21.6466 7.6004 21.1246 7.7808C20.6026 7.9612 20.3257 8.5306 20.5061 9.05259C21.5969 12.2088 20.881 15.847 18.364 18.364C15.8556 20.8724 12.2336 21.592 9.08477 20.5171C8.56209 20.3387 7.99375 20.6178 7.81533 21.1405C7.63692 21.6632 7.91599 22.2315 8.43867 22.4099C12.2816 23.7217 16.71 22.8463 19.7782 19.7782C22.8568 16.6995 23.7277 12.2514 22.3964 8.39931Z" fill="currentColor"></path>
                    <path clip-rule="evenodd" d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" fill="currentColor" fill-rule="evenodd"></path>
                  </svg>
                  Fediverse
                </a>                                
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} openSUSE Indonesia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;