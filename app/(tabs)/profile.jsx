import { Alert, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "../../config/firebase";
import { useAuth } from "../../context/authProvider";

const Profile = () => {
  const onSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Error while logging out");
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onSignOut}>
        <Text className="text-2xl">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
