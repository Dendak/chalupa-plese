import { BOOKINGS, SUMMER_SEASONS } from '@/data/bookings';
import { PRICING } from '@/data/site';
import { differenceInCalendarDays, format, parseISO, getDay } from 'date-fns';

export const toKey = (d: Date) => format(d, 'yyyy-MM-dd');
export const fromKey = (k: string) => parseISO(k);

/** Noc začínající daným dnem je obsazená? */
export function nightOccupied(key: string): boolean {
  return BOOKINGS.some((b) => b.from <= key && key < b.to);
}

export type DayStatus = 'free' | 'booked' | 'arrival' | 'departure';

/** Vizuální stav dne v kalendáři (půlden příjezd/odjezd). */
export function dayStatus(key: string): DayStatus {
  const nightBefore = BOOKINGS.some((b) => b.from < key && key <= b.to && key !== b.from) && nightOccupied(toKey(addDays(fromKey(key), -1)));
  const nightAfter = nightOccupied(key);
  if (nightBefore && nightAfter) return 'booked';
  if (nightAfter) return 'arrival';
  if (nightBefore) return 'departure';
  return 'free';
}

export function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

/** Je celý pobyt [from, to) volný? */
export function rangeIsFree(from: string, to: string): boolean {
  let d = fromKey(from);
  const end = fromKey(to);
  while (d < end) {
    if (nightOccupied(toKey(d))) return false;
    d = addDays(d, 1);
  }
  return true;
}

export function isSummer(key: string) {
  return SUMMER_SEASONS.some((s) => s.from <= key && key < s.to);
}

export interface Estimate {
  nights: number;
  price: number | null;
  label: string;
  hint?: string;
}

/** Orientační cena podle ceníku. */
export function estimate(from: string, to: string): Estimate {
  const nights = differenceInCalendarDays(fromKey(to), fromKey(from));
  const plan = (id: string) => PRICING.plans.find((p) => p.id === id)!.price;
  if (nights < PRICING.minNights) {
    return { nights, price: null, label: 'Minimální pobyt jsou 2 noci' };
  }
  const summer = isSummer(from) || isSummer(toKey(addDays(fromKey(to), -1)));
  if (summer) {
    const sat = getDay(fromKey(from)) === 6 && nights % 7 === 0;
    if (sat) return { nights, price: (nights / 7) * plan('summer'), label: 'Letní sezóna' };
    return {
      nights,
      price: null,
      label: 'Letní sezóna',
      hint: 'V létě pronajímáme celé týdny od soboty do soboty. Napište nám, zkusíme najít řešení.',
    };
  }
  if (nights === 2) return { nights, price: plan('weekend'), label: 'Víkend' };
  if (nights === 3) return { nights, price: 15400, label: 'Prodloužený víkend' };
  if (nights % 7 === 0) return { nights, price: (nights / 7) * plan('week'), label: 'Týdenní pobyt' };
  return { nights, price: null, label: 'Cena na dotaz', hint: 'Délku pobytu rádi upravíme podle dohody.' };
}

export const czk = (n: number) => n.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 });
