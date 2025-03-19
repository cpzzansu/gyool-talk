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
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import NaverLogin from "@react-native-seoul/naver-login";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const { width } = Dimensions.get("window");

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    try {
      // 로그인 요청
      await dispatch(login({ user: { userId, userPassword: password } }));
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const snsLogin = async (sns: string) => {
    const { failureResponse, successResponse } = await NaverLogin.login();
    console.log(failureResponse);
    console.log(successResponse);
  };

  const findId = () => {
    router.push("/FindId");
  };

  const resetPw = () => {
    router.push("/ResetPw");
  };

  const join = () => {
    router.push("/Join");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    logo: {
      marginTop: width * 0.2,
      width: width * 0.1,
      height: width * 0.1,
      marginBottom: width * 0.02,
      resizeMode: "contain", // 원본 비율 유지
    },
    input: {
      width: width * 0.9,
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
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: width * 0.06,
      width: "100%",
      justifyContent: "center",
    },
    line: {
      height: 0.8,
      flex: 1,
      backgroundColor: "#B1B1B1",
    },
    orText: {
      marginHorizontal: width * 0.02,
      fontSize: width * 0.04,
      color: "#414040",
    },
    loginImage: {
      width: width * 0.44,
      height: width * 0.1,
      borderRadius: 6,
      borderColor: "#858886",
      borderWidth: 0.5,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: width * 0.02,
      gap: 5,
    },
    textRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: width * 0.09,
    },
    textButton: {
      fontSize: width * 0.03,
      color: "#414040",
      marginHorizontal: width * 0.01,
    },
  });

  return (
    <ThemedView style={styles.container}>
      {/* 로고 */}
      <Image
        source={require("@/assets/images/gyoolTalk.png")}
        style={styles.logo}
      />
      <ThemedText type="title" style={{ fontSize: 24, marginBottom: 40 }}>
        귤톡
      </ThemedText>

      {/* 아이디 입력창 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={userId}
        onChangeText={setUserId}
        placeholderTextColor="#827F7F"
      />

      {/* 비밀번호 입력창 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#827F7F"
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <ThemedText style={styles.loginButtonText}>로그인</ThemedText>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* SNS 로그인 버튼들 */}
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => snsLogin("naver")}>
          <Image
            source={require("@/assets/images/naver_login.png")}
            style={styles.loginImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => snsLogin("google")}>
          <Image
            source={require("@/assets/images/google_login.png")}
            style={styles.loginImage}
          />
        </TouchableOpacity>
      </View>

      {/* 아이디 찾기, 비밀번호 재설정, 회원가입 링크 */}
      <View style={styles.textRow}>
        <TouchableOpacity onPress={findId}>
          <Text style={styles.textButton}>아이디 찾기</Text>
        </TouchableOpacity>
        <Text style={styles.textButton}> | </Text>
        <TouchableOpacity onPress={resetPw}>
          <Text style={styles.textButton}>비밀번호 재설정</Text>
        </TouchableOpacity>
        <Text style={styles.textButton}> | </Text>
        <TouchableOpacity onPress={join}>
          <Text style={styles.textButton}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
