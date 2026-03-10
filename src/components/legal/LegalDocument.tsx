import type { LegalSection } from "@/lib/legal";

type LegalDocumentProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  completionNotes?: string[];
};

export default function LegalDocument({
  title,
  description,
  lastUpdated,
  sections,
  completionNotes = [],
}: LegalDocumentProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-4">
            Documenti legali
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-secondary/80 leading-relaxed">
            {description}
          </p>
          <p className="mt-4 text-sm text-secondary/60">Ultimo aggiornamento: {lastUpdated}</p>
        </div>

        <article className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-primary/10 bg-white p-6 sm:p-8 shadow-sm shadow-primary/5"
            >
              <h2 className="text-xl font-bold text-secondary">{section.title}</h2>
              <div className="mt-4 space-y-3 text-secondary/85 leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary/85">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {completionNotes.length ? (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-secondary">Informazioni da completare</h2>
              <p className="mt-4 text-secondary/85 leading-relaxed">
                Questa sezione evidenzia i dati non ricavabili automaticamente dal progetto ma utili per
                rifinire la pubblicazione definitiva delle informative.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-secondary/85">
                {completionNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </section>
    </div>
  );
}
