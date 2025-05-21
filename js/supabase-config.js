// js/supabase-config.js
const SUPABASE_URL = 'https://cjhbhfvkcwwpnhqixlwd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaGJoZnZrY3d3cG5ocWl4bHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTk2MjQsImV4cCI6MjA1Nzg5NTYyNH0.Db6b_riMZXmM09Bfav-iHtJBaSMX31j-eGPgnaAbI80';

// Crear el cliente de Supabase
let supabase;

// Comprobar si estamos en un navegador
if (typeof window !== 'undefined' && window.supabaseJs) {
    supabase = window.supabaseJs.createClient(SUPABASE_URL, SUPABASE_KEY);
} else if (typeof window !== 'undefined' && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Función para comprobar si hay una sesión guardada
function checkSession() {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('lumen_logos_session') === 'true';
    }
    return false;
}

// Función para establecer una sesión
function setSession(active = true) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('lumen_logos_session', active);
        return true;
    }
    return false;
}

// Función para cerrar sesión
function clearSession() {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('lumen_logos_session');
        return true;
    }
    return false;
}

// Exportar para usar en otros archivos
export { supabase, SUPABASE_URL, checkSession, setSession, clearSession };