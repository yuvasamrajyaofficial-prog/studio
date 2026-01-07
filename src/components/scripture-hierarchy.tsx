import { ConstellationIcon } from "./icons/constellation";

export function ScriptureHierarchy() {
  return (
    <div className="p-4 rounded-lg bg-card/30 h-full flex flex-col text-sm font-body">
      <div className="flex items-center gap-3 mb-4">
        <ConstellationIcon className="w-8 h-8 text-primary" />
        <h3 className="font-headline text-lg text-primary font-bold">Textual Hierarchy</h3>
      </div>
      <div className="space-y-4 text-foreground/90">
        <div>
          <h4 className="font-headline font-bold text-accent">1. Shruti (That which is heard)</h4>
          <p className="text-xs text-muted-foreground pl-4">Considered eternal, authorless (apauruṣeya) divine revelation.</p>
          <ul className="list-disc pl-8 mt-1 space-y-1">
            <li>
              <strong className="text-foreground">Vedas</strong>: The foundational scriptures.
              <ul className="list-circle pl-6 text-muted-foreground">
                <li>Rig, Yajur, Sama, Atharva</li>
              </ul>
            </li>
            <li className="text-foreground">
              <strong className="text-foreground">Upanishads</strong>: The philosophical essence of the Vedas (Vedanta).
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline font-bold text-accent">2. Smriti (That which is remembered)</h4>
           <p className="text-xs text-muted-foreground pl-4">Composed by sages based on the inspiration of Shruti. Supplementary and subject to interpretation.</p>
          <ul className="list-disc pl-8 mt-1 space-y-1">
            <li>
              <strong className="text-foreground">Itihasa (Epics)</strong>: Grand narratives.
              <ul className="list-circle pl-6 text-muted-foreground">
                <li>Ramayana & Mahabharata (incl. Bhagavad Gita)</li>
              </ul>
            </li>
            <li className="text-foreground">
              <strong className="text-foreground">Puranas (Histories)</strong>: Narratives on cosmology, gods, and heroes.
            </li>
            <li className="text-foreground">
              <strong className="text-foreground">Dharma Shastras</strong>: Law books and codes of conduct.
            </li>
             <li className="text-foreground">
              <strong className="text-foreground">Agamas & Tantras</strong>: Sectarian scriptures on temple worship and rituals.
            </li>
            <li className="text-foreground">
              <strong className="text-foreground">Darshanas (Philosophies)</strong>: The six orthodox schools of philosophy.
            </li>
             <li className="text-foreground">
              <strong className="text-foreground">Vedangas</strong>: Six auxiliary disciplines for understanding the Vedas.
            </li>
          </ul>
        </div>
         <div>
          <h4 className="font-headline font-bold text-accent">3. Other Major Texts</h4>
           <p className="text-xs text-muted-foreground pl-4">Devotional, ethical, and philosophical works.</p>
           <ul className="list-disc pl-8 mt-1 space-y-1">
              <li className="text-foreground"><strong className="text-foreground">Bhakti Texts</strong>: Devotional literature.</li>
              <li className="text-foreground"><strong className="text-foreground">Niti Shastras</strong>: Treatises on ethics and statecraft.</li>
           </ul>
        </div>
      </div>
    </div>
  );
}