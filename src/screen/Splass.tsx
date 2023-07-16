import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootStackParams} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import COLORS from '../utils/Color';
import IMAGES from '../assets/images';

const Splass = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHite} />
      <Image source={IMAGES.AlQuran} style={styles.Img} />
    </View>
  );
};

export default Splass;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHite,
  },
  Img: {
    height: hp('15%'),
    width: wp('25%'),
  },
});
