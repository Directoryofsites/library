/**
 * Gestor de datos para la biblioteca digital Lumen Logos
 * Este archivo maneja el almacenamiento y recuperación de documentos y etiquetas
 */

// Configuración de Supabase - Deberás reemplazar estos valores con tus credenciales
const SUPABASE_URL = 'https://tu-proyecto-supabase.supabase.co';
const SUPABASE_KEY = 'tu-api-key-publica';

// Inicializar cliente de Supabase (cuando implementes la integración)
// const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Almacenamiento local para desarrollo/pruebas
const localData = {
    categories: [
        { id: 1, name: 'Libro' },
        { id: 2, name: 'Personaje' },
        { id: 3, name: 'Tema' }
    ],
    
    tags: [
        { id: 1, categoryId: 1, name: 'Salmos' },
        { id: 2, categoryId: 1, name: 'Proverbios' },
        { id: 3, categoryId: 2, name: 'David' },
        { id: 4, categoryId: 2, name: 'Salomón' },
        { id: 5, categoryId: 3, name: 'Gracia' },
        { id: 6, categoryId: 3, name: 'Fe' }
    ],
    
    documents: [
        {
            id: 1,
            title: 'Estudio sobre el Salmo 23',
            description: 'Un análisis profundo del Salmo del pastor divino',
            content: '<p>El Salmo 23 es quizás uno de los pasajes más conocidos y amados de toda la Escritura. Escrito por el rey David, este hermoso poema utiliza la metáfora del pastor para describir el cuidado de Dios hacia sus hijos.</p><p>En el primer versículo, "Jehová es mi pastor, nada me faltará", David establece inmediatamente la relación íntima con Dios. Como pastor de ovejas en su juventud, David entendía perfectamente lo que significaba este rol protector.</p><p>Los versículos siguientes desarrollan diferentes aspectos del cuidado pastoral de Dios: provisión de descanso y alimento ("En lugares de delicados pastos me hará descansar"), guía espiritual ("Junto a aguas de reposo me pastoreará"), y restauración del alma ("Confortará mi alma").</p><p>La imagen cambia sutilmente en los versículos 4-5, donde David habla del "valle de sombra de muerte" y de la mesa preparada "delante de mis angustiadores". Aquí, Dios es presentado no solo como pastor sino como protector frente a los peligros y enemigos.</p><p>El salmo concluye con la confianza de que "el bien y la misericordia" seguirán al salmista todos los días de su vida, y culmina con la esperanza de habitar en la casa de Jehová "por largos días". Este final apunta hacia una relación eterna con Dios, trascendiendo las preocupaciones temporales.</p>',
            tags: [1, 5],
            fileType: 'text',
            fileName: null,
            fileUrl: null,
            createdAt: '2025-05-15T10:30:00'
        },
        {
            id: 2,
            title: 'La vida del rey David',
            description: 'Biografía y legado del rey según el corazón de Dios',
            content: '<p>David, hijo de Isaí de Belén, es una de las figuras más prominentes del Antiguo Testamento. Su vida está marcada por extraordinarios contrastes: de pastor humilde a poderoso rey, de guerrero valiente a compositor sensible, de hombre íntegro a pecador arrepentido.</p><p>La primera aparición de David en la narrativa bíblica ocurre cuando el profeta Samuel lo unge como futuro rey de Israel (1 Samuel 16). Aunque era el menor de sus hermanos y aparentemente insignificante, Dios vio en él lo que nadie más podía ver: "Jehová no mira lo que mira el hombre; pues el hombre mira lo que está delante de sus ojos, pero Jehová mira el corazón".</p><p>La victoria de David sobre Goliat (1 Samuel 17) marcó el inicio de su vida pública. Este acto de valentía, motivado por su celo por el honor de Dios, captó la atención del rey Saúl y del pueblo. Sin embargo, la popularidad resultante provocó los celos de Saúl, iniciando un período de persecución durante el cual David demostró su respeto por la autoridad, negándose repetidamente a dañar al "ungido de Jehová".</p><p>Como rey, David unificó las tribus de Israel, conquistó Jerusalén estableciéndola como capital, y extendió las fronteras del reino. Su deseo de construir un templo para Dios, aunque no se le permitió realizarlo personalmente, reveló su profunda devoción.</p><p>El pecado de David con Betsabé y contra Urías (2 Samuel 11-12) representa el punto más oscuro de su vida. Sin embargo, su genuino arrepentimiento (reflejado en el Salmo 51) demuestra por qué Dios lo llamó "un hombre conforme a mi corazón" (Hechos 13:22) - no por su perfección, sino por su disposición a reconocer su pecado y volverse a Dios.</p><p>El legado de David incluye la dinastía que eventualmente produjo al Mesías, así como gran parte del libro de los Salmos, que continúa inspirando la adoración y la oración de creyentes alrededor del mundo.</p>',
            tags: [3],
            fileType: 'text',
            fileName: null,
            fileUrl: null,
            createdAt: '2025-05-10T14:45:00'
        },
        {
            id: 3,
            title: 'La gracia en el Nuevo Testamento',
            description: 'Exploración del concepto teológico de la gracia divina',
            content: '<p>La gracia (del griego "charis") es uno de los conceptos teológicos fundamentales del Nuevo Testamento, representando el favor inmerecido de Dios hacia la humanidad. A diferencia de la ley del Antiguo Testamento, que establecía condiciones para la aceptación divina, la gracia en el Nuevo Testamento enfatiza la iniciativa divina y el don gratuito.</p><p>El apóstol Pablo es quien más extensamente desarrolla la teología de la gracia. En Romanos 3:24, declara que somos "justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús". Esta afirmación fundamental establece que la salvación no puede ser ganada o merecida, sino que es un regalo de Dios.</p><p>En Efesios 2:8-9, Pablo refuerza esta idea: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe". Esta declaración excluye cualquier base para el orgullo humano en la salvación.</p><p>La gracia en el Nuevo Testamento no es simplemente un concepto abstracto sino que está encarnada en la persona de Jesucristo. Juan 1:14 dice que "el Verbo se hizo carne y habitó entre nosotros... lleno de gracia y de verdad". La venida de Cristo es la máxima expresión del favor inmerecido de Dios.</p><p>Además de su papel en la salvación inicial, la gracia también es presentada como el poder para la vida cristiana. Pablo escribe en 2 Corintios 12:9 que la gracia de Dios es suficiente, y que su poder se perfecciona en la debilidad. Esta "gracia capacitadora" sostiene al creyente en las pruebas y lo fortalece para el servicio.</p><p>Contrariamente a algunas interpretaciones, la gracia en el Nuevo Testamento no promueve el libertinaje moral. Como Pablo pregunta en Romanos 6:1-2: "¿Perseveraremos en el pecado para que la gracia abunde? En ninguna manera." La verdadera gracia, aunque no impone requisitos para la salvación, transforma al creyente y lo capacita para vivir en santidad.</p>',
            tags: [5, 6],
            fileType: 'text',
            fileName: null,
            fileUrl: null,
            createdAt: '2025-05-05T09:15:00'
        }
    ]
};

