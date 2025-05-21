// tag-handler.js
// Funciones auxiliares para manejar etiquetas en la biblioteca digital

// Procesa las etiquetas de un documento para asegurar que siempre sean un array
function getDocumentTags(doc) {
    // Si tiene tags_array, usar eso primero
    if (doc.tags_array && Array.isArray(doc.tags_array)) {
        return doc.tags_array.map(tag => Number(tag));
    }
    
    if (!doc || !doc.tags) return [];
    
    // Si ya es un array, usarlo directamente
    if (Array.isArray(doc.tags)) {
        return doc.tags.map(tag => Number(tag));
    }
    
    // Si es un número o string, convertirlo a array
    if (typeof doc.tags === 'number' || typeof doc.tags === 'string') {
        return [Number(doc.tags)];
    }
    
    // Si tiene all_tags, procesarlo (retrocompatibilidad)
    if (doc.all_tags) {
        if (Array.isArray(doc.all_tags)) {
            return [...(Array.isArray(doc.tags) ? doc.tags : [Number(doc.tags)]), 
                   ...doc.all_tags.map(t => Number(t))];
        } else if (typeof doc.all_tags === 'string') {
            try {
                const parsed = JSON.parse(doc.all_tags);
                if (Array.isArray(parsed)) {
                    return [...(Array.isArray(doc.tags) ? doc.tags : [Number(doc.tags)]), 
                           ...parsed.map(t => Number(t))];
                }
            } catch (e) {
                console.error("Error parsing all_tags:", e);
            }
        }
    }
    
    // Si nada más funciona, devolver un array con un solo elemento
    return [Number(doc.tags)];
}

// Verifica si un documento contiene todas las etiquetas seleccionadas
function documentHasAllTags(doc, selectedTagIds) {
    if (!selectedTagIds || selectedTagIds.length === 0) return true;
    
    const docTags = getDocumentTags(doc);
    return selectedTagIds.every(tagId => docTags.includes(tagId));
}

// Genera HTML para mostrar las etiquetas de un documento
function generateTagsHtml(doc, tagsMap = {}) {
    const docTags = getDocumentTags(doc);
    if (docTags.length === 0) return '';
    
    let tagsHtml = '';
    docTags.forEach(tagId => {
        const tagName = tagsMap[tagId] || `Etiqueta ${tagId}`;
        tagsHtml += `<span class="document-tag">${tagName}</span>`;
    });
    
    return tagsHtml;
}

// Exponer las funciones globalmente
window.getDocumentTags = getDocumentTags;
window.documentHasAllTags = documentHasAllTags;
window.generateTagsHtml = generateTagsHtml;