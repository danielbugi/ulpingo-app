# 🎮 Level System Implementation Guide

## Overview

This guide explains how to implement the new **Level & XP System** with **500+ new content items** (verbs, expressions, sentences) in the Ulpingo app.

---

## 📋 What's New

### 1. **Level System**

- Progressive XP-based leveling (Level 1-100+)
- Dynamic level titles (Iniciante → Aprendiz → Estudante → Expert → Mestre)
- Beautiful level-up animations with confetti
- XP rewards for all learning activities

### 2. **Expanded Content**

- **6 New Categories** (21 total):

  - Verbos Essenciais (15 essential verbs)
  - Ações Diárias (15 daily action verbs)
  - Expressões do Dia a Dia (15 common expressions)
  - Frases Completas (15 complete sentences)
  - Verbos de Comunicação (15 communication verbs)
  - Emoções (15 emotions/feelings)
  - Conversação Avançada (15 advanced phrases)

- **500+ Total Items** with:
  - Content types: `word`, `verb`, `expression`, `sentence`
  - Difficulty levels: 1-5
  - Example sentences for context
  - Variable XP rewards

### 3. **Achievement System**

- 15 predefined achievements
- Rarity levels: Common, Rare, Epic, Legendary
- XP rewards for unlocking
- Visual badges with colors

### 4. **Daily Challenges**

- Auto-generated daily challenges
- Track progress throughout the day
- XP bonuses for completion

---

## 🚀 Implementation Steps

### Step 1: Database Migration

Run the migration to add level system tables:

```bash
# Connect to your database
psql $DATABASE_URL

# Run migration
\i database/migration-level-system.sql

# Verify tables created
\dt user_stats
\dt achievements
\dt user_achievements
\dt daily_challenges
\dt user_challenges
```

### Step 2: Seed Enhanced Content

Add the new categories, verbs, expressions, and sentences:

```bash
# Seed new content
psql $DATABASE_URL -f database/seed-enhanced-content.sql

# Verify new categories
SELECT name_pt, required_level, difficulty_level FROM categories ORDER BY required_level;

# Check word count by type
SELECT content_type, COUNT(*) FROM words GROUP BY content_type;
```

Expected output:

```
content_type  | count
--------------+-------
word          | 140
verb          | 45
expression    | 40
sentence      | 30
```

### Step 3: Update Database Functions

The new database functions are in `src/lib/db-level-system.ts`:

```typescript
import {
  getUserStats,
  addXp,
  updateStudyStreak,
  unlockAchievement,
  checkAchievements,
  getTodayChallenge,
} from '@/lib/db-level-system';
```

### Step 4: Integrate XP Rewards

Update your progress tracking to award XP:

#### In Flashcard Component:

```typescript
// src/app/flashcards/[categoryId]/page.tsx

import { addXp, checkAchievements } from '@/lib/db-level-system';
import { XP_REWARDS } from '@/lib/level-system';

// When user answers correctly
const handleCorrect = async () => {
  // Existing progress logic...

  if (session?.user?.id) {
    // Award XP
    const result = await addXp(
      parseInt(session.user.id),
      XP_REWARDS.FLASHCARD_CORRECT,
      'Flashcard correct'
    );

    // Check for level up
    if (result.leveledUp) {
      setShowLevelUp(true);
      setNewLevel(result.newLevel);
    }

    // Check achievements
    const newAchievements = await checkAchievements(parseInt(session.user.id));
    if (newAchievements.length > 0) {
      // Show achievement toast
    }
  }
};
```

#### In Quiz Component:

```typescript
// Award XP for quiz completion
const handleQuizComplete = async (score: number, total: number) => {
  if (session?.user?.id) {
    const isPerfect = score === total;
    const xpAmount = isPerfect
      ? XP_REWARDS.QUIZ_PERFECT
      : XP_REWARDS.QUIZ_COMPLETE;

    const result = await addXp(
      parseInt(session.user.id),
      xpAmount,
      isPerfect ? 'Perfect quiz!' : 'Quiz completed'
    );

    if (result.leveledUp) {
      setShowLevelUp(true);
      setNewLevel(result.newLevel);
    }
  }
};
```

### Step 5: Add Level Display to Home Page

