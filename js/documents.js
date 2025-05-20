// js/documents.js
import { supabase, SUPABASE_URL } from './supabase-config.js';

// Función para subir archivos al bucket
async function uploadFile(file) {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `documents/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('biblioteca-documentos')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Obtener URL pública
    const fileURL = `${SUPABASE_URL}/storage/v1/object/public/biblioteca-documentos/${filePath}`;
    
    return {
      fileName,
      filePath,
      fileURL
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

// Función para crear un documento en la base de datos
async function createDocument(documentData) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([documentData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating document:', error);
    return null;
  }
}

// Función para buscar documentos
async function searchDocuments(searchParams = {}) {
  try {
    let query = supabase
      .from('documents')
      .select('*')
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
    return { documents: data, count };
  } catch (error) {
    console.error('Error searching documents:', error);
    return { documents: [], count: 0 };
  }
}

// Función para obtener un documento por ID
async function getDocumentById(id) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching document:', error);
    return null;
  }
}

export {
  uploadFile,
  createDocument,
  searchDocuments,
  getDocumentById
};