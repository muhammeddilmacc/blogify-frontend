import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  sendEmailVerification,
  User
} from 'firebase/auth';
import { auth } from '@/config/firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://alicendek.onrender.com';
console.log('Current API_URL:', API_URL);

export class AuthService {
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          token: await user.getIdToken(),
          userData: {
            email: user.email,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      console.log('Login başlatılıyor...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      
      console.log('Firebase login başarılı, backend\'e istek gönderiliyor...');
      console.log('API URL:', API_URL);
      
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          id: user.uid,
          token: await user.getIdToken(),
        }),
      });

      console.log('Backend yanıtı:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error data:', errorData);
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      console.log('Login başarılı:', data);

      // Token'ları kaydet
      const token = await user.getIdToken();
      localStorage.setItem('userToken', token);
      sessionStorage.setItem('isAuthenticated', 'true');

      // Cookie kontrolü
      const cookies = document.cookie;
      console.log('Mevcut cookies:', cookies);

      // Cookie yoksa manuel olarak ayarla
      if (!cookies.includes('token=')) {
        document.cookie = `token=${token}; path=/; secure; samesite=none`;
      }

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout() {
    try {
      // Hemen yönlendirmeyi başlat
      const loginRedirect = setTimeout(() => {
        window.location.replace('/admin/login');
      }, 1000);

      console.time('logout-process');
      
      // Firebase'den çıkış yap
      await signOut(auth);

      // Backend'den çıkış yap
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        }
      }).catch(error => {
        console.error('Backend logout error:', error);
        return new Response();
      });

      // Local storage'ı temizle
      localStorage.removeItem('userToken');
      localStorage.clear();
      sessionStorage.clear();

      // Cookie'leri temizle
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Storage'ı temizle
      localStorage.clear();
      sessionStorage.clear();

      // Timeout'u temizle ve hemen yönlendir
      clearTimeout(loginRedirect);
      window.location.replace('/admin/login');
      console.timeEnd('logout-process');
      return true;
    } catch (error) {
      console.error('AuthService logout hatası:', error);
      window.location.replace('/admin/login');
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      throw error;
    }
  }

  async changePassword(user: User, newPassword: string) {
    try {
      await updatePassword(user, newPassword);
      await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          password: newPassword,
        }),
      });
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(user: User) {
    try {
      await sendEmailVerification(user);
      await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });
    } catch (error) {
      throw error;
    }
  }
} 