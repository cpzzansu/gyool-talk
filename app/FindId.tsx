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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: 'center',
      padding: 20,
      backgroundColor: "#DCD7CB",
    },
    input: {
      flex: 1, // 남은 공간을 최대한 차지
      width: width * 0.9, // ✅ width, height를 여기서 사용
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: 10,
      backgroundColor: "#EFEFEF",
    },
    authButton: {
      width: width * 0.15, // 버튼 크기 지정
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    authButtonText: {
      color: "#F1F1F1",
      fontSize: 18,
    },
    findButton: {
      width: "100%",
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    textContainer: {
      marginTop: 50,
      marginVertical: 20,
      width: "100%",
      justifyContent: "center",
      fontSize: 10,
    },
    infoText: {
      marginHorizontal: 10,
      fontSize: 13,
      color: "#727272",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between", // 요소 사이에 공간을 균등 배치
      alignItems: "center",
      width: "100%", // 전체 너비를 차지하도록 설정
      marginBottom: authSent ? 2 : 18,
      gap: 5,
    },
    rowContainer2: {
      flexDirection: "row",
      justifyContent: "space-between", // 요소 사이에 공간을 균등 배치
      alignItems: "center",
      width: "100%", // 전체 너비를 차지하도록 설정
      marginBottom: authConfirm ? 2 : 18,
      gap: 5,
    },
    authMessage: {
      width: "100%",
      justifyContent: "center",
      fontSize: 10,
      marginBottom: 2,
      color: "#2E970B", // 파란색으로 강조
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
      </ThemedView>
    </>
  );
}
