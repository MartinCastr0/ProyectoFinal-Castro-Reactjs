# PowerShell wrapper for import_products.js
# Usage: .\import_products.ps1 -ServiceKeyPath <path-to-service-account.json>
param(
  [string]$ServiceKeyPath = "serviceAccountKey.json",
  [string]$ImportJson = "firestore_products_import.json"
)

if(-Not (Get-Command node -ErrorAction SilentlyContinue)){
  Write-Error "Node.js no está instalado o no está en PATH. Instalá Node.js antes de ejecutar este script."
  exit 1
}

node .\import_products.js $ServiceKeyPath $ImportJson
