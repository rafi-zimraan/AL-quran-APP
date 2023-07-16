import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import COLORS from '../utils/Color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FilterSearchProps {
  onSearch: (searchTerm: string) => void;
}

const FilterSearch: React.FC<FilterSearchProps> = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleSearch = () => {
    onSearch(searchTerm);
    setShowInput(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    setShowInput(false);
  };

  return (
    <View style={styles.container}>
      {!showInput && (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name={'magnify'} size={34} color={COLORS.Black} />
        </TouchableOpacity>
      )}
      {showInput && (
        <TextInput
          style={styles.input}
          placeholder="Search Surah"
          placeholderTextColor={COLORS.WHite}
          value={searchTerm}
          onChangeText={setSearchTerm}
          autoFocus
          onSubmitEditing={handleSearch}
          onBlur={() => setShowInput(false)}
        />
      )}
      {searchTerm !== '' && showInput && (
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Icon name="close-circle" size={34} color={COLORS.Black} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FilterSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: hp('5%'),
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: hp('2%'),
  },
  searchButton: {
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: -4,
  },
  clearButton: {
    marginLeft: 10,
  },
});
