// js/categories-tags.js
import { supabase } from './supabase-config.js';

// Funciones para categorías
async function getAllCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

async function createCategory(name) {
  try {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name }])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating category:', error);
    return null;
  }
}

// Funciones para etiquetas
async function getTagsByCategory(categoryId) {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('category_id', categoryId)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

async function createTag(name, categoryId) {
  try {
    const { data, error } = await supabase
      .from('tags')
      .insert([{ name, category_id: categoryId }])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating tag:', error);
    return null;
  }
}

export { 
  getAllCategories, 
  createCategory, 
  getTagsByCategory, 
  createTag 
};