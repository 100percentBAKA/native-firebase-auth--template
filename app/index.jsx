// ! index inside the app dir is the onboarding page

import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView className="h-full bg-red-500">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex-col space-y-4 items-center justify-center h-full">
          <Text className="text-white">This is the user onboarding screen</Text>
          <TouchableOpacity
            className="px-4 py-2 bg-yellow-400"
            onPress={() => router.push("/sign-in")}
          >
            <Text>Click to Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
