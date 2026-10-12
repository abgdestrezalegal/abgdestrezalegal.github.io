# Conector de Destreza Legal — Gestión

Servidor que le abre a Claude los procesos y la agenda de la firma, sin que Claude toque
Firestore directamente. Vive en Cloudflare Workers, en una dirección pública, y pide
autorización antes de cada conexión.

## Qué puede y qué no

**Puede consultar:** procesos, agenda, bitácora, clientes y el estado de honorarios.

**Puede registrar:** tareas y audiencias (crear, editar, marcar cumplidas), actuaciones en
la bitácora, procesos nuevos y sus ediciones, clientes nuevos y sus ediciones.

**No puede, por diseño:** eliminar nada —no existe ninguna acción que borre— ni modificar
honorarios, pagos ni recibos. Esas columnas son de solo lectura para el conector.

Cada acción que modifica algo queda anotada en el registro de actividad a nombre de
*Conector de agenda*, nunca a nombre de una persona.

## Archivos

| | |
|---|---|
| `worker.js` | punto de entrada: rutas, protocolo MCP y OAuth |
| `auth.js` | servidor OAuth sin base de datos, con tokens firmados |
| `firestore.js` | credencial de servicio y acceso a Firestore |
| `herramientas.js` | las acciones que Claude ve, y sus validaciones |
| `prueba.mjs` | banco de pruebas: `node conector/prueba.mjs` |

## Secretos que hay que cargar en Cloudflare

Ninguno va en el código. Se cargan en *Settings → Variables and Secrets*, como **Secret**:

| Nombre | Qué es |
|---|---|
| `FIREBASE_SA` | el JSON completo de la cuenta de servicio de Firebase |
| `TOKEN_SECRET` | una cadena larga al azar, para firmar los tokens |
| `CLAVE_ACCESO` | la clave que se escribe al autorizar el conector desde Claude |

## Publicarlo

1. Subir la carpeta `conector/` al repositorio.
2. En Cloudflare: *Workers & Pages → Create → Import a repository*, elegir el repositorio
   y poner `conector` como directorio raíz.
3. Cargar los tres secretos.
4. En Claude: *Configuración → Conectores → Añadir conector personalizado*, con la
   dirección `https://<el-worker>.workers.dev/mcp`.
5. Claude abrirá la pantalla de autorización: ahí se escribe la clave de acceso.

## Probar sin publicar

```
node conector/prueba.mjs
```

Levanta una Firestore de mentira en memoria, recorre el intercambio OAuth completo y
ejercita las quince acciones. No toca la base de datos real ni necesita internet.
