# Simple Bhakti — App Documentation

## High-Level Overview

Simple Bhakti is a Hindu prayer habit-tracking app. Users browse a library of traditional prayers (with multilingual lyrics and audio), mark prayers as complete, and build daily streaks. The app gamifies devotion through badges and visual streak tracking, encouraging consistent daily practice.

**Tech stack:** React + TypeScript, Vite, Tailwind CSS, Lovable Cloud (authentication & profiles).

---

## Authentication (Login / Signup / Forgot Password)

**Route:** `/auth`

### Flows
| Mode | What happens |
|------|-------------|
| **Login** | Email + password sign-in via Lovable Cloud. On success, redirects to `/`. |
| **Sign Up** | Name + email + password. Creates an auth user **and** a `profiles` row (via database trigger). Auto-confirms email. Redirects to `/`. |
| **Forgot Password** | User enters email → receives a reset link. The link redirects to `/auth?reset=true`. |
| **Reset Password** | Shown when `?reset=true` is in the URL. User sets a new password (min 6 chars) with confirmation. |

### Corner Cases
- If a user is already logged in and visits `/auth`, they are automatically redirected to `/`.
- The "Forgot password" flow deliberately shows a generic success message ("If an account exists…") to avoid leaking whether an email is registered.
- Password reset requires both fields to match; mismatches show a toast error.
- All auth errors surface as toast notifications.

---

## Tab 1: Prayers (Home)

**Route:** `/` → renders `PrayerLibrary`

### What It Does
Displays the full prayer library as searchable, filterable cards.

### Features
- **Search** by prayer title or meaning (case-insensitive substring match).
- **Filter by Deity:** Ganesha, Shiva, Vishnu, Krishna, Lakshmi, Saraswati, Hanuman, Durga, Murugan.
- **Filter by Theme:** Morning, Evening, Prosperity, Wisdom, Protection, Devotion, Peace.
- **Kid-Friendly Toggle:** Filters prayers with ≤ 20 lines.
- **Clear Filters** button appears when any filter is active.
- Each card shows: title, meaning snippet, deity badge (color-coded), theme, line count, and kid-friendly indicator.

### Corner Cases
- If no prayers match current filters, a "No prayers found" empty state is shown.
- Unauthenticated users are redirected to `/auth`.
- A loading spinner shows while the auth state is being determined.

---

## Prayer Detail Page

**Route:** `/prayer/:id`

### What It Does
Shows full prayer content with multilingual lyrics and an audio player.

### Features
- **Language Tabs:** English, Sanskrit, Tamil, Telugu — switch between lyric translations.
- **Audio Player:** Play/pause, seek bar, skip ±10s, restart, adjustable playback speed (1×, 1.5×, 2×).
- **Mark as Complete:** Logs the prayer in the user's history. Button changes to a green "Completed ✓" state.

### Interaction with Other Tabs
- Marking a prayer complete **updates the PrayerContext**, which feeds data to:
  - **Tracker:** Increments streak, total prayers, today's count, deity breakdown, and early morning count (if before 6 AM).
  - **Badges:** Progress toward all badge requirements is recalculated.

### Corner Cases
- If the prayer ID doesn't exist, a "Prayer not found" message with a back button is displayed.
- Completing the same prayer multiple times in a day counts each completion separately.
- Audio player gracefully handles missing `audioUrl` (controls still render but nothing plays).

---

## Tab 2: Tracker

**Route:** `/tracker`

### What It Does
Visual dashboard of the user's prayer habit and devotion statistics.

### Sections
| Section | Description |
|---------|-------------|
| **Streak Hero** | Large flame icon + current streak count (days in a row). Shows last prayer date. |
| **Streak Calendar** | Monthly calendar view with flame icons on completed dates. Navigate between months. |
| **Longest Streak** | All-time best consecutive days. |
| **Total Prayers** | Lifetime count of completed prayers. |
| **Early Morning** | Count of prayers completed before 6:00 AM local time. |
| **Today's Count** | Number of prayers completed today. |
| **Deities Prayed To** | Tag cloud showing each deity and how many times. |
| **Motivation Quote** | Static inspirational quote at the bottom. |

