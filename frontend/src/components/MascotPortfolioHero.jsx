import * as React from "react"

const SANS_STACK =
  '"Inter","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'
const DISPLAY_STACK =
  '"Archivo Black","Arial Black","Helvetica Neue",Helvetica,Arial,system-ui,sans-serif'

const CW = 600
const CH = 720

export function aim(px, py, cx, cy, rx, ry) {
  const sat = (v) => v / Math.sqrt(1 + v * v)
  return [sat((px - cx) / Math.max(1, rx)), sat((py - cy) / Math.max(1, ry))]
}

export function approach(cur, target, dt, rate) {
  return target + (cur - target) * Math.exp(-Math.max(0, rate) * Math.max(0, dt))
}

export function pose(x, y, near) {
  return {
    body: { dx: x * 4, dy: 0 },
    head: { dx: x * 10, dy: y * 7, rot: x * 4 },
    ears: { dx: -x * 7, dy: -y * 3, lead: 1 + x * 0.16, trail: 1 - x * 0.16 },
    hair: { dx: x * 8, dy: y * 3 },
    blush: { dx: x * 20, dy: y * 14 },
    face: { dx: x * 28, dy: y * (y < 0 ? 11 : 20) },
    nose: { dx: x * 10, dy: y * 7 },
    eyes: { dx: x * 4, dy: y * 4, scale: 1 + near * 0.14 },
    brows: { dx: x * 3, dy: y * 2 + Math.min(0, y) * 3 - near * 9 },
  }
}

export function blink(since) {
  const d = 0.15
  if (since < 0 || since > d) return 1
  return 1 - Math.sin((Math.PI * since) / d) * 0.92
}

function room() {
  const x0 = 95
  const x1 = 905
  const y0 = 85
  const y1 = 865
  const vx = (x0 + x1) / 2
  const vy = (y0 + y1) / 2
  const cols = 14
  const rows = 11
  const back = []
  const rays = []
  const out = (x, y) => {
    const dx = x - vx
    const dy = y - vy
    const tx = dx > 0 ? (1000 - x) / dx : dx < 0 ? -x / dx : Infinity
    const ty = dy > 0 ? (1000 - y) / dy : dy < 0 ? -y / dy : Infinity
    const t = Math.min(tx, ty)
    return [x, y, x + dx * t, y + dy * t]
  }
  for (let i = 0; i <= cols; i++) {
    const x = x0 + ((x1 - x0) * i) / cols
    back.push([x, y0, x, y1])
    rays.push(out(x, y0), out(x, y1))
  }
  for (let j = 0; j <= rows; j++) {
    const y = y0 + ((y1 - y0) * j) / rows
    back.push([x0, y, x1, y])
    rays.push(out(x0, y), out(x1, y))
  }
  const depth = [1.07, 1.16, 1.28, 1.45, 1.7].map((s) => {
    const l = vx + (x0 - vx) * s
    const r = vx + (x1 - vx) * s
    const t = vy + (y0 - vy) * s
    const b = vy + (y1 - vy) * s
    return "M" + l + " " + t + "H" + r + "V" + b + "H" + l + "Z"
  })
  return { back, rays, depth }
}

const ROOM = room()
export { ROOM as HERO_ROOM }

function flowerPath() {
  const n = 180
  const lens = [1, 0.84, 0.95, 0.78, 0.9]
  let d = ""
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2
    const k = Math.floor(((a + Math.PI / 5) / (Math.PI * 2)) * 5) % 5
    const lobe = Math.pow(Math.abs(Math.cos((a * 5) / 2)), 0.9)
    const r = 50 * (0.3 + 0.7 * lobe * lens[k])
    const x = 60 + Math.cos(a - Math.PI / 2) * r
    const y = 60 + Math.sin(a - Math.PI / 2) * r
    d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1)
  }
  return d + "Z"
}

const FLOWER = flowerPath()

