import React, { useEffect, useState } from 'react';
import MinimalHomeScreen from '../screens/MinimalHomeScreen';

const MAIN_TABS_DELAY_MS = 500;

/**
 * Defers MainTabs (bottom tabs + Ionicons) until after first paint.
 */
export default function MainEntry() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), MAIN_TABS_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return <MinimalHomeScreen />;
  }

  const MainTabs = require('./MainTabs').default as React.ComponentType;
  return <MainTabs />;
}
