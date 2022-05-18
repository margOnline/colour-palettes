import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ colorName, hexCode}) => {
  const boxColor = {
    backgroundColor: hexCode
  };
  const textColor = {
    color: 
      parseInt(hexCode.replace('#', ''), 16) > 0xffffff / 1.1 
        ? 'black' 
        : 'white'
  };

  return (
    <View style={[styles.box, boxColor]}>
    <Text style={[styles.boxText, textColor]}>{colorName}: {hexCode} </Text>
  </View>
  )
};

const styles = StyleSheet.create({
  box: {
    padding: 10,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    color: "#ffffff",
    fontWeight: 'bold'
  },
})

export default ColorBox;
