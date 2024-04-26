import { ActivityIndicator, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  text,
  containerStyles,
  textStyles,
  onPress,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${containerStyles} bg-yellow-500 rounded-xl min-h-[62px] flex flex-row justify-center items-center`}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text className={`text-black font-semibold text-lg ${textStyles}`}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
