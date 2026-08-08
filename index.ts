import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// enableScreens deferred until post-login (RootNavigator) to avoid native init crash
// during splash→gate transition on TestFlight (build 12).

registerRootComponent(App);
