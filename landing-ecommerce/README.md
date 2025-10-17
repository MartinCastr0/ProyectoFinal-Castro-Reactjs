# Proyecto Final - TodoPadel (E-commerce de paletas y accesorios)

Autor: Martin Castro
Curso: Proyecto Final - React
Fecha de entrega: 17/10/2025

Este proyecto es una Single Page Application para TodoPadel, una tienda de paletas y accesorios, construida con React y Vite. Incluye:

Las imágenes de productos usan hotlinks de Unsplash para propósitos de demostración. Si querés usar tus propias imágenes, reemplazá las URLs en `src/data/mockProducts.js` y/o subí las imágenes a Firebase Storage y actualizá los documentos en Firestore.

Importar productos a Firestore (opcional)

1. Colocá el archivo de servicio (service account JSON) en `landing-ecommerce/serviceAccountKey.json`.
2. Instalá las dependencias necesarias si aún no están:

```powershell
npm.cmd install firebase-admin
```

3. Ejecutá el import desde la raíz del proyecto:

```powershell
npm.cmd run import:products
```

El script subirá `firestore_products_import.json` a la colección `products`.

Diseño y recursos
- Agregué un logo simple en `public/logo.svg` y una paleta de colores para que la app luzca más como una tienda.
 
Nota sobre marcas y contenido: Este proyecto académico incluye nombres de productos y marcas reales (por ejemplo: Varlion, Nox, Adidas, Bullpadel, Babolat) únicamente con fines demostrativos y académicos. Las imágenes utilizadas son de Unsplash y se usan como ejemplos visuales; si necesitás usar imágenes oficiales de marcas, asegurate de tener los derechos o usar recursos proporcionados por las marcas.

- Listado y detalle dinámico de productos.
- Carrito de compras gestionado por Context.
- Integración básica con Firestore (opcional). Si no configuras Firebase, el proyecto usa datos mock.
- Checkout que genera una orden (mock o real en Firestore).

Requisitos mínimos
- Node.js y npm instalados

Instalación y ejecución

1. Ir a la carpeta `landing-ecommerce`:

```powershell
Set-Location -Path "C:\Users\juani\OneDrive\Desktop\NavegaLasRutas-Castro-main\landing-ecommerce"
```

2. Instalar dependencias:

```powershell
npm install
```

3. Crear un archivo `.env.local` con tus credenciales de Firebase (opcional):

```text
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Ejecutar en modo desarrollo:

```powershell
npm run dev
```

Notas

- Si no configuras Firebase, la app funcionará con datos mock incluidos en `src/data/mockProducts.js`.
- Asegúrate de no subir `node_modules` al repositorio. Ya agregué un `.gitignore` en la raíz del repo.

Estructura principal
- `src/components` - Componentes de presentación
- `src/containers` - Componentes contenedores que manejan lógica y carga de datos
- `src/context` - Contexto del carrito
- `src/services` - Servicio para Firestore y configuración