// API para gestionar categorías
const CategoryManager = {
    /**
     * Obtener todas las categorías
     * @returns {Promise<Array>} Lista de categorías
     */
    getAll: async function() {
        // En implementación futura: return await supabase.from('categories').select('*');
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(localData.categories);
            }, 100);
        });
    },
    
    /**
     * Crear una nueva categoría
     * @param {string} name - Nombre de la categoría
     * @returns {Promise<Object>} Nueva categoría creada
     */
    create: async function(name) {
        // En implementación futura: return await supabase.from('categories').insert([{name}]).select().single();
        return new Promise(resolve => {
            setTimeout(() => {
                const newId = localData.categories.length + 1;
                const newCategory = { id: newId, name };
                localData.categories.push(newCategory);
                resolve(newCategory);
            }, 100);
        });
    }
};

// API para gestionar etiquetas
const TagManager = {
    /**
     * Obtener todas las etiquetas
     * @returns {Promise<Array>} Lista de etiquetas
     */
    getAll: async function() {
        // En implementación futura: return await supabase.from('tags').select('*');
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(localData.tags);
            }, 100);
        });
    },
    
    /**
     * Obtener etiquetas por categoría
     * @param {number} categoryId - ID de la categoría
     * @returns {Promise<Array>} Lista de etiquetas de la categoría
     */
    getByCategory: async function(categoryId) {
        // En implementación futura: return await supabase.from('tags').select('*').eq('categoryId', categoryId);
        return new Promise(resolve => {
            setTimeout(() => {
                const filteredTags = localData.tags.filter(tag => tag.categoryId === categoryId);
                resolve(filteredTags);
            }, 100);
        });
    },
    
    /**
     * Crear una nueva etiqueta
     * @param {number} categoryId - ID de la categoría
     * @param {string} name - Nombre de la etiqueta
     * @returns {Promise<Object>} Nueva etiqueta creada
     */
    create: async function(categoryId, name) {
        // En implementación futura: return await supabase.from('tags').insert([{categoryId, name}]).select().single();
        return new Promise(resolve => {
            setTimeout(() => {
                const newId = localData.tags.length + 1;
                const newTag = { id: newId, categoryId, name };
                localData.tags.push(newTag);
                resolve(newTag);
            }, 100);
        });
    }
};

