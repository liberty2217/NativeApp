import React, { useState } from 'react';
import { Button, ScrollView, TextInput, View } from 'react-native';
import { Colors } from '../../constants';
import { styles as s } from './styles';

export const NewPlace = () => {
  const [titleValue, setTitleValue] = useState('');

  const titleChangeHandler = (text: string) => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    return null;
  };

  return (
    <ScrollView>
      <View style={s.form}>
        <TextInput style={s.textInput} onChangeText={titleChangeHandler} value={titleValue} />
        <Button title="Save Place" color={Colors.primary} onPress={() => null} />
      </View>
    </ScrollView>
  );
};
