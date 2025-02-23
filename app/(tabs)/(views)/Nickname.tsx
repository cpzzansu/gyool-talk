import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  Platform,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/reducer";

export default function LoginScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const userNickname = useSelector(
    (state: RootState) => state.auth.userNickname,
  );
  const [nickname, setUserNickname] = useState("");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    input: {
      width: width * 0.9, // ✅ width, height를 여기서 사용
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: width * 0.03,
    },
    loginButton: {
      width: width * 0.9,
      height: width * 0.1,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    loginButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.04,
    },
  });

  return (
    <ThemedView style={styles.container}>
      {/* 이메일  확인*/}
      <View>
        <TextInput
          style={styles.input}
          placeholder={userNickname}
          value={nickname}
          onChangeText={setUserNickname}
          placeholderTextColor="#827F7F"
        />
      </View>
    </ThemedView>
  );
}
