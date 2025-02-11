import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [userEmail, setUserEmail] = useState(""); // usereamil 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인증번호 상태 관리
  const { width, height } = Dimensions.get("window");
  const [authSent, setAuthSent] = useState(false); // ✅ 인증번호 발송 여부
  const [authConfirm, setAuthConfirm] = useState(false); // ✅ 인증번호 확인 여부
  const [foundId, setFoundId] = useState(""); // 찾은 아이디

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: 'center',
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    textContainer: {
      marginTop: height * 0.05,
      marginVertical: height * 0.03,
      width: "100%",
      justifyContent: "center",
      fontSize: width * 0.03,
    },
    infoText: {
      fontSize: width * 0.03,
      color: "#727272",
    },
    input: {
      width: width * 0.9,
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
    },
    authButton: {
      width: width * 0.15,
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    authButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.04,
    },
    findButton: {
      width: "100%",
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: authSent ? height * 0.005 : height * 0.015,
      gap: 5,
    },
    rowContainer2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: authConfirm ? height * 0.005 : height * 0.015,
      gap: 5,
    },
    authMessage: {
      width: "100%",
      justifyContent: "center",
      fontSize: width * 0.025,
      marginBottom: height * 0.005,
      color: "#2E970B",
    },
    checkImage: {
      width: width * 0.11,
      height: height * 0.04,
      resizeMode: "contain", // 원본 비율 유지
    },
    idContainer: {
      alignItems: "center",
      marginTop: height * 0.05,
      gap: 10,
    },
    foundIdText: {
      textAlign: "center",
      fontSize: width * 0.04,
      color: "#727272",
    },
  });

  const emailConfirm = () => {
    console.log("이메일 인증 체크");
    setAuthSent(true); // ✅ 인증번호 발송 상태 업데이트
  };

  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
    setAuthConfirm(true);
  };
  const findId = () => {
    console.log("아이디 찾기");
    const foundId = "test";
    setFoundId(foundId);
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.infoText}>
            아이디를 잊으셨나요?{"\n"}아래의 정보를 입력해주세요.
          </Text>
        </View>

        <View style={styles.rowContainer}>
          {/* 아이디 입력창 */}
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={userEmail}
            onChangeText={setUserEmail}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={emailConfirm}>
            <ThemedText style={styles.authButtonText}>인증</ThemedText>
          </TouchableOpacity>
        </View>

        {/* ✅ 인증번호 발송 메시지 */}
        {authSent && (
          <Text style={styles.authMessage}>인증번호가 발송되었습니다.</Text>
        )}

        {/* 인증번호 입력창 */}
        <View style={styles.rowContainer2}>
          <TextInput
            style={styles.input}
            placeholder="인증번호"
            secureTextEntry
            value={confirmNum}
            onChangeText={setConfirmNum}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={cofirmNumCheck}>
            <ThemedText style={styles.authButtonText}>확인</ThemedText>
          </TouchableOpacity>
        </View>

        {/* ✅ 인증번호 발송 메시지 */}
        {authConfirm && <Text style={styles.authMessage}>인증되었습니다.</Text>}

        {/* 아이디찾기 버튼 */}
        <TouchableOpacity style={styles.findButton} onPress={findId}>
          <ThemedText style={styles.authButtonText}>아이디 찾기</ThemedText>
        </TouchableOpacity>

        {foundId && (
          <View style={styles.idContainer}>
            <Image
              source={require("@/assets/images/check.png")}
              style={styles.checkImage}
            />
            <Text style={styles.foundIdText}>
              아이디는{"\n"}'{foundId}'입니다.
            </Text>
          </View>
        )}
      </ThemedView>
    </>
  );
}
