# 🧪 Testing Guide: Achievements & Daily Goals

## Quick Start Testing

### Option 1: Browser Console (Fastest)
Open your browser's DevTools console (F12) and run these commands:

```javascript
// === ACHIEVEMENTS TESTING ===

// 1. View all achievements
const achievements = JSON.parse(localStorage.getItem('ulpingo_achievements'));
console.table(achievements);

// 2. Unlock a specific achievement manually
const achievements = JSON.parse(localStorage.getItem('ulpingo_achievements'));
const firstWord = achievements.find(a => a.id === 'first_word');
firstWord.unlocked = true;
firstWord.unlockedAt = new Date().toISOString();
localStorage.setItem('ulpingo_achievements', JSON.stringify(achievements));
console.log('✅ Achievement unlocked!');

// 3. Reset all achievements
localStorage.removeItem('ulpingo_achievements');
console.log('🔄 Achievements reset');

// 4. Check which achievements are unlocked
const achievements = JSON.parse(localStorage.getItem('ulpingo_achievements'));
const unlocked = achievements.filter(a => a.unlocked);
console.log(`Unlocked: ${unlocked.length}/${achievements.length}`);
unlocked.forEach(a => console.log(`${a.icon} ${a.name}`));


// === DAILY GOALS TESTING ===

// 1. View current daily goal
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal'));
console.log('Daily Goal:', goal);

// 2. Set progress to almost complete
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal'));
goal.completed = goal.target - 1;
localStorage.setItem('ulpingo_daily_goal', JSON.stringify(goal));
console.log('📊 Goal almost complete!');

// 3. Complete the daily goal
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal'));
goal.completed = goal.target;
localStorage.setItem('ulpingo_daily_goal', JSON.stringify(goal));
console.log('✅ Daily goal complete!');

// 4. Change goal target
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal'));
goal.target = 20; // Set to 20 words
localStorage.setItem('ulpingo_daily_goal', JSON.stringify(goal));
console.log('🎯 New target set!');

// 5. Simulate next day (resets progress)
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal'));
goal.completed = 0;
goal.date = new Date().toISOString().split('T')[0];
localStorage.setItem('ulpingo_daily_goal', JSON.stringify(goal));
console.log('📅 New day started!');

// 6. Reset daily goal
localStorage.removeItem('ulpingo_daily_goal');
console.log('🔄 Daily goal reset');


// === STREAK TESTING ===

// 1. View current streak
const streak = JSON.parse(localStorage.getItem('ulpingo_streak_data'));
console.log('Streak Data:', streak);

// 2. Set a 5-day streak
const streak = {
  currentStreak: 5,
  longestStreak: 10,
  lastVisit: new Date().toISOString(),
  totalDays: 25
};
localStorage.setItem('ulpingo_streak_data', JSON.stringify(streak));
console.log('🔥 5-day streak set!');

// 3. Simulate breaking the streak
const streak = JSON.parse(localStorage.getItem('ulpingo_streak_data'));
const twoDaysAgo = new Date(Date.now() - 2 * 86400000);
streak.lastVisit = twoDaysAgo.toISOString();
localStorage.setItem('ulpingo_streak_data', JSON.stringify(streak));
console.log('💔 Streak will break on next update');

// 4. Reset streak
localStorage.removeItem('ulpingo_streak_data');
console.log('🔄 Streak reset');


// === COMBINED TESTING ===

// Reset everything
localStorage.removeItem('ulpingo_achievements');
localStorage.removeItem('ulpingo_daily_goal');
localStorage.removeItem('ulpingo_streak_data');
console.log('🔄 All gamification data reset!');
```

---

## Option 2: Create Test Page (Recommended)

Create a test page to visually test everything:

**File:** `src/app/test-gamification/page.tsx`

