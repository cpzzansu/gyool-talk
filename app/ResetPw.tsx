import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState, useEffect } from "react";

export default function LoginScreen() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [userId, setUserId] = useState(""); // userid 상태 관리
  const [userEmail, setUserEmail] = useState(""); // useremail 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인증번호 상태 관리
  const [newPassword, setNewPassword] = useState(""); //새로운 비밀번호 상태 관리
  const [newPasswordChk, setNewPasswordChk] = useState(""); //새로운 비밀번호 상태 관리
  const [authSent, setAuthSent] = useState(false); // ✅ 인증번호 발송 여부
  const [authConfirm, setAuthConfirm] = useState(false); // ✅ 인증번호 확인 여부
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부 관리
  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
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
      marginBottom: height * 0.015,
    },
    input2: {
      width: width * 0.9,
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
    },
    input3: {
      width: width * 0.9,
      height: height * 0.05,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
      marginBottom: passwordsMatch ? height * 0.015 : height * 0.005,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between", // 요소 사이에 공간을 균등 배치
      width: "100%", // 전체 너비를 차지하도록 설정
      marginBottom: authSent ? height * 0.005 : height * 0.015,
      gap: 5,
    },
    rowContainer2: {
      flexDirection: "row",
      justifyContent: "space-between", // 요소 사이에 공간을 균등 배치
      width: "100%", // 전체 너비를 차지하도록 설정
      marginBottom: authConfirm ? height * 0.005 : height * 0.015,
      gap: 5,
    },
    authButton: {
      width: width * 0.15, // 버튼 크기 지정
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    cancelButton: {
      paddingHorizontal: width * 0.03, // 버튼 크기를 내용에 맞게 설정
      flex: 1,
      width: width * 0.43, // 버튼 크기 지정
      height: height * 0.05,
      backgroundColor: "#FAFAFA",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    cancelButtonText: {
      color: "#585858", // 취소 버튼의 텍스트 색상을 주황색으로 변경
      fontSize: width * 0.035,
      fontWeight: "bold",
    },
    changeButton: {
      paddingHorizontal: width * 0.03, // 버튼 크기를 내용에 맞게 설정
      flex: 1,
      width: width * 0.43, // 버튼 크기 지정
      height: height * 0.05,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    buttonText: {
      color: "#F1F1F1",
      fontSize: width * 0.035,
      fontWeight: "bold",
    },
    rowContainer3: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%", // 전체 너비를 사용하여 균등 정렬
      marginBottom: height * 0.015,
      gap: 5,
    },
    authMessage: {
      width: "100%",
      justifyContent: "center",
      fontSize: width * 0.025,
      marginBottom: height * 0.005,
      color: "#2E970B",
    },
    authMessage2: {
      width: "100%",
      justifyContent: "center",
      fontSize: width * 0.025,
      marginBottom: height * 0.005,
      color: "#D60303",
    },
  });

  // 비밀번호 확인 일치 여부 확인
  useEffect(() => {
    if (newPassword !== newPasswordChk) {
      setPasswordsMatch(false); // 일치하지 않으면 false
    } else {
      setPasswordsMatch(true); // 일치하면 true
    }
  }, [newPassword, newPasswordChk]); // 비밀번호나 확인 비밀번호가 변경될 때마다 확인

  const emailConfirm = () => {
    console.log("이메일 인증 체크");
    setAuthSent(true); // ✅ 인증번호 발송 상태 업데이트
  };

  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
    setAuthConfirm(true);
  };
  const cancel = () => {
    console.log("비밀번호 재설정 취소");
  };
  const resetPw = () => {
    if (passwordsMatch) {
      console.log("비밀번호 재설정 success!");
    } else {
      console.log("비밀번호 재설정 fail!");
    }
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.infoText}>
            비밀번호를 잊으셨나요?{"\n"}아래의 정보를 입력해주세요.
          </Text>
        </View>

        {/* 아이디 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={userId}
          onChangeText={setUserId}
          placeholderTextColor="#827F7F"
        />

        {/* 인증번호 입력창 */}
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input2}
            placeholder="이메일"
            value={userEmail}
            onChangeText={setUserEmail}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={emailConfirm}>
            <ThemedText style={styles.buttonText}>인증</ThemedText>
          </TouchableOpacity>
        </View>

        {/* ✅ 인증번호 발송 메시지 */}
        {authSent && (
          <Text style={styles.authMessage}>인증번호가 발송되었습니다.</Text>
        )}

        <View style={styles.rowContainer2}>
          <TextInput
            style={styles.input2} // 가변 크기 적용
            placeholder="인증번호"
            value={confirmNum}
            onChangeText={setConfirmNum}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={cofirmNumCheck}>
            <ThemedText style={styles.buttonText}>확인</ThemedText>
          </TouchableOpacity>
        </View>

        {/* ✅ 인증번호 발송 메시지 */}
        {authConfirm && <Text style={styles.authMessage}>인증되었습니다.</Text>}

        {/* 비밀번호 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="새로운 비밀번호"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#827F7F"
        />

        {/* 비밀번호 확인 입력창 */}
        <TextInput
          style={styles.input3}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={newPasswordChk}
          onChangeText={setNewPasswordChk}
          placeholderTextColor="#827F7F"
        />

        {/* 비밀번호 불일치 메시지 */}
        {!passwordsMatch && (
          <Text style={styles.authMessage2}>비밀번호가 일치하지 않습니다.</Text>
        )}

        <View style={styles.rowContainer3}>
          {/* 비밀번호 변경&취소 버튼 */}
          <TouchableOpacity
            style={styles.cancelButton}
            //onPress={handleLogin}
          >
            <ThemedText style={styles.cancelButtonText} onPress={cancel}>
              취소
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeButton}
            //onPress={handleLogin}
          >
            <ThemedText style={styles.buttonText} onPress={resetPw}>
              변경
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </>
  );
}
