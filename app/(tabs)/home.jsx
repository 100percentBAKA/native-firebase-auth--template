import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/authProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const debug = false;

const Home = () => {
  const { user } = useAuth();

  debug && console.log(user);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await AsyncStorage.getItem("@AuthData");
  //     console.log("data from async storage being displayed on home screen");
  //     console.log(JSON.parse(result));
  //   };

  //   fetchData();
  // }, []);

  return (
    <SafeAreaView>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
