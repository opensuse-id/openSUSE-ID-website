import React, { useState } from 'react';
import { Heart, Landmark, Copy, Check, Server, Users, GraduationCap, Mail } from 'lucide-react';

const rekening = {
  bank: 'BSI (Bank Syariah Indonesia)',
  nomor: '7384296348',
  aN: 'OPENSUSE INDONESIA',
  email: 'humas@opensuse.id',
};

const DonasiPage = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const doCopy = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(rekening.nomor).then(doCopy).catch(() => {
        copyFallback(doCopy);
      });
    } else {
      copyFallback(doCopy);
    }
  };

  const copyFallback = (onSuccess) => {
    const textArea = document.createElement('textarea');
    textArea.value = rekening.nomor;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    onSuccess();
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#73ba25] to-[#5ea01d] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Heart className="h-8 w-8" fill="currentColor" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Donasi</h1>
            <p className="text-xl opacity-90">
              Dukung kegiatan komunitas openSUSE Indonesia. Setiap donasi sangat berarti
              untuk keberlangsungan kegiatan dan kontribusi kami.
            </p>
          </div>
        </div>
      </section>

      {/* Rekening Donasi */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Rekening Donasi</h2>
            <p className="text-gray-700 mb-8 text-center">
              Anda dapat melakukan donasi melalui transfer bank ke rekening resmi berikut:
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between bg-[#73ba25] px-6 py-4">
                <div className="flex items-center text-white">
                  <Landmark className="h-6 w-6 mr-3" />
                  <span className="font-bold text-lg">Rekening Resmi Komunitas</span>
                </div>
                <span className="text-white/90 text-sm font-medium hidden sm:block">
                  {rekening.bank}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Bank</p>
                    <p className="text-lg font-bold text-gray-900">{rekening.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Atas Nama</p>
                    <p className="text-lg font-bold text-gray-900">{rekening.aN}</p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Nomor Rekening</p>
                      <p className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wider">
                        {rekening.nomor}
                      </p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="inline-flex items-center justify-center px-5 py-3 bg-[#1c9dd9] hover:bg-[#1889c0] text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          Tersalin!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-5 w-5" />
                          Salin Nomor
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cara Berdonasi */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Cara Berdonasi</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-[#73ba25] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Landmark className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs font-bold text-[#5ea01d] uppercase tracking-wide mb-2">Langkah 1</p>
                  <p className="text-gray-700">
                    Transfer dana donasi ke rekening <strong>BSI {rekening.nomor}</strong> a/n{' '}
                    <strong>{rekening.aN}</strong>.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-[#1c9dd9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-xs font-bold text-[#1c9dd9] uppercase tracking-wide mb-2">Langkah 2</p>
                  <p className="text-gray-700">
                    Kirimkan bukti transfer melalui email ke{' '}
                    <a href={`mailto:${rekening.email}`} className="text-[#1c9dd9] hover:text-[#1889c0] font-medium">
                      {rekening.email}
                    </a>{' '}
                    agar donasi Anda dapat dicatat.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-white" fill="currentColor" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Langkah 3</p>
                  <p className="text-gray-700">
                    Selesai! Terima kasih atas dukungan Anda untuk gerakan open source di Indonesia.
                  </p>
                </div>
              </div>
            </div>

            {/* Penggunaan Dana */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Penggunaan Dana</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-[#73ba25] rounded-lg flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Infrastruktur</h4>
                  <p className="text-gray-600">
                    Biaya server, hosting, dan infrastruktur untuk menjalankan layanan dan platform komunitas.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-[#1c9dd9] rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Kegiatan Komunitas</h4>
                  <p className="text-gray-600">
                    Pelaksanaan kopdar, workshop, meetup, dan kegiatan komunitas lainnya di seluruh Indonesia.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Edukasi</h4>
                  <p className="text-gray-600">
                    Produksi konten, dokumentasi, dan program edukasi tentang Linux dan open source.
                  </p>
                </div>
              </div>
            </div>

            {/* Catatan */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600">
                Setelah melakukan donasi, mohon kirimkan bukti transfer ke{' '}
                <a href={`mailto:${rekening.email}`} className="text-[#1c9dd9] hover:text-[#1889c0] font-medium">
                  {rekening.email}
                </a>{' '}
                agar donasi Anda dapat dicatat dengan baik. Terimah kasih atas kontribusi Anda!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonasiPage;
