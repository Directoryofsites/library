// js/auth.js
import { supabase } from './supabase-config.js';

// Verificar contraseña (para proteger la página de alimentar.html)
// Esta es una implementación simple usando hash SHA-256
async function verifyPassword(password, correctHash) {
  try {
    // Calcular el hash de la contraseña ingresada
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Comparar con el hash correcto
    return hashHex === correctHash;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

// Función para iniciar sesión anónima (solo para la funcionalidad básica)
async function signInAnonymously() {
  try {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    return false;
  }
}

// Función para verificar si el usuario está autenticado
async function isAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

export {
  verifyPassword,
  signInAnonymously,
  isAuthenticated
};