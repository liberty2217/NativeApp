import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { styles as s } from './styles';

type Props = {
  onSelect: () => void;
  image: string;
  title: string;
  address: string;
};
export const PlaceItem: React.FC<Props> = (props) => {
  const { onSelect, image, title, address } = props;

  return (
    <TouchableOpacity onPress={onSelect} style={s.placeItem}>
      <Image style={s.image} source={{ uri: image }} />
      <View style={s.infoContainer}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};
