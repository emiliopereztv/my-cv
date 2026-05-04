# 🚀 Guía de Configuración en GitHub

## Paso 1: Crear un Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com)
2. Inicia sesión con tu cuenta (EmilioPerezTV)
3. Haz clic en el botón **"+"** en la esquina superior derecha
4. Selecciona **"New repository"**

## Paso 2: Configurar el Repositorio

### Opción A: Repositorio Personal (Recomendado)
- **Nombre del repositorio**: `CURRICULUM`
- **Descripción**: "Currículum profesional de Emilio Pérez"
- **Visibilidad**: Public
- **Inicializar con README**: No (ya tenemos uno)

### Opción B: GitHub Pages (Sitio Principal)
- **Nombre del repositorio**: `EmilioPerezTV.github.io`
- **Descripción**: "Currículum profesional"
- **Visibilidad**: Public

## Paso 3: Clonar el Repositorio Localmente

```bash
# Opción A (CURRICULUM)
git clone https://github.com/EmilioPerezTV/CURRICULUM.git
cd CURRICULUM

# Opción B (GitHub Pages)
git clone https://github.com/EmilioPerezTV/EmilioPerezTV.github.io.git
cd EmilioPerezTV.github.io
```

## Paso 4: Copiar Archivos

Copia todos los archivos del proyecto a la carpeta clonada:
- `index.html`
- `styles.css`
- `script.js`
- `Currículum.pdf`
- `PERFIL - EMILIO PEREZ FONDO BLANCO.jpg`
- `README.md`
- `.gitignore`
- `_config.yml`
- `.htaccess`

## Paso 5: Configurar Git Localmente

```bash
# Configurar usuario (si es la primera vez)
git config --global user.name "Emilio Pérez"
git config --global user.email "emilioperezoficial@gmail.com"

# Verificar configuración
git config --global --list
```

## Paso 6: Subir Archivos a GitHub

```bash
# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Currículum profesional inicial"

# Subir a GitHub
git push origin main
```

## Paso 7: Habilitar GitHub Pages

### Para repositorio CURRICULUM:
1. Ve a **Settings** del repositorio
2. En el menú izquierdo, selecciona **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Selecciona rama **main** y carpeta **/ (root)**
5. Haz clic en **Save**

### Para repositorio EmilioPerezTV.github.io:
- GitHub Pages se habilita automáticamente

## Paso 8: Acceder a tu Página

### Opción A (CURRICULUM):
```
https://EmilioPerezTV.github.io/CURRICULUM/
```

### Opción B (GitHub Pages):
```
https://EmilioPerezTV.github.io/
```

## 📝 Comandos Git Útiles

### Ver estado
```bash
git status
```

### Ver historial de commits
```bash
git log
```

### Actualizar cambios locales
```bash
git pull origin main
```

### Crear una rama nueva
```bash
git checkout -b nombre-rama
```

### Cambiar de rama
```bash
git checkout nombre-rama
```

### Fusionar ramas
```bash
git merge nombre-rama
```

### Deshacer cambios
```bash
git checkout -- archivo.txt
```

### Eliminar archivo
```bash
git rm archivo.txt
git commit -m "Eliminar archivo"
git push origin main
```

## 🔄 Actualizar Contenido

Cada vez que hagas cambios:

```bash
# 1. Ver cambios
git status

# 2. Agregar cambios
git add .

# 3. Crear commit
git commit -m "Descripción de cambios"

# 4. Subir a GitHub
git push origin main
```

## 🌐 Dominio Personalizado (Opcional)

Si deseas usar un dominio personalizado:

1. Ve a **Settings** → **Pages**
2. En **Custom domain**, ingresa tu dominio
3. Configura los registros DNS en tu proveedor de dominio

## 🔐 Tokens de Acceso Personal

Si GitHub pide autenticación:

1. Ve a **Settings** → **Developer settings** → **Personal access tokens**
2. Haz clic en **Generate new token**
3. Selecciona permisos: `repo`, `workflow`
4. Copia el token
5. Usa el token como contraseña en Git

## 📊 Verificar Despliegue

1. Ve a **Settings** → **Pages**
2. Verifica que el sitio esté publicado
3. Haz clic en el enlace para acceder

## 🐛 Solucionar Problemas

### Error: "fatal: not a git repository"
```bash
git init
git remote add origin https://github.com/EmilioPerezTV/CURRICULUM.git
```

### Error: "Permission denied (publickey)"
- Configura SSH keys en GitHub
- O usa HTTPS en lugar de SSH

### Cambios no se reflejan
- Espera 1-2 minutos para que GitHub Pages se actualice
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Fuerza recarga (Ctrl+F5)

## 📚 Recursos Útiles

- [Documentación de GitHub Pages](https://docs.github.com/en/pages)
- [Guía de Git](https://git-scm.com/doc)
- [GitHub CLI](https://cli.github.com/)

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos correctamente
- [ ] GitHub Pages habilitado
- [ ] Página accesible en línea
- [ ] Foto de perfil visible
- [ ] PDF descargable
- [ ] Enlaces de redes sociales funcionan
- [ ] Diseño responsivo en móvil
- [ ] Animaciones funcionan correctamente

---

**¡Tu currículum está listo para ser compartido con el mundo! 🎉**
