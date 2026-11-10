# RRHH NUMMEROS

**Sistema de Recursos Humanos y planillas de sueldos** — NUMMEROS by CONTAX
*Sistemas a la medida de tu empresa.*

Reemplaza la planilla de Google Sheets "Sistema Pagos Sueldos": registra al personal, calcula la planilla de sueldos de cada mes con las reglas bolivianas y genera todos los archivos que piden los bancos y las entidades.

## Qué hace

| Módulo | Para qué sirve |
|---|---|
| **Empresas** | Varias empresas en un mismo sistema (cada una con su personal y planillas). |
| **Personal** | Base de datos del personal. Se puede importar desde la hoja "Datos_Personales" en Excel. |
| **Planilla del mes** | Días, horas extra, bonos, anticipos y facturas F-110. Calcula salario ganado, antigüedad, AFP, Aporte Nacional Solidario, RC-IVA, líquido pagable y aportes patronales. |
| **Generar archivos** | Planilla de sueldos (PDF/Excel), boletas de pago, aportes y previsiones, asiento contable, Banco Ganadero (Excel), Ministerio de Trabajo, Gestora Pública, Caja de Salud y RC-IVA dependientes (F-608). |
| **Aguinaldos** | Promedio de septiembre a noviembre por el tiempo trabajado en el año. |
| **Certificados** | Certificados de trabajo listos para imprimir. |
| **Historial** | Todas las planillas guardadas (reemplaza la hoja BDSueldos). |
| **Configuración** | Salario mínimo, tasas de AFP, ANS, RC-IVA, horas extra, antigüedad y aportes patronales. Copias de seguridad. |

## Dónde se guardan los datos

Los datos se guardan en la **nube de Firebase** (proyecto `rrhh-nummeros`), nunca en GitHub. Todas las personas autorizadas ven lo mismo y los cambios aparecen solos.

- Para entrar se usa una **cuenta de Google**. Solo entran los correos autorizados en Configuración → Personas con acceso.
- Las reglas de seguridad están en `firestore.rules`: sin permiso nadie puede leer ni escribir.
- Igual conviene descargar una **copia de seguridad** (Configuración → Descargar copia) cada mes y guardarla en Google Drive.

## Cómo abrirlo

- En línea: https://jmenachocntx.github.io/RRHH-NUMMEROS/
- Hace falta internet y una cuenta de Google autorizada.

## Tecnología

HTML, CSS y JavaScript sin instalaciones, con Firebase (ingreso con Google y base de datos Firestore). Excel con [SheetJS](https://sheetjs.com) (incluido en `vendor/`). Publicado con GitHub Pages.
