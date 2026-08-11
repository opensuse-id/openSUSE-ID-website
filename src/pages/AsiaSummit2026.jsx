import React from 'react';
import { Calendar, MapPin, Users, Award, ExternalLink, Sparkles, Globe2 } from 'lucide-react';

const AsiaSummit2026 = () => {
  const quickFacts = [
    { label: 'Status', value: 'Sudah diumumkan', icon: Sparkles },
    { label: 'Acara', value: 'openSUSE.Asia Summit 2026', icon: Globe2 },
    { label: 'Tanggal', value: '3-4 Oktober 2026', icon: Calendar },
    { label: 'Lokasi', value: 'Convention Hall Universitas Islam Negeri (UIN) Sunan Kalijaga, Yogyakarta', icon: MapPin },
  ];

  const highlights = [
    {
      title: 'Sesi presentasi dan keynote',
      description:
        'Ruang untuk berbagi pengalaman, studi kasus, dan pembaruan dari komunitas open source di Asia.',
    },
    {
      title: 'Workshop dan demo teknis',
      description:
        'Format hands-on untuk belajar langsung tentang tools, alur kerja, dan praktik terbaik openSUSE.',
    },
    {
      title: 'Networking komunitas',
      description:
        'Kesempatan bertemu kontributor, pengguna, dan relawan dari berbagai negara di kawasan Asia.',
    },
    {
      title: 'Kolaborasi lintas komunitas',
      description:
        'Tempat bertukar ide untuk proyek, dokumentasi, penerjemahan, dan aktivitas komunitas berikutnya.',
    },
  ];

  const topics = [
    'Distribusi dan rilis openSUSE',
    'Administrasi sistem dan otomasi',
    'Desktop, developer workflow, dan produktivitas',
    'Cloud, container, dan infrastruktur terbuka',
    'Kontribusi komunitas, dokumentasi, dan lokalisasi',
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#73ba25] via-[#5ea01d] to-[#4a8b16] text-white py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(28,157,217,0.16),transparent_28%)]" />
        <div className="container mx-auto px-4">
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-5">
              <Sparkles className="h-4 w-4" />
              Akan diadakan
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              openSUSE.Asia Summit 2026
            </h1>
            <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Konferensi komunitas openSUSE untuk kawasan Asia akan diadakan pada 3-4 Oktober 2026 di Convention Hall Universitas Islam Negeri (UIN) Sunan Kalijaga, Yogyakarta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://events.opensuse.org/conferences/oSAS26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#73ba25] hover:text-[#5ea01d] font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                Lihat laman resmi
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <a
                href="https://t.me/openSUSE_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/30 hover:bg-white/15 font-semibold rounded-xl transition-all"
              >
                Ikuti komunitas
              </a>
              <a
                href="https://www.loket.com/event/osas26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#35b9ab] text-white font-semibold rounded-xl transition-all hover:bg-[#00a489]"
              >
                Tiket
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickFacts.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#73ba25]/10 text-[#73ba25]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{label}</p>
                    <p className="text-lg font-semibold text-gray-900 leading-snug">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang openSUSE.Asia Summit 2026</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                openSUSE.Asia Summit adalah konferensi tahunan yang mempertemukan komunitas openSUSE dan open source di kawasan Asia.
                Acara ini menjadi ruang untuk berbagi pengetahuan, pengalaman, dan membangun kolaborasi antar komunitas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Untuk edisi 2026, konferensi akan berlangsung pada 3-4 Oktober 2026 di Convention Hall Universitas Islam Negeri (UIN) Sunan Kalijaga, Yogyakarta.
                Halaman ini menjadi pengantar awal untuk informasi agenda, pembicara, dan aktivitas komunitas.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Jika Anda ingin mengikuti pembaruan lebih awal, pantau situs resmi openSUSE dan kanal komunitas openSUSE Indonesia.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Call for Papers</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Call for Papers dibuka 1 Mei sampai 1 Juli 2026 untuk Workshop, Long Talk, dan Short Talk.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Topik mencakup openSUSE, desktop, cloud, container, keamanan, embedded, IoT, dan topik non-teknis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://events.opensuse.org/conferences/oSAS26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#73ba25] text-white font-semibold rounded-xl transition-all hover:bg-[#5ea01d]"
                >
                  Buka halaman CFP resmi
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-4 text-gray-700 flex items-center">
                  1 Mei - 1 Juli 2026
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Apa yang Akan Kamu dapatkan?</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Topik yang Relevan</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Fokus acara biasanya mencakup pembaruan distribusi, praktik administrasi sistem, dan pengalaman komunitas yang bisa dibagikan lintas negara.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#73ba25]" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sponsor</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Detail sponsor untuk openSUSE.Asia Summit 2026 dapat dilihat melalui halaman khusus sponsor.
              </p>
              <a
                href="https://s.id/oSAS26-sponsor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#1c9dd9] text-white font-semibold rounded-xl transition-all hover:bg-[#1889c0]"
              >
                Lihat detail sponsor
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>

            {/* Stay Updated */}
            <div className="bg-gradient-to-br from-[#73ba25] to-[#5ea01d] text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Tetap Terhubung</h2>
              <p className="text-lg opacity-95 mb-8">
                Ikuti media sosial kami untuk mendapatkan pembaruan terbaru tentang openSUSE.Asia Summit 2026
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://www.facebook.com/groups/opensuse.indonesia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#73ba25] hover:text-[#5ea01d] font-semibold rounded-xl transition-all transform hover:scale-105"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook Group
                </a>
                <a 
                  href="https://t.me/openSUSE_ID" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#73ba25] hover:text-[#5ea01d] font-semibold rounded-xl transition-all transform hover:scale-105"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram Group
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AsiaSummit2026;