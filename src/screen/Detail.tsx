import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QuranKemenag from 'quran-kemenag';
import {
  Box,
  Circle,
  Col,
  Gap,
  ImgIcon,
  Line,
  Padder,
  Row,
  ScaledText,
} from 'urip-rn-kit';
import COLORS from '../utils/Color';
import ICONS from '../assets/icon';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import IMAGES from '../assets/images';
import {Verse} from 'quran-kemenag/dist/intefaces';

interface DetailsProps {
  navigation: any;
  route: any;
}

const Detail = (props: DetailsProps) => {
  const [surah, setSurah]: [surah: any, setSurah: any] = useState(null);
  const [verses, setVerses]: [verses: any[], setVerses: any] = useState([]);

  useEffect(() => {
    const {surahNumber} = props.route.params;
    getData(surahNumber);
  }, []);

  const getData = async (surah_id: number) => {
    const quran = new QuranKemenag();
    const data = await quran.getSurah(surah_id);
    setSurah(data);
    setVerses(data.verses || []);
    console.log(surah);
  };

  return (
    <SafeAreaView>
      <Row height={50}>
        <Col justifyCenter alignCenter>
          <ImgIcon
            source={ICONS.leftArrow}
            size={30}
            onPress={() => props.navigation.goBack()}
            tintColor={COLORS.Grey2}
          />
        </Col>
        <Col size={5} justifyCenter>
          <ScaledText color={COLORS.Grey2} bold size={21}>
            {surah ? surah.surah_name : ''}
          </ScaledText>
        </Col>
      </Row>
      <Padder horizontal={20}>
        <Box
          justifyCenter
          alignCenter
          borderRadius={10}
          height={100}
          fullWidth
          backgroundImage={IMAGES.BackgroundGreen}>
          <ScaledText color={COLORS.WHite} size={20} bold>
            {surah ? surah.surah_name : ''}
          </ScaledText>
          <ScaledText color={COLORS.WHite} size={18}>
            {surah ? surah.surah_name_bahasa : ''}
          </ScaledText>
          <ScaledText color={COLORS.WHite} size={13}>
            {surah ? `${surah.surah_verse_count} VERSES` : ''}
          </ScaledText>
        </Box>
      </Padder>
      <FlatList
        data={verses}
        keyExtractor={val => val.verse_id}
        renderItem={({item, index}) => {
          return <ListAlquran key={index} data={item} />;
        }}
        ListFooterComponent={<Gap vertical size={200} />}
      />
    </SafeAreaView>
  );
};

interface VersesAlquran {
  data: Verse;
}

const ListAlquran = (props: VersesAlquran) => {
  return (
    <Padder horizontal>
      <Col>
        <Row>
          <Col>
            <Padder all>
              <Box fullWidth borderRadius={10} color={COLORS.WHite} height={45}>
                <Row>
                  <Col size={3} justifyCenter>
                    <Padder horizontal>
                      <Circle size={30} color={COLORS.Green}>
                        <ScaledText color={COLORS.WHite}>
                          {props.data.verse_number}
                        </ScaledText>
                      </Circle>
                    </Padder>
                  </Col>
                  <Col justifyCenter>
                    <Row alignCenter justifyEnd>
                      <TouchableOpacity>
                        <ImgIcon
                          source={ICONS.Play}
                          tintColor={COLORS.Green}
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <ImgIcon
                          source={ICONS.share}
                          tintColor={COLORS.Green}
                          size={20}
                        />
                      </TouchableOpacity>
                      <Gap />
                    </Row>
                  </Col>
                </Row>
              </Box>
            </Padder>
          </Col>
        </Row>
        <Row justifyEnd>
          <Padder all>
            <ScaledText color={COLORS.Black} size={22}>
              {props.data.verse_arabic}
            </ScaledText>
          </Padder>
        </Row>
        <Row>
          <Padder horizontal>
            <ScaledText color={COLORS.Black} size={14}>
              {props.data.verse_bahasa}
            </ScaledText>
          </Padder>
        </Row>
        <Gap vertical />
        <Line />
        <Gap vertical />
      </Col>
    </Padder>
  );
};

export default Detail;

const styles = StyleSheet.create({});
