# In-App Purchases Setup (RevenueCat)

FitPro uses [RevenueCat](https://www.revenuecat.com/) (`react-native-purchases`) for Pro subscriptions and Powerlifting Advanced unlocks.

**IAP does not work in Expo Go.** Use an EAS development or production build on a real device.

## 1. App Store Connect (iOS)

1. Sign in to [App Store Connect](https://appstoreconnect.apple.com/) → your app (`com.luizschumacker.training`).
2. **Subscriptions** (or In-App Purchases):
   - `fitpro_pro_monthly` — auto-renewable subscription (monthly)
   - `fitpro_pro_yearly` — auto-renewable subscription (yearly)
   - `fitpro_powerlifting_advanced` — **non-consumable** (one-time unlock; map 90-day access via RevenueCat entitlement)
3. Create a **Subscription Group** for Pro (monthly + yearly).
4. Set pricing, localizations, and review screenshots.
5. **Agreements, Tax, and Banking** must be complete before sandbox testing.

### Sandbox tester

App Store Connect → Users and Access → Sandbox → create a sandbox Apple ID for device testing.

## 2. Google Play Console (Android)

1. [Google Play Console](https://play.google.com/console/) → your app (`com.luizschumacker.training`).
2. Monetize → Products:
   - `fitpro_pro_monthly` — subscription
   - `fitpro_pro_yearly` — subscription
   - `fitpro_powerlifting_advanced` — one-time product (managed product / non-consumable)
3. Activate products and link a license tester account.

## 3. RevenueCat Dashboard

1. Create a project at [app.revenuecat.com](https://app.revenuecat.com).
2. Add **iOS** and **Android** apps (bundle ID / package name: `com.luizschumacker.training`).
3. Connect store credentials:
   - **iOS**: App Store Connect API key (Issuer ID, Key ID, `.p8` file) or Shared Secret.
   - **Android**: Service account JSON from Google Play.
4. **Entitlements** (Identifiers must match `src/config/iap.ts`):
   - `pro` — attach `fitpro_pro_monthly`, `fitpro_pro_yearly`
   - `powerlifting_advanced` — attach `fitpro_powerlifting_advanced`
5. **Offerings**: create a current offering with packages for monthly/yearly Pro and the powerlifting product.
6. Copy API keys → Project Settings → API keys → Apple / Google.

## 4. Environment variables

Copy `.env.example` to `.env` and set:

```env
EXPO_PUBLIC_REVENUECAT_IOS_API_KEY=appl_...
EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY=goog_...
```

Restart Metro after changing env vars.

## 5. Build & test

```bash
# Development build (recommended for IAP testing)
npm run eas:build:ios:dev

# Or local prebuild + run
npx expo prebuild
npx expo run:ios   # or run:android
```

Install on a **physical device**, sign in with a sandbox (iOS) or license tester (Android) account, and test:

- Pro paywall (Profile → Assinar FitPro Pro)
- Powerlifting Advanced paywall (Treinos → Powerlifting → Avançado)
- Restore purchases (paywall or Profile → settings)
- Manage subscription (Profile → Gerenciar assinatura → opens store subscriptions page)

## 6. Dev / Expo Go behavior

- **No API keys + `__DEV__`**: demo purchases (AsyncStorage only, no charge).
- **Expo Go**: RevenueCat runs in Preview/Browser mode — no real store transactions.
- **EAS build + API keys**: real sandbox/production purchases.

## Product reference

| Product ID | Type | Entitlement |
|---|---|---|
| `fitpro_pro_monthly` | Subscription | `pro` |
| `fitpro_pro_yearly` | Subscription | `pro` |
| `fitpro_powerlifting_advanced` | Non-consumable | `powerlifting_advanced` |

See `src/config/iap.ts` for the canonical IDs used in code.

Suggested list prices by country (BR / US / EU) and how the app displays store prices: [IAP_PRICING_BY_REGION.md](./IAP_PRICING_BY_REGION.md).
