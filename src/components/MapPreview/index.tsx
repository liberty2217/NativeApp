import React from 'react';
import { Image, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { vars } from '../../../env';
import { Location } from '../LocationPicker';
import { style as s } from './styles';

type MapPreviewProps = {
  location: Location;
  children: JSX.Element;
  style: StyleProp<ViewStyle>;
  onPress: () => void;
};
export const MapPreview: React.FC<MapPreviewProps> = (props) => {
  const { location, children, style, onPress } = props;

  let imagePreviewUrl;

  if (location) {
    // google api with personal key (billing account)
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${vars.googleApiKey}`;
  }

  return (
    <TouchableOpacity style={[s.mapPreview, style]} onPress={onPress}>
      {Object.keys(location).length === 0 ? children : <Image style={s.mapImage} source={{ uri: imagePreviewUrl }} />}
    </TouchableOpacity>
  );
};
