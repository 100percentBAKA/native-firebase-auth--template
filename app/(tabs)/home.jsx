import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authProvider";

const debug = false;

const Home = () => {
  const { user } = useAuth();

  debug && console.log(user);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
