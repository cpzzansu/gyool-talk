import {
  Button,
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
  const [username, setUsername] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const [passwordChk, setPasswordChk] = useState(""); // 비밀번호확인 상태 관리
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인정번호 상태 관리
  const [nickname, setNickName] = useState(""); // 닉네임 상태 관리

  const idCheck = () => {
    console.log("아이디 중복체크");
  };
  const emailConfirm = () => {
    console.log("이메일 인증 체크");
  };
  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
  };
  const join = () => {
    console.log("회원가입");
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <View style={{ width: "100%" }}>
          <ThemedText
            type="title"
            style={{
              fontSize: 24,
              marginBottom: 60,
              width: "38%",
              marginTop: 40,
            }}
          >
            기본 정보를 입력하세요.
          </ThemedText>
        </View>
        {/* 아이디 입력창 */}
        <View style={styles.twoBlock}>
          <TextInput
            style={styles.id}
            placeholder="아이디"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.checkBtn} onPress={idCheck}>
            <ThemedText style={styles.checkText}>확인</ThemedText>
          </TouchableOpacity>
        </View>

        {/* 비밀번호 입력창 */}
        <View style={styles.group}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#827F7F"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordChk}
            onChangeText={setPasswordChk}
            placeholderTextColor="#827F7F"
          />
        </View>

        <View style={styles.group}>
          {/* 이메일 입력창 */}
          <View style={styles.twoBlock}>
            <TextInput
              style={styles.id}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#827F7F"
            />
            <TouchableOpacity style={styles.checkBtn} onPress={emailConfirm}>
              <ThemedText style={styles.checkText}>인증</ThemedText>
            </TouchableOpacity>
          </View>
          {/* 인증번호 입력창 */}
          <View style={styles.twoBlock}>
            <TextInput
              style={styles.id}
              placeholder="인증번호"
              value={confirmNum}
              onChangeText={setConfirmNum}
              placeholderTextColor="#827F7F"
            />
            <TouchableOpacity style={styles.checkBtn} onPress={cofirmNumCheck}>
              <ThemedText style={styles.checkText}>확인</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          style={{ ...styles.input, marginTop: "13px" }}
          placeholder="닉네임"
          secureTextEntry
          value={nickname}
          onChangeText={setNickName}
          placeholderTextColor="#827F7F"
        />
        {/*회원가입 버튼*/}
        <TouchableOpacity style={styles.joinButton} onPress={join}>
          <ThemedText style={styles.joinButtonText}>회원가입</ThemedText>
        </TouchableOpacity>
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
  group: {
    marginTop: "13px",
    width: "100%",
  },
  twoBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
  id: {
    width: "82.8%",
    height: 46,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 46,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 15,
  },
  checkBtn: {
    width: "17.2%",
    height: 45,
    marginLeft: "14px",
    backgroundColor: "#EF7417",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  checkText: {
    color: "#F1F1F1",
    fontSize: 20,
    fontWeight: "bold",
  },
  joinButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#EF7417",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginTop: "50px",
  },
  joinButtonText: {
    color: "#F1F1F1",
    fontSize: 20,
    fontWeight: "bold",
  },
});
