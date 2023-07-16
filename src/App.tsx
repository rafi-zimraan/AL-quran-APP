import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Splass from './screen/Splass';
import Home from './screen/Home';
import Detail from './screen/Detail';
import FIlterSearch from './screen/FIlterSearch';

const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  splash: undefined;
  home: undefined;
  detail: {surahNumber?: number};
  searchFilter: undefined;
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'splash'} component={Splass} />
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'detail'} component={Detail} />
        <Stack.Screen name={'searchFilter'} component={FIlterSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
