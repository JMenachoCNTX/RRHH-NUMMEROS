# Guía para Claude — RRHH NUMMEROS

## Sobre el dueño
Jhonny (CONTAX / NUMMEROS, Santa Cruz, Bolivia). No es programador: Claude hace todo el código y **sube cada cambio a GitHub** (commit + push a `main`) sin que él tenga que hacer nada. Hablarle siempre en español y en términos simples.

## Reglas del proyecto
- Todo el texto de la interfaz en español de Bolivia. Montos con formato `4.815,03`; fechas `dd/mm/aaaa`.
- Marca NUMMEROS: colores #051F20 #0B2B26 #163832 #235347 (principal) #8EB69B #DAF1DE; títulos Akshar, texto Century Gothic/Questrial. El logo va en #235347 sobre fondo claro; fondos verde oscuro solo en modo oscuro.
- Fotos de la campaña NUMMEROS × CONTAX en `assets/fotos/` (los clásicos con el Contador Virtual; fondos siempre unidos).
- Sin herramientas de compilación: HTML + CSS + JS plano. Librería Excel en `vendor/xlsx-js-style.min.js`.
- Los datos viven en `localStorage` (clave `nummeros-rrhh-v1`). Nunca subir datos reales de personas al repositorio (es público).

## Bancos
- Los sueldos se pagan solo con el **Banco Ganadero** (archivo Excel). El Banco Mercantil (BMSC) se quitó a pedido de Jhonny: no volver a agregar archivos ni datos de empresa del BMSC. El BMSC sigue en la lista de bancos *de los trabajadores* (cobran ahí por ACH).

## Archivos
- `js/calculos.js` — motor de cálculo puro (se puede probar con Node: `node -e "require('./js/calculos.js')"`).
- `js/datos.js` — almacenamiento, empresas, personal, planillas, respaldos.
- `js/vistas.js` — todas las pantallas. `js/app.js` — navegación.
- `js/documentos.js` — documentos para imprimir/PDF. `js/exportar.js` — archivos Excel/TXT.

## Reglas de cálculo (verificadas contra la planilla de septiembre 2026)
- Salario ganado = básico ÷ 30 × días. Hora extra = básico ÷ 30 ÷ 8 × 1,5 (recargo 50 % = ×1,5, acuerdo escrito con el cliente: sábados 4 h activadores y soporte, domingos 8 h soporte; horario L-S 10:00-18:00, soporte L-D), **sin redondear** el valor hora; se redondea solo el monto final.
- AFP 12,71 %; ANS por tramos sobre el excedente (13.000 → 1,15 %, 25.000 → 5 %, 35.000 → 10 %).
- RC-IVA: (ganado − AFP − ANS − 2 SMN) × 13 % − 13 % de 2 SMN − 13 % facturas F-110.
- Patronal: Caja 10 %, Gestora 7,21 %, previsiones 8,33 % + 8,33 %.
- Bono de antigüedad sobre 3 SMN y RC-IVA con crédito del 13 % de 2 SMN: confirmados por Jhonny (24/10/2026).
- Todas las tasas son editables en Configuración.

## Marcas y diseño de documentos
- El sistema (menú) lleva la marca NUMMEROS; abajo del menú, CONTAX como servicio contable. El logo del cliente NO va en la interfaz.
- TODOS los documentos (js/documentos.js, clases .doc-n / .dn-*) copian el formato de estados financieros CONTAX · NUMMEROS: carta, márgenes 18/22 pt, Questrial + Akshar,
  verde #163832 (barras), #6A8476 (segundo nivel), gris #557363, separadores #DAF1DE. Encabezado: NUMMEROS + CONTAX (mismo tamaño) y lema; barra con logo del cliente,
  "RAZÓN | NIT | periodo", título corto e isotipos N y CONTAX; título centrado; firmas; pie "Elaborado por CONTAX · NUMMEROS" + isotipos.
- Firmas: la representante legal (Empresas → Representante legal + C.I. + cargo) firma TODOS los documentos, aunque haya otro gerente general en planilla. "Elaborado por" (Empresas → Elaborado por / cargo, por defecto "Contador — CONTAX") firma el asiento y el resumen para gerencia. Nombres y C.I. se cargan en el navegador, nunca en el código.
- Logo del cliente: Empresas → Editar → Logo. MILTHAGOR S.R.L. = MTG Delivery (assets/empresas/, se asigna solo).