const HAIR_STYLES = {
  textured: {
    outline: "M141 366 C122 306 120 248 136 207 C126 190 138 169 158 164 C156 142 176 125 199 129 C204 106 230 99 251 107 C263 84 294 89 309 102 C337 84 362 96 374 113 C399 106 420 124 420 143 C445 145 461 169 453 190 C476 219 479 281 458 366 L440 344 L431 274 C421 248 399 235 378 233 C348 259 322 268 290 251 C268 268 245 263 225 250 C203 268 181 267 167 283 L158 347 Z",
    strands: [
      "M163 194 C169 169 196 158 220 166", "M190 160 C209 130 246 126 263 143",
      "M240 137 C264 108 294 114 311 134", "M294 133 C320 109 354 118 366 141",
      "M348 147 C380 132 409 150 414 173", "M403 180 Q433 186 441 217",
      "M177 220 C200 193 229 204 237 224", "M225 207 C251 181 279 194 287 221",
      "M282 197 C310 176 338 187 345 214", "M337 196 C361 178 390 188 399 216",
    ],
  },
  curly: {
    outline: "M140 366 C121 310 119 253 133 219 C112 201 130 172 151 175 C136 151 162 128 183 135 C180 109 211 100 230 116 C238 88 267 89 282 106 C304 80 331 90 339 112 C363 93 391 108 391 130 C416 119 444 139 436 162 C463 161 478 188 460 210 C483 249 479 311 459 365 L440 340 L431 277 C426 258 410 254 398 256 C386 278 357 271 348 253 C332 275 304 269 294 252 C274 275 248 269 238 252 C220 275 190 266 183 254 L166 279 L158 347 Z",
    strands: [
      "M161 192 C145 173 183 156 190 177 C200 197 167 204 167 184",
      "M193 149 C182 126 225 120 229 142 C232 165 199 164 199 145",
      "M247 134 C231 113 271 102 281 123 C291 146 255 152 255 130",
      "M297 125 C287 102 329 104 331 128 C334 149 306 148 305 132",
      "M345 150 C332 126 374 121 382 143 C390 165 355 174 353 153",
      "M398 189 C385 167 424 152 434 176 C444 197 406 210 405 185",
      "M191 232 C176 210 213 194 225 216 C237 237 200 251 199 231",
      "M250 221 C235 198 276 188 285 210 C294 232 258 245 258 224",
      "M308 218 C293 196 334 183 343 207 C352 231 315 240 315 218",
      "M364 229 C350 206 389 195 398 216 C407 239 373 249 372 230",
    ],
  },
  "side-part": {
    outline: "M142 366 C125 309 123 249 140 206 C154 152 209 114 274 108 C347 91 406 122 440 170 C477 212 480 289 458 365 L440 344 L431 267 C417 239 395 225 371 226 C307 264 241 272 194 251 L167 279 L158 347 Z",
    strands: [
      "M170 217 C189 165 260 132 350 139", "M188 230 C216 185 272 157 345 158",
      "M211 241 C243 210 282 184 346 176", "M256 243 C291 226 313 208 350 193",
      "M362 140 C397 152 420 179 431 211", "M371 164 C398 176 412 194 420 222",
    ],
  },
}

