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
  const [userId, setUserId] = useState(""); // userid 상태 관리
  const [userEmail, setUserEmail] = useState(""); // useremail 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인증번호 상태 관리
  const [newPassword, setNewPassword] = useState(""); //새로운 비밀번호 상태 관리
  const [newPasswordChk, setNewPasswordChk] = useState(""); //새로운 비밀번호 상태 관리

  const emailConfirm = () => {
    console.log("이메일 인증 체크");
  };
  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
  };
  const cancel = () => {
    console.log("비밀번호 재설정 취소");
  };
  const resetPw = () => {
    console.log("비밀번호 재설정");
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
            style={styles.input}
            placeholder="이메일"
            value={userEmail}
            onChangeText={setUserEmail}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={emailConfirm}>
            <ThemedText style={styles.buttonText}>인증</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input} // 가변 크기 적용
            placeholder="인증번호"
            value={confirmNum}
            onChangeText={setConfirmNum}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.authButton} onPress={cofirmNumCheck}>
            <ThemedText style={styles.buttonText}>확인</ThemedText>
          </TouchableOpacity>
        </View>

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
          style={styles.input}
          placeholder="비밀번호 확인"
          secureTextEntry
          value={newPasswordChk}
          onChangeText={setNewPasswordChk}
          placeholderTextColor="#827F7F"
        />

        <View style={styles.rowContainer2}>
          {/* 아이디찾기 버튼 */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#DCD7CB",
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
  input: {
    width: "100%", // 가로 폭을 최대한 사용
    height: 46,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "100%", // 전체 너비 사용
    gap: 5,
  },
  authButton: {
    paddingHorizontal: 15, // 버튼 크기를 내용에 맞게 설정
    height: 45,
    backgroundColor: "#EF7417",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  cancelButton: {
    paddingHorizontal: 15, // 버튼 크기를 내용에 맞게 설정
    flex: 1,
    height: 45,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  cancelButtonText: {
    color: "#585858", // 취소 버튼의 텍스트 색상을 주황색으로 변경
    fontSize: 16,
  },
  changeButton: {
    paddingHorizontal: 15, // 버튼 크기를 내용에 맞게 설정
    flex: 1,
    height: 45,
    backgroundColor: "#EF7417",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  buttonText: {
    color: "#F1F1F1",
    fontSize: 16,
    fontWeight: "bold",
  },
  rowContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", // 전체 너비를 사용하여 균등 정렬
    marginBottom: 15,
    gap: 5,
  },
});
