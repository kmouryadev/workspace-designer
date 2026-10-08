import type { CSSProperties, ReactNode } from "react";

export const ART: Record<string, [number, number, ReactNode]> = {
  "desk-std": [380, 150, (<>
    <ellipse cx="190" cy="146" rx="170" ry="4" fill="#000" opacity="0.1" />
    <rect x="44" y="14" width="10" height="124" fill="#DDE1E5" />
    <rect x="326" y="14" width="10" height="124" fill="#DDE1E5" />
    <rect x="22" y="138" width="54" height="8" rx="3" fill="#C5CAD0" />
    <rect x="304" y="138" width="54" height="8" rx="3" fill="#C5CAD0" />
    <rect x="54" y="26" width="272" height="6" fill="#CDD2D8" />
    <rect x="0" y="0" width="380" height="14" rx="4" fill="#D9B07A" />
    <rect x="0" y="0" width="380" height="3" rx="1.5" fill="#E8C899" />
    <rect x="296" y="14" width="26" height="6" rx="2" fill="#2B3640" />
  </>)],
  "desk-classic": [380, 150, (<>
    <ellipse cx="190" cy="146" rx="170" ry="4" fill="#000" opacity="0.1" />
    <rect x="30" y="16" width="12" height="124" fill="#1E252B" />
    <rect x="338" y="16" width="12" height="124" fill="#1E252B" />
    <rect x="18" y="138" width="36" height="8" rx="3" fill="#1E252B" />
    <rect x="326" y="138" width="36" height="8" rx="3" fill="#1E252B" />
    <rect x="244" y="16" width="94" height="72" fill="#2A333A" />
    <rect x="252" y="24" width="78" height="26" rx="2" fill="#37424A" />
    <rect x="280" y="34" width="22" height="4" rx="2" fill="#B9C0C6" />
    <rect x="252" y="54" width="78" height="26" rx="2" fill="#37424A" />
    <rect x="280" y="64" width="22" height="4" rx="2" fill="#B9C0C6" />
    <rect x="0" y="0" width="380" height="16" rx="4" fill="#6B4630" />
    <rect x="0" y="0" width="380" height="3" rx="1.5" fill="#84593D" />
  </>)],
  "chair-ergo": [140, 150, (<>
    <ellipse cx="70" cy="147" rx="46" ry="3" fill="#000" opacity="0.1" />
    <rect x="66" y="100" width="8" height="38" fill="#2C353B" />
    <rect x="28" y="136" width="84" height="6" rx="3" fill="#1B2227" />
    <circle cx="34" cy="145" r="4" fill="#0E1215" />
    <circle cx="54" cy="145" r="4" fill="#0E1215" />
    <circle cx="86" cy="145" r="4" fill="#0E1215" />
    <circle cx="106" cy="145" r="4" fill="#0E1215" />
    <rect x="8" y="58" width="8" height="30" rx="3" fill="#161C20" />
    <rect x="124" y="58" width="8" height="30" rx="3" fill="#161C20" />
    <rect x="30" y="4" width="80" height="80" rx="26" fill="#20282E" />
    <rect x="38" y="12" width="64" height="64" rx="19" fill="#35424A" />
    <path d="M42 28H98M42 42H98M42 56H98" stroke="#4A5A63" strokeWidth="2" fill="none" />
    <rect x="20" y="80" width="100" height="22" rx="9" fill="#20282E" />
  </>)],
  "chair-exec": [140, 150, (<>
    <ellipse cx="70" cy="147" rx="46" ry="3" fill="#000" opacity="0.1" />
    <rect x="66" y="104" width="8" height="34" fill="#2C353B" />
    <rect x="28" y="136" width="84" height="6" rx="3" fill="#1B2227" />
    <circle cx="34" cy="145" r="4" fill="#0E1215" />
    <circle cx="54" cy="145" r="4" fill="#0E1215" />
    <circle cx="86" cy="145" r="4" fill="#0E1215" />
    <circle cx="106" cy="145" r="4" fill="#0E1215" />
    <rect x="6" y="60" width="14" height="34" rx="5" fill="#3A2416" />
    <rect x="120" y="60" width="14" height="34" rx="5" fill="#3A2416" />
    <rect x="24" y="0" width="92" height="88" rx="24" fill="#5A3A24" />
    <rect x="32" y="8" width="76" height="72" rx="18" fill="#6E4A30" />
    <path d="M40 28H100M40 44H100M40 60H100" stroke="#5A3A24" strokeWidth="2" fill="none" />
    <rect x="14" y="82" width="112" height="24" rx="10" fill="#4A2E1C" />
  </>)],
  mon: [100, 80, (<>
    <rect x="1" y="1" width="98" height="60" rx="4" fill="#1B2328" />
    <rect x="5" y="5" width="90" height="52" rx="2" fill="#24404A" />
    <rect x="11" y="12" width="36" height="4" rx="2" fill="#6FB7C2" />
    <rect x="11" y="22" width="58" height="4" rx="2" fill="#D9A441" opacity="0.9" />
    <rect x="17" y="32" width="32" height="4" rx="2" fill="#9CC9CF" />
    <rect x="17" y="42" width="50" height="4" rx="2" fill="#6FB7C2" />
    <rect x="44" y="61" width="12" height="10" fill="#3A464D" />
    <rect x="30" y="71" width="40" height="5" rx="2.5" fill="#232C32" />
  </>)],
  "mon-wide": [160, 80, (<>
    <rect x="1" y="1" width="158" height="60" rx="4" fill="#1B2328" />
    <rect x="5" y="5" width="150" height="52" rx="2" fill="#24404A" />
    <rect x="11" y="12" width="56" height="4" rx="2" fill="#6FB7C2" />
    <rect x="11" y="22" width="96" height="4" rx="2" fill="#D9A441" opacity="0.9" />
    <rect x="17" y="32" width="52" height="4" rx="2" fill="#9CC9CF" />
    <rect x="17" y="42" width="84" height="4" rx="2" fill="#6FB7C2" />
    <rect x="74" y="61" width="12" height="10" fill="#3A464D" />
    <rect x="52" y="71" width="56" height="5" rx="2.5" fill="#232C32" />
  </>)],
  "lamp-desk": [50, 80, (<>
    <rect x="6" y="74" width="28" height="5" rx="2.5" fill="#1F2A31" />
    <path d="M20 74 L14 42 L36 14" stroke="#3A464D" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <g transform="rotate(30 38 12)"><rect x="27" y="5" width="22" height="12" rx="6" fill="#D9A441" /></g>
    <circle cx="14" cy="42" r="3" fill="#1F2A31" />
    <circle cx="36" cy="14" r="3" fill="#1F2A31" />
  </>)],
  "lamp-led": [170, 16, (<>
    <polygon points="12,9 158,9 148,16 22,16" fill="#FFE9A8" opacity="0.35" />
    <rect x="0" y="2" width="170" height="6" rx="3" fill="#2A343B" />
    <rect x="6" y="6" width="158" height="2" fill="#FFE9A8" />
  </>)],
  "lamp-floor": [40, 190, (<>
    <ellipse cx="20" cy="184" rx="14" ry="4" fill="#1F2A31" />
    <rect x="18" y="40" width="4" height="144" fill="#3A464D" />
    <path d="M4 40 L10 4 H30 L36 40 Z" fill="#F2E4C4" stroke="#C9B88F" strokeWidth="1.5" />
  </>)],
  "plant-small": [40, 56, (<>
    <ellipse cx="20" cy="22" rx="5" ry="16" fill="#3E9A66" />
    <ellipse cx="12" cy="26" rx="4" ry="12" fill="#2F8452" transform="rotate(-25 12 26)" />
    <ellipse cx="28" cy="26" rx="4" ry="12" fill="#2F8452" transform="rotate(25 28 26)" />
    <rect x="8" y="34" width="24" height="6" rx="2" fill="#CD7C5C" />
    <path d="M10 40H30L27 54H13Z" fill="#B8674A" />
  </>)],
  "plant-large": [70, 110, (<>
    <ellipse cx="35" cy="30" rx="9" ry="30" fill="#3E9A66" />
    <ellipse cx="20" cy="42" rx="8" ry="26" fill="#2F8452" transform="rotate(-30 20 42)" />
    <ellipse cx="50" cy="42" rx="8" ry="26" fill="#2F8452" transform="rotate(30 50 42)" />
    <ellipse cx="27" cy="34" rx="6" ry="22" fill="#56B684" transform="rotate(-12 27 34)" />
    <ellipse cx="43" cy="34" rx="6" ry="22" fill="#56B684" transform="rotate(12 43 34)" />
    <rect x="13" y="68" width="44" height="8" rx="3" fill="#E6D5BB" />
    <path d="M16 76H54L49 108H21Z" fill="#D8C3A5" />
  </>)],
  "plant-hang": [50, 110, (<>
    <path d="M25 0V26" stroke="#8A6B4A" strokeWidth="2" fill="none" />
    <path d="M12 26H38L34 46H16Z" fill="#B8674A" />
    <path d="M18 46C10 62 14 80 10 104" stroke="#3E9A66" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M25 46C24 66 28 84 26 108" stroke="#2F8452" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M32 46C40 64 36 82 40 102" stroke="#3E9A66" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="12" cy="66" rx="4" ry="6" fill="#56B684" />
    <ellipse cx="27" cy="84" rx="4" ry="6" fill="#56B684" />
    <ellipse cx="38" cy="78" rx="4" ry="6" fill="#56B684" />
  </>)],
  coffee: [60, 70, (<>
    <ellipse cx="30" cy="66" rx="24" ry="3" fill="#000" opacity="0.08" />
    <rect x="6" y="20" width="48" height="36" rx="4" fill="#2A333A" />
    <rect x="12" y="26" width="36" height="16" rx="2" fill="#1B2328" />
    <circle cx="18" cy="34" r="3" fill="#D9A441" />
    <circle cx="30" cy="34" r="3" fill="#D9A441" />
    <circle cx="42" cy="34" r="3" fill="#D9A441" />
    <rect x="22" y="56" width="16" height="8" rx="1.5" fill="#6E4A30" />
    <path d="M24 48 L20 56 H40 L36 48 Z" fill="#8A5A3A" />
  </>)],
  surfboard: [40, 110, (<>
    <ellipse cx="20" cy="104" rx="14" ry="3" fill="#000" opacity="0.08" />
    <path d="M20 2C30 16 34 50 34 70C34 90 28 102 20 106C12 102 6 90 6 70C6 50 10 16 20 2Z" fill="#F4ECD8" stroke="#D9C9AC" strokeWidth="1.5" />
    <path d="M20 10V98" stroke="#D9A441" strokeWidth="3" />
    <ellipse cx="20" cy="46" rx="6" ry="16" fill="#8CC7A3" opacity="0.6" />
  </>)],
  motorcycle: [100, 70, (<>
    <ellipse cx="50" cy="64" rx="44" ry="4" fill="#000" opacity="0.1" />
    <circle cx="24" cy="54" r="14" fill="#1B2328" />
    <circle cx="24" cy="54" r="7" fill="#3A464D" />
    <circle cx="76" cy="54" r="14" fill="#1B2328" />
    <circle cx="76" cy="54" r="7" fill="#3A464D" />
    <path d="M24 54 L46 30 H66 L76 54" stroke="#17263F" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="44" y="22" width="26" height="10" rx="4" fill="#17263F" />
    <rect x="16" y="46" width="16" height="6" rx="3" fill="#A9722A" />
  </>)],
  beanbag: [70, 60, (<>
    <ellipse cx="35" cy="56" rx="32" ry="4" fill="#000" opacity="0.1" />
    <path
      d="M35 6C14 6 4 24 4 38C4 52 18 56 35 56C52 56 66 52 66 38C66 24 56 6 35 6Z"
      fill="#CD7C5C"
    />
    <path d="M18 20C24 30 46 30 52 20" stroke="#B8674A" strokeWidth="3" fill="none" strokeLinecap="round" />
  </>)],
};