const CSS = `
.mph-root,.mph-root *{box-sizing:border-box;}
.mph-root{position:relative;width:100%;overflow:hidden;isolation:isolate;background:var(--mph-paper);color:var(--mph-ink);container:mph / size;font-family:var(--mph-sans);-webkit-font-smoothing:antialiased;}
.mph-room{position:absolute;inset:0;width:100%;height:100%;display:block;color:var(--mph-ink);pointer-events:none;}
.mph-room line,.mph-room path{vector-effect:non-scaling-stroke;}
.mph-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(100cqw,177.78cqh);aspect-ratio:16/9;container:mphs / inline-size;}

.mph-top{position:absolute;left:4.6%;right:4.6%;top:4.4%;display:grid;grid-template-columns:auto auto 1fr auto auto;align-items:center;column-gap:2.4cqw;font-size:1.05cqw;font-weight:800;line-height:1.1;text-transform:uppercase;letter-spacing:.02em;}
.mph-index{display:inline-flex;align-items:center;gap:.9em;border:.12cqw solid var(--mph-ink);border-radius:999px;padding:.12em .9em .12em .12em;font-size:.72em;}
.mph-index b{background:var(--mph-accent);color:var(--mph-ink);border-radius:999px;padding:.3em 1.2em;font-weight:800;}
.mph-tagline{font-size:1.18em;font-weight:900;margin-left:1cqw;}
.mph-brace{grid-column:4;font-size:1.3em;font-weight:700;letter-spacing:.04em;margin-right:2.6cqw;}
.mph-reel{grid-column:5;display:flex;align-items:center;gap:.8em;font-size:.8em;text-align:right;}
.mph-reel i{display:block;width:1.9em;height:1.9em;border-radius:50%;background:var(--mph-accent);border:.12cqw solid var(--mph-ink);flex:none;}

.mph-h1{position:absolute;left:8.8%;top:17.5%;margin:0;font-family:var(--mph-display);font-weight:900;font-size:6.5cqw;line-height:.93;letter-spacing:-.045em;text-transform:uppercase;color:var(--mph-ink);}
.mph-line{display:block;width:max-content;white-space:nowrap;position:relative;}
.mph-ch{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1),color .2s;}
.mph-ch:hover{transform:translateY(-.08em) rotate(-4deg);color:var(--mph-accent);}
.mph-arrow{display:inline-block;width:.6em;height:.6em;margin:0 .06em 0 .1em;vertical-align:-.02em;}
.mph-arrow path{stroke:currentColor;stroke-width:15;fill:none;stroke-linecap:square;}
.mph-badge{position:absolute;top:-.02em;left:calc(100% + .55em);font-family:var(--mph-sans);font-size:.2em;font-weight:800;letter-spacing:0;line-height:1;text-transform:none;border:.13cqw solid var(--mph-ink);border-radius:50%;padding:.75em 1.15em;transform:rotate(-9deg);transition:background .25s,transform .4s cubic-bezier(.3,1.6,.5,1);cursor:default;}
.mph-badge sup{font-size:.7em;margin-left:.1em;}
.mph-badge:hover{background:var(--mph-accent);transform:rotate(6deg) scale(1.08);}
.mph-swash{position:relative;display:inline-block;}
.mph-swash svg{position:absolute;left:-.95em;top:.3em;width:2.55em;height:.72em;overflow:visible;pointer-events:none;}
.mph-swash path{fill:none;stroke:var(--mph-ink);stroke-width:.2cqw;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0;animation:mph-draw 1.6s .5s cubic-bezier(.6,0,.2,1) both;}
.mph-h1:hover .mph-swash path{animation:mph-draw 1.1s cubic-bezier(.6,0,.2,1) both;}
.mph-l4{font-size:1.2em;letter-spacing:-.02em;margin-top:.04em;}
.mph-vtag{display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:-.02em;margin:0 .1em 0 .06em;width:.2em;}
.mph-vtag span{display:block;background:var(--mph-ink);color:var(--mph-paper);writing-mode:vertical-rl;font-family:var(--mph-sans);font-size:.105em;font-weight:800;letter-spacing:.12em;padding:.55em 0;text-align:center;}
.mph-vtag i{display:block;height:.34em;background:repeating-linear-gradient(to bottom,var(--mph-ink) 0 .02em,transparent .02em .045em);}
.mph-bracket{position:relative;display:inline-block;padding:0 .08em;}
.mph-bracket svg{position:absolute;left:-.02em;right:-.02em;top:-.1em;bottom:-.12em;width:calc(100% + .04em);height:calc(100% + .22em);overflow:visible;}
.mph-bracket path{fill:none;stroke:var(--mph-ink);stroke-width:.62cqw;stroke-linecap:butt;transition:transform .45s cubic-bezier(.3,1.6,.5,1);}
.mph-bracket:hover .mph-arc-t{transform:translateY(-10px);}
.mph-bracket:hover .mph-arc-b{transform:translateY(10px);}
.mph-star{display:inline-block;font-size:.66em;vertical-align:.5em;margin-left:.02em;transition:transform .6s cubic-bezier(.3,1.6,.5,1);}
.mph-l4:hover .mph-star{transform:rotate(180deg) scale(1.2);}

.mph-actions{display:contents;}
.mph-pill{position:absolute;left:8.8%;top:72.8%;display:flex;align-items:stretch;font-size:1.72cqw;font-weight:800;line-height:1;}
.mph-pill-a{position:relative;z-index:1;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:999px;padding:.72em 1.25em;}
.mph-pill-b{display:inline-flex;align-items:center;gap:.5em;margin-left:-1.4em;padding:.72em 3.4em .72em 3.1em;background:var(--mph-accent);color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:0 999px 999px 0;text-decoration:none;transition:background .25s,color .25s,padding .35s cubic-bezier(.3,1.4,.5,1);}
.mph-pill-b em{font-style:normal;display:inline-block;width:0;overflow:hidden;opacity:0;transition:width .35s,opacity .25s;}
.mph-pill-b:is(a):hover,.mph-pill-b:is(a):focus-visible{background:var(--mph-ink);color:var(--mph-paper);padding-right:2.4em;outline:none;}
.mph-pill-b:is(a):hover em,.mph-pill-b:is(a):focus-visible em{width:1em;opacity:1;}

.mph-flower{position:absolute;left:42%;top:78%;width:6%;aspect-ratio:1;animation:mph-spin 22s linear infinite;cursor:grab;}
.mph-flower svg{display:block;width:100%;height:100%;overflow:visible;transition:transform .5s cubic-bezier(.3,1.8,.5,1);}
.mph-flower:hover svg{transform:scale(1.18) rotate(40deg);}
.mph-flower path{fill:#fff;stroke:var(--mph-ink);stroke-width:2.6;stroke-linejoin:round;}
.mph-curl{position:absolute;left:46%;top:18%;width:5%;aspect-ratio:1;overflow:visible;pointer-events:none;}
.mph-curl path{fill:none;stroke:var(--mph-ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;animation:mph-draw 1.4s 1s cubic-bezier(.6,0,.2,1) both;}

.mph-services{position:absolute;left:4.6%;bottom:4.6%;display:flex;gap:4cqw;margin:0;padding:0;list-style:none;font-size:1.3cqw;font-weight:800;}
.mph-services li{position:relative;cursor:default;padding-bottom:.25em;}
.mph-services li::after{content:"";position:absolute;left:0;right:0;bottom:0;height:.18em;background:var(--mph-accent);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.6,0,.2,1);}
.mph-services li:hover::after{transform:scaleX(1);}

.mph-speech{position:absolute;left:55.5%;bottom:3%;width:40.5%;aspect-ratio:600/720;pointer-events:none;}
.mph-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0;}
.mph-char{position:absolute;left:55.5%;bottom:3%;width:40.5%;aspect-ratio:600/720;padding:0;margin:0;border:0;background:none;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:40% 40% 8% 8%;}
.mph-char:focus-visible{outline:.2cqw dashed var(--mph-ink);outline-offset:.4cqw;}
.mph-char svg{display:block;width:100%;height:100%;overflow:visible;}
.mph-bubble{position:absolute;left:-4%;top:6%;max-width:46%;background:#fff;color:var(--mph-ink);border:.16cqw solid var(--mph-ink);border-radius:1.4em 1.4em 1.4em .2em;padding:.8em 1.1em;font-size:1.3cqw;font-weight:800;line-height:1.2;text-align:left;box-shadow:.35cqw .35cqw 0 var(--mph-accent);transform-origin:0 100%;transform:scale(0) rotate(-8deg);opacity:0;transition:transform .45s cubic-bezier(.3,1.6,.5,1),opacity .2s;pointer-events:none;}
.mph-bubble[data-on="true"]{transform:scale(1) rotate(-4deg);opacity:1;}

@keyframes mph-draw{from{stroke-dashoffset:1;}to{stroke-dashoffset:0;}}
@keyframes mph-spin{to{transform:rotate(360deg);}}

@container mph (orientation: portrait){
.mph-stage{top:0;transform:translateX(-50%);width:100cqw;height:100cqh;aspect-ratio:auto;display:flex;flex-direction:column;align-items:center;padding:max(96px,26cqw) 0 0;}
.mph-top{top:24px;left:6%;right:88px;display:flex;font-size:2.5cqw;}
.mph-index{font-size:clamp(9px,2.25cqw,12px);}
.mph-tagline,.mph-brace{display:none;}
.mph-reel{display:none;}
.mph-h1{position:relative;left:auto;right:auto;top:auto;width:88%;font-size:13cqw;text-align:center;}
.mph-h1 .mph-line{margin-inline:auto;}
.mph-badge{left:50%;top:-3em;font-size:clamp(10px,2.8cqw,14px);transform:translateX(-50%) rotate(-9deg);}
.mph-badge:hover{transform:translateX(-50%) rotate(6deg) scale(1.08);}
.mph-actions{display:block;position:relative;width:88%;margin-top:clamp(20px,5cqw,32px);}
.mph-pill{position:relative;left:auto;top:auto;width:max-content;max-width:100%;margin-inline:auto;font-size:clamp(11px,3cqw,16px);white-space:nowrap;}
.mph-pill-a{display:flex;align-items:center;justify-content:center;min-height:44px;padding:.85em 1.05em;}
.mph-pill-b{min-height:44px;padding:.85em 1.6em .85em 2.3em;}
.mph-flower{left:auto;right:0;top:calc(100% + 16px);width:9%;}
.mph-curl{left:auto;right:15%;top:calc(100% + 10px);width:9%;transform:scaleY(-1);}
.mph-services{left:7%;right:7%;bottom:auto;top:79cqw;flex-wrap:wrap;gap:1.6cqw 5cqw;font-size:3cqw;}
.mph-char,.mph-speech{left:50%;width:min(76%,max(0px,calc((100cqh - 92cqw) * .8333)));bottom:3%;transform:translateX(-50%);}
.mph-bubble{font-size:3cqw;left:-8%;top:2%;max-width:52%;}
}

@media (prefers-reduced-motion: reduce){
.mph-root *,.mph-root *::after{animation:none!important;transition:none!important;}
}
`

