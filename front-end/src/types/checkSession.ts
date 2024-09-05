import axios from "axios";

export const checkSession = async (): Promise<boolean> => {
  try {
    const response = await axios.get("http://localhost:5000/check-session", {
      withCredentials: true,
    });

    return response.data.loggedIn; // 로그인 상태 반환
  } catch (error) {
    console.error("Session check error:", error);
    return false; // 세션 확인 실패 시 false 반환
  }
};
