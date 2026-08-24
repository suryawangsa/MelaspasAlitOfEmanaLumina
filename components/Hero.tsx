export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full flex items-end justify-center overflow-hidden">
      {/* Ganti url background ini dengan foto pura/upacara milik Eggy sendiri */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#265caa]/90 via-[#265caa]/30 to-transparent" />

      <div className="relative z-10 pb-16 px-6 text-center text-cream animate-fadeUp">
        {/* Logo - ganti path sesuai file logo yang Eggy siapin */}
        <img
          src="/images/logo-putih.png"
          alt="Logo"
          className="h-34 w-auto mx-auto mb-5 opacity-95 drop-shadow-lg"
        />

        <p className="font-body tracking-[0.4em] text-xs uppercase mb-4 opacity-80">
          Invitation of The Ceremony
        </p>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-4">
          Melaspas Alit
        </h1>

        {/* Ornamen pembatas */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 bg-cream/50" />
          <span className="text-cream/70 text-sm">✦</span>
          <span className="h-px w-8 bg-cream/50" />
        </div>

        <p className="font-body tracking-[0.15em] text-sm md:text-base uppercase opacity-90">
          Infinity &amp; Riverland Emana Lumina
        </p>
      </div>
    </section>
  );
}
