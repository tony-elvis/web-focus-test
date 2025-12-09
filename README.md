# Web Focus Test

Proyecto React con Vite, TailwindCSS y React Router.

## 🚀 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📦 Deploy

### Opción 1: Vercel (Recomendado)

1. **Instalar Vercel CLI** (si no lo tienes):
```bash
npm i -g vercel
```

2. **Deploy desde la terminal**:
```bash
vercel
```

3. **Deploy a producción**:
```bash
vercel --prod
```

**O desde la interfaz web:**
- Ve a [vercel.com](https://vercel.com)
- Conecta tu repositorio de GitHub
- Vercel detectará automáticamente Vite
- Click en "Deploy"

### Opción 2: Netlify

1. **Instalar Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Deploy**:
```bash
netlify deploy --prod
```

**O desde la interfaz web:**
- Ve a [netlify.com](https://netlify.com)
- Arrastra la carpeta `dist` después de hacer `npm run build`

### Opción 3: GitHub Pages

1. **Instalar gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Agregar al package.json**:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Deploy**:
```bash
npm run deploy
```

## 🔧 Variables de Entorno

Crear archivo `.env` en la raíz:
```env
VITE_API_URL=tu_api_url
```

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo (puerto 3002)
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint
- `npm run lint:fix` - Corregir errores de ESLint
- `npm run format` - Formatear código con Prettier
