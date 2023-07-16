import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  DrawerLayoutAndroid,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RootStackParams} from '../App';
import {Surah} from 'quran-kemenag/dist/intefaces';
import QuranKemenag from 'quran-kemenag';
import COLORS from '../utils/Color';
import ICONS from '../assets/icon';
import FIlterSearch from './FIlterSearch';
import {Box, Col, Line, Padder, Row, ScaledText} from 'urip-rn-kit';
import IMAGES from '../assets/images';

interface HomeScreen {
  navigation: NativeStackNavigationProp<RootStackParams, 'detail'>;
}

const Home: React.FC<HomeScreen> = ({navigation}) => {
  const DrawerLeft = useRef<DrawerLayoutAndroid>(null);
  const [listOfSurah, setListOfSurah] = useState<Surah[]>([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<Surah[]>([]);

  useEffect(() => {
    getData();
  }, []);

  // ! {'Get data quran qemenag'}
  const getData = async () => {
    const quran = new QuranKemenag();
    const data = await quran.getListSurah();
    setListOfSurah(data);
  };

  const onSearch = (searchTerm: string) => {
    const filterSurah = listOfSurah.filter(surah =>
      surah.surah_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResult(filterSurah);
    setShowSearchResult(true);
  };

  // ! {'Drawer'}
  const DrawerLayout = (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{color: COLORS.Black}}
          onPress={() => DrawerLeft.current?.closeDrawer()}>
          INI DRAWER
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHite} />
      <DrawerLayoutAndroid
        ref={DrawerLeft}
        drawerWidth={270}
        drawerPosition="left"
        renderNavigationView={() => DrawerLayout}
        style={{flex: 1}}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={() => DrawerLeft.current?.openDrawer()}>
            <Image source={ICONS.verticon} style={{width: wp('3%')}} />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>AL Quran Digital</Text>
          <TouchableOpacity>
            <FIlterSearch onSearch={onSearch} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.ViewIMG}>
          <Image
            source={IMAGES[1]}
            style={{height: hp('20%'), width: wp('90%'), borderRadius: 10}}
          />
        </TouchableOpacity>
        {showSearchResult ? (
          <FlatList
            data={searchResult}
            keyExtractor={item => `${item.surah_id}`}
            renderItem={({item, index}) => {
              const onPress = () => {
                navigation.navigate('detail', {surahNumber: item.surah_id});
              };
              return <SurahValue key={index} data={item} onPress={onPress} />;
            }}
          />
        ) : (
          <FlatList
            data={listOfSurah}
            keyExtractor={item => `${item.surah_id}`}
            renderItem={({item, index}) => {
              const onPress = () => {
                navigation.navigate('detail', {surahNumber: item.surah_id});
              };
              return <SurahValue key={index} data={item} onPress={onPress} />;
            }}
          />
        )}
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
};

interface SurahItemProps {
  data: Surah;
  onPress: () => void;
}

const SurahValue: React.FC<SurahItemProps> = props => {
  return (
    <Col onPress={props.onPress}>
      <Padder horizontal={10}>
        <Row height={60}>
          <Col justifyCenter>
            <Box
              backgroundImage={IMAGES.lingkaran}
              height={38}
              width={38}
              justifyCenter
              alignCenter>
              <ScaledText size={13} color={COLORS.Black}>
                {props.data.surah_id}
              </ScaledText>
            </Box>
          </Col>
          <Col size={3} justifyCenter>
            <ScaledText
              size={18}
              bold
              color={COLORS.Black}
              style={styles.Surah_Name}>
              {props.data.surah_name}
            </ScaledText>
            <ScaledText
              color={COLORS.Black}
              style={
                styles.Surah_Name
              }>{`${props.data.surah_verse_count} verses`}</ScaledText>
          </Col>
          <Col size={3} justifyCenter alignEnd>
            <ScaledText size={20} color={COLORS.Grey2}>
              {props.data.surah_name_arabic}
            </ScaledText>
          </Col>
        </Row>
        <Line size={1} color={COLORS.Black} />
      </Padder>
    </Col>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.WHite,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: '1.4%',
  },
  txtHeader: {
    color: COLORS.Green,
    fontSize: hp('2.7%'),
  },
  ViewIMG: {
    alignItems: 'center',
    marginHorizontal: 40,
    borderRadius: 10,
  },
  Surah_Name: {
    left: 10,
  },
});
