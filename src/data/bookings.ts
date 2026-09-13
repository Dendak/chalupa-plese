// ============================================================
//  OBSAZENOST – jediné místo, které je potřeba upravovat.
//  from = den příjezdu, to = den odjezdu (formát RRRR-MM-DD).
//  Po úpravě stačí `npm run deploy`.
// ============================================================
export interface Booking {
  from: string;
  to: string;
  note?: string;
}

export const BOOKINGS: Booking[] = [
  // --- ukázková data, nahraď skutečnými termíny ---
  { from: '2026-09-18', to: '2026-09-20' },
  { from: '2026-10-02', to: '2026-10-04' },
  { from: '2026-10-23', to: '2026-10-30' },
  { from: '2026-11-13', to: '2026-11-15' },
  { from: '2026-12-22', to: '2026-12-27', note: 'Vánoce' },
  { from: '2026-12-28', to: '2027-01-02', note: 'Silvestr' },
  { from: '2027-02-06', to: '2027-02-13', note: 'Jarní prázdniny' },
  { from: '2027-07-03', to: '2027-07-10' },
  { from: '2027-07-24', to: '2027-08-07' },
];

// Letní sezóna (sobota–sobota, pouze celé týdny)
export const SUMMER_SEASONS: { from: string; to: string }[] = [
  { from: '2026-06-20', to: '2026-09-05' },
  { from: '2027-06-19', to: '2027-09-04' },
];
