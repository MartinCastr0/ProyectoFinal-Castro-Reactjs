// Simple script to import products JSON into Firestore using Firebase Admin SDK
// Usage: node import_products.js /path/to/serviceAccountKey.json [path/to/firestore_products_import.json]

const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

async function main(){
  const servicePath = process.argv[2] || path.join(process.cwd(), 'serviceAccountKey.json')
  const importPath = process.argv[3] || path.join(__dirname, '..', 'firestore_products_import.json')

  if(!fs.existsSync(servicePath)){
    console.error('Service account key not found at', servicePath)
    console.error('Please download a service account JSON from Firebase Console and pass its path as the first argument.')
    process.exit(1)
  }
  if(!fs.existsSync(importPath)){
    console.error('Import JSON not found at', importPath)
    process.exit(1)
  }

  const serviceAccount = require(path.resolve(servicePath))
  const products = JSON.parse(fs.readFileSync(importPath, 'utf8'))

  try{
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
    const db = admin.firestore()

    const batch = db.batch()
    products.forEach(p => {
      const id = p.id ? String(p.id) : db.collection('products').doc().id
      const ref = db.collection('products').doc(id)
      // Avoid including 'id' field inside document if you prefer, Firestore doc id will be the id
      const { id: _id, ...doc } = p
      batch.set(ref, doc)
    })

    await batch.commit()
    console.log(`Imported ${products.length} products into Firestore collection 'products'.`)
    process.exit(0)
  }catch(err){
    console.error('Error importing products:', err)
    process.exit(2)
  }
}

main()
