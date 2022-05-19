import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import { TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation }) => {
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
    />

  )
}

export default Home;
