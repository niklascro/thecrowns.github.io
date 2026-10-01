"use client";

import { useState } from "react";

// >>> HIER anpassen <<<
const FORMSPREE_URL = "https://formspree.io/f/DEINE_FORM_ID";
const FOTOS = ["foto-1.jpg", "foto-2.jpg", "foto-3.jpg", "foto-4.jpg", "foto-5.jpg", "foto-6.jpg"];

const INFOS = [
  { titel: "Trauung", text: "Samstag, 12. Juni 2027, 14:00 Uhr\nStandesamt Hannover, Trammplatz 2" },
  { titel: "Feier", text: "Ab 17:00 Uhr\nGut Beispielhof, Musterweg 5" },
  { titel: "Anreise & Unterkunft", text: "Parkplätze am Gut. Zimmer können bis 1. Mai unter dem Stichwort „Hochzeit Anna & Jonas“ reserviert werden." },
  { titel: "Dresscode", text: "Festlich, gern in sommerlichen Farben." },
];

export default function Home() {
  const [offen, setOffen] = useState(null);
  const [status, setStatus] = useState("bereit"); // bereit | senden | ok | fehler

  async function absenden(e) {
    e.preventDefault();
    setStatus("senden");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("ok");
        e.target.reset();
      } else setStatus("fehler");
    } catch {
      setStatus("fehler");
    }
  }

  return (
    <main>
      <header className="hero">
        <h1>Anna &amp; Jonas</h1>
        <p>Wir heiraten am 12. Juni 2027</p>
        <nav>
          <a href="#infos">Infos</a>
          <a href="#galerie">Galerie</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <section id="infos">
        <h2>Alle Infos</h2>
        <div className="infos">
          {INFOS.map((i) => (
            <div key={i.titel}>
              <h3>{i.titel}</h3>
              <p>{i.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="galerie">
        <h2>Galerie</h2>
        <div className="galerie">
          {FOTOS.map((f) => (
            <button key={f} onClick={() => setOffen(f)} aria-label={`Foto ${f} vergrößern`}>
              <img src={`/gallery/${f}`} alt="Foto von Anna und Jonas" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {offen && (
        <div className="lightbox" onClick={() => setOffen(null)} role="dialog" aria-modal="true">
          <img src={`/gallery/${offen}`} alt="Foto in Großansicht" />
        </div>
      )}

      <section id="kontakt">
        <h2>Zu- oder Absage &amp; Fragen</h2>
        <form onSubmit={absenden}>
          <label>Name<input name="name" required /></label>
          <label>E-Mail<input name="email" type="email" required /></label>
          <label>Kommst du?
            <select name="zusage" defaultValue="ja">
              <option value="ja">Ja, ich komme</option>
              <option value="nein">Leider nicht</option>
            </select>
          </label>
          <label>Nachricht<textarea name="nachricht" rows="4" /></label>
          <button type="submit" disabled={status === "senden"}>
            {status === "senden" ? "Wird gesendet …" : "Nachricht senden"}
          </button>
          {status === "ok" && <p className="ok">Danke! Deine Nachricht ist angekommen.</p>}
          {status === "fehler" && <p className="fehler">Das hat nicht geklappt. Bitte versuche es noch einmal.</p>}
        </form>
      </section>

      <footer>Anna &amp; Jonas · 2027</footer>
    </main>
  );
}
