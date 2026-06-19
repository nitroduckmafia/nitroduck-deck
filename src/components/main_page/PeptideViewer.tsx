// PeptideViewer.tsx — live cyclic-peptide structure for the "AI-designed cyclic
// peptides" pillar. Renders cyclosporin (PDB 1CWA) with 3Dmol.js: isolates the
// small cyclic-peptide chain and shows it as green-carbon sticks, slowly spinning.
//
// Swap the structure: change PDB_ID to your own designed peptide's PDB id, or use
// viewer.addModel(pdbText, 'pdb') with an inline string instead of $3Dmol.download.

import { useEffect, useRef, useState } from 'react';
import { Orbit } from 'lucide-react';
import * as $3Dmol from '3dmol';

const PDB_ID = '1CWA'; // cyclophilin–cyclosporin complex; we isolate the cyclosporin ring

export function PeptideViewer() {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    el.innerHTML = ''; // clear any leftover canvas (e.g. React StrictMode remount)

    const viewer = $3Dmol.createViewer(el, { backgroundAlpha: 0 });

    $3Dmol.download(`pdb:${PDB_ID}`, viewer, {}, () => {
      if (cancelled) return;
      try {
        const model = viewer.getModel() as any;
        const atoms = model.selectedAtoms({});
        if (!atoms?.length) { setFailed(true); return; }

        // Group residues per chain; the cyclic peptide is the chain with the fewest.
        const chains: Record<string, Set<number>> = {};
        atoms.forEach((a: any) => {
          (chains[a.chain] = chains[a.chain] ?? new Set()).add(a.resi);
        });
        let pep: string | null = null;
        let min = Infinity;
        for (const c of Object.keys(chains)) {
          if (chains[c].size < min) { min = chains[c].size; pep = c; }
        }

        // drop the cyclophilin protein (and waters) entirely — keep only the cyclic peptide
        model.removeAtoms(model.selectedAtoms({ chain: pep!, invert: true }));
        // brand grass-green carbons; heteroatoms keep their element colors for contrast
        const grassCarbon = { ...(($3Dmol as any).elementColors?.greenCarbon ?? {}), C: 0x6ca033 };
        viewer.setStyle({}, { stick: { radius: 0.16, colorscheme: { prop: 'elem', map: grassCarbon } } } as any);
        viewer.zoomTo();
        viewer.zoom(1.25);
        viewer.spin('y', 0.6);
        viewer.render();
        viewer.resize();
      } catch {
        setFailed(true);
      }
    });

    return () => {
      cancelled = true;
      try { viewer.spin(false); viewer.clear(); } catch { /* noop */ }
      el.innerHTML = ''; // detach this viewer's canvas so an orphaned mount can't ghost
    };
  }, []);

  return (
    <div className="relative h-[230px] overflow-hidden border-b border-[#E6E8DF]
                    bg-[linear-gradient(135deg,rgba(108,160,51,0.16),#FFFFFF)]">
      <div ref={ref} className="absolute inset-0" />
      {failed && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-24 h-24 rounded-full grid place-items-center bg-[#6CA033]/15 text-[#6CA033]">
            <Orbit className="w-12 h-12" strokeWidth={1.5} />
          </div>
        </div>
      )}
      <span className="pointer-events-none absolute bottom-3.5 left-4 font-mono text-[11px]
                       tracking-wide text-[#6B7060]">
        Cyclosporin · cyclic peptide
      </span>
    </div>
  );
}