```tsx
'use client';

import { useState } from 'react';
import { Button, Card, CardBody, Progress, Chip } from '@heroui/react';
import {
  getAchievements,
  unlockAchievement,
  checkAchievements,
  getStreakData,
  updateStreak,
  getDailyGoal,
  updateDailyGoal,
  setDailyGoalTarget,
} from '@/lib/gamification';
import AchievementToast from '@/components/AchievementToast';
import { Flame, Target, Trophy, RotateCcw } from 'lucide-react';

export default function TestGamificationPage() {
  const [achievements, setAchievements] = useState(getAchievements());
  const [streakData, setStreakData] = useState(getStreakData());
  const [dailyGoal, setDailyGoal] = useState(getDailyGoal());
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [wordsLearned, setWordsLearned] = useState(0);

  const refresh = () => {
    setAchievements(getAchievements());
    setStreakData(getStreakData());
    setDailyGoal(getDailyGoal());
  };

  const handleUnlockAchievement = (id: string) => {
    const achievement = unlockAchievement(id);
    if (achievement) {
      setCurrentAchievement(achievement);
      refresh();
    }
  };

  const handleUpdateStreak = () => {
    const newStreak = updateStreak();
    setStreakData(newStreak);
  };

  const handleUpdateDailyGoal = () => {
    const newGoal = updateDailyGoal(1);
    setDailyGoal(newGoal);
  };

  const handleSimulateWordLearned = () => {
    const newCount = wordsLearned + 1;
    setWordsLearned(newCount);
    
    // Update daily goal
    handleUpdateDailyGoal();
    
    // Update streak
    handleUpdateStreak();
    
    // Check achievements
    const newAchievements = checkAchievements({
      wordsLearned: newCount,
      currentStreak: streakData.currentStreak,
    });
    
    if (newAchievements.length > 0) {
      setCurrentAchievement(newAchievements[0]);
    }
    
    refresh();
  };

  const handleSimulatePerfectQuiz = () => {
    const newAchievements = checkAchievements({
      wordsLearned,
      currentStreak: streakData.currentStreak,
      quizScore: 10,
      totalQuestions: 10,
    });
    
    if (newAchievements.length > 0) {
      setCurrentAchievement(newAchievements[0]);
    }
    
    refresh();
  };

  const handleResetAll = () => {
    localStorage.removeItem('ulpingo_achievements');
    localStorage.removeItem('ulpingo_daily_goal');
    localStorage.removeItem('ulpingo_streak_data');
    setWordsLearned(0);
    refresh();
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const goalProgress = (dailyGoal.completed / dailyGoal.target) * 100;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🧪 Gamification Testing Dashboard
          </h1>
          <p className="text-white/60">
            Test achievements, streaks, and daily goals
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardBody>
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                color="success"
                onPress={handleSimulateWordLearned}
              >
                📚 Learn Word
              </Button>
              <Button
                color="secondary"
                onPress={handleSimulatePerfectQuiz}
              >
                💯 Perfect Quiz
              </Button>
              <Button
                color="warning"
                onPress={handleUpdateStreak}
              >
                🔥 Update Streak
              </Button>
              <Button
                color="danger"
                variant="flat"
                startContent={<RotateCcw className="w-4 h-4" />}
                onPress={handleResetAll}
              >
                Reset All
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Streak */}
          <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-500/30">
            <CardBody>
              <div className="flex items-center gap-3 mb-3">
                <Flame className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-white/60 text-sm">Current Streak</p>
                  <p className="text-3xl font-bold text-white">
                    {streakData.currentStreak} days
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Longest: {streakData.longestStreak} days
              </p>
              <p className="text-white/60 text-sm">
                Total: {streakData.totalDays} days
              </p>
            </CardBody>
          </Card>

          {/* Daily Goal */}
          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-500/30">
            <CardBody>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-white/60 text-sm">Daily Goal</p>
                  <p className="text-3xl font-bold text-white">
                    {dailyGoal.completed}/{dailyGoal.target}
                  </p>
                </div>
              </div>
              <Progress value={goalProgress} color="success" className="mb-2" />
              <p className="text-white/60 text-sm">
                {Math.round(goalProgress)}% complete
              </p>
            </CardBody>
          </Card>

          {/* Achievements */}
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
            <CardBody>
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-white/60 text-sm">Achievements</p>
                  <p className="text-3xl font-bold text-white">
                    {unlockedCount}/{achievements.length}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                {Math.round((unlockedCount / achievements.length) * 100)}% unlocked
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Words Learned Counter */}
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardBody>
            <p className="text-white text-lg">
              Words Learned in Test: <span className="font-bold">{wordsLearned}</span>
            </p>
          </CardBody>
        </Card>

        {/* Achievements Grid */}
        <Card className="bg-white/5 border-white/10">
          <CardBody>
            <h2 className="text-2xl font-bold text-white mb-4">All Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-purple-500'
                      : 'bg-gray-800/50 border-gray-700 opacity-60'
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="text-white font-bold mb-1">{achievement.name}</h3>
                  <p className="text-white/70 text-sm mb-3">
                    {achievement.description}
                  </p>
                  {achievement.unlocked ? (
                    <Chip color="success" size="sm">
                      ✓ Unlocked
                    </Chip>
                  ) : (
                    <Button
                      size="sm"
                      color="secondary"
                      variant="flat"
                      onPress={() => handleUnlockAchievement(achievement.id)}
                    >
                      Unlock
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Achievement Toast */}
      <AchievementToast
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </div>
  );
}
```

---

## Testing Scenarios

### Scenario 1: First-Time User Journey
1. Reset all data (browser console or reset button)
2. Learn first word → "Primeira Palavra" should unlock
3. Continue to 10 words → "Aprendiz" should unlock
4. Continue to 50 words → "Estudante" should unlock
5. Continue to 100 words → "Poliglota" should unlock

### Scenario 2: Streak Building
1. Complete activity today → Streak = 1
2. Change system date to tomorrow, complete activity → Streak = 2
3. Continue for 3 days → "Dedicado" unlocks
4. Continue for 7 days → "Comprometido" unlocks
5. Continue for 30 days → "Mestre da Consistência" unlocks

