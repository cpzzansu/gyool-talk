import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [userId, setUserId] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리

  const login = () => {
    console.log("아이디 로그인");
  };
  const snsLogin = (sns) => {
    console.log(`${sns} 로그인`);
  };
  const findId = () => {
    console.log("아이디 찾기");
  };
  const resetPw = () => {
    console.log("비밀번호 재설정");
  };
  const join = () => {
    console.log("회원가입");
  };

  return (
    <>
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

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => snsLogin("naver")}>
            <Image
              source={require("@/assets/images/naver_login.png")} // 이미지 경로
              style={styles.loginImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => snsLogin("google")}>
            <Image
              source={require("@/assets/images/google_login.png")} // 이미지 경로
              style={styles.loginImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.textRow}>
          <TouchableOpacity onPress={() => findId}>
            <Text style={styles.textButton}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.textButton}> | </Text>
          <TouchableOpacity onPress={() => resetPw}>
            <Text style={styles.textButton}>비밀번호 재설정</Text>
          </TouchableOpacity>
          <Text style={styles.textButton}> | </Text>
          <TouchableOpacity onPress={() => join}>
            <Text style={styles.textButton}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: 'center',
    padding: 20,
    backgroundColor: "#DCD7CB",
  },
  headerStyle: {
    backgroundColor: "#DCD7CB",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  logo: {
    marginTop: 110,
    width: 44,
    height: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: "98%",
    height: 46,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 15,
  },
  loginButton: {
    width: "98%",
    height: 45,
    backgroundColor: "#EF7417",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  loginButtonText: {
    color: "#F1F1F1",
    fontSize: 18,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    justifyContent: "center",
  },
  line: {
    height: 0.8,
    flex: 1,
    backgroundColor: "#B1B1B1",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#414040",
  },
  loginImage: {
    width: 190, // 원하는 크기
    height: 41,
    borderRadius: 6,
    borderColor: "#858886",
    borderWidth: 0.5,
  },
  rowContainer: {
    flexDirection: "row", // 가로 정렬
    justifyContent: "space-around", // 요소 간격 조정 (center, space-around 등 가능)
    alignItems: "center", // 수직 정렬
    marginTop: 5, // 위쪽 여백
    gap: 5,
  },
  textRow: {
    flexDirection: "row", // 가로 정렬
    justifyContent: "center", // 가운데 정렬
    alignItems: "center", // 수직 정렬
    marginTop: 20, // 위쪽 여백
  },
  textButton: {
    fontSize: 14,
    color: "#414040",
    marginHorizontal: 3, // 좌우 간격 추가
  },
});
