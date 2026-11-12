# RRHH NUMMEROS — guía para Claude

Jhonny (CONTAX / NUMMEROS, Santa Cruz, Bolivia) no es programador: Claude hace todo el código y
**sube cada cambio a GitHub** (commit + push a `main`) sin que él tenga que hacer nada.
Hablarle siempre en español y en términos simples.

## Para qué sirve
Sistema de Recursos Humanos y planillas de sueldos con reglas bolivianas. Reemplaza la hoja de Google
"Sistema Pagos Sueldos". Módulos: Empresas, Personal, Planilla del mes, Generar archivos (planilla PDF/Excel,
boletas, aportes, asiento contable, Excel del Banco Ganadero, Ministerio de Trabajo, Gestora, Caja, RC-IVA F-608,
Resumen para gerencia, Planilla para auditoría, Mensaje para el cliente), Aguinaldos, Certificados y boletas,
Historial y Configuración (tasas editables y copias de seguridad).

## Para qué empresa
Servicio contable de **CONTAX** con el sistema de **NUMMEROS**. Cliente actual: **MILTHAGOR S.R.L. (MTG Delivery)**,
cuyo logo está en `assets/empresas/` y se asigna solo. Admite varias empresas.

## Cómo está armado (archivos principales)
- `index.html` — carga Firebase (gstatic, compat 10.12.2) y los scripts en orden. Sin compilación: HTML + CSS + JS plano.
- `js/calculos.js` — motor de cálculo puro (se prueba con Node: `node -e "require('./js/calculos.js')"`).
- `js/datos.js` — almacenamiento, empresas, personal, planillas, respaldos.
- `js/vistas.js` — todas las pantallas. `js/app.js` — navegación (rutas `#/...`).
- `js/documentos.js` — documentos para imprimir/PDF. `js/exportar.js` — archivos Excel/TXT.
- `js/importar.js` (importar Excel), `js/visor.js` (botón «Ver»), `js/util.js`.
- `vendor/xlsx-js-style.min.js` — librería Excel. `css/estilos.css`. `manifest.webmanifest` (app instalable).
- `assets/` — logos NUMMEROS/CONTAX, fotos de campaña (`assets/fotos/`), fuentes e íconos.

## Dónde se guardan los datos (desde el 10/11/2026: en la nube)
- **Firebase**, proyecto `rrhh-nummeros` (cuenta info@contaxbolivia.com), Firestore en `southamerica-east1`.
- `js/nube.js`: ingreso con Google, escucha en vivo y guardado. Colecciones `empresas`, `empleados`, `planillas`
  (un documento por registro, id = id del registro) y `ajustes/general` (`{config}`). Cada documento guarda el JSON
  como texto en el campo `d` (más `en` y `por`). Solo se suben los documentos que cambiaron.
- Acceso: `firestore.rules`. Entra `info@contaxbolivia.com` (dueño, fijo en las reglas y en `N.DUENO`) y los correos de la
  colección `autorizados/{correo}` (`admin: true` puede agregar o quitar personas desde Configuración).
- Ingreso con Google activado con `firebase.json` (`auth.providers`); dominio `jmenachocntx.github.io` autorizado en Auth.
  Publicar reglas: `firebase deploy --only firestore --project rrhh-nummeros` (guardar copia de las reglas antes).
- En el navegador solo quedan preferencias (`nummeros-rrhh-pref`: tema, menú, empresa activa). Los datos antiguos
  (`nummeros-rrhh-v1`) no se borran: al entrar se ofrece subirlos y en Configuración hay un botón para subirlos otra vez.
- Copia de seguridad mensual (Configuración → Descargar copia) sigue recomendada. Restaurar reemplaza la nube para todos.
- Logos de empresa: máximo 300 KB (cada documento de Firestore admite hasta 1 MB).
- Nombres, C.I., cuentas, datos del representante legal y de terceros autorizados viven en Firestore, nunca en el código.

