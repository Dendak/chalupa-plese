import {
  Armchair, Baby, Bath, BedDouble, Beef, Beer, Car, CigaretteOff, Circle, Coffee, CookingPot, Dog, Fence, Fish, Flame, FlameKindling,
  Gift, Goal, Microwave, PawPrint, Refrigerator, ShowerHead, Sparkles, TentTree, Trees, Tv, Users, Utensils, WashingMachine, Wifi,
  type LucideProps,
} from 'lucide-react';

// Explicitní mapa (kvůli tree-shakingu – neimportovat celý `icons` objekt).
const MAP: Record<string, React.ComponentType<LucideProps>> = {
  armchair: Armchair,
  baby: Baby,
  bath: Bath,
  'bed-double': BedDouble,
  beef: Beef,
  beer: Beer,
  car: Car,
  'cigarette-off': CigaretteOff,
  coffee: Coffee,
  'cooking-pot': CookingPot,
  dog: Dog,
  fence: Fence,
  fish: Fish,
  flame: Flame,
  'flame-kindling': FlameKindling,
  gift: Gift,
  goal: Goal,
  microwave: Microwave,
  paw: PawPrint,
  'paw-print': PawPrint,
  refrigerator: Refrigerator,
  'shower-head': ShowerHead,
  sparkles: Sparkles,
  'tent-tree': TentTree,
  trees: Trees,
  tv: Tv,
  users: Users,
  utensils: Utensils,
  'washing-machine': WashingMachine,
  wifi: Wifi,
};

/** Lucide ikona podle kebab-case názvu (např. "bed-double"). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = MAP[name] ?? Circle;
  return <Cmp {...props} />;
}