## Interfaz
- Personal y Planilla se ordenan por nombre o apellido (A-Z / Z-A); el orden de la planilla también define el orden de los archivos.
- Planilla → "Datos del cliente": se pegan (Ctrl+V) las filas de la hoja de Google del cliente (Nombre(s), Apellido(s), Total Ganado, Fecha Fin, Horas extra, Hr/Extra) o se sube el Excel; solo se actualizan las horas extra de quienes vienen en la lista, con revisión antes de aplicar. Se descartó leer capturas (OCR): los números salían mal.
- Pago a tercero autorizado (ficha del trabajador → "Pago a un tercero autorizado"): solo cambia nombre/CI/banco/cuenta en el Excel del Banco Ganadero; boletas, planillas, certificados y entidades usan siempre los datos del trabajador. Los datos del tercero los carga Jhonny en su navegador: nunca ponerlos en el código (repo público).
- Excel del Banco Ganadero: cuenta y CI sin guiones, espacios ni puntos (el banco los rechaza).
- Planilla: sin bono de producción ni dominicales (empresa de servicios); descuentos separados en Anticipos y Otros descuentos.
- Generar archivos → "Resumen para gerencia" (Doc.resumenGerente): KPIs, reparto del costo, a quién se paga, pago por banco, puntos a revisar, comparación con el mes anterior y detalle por persona (gráficos SVG en línea, colores #235347 / #8EB69B).
- Generar archivos → "Planilla para auditoría": copia exacta del Excel que pide auditoría (mismo formato que su `Sueldos_Septiembre.xlsx`, hoja "Calculo Planilla SUELDOS", encabezados #152644, totales #7E9197 con fórmulas SUMA, 2ª tabla de aportes patronales). Se respetan las rarezas del modelo: en la 2ª tabla la columna "Nacionalidad" lleva el C.I. y la última "Indemnnización (8,33%)" es el 0,833 % del ganado. X.auditoria + Doc.auditoria (PDF).
- Nombres de descarga (X.nombreDoc / X.NOMBRES): "Resumen para Gerencia - Octubre 2026 Milthagor SRL", "Planilla de Sueldos y Salarios - …", "Boletas de Pago - …", "Aportes y Previsiones - …", "Planilla para Auditoria - …", "Asiento Contable - …" (.xlsx o PDF). Los PDF toman el nombre del título de la página (Doc.imprimir(html, horizontal, titulo)). El Excel del banco mantiene "Planilla Sueldos - Mes Milthagor SRL" (pedido de Jhonny).
- Generar archivos → "Mensaje para el cliente": texto mensual editable (saludo según la hora + nombre de la representante + mes + lista de archivos) con Copiar, WhatsApp (wa.me) y correo (mailto a Empresas → Correo del representante).
- Pendiente (Jhonny dijo "luego"): boletas/certificados por correo y portal del trabajador; firma de boletas digital (Ley 164: firma digital con certificado ADSIB/Digicert = misma validez; electrónica simple = solo indicio).
- Pendiente (Jhonny dijo "luego"): subir documentos de la empresa (NIT, Matrícula, ROE) y del personal (CI, contrato).
- Menú "Certificados y boletas" (V.certificados, pestañas): certificado de trabajo y boletas de pago por persona (#/certificados/<id>/boletas). Se marcan uno o varios meses (botones Último mes / Últimos 3 / Últimos 6, para créditos) y salen en un solo PDF, dos por hoja (Doc.boletasPersona). También desde Personal → ficha → "Boletas de pago". Filtro Activos / Retirados / Todos sobre la lista de trabajadores (empieza en Activos).
- Boletas en duplicado (Doc.boletas(..., duplicado) / Doc.boletasPersona(..., duplicado)): una hoja por persona con la misma boleta 2 veces, "EJEMPLAR TRABAJADOR" arriba y "EJEMPLAR EMPRESA" abajo, para recortar. Botón en Generar archivos y casilla en Certificados y boletas.
- Generar archivos: cada tarjeta tiene "Ver" (js/visor.js) para previsualizar en pantalla completa antes de imprimir/descargar.
- Planilla → botón "Limpiar": borra días, horas extra, bonos, F-110 y descuentos (mantiene personal, fecha y glosa).
- Config versionConfig 3 fuerza horas extra al 50 % sin redondear (como el cliente) una vez en cada navegador.
- Menú lateral compacto (solo iconos) con el botón ☰; se despliega al pasar el cursor.
