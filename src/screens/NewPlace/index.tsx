import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { Colors } from '../../constants';
import { PlacesStackParamList } from '../../navigation/PlacesNavigator';
import { addPlace } from '../../store/actions/places';
import { useAppDispatch } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<PlacesStackParamList, 'NewPlace'>;

export const NewPlace: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [titleValue, setTitleValue] = useState('');
  const dispatch = useAppDispatch();

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(titleValue));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={s.form}>
        <TextInput style={s.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};
