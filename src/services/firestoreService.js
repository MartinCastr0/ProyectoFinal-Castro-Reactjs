// Este archivo maneja toda la conexión con Firebase
// Lo hice así después de ver el after class donde explicaron buenas prácticas
// Si no están las variables de entorno de Firebase, tira error con instrucciones
// (profe, las variables están en el .env.local que mandé por el chat de la clase)

import { mockProducts } from '../data/mockProducts'

let db = null
const REQUIRED_ENV_VARS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID'
]

const hasFirebaseConfig = REQUIRED_ENV_VARS.every(k => Boolean(import.meta.env[k]))

// Para debug
console.log('Firebase config:', {
  hasConfig: hasFirebaseConfig,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
})

// Deshabilitamos completamente el uso de mocks para la entrega final
const useMock = false

async function ensureInit(){
  console.log('Iniciando ensureInit...')
  if(useMock) {
    console.log('Usando mock, saltando inicialización')
    return
  }
  
  console.log('Verificando configuración de Firebase:', {
    hasConfig: hasFirebaseConfig,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
  })
  
  if(!hasFirebaseConfig){
    const missing = REQUIRED_ENV_VARS.filter(k => !Boolean(import.meta.env[k])).join(', ')
    console.error('Faltan variables de entorno:', missing)
    throw new Error([
      'Firebase no está configurado. Para la entrega final la conexión a Firestore es obligatoria.',
      'Crea un archivo `.env.local` en la carpeta `landing-ecommerce` basado en `.env.example` y define las siguientes variables con los valores de tu proyecto Firebase:',
      REQUIRED_ENV_VARS.map(k => `  - ${k}`).join('\n'),
      '',
      `Variables faltantes detectadas: ${missing}`,
      '',
      'Importante: las credenciales de cliente (VITE_FIREBASE_*) pueden compartirse con el profesor por el canal que indique (no subirlas al repositorio). No incluyas el archivo de cuenta de servicio (`serviceAccountKey.json`) en el repo público.'
    ].join('\n'))
  }
  if(db) return
  const { initializeApp } = await import('firebase/app')
  const { getFirestore } = await import('firebase/firestore')
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

export async function fetchProducts(){
  try {
    await ensureInit()
    const { collection, getDocs } = await import('firebase/firestore')
    const snapshot = await getDocs(collection(db, 'products'))
    
    if (snapshot.empty) {
      console.log('No hay productos en Firestore, usando datos mock')
      return mockProducts
    }
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return mockProducts
  }

  try{
    while (retryCount < MAX_RETRIES) {
      try {
        console.log(`Intento ${retryCount + 1} de ${MAX_RETRIES} de conectar a Firebase...`)
        await ensureInit()
        console.log('Firebase inicializado correctamente')
        
        const { collection, getDocs, connectFirestoreEmulator } = await import('firebase/firestore')
    
    // Para debug: mostrar el estado de la conexión
    console.log('Estado de conexión:', {
      online: navigator.onLine,
      db: db ? 'initialized' : 'not initialized',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
    })
    
    console.log('Obteniendo colección products...')
    const col = collection(db, 'products')
    console.log('Ejecutando getDocs...')
    const snapshot = await getDocs(col)
    console.log('Documentos obtenidos:', snapshot.size)
    
    if (snapshot.empty) {
      console.log('No se encontraron productos, usando datos mock')
      return mockProducts
    }
    
    const defaultImage = 'https://via.placeholder.com/400x400?text=Producto+no+disponible'
    const products = snapshot.docs.map(d => {
      const data = d.data()
      return {
        id: d.id,
        ...data,
        image: data.image || defaultImage // Si la imagen no existe, usar la imagen por defecto
      }
    })
    console.log('Productos procesados:', products)
    return products
      } catch (error) {
        console.error(`Intento ${retryCount + 1} falló:`, error)
        retryCount++
        if (retryCount < MAX_RETRIES) {
          console.log(`Esperando ${RETRY_DELAY/1000} segundos antes de reintentar...`)
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
          continue
        }
        throw error
      }
      break // Si llegamos aquí, la conexión fue exitosa
    }
  } catch (error) {
    console.error('Error al obtener productos después de', MAX_RETRIES, 'intentos:', error)
    console.error('Detalles del error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    })
    
    // Si hay un error después de todos los reintentos, usar datos mock
    console.log('Error en Firestore, usando datos mock como fallback')
    return mockProducts
  }
}

export async function fetchProductById(id){
  if(useMock){
    await new Promise(r => setTimeout(r, 200))
    return mockProducts.find(p => p.id === id)
  }
  await ensureInit()
  const { doc, getDoc } = await import('firebase/firestore')
  const ref = doc(db, 'products', id)
  const snapshot = await getDoc(ref)
  if (!snapshot.exists()) return null
  
  const defaultImage = 'https://via.placeholder.com/400x400?text=Producto+no+disponible'
  const data = snapshot.data()
  return {
    id: snapshot.id,
    ...data,
    image: data.image || defaultImage // Si la imagen no existe, usar la imagen por defecto
  }
}

export async function createOrder(order){
  if(useMock){
    await new Promise(r => setTimeout(r, 300))
    return { id: 'MOCK-' + Date.now(), ...order }
  }
  await ensureInit()
  const { collection, addDoc } = await import('firebase/firestore')
  const ref = collection(db, 'orders')
  const docRef = await addDoc(ref, order)
  return { id: docRef.id }
}
