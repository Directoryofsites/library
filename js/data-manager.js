/**
 * data-manager.js
 * Gestiona la interacción con Supabase para todas las páginas del sitio
 */

// Comprobar si estamos en un entorno con soporte para módulos
const isModuleSupported = typeof window.importScripts === 'function' || 'import' in window;

// Variables para almacenar las referencias a Supabase
let supabaseClient = null;
let supabaseUrl = '';

// Función para inicializar el cliente de Supabase
async function initSupabase() {
    try {
        // Si ya tenemos un cliente, no hacer nada
        if (supabaseClient) return supabaseClient;
        
        // Intentar importar desde el módulo si está disponible
        if (isModuleSupported) {
            try {
                // Usamos una técnica diferente para detectar módulos
                const moduleScript = document.createElement('script');
                moduleScript.type = 'module';
                moduleScript.textContent = `
                    import * as config from './supabase-config.js';
                    window.supabaseConfig = config;
                `;
                document.head.appendChild(moduleScript);
                
                // Esperar a que se cargue el módulo
                await new Promise(resolve => setTimeout(resolve, 100));
                
                if (window.supabaseConfig) {
                    supabaseClient = window.supabaseConfig.supabase;
                    supabaseUrl = window.supabaseConfig.SUPABASE_URL;
                    return supabaseClient;
                }
            } catch (importError) {
                console.warn('No se pudo importar el módulo supabase-config.js:', importError);
            }
        }
        
        // Si no podemos usar módulos o falló la importación, intentar usar la versión global
        if (window.supabase) {
            const SUPABASE_URL = 'https://cjhbhfvkcwwpnhqixlwd.supabase.co';
            const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqaGJoZnZrY3d3cG5ocWl4bHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMTk2MjQsImV4cCI6MjA1Nzg5NTYyNH0.Db6b_riMZXmM09Bfav-iHtJBaSMX31j-eGPgnaAbI80';
            
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            supabaseUrl = SUPABASE_URL;
            return supabaseClient;
        }
        
        console.error('No se pudo inicializar Supabase - ni como módulo ni globalmente');
        return null;
    } catch (error) {
        console.error('Error al inicializar Supabase:', error);
        return null;
    }
}

// Funciones para manejar documentos
async function getRecentDocuments(limit = 6) {
    try {
        const supabase = await initSupabase();
        if (!supabase) return [];
        
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
            
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener documentos recientes:', error);
        return [];
    }
}

async function searchDocuments(searchParams = {}) {
    try {
        const supabase = await initSupabase();
        if (!supabase) return { documents: [], count: 0 };
        
        let query = supabase
            .from('documents')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });
        
        // Aplicar filtros si existen
        if (searchParams.term) {
            query = query.or(`title.ilike.%${searchParams.term}%,description.ilike.%${searchParams.term}%,content.ilike.%${searchParams.term}%`);
        }
        
        if (searchParams.tags && searchParams.tags.length > 0) {
            query = query.contains('tags', searchParams.tags);
        }
        
        if (searchParams.fileType) {
            query = query.eq('file_type', searchParams.fileType);
        }
        
        // Aplicar paginación
        if (searchParams.page && searchParams.pageSize) {
            const from = (searchParams.page - 1) * searchParams.pageSize;
            const to = from + searchParams.pageSize - 1;
            query = query.range(from, to);
        }
        
        const { data, error, count } = await query;
        
        if (error) throw error;
        return { documents: data || [], count: count || 0 };
    } catch (error) {
        console.error('Error en la búsqueda de documentos:', error);
        return { documents: [], count: 0 };
    }
}

async function getDocumentById(id) {
    try {
        const supabase = await initSupabase();
        if (!supabase) return null;
        
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener documento por ID:', error);
        return null;
    }
}

// Funciones para manejar categorías y etiquetas
async function getAllCategories() {
    try {
        const supabase = await initSupabase();
        if (!supabase) return [];
        
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name', { ascending: true });
            
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
}

async function getTagsByCategory(categoryId) {
    try {
        const supabase = await initSupabase();
        if (!supabase) return [];
        
        const { data, error } = await supabase
            .from('tags')
            .select('*')
            .eq('category_id', categoryId)
            .order('name', { ascending: true });
            
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Error al obtener etiquetas por categoría:', error);
        return [];
    }
}

// Exponer funciones al ámbito global
window.DataManager = {
    initSupabase,
    getRecentDocuments,
    searchDocuments,
    getDocumentById,
    getAllCategories,
    getTagsByCategory
};