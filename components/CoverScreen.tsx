"use client";

export default function CoverScreen({
  guestName,
  onOpen,
}: {
  guestName: string;
  onOpen: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white px-6 text-center overflow-hidden">
      {/* Foto background - ganti url di bawah dengan foto yang Eggy siapin */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cover.png')" }}
      />

      {/* Overlay biru gelap supaya teks tetap kebaca di atas foto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f3d]/85 via-[#153a6e]/75 to-[#0a1f3d]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 flex flex-col items-center animate-fadeUp">
        {/* Logo - pakai logo putih karena background bakal gelap (foto + overlay) */}
        <img
          src="/images/logo-putih.png"
          alt="Logo"
          className="h-32 w-auto mb-6 opacity-95"
        />
        {/* Kalau mau pakai logo biru, ganti src di atas jadi "/images/logo-biru.png"
            dan pastikan background di belakangnya cukup terang */}

        <div className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center mb-6 animate-spin_slow">
          <div className="w-14 h-14 rounded-full border border-white/40" />
        </div>

        <p className="font-serif tracking-[0.3em] text-sm uppercase mb-3 text-[#bcdcff]">
          The Invitation
        </p>
        <h1 className="font-script text-5xl md:text-6xl mb-6">Om Swastyastu</h1>

        <div className="flex items-center justify-center gap-3 w-full max-w-xs mb-6">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/50" />
          <span className="text-white/80">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/50" />
        </div>

        <p className="font-body text-sm mb-1 opacity-90">
          To Our Honored Guests
        </p>
        <p className="font-serif text-xl md:text-2xl mb-8 capitalize">
          {guestName}
        </p>

        <button
          onClick={onOpen}
          className="group flex items-center gap-2 border border-white/70 hover:bg-gradient-to-r hover:from-[#3a7bd5] hover:to-[#265caa] hover:border-transparent hover:text-white transition-all duration-300 px-8 py-3 rounded-full font-body text-sm tracking-wide shadow-lg shadow-[#265caa]/20"
        >
          Open Invitation
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
