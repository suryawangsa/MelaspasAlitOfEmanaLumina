export default function EventDetails({
  eventDateISO,
  endTime,
}: {
  eventDateISO: string;
  endTime: string;
}) {
  const date = new Date(eventDateISO);
  const fullDate = date
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Makassar",
    })
    .toUpperCase();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Makassar",
  });

  return (
    <section className="bg-[#265caa] text-cream py-16 px-6">
      <div className="max-w-md mx-auto text-center">
        {/* Ganti dengan foto ornamen/logo yang sudah Eggy punya */}
        <img
          src="/images/omswastyastu.png"
          alt="Ornamen"
          className="mx-auto h-16 w-auto mb-10 opacity-90"
        />

        <p className="font-body text-sm leading-loose text-cream/80 mb-8">
          With this invitation, we respectfully request the honor of your
          presence at our sacred Melaspas Alit ceremony for Infinity & Riverland
          Emana Lumina.
      
        </p>

        <p className="font-body text-sm leading-loose text-cream/80 mb-14">
          This meaningful milestone will be held on:
        </p>

        {/* Tanggal */}
        <div className="mb-12">
          <svg
            className="mx-auto mb-3 w-7 h-7 text-cream/90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M3 9h18M8 2v4M16 2v4" />
          </svg>
          <p className="font-body text-sm tracking-[0.25em]">{fullDate}</p>
        </div>

        {/* Jam */}
        <div className="mb-12">
          <svg
            className="mx-auto mb-3 w-7 h-7 text-cream/90"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <p className="font-body text-sm tracking-[0.25em]">
            {time} – {endTime}
          </p>
        </div>

        {/* Lokasi */}
        <div className="mb-8">
          <svg
            className="mx-auto mb-3 w-7 h-7 text-cream/90"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <p className="font-body text-sm tracking-[0.15em] mb-1">
            Emana Lumina Infinity
          </p>
          <p className="font-body text-sm text-cream/70 tracking-[0.1em] mt-3">
            Cempaka Street, Mas
            <br />
            Ubud District, Gianyar Regency, Bali
          </p>
        </div>
        <a
          href="https://maps.app.goo.gl/7Ex4CC7wMtxirmoL9"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-cream/70 text-cream text-xs tracking-[0.2em] font-body px-8 py-3 hover:bg-cream hover:text-black transition-colors"
        >
          GOOGLE MAPS
        </a>
      </div>
    </section>
  );
}