```typescript
// src/app/page.tsx

import LevelDisplay from '@/components/LevelDisplay';
import { getUserStats } from '@/lib/db-level-system';
import { getLevelProgress } from '@/lib/level-system';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? parseInt(session.user.id) : null;

  let levelProgress = null;
  if (userId) {
    const stats = await getUserStats(userId);
    if (stats) {
      levelProgress = getLevelProgress(stats.totalXp);
    }
  }

  return (
    <div>
      {levelProgress && (
        <div className="mb-8">
          <LevelDisplay progress={levelProgress} />
        </div>
      )}

      {/* Rest of your home page */}
    </div>
  );
}
```

### Step 6: Add Level-Up Modal

```typescript
'use client';

import { useState } from 'react';
import { LevelUpModal } from '@/components/LevelDisplay';

export default function YourComponent() {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);

  return (
    <>
      {/* Your component content */}

      {showLevelUp && (
        <LevelUpModal
          newLevel={newLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </>
  );
}
```

### Step 7: Update Category Locking

Categories now have `required_level`. Lock categories based on user level:

```typescript
// src/app/page.tsx

const categories = await getCategories();
const userStats = userId ? await getUserStats(userId) : null;
const userLevel = userStats?.level || 1;

const categoriesWithLock = categories.map((cat) => ({
  ...cat,
  isLocked: cat.required_level > userLevel,
}));
```

Display locked categories:

```tsx
{
  category.isLocked ? (
    <Card className="opacity-50 cursor-not-allowed">
      <CardBody>
        <Lock className="w-8 h-8 mx-auto mb-2" />
        <p>Desbloqueie no Nível {category.required_level}</p>
      </CardBody>
    </Card>
  ) : (
    <Link href={`/flashcards/${category.id}`}>
      {/* Normal category card */}
    </Link>
  );
}
```

---

## 🎯 XP Reward Integration Points

### Automatic XP Awards

1. **Flashcards**

   - Correct answer: +10 XP
   - First try correct: +15 XP
   - 5 correct streak: +25 XP
   - 10 correct streak: +50 XP

2. **Quizzes**

   - Complete: +50 XP
   - Perfect score: +100 XP

3. **Daily Activities**

   - Daily login: +10 XP
   - Study streak day: +15 XP
   - Weekly streak: +100 XP
   - Monthly streak: +500 XP

4. **Milestones**

   - Word mastered (90%+ accuracy): +20 XP
   - Verb mastered: +25 XP
   - Expression mastered: +30 XP
   - Sentence mastered: +35 XP
   - Category completed: +200 XP

5. **Achievements**
   - Common: +50 XP
   - Rare: +100 XP
   - Epic: +250 XP
   - Legendary: +500 XP

---

## 🏆 Achievement Triggers

Implement achievement checking at key moments:

```typescript
import { checkAchievements, unlockAchievement } from '@/lib/db-level-system';

// After any major action
const newAchievements = await checkAchievements(userId);

// Manual triggers for specific achievements
if (flashcardsCompleted >= 30 && timeElapsed < 180) {
  await unlockAchievement(userId, 'speed_demon');
}

if (studyHour >= 22) {
  await unlockAchievement(userId, 'night_owl');
}

if (studyHour <= 7) {
  await unlockAchievement(userId, 'early_bird');
}
```

---

## 🎨 UI Components

### 1. Compact Level Display (Navbar)

```tsx
import LevelDisplay from '@/components/LevelDisplay';

<LevelDisplay progress={levelProgress} compact={true} />;
```

### 2. Full Level Card (Profile Page)

```tsx
<LevelDisplay progress={levelProgress} showDetails={true} />
```

### 3. XP Gain Toast

```tsx
import { XPGain } from '@/components/LevelDisplay';

<XPGain amount={50} reason="Quiz completado!" />;
```

---

## 📊 Analytics & Tracking

Track level system engagement:

```typescript
// Track level ups
analytics.track('level_up', {
  userId,
  newLevel,
  totalXp,
  timeToLevel: daysPlayed,
});

// Track achievement unlocks
analytics.track('achievement_unlocked', {
  userId,
  achievementKey,
  rarity,
  xpAwarded,
});

// Track XP sources
analytics.track('xp_earned', {
  userId,
  amount,
  source: 'flashcard_correct' | 'quiz_complete' | 'streak' | etc,
});
```