export function Art({ id, className, style }: { id: string; className?: string; style?: CSSProperties }) {
  const artEntry = ART[id];
  if (!artEntry) return null;
  const [viewBoxWidth, viewBoxHeight, drawing] = artEntry;
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={className}
      style={style}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {drawing}
    </svg>
  );
}

export function RoomBackground() {
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
      <rect x="0" y="0" width="640" height="400" fill="#EFE4D0" />
      <rect x="0" y="388" width="640" height="14" fill="#E2D3B8" />
      <rect x="0" y="402" width="640" height="78" fill="#CDB391" />
      <path d="M0 424H640M0 450H640" stroke="#BFA37E" strokeWidth="1.5" />
      <path d="M30 230V110C30 70 60 44 90 44C120 44 150 70 150 110V230Z" fill="#FFFFFF" />
      <path d="M36 224V110C36 74 62 50 90 50C118 50 144 74 144 110V224Z" fill="#BFE3EE" />
      <circle cx="112" cy="92" r="14" fill="#FBE7A6" />
      <path d="M36 224V170C60 160 80 170 100 164C120 158 132 164 144 160V224Z" fill="#8CC7A3" />
      <rect x="26" y="228" width="128" height="6" rx="2" fill="#FFFFFF" />
      <rect x="468" y="84" width="76" height="86" rx="3" fill="#FFFFFF" stroke="#D9C9AC" strokeWidth="2" />
      <rect x="476" y="92" width="60" height="70" fill="#F2E7D3" />
      <circle cx="506" cy="120" r="14" fill="#D9A441" opacity="0.8" />
      <path d="M476 162C490 140 506 136 536 146V162Z" fill="#8CC7A3" />
      <ellipse cx="320" cy="438" rx="250" ry="30" fill="#D9C9AC" opacity="0.85" />
    </svg>
  );
}
