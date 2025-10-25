// Configuración directa para asegurar que funcione
const firebaseConfig = {
  apiKey: "AIzaSyC8bWDo6JiEWHWO16fzSavtGHnUMLAEtjs",
  authDomain: "coderhouse-ecommerce-7f4d4.firebaseapp.com",
  projectId: "coderhouse-ecommerce-7f4d4",
  storageBucket: "coderhouse-ecommerce-7f4d4.appspot.com",
  messagingSenderId: "490470822435",
  appId: "1:490470822435:web:7d0f528fa3fae9e3d32dfc"
}

// Debug: mostrar configuración (sin apiKey por seguridad)
console.log('Firebase config:', {
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket
})

export default firebaseConfig
