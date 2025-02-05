import { Button, StyleSheet, Image, TouchableOpacity, TextInput, View, Text, Alert } from "react-native";
import { Stack, useRouter} from "expo-router";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import { useState } from "react";

export default function LoginScreen() {
    const router = useRouter(); // 페이지 이동을 위한 useRouter 사용
    const [username, setUsername] = useState(""); // 아이디 상태 관리
    const [password, setPassword] = useState(""); // 비밀번호 상태 관리


    const handlePress = () => {
        Alert.alert('이미지 버튼 클릭됨');
    };


    return (
        <>
            <ThemedView style={styles.container}>
                <View style={{width: '100%'}}>
                    <ThemedText type="title" style={{fontSize: 24, marginBottom: 40 ,width :'38%'}}>기본 정보를 입력하세요.</ThemedText>
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
                    <TouchableOpacity style={styles.checkBtn}
                        //onPress={handleLogin}
                    >
                        <ThemedText style={styles.checkText}>확인</ThemedText>
                    </TouchableOpacity>
                </View>
                {/* 비밀번호 입력창 */}
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
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#827F7F"
                />

                {/* 이메일 입력창 */}
                <View style={styles.twoBlock}>
                    <TextInput
                        style={styles.id}
                        placeholder="이메일"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#827F7F"
                    />
                    <TouchableOpacity style={styles.checkBtn}
                        //onPress={handleLogin}
                    >
                        <ThemedText style={styles.checkText}>인증</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* 인증번호 입력창 */}
                <View style={styles.twoBlock}>
                    <TextInput
                        style={styles.id}
                        placeholder="인증번호"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#827F7F"
                    />
                    <TouchableOpacity style={styles.checkBtn}
                        //onPress={handleLogin}
                    >
                        <ThemedText style={styles.checkText}>확인</ThemedText>
                    </TouchableOpacity>
                </View>
                {/* 로그인 버튼 */}
                {/*<TouchableOpacity style={styles.loginButton}*/}
                {/*    //onPress={handleLogin}*/}
                {/*>*/}
                {/*    <ThemedText style={styles.loginButtonText}>로그인</ThemedText>*/}
                {/*</TouchableOpacity>*/}

            </ThemedView>
        </>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        padding: 20,
        backgroundColor: '#DCD7CB',
    },
    twoBlock :{
      width : '100%',
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'center'
    },
    logo: {
        marginTop: 110,
        width: 44,
        height: 48,
        marginBottom: 10
    },
    title:{
        fontSize: 24,
        marginBottom: 10
    },
    id: {
        width: "80.8%",
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
        marginLeft: '14px',
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
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        width: '100%',
        justifyContent: 'center',
    },
    line: {
        height: 0.8,
        flex: 1,
        backgroundColor: '#B1B1B1',
    },
    orText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#414040',
    },
    loginImage: {
        width: 196,  // 원하는 크기
        height: 41,
        borderRadius: 6,
        borderColor: '#858886',
        borderWidth: 1,

    },
});



