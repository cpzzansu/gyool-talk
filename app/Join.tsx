import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Platform,
  Dimensions,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { join } from "@/redux/slices/auth/authThunk";
import { AppDispatch } from "@/redux/store";

export default function LoginScreen() {
  const { width, height } = Dimensions.get("window");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [userId, setUserId] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const [passwordChk, setPasswordChk] = useState(""); // 비밀번호확인 상태 관리
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인정번호 상태 관리
  const [nickname, setNickName] = useState(""); // 닉네임 상태 관리

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 아이디 중복 여부
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 아이디 중복 여부
  const [isConfirm, setIsConfirm] = useState(false); // 아이디 중복 여부

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // 아이디 중복 체크
  const idCheck = () => {
    if (userId.trim() == "") {
      showAlert("회원가입", "아이디를 입력해주세요.");
      setIsDuplicate(null);
      return;
    }
    axios
      .post("http://localhost:8080/join/idCheck", { id: userId.trim() })
      .then(function (resp: any) {
        console.log(resp.data);
        if (resp.data) {
          setIsDuplicate(true);
          setUserId("");
        } else {
          setIsDuplicate(false);
        }
      })
      .catch(function (err: any) {
        console.log(`Error Message: ${err}`);
      });
  };

  //이메일 확인
  const emailConfirm = () => {
    if (!email.includes("@")) {
      showAlert("회원가입", "이메일 주소가 유효하지 않습니다.");
      return;
    }
    axios
      .post("http://localhost:8080/user/confirmEmail", { email: email })
      .then(function (resp: any) {
        console.log(resp.data);
        if (resp.data) {
          showAlert("회원가입", "인증번호가 발송되었습니다.");
          setIsConfirm(true);
        } else {
          showAlert("회원가입", "잠시후 다시 시도 해주세요.");
        }
      })
      .catch(function (err: any) {
        console.log(`Error Message: ${err}`);
      });
  };

  //인증번호 확인 todo)) 로직 연결
  const cofirmNumCheck = () => {
    if (!isConfirm) {
      showAlert("회원가입", "이메일 인증버튼을 눌러주세요");
      return;
    }
    console.log("인증번호 확인 체크");

    axios
      .post("http://localhost:8080/join/checkConfimNum", {
        confirmNum: confirmNum,
      })
      .then(function (resp: any) {
        console.log(resp.data);
        if (resp.data) {
          setIsCorrect(false);
        } else {
          setIsCorrect(true);
        }
      })
      .catch(function (err: any) {
        console.log(`Error Message: ${err}`);
      });
  };
  //닉네임 길이 확인
  const maxLength = 16;
  //회원가입
  const joinCheck = async () => {
    let header = "회원가입";
    let message = "완료되었습니다.";
    if (userId.trim() == "") {
      message = "아이디를 입력하세요";
    } else if (isDuplicate == null) {
      message = "아이디 중복확인 해주세요";
    } else if (password.trim() == "") {
      message = "비밀번호를 입력해주세요";
    } else if (passwordChk.trim() == "") {
      message = "비밀번호 확인 입력해주세요";
    } else if (password.trim() != passwordChk.trim()) {
      message = "비밀번호가 일치 하지 않습니다";
    } else if (!isConfirm) {
      message = "이메일 인증이 필요합니다";
    } else if (isCorrect == null) {
      message = "인증번호 확인이 필요합니다";
    } else if (nickname == "") {
      message = "닉네임을 입력해주세요";
    } else {
      handlejoin();
    }

    showAlert(header, message);
  };

  const handlejoin = async () => {
    const result = await dispatch(
      join({
        user: {
          userId,
          userPassword: password,
          userEmail: email,
          userNickName: nickname,
        },
      }),
    );

    // 📌 회원가입 성공 시, 특정 페이지로 이동
    if (result.payload.data === true) {
      router.push("/Login"); // 회원가입 성공 후 이동
    } else {
      alert("회원가입에 실패했습니다.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: width * 0.045,
      backgroundColor: "#DCD7CB",
    },
    defaultExplain: {
      width: width * 0.35,
      height: height * 0.08,
      fontSize: width * 0.06,
      marginLeft: width * 0.07,
      marginTop: height * 0.05,
      marginBottom: height * 0.07,
      fontWeight: "500",
    },
    largeMb: {
      marginBottom: height * 0.017,
    },
    smallMb: {
      marginBottom: height * 0.006,
    },
    inputGrp: {
      paddingHorizontal: width * 0.01,
      backgroundColor: "#DCD7CB",
      width: "100%",
    },
    inputBlock: {
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: width * 0.027,
      backgroundColor: "#EFEFEF",
      flex: 1,
    },
    buttonBlock: {
      width: width * 0.15,
      backgroundColor: "#EF7417",
      marginLeft: width * 0.03,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
    },
    input: {
      width: "100%",
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: width * 0.027,
      backgroundColor: "#EFEFEF",
    },
    twoBlock: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    title: {
      fontSize: width * 0.054,
      marginBottom: width * 0.027,
    },
    checkText: {
      color: "#F1F1F1",
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    maxLength: {
      marginBottom: width * 0.03,
      textAlign: "right",
      color: "#827F7F",
    },
    joinButton: {
      width: "100%",
      height: height * 0.048,
      backgroundColor: "#EF7417",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 3,
      marginTop: height * 0.079,
    },
    joinButtonText: {
      color: "#F1F1F1",
      fontSize: width * 0.045,
      fontWeight: "bold",
    },
    okId: {
      fontSize: width * 0.029,
      color: "#299f0f",
    },
    duplId: {
      fontSize: width * 0.029,
      color: "#d61212",
    },
    isText: {
      display: "flex",
      flexDirection: "column",
    },
  });
  return (
    <>
      <ThemedView style={styles.container}>
        {/*기본 정보*/}
        <View style={{ width: width }}>
          <ThemedText type="title" style={styles.defaultExplain}>
            기본 정보를{"\n"} 입력하세요.
          </ThemedText>
        </View>
        <ThemedView style={styles.inputGrp}>
          {/* 아이디 입력창 */}
          <View style={[styles.isText, styles.largeMb]}>
            <View style={[styles.twoBlock]}>
              <TextInput
                style={styles.inputBlock}
                placeholder="아이디"
                value={userId}
                onChangeText={setUserId}
                placeholderTextColor="#827F7F"
              />
              <TouchableOpacity style={styles.buttonBlock} onPress={idCheck}>
                <ThemedText style={styles.checkText}>확인</ThemedText>
              </TouchableOpacity>
            </View>
            {isDuplicate !== null && (
              <ThemedText style={isDuplicate ? styles.duplId : styles.okId}>
                {isDuplicate
                  ? "사용 중인 아이디입니다."
                  : "사용 가능한 아이디입니다."}
              </ThemedText>
            )}
          </View>
          {/* 비밀번호 입력창 */}
          <TextInput
            style={[styles.input, styles.smallMb]}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#827F7F"
          />
          <TextInput
            style={[styles.input, styles.largeMb]}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordChk}
            onChangeText={setPasswordChk}
            placeholderTextColor="#827F7F"
          />

          {/* 이메일 입력창 */}
          <View style={[styles.twoBlock, styles.smallMb]}>
            <TextInput
              style={styles.inputBlock}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#827F7F"
            />
            <TouchableOpacity style={styles.buttonBlock} onPress={emailConfirm}>
              <ThemedText style={styles.checkText}>인증</ThemedText>
            </TouchableOpacity>
          </View>
          {/* 인증번호 입력창 */}
          <View style={[styles.isText, styles.largeMb]}>
            <View style={styles.twoBlock}>
              <TextInput
                style={styles.inputBlock}
                placeholder="인증번호"
                value={confirmNum}
                onChangeText={setConfirmNum}
                placeholderTextColor="#827F7F"
              />
              <TouchableOpacity
                style={styles.buttonBlock}
                onPress={cofirmNumCheck}
              >
                <ThemedText style={styles.checkText}>확인</ThemedText>
              </TouchableOpacity>
            </View>
            {isCorrect !== null && (
              <ThemedText style={isCorrect ? styles.duplId : styles.okId}>
                {isCorrect ? "인증번호를 확인해주세요." : "인증되었습니다."}
              </ThemedText>
            )}
          </View>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={setNickName}
            maxLength={maxLength}
            placeholderTextColor="#827F7F"
          />
          <Text style={styles.maxLength}>
            {nickname.length}/{maxLength} {/* 현재 길이 / 최대 길이 표시 */}
          </Text>
        </ThemedView>
        {/*회원가입 버튼*/}
        <TouchableOpacity style={styles.joinButton} onPress={joinCheck}>
          <ThemedText style={styles.joinButtonText}>회원가입</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}
