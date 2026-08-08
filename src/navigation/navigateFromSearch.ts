import { CommonActions, NavigationProp, ParamListBase } from '@react-navigation/native';
import { AppSearchTarget } from '../data/appSearchIndex';
import { MainTabParamList } from './types';

export const TAB_HOME_SCREEN: Record<keyof MainTabParamList, string> = {
  Home: 'HomeMain',
  TreinosPremium: 'PremiumHome',
  Treinos: 'WorkoutsList',
  TreinoEmCasa: 'HomeWorkoutsList',
  Dieta: 'DietHome',
  Comunidade: 'CommunityHome',
  Perfil: 'Profile',
};

const TAB_ORDER: (keyof MainTabParamList)[] = [
  'Home',
  'TreinosPremium',
  'Treinos',
  'TreinoEmCasa',
  'Dieta',
  'Comunidade',
  'Perfil',
];

function buildTabStackState(target: AppSearchTarget) {
  const homeScreen = TAB_HOME_SCREEN[target.tab];
  const nestedScreen = target.screen ?? homeScreen;

  if (nestedScreen === homeScreen) {
    return { routes: [{ name: homeScreen }], index: 0 };
  }

  return {
    routes: [{ name: nestedScreen, params: target.params }],
    index: 0,
  };
}

export function navigateFromGlobalSearch(navigation: NavigationProp<ParamListBase>, target: AppSearchTarget) {
  const tabIndex = Math.max(0, TAB_ORDER.indexOf(target.tab));
  const nestedState = buildTabStackState(target);

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            routes: TAB_ORDER.map((tabName) => ({
              name: tabName,
              state:
                tabName === target.tab
                  ? nestedState
                  : { routes: [{ name: TAB_HOME_SCREEN[tabName] }], index: 0 },
            })),
            index: tabIndex,
          },
        },
      ],
    }),
  );
}

/** When the user taps the same tab again, return to that tab's home screen. */
export function createTabPopToHomeListener(homeScreen: string) {
  return ({
    navigation,
    route,
  }: {
    navigation: NavigationProp<ParamListBase>;
    route: { name: string };
  }) => ({
    tabPress: (event: { preventDefault: () => void }) => {
      const state = navigation.getState();
      const currentTab = state.routes[state.index];

      if (currentTab.name !== route.name) return;

      const stackState = currentTab.state as
        | { index: number; routes: { name: string }[]; key?: string }
        | undefined;

      const isOnHome =
        !stackState ||
        stackState.routes.length === 0 ||
        (stackState.index === 0 &&
          stackState.routes.length === 1 &&
          stackState.routes[0]?.name === homeScreen);

      if (!isOnHome) {
        event.preventDefault();

        if (stackState?.key) {
          navigation.dispatch({
            ...CommonActions.reset({
              index: 0,
              routes: [{ name: homeScreen }],
            }),
            target: stackState.key,
          });
          return;
        }

        navigation.navigate(route.name, { screen: homeScreen } as never);
      }
    },
  });
}

type StackNavigation = {
  canGoBack(): boolean;
  goBack(): void;
  navigate(name: string, params?: object): void;
  reset?(state: unknown): void;
};

export function navigateBackOrHome(navigation: StackNavigation, homeScreen = 'Profile') {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  if (navigation.reset) {
    navigation.reset({
      index: 0,
      routes: [{ name: homeScreen }],
    });
    return;
  }

  navigation.navigate(homeScreen);
}

/** Volta na pilha ou navega para uma tela fallback (ex.: Treinos → Powerlifting). */
export function navigateBackOrFallback(
  navigation: StackNavigation,
  fallbackScreen: string,
  fallbackParams?: object,
) {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  navigation.navigate(fallbackScreen, fallbackParams);
}
