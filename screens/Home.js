import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import { TouchableOpacity, FlatList } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation }) => {
  const [ colorPalettes, setColorPalettes ] = useState([]);
  const colorPaletteApi = 'https://color-palette-api.kadikraman.vercel.app/palettes';
  const fetchColorPalettes = useCallback(async() => {
    const result = await fetch(colorPaletteApi);
    
    if (result.ok) {
      const palettes = await result.json();
      setColorPalettes(palettes)
    }
  });

  useEffect(() => {
    fetchColorPalettes();
  }, [])
  
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
    />

  )
}

export default Home;
