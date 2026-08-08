import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CommunityMemberScreen from '../screens/CommunityMemberScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MessageConversationScreen from '../screens/MessageConversationScreen';
import MessagesHubScreen from '../screens/MessagesHubScreen';
import TrainingFeedCreatePostScreen from '../screens/TrainingFeedCreatePostScreen';
import TrainingFeedPostDetailScreen from '../screens/TrainingFeedPostDetailScreen';
import TrainingFeedScreen from '../screens/TrainingFeedScreen';
import { CommunityStackParamList } from './types';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export default function CommunityNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
      <Stack.Screen name="CommunityMember" component={CommunityMemberScreen} />
      <Stack.Screen name="TrainingFeed" component={TrainingFeedScreen} />
      <Stack.Screen name="TrainingFeedCreate" component={TrainingFeedCreatePostScreen} />
      <Stack.Screen name="TrainingFeedPost" component={TrainingFeedPostDetailScreen} />
      <Stack.Screen name="MessagesHub" component={MessagesHubScreen} />
      <Stack.Screen name="MessageConversation" component={MessageConversationScreen} />
    </Stack.Navigator>
  );
}
