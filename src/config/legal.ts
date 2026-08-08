import { Linking } from 'react-native';

export const PRIVACY_POLICY_URL = 'https://fitpro.app/privacidade';
export const TERMS_URL = 'https://fitpro.app/termos';
export const PRIVACY_CONTACT_EMAIL = 'privacidade@fitpro.app';

export type LegalDocument = 'privacy' | 'terms';

export const LEGAL_SCREEN_NAMES = {
  privacy: 'PrivacyPolicy',
  terms: 'TermsOfUse',
} as const;

type Navigable = { navigate: (screen: string) => void };

/** Opens the hosted legal page in the system browser. */
export async function openLegalUrl(document: LegalDocument): Promise<void> {
  const url = document === 'privacy' ? PRIVACY_POLICY_URL : TERMS_URL;
  await Linking.openURL(url);
}

/** Navigates to the in-app legal screen when a navigator is available. */
export function navigateToLegalDocument(document: LegalDocument, navigation: Navigable): void {
  navigation.navigate(LEGAL_SCREEN_NAMES[document]);
}

/**
 * Prefer in-app screen when navigation is provided; otherwise fall back to the hosted URL.
 */
export async function openLegalDocument(
  document: LegalDocument,
  navigation?: Navigable,
): Promise<void> {
  if (navigation) {
    navigateToLegalDocument(document, navigation);
    return;
  }
  await openLegalUrl(document);
}
