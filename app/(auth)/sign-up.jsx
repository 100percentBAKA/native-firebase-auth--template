import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/formField";
import CustomButton from "../../components/customButton";
import { Link, router } from "expo-router";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../context/authProvider";

const debug = true;

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const { isLoading } = useAuth();

  const onSignUp = async () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.rePassword === ""
    ) {
      Alert.alert("Error", "Form fields cannot be empty");
      return;
    }

    if (formData.password !== formData.rePassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    debug && console.log("From data: ");
    debug && console.log(formData);

    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then((res) => {
        if (res) {
          router.replace("/home");
          Alert.alert("Success", "Successfully registered the user");
        } else {
          Alert.alert("Error", "Some error occurred");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <SafeAreaView className="bg-red-500 h-full">
      <ScrollView>
        <View className="w-full flex flex-col space-y-2 justify-center h-full px-4 my-6">
          <FormField
            title="Email"
            type="email-address"
            value={formData.email}
            handleChangeText={(e) => setFormData({ ...formData, email: e })}
          />
          <FormField
            title="Password"
            type="password"
            value={formData.password}
            handleChangeText={(e) => setFormData({ ...formData, password: e })}
          />
          <FormField
            title="Retype Password"
            type="password"
            value={formData.rePassword}
            handleChangeText={(e) =>
              setFormData({ ...formData, rePassword: e })
            }
          />
          <CustomButton
            text={isLoading ? <ActivityIndicator size="large" /> : "Sign Up"}
            containerStyles="mt-4"
            onPress={onSignUp}
          />
          <Text>
            Have an Account ?{" "}
            <Link className="text-blue underline" href="/sign-in">
              Log In
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
