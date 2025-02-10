import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
  const { width, height } = Dimensions.get("window");
  const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
  const [username, setUsername] = useState(""); // 아이디 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 상태 관리
  const [passwordChk, setPasswordChk] = useState(""); // 비밀번호확인 상태 관리
  const [email, setEmail] = useState(""); // 이메일 상태 관리
  const [confirmNum, setConfirmNum] = useState(""); // 인정번호 상태 관리
  const [nickname, setNickName] = useState(""); // 닉네임 상태 관리

  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null); // 아이디 중복 여부
  const [isConfirm, setIsIsConfirm] = useState<boolean | null>(null); // 아이디 중복 여부

  const idCheck = () => {
    console.log("아이디 중복체크");
    const randomValue = Math.random() < 0.5 ? 0 : 1;
    if (randomValue == 0) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }
  };

  const emailConfirm = () => {
    console.log("이메일 인증 체크");
    setIsIsConfirm(true);
  };
  const cofirmNumCheck = () => {
    console.log("인증번호 확인 체크");
  };
  const join = () => {
    console.log(width);
    console.log(height);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      padding: 20,
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
    inputBlock: {
      width: width * 0.725,
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: 10,
      backgroundColor: "#EFEFEF",
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
      width: width * 0.91,
      height: height * 0.048,
      borderRadius: 3,
      paddingHorizontal: 10,
      backgroundColor: "#EFEFEF",
    },
    group: {
      marginTop: 13,
      width: "100%",
    },
    twoBlock: {
      display: "flex",
      flexDirection: "row",
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
    oneBlock: {
      width: "82.8%",
      height: 46,
      borderRadius: 3,
      paddingHorizontal: 10,
      backgroundColor: "#EFEFEF",
    },
    checkBtn: {
      width: "17.2%",
      height: 45,
      marginLeft: 14,
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
      marginTop: 50,
    },
    joinButtonText: {
      color: "#F1F1F1",
      fontSize: 20,
      fontWeight: "bold",
    },
    chkMsg: {
      width: "97%",
      lineHeight: 13,
      fontSize: 13,
      marginTop: 5,
    },
    okId: {
      color: "#299f0f",
    },
    duplId: {
      color: "#d61212",
    },
  });
  return (
    <>
      <ThemedView style={styles.container}>
        {/*기본 정보*/}
        <View style={{ width: width }}>
          <ThemedText type="title" style={styles.defaultExplain}>
            기본 정보를 입력하세요.
          </ThemedText>
        </View>

        {/* 아이디 입력창 */}
        <View style={styles.twoBlock}>
          <TextInput
            style={styles.inputBlock}
            placeholder="아이디"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.buttonBlock} onPress={idCheck}>
            <ThemedText style={styles.checkText}>확인</ThemedText>
          </TouchableOpacity>
        </View>
        {isDuplicate !== null && (
          <ThemedText
            style={[isDuplicate ? styles.duplId : styles.okId, styles.chkMsg]}
          >
            {isDuplicate
              ? "사용 중인 아이디입니다."
              : "사용 가능한 아이디입니다."}
          </ThemedText>
        )}
        {/* 비밀번호 입력창 */}
        <TextInput
          style={[styles.input]}
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

        {/* 이메일 입력창 */}
        <View style={[styles.twoBlock]}>
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
        {isConfirm !== null && (
          <ThemedText style={[styles.okId, styles.chkMsg]}>
            인증 메일이 발송되었습니다.
          </ThemedText>
        )}
        {/* 인증번호 입력창 */}
        <View style={[styles.twoBlock]}>
          <TextInput
            style={styles.inputBlock}
            placeholder="인증번호"
            value={confirmNum}
            onChangeText={setConfirmNum}
            placeholderTextColor="#827F7F"
          />
          <TouchableOpacity style={styles.buttonBlock} onPress={cofirmNumCheck}>
            <ThemedText style={styles.checkText}>확인</ThemedText>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
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
