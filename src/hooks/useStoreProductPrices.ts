import { useEffect, useMemo, useState } from 'react';
import { canUseRealPurchases, shouldUseFallbackPrices } from '../config/iap';
import { getFallbackDisplay, getPricingRegion } from '../config/pricing';
import { useLanguage } from '../context/LanguageContext';
import { PremiumProductId } from '../data/premiumWorkouts';
import { findPowerliftingPackage, findProPackages, getOfferings } from '../services/purchases';

export function useStoreProductPrices() {
  const { locale, t } = useLanguage();
  const region = getPricingRegion(locale);
  const fallback = getFallbackDisplay(region);

  const [loading, setLoading] = useState(canUseRealPurchases());
  const [proMonthlyPrice, setProMonthlyPrice] = useState<string | null>(null);
  const [powerliftingPrice, setPowerliftingPrice] = useState<string | null>(null);

  useEffect(() => {
    if (shouldUseFallbackPrices()) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const offerings = await getOfferings();
        if (cancelled || !offerings) return;

        const { monthly } = findProPackages(offerings);
        const powerlifting = findPowerliftingPackage(offerings);

        if (monthly?.product.priceString) {
          setProMonthlyPrice(monthly.product.priceString);
        }
        if (powerlifting?.product.priceString) {
          setPowerliftingPrice(powerlifting.product.priceString);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const getPriceLabel = useMemo(
    () =>
      (productId: PremiumProductId): string => {
        switch (productId) {
          case 'fitpro_pro': {
            const price = shouldUseFallbackPrices() ? fallback.proMonthly : proMonthlyPrice ?? fallback.proMonthly;
            return t('iap.pricePerMonth', { price });
          }
          case 'powerlifting_advanced': {
            const price = shouldUseFallbackPrices()
              ? fallback.powerlifting
              : powerliftingPrice ?? fallback.powerlifting;
            return t('iap.priceAccessMonths', { price });
          }
          case 'custom_plan':
          case 'exam_analysis':
            return t('premium.priceOnRequest');
        }
      },
    [fallback.powerlifting, fallback.proMonthly, powerliftingPrice, proMonthlyPrice, t],
  );

  return { getPriceLabel, loading, proMonthlyPrice: proMonthlyPrice ?? fallback.proMonthly, powerliftingPrice: powerliftingPrice ?? fallback.powerlifting };
}
