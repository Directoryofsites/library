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

// Exportar para usar en otros archivos
export { supabase, SUPABASE_URL };