### Streak Logic
- A streak is **active** if the user completed at least one prayer today OR yesterday.
- Each consecutive prior day with at least one prayer extends the streak.
- A gap of 2+ days breaks the streak — it resets to 0 (or 1 if today has a prayer).

### Corner Cases
- Brand new users see all zeros and an empty calendar.
- The calendar highlights today's date with a ring regardless of completion.
- Streak calculation handles month/year boundaries correctly.

---

## Tab 3: Badges

**Route:** `/badges`

### What It Does
Gamification layer showing earned and in-progress achievement badges.

### Badge Categories & Requirements

#### 🔥 Streak Badges
| Badge | Requirement |
|-------|-------------|
| Devoted Beginner 🕯️ | 3-day streak |
| Weekly Warrior 🔥 | 7-day streak |
| Habit Former ⭐ | 21-day streak |
| Month Master 🏆 | 30-day streak |
| Sacred 108 💎 | 108-day streak |

#### ⏰ Time Badges
| Badge | Requirement |
|-------|-------------|
| Early Riser 🌅 | 1 prayer before 6 AM |
| Dawn Devotee 🌄 | 7 prayers before 6 AM |
| Brahma Muhurta Master ☀️ | 30 prayers before 6 AM |

#### 🙏 Variety Badges
| Badge | Requirement |
|-------|-------------|
| Trinity Seeker 🙏 | Pray to 3 different deities |
| Pancha Devotee ✨ | Pray to 5 different deities |
| Navagraha Blessed 🌟 | Pray to all 9 deities |

#### 🪔 Dedication Badges
| Badge | Requirement |
|-------|-------------|
| Dedicated Soul 🪔 | 5 prayers in one day |
| Super Devotee 🛕 | 10 prayers in one day |
| Centurion 💯 | 100 total prayers |
| Spiritual Sage 🕉️ | 500 total prayers |

### Display
- **Earned badges** shown at the top with a count header.
- **In-progress badges** grouped by category with progress bars showing percentage.
- Empty state message if no badges earned yet.

### Corner Cases
- Badge progress is recalculated on every render from the prayer logs (not stored separately).
- Streak badges use **current streak**, not longest streak — losing a streak means losing the badge display until rebuilt.

---

## Tab 4: Support

**Route:** `/support`

### What It Does
Static contact/info page.

### Content
- Contact email: ann_leaderzi@gmail.com (clickable mailto link)
- Built by: Leaderzi LLC

---

## Navigation

- **Mobile (< md breakpoint):** Fixed bottom tab bar with icons + labels for Prayers, Tracker, Badges, Support, and Logout.
- **Desktop (≥ md breakpoint):** Fixed top nav bar with logo ("Simple Bhakti"), nav links, user name display, and logout.
- Navigation is **only shown when logged in**.
- The Logout button is visible in both mobile and desktop navigation.

---

## Data Storage

| Data | Storage |
|------|---------|
| User credentials & session | Lovable Cloud (auth) |
| User profile (name, email) | Lovable Cloud (`profiles` table with RLS) |
| Prayer logs & streaks | `localStorage` keyed by user ID (`prayer-logs-{userId}`) |
| Prayer content | Static in-app data (`src/data/prayers.ts`) — 9 deities, 7 themes |
| Badge definitions | Static in-app data (`src/data/badges.ts`) — 16 badges |

### Important Implications
- Prayer logs are **device-local**. Switching devices or clearing browser data loses all streak/badge progress.
- Auth is cloud-based, so login works across devices — but prayer history does not sync.

---

## Cross-Tab Interactions Summary

```
Prayer Detail (Mark Complete)
    │
    ├──► PrayerContext.logPrayer()
    │       │
    │       ├──► Updates localStorage
    │       ├──► Recalculates stats (streak, totals, deities, early AM, today count)
    │       │
    │       ├──► Tracker tab reads stats → displays updated numbers & calendar
    │       └──► Badges tab reads stats → recalculates badge progress & achievement
    │
Auth (Login/Signup)
    │
    ├──► Sets user in AuthContext
    ├──► Triggers profile fetch from Lovable Cloud
    ├──► PrayerContext loads logs from localStorage for that user ID
    └──► Navigation becomes visible
```
