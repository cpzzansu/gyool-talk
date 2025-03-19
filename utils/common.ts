import instance from "@/redux/apis/api";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//시간 변경 유틸
export const formatTimestamp = (timestamp: string) => {
  if (!timestamp) return "시간 정보 없음";

  let parsedTimestamp: number;

  // 공백이 포함되어 있으면 서버에서 온 날짜 형식으로 판단 (예: "2025-03-19 20:04:28.868")
  if (timestamp?.includes(" ")) {
    const formattedString = timestamp?.replace(" ", "T");
    const date = new Date(formattedString);
    if (isNaN(date.getTime())) {
      console.error("잘못된 타임스탬프 값:", timestamp);
      return "시간 정보 없음";
    }
    parsedTimestamp = date.getTime();
  } else {
    // 공백이 없으면 숫자형 문자열로 판단 (예: "1710878668868")
    parsedTimestamp = Number(timestamp);
  }

  const date = new Date(parsedTimestamp);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatDate = (timestamp: number | string): string => {
  let parsedTimestamp: number;
  if (typeof timestamp === "string") {
    if (timestamp.includes(" ")) {
      const formattedString = timestamp.replace(" ", "T");
      const date = new Date(formattedString);
      parsedTimestamp = date.getTime();
    } else {
      parsedTimestamp = Number(timestamp);
    }
  } else {
    parsedTimestamp = timestamp;
  }
  const date = new Date(parsedTimestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// GET 요청 공통 함수 - 토큰 설정시
export const getRequest = async (endpoint: string, params = {}) => {
  try {
    const response = await instance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET 요청 실패:", error);
    throw error;
  }
};

// POST 요청 공통 함수 - 토큰설정시
export const postRequest = async (endpoint: string, data = {}) => {
  try {
    const response = await instance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
};
