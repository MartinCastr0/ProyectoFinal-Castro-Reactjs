#!/usr/bin/env node
/**
 * Simple scraper for padelstore.com.ar (category "paletas").
 *
 * Output: writes JSON array to ./scripts/padelstore_products.json with objects:
 * { title, price, image, url }
 *
 * Usage (desde la carpeta landing-ecommerce):
 * npm install node-fetch@2 cheerio
 * node ./scripts/scrape_padelstore.js
 *
 * Nota: respetá los términos del sitio. Este script es para uso personal/educativo.
 */

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const BASE = 'https://www.padelstore.com.ar'
const START = '/paletas/?sort_by=created-descending'

async function fetchText(url){
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; scraper/1.0)' } })
  if(!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return await res.text()
}

function unique(arr){ return Array.from(new Set(arr)) }

async function collectProductLinks(){
  const links = []
  let page = 1
  while(true){
    const url = page === 1 ? `${BASE}${START}` : `${BASE}/paletas/page/${page}/?sort_by=created-descending`
    console.log('Fetching list:', url)
    let text
    try{ text = await fetchText(url) }catch(e){ console.error(e.message); break }
    const $ = cheerio.load(text)
    // Encuentra anchors a /productos/...
    $('a[href]').each((i,el)=>{
      const href = $(el).attr('href')
      if(href && href.includes('/productos/')) links.push(href.split('?')[0])
    })
    // comprobar si hay paginación siguiente (simple detect)
    const hasNext = text.includes(`/paletas/page/${page+1}/`)
    if(!hasNext) break
    page++
    // seguridad para no entrar en loop infinito
    if(page > 20) break
  }
  return unique(links).map(h => h.startsWith('http') ? h : (h.startsWith('/') ? BASE + h : BASE + '/' + h))
}

async function scrapeProduct(url){
  try{
    const html = await fetchText(url)
    const $ = cheerio.load(html)
    const title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') || ''
    // price: buscar el primer texto que contenga $ y números
    let price = ''
    const bodyText = $.root().text()
    const match = bodyText.match(/\$\s?[0-9]{1,3}(?:[.,][0-9]{3})*(?:[.,][0-9]{2})?/) 
    if(match) price = match[0].replace(/\s+/g,'')
    // image: og:image o primera imagen del producto
    let image = $('meta[property="og:image"]').attr('content') || ''
    if(!image){
      // busca imágenes con acdn-us.mitiendanube.com o cualquier img dentro del gallery
      image = $('img').filter((i,el)=>{ const s = $(el).attr('src')||''; return s.includes('acdn-us.mitiendanube.com')}).first().attr('src') || ''
    }
    return { url, title, price, image }
  }catch(e){ console.error('Error scraping', url, e.message); return null }
}

async function main(){
  const links = await collectProductLinks()
  console.log('Found product links:', links.length)
  const out = []
  for(let i=0;i<links.length;i++){
    const l = links[i]
    console.log(`Scraping ${i+1}/${links.length}: ${l}`)
    const item = await scrapeProduct(l)
    if(item) out.push(item)
    // pequeño delay para ser amable
    await new Promise(r => setTimeout(r, 400))
  }
  const file = path.resolve(__dirname, 'padelstore_products.json')
  fs.writeFileSync(file, JSON.stringify(out, null, 2), 'utf8')
  console.log('Wrote', file)
}

main().catch(e=>{ console.error(e); process.exit(1) })
