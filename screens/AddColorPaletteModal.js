import React, { useState, useCallback } from 'react';
import {
  FlatList,
  Alert,
  StyleSheet, 
  Switch, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity
} from 'react-native';

import Colors from '../assets/data/colors'

const AddColorPaletteModal = ({navigation}) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors ] = useState([])
 
  const handleSubmit = useCallback(() => {
    if (!paletteName) {
      Alert.alert("Please enter a palette name");
    } else if (selectedColors.length < 3) {
      Alert.alert("Please add at least 3 colors")
    } else {
      const newColorPalette = {
        paletteName: paletteName,
        colors: selectedColors
      }
      navigation.navigate("Home", { newColorPalette })
    }
  }, [paletteName, selectedColors]);

  const handleValueChange = useCallback((value, color) => {
    if (value === true ) {
      setSelectedColors(colors => [...colors, color])
    } else {
      setSelectedColors(colors => colors.filter(selectedColor => color.colorName !== selectedColor.colorName))
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>Name of your color palette</Text>
        <TextInput
          style={styles.input}
          value={paletteName}
          onChangeText={setPaletteName}
          placeholder="Palette name"
          />
      </View>
      <FlatList
        data={Colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.color}>
            <Text> {item.colorName}</Text>
            <Switch 
              value={!!selectedColors.find(
                color => color.colorName === item.colorName
              )} 
              onValueChange={selected => { handleValueChange(selected, item)}} 
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 30
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  heading: {
    padding: 10,
  },
  buttonWrapper: {
    height: 100,
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  color: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  }
});

export default AddColorPaletteModal;
