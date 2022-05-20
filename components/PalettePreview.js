import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

const PalettePreview = ({ palette, numToShow }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paletteHeader}>{palette.paletteName}</Text>
      <FlatList
        style={styles.list}
        data={palette.colors.slice(0, numToShow)}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={[styles.colorBox, {backgroundColor: item.hexCode}]}></View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  paletteHeader: {
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 18,
  },
  colorBox: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    marginBottom: 10,
    flexDirection: 'row'
  }
})

export default PalettePreview;
