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
- Salario ganado = básico ÷ 30 × días. Hora extra = básico ÷ 30 ÷ 8 × 1,5 (recargo 50 %, decisión de Jhonny: así paga Milthagor), **sin redondear** el valor hora; se redondea solo el monto final.
- AFP 12,71 %; ANS por tramos sobre el excedente (13.000 → 1,15 %, 25.000 → 5 %, 35.000 → 10 %).
- RC-IVA: (ganado − AFP − ANS − 2 SMN) × 13 % − 13 % de 2 SMN − 13 % facturas F-110.
- Patronal: Caja 10 %, Gestora 7,21 %, previsiones 8,33 % + 8,33 %.
- Todas las tasas son editables en Configuración.
