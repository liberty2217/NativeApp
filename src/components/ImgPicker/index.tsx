import React, { useState } from 'react';
import { Alert, Button, Image, Text, View } from 'react-native';
import { Colors } from '../../constants';
import { styles as s } from './styles';
import { launchCamera, CameraOptions, Asset } from 'react-native-image-picker';

type ImgPickerProps = {
  onImageTaken: (arg: string) => void;
};

export const ImgPicker: React.FC<ImgPickerProps> = (props) => {
  const { onImageTaken } = props;
  const [pickedImage, setPickedImage] = useState<Asset['uri']>('');

  const takeImageHandler = async () => {
    const option: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    const image = await launchCamera(option, (res) => {
      if (res.errorCode) {
        Alert.alert(`${res.errorMessage}`);
      }
    });

    if (image.assets === undefined) {
      return Alert.alert('asset is not found');
    }

    setPickedImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  };

  return (
    <View style={s.imagePicker}>
      <View style={s.imagePreview}>
        {!pickedImage ? <Text>No image picked yet</Text> : <Image style={s.image} source={{ uri: pickedImage }} />}
      </View>
      <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
  );
};
