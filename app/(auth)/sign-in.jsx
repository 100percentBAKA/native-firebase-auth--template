import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "../../context/authProvider";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const debug = true;

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, isLogged } = useAuth();

  const onSignIn = async () => {
    if (formData.email === "" || formData.password === "") {
      Alert.alert("Error", "Fill all the form fields");
      return;
    }

    debug && console.log(formData);

    await signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        debug && console.log(res);
        if (res) {
          router.replace("/home");
        } else {
          Alert.alert("Error", "Some error occurred");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  if (!isLoading && isLogged) {
    return <Redirect href="/home " />;
  }

  return (
    <SafeAreaView className="bg-red-500 h-full">
      <ScrollView>
        <View className="w-full flex flex-col space-y-2 justify-center h-full px-4 my-6">
          <FormField
            title="Email"
            type="default"
            placeholder="Enter Email"
            value={formData.email}
            handleChangeText={(e) => setFormData({ ...formData, email: e })}
          />
          <FormField
            title="Password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            handleChangeText={(e) => setFormData({ ...formData, password: e })}
          />
          <CustomButton
            text={isLoading ? <ActivityIndicator size="large" /> : "Sign In"}
            containerStyles="mt-4"
            onPress={onSignIn}
          />
          <Text>
            Don't Have an Account ?{" "}
            <Link className="text-blue underline" href="/sign-up">
              Register
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
