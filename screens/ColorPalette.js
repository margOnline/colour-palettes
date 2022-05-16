import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox'

const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;
  return (
    <FlatList
      data={colors}
      keyExtractor={item => item.colorName}
      renderItem={
        ({item}) => <ColorBox colorName={item.colorName} hexCode={item.hexCode} />
      }
      ListHeaderComponent={<Text style={styles.heading}>{paletteName}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  }
});
export default ColorPalette;
