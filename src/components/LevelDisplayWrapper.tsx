'use client';

import LevelDisplay from '@/components/LevelDisplay';
import { LevelProgress } from '@/lib/level-system';

export function LevelDisplayWrapper({ progress }: { progress: LevelProgress }) {
  return <LevelDisplay progress={progress} />;
}