const DEFAULT_SERVICES = ["Sites", "Sistemas web", "Lojas virtuais", "Interfaces"]
const DEFAULT_GREETINGS = ["Oi! Eu sou o Artur.", "Vamos tirar sua ideia do papel?", "Seu próximo projeto começa aqui.", "Pode chamar, vamos conversar!"]

export default function MascotPortfolioHero({
  height = "100svh",
  minHeight = "620px",
  index = "01/26",
  discipline = "Desenvolvimento web",
  tagline = "Ideias que ganham forma",
  collection = ["Design", "Código"],
  reel = ["Artur Maciel", "Desenvolvedor web"],
  year = "2026",
  initials = "AM",
  badge = "Olá!",
  line2 = "Artur",
  line3 = "Maciel",
  word = "Web",
  verticalTag = "Dev",
  bracketed = "DEV",
  seekingLabel = "Seu projeto",
  seeking = "Vamos conversar",
  href,
  services = DEFAULT_SERVICES,
  greetings = DEFAULT_GREETINGS,
  skin = "#f7cfb0",
  hair = "#241d19",
  hairHighlight = "#625248",
  hairStyle = "textured",
  characterName = "Artur",
  shirt = "#18181a",
  accent = "#c7c7c2",
  paper = "#ebebea",
  ink = "#111111",
  className,
}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const id = (n) => n + uid
  const u = (n) => "url(#" + id(n) + ")"

  const rootRef = React.useRef(null)
  const charRef = React.useRef(null)
  const layers = React.useRef({})
  const set = (k) => (el) => {
    layers.current[k] = el
  }

  const messages = greetings.length ? greetings : DEFAULT_GREETINGS

  const [happy, setHappy] = React.useState(false)
  const [said, setSaid] = React.useState(-1)
  const happyTimer = React.useRef(undefined)

  const poke = () => {
    setSaid((n) => (n + 1) % Math.max(1, messages.length))
    setHappy(true)
    window.clearTimeout(happyTimer.current)
    happyTimer.current = window.setTimeout(() => setHappy(false), 2200)
  }
  React.useEffect(() => () => window.clearTimeout(happyTimer.current), [])

  React.useEffect(() => {
    const root = rootRef.current
    const char = charRef.current
    if (!root || !char) return

    const L = layers.current
    let px = 0
    let py = 0
    let lastMove = -Infinity
    let gx = 0
    let gy = 0
    let near = 0
    let prev = performance.now()
    let nextBlink = prev + 1800
    let blinkAt = -Infinity
    let raf = 0
    let inView = true
    let bounds
    let boundsDirty = true

    const tr = (dx, dy) => `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`
    const draw = (now, moving) => {
      const p = pose(gx, gy, near)
      const breathe = moving ? Math.sin(now / 620) * 1.6 : 0
      const open = moving ? blink((now - blinkAt) / 1000) : 1
      L.body?.setAttribute("transform", tr(p.body.dx, p.body.dy + breathe * 0.4))
      L.head?.setAttribute("transform", `${tr(p.head.dx, p.head.dy + breathe)} rotate(${p.head.rot.toFixed(2)} 300 560)`)
      L.earL?.setAttribute("transform", `${tr(p.ears.dx, p.ears.dy)} translate(138 380) scale(${p.ears.lead.toFixed(3)} 1) translate(-138 -380)`)
      L.earR?.setAttribute("transform", `${tr(p.ears.dx, p.ears.dy)} translate(462 380) scale(${p.ears.trail.toFixed(3)} 1) translate(-462 -380)`)
      L.hair?.setAttribute("transform", tr(p.hair.dx, p.hair.dy))
      L.blush?.setAttribute("transform", tr(p.blush.dx, p.blush.dy))
      L.face?.setAttribute("transform", tr(p.face.dx, p.face.dy))
      L.nose?.setAttribute("transform", tr(p.nose.dx, p.nose.dy))
      L.brows?.setAttribute("transform", tr(p.brows.dx, p.brows.dy))
      L.eyes?.setAttribute("transform", `${tr(p.eyes.dx, p.eyes.dy)} translate(300 350) scale(${p.eyes.scale.toFixed(3)} ${(p.eyes.scale * open).toFixed(3)}) translate(-300 -350)`)
    }

    const canAnimate = () => inView && !document.hidden
    const frame = (now) => {
      raf = 0
      if (!canAnimate()) return
      const dt = Math.min(0.05, Math.max(0, (now - prev) / 1000))
      prev = now
      let tx = 0
      let ty = 0
      let tn = 0
      if (now - lastMove <= 3500) {
        if (!bounds || boundsDirty) {
          bounds = char.getBoundingClientRect()
          boundsDirty = false
        }
        const cx = bounds.left + bounds.width * 0.5
        const cy = bounds.top + bounds.height * 0.48
        const reach = Math.max(window.innerWidth, window.innerHeight)
        ;[tx, ty] = aim(px, py, cx, cy, reach * 0.3, reach * 0.26)
        tn = Math.max(0, 1 - Math.hypot(px - cx, py - cy) / Math.max(1, bounds.width * 0.45))
      } else {
        const t = now / 1000
        tx = Math.sin(t * 0.45) * 0.55 + Math.sin(t * 1.1) * 0.1
        ty = Math.sin(t * 0.31 + 1) * 0.25
      }
      gx = approach(gx, tx, dt, 7)
      gy = approach(gy, ty, dt, 7)
      near = approach(near, tn, dt, 8)
      if (now > nextBlink) {
        blinkAt = now
        nextBlink = now + (Math.random() < 0.2 ? 260 : 2200 + Math.random() * 3200)
      }
      draw(now, true)
      raf = requestAnimationFrame(frame)
    }

    const syncLoop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      prev = performance.now()
      boundsDirty = true
      if (canAnimate()) {
        blinkAt = -Infinity
        nextBlink = prev + 1800
        raf = requestAnimationFrame(frame)
      }
    }
    const onMove = (event) => {
      if (event.pointerType === "touch" || !canAnimate()) return
      px = event.clientX
      py = event.clientY
      lastMove = performance.now()
    }
    const onLeave = () => { lastMove = -Infinity }
    const onLayout = () => { boundsDirty = true }
    const onVisibility = () => { onLeave(); syncLoop() }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onMove, { passive: true })
    window.addEventListener("blur", onLeave)
    window.addEventListener("resize", onLayout, { passive: true })
    window.addEventListener("scroll", onLayout, { passive: true, capture: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    document.addEventListener("visibilitychange", onVisibility)

    const ro = new ResizeObserver(onLayout)
    ro.observe(root)
    ro.observe(char)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return
      inView = entry.isIntersecting
      syncLoop()
    })
    io.observe(root)
    syncLoop()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onMove)
      window.removeEventListener("blur", onLeave)
      window.removeEventListener("resize", onLayout)
      window.removeEventListener("scroll", onLayout, true)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  const chars = (s) =>
    Array.from(s).map((c, i) => (
      <span key={i} className="mph-ch">
        {c === " " ? " " : c}
      </span>
    ))

  const l3 = Array.from(line3)
  const l3Head = l3.slice(0, -1).join("")
  const l3Tail = l3[l3.length - 1] ?? ""
  const greeting = said >= 0 ? messages[said % messages.length] : ""

  const vars = {
    "--mph-accent": accent,
    "--mph-paper": paper,
    "--mph-ink": ink,
    "--mph-sans": SANS_STACK,
    "--mph-display": DISPLAY_STACK,
    height,
    minHeight,
  }

  const pillInner = (
    <>
      {seeking}
      <em aria-hidden="true">→</em>
    </>
  )

  return (
    <div ref={rootRef} className={"mph-root" + (className ? " " + className : "")} style={vars}>
      <style>{CSS}</style>

      <svg className="mph-room" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.13">
          {ROOM.back.map((s, i) => (
            <line key={"b" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.rays.map((s, i) => (
            <line key={"r" + i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} />
          ))}
          {ROOM.depth.map((d, i) => (
            <path key={"d" + i} d={d} />
          ))}
        </g>
      </svg>

      <div className="mph-stage">
        <header className="mph-top">
          <span className="mph-index">
            <b>{index}</b>
            {discipline}
          </span>
          <span className="mph-tagline">{tagline}</span>
          <span className="mph-brace">
            {"{"}
            {collection[0]}/{collection[1]}
            {"}"}
          </span>
          <span className="mph-reel">
            <i aria-hidden="true" />
            <span>
              {reel[0]}
              <br />
              {reel[1]}
            </span>
          </span>
        </header>

        <h1 className="mph-h1" aria-label={[year, initials, line2, line3, word + bracketed].join(" ")}>
          <span className="mph-line" aria-hidden="true">
            {chars(year)}
            <svg className="mph-arrow" viewBox="0 0 100 100">
              <path d="M14 14 L84 84 M84 30 V84 H30" />
            </svg>
            {chars(initials)}
            <span className="mph-badge">
              {badge}
              <sup>@</sup>
            </span>
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(line2)}
          </span>
          <span className="mph-line" aria-hidden="true">
            {chars(l3Head)}
            <span className="mph-swash">
              <span className="mph-ch">{l3Tail}</span>
              <svg viewBox="0 0 255 72" preserveAspectRatio="none">
                <path
                  pathLength={1}
                  d="M6 44 C40 18 150 4 222 14 C262 20 258 48 214 58 C150 72 60 70 30 60 C10 53 20 40 60 34"
                />
              </svg>
            </span>
          </span>
          <span className="mph-line mph-l4" aria-hidden="true">
            {chars(word)}
            <span className="mph-vtag">
              <span>{verticalTag}</span>
              <i />
            </span>
            <span className="mph-bracket">
              <svg viewBox="0 0 100 120" preserveAspectRatio="none">
                <path className="mph-arc-t" vectorEffect="non-scaling-stroke" d="M4 16 Q50 -8 96 16" />
                <path className="mph-arc-b" vectorEffect="non-scaling-stroke" d="M4 104 Q50 128 96 104" />
              </svg>
              {bracketed}
            </span>
            <span className="mph-star">*</span>
          </span>
        </h1>

        <div className="mph-actions">
          <svg className="mph-curl" viewBox="0 0 100 100" aria-hidden="true">
            <path
              pathLength={1}
              d="M92 8 C70 6 52 22 58 40 C63 56 84 52 80 36 C76 22 50 30 40 48 C32 62 26 74 16 84 M14 66 L14 86 L34 86"
            />
          </svg>

          <div className="mph-pill">
            <span className="mph-pill-a">{seekingLabel}</span>
            {href ? (
              <a className="mph-pill-b" href={href}>
                {pillInner}
              </a>
            ) : (
              <span className="mph-pill-b">
                {pillInner}
              </span>
            )}
          </div>

          <div className="mph-flower" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <path d={FLOWER} />
              <circle cx="60" cy="60" r="4" fill="none" stroke={ink} strokeWidth="2" />
            </svg>
          </div>
        </div>

        <button
          ref={charRef}
          type="button"
          className={"mph-char" + (happy ? " mph-happy" : "")}
          onClick={poke}
          aria-label={`Interagir com o avatar de ${characterName}`}
          aria-describedby={id("greeting")}
        >
          <svg viewBox={"0 0 " + CW + " " + CH} aria-hidden="true">
            <defs>
              <clipPath id={id("portal-cut")}>
                <path d="M0 0 H600 V660 Q300 716 0 660 Z" />
              </clipPath>
              <linearGradient id={id("portal-rim")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d4d4ce" />
                <stop offset="1" stopColor="#8c8c87" />
              </linearGradient>
              <radialGradient id={id("shade")} cx="46%" cy="40%" r="62%">
                <stop offset="0.55" stopColor="#7a2e14" stopOpacity="0" />
                <stop offset="1" stopColor="#7a2e14" stopOpacity="0.34" />
              </radialGradient>
              <radialGradient id={id("hi")} cx="36%" cy="30%" r="42%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("blush")}>
                <stop offset="0" stopColor="#ff6f6f" stopOpacity="0.55" />
                <stop offset="1" stopColor="#ff6f6f" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={id("hair-light")} cx="38%" cy="22%" r="80%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.35" />
              </radialGradient>
              <radialGradient id={id("eye")} cx="40%" cy="35%" r="70%">
                <stop offset="0" stopColor="#3a3a3c" />
                <stop offset="1" stopColor="#050505" />
              </radialGradient>
              <radialGradient id={id("nose")} cx="42%" cy="36%" r="66%">
                <stop offset="0" stopColor="#ff9c82" stopOpacity="0.18" />
                <stop offset="1" stopColor="#b8583a" stopOpacity="0.42" />
              </radialGradient>
              <linearGradient id={id("neck")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6b2a14" stopOpacity="0.45" />
                <stop offset="0.5" stopColor="#6b2a14" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id={id("cloth")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.3" />
              </linearGradient>
              <clipPath id={id("mouth")}>
                <path d="M218 440 Q300 458 382 440 Q376 524 300 530 Q224 524 218 440 Z" />
              </clipPath>
              <clipPath id={id("hair-clip")}>
                <path d={HAIR_STYLES[hairStyle].outline} />
              </clipPath>
            </defs>

            <ellipse cx="300" cy="674" rx="291" ry="47" fill="#111111" opacity="0.12" />
            <ellipse cx="300" cy="660" rx="285" ry="44" fill={u("portal-rim")} stroke={ink} strokeWidth="4" />
            <ellipse cx="300" cy="658" rx="265" ry="30" fill="#111111" stroke="#646460" strokeWidth="3" />

            <g clipPath={u("portal-cut")}>
              <g ref={set("body")}>
                <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={shirt} />
                <path d="M28 730 C40 646 104 604 206 588 L394 588 C496 604 560 646 572 730 Z" fill={u("cloth")} />
                <path d="M246 500 L354 500 L360 600 Q300 624 240 600 Z" fill={skin} />
                <path d="M246 500 L354 500 L360 600 Q300 624 240 600 Z" fill={u("neck")} />
                <path d="M236 566 Q262 604 300 628 L250 668 Q214 628 194 594 Z" fill={shirt} />
                <path d="M364 566 Q338 604 300 628 L350 668 Q386 628 406 594 Z" fill={shirt} />
                <path d="M236 566 Q262 604 300 628 L250 668 Q214 628 194 594 Z M364 566 Q338 604 300 628 L350 668 Q386 628 406 594 Z" fill="#fff" opacity="0.07" stroke="#000" strokeOpacity="0.4" strokeWidth="2" />
                <rect x="288" y="628" width="24" height="102" fill="#fff" opacity="0.05" stroke="#000" strokeOpacity="0.35" strokeWidth="2" />
                <circle cx="300" cy="656" r="6" fill="#2a2a2c" stroke="#000" strokeOpacity="0.5" />
                <circle cx="300" cy="698" r="6" fill="#2a2a2c" stroke="#000" strokeOpacity="0.5" />
              </g>

              <g ref={set("head")}>
                <g ref={set("earL")}>
                  <ellipse cx="138" cy="380" rx="46" ry="60" fill={skin} />
                  <ellipse cx="138" cy="380" rx="46" ry="60" fill={u("shade")} />
                  <path d="M150 348 Q118 360 124 392 Q130 416 150 414" fill="none" stroke="#a24c2e" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" />
                  <ellipse cx="136" cy="392" rx="24" ry="22" fill={u("blush")} />
                </g>
                <g ref={set("earR")}>
                  <ellipse cx="462" cy="380" rx="46" ry="60" fill={skin} />
                  <ellipse cx="462" cy="380" rx="46" ry="60" fill={u("shade")} />
                  <path d="M450 348 Q482 360 476 392 Q470 416 450 414" fill="none" stroke="#a24c2e" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" />
                  <ellipse cx="464" cy="392" rx="24" ry="22" fill={u("blush")} />
                </g>

                <path d="M300 150 C402 150 470 226 470 348 C470 472 396 562 300 562 C204 562 130 472 130 348 C130 226 198 150 300 150 Z" fill={skin} />
                <path d="M300 150 C402 150 470 226 470 348 C470 472 396 562 300 562 C204 562 130 472 130 348 C130 226 198 150 300 150 Z" fill={u("shade")} />
                <path d="M300 150 C402 150 470 226 470 348 C470 472 396 562 300 562 C204 562 130 472 130 348 C130 226 198 150 300 150 Z" fill={u("hi")} />

                <g ref={set("blush")}>
                  <ellipse cx="190" cy="430" rx={happy ? 50 : 44} ry={happy ? 34 : 30} fill={u("blush")} />
                  <ellipse cx="410" cy="430" rx={happy ? 50 : 44} ry={happy ? 34 : 30} fill={u("blush")} />
                </g>

                <g ref={set("face")}>
                  <g ref={set("brows")}>
                    <path d={happy ? "M198 292 Q230 270 264 286" : "M198 300 Q230 282 264 294"} fill="none" stroke={hair} strokeWidth="22" strokeLinecap="round" />
                    <path d={happy ? "M336 286 Q370 270 402 292" : "M336 294 Q370 282 402 300"} fill="none" stroke={hair} strokeWidth="22" strokeLinecap="round" />
                  </g>

                  <g ref={set("eyes")}>
                    {happy ? (
                      <>
                        <path d="M214 356 Q240 324 266 356" fill="none" stroke="#111" strokeWidth="13" strokeLinecap="round" />
                        <path d="M334 356 Q360 324 386 356" fill="none" stroke="#111" strokeWidth="13" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        <ellipse cx="240" cy="350" rx="25" ry="31" fill={u("eye")} />
                        <circle cx="231" cy="336" r="8.5" fill="#fff" />
                        <circle cx="250" cy="361" r="3.5" fill="#fff" opacity="0.8" />
                        <ellipse cx="360" cy="350" rx="25" ry="31" fill={u("eye")} />
                        <circle cx="351" cy="336" r="8.5" fill="#fff" />
                        <circle cx="370" cy="361" r="3.5" fill="#fff" opacity="0.8" />
                      </>
                    )}
                  </g>

                  <g transform={happy ? "translate(300 440) scale(1.06 1.12) translate(-300 -440)" : undefined}>
                    <path d="M218 440 Q300 458 382 440 Q376 524 300 530 Q224 524 218 440 Z" fill="#3d0f0f" />
                    <g clipPath={u("mouth")}>
                      <ellipse cx="300" cy="530" rx="46" ry="22" fill="#d9575a" />
                      <path d="M210 436 Q300 456 390 436 L390 474 Q300 490 210 474 Z" fill="#fff" />
                      <path d="M236 516 Q300 500 364 516 L364 540 L236 540 Z" fill="#f3efe9" />
                      <path d="M262 452 V484 M300 456 V488 M338 452 V484" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
                    </g>
                    <path d="M218 440 Q300 458 382 440 Q376 524 300 530 Q224 524 218 440 Z" fill="none" stroke="#8a3524" strokeOpacity="0.45" strokeWidth="3" />
                    <path d="M208 432 Q212 442 220 446 M392 432 Q388 442 380 446" fill="none" stroke="#a24c2e" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" />
                  </g>

                  <g ref={set("nose")}>
                    <ellipse cx="300" cy="414" rx="28" ry="12" fill="#6b2a14" opacity="0.14" />
                    <ellipse cx="300" cy="398" rx="29" ry="26" fill={skin} />
                    <ellipse cx="300" cy="398" rx="29" ry="26" fill={u("nose")} />
                    <ellipse cx="291" cy="387" rx="10" ry="8" fill="#fff" opacity="0.45" />
                  </g>
                </g>

                <g ref={set("hair")}>
                  <path d={HAIR_STYLES[hairStyle].outline} fill={hair} />
                  <path d={HAIR_STYLES[hairStyle].outline} fill={u("hair-light")} />
                  <g clipPath={u("hair-clip")} fill="none" strokeLinecap="round">
                    {HAIR_STYLES[hairStyle].strands.map((d, i) => (
                      <path key={d} d={d} stroke={hairHighlight} strokeWidth={i % 2 ? 5 : 7} opacity={i % 2 ? 0.22 : 0.36} />
                    ))}
                    <path d="M140 289 Q150 257 158 245 M145 320 Q157 286 162 274 M153 345 L162 323 M447 345 L439 322 M454 317 Q443 284 439 272 M461 289 Q450 257 442 245" stroke={hairHighlight} strokeWidth="3" opacity="0.18" />
                  </g>
                  <path d="M170 267 C210 235 240 260 285 248 C334 240 367 211 416 244" fill="none" stroke="#000" strokeWidth="6" opacity="0.08" />
                </g>
              </g>
            </g>
            <path d="M15 660 A285 44 0 0 0 585 660 L565 660 A265 28 0 0 1 35 660 Z"
              fill={u("portal-rim")} stroke={ink} strokeWidth="4" strokeLinejoin="round" />
            <path d="M45 682 Q300 728 555 682" fill="none" stroke="#eeeeea" strokeWidth="3" opacity="0.7" />
          </svg>
        </button>
        <div className="mph-speech" aria-hidden="true">
          <span className="mph-bubble" data-on={happy ? "true" : "false"}>
            {greeting}
          </span>
        </div>
        <span id={id("greeting")} className="mph-sr-only" role="status" aria-live="polite" aria-atomic="true">
          {happy ? greeting : ""}
        </span>
      </div>
    </div>
  )
}
