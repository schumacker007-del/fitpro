# i18n Audit — FitPro

Last updated: 2026-07-27

## How translations work

- UI strings live in `src/i18n/translations.ts` (base) + `src/i18n/localeExtras.ts` (new keys).
- Regional variants: `pt-PT` → falls back to `pt-BR`; `en-GB` → falls back to `en`.
- Full locales must have identical keys: `pt-BR`, `en`, `es`, `de`.
- Run `npm run validate:i18n` before shipping — fails if keys are missing or mismatched.

## Device language (first launch)

On the **first install**, the app reads the phone language via `expo-localization` and picks the closest supported locale:

| Phone language | App opens in |
|----------------|--------------|
| Português (Brasil) | Português (Brasil) |
| Português (Portugal) | Português (Portugal) |
| English (US) | English (US) |
| English (UK) | English (UK) |
| Español | Español |
| Deutsch | Deutsch |
| Français | Français |
| Italiano | Italiano |
| Other (e.g. Japanese) | English (US) |

The choice is saved automatically. The user can change it anytime in **Perfil → Idioma**.

Supported locales: `pt-BR`, `pt-PT`, `en`, `en-GB`, `es`, `de`, `fr`, `it`.

## ✅ Migrated in this pass (use `t()`)

| Area | Files |
|------|-------|
| Profile (Pro teasers, custom plan, docs, photos, PDF) | `ProfileScreen.tsx` |
| Paywall feature list | `PaywallScreen.tsx` |
| Active workout flow | `ActiveWorkoutScreen.tsx` |
| Workout detail (locks, guided mode) | `WorkoutDetailScreen.tsx` |
| Exercise detail (labels, RPE hints, Pro teaser) | `ExerciseDetailScreen.tsx` |
| Muscle group title | `MuscleGroupDetailScreen.tsx` |
| Rest timer + RPE selector | `RestTimer.tsx`, `RpeSelector.tsx` |
| Badges + progress chart (profile) | `BadgesSection.tsx`, `ProgressChart.tsx` |
| Community feed empty state | `TrainingFeedScreen.tsx` |
| Date formatting (user locale) | See below |

### Date formatting (locale-aware)

Uses `formatLocaleDate()` from `src/utils/formatLocaleDate.ts`:

- `CustomPlanScreen.tsx`
- `MedicalRecordsScreen.tsx`
- `ProgressPhotosScreen.tsx`
- `ProgressReportScreen.tsx` (+ PDF via `locale` in `ProgressReportInput`)
- `TrainingFeedScreen.tsx`
- `TrainingFeedPostDetailScreen.tsx`
- `TrainingVideosScreen.tsx`
- `TrainingVideoDetailScreen.tsx`
- `utils/progressReportPdf.ts`

## ⏳ Still hardcoded (next passes)

These screens still contain Portuguese UI strings or data labels. Exercise **content** (names, instructions) is in `src/data/` and is a separate localization effort.

### High priority (frequent user paths)

| File | Examples |
|------|----------|
| `CustomPlanScreen.tsx` | Form labels, chips, placeholders, submit |
| `WorkoutBuilderScreen.tsx` | Goal/level chips, exercise builder |
| `MedicalRecordsScreen.tsx` | Section titles, filters, save/cancel |
| `TrainingFeedPostDetailScreen.tsx` | Comment placeholders, reactions |
| `ProgressReportScreen.tsx` | Section labels, alerts |
| `AboutPromoScreen.tsx` | CTA buttons |
| `PowerliftingAdvancedPaywallScreen.tsx` | Paywall copy |

### Medium priority

| File | Notes |
|------|-------|
| `WorkoutBuilderScreen.tsx` | Full builder UI |
| `ExercisePickerScreen.tsx` | Picker UI |
| `Encyclopedia*.tsx` | Titles from data + intro |
| `Diet/*.tsx` | Food labels, nutrition cells |
| `SupplementsScreen.tsx` | Supplement UI |
| `SportsNutrition*.tsx` | Product UI |
| `TrainingMethods*.tsx` | Method categories |
| `BodyBiotypes*.tsx` | Biotype content |
| `Powerlifting*.tsx` | Program screens |
| `CommunityMemberScreen.tsx` | Member profile labels |

### Content data (not UI keys)

| Path | Notes |
|------|-------|
| `src/data/workouts.ts` | Exercise names, instructions, tips |
| `src/data/muscleGroups.ts` | `label` field (UI titles now use `workouts.muscle.*` where mapped) |
| `src/data/professional.ts` | Coach bio (could stay PT for BR launch) |
| `src/data/legalContent.ts` | Per-locale legal text (partial) |
| `src/data/trainingVideoFeed.ts` | Video titles/descriptions |

## Rules for new UI text

1. Add key to `localeExtras.ts` for **all four** full locales (`pt-BR`, `en`, `es`, `de`).
2. Use `const { t } = useLanguage()` and `t('your.key', { param })`.
3. Run `npm run validate:i18n`.
4. For dates/numbers: `formatLocaleDate(locale, date, options)` — never `'pt-BR'` hardcoded.

## Optional later

- [ ] Lokalise / Crowdin for translator workflow
- [ ] Native speaker review for `de`, `pt-PT`, `en-GB`
- [ ] Localized exercise catalog (JSON per locale)
- [ ] ESLint rule: flag string literals in JSX `Text` children
