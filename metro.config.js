const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Mobile-only project — do not bundle for web.
config.resolver.platforms = ['ios', 'android', 'native'];

module.exports = config;
