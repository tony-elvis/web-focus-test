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

### Desarrollo Local

Edita el archivo `.env` en la raíz:
```env
VITE_BACKEND_URL=http://localhost:3001
```

### Deploy en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://tu-app-backend.herokuapp.com`
   - **Environment**: Production (y opcionalmente Preview y Development)
4. Redeploy el proyecto

### Deploy en Netlify

1. Ve a Site settings → Environment variables
2. Agrega:
   - **Key**: `VITE_BACKEND_URL`
   - **Value**: `https://tu-app-backend.herokuapp.com`
3. Redeploy el sitio

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo (puerto 3002)
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint
- `npm run lint:fix` - Corregir errores de ESLint
- `npm run format` - Formatear código con Prettier
