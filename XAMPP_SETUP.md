# 🖥️ Guía de Configuración en XAMPP

## Requisitos Previos

- XAMPP instalado (descarga desde [apachefriends.org](https://www.apachefriends.org/))
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Acceso a la carpeta `C:\xampp\htdocs\`

## Paso 1: Instalar XAMPP

1. Descarga XAMPP desde [apachefriends.org](https://www.apachefriends.org/)
2. Ejecuta el instalador
3. Selecciona componentes (Apache es obligatorio)
4. Elige la carpeta de instalación (por defecto: `C:\xampp\`)
5. Completa la instalación

## Paso 2: Crear Carpeta del Proyecto

1. Abre el Explorador de Archivos
2. Navega a: `C:\xampp\htdocs\`
3. Crea una nueva carpeta llamada: `CURRICULUM`
4. La ruta completa será: `C:\xampp\htdocs\CURRICULUM\`

## Paso 3: Copiar Archivos

Copia todos los archivos del proyecto a `C:\xampp\htdocs\CURRICULUM\`:

```
C:\xampp\htdocs\CURRICULUM\
├── index.html
├── styles.css
├── script.js
├── Currículum.pdf
├── PERFIL - EMILIO PEREZ FONDO BLANCO.jpg
├── README.md
├── .gitignore
├── _config.yml
└── .htaccess
```

## Paso 4: Iniciar XAMPP

### Opción A: Panel de Control de XAMPP

1. Abre el **Panel de Control de XAMPP**
   - Windows: `C:\xampp\xampp-control.exe`
2. Haz clic en el botón **"Start"** junto a **Apache**
3. Espera a que el estado cambie a verde (Running)

### Opción B: Línea de Comandos

```bash
# Abrir CMD como administrador
cd C:\xampp\apache\bin
httpd.exe
```

## Paso 5: Acceder a la Página

Abre tu navegador web y ve a:

```
http://localhost/CURRICULUM/
```

O si usas un puerto diferente:

```
http://localhost:8080/CURRICULUM/
```

## Paso 6: Verificar Funcionamiento

Verifica que:
- ✅ La página carga correctamente
- ✅ La foto de perfil se muestra
- ✅ Los estilos CSS se aplican
- ✅ Las animaciones funcionan
- ✅ Los enlaces de navegación funcionan
- ✅ El PDF se puede descargar
- ✅ Los enlaces de redes sociales abren correctamente

## 🔧 Configuración Avanzada

### Cambiar Puerto de Apache

1. Abre `C:\xampp\apache\conf\httpd.conf`
2. Busca: `Listen 80`
3. Cambia a: `Listen 8080` (o el puerto que desees)
4. Reinicia Apache

### Habilitar HTTPS (SSL)

1. Abre el Panel de Control de XAMPP
2. Haz clic en **"Config"** en Apache
3. Selecciona **"httpd-ssl.conf"**
4. Descomenta las líneas necesarias
5. Reinicia Apache

### Crear Virtual Host

1. Abre `C:\xampp\apache\conf\extra\httpd-vhosts.conf`
2. Agrega al final:

```apache
<VirtualHost *:80>
    ServerName curriculum.local
    DocumentRoot "C:\xampp\htdocs\CURRICULUM"
    <Directory "C:\xampp\htdocs\CURRICULUM">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

3. Abre `C:\Windows\System32\drivers\etc\hosts`
4. Agrega: `127.0.0.1 curriculum.local`
5. Reinicia Apache
6. Accede a: `http://curriculum.local`

## 📊 Panel de Control de XAMPP

### Botones Principales

- **Start**: Inicia el servicio
- **Stop**: Detiene el servicio
- **Restart**: Reinicia el servicio
- **Admin**: Abre el panel de administración
- **Config**: Abre archivos de configuración
- **Logs**: Muestra registros de errores

### Indicadores de Estado

- 🟢 **Verde**: Servicio ejecutándose
- 🔴 **Rojo**: Servicio detenido
- 🟡 **Amarillo**: Servicio con problemas

## 🐛 Solucionar Problemas

### Apache no inicia

**Problema**: El botón Start no funciona o Apache se detiene inmediatamente

**Soluciones**:
1. Verifica que el puerto 80 no esté en uso
2. Desactiva otros servidores web (IIS, etc.)
3. Ejecuta XAMPP como administrador
4. Revisa los logs en `C:\xampp\apache\logs\error.log`

### Página no carga

**Problema**: Error 404 o página en blanco

**Soluciones**:
1. Verifica que Apache esté ejecutándose (verde)
2. Comprueba la ruta: `C:\xampp\htdocs\CURRICULUM\`
3. Asegúrate de que `index.html` existe
4. Limpia el caché del navegador (Ctrl+Shift+Delete)
5. Intenta con otro navegador

### Archivos no se encuentran

**Problema**: Imágenes o CSS no cargan

**Soluciones**:
1. Verifica que los archivos estén en la carpeta correcta
2. Comprueba los nombres de archivo (sensibles a mayúsculas)
3. Revisa la consola del navegador (F12) para errores
4. Asegúrate de que los permisos de archivo sean correctos

### Puerto ya en uso

**Problema**: "Address already in use"

**Soluciones**:
```bash
# Encontrar proceso usando puerto 80
netstat -ano | findstr :80

# Matar proceso (reemplaza PID)
taskkill /PID 1234 /F

# O cambiar puerto en httpd.conf
```

## 📁 Estructura de Carpetas

```
C:\xampp\
├── apache\          # Servidor web
├── mysql\           # Base de datos (opcional)
├── php\             # Intérprete PHP
├── htdocs\          # Carpeta raíz web
│   ├── CURRICULUM/  # Tu proyecto
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   └── ...
│   └── ...
├── logs\            # Registros
└── xampp-control.exe # Panel de control
```

## 🔐 Seguridad

### Cambiar Contraseña de MySQL (si lo usas)

```bash
cd C:\xampp\mysql\bin
mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED BY 'nueva_contraseña';
FLUSH PRIVILEGES;
EXIT;
```

### Deshabilitar Servicios Innecesarios

1. Abre el Panel de Control de XAMPP
2. Desmarca los servicios que no necesites (MySQL, FileZilla, etc.)
3. Solo mantén Apache habilitado

## 📈 Optimización

### Aumentar Límite de Memoria

1. Abre `C:\xampp\php\php.ini`
2. Busca: `memory_limit = 128M`
3. Cambia a: `memory_limit = 256M` (o más)
4. Reinicia Apache

### Aumentar Tiempo de Ejecución

1. Abre `C:\xampp\php\php.ini`
2. Busca: `max_execution_time = 30`
3. Cambia a: `max_execution_time = 300`
4. Reinicia Apache

## 🚀 Pasar a Producción

Cuando estés listo para publicar:

1. **Opción A**: Usar GitHub Pages (recomendado)
   - Sigue la guía en `GITHUB_SETUP.md`

2. **Opción B**: Usar hosting web
   - Sube los archivos vía FTP
   - Asegúrate de que el servidor soporte HTML/CSS/JS

3. **Opción C**: Usar servidor dedicado
   - Instala Apache en el servidor
   - Copia los archivos
   - Configura el dominio

## 📚 Recursos Útiles

- [Documentación de XAMPP](https://www.apachefriends.org/docs.html)
- [Apache Documentation](https://httpd.apache.org/docs/)
- [PHP Manual](https://www.php.net/manual/)

## ✅ Checklist de Configuración

- [ ] XAMPP instalado correctamente
- [ ] Carpeta `CURRICULUM` creada en `htdocs`
- [ ] Todos los archivos copiados
- [ ] Apache iniciado (verde)
- [ ] Página accesible en `http://localhost/CURRICULUM/`
- [ ] Foto de perfil visible
- [ ] Estilos CSS aplicados
- [ ] Animaciones funcionan
- [ ] Enlaces de navegación funcionan
- [ ] PDF descargable
- [ ] Redes sociales enlazadas

## 🎉 ¡Listo!

Tu currículum está funcionando localmente. Ahora puedes:
- Hacer cambios y verlos en tiempo real
- Probar en diferentes navegadores
- Prepararlo para publicar en GitHub Pages

---

**Necesitas ayuda? Revisa los logs en `C:\xampp\apache\logs\error.log`**
