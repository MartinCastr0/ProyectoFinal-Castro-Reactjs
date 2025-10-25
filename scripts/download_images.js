const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')

const outDir = path.join(__dirname, '..', 'public')

const images = [
  { file: 'paleta1.jpg', url: 'https://dunlopsports.com/wp-content/uploads/2023/08/Gx-4000-pro_Varlion-negra.jpg' },
  { file: 'paleta2.jpg', url: 'https://dunlopsports.com/wp-content/uploads/2023/08/Avant-Difusor-Carrera-Varlion.jpg' },
  { file: 'paleta3.jpg', url: 'https://dunlopsports.com/wp-content/uploads/2019/09/PALA-NOX-ML10-PRO-CUP-ARENA.jpg' },
  { file: 'paleta4.jpg', url: 'https://dunlopsports.com/wp-content/uploads/2019/09/PALA-NOX-LUXURY-L4-PRO.jpg' },
  { file: 'paleta5.jpg', url: 'https://www.centralsport.es/24744-thickbox_default/pala-de-padel-adidas-metalbone-ctrl-30.jpg' },
  { file: 'paleta6.jpg', url: 'https://www.centralsport.es/27898-thickbox_default/pala-padel-nox-at10-luxury-genius-arena-18k-2022.jpg' },
  { file: 'paleta7.jpg', url: 'https://www.padelnuestro.com/images/products/pala-head-alpha-pro-2022-0.jpg' },
  { file: 'paleta8.jpg', url: 'https://www.padelnuestro.com/images/products/pala-bullpadel-ionic-power-2023-0.jpg' },
  { file: 'paleta9.jpg', url: 'https://www.padelnuestro.com/images/products/pala-adidas-metalbone-ctrl-3.1-2023.jpg' },
  { file: 'paleta10.jpg', url: 'https://www.padelnuestro.com/images/products/pala-babolat-technical-viper-2023-0.jpg' },
  { file: 'acc1.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-3-0c7448a9bd22d1358a17420936814793-1024-1024.webp' },
  { file: 'acc2.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-4-5369d27aeb3b2f2b1742093681-1024-1024.webp' },
  { file: 'acc3.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-5-25b77dcebd87d808f217420936844636-1024-1024.webp' },
  { file: 'acc4.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-6-4cc647dd135b2ddf2c17420936846875-1024-1024.webp' },
  { file: 'acc5.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-7-fa94b67d2f78b2eada17420936832993-1024-1024.webp' },
  { file: 'ropa1.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/funda-nox-negra-1-3c83d14b3c90540b7617420940652933-1024-1024.webp' },
  { file: 'ropa2.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-1-ea19e9d5955ffca66f17420935118958-1024-1024.webp' },
  { file: 'ropa3.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-2-9f7f6e2aefb698ead617420936831025-1024-1024.webp' },
  { file: 'ropa4.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-3-0c7448a9bd22d1358a17420936814793-1024-1024.webp' },
  { file: 'ropa5.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-4-5369d27aeb3b2f2b1742093681-1024-1024.webp' },
  { file: 'combo1.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-5-25b77dcebd87d808f217420936844636-1024-1024.webp' },
  { file: 'combo2.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-6-4cc647dd135b2ddf2c17420936846875-1024-1024.webp' },
  { file: 'combo3.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/paleta-nox-future-attack-12k-alum-eva-7-fa94b67d2f78b2eada17420936832993-1024-1024.webp' },
  { file: 'combo4.jpg', url: 'https://acdn-us.mitiendanube.com/stores/919/712/products/funda-nox-negra-1-3c83d14b3c90540b7617420940652933-1024-1024.webp' }
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // redirect
        return resolve(download(res.headers.location, dest))
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`))
      }
      const file = fs.createWriteStream(dest)
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
      file.on('error', (err) => reject(err))
    })
    req.on('error', reject)
  })
}

;(async function(){
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  for (const img of images) {
    const dest = path.join(outDir, img.file)
    process.stdout.write(`Downloading ${img.url} -> ${dest} ... `)
    try {
      await download(img.url, dest)
      console.log('OK')
    } catch (err) {
      console.log('ERR')
      console.error(err.message)
    }
  }
  console.log('Done')
})()
