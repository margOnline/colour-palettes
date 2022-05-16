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
    marginBottom: 10,
  },
  boxText: {
    color: "#ffffff",
    fontWeight: 'bold'
  },
})

export default ColorBox;
