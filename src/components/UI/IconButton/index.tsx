import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SvgXml } from 'react-native-svg';

type UIIconButton = {
  onPress: () => void;
  icon: string;
};

export const IconButton: React.FC<UIIconButton> = (props) => {
  const { onPress, icon } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={icon} />
    </TouchableOpacity>
  );
};
