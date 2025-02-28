import instance from "@/redux/apis/api";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