### Scenario 3: Perfect Quiz
1. Set `quizScore: 10` and `totalQuestions: 10`
2. Call `checkAchievements({..., quizScore: 10, totalQuestions: 10})`
3. "Perfeição" should unlock

### Scenario 4: Time-Based Achievements
**Early Bird (before 8am):**
```javascript
// Set system time to 7:30 AM and complete activity
const newAchievements = checkAchievements({
  wordsLearned: 5,
  currentStreak: 1
});
// "Madrugador" should unlock
```

**Night Owl (after 10pm):**
```javascript
// Set system time to 11:00 PM and complete activity
const newAchievements = checkAchievements({
  wordsLearned: 5,
  currentStreak: 1
});
// "Coruja Noturna" should unlock
```

### Scenario 5: Daily Goals
1. Start new day → Goal progress = 0
2. Learn words → Progress increases
3. Reach target → Goal complete (100%)
4. Next day → Progress resets to 0

---

## Manual Testing Commands

### Test Achievement Unlocking
```javascript
// In browser console on your app page
import { checkAchievements } from '@/lib/gamification';

// Simulate learning 100 words with 7-day streak
const achievements = checkAchievements({
  wordsLearned: 100,
  currentStreak: 7,
  quizScore: 10,
  totalQuestions: 10
});

console.log('New achievements:', achievements);
```

### Test Streak Logic
```javascript
// Simulate consecutive days
const testStreak = () => {
  // Day 1
  updateStreak();
  console.log('Day 1:', getStreakData());
  
  // Simulate next day
  const streak = JSON.parse(localStorage.getItem('ulpingo_streak_data'));
  const yesterday = new Date(Date.now() - 86400000);
  streak.lastVisit = yesterday.toISOString();
  localStorage.setItem('ulpingo_streak_data', JSON.stringify(streak));
  
  // Day 2
  updateStreak();
  console.log('Day 2:', getStreakData());
};

testStreak();
```

---

## Expected Behavior

### Achievements
- ✅ Unlock only once (no duplicates)
- ✅ Persist in localStorage
- ✅ Display toast notification when unlocked
- ✅ Track unlock timestamp

### Streaks
- ✅ Increment on consecutive days
- ✅ Reset if day is skipped
- ✅ Track longest streak
- ✅ Count total days studied

### Daily Goals
- ✅ Reset at midnight
- ✅ Persist throughout the day
- ✅ Allow custom targets
- ✅ Track completion percentage

---

## Debugging Tips

### Check localStorage Data
```javascript
// View all gamification data
console.log('Achievements:', localStorage.getItem('ulpingo_achievements'));
console.log('Streak:', localStorage.getItem('ulpingo_streak_data'));
console.log('Daily Goal:', localStorage.getItem('ulpingo_daily_goal'));
```

### Common Issues

**Achievement not unlocking:**
- Check if already unlocked: `achievement.unlocked === true`
- Verify conditions are met (word count, streak, etc.)
- Check console for errors

**Streak not updating:**
- Verify date logic (compare lastVisit with today)
- Check if same day (no update needed)
- Ensure `updateStreak()` is called after activities

**Daily goal not resetting:**
- Check if date changed: `goal.date !== today`
- Verify `getDailyGoal()` is called (it auto-resets)

---

## Visual Testing Checklist

- [ ] Achievement toast appears with animation
- [ ] Toast shows correct icon and text
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Can manually close toast
- [ ] Multiple achievements queue properly
- [ ] Streak counter updates in UI
- [ ] Daily goal progress bar animates
- [ ] Achievement grid shows unlock status
- [ ] Sounds play on achievement unlock (if sound enabled)

---

## Quick Copy-Paste Tests

### Unlock All Achievements (Testing Only!)
```javascript
const achievements = JSON.parse(localStorage.getItem('ulpingo_achievements'));
achievements.forEach(a => {
  a.unlocked = true;
  a.unlockedAt = new Date().toISOString();
});
localStorage.setItem('ulpingo_achievements', JSON.stringify(achievements));
window.location.reload();
```

### Set 30-Day Streak
```javascript
const streak = {
  currentStreak: 30,
  longestStreak: 30,
  lastVisit: new Date().toISOString(),
  totalDays: 30
};
localStorage.setItem('ulpingo_streak_data', JSON.stringify(streak));
window.location.reload();
```

### Complete Daily Goal
```javascript
const goal = JSON.parse(localStorage.getItem('ulpingo_daily_goal')) || {
  target: 10,
  completed: 0,
  date: new Date().toISOString().split('T')[0]
};
goal.completed = goal.target;
localStorage.setItem('ulpingo_daily_goal', JSON.stringify(goal));
window.location.reload();
```

---

## Production Testing

When testing in production/real usage:

1. **Learn real words** through flashcards/quiz
2. **Come back tomorrow** to test streak continuation
3. **Complete activities** to trigger natural achievements
4. **Check at different times** (morning/night) for time-based achievements

---

**Happy Testing!** 🧪✨

Remember: All data is stored in localStorage, so clearing browser data will reset everything.
