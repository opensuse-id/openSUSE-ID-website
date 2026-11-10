import React from 'react';
import { Download, Server, Zap, Shield, ExternalLink } from 'lucide-react';

const Repositori = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#73ba25] to-[#5ea01d] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-2">Repositori Lokal openSUSE Indonesia</h1>
            <p className="text-sm opacity-90">
              Mirror lokal untuk download dan update openSUSE yang lebih cepat
            </p>
          </div>
        </div>
      </section>

      {/* Repository Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Mirror Tersedia</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#73ba25] flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3">download.opensuse.id</h3>
                <p className="text-gray-700 mb-4 text-sm flex-grow">
                  Repositori utama untuk openSUSE Leap dan Tumbleweed. Dihosting oleh CloudKilat dengan infrastruktur reliable.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-[#73ba25] mr-2 text-sm">✓</span>
                    <span className="text-gray-700 text-sm">openSUSE Leap 15.6 & 16.x</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#73ba25] mr-2 text-sm">✓</span>
                    <span className="text-gray-700 text-sm">openSUSE Tumbleweed</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#73ba25] mr-2 text-sm">✓</span>
                    <span className="text-gray-700 text-sm">Update Repository</span>
                  </div>
                </div>
                <a 
                  href="https://download.opensuse.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#73ba25] hover:bg-[#5ea01d] text-white font-semibold rounded-lg transition-all text-sm"
                >
                  Kunjungi Mirror <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500 opacity-75 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">repo.opensuse.id</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">RETIRED</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-800 font-semibold text-sm mb-1">⚠️ Repositori Tidak Aktif</p>
                  <p className="text-red-700 text-xs">
                    Mirror ini sudah tidak aktif lagi. Silakan gunakan download.opensuse.id sebagai gantinya.
                  </p>
                </div>
                <p className="text-gray-500 mb-4 line-through text-sm flex-grow">
                  Mirror alternatif untuk distribusi openSUSE. Tersedia untuk berbagai versi dan arsitektur.
                </p>
                <div className="space-y-2 mb-4 opacity-50">
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">openSUSE Leap</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">Berbagai Arsitektur</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">ISO Images</span>
                  </div>
                </div>
                <button 
                  disabled
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed text-sm"
                >
                  Tidak Tersedia <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500 opacity-75 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">twrepo.opensuse.id</h3>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">RETIRED</span>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-800 font-semibold text-sm mb-1">⚠️ Repositori Tidak Aktif</p>
                  <p className="text-red-700 text-xs">
                    Mirror ini sudah tidak aktif lagi. Silakan gunakan download.opensuse.id untuk Tumbleweed.
                  </p>
                </div>
                <p className="text-gray-500 mb-4 line-through text-sm flex-grow">
                  Repositori khusus untuk openSUSE Tumbleweed. Cocok untuk pengguna yang menginginkan update rolling release.
                </p>
                <div className="space-y-2 mb-4 opacity-50">
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">Tumbleweed Latest</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">Rolling Release</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 mr-2 text-sm">✓</span>
                    <span className="text-gray-500 text-sm">Daily Updates</span>
                  </div>
                </div>
                <button 
                  disabled
                  className="inline-flex items-center justify-center px-4 py-2 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed text-sm"
                >
                  Tidak Tersedia <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download ISO Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Download ISO</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#73ba25] to-[#5ea01d] text-white rounded-lg shadow-md p-6 border-t-4 border-[#4a8b16] flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3">openSUSE Leap</h3>
                <p className="mb-4 opacity-90 text-sm flex-grow">
                  Download ISO installer untuk openSUSE Leap, distribusi stabil dengan Long Term Support.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Versi Stabil</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Long Term Support</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Enterprise Ready</span>
                  </div>
                </div>
                <a 
                  href="https://download.opensuse.id/distribution/leap/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#73ba25] hover:bg-gray-100 font-semibold rounded-lg transition-all text-sm"
                >
                  Download Leap ISO <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="bg-gradient-to-br from-[#1c9dd9] to-[#1889c0] text-white rounded-lg shadow-md p-6 border-t-4 border-[#1675a8] flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3">openSUSE Tumbleweed</h3>
                <p className="mb-4 opacity-90 text-sm flex-grow">
                  Download ISO installer untuk openSUSE Tumbleweed, distribusi rolling release dengan update terbaru.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Rolling Release</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Selalu Update</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Cutting Edge</span>
                  </div>
                </div>
                <a 
                  href="https://download.opensuse.id/tumbleweed/iso/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#1c9dd9] hover:bg-gray-100 font-semibold rounded-lg transition-all text-sm"
                >
                  Download Tumbleweed ISO <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-lg shadow-md p-6 border-t-4 border-gray-600 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3">Versi Lainnya</h3>
                <p className="mb-4 opacity-90 text-sm flex-grow">
                  Tersedia berbagai versi openSUSE dan arsitektur untuk kebutuhan khusus Anda.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Leap Older Versions</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Multiple Architecture</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-white mr-2 text-sm">✓</span>
                    <span className="text-white text-sm">Network Install</span>
                  </div>
                </div>
                <a 
                  href="https://download.opensuse.id/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 font-semibold rounded-lg transition-all text-sm"
                >
                  Lihat Semua <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Cara Menggunakan</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Untuk openSUSE Leap</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  Tambahkan repositori openSUSE Leap:
                </p>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs">
                    <code>{`# Menggunakan zypper
sudo zypper ar -f https://download.opensuse.id/distribution/leap/16.1/repo/oss/ opensuse-id-oss
sudo zypper ar -f https://download.opensuse.id/distribution/leap/16.1/repo/non-oss/ opensuse-id-non-oss

# Refresh repository
sudo zypper ref`}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Untuk openSUSE Tumbleweed</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  Tambahkan repositori openSUSE Tumbleweed:
                </p>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-3 overflow-x-auto">
                  <pre className="text-xs">
                    <code>{`# Menggunakan zypper
sudo zypper ar -f https://download.opensuse.id/tumbleweed/repo/oss/ opensuse-id-tw-oss
sudo zypper ar -f https://download.opensuse.id/tumbleweed/repo/non-oss/ opensuse-id-tw-non-oss

# Refresh repository
sudo zypper ref`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Repositori;
