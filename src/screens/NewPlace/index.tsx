import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { ImgPicker } from '../../components/ImgPicker';
import { Location, LocationPicker } from '../../components/LocationPicker';
import { Colors } from '../../constants';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { addPlace } from '../../store/actions/places';
import { useAppDispatch } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<PlacesStackParamList, 'NewPlace'>;

export const NewPlace: React.FC<Props> = (props) => {
  const { navigation, route } = props;

  const [titleValue, setTitleValue] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<Location>();
  const dispatch = useAppDispatch();

  //1) gather data from child components
  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };
  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };
  const locationPickedHandler = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  //2) send gathered data
  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, selectedImage, selectedLocation));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={s.form}>
        <Text>Title</Text>
        <TextInput style={s.textInput} onChangeText={titleChangeHandler} value={titleValue} />

        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker parentNavigation={navigation} parentRoute={route} onLocationPicked={locationPickedHandler} />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};
