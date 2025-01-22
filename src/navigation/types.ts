// src/navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Modify: { connectedDeviceId: string };
};

// Convenience types
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type ModifyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Modify'>;

export type ModifyScreenRouteProp = RouteProp<RootStackParamList, 'Modify'>;
