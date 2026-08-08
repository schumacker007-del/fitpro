import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';

export function useRootNavigation() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return useMemo(() => {
    let current: NavigationProp<ParamListBase> = navigation;
    while (current.getParent()) {
      current = current.getParent()!;
    }
    return current;
  }, [navigation]);
}