## Cómo se publica
- GitHub Pages desde `main` del repo `JMenachoCNTX/RRHH-NUMMEROS` (público), con `.nojekyll`.
- En línea: https://jmenachocntx.github.io/RRHH-NUMMEROS/ (sin dominio propio, no hay `CNAME`).
- No hay número de versión: los commits son frases en español que describen el cambio.

## Reglas de cálculo (verificadas con la planilla de septiembre 2026)
- Salario ganado = básico ÷ 30 × días. Hora extra = básico ÷ 30 ÷ 8 × 1,5, **sin redondear** el valor hora (solo el monto final).
- AFP 12,71 %; ANS por tramos sobre el excedente (13.000 → 1,15 %, 25.000 → 5 %, 35.000 → 10 %).
- RC-IVA: (ganado − AFP − ANS − 2 SMN) × 13 % − 13 % de 2 SMN − 13 % facturas F-110.
- Patronal: Caja 10 %, Gestora 7,21 %, previsiones 8,33 % + 8,33 %. Bono de antigüedad sobre 3 SMN (confirmado 24/10/2026).
- `versionConfig` 3 fuerza horas extra al 50 % sin redondear una vez en cada navegador.
- Planilla sin bono de producción ni dominicales; descuentos separados en Anticipos y Otros descuentos.
- Planillas importadas de Google Sheets (hojas BDSueldos / BDSueldos2025): cerradas, con `importadaDe` y en cada fila
  `montosFijos` (ganado, AFP, ANS, RC-IVA, descuentos, líquido, Caja, Gestora…) que `calcularFila` respeta al centavo,
  para que las boletas antiguas muestren exactamente lo pagado. Ids `bdsAAAAMM`.

## Bancos
- Sueldos solo por **Banco Ganadero** (Excel; cuenta y C.I. sin guiones, espacios ni puntos).
- El BMSC se quitó a pedido de Jhonny: no volver a agregarlo como banco de pago (sigue en la lista de bancos de los trabajadores, ACH).
- Pago a tercero autorizado: solo cambia los datos del Excel del Banco Ganadero; el resto usa los datos del trabajador.

## Marca y documentos
- Menú con marca NUMMEROS y CONTAX abajo como servicio; el logo del cliente solo en documentos.
- Colores NUMMEROS: #051F20 #0B2B26 #163832 #235347 (principal) #8EB69B #DAF1DE; títulos Akshar, texto Questrial/Century Gothic.
- Documentos (`.doc-n` / `.dn-*`) con formato de estados financieros CONTAX · NUMMEROS: carta, encabezado NUMMEROS + CONTAX,
  barra con logo del cliente y «RAZÓN | NIT | periodo», firmas y pie «Elaborado por CONTAX · NUMMEROS».
- La representante legal firma TODOS los documentos; «Elaborado por» firma asiento y resumen para gerencia.
- Certificado de trabajo (`.cert-m`): marco NUMMEROS · CONTAX, texto del modelo MTG en Times, marca de agua del logo al 7 %.
- Boletas en duplicado (ejemplar trabajador / empresa); planilla con columna de firma (20 personas por hoja horizontal).
- Nombres de descarga definidos en `X.NOMBRES` (ej. «Resumen para Gerencia - Octubre 2026 Milthagor SRL»).
- Textos en español de Bolivia: montos `4.815,03`, fechas `dd/mm/aaaa`.

## Cuidados importantes
- Repo **público**: nunca subir datos reales de personas (nombres, C.I., cuentas, sueldos), ni planillas del cliente.
  La plantilla de personal usa solo datos ficticios.
- Si se cambian las reglas o la estructura de documentos, avisar antes: el sistema está en uso por varias personas.
- Pendientes que Jhonny dejó para «luego»: boletas/certificados por correo, portal del trabajador, firma digital
  (Ley 164, ADSIB/Digicert), y subir documentos de empresa (NIT, Matrícula, ROE) y del personal (CI, contrato).
- Se descartó leer capturas con OCR para horas extra (los números salían mal): usar pegar filas o subir Excel.
