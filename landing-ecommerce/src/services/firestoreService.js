// Servicio simple para interactuar con Firestore o usar datos mock si no hay config
import { mockProducts } from '../data/mockProducts'

let useFirebase = false
let db = null

try {
  // Import firebase solo si está instalado y configurado en tiempo de ejecución
  // esto evita fallos durante la instalación sin credenciales
  // eslint-disable-next-line import/no-unresolved
  const { initializeApp } = require('firebase/app')
  const { getFirestore, collection, getDocs, getDoc, doc, addDoc } = require('firebase/firestore')
  const firebaseConfig = require('./firebaseConfig').default
  const app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  useFirebase = true
} catch (e) {
  useFirebase = false
}

export async function fetchProducts(){
  if(!useFirebase){
    // Simular delay
    await new Promise(r => setTimeout(r, 500))
    return mockProducts
  }
  const { collection, getDocs } = await import('firebase/firestore')
  const col = collection(db, 'products')
  const snapshot = await getDocs(col)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function fetchProductById(id){
  if(!useFirebase){
    await new Promise(r => setTimeout(r, 300))
    return mockProducts.find(p => p.id === id)
  }
  const { doc, getDoc } = await import('firebase/firestore')
  const ref = doc(db, 'products', id)
  const snapshot = await getDoc(ref)
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
}

export async function createOrder(order){
  if(!useFirebase){
    await new Promise(r => setTimeout(r, 400))
    return { id: 'MOCK-' + Date.now(), ...order }
  }
  const { collection, addDoc } = await import('firebase/firestore')
  const ref = collection(db, 'orders')
  const docRef = await addDoc(ref, order)
  return { id: docRef.id }
}
