import type { SVGProps } from 'react';
import {
  Zap,
  Home,
  Search,
  ListChecks,
  Lightbulb,
  Plug,
  Star,
  Refrigerator,
  AirVent,
  Sun,
  Tv,
  Shirt,
  PowerOff,
  ShowerHead,
  WashingMachine,
  Sofa,
  Sprout,
  Image,
  Check,
  X,
  Gift,
  Clock,
  QrCode,
  RotateCw,
  Shield,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Trash2,
  Users,
  Lock,
  Plus,
  Minus,
  Pencil,
  Download,
  Maximize,
  Grid3x3,
  DoorClosed,
  Accessibility
} from 'lucide-react';

export type IconName =
  | 'bolt'
  | 'house'
  | 'search'
  | 'sort'
  | 'bulb'
  | 'charger'
  | 'star'
  | 'fridge'
  | 'ac'
  | 'window'
  | 'tv'
  | 'iron'
  | 'standby'
  | 'shower'
  | 'washer'
  | 'sofa'
  | 'plant'
  | 'picture'
  | 'check'
  | 'close'
  | 'gift'
  | 'clock'
  | 'qrcode'
  | 'refresh'
  | 'shield'
  | 'chevronRight'
  | 'chevronLeft'
  | 'volume'
  | 'volumeOff'
  | 'trash'
  | 'users'
  | 'lock'
  | 'plus'
  | 'minus'
  | 'edit'
  | 'download'
  | 'expand'
  | 'cards'
  | 'door'
  | 'lowReach';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

// Ícones da biblioteca Lucide (MIT, usada por milhares de produtos em
// produção) — traço consistente, desenhado por profissionais, no lugar de
// SVGs desenhados à mão.
const COMPONENTS = {
  bolt: Zap,
  house: Home,
  search: Search,
  sort: ListChecks,
  bulb: Lightbulb,
  charger: Plug,
  star: Star,
  fridge: Refrigerator,
  ac: AirVent,
  window: Sun,
  tv: Tv,
  iron: Shirt,
  standby: PowerOff,
  shower: ShowerHead,
  washer: WashingMachine,
  sofa: Sofa,
  plant: Sprout,
  picture: Image,
  check: Check,
  close: X,
  gift: Gift,
  clock: Clock,
  qrcode: QrCode,
  refresh: RotateCw,
  shield: Shield,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  volume: Volume2,
  volumeOff: VolumeX,
  trash: Trash2,
  users: Users,
  lock: Lock,
  plus: Plus,
  minus: Minus,
  edit: Pencil,
  download: Download,
  expand: Maximize,
  cards: Grid3x3,
  door: DoorClosed,
  lowReach: Accessibility
} as const satisfies Record<IconName, React.ComponentType<SVGProps<SVGSVGElement>>>;

export function Icon({ name, size = 24, strokeWidth = 1.8, ...rest }: IconProps & { strokeWidth?: number }) {
  const Component = COMPONENTS[name];
  return <Component width={size} height={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />;
}
