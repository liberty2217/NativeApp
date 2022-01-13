import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { ImgPicker } from '../../components/ImgPicker';
import { LocationPicker } from '../../components/LocationPicker';
import { Colors } from '../../constants';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { addPlace } from '../../store/actions/places';
import { useAppDispatch } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<PlacesStackParamList, 'NewPlace'>;

export const NewPlace: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const dispatch = useAppDispatch();

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue, selectedImage));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={s.form}>
        <Text>Title</Text>
        <TextInput style={s.textInput} onChangeText={titleChangeHandler} value={titleValue} />

        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};
