import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params ? route.params.newColorPalette : undefined;
  const [ colorPalettes, setColorPalettes ] = useState([]);
  const [isRefreshing, setIsRefreshing ] = useState(false);
  const colorPaletteApi = 'https://color-palette-api.kadikraman.vercel.app/palettes';
  const fetchColorPalettes = useCallback(async() => {
    const result = await fetch(colorPaletteApi);
    
    if (result.ok) {
      const palettes = await result.json();
      setColorPalettes(palettes)
    }
  });
  const handleRefresh = useCallback(async()=>{
    setIsRefreshing(true);
    await fetchColorPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [])

  useEffect(() => {
    fetchColorPalettes();
  }, [])

  useEffect(() =>{
    if (newColorPalette) {
      setColorPalettes(palettes => [newColorPalette, ...palettes])
    }
  }, [newColorPalette])
  
  return (
    <FlatList 
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=> {
          navigation.navigate('ColorPalette', item);
         }}
        >
          <PalettePreview palette={item} numToShow={5} />
        </TouchableOpacity>
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddColorPaletteModal');
          }}
        >
          <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />

  )
}

const styles = StyleSheet.create({
  list: {
    padding: 5,
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginVertical: 10,
    marginLeft: 5
  }
})

export default Home;
