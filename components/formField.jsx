import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({
  title,
  type,
  value,
  placeholder,
  otherStyles,
  handleChangeText,
}) => {
  return (
    <View className={`flex flex-col space-y-2 justify-center ${otherStyles}`}>
      <Text className="text-white font-semibold text-lg">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-yellow flex flex-row items-center">
        <TextInput
          className="flex-1 text-white font-semibold text-base"
          value={value}
          placeholder={placeholder}
          secureTextEntry={type === "password"}
          onChangeText={handleChangeText}
        />
      </View>
    </View>
  );
};

export default FormField;
