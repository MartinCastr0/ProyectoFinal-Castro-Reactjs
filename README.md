# Proyecto Final - PadelStore Argentina 🎾

¡Hola! Soy Lucas Castro, estudiante de CoderHouse, y este es mi proyecto final del curso de React.js.

## Sobre el Proyecto

PadelStore Argentina es un e-commerce especializado en paletas y productos de pádel. Lo desarrollé usando React.js y está pensado para ofrecer una experiencia de compra fácil y accesible para los amantes del pádel en Argentina.

### ¿Por qué elegí este tema?
Soy un apasionado del pádel y quise crear algo que combine mi hobby con lo que aprendí en el curso. La idea surgió porque veo que el pádel está creciendo muchísimo en Argentina y me pareció bueno hacer una tienda online moderna.

## Funcionalidades principales 🚀

- Catálogo de productos con filtro por categorías
- Carrito de compras
- Sistema de checkout
- Conexión con Firebase para guardar productos y órdenes
- Diseño responsive para celulares y tablets

## Tecnologías que usé 💻

- React.js
- Firebase/Firestore
- CSS para los estilos
- React Router para la navegación
- Context API para el carrito

## Cómo instalar y correr el proyecto 🛠️

Si querés subir el conjunto de productos desde `firestore_products_import.json` a Firestore desde tu máquina local, podés usar el script incluido. Este script usa el SDK de administrador (`firebase-admin`) y debe ejecutarse desde un entorno Node (no desde el navegador).

1. Colocá el archivo de servicio (service account JSON) en `landing-ecommerce/serviceAccountKey.json`.
2. Instalá las dependencias necesarias si aún no están:

```powershell
npm install firebase-admin
```

3. Ejecutá el import desde la carpeta `landing-ecommerce`:

```powershell
npm run import:products
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

1. Ir a la carpeta `landing-ecommerce` desde la terminal (ejemplo):

```powershell
cd landing-ecommerce
```

2. Instalar dependencias:

```powershell
npm install
```

3. CONFIGURACIÓN OBLIGATORIA DE FIREBASE (ENTREGA FINAL)

La evaluación final requiere que la app se conecte a Firestore. Crea un archivo `.env.local` en la carpeta `landing-ecommerce` basado en `.env.example` e incluye las variables con los valores de tu proyecto Firebase (estas variables forman la configuración de cliente de Firebase; no deben ser subidas al repo público):

```text
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

Notas importantes:
- No subas `.env.local` ni `serviceAccountKey.json` al repositorio público.
- Si el profesor te solicita verificar la conexión, comparte únicamente el contenido de `.env.local` (las variables `VITE_FIREBASE_*`) por el canal privado que el profesor indique. El archivo de cuenta de servicio (`serviceAccountKey.json`) no es necesario para que la app cliente funcione y no debe compartirse públicamente.
- Para la entrega final, asegurate de que `VITE_USE_MOCK` esté ausente o en `false` (los mocks se permiten sólo en desarrollo).

Sin estas variables la aplicación no se podrá conectar a Firestore y mostrará un error con instrucciones para configurar las variables.

4. Ejecutar en modo desarrollo:

```powershell
npm run dev
```

Notas

- El script de import (ver sección "Importar productos a Firestore") utiliza `firebase-admin` y debe ejecutarse desde Node.js en tu equipo o entorno de CI. No se usa en el navegador.
- No incluyas credenciales en el repositorio. Para entrega y evaluación, si el profesor te pide las credenciales, compartilas de forma directa (por ejemplo, enviando el contenido de `.env.local` por el medio que te indique el profesor). En el repositorio público deben permanecer solo los ejemplos (como `.env.example`).
- Nota para demostración local: si necesitás mostrar el catálogo rápidamente sin configurar Firebase, podés usar datos mock localmente. Para esto, crea `.env.local` y agrega la línea:

```text
VITE_USE_MOCK=true
```

Esto hará que la app use los productos incluidos en `src/data/mockProducts.js` (modo solo para desarrollo). RECUERDA: para la entrega final y la evaluación, tu profesor debe poder verificar la conexión real a Firestore; no dejes `VITE_USE_MOCK=true` cuando envíes/compartas credenciales para revisión.
- Asegúrate de no subir `node_modules` al repositorio. Hay un `.gitignore` en la raíz del repo.

Estructura principal
- `src/components` - Componentes de presentación
- `src/containers` - Componentes contenedores que manejan lógica y carga de datos
- `src/context` - Contexto del carrito
- `src/services` - Servicio para Firestore y configuración