// API para gestionar documentos
const DocumentManager = {
    /**
     * Obtener todos los documentos
     * @returns {Promise<Array>} Lista de documentos
     */
    getAll: async function() {
        // En implementación futura: return await supabase.from('documents').select('*');
        return new Promise(resolve => {
            setTimeout(() => {
                // Resolver las etiquetas para cada documento
                const documentsWithTags = localData.documents.map(doc => {
                    // Obtener los objetos de etiqueta completos para cada ID de etiqueta
                    const tags = doc.tags.map(tagId => {
                        return localData.tags.find(tag => tag.id === tagId);
                    });
                    return { ...doc, tags };
                });
                resolve(documentsWithTags);
            }, 100);
        });
    },
    
    /**
     * Buscar documentos
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise<Array>} Lista de documentos que coinciden
     */
    search: async function(searchTerm) {
        // En implementación futura: implementar búsqueda en Supabase
        return new Promise(resolve => {
            setTimeout(() => {
                const term = searchTerm.toLowerCase();
                const filtered = localData.documents.filter(doc => {
                    return doc.title.toLowerCase().includes(term) ||
                           doc.description.toLowerCase().includes(term) ||
                           doc.content.toLowerCase().includes(term);
                });
                
                // Resolver las etiquetas para cada documento
                const documentsWithTags = filtered.map(doc => {
                    const tags = doc.tags.map(tagId => {
                        return localData.tags.find(tag => tag.id === tagId);
                    });
                    return { ...doc, tags };
                });
                
                resolve(documentsWithTags);
            }, 100);
        });
    },
    
    /**
     * Filtrar documentos por etiquetas
     * @param {Array} tagIds - IDs de etiquetas
     * @returns {Promise<Array>} Lista de documentos que coinciden
     */
    filterByTags: async function(tagIds) {
        // En implementación futura: implementar filtrado en Supabase
        return new Promise(resolve => {
            setTimeout(() => {
                const filtered = localData.documents.filter(doc => {
                    return doc.tags.some(tagId => tagIds.includes(tagId));
                });
                
                // Resolver las etiquetas para cada documento
                const documentsWithTags = filtered.map(doc => {
                    const tags = doc.tags.map(tagId => {
                        return localData.tags.find(tag => tag.id === tagId);
                    });
                    return { ...doc, tags };
                });
                
                resolve(documentsWithTags);
            }, 100);
        });
    },
    
    /**
     * Crear un nuevo documento
     * @param {Object} docData - Datos del documento
     * @returns {Promise<Object>} Nuevo documento creado
     */
    create: async function(docData) {
        // En implementación futura: return await supabase.from('documents').insert([docData]).select().single();
        return new Promise(resolve => {
            setTimeout(() => {
                const newId = localData.documents.length + 1;
                const newDoc = { 
                    id: newId, 
                    ...docData,
                    createdAt: new Date().toISOString()
                };
                localData.documents.push(newDoc);
                
                // Resolver las etiquetas para el documento creado
                const tags = newDoc.tags.map(tagId => {
                    return localData.tags.find(tag => tag.id === tagId);
                });
                
                resolve({ ...newDoc, tags });
            }, 100);
        });
    },
    
    /**
     * Subir un archivo
     * @param {File} file - Archivo a subir
     * @returns {Promise<Object>} Información del archivo subido
     */
    uploadFile: async function(file) {
        // En implementación futura: implementar subida de archivos a Supabase Storage
        return new Promise(resolve => {
            setTimeout(() => {
                // Simular una URL de archivo
                const fileUrl = `https://ejemplo.com/archivos/${file.name}`;
                
                resolve({
                    fileName: file.name,
                    fileUrl: fileUrl,
                    fileType: getFileType(file.name)
                });
            }, 500); // Simular tiempo de subida
        });
    }
};

/**
 * Determinar el tipo de archivo basado en su extensión
 * @param {string} fileName - Nombre del archivo
 * @returns {string} Tipo de archivo (text, pdf, audio, video, image)
 */
function getFileType(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['txt', 'docx', 'doc', 'rtf'].includes(extension)) {
        return 'text';
    } else if (extension === 'pdf') {
        return 'pdf';
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
        return 'audio';
    } else if (['mp4', 'webm', 'mov'].includes(extension)) {
        return 'video';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
        return 'image';
    } else {
        return 'other';
    }
}

// Exportar los gestores para su uso en otros archivos
window.DataManager = {
    CategoryManager,
    TagManager,
    DocumentManager
};