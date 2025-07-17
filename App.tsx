import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NavigationParams } from './types';

// Screens
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { FindingDriverScreen } from './screens/FindingDriverScreen';
import { DriverFoundScreen } from './screens/DriverFoundScreen';
import { RideInProgressScreen } from './screens/RideInProgressScreen';

const Stack = createNativeStackNavigator<NavigationParams>();

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="FindingDriver" 
            component={FindingDriverScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen 
            name="DriverFound" 
            component={DriverFoundScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen 
            name="RideInProgress" 
            component={RideInProgressScreen}
            options={{ gestureEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}