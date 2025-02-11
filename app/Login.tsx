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
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen() {
  const [userId, setUserId] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const navigation = useNavigation(); // navigation 객체
  const { width, height } = Dimensions.get("window");

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const login = () => {
    if (userId.trim() === "") {
      showAlert("아이디 입력 확인", "아이디가 입력되지 않았습니다.");
    } else if (password.trim() === "") {
      showAlert("비밀번호 입력 확인", "비밀번호가 입력되지 않았습니다.");
    } else {
      axios
        .post("http://localhost:8080/login", { id: userId, pwd: password })
        .then(function (resp: any) {
          console.log(resp.data);
          if (resp.data !== null && resp.data != "") {
            console.log("로그인 성공");
          } else {
            showAlert("로그인 실패", "아이디나 비밀번호를 확인하세요.");
            setUserId("");
            setPassword("");
          }
        })
        .catch(function (err: any) {
          console.log(`Error Message: ${err}`);
        });
    }
  };

  const snsLogin = (sns: string) => {
    console.log(`${sns} 로그인`);
  };

  const findId = () => {
    navigation.navigate("FindId");
  };

  const resetPw = () => {
    navigation.navigate("ResetPw");
  };

  const join = () => {
    navigation.navigate("Join");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    logo: {
      marginTop: height * 0.1,
      width: width * 0.1,
      height: width * 0.1,
      marginBottom: height * 0.01,
      resizeMode: "contain", // 원본 비율 유지
    },
    input: {
      width: width * 0.9, // ✅ width, height를 여기서 사용
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
    orContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: height * 0.03,
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
      height: height * 0.04,
      borderRadius: 6,
      borderColor: "#858886",
      borderWidth: 0.5,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: height * 0.01,
      gap: 5,
    },
    textRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: height * 0.04,
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
      <TouchableOpacity style={styles.loginButton} onPress={login}>
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
