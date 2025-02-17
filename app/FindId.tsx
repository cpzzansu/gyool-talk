import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import * as common from "@/utils/common";

export default function LoginScreen() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [userEmail, setUserEmail] = useState(""); // usereamil 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인증번호 상태 관리
  const { width, height } = Dimensions.get("window");
  const [authSent, setAuthSent] = useState(false); // ✅ 인증번호 발송 여부
  const [authConfirm, setAuthConfirm] = useState(false); // ✅ 인증번호 확인 여부
  const [foundId, setFoundId] = useState(false); // 찾은 아이디

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: 'center',
      padding: width * 0.05,
      backgroundColor: "#DCD7CB",
    },
    textContainer: {
      marginTop: width * 0.1,
      marginVertical: width * 0.06,
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
      height: width * 0.1,
      borderRadius: 3,
      paddingHorizontal: width * 0.03,
      backgroundColor: "#EFEFEF",
    },
    authButton: {
      width: width * 0.15,
      height: width * 0.1,
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
      height: width * 0.1,
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
      marginBottom: authSent ? width * 0.01 : width * 0.032,
      gap: 5,
    },
    rowContainer2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginBottom: authConfirm ? width * 0.01 : width * 0.032,
      gap: 5,
    },
    authMessage: {
      width: "100%",
      justifyContent: "center",
      fontSize: width * 0.025,
      marginBottom: width * 0.01,
      color: "#2E970B",
    },
    checkImage: {
      width: width * 0.11,
      height: height * 0.086,
      resizeMode: "contain", // 원본 비율 유지
    },
    idContainer: {
      alignItems: "center",
      marginTop: width * 0.1,
      gap: 10,
    },
    foundIdText: {
      textAlign: "center",
      fontSize: width * 0.04,
      color: "#727272",
    },
  });

  const showAlert = (message: string) => {
    if (Platform.OS === "web") {
      window.alert(message);
    } else {
      Alert.alert(message);
    }
  };

  const emailConfirm = async () => {
    if (!userEmail) {
      showAlert("이메일을 입력해주세요.");
      return;
    }
    if (!common.isValidEmail(userEmail)) {
      showAlert("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/user/confirmEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const result = await response.status;

      if (result.valueOf() == 200) {
        setAuthSent(true); // 인증번호 발송 상태 업데이트
        showAlert("인증번호가 발송되었습니다.");
      } else if (result.valueOf() == 404) {
        showAlert("등록되지 않은 Email입니다. 다시 확인해주세요.");
        setAuthSent(false);
        setUserEmail("");
      } else {
        showAlert("이메일 인증 요청 실패. 다시 시도해주세요.");
        setUserEmail("");
        setAuthSent(false);
      }
    } catch (error) {
      console.error("이메일 인증 요청 오류:", error);
      showAlert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
    }
  };

  const cofirmNumCheck = async () => {
    if (!confirmNum) {
      showAlert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/checkAuthNum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, authNum: confirmNum }),
      });

      const result = await response.json();

      if (result) {
        setAuthConfirm(true); // 인증번호 발송 상태 업데이트
      } else {
        showAlert("인증번호가 올바르지 않습니다.");
        setAuthConfirm(false);
        setConfirmNum("");
      }
    } catch (error) {
      console.error("이메일 인증 확인 오류:", error);
      showAlert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
    }
  };

  const findId = async () => {
    if (authSent && authConfirm) {
      try {
        const response = await fetch("http://localhost:8080/user/findId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const result = await response.json();

        if (result.userId != null) {
          setFoundId(result.userId);
        } else {
          showAlert("인증번호가 올바르지 않습니다.");
          setAuthConfirm(false);
          setConfirmNum("");
        }
      } catch (error) {
        console.error("이메일 인증 확인 오류:", error);
        showAlert("서버 오류가 발생했습니다. 관리자에게 문의하세요.");
      }
    }
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <View style={styles.textContainer}>
          <ThemedText style={styles.infoText}>
            아이디를 잊으셨나요?{"\n"}아래의 정보를 입력해주세요.
          </ThemedText>
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
