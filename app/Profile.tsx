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
import { login } from "@/redux/slices/auth/authThunk";
import { AppDispatch } from "@/redux/store";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isProfile, setIsprofile] = useState(false);
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const { width, height } = Dimensions.get("window");
  const imgUrl = "../assets/images/cat.jpg";
  const handleLogin = () => {
    setIsprofile(!isProfile);
  };

  const updateNickName = () => {
    //router.push("/NickName");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    logo: {
      marginTop: width * 0.217,
      width: width * 0.32,
      height: width * 0.32,
      marginBottom: width * 0.02,
      resizeMode: "contain", // 원본 비율 유지
    },
    profileImg: {
      marginTop: width * 0.217,
      width: width * 0.32,
      height: width * 0.32,
      marginBottom: width * 0.02,
      borderRadius: 100,
    },
    inputView: {
      width: width * 0.9,
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: width * 0.03,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputKey: { color: "#2b2b2b" },
    inputValue: { color: "#827F7F" },
    nickName: {
      position: "absolute",
      right: width * 0.08,
    },
    input: {
      width: width * 0.9,
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: height * 0.015,
    },
    loginButton: {
      width: width * 0.9,
      height: height * 0.05,
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
      {/* 로고 */}
      <Image
        source={
          isProfile ? require(imgUrl) : require("@/assets/images/gyoolTalk.png")
        }
        style={isProfile ? styles.profileImg : styles.logo}
      />
      {/* 닉네임  확인*/}
      <TouchableOpacity onPress={updateNickName}>
        <View style={styles.inputView}>
          <Text style={styles.inputKey}>닉네임</Text>
          <Text style={[styles.inputValue, styles.nickName]}>
            test닉네임입니다용
          </Text>
          <Image source={require("@/assets/images/icon/right-arrow.png")} />
        </View>
      </TouchableOpacity>
      {/* 아이디  확인*/}
      <View style={styles.inputView}>
        <Text style={styles.inputKey}>아이디</Text>
        <Text style={styles.inputValue}>test1</Text>
      </View>
      {/* 이메일  확인*/}
      <View style={styles.inputView}>
        <Text style={styles.inputKey}>이메일</Text>
        <Text style={styles.inputValue}>test@test.com</Text>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <ThemedText style={styles.loginButtonText}>로그인</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}
