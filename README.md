# Pastinos Pastas & Vinos

Web del restaurante (React + Vite + TypeScript) con un servidor Express que sirve la web y envía las solicitudes de reserva por correo con Resend.

## Desarrollo
```bash
npm install
npm run build && npm start   # http://localhost:3000
# o, para editar con recarga: en una terminal `node server.js`, en otra `npm run dev`
```

## Railway
- Build: `npm run build`
- Start: `npm start`

### Variables de entorno (solo para el formulario de reservas)
| Variable | Ejemplo |
|---|---|
| `RESEND_API_KEY` | `re_xxx` |
| `RESERVATIONS_TO` | `reservas@pastinospastasyvinos.com` (varios separados por coma) |
| `RESERVATIONS_FROM` | `Pastinos <reservas@pastinospastasyvinos.com>` (dominio verificado en Resend) |

Sin estas variables la web funciona igual; el formulario muestra un aviso para llamar al restaurante.

## Editar datos
- Teléfono, dirección, horarios, links: `src/config.ts`
- Textos en inglés y español: `src/i18n/strings.ts`
- Fotos: `public/images` (cada foto tiene versión grande y `-sm`)