---

## 🔧 Testing

### Test Level Calculations

```typescript
import {
  xpForLevel,
  calculateLevelFromXp,
  getLevelProgress,
} from '@/lib/level-system';

// Test XP for levels
console.log('Level 1:', xpForLevel(1)); // 100
console.log('Level 5:', xpForLevel(5)); // 700
console.log('Level 10:', xpForLevel(10)); // 1450

// Test level from XP
console.log(calculateLevelFromXp(0)); // 1
console.log(calculateLevelFromXp(100)); // 2
console.log(calculateLevelFromXp(1000)); // ~8

// Test progress
const progress = getLevelProgress(550);
console.log(progress);
// {
//   currentLevel: 4,
//   currentXp: 100,
//   progressPercent: 28,
//   xpNeededForNextLevel: 250
// }
```

### Test Database Functions

```typescript
// Award XP and check level up
const result = await addXp(userId, 500, 'Test reward');
console.log('Leveled up?', result.leveledUp);
console.log('New level:', result.newLevel);

// Check achievements
const achievements = await checkAchievements(userId);
console.log('New achievements:', achievements);

// Update streak
const streak = await updateStudyStreak(userId);
console.log('Current streak:', streak.currentStreak);
console.log('New record?', streak.isNewRecord);
```

---

## 🎮 Gamification Best Practices

### 1. Immediate Feedback

- Show XP gain animation immediately after correct answer
- Display level-up modal with celebration
- Toast notifications for achievements

### 2. Clear Progress

- Always show current level and XP
- Show progress bar to next level
- Display locked content with level requirements

### 3. Varied Rewards

- Different XP for different content types
- Bonus XP for streaks and combos
- Special rewards for milestones

### 4. Social Proof

- Show level badges on profile
- Display achievements in trophy room
- Leaderboards (future feature)

---

## 🚦 Feature Flags

Consider adding feature flags for gradual rollout:

```typescript
const FEATURES = {
  LEVEL_SYSTEM: process.env.NEXT_PUBLIC_ENABLE_LEVELS === 'true',
  ACHIEVEMENTS: process.env.NEXT_PUBLIC_ENABLE_ACHIEVEMENTS === 'true',
  DAILY_CHALLENGES: process.env.NEXT_PUBLIC_ENABLE_CHALLENGES === 'true',
};

// Use in components
{
  FEATURES.LEVEL_SYSTEM && <LevelDisplay progress={levelProgress} />;
}
```

---

## 📝 Migration Checklist

- [ ] Run database migration (`migration-level-system.sql`)
- [ ] Seed new content (`seed-enhanced-content.sql`)
- [ ] Test database functions
- [ ] Add level display to home page
- [ ] Integrate XP rewards in flashcards
- [ ] Integrate XP rewards in quizzes
- [ ] Add level-up modal
- [ ] Implement category locking by level
- [ ] Add achievement checking
- [ ] Create achievements page
- [ ] Add daily challenge UI
- [ ] Test on staging
- [ ] Deploy to production
- [ ] Monitor engagement metrics

---

## 🎉 Launch Announcement

Sample announcement text:

```
🎮 NOVA ATUALIZAÇÃO: Sistema de Níveis!

Agora você pode:
✨ Ganhar XP e subir de nível
🏆 Desbloquear conquistas raras
📚 Aprender 500+ novas palavras, verbos e frases
🔓 Desbloquear categorias conforme evolui
🎯 Completar desafios diários

Comece sua jornada do Nível 1 ao Mestre! 🚀
```

---

## 🔄 Future Enhancements

1. **Leaderboards**: Weekly/monthly top learners
2. **Multiplayer**: Challenge friends to XP races
3. **Seasonal Events**: Double XP weekends
4. **Custom Avatars**: Unlock with achievements
5. **Skill Trees**: Specialize in verbs, grammar, etc.
6. **Prestige System**: Reset to level 1 with special badge
7. **Guild System**: Team-based learning
8. **Boss Battles**: Every 10 levels, special quiz

---

## 📞 Support

If you encounter issues:

1. Check database connection
2. Verify migrations ran successfully
3. Check console for errors
4. Review XP calculation logic
5. Test with different user levels

Happy coding! 🚀✨
