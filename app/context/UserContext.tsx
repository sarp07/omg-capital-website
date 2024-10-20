"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Şifreleme için gerekli kütüphane
import { jwtDecode, JwtPayload } from "jwt-decode"; // JWT decode kütüphanesi

// Şifreleme için bir gizli anahtar (secret key)
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "default_secret_key";

// Kullanıcı bilgilerini tutacak arayüz
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  activeSession: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean }>;
  register: (
    name: string,
    surname: string,
    email: string,
    gender: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Şifreleme fonksiyonu
const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

// Şifre çözme fonksiyonu
const decryptToken = (encryptedToken: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Token decryption failed:", error);
    return null;
  }
};

// Token süresinin dolup dolmadığını kontrol eden fonksiyon
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // JWT token decode ediliyor
    const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman
    return decoded.exp ? decoded.exp < currentTime : true; // Token süresi dolmuş mu kontrol edilir
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Hata olursa, token süresi dolmuş varsayılır
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSession, setActiveSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Register function
  const register = async (
    name: string,
    surname: string,
    email: string,
    gender: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/auth/register`,
        {
          name,
          surname,
          email,
          gender,
          username,
          password,
        }
      );

      if (response.status === 201) {
        console.log("Kayıt başarıyla tamamlandı:", response.data.message);
      } else {
        console.error("Kayıt sırasında bir sorun oluştu:", response.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Kayıt başarısız:", error.response.data.message);
        } else {
          console.error("Axios error occurred:", error.message);
        }
      } else if (error instanceof Error) {
        console.error("Kayıt sırasında bir hata oluştu:", error.message);
      } else {
        console.error("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  // Register Investor function
  const register_investor = async (
    name: string,
    surname: string,
    email: string,
    gender: string,
    birthDate: string,
    phoneNumber: string,
    city: string,
    province: string,
    profession: string,
    monthlyIncome: string
  ) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/investors`, {
        name,
        surname,
        email,
        gender,
        birthDate,
        phoneNumber,
        city,
        province,
        profession,
        monthlyIncome,
      });

      if (response.status === 201) {
        console.log("Kayıt başarıyla tamamlandı:", response.data.message);
      } else {
        console.error("Kayıt sırasında bir sorun oluştu:", response.data);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Kayıt başarısız:", error.response.data.message);
        } else {
          console.error("Axios error occurred:", error.message);
        }
      } else if (error instanceof Error) {
        console.error("Kayıt sırasında bir hata oluştu:", error.message);
      } else {
        console.error("Bilinmeyen bir hata oluştu.");
      }
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean }> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const { token } = response.data;
      const encryptedToken = encryptToken(token);
      localStorage.setItem("encrypted_token", encryptedToken);

      // Profil bilgilerini al
      const profileResponse = await axios.get(
       `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(profileResponse.data);
      setActiveSession(true); // Oturum aktif olarak işaretleniyor
      return { success: true };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error occurred:");
        console.error("Status Code:", error.response?.status);
        console.error("Response Data:", error.response?.data);
        console.error("Headers:", error.response?.headers);
      } else if (error instanceof Error) {
        console.error("Login failed:", error.message);
      } else {
        console.error("Login failed: An unknown error occurred.");
      }

      return { success: false };
    }
  };

  // Logout function
  const logout = () => {
    const encryptedToken = localStorage.getItem("encrypted_token");
    if (encryptedToken) {
      const token = decryptToken(encryptedToken);
      if (token) {
        localStorage.removeItem("encrypted_token");
        setUser(null);
        setActiveSession(false); // Oturum pasif olarak işaretleniyor
      } else {
        console.error("Failed to decrypt token");
      }
    } else {
      console.error("No token found in localStorage");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const encryptedToken = localStorage.getItem("encrypted_token");
      if (encryptedToken) {
        const token = decryptToken(encryptedToken);
        if (token && !isTokenExpired(token)) {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_REACT_TEMPLATE_BACKEND_URL}/api/auth/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setUser(response.data);
            setActiveSession(true);
          } catch (error) {
            console.error("Kullanıcı profili yüklenemedi:", error);
            logout();
          }
        } else {
          console.error("Token geçersiz veya süresi dolmuş.");
          logout();
        }
      }
      setIsLoading(false); // Load işlemi tamamlandığında
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, activeSession, isLoading, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
