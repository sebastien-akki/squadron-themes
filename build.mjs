import { mkdirSync, writeFileSync } from 'node:fs'

const THEMES = {
  'theme-darcula': {
    name: 'Darcula',
    from: { en: 'Darcula, PhpStorm’s classic dark theme', fr: 'de Darcula, le thème sombre classique de PhpStorm' },
    app: '#232525', side: '#282a2b', main: '#2b2b2b', s1: '#313335', s2: '#3c3f41', s3: '#45494a', s4: '#4e5254', s5: '#5e6366',
    border: '#393b3d', strong: '#515658', text: '#cccccc', bright: '#e6e6e6', muted: '#a3a3a3',
    accent: '#cc7832', link: '#589df6', ok: '#7ea36b', done: '#a5c261', err: '#ff6b68', info: '#6897bb', purple: '#9876aa',
  },
  'theme-new-ui-dark': {
    name: 'New UI Dark',
    from: { en: 'the dark theme of PhpStorm’s new UI', fr: 'du thème sombre de la nouvelle interface de PhpStorm' },
    app: '#191a1c', side: '#1e1f22', main: '#212225', s1: '#2b2d30', s2: '#2f3134', s3: '#393b40', s4: '#43454a', s5: '#4e5157',
    border: '#313438', strong: '#43454a', text: '#dfe1e5', bright: '#ffffff', muted: '#a0a3ab',
    accent: '#548af7', link: '#6b9bfa', ok: '#5fb865', done: '#a4d17a', err: '#f75464', info: '#2aacb8', purple: '#c77dbb',
  },
  'theme-high-contrast': {
    name: 'High Contrast',
    from: { en: 'PhpStorm’s High Contrast theme', fr: 'du thème Contraste élevé de PhpStorm' },
    app: '#000000', side: '#000000', main: '#000000', s1: '#0f0f0f', s2: '#161616', s3: '#222222', s4: '#2e2e2e', s5: '#3d3d3d',
    border: '#5a5a5a', strong: '#b0b0b0', text: '#ffffff', bright: '#ffffff', muted: '#d0d0d0',
    accent: '#1aebff', link: '#6eb8ff', ok: '#4ee07a', done: '#b5f03c', err: '#ff5c5c', info: '#66b2ff', purple: '#d29bff',
  },
  'theme-dracula': {
    name: 'Dracula',
    from: { en: 'the Dracula theme for JetBrains IDEs', fr: 'du thème Dracula pour les IDE JetBrains' },
    app: '#191a21', side: '#21222c', main: '#282a36', s1: '#303241', s2: '#363849', s3: '#44475a', s4: '#4d5066', s5: '#5a5e78',
    border: '#343746', strong: '#565970', text: '#f8f8f2', bright: '#ffffff', muted: '#b1b6d4',
    accent: '#ffb86c', link: '#8be9fd', ok: '#8be9fd', done: '#50fa7b', err: '#ff5555', info: '#bd93f9', purple: '#ff79c6',
  },
  'theme-one-dark': {
    name: 'One Dark',
    from: { en: 'the One Dark theme for JetBrains IDEs', fr: 'du thème One Dark pour les IDE JetBrains' },
    app: '#181a1f', side: '#21252b', main: '#282c34', s1: '#2c313a', s2: '#323842', s3: '#3a404b', s4: '#434a56', s5: '#4f5666',
    border: '#343a45', strong: '#4b5263', text: '#d7dae0', bright: '#ffffff', muted: '#9da5b4',
    accent: '#d19a66', link: '#61afef', ok: '#56b6c2', done: '#98c379', err: '#e06c75', info: '#61afef', purple: '#c678dd',
  },
  'theme-nord': {
    name: 'Nord',
    from: { en: 'the Nord theme for JetBrains IDEs', fr: 'du thème Nord pour les IDE JetBrains' },
    app: '#242933', side: '#292e39', main: '#2e3440', s1: '#333946', s2: '#3b4252', s3: '#434c5e', s4: '#4c566a', s5: '#566176',
    border: '#373e4c', strong: '#4c566a', text: '#e5e9f0', bright: '#eceff4', muted: '#aab3c3',
    accent: '#ebcb8b', link: '#88c0d0', ok: '#8fbcbb', done: '#a3be8c', err: '#d57780', info: '#81a1c1', purple: '#b48ead',
  },
  'theme-noel': {
    name: { en: 'Christmas theme 🎅', fr: 'Thème Noël 🎅' },
    description: {
      en: 'Christmas colors, and a Snow panel where flakes and little Santas fall. Pick it in Settings › Theme.',
      fr: 'Les couleurs de Noël, et un panneau Neige où tombent des flocons et des petits pères Noël. Choisissez-le dans Réglages › Thème.',
    },
    logo: 'santa.svg',
    contributes: {
      items: [
        { slot: 'agent.tools', id: 'snow', label: { en: 'Snow ❄️', fr: 'Neige ❄️' }, hint: { en: 'Let snow and little Santas fall 🎅', fr: 'Faire tomber la neige et les petits pères Noël 🎅' }, icon: 'logo', action: { 'panel.open': 'snow' } },
        { slot: 'agent.menu', id: 'snow-menu', label: { en: '🎅 Let it snow ❄️', fr: '🎅 Faire neiger ❄️' }, icon: 'logo', action: { 'panel.open': 'snow' } },
      ],
      panels: [{ id: 'snow', title: { en: '❄️ Snow ❄️', fr: '❄️ Neige ❄️' }, page: 'snow.html' }],
    },
    app: '#0d1712', side: '#112019', main: '#14261d', s1: '#1a3024', s2: '#20382b', s3: '#284434', s4: '#30503e', s5: '#3b5f4a',
    border: '#21392c', strong: '#3a5a47', text: '#eee8d8', bright: '#fffaf0', muted: '#b4bba8',
    accent: '#f2c14e', link: '#8fc7ef', ok: '#6cc070', done: '#a8d672', err: '#ff6b6b', info: '#7fb8e6', purple: '#d88fd8',
    override: { 'bg-tabs': '#5c1419', ink: '#6e1219' },
  },
}

const VERSION = '0.1.1'

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const hex = (c) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
const mix = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t))
const rgba = (a, alpha) => `rgba(${rgb(a).join(', ')}, ${alpha})`
const luminance = (a) => {
  const [r, g, b] = rgb(a).map((v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const inkOn = (a) => mix(a, '#000000', 0.84)

function vars(p) {
  const a = p.accent
  const dashed = mix(p.strong, p.muted, 0.25)
  return {
    'bg-app': p.app, 'bg-sidebar': p.side, 'bg-main': p.main, 'bg-rail': mix(p.app, p.side, 0.5), 'bg-tabs': mix(p.main, p.s1, 0.35),
    'surface-1': p.s1, 'surface-2': p.s2, 'surface-3': p.s3, 'surface-4': p.s4, 'surface-5': p.s5,
    menu: mix(p.s2, p.s3, 0.5), 'menu-hover': p.s4, overlay: rgba(p.app, 0.74),
    border: p.border, 'border-strong': p.strong, 'border-dashed': dashed, 'border-focus': mix(p.border, p.text, 0.45),
    text: p.text, 'text-strong': p.bright, 'text-2': mix(p.text, p.muted, 0.3), 'text-3': mix(p.text, p.muted, 0.45),
    'text-muted': p.muted, 'text-dim': mix(p.muted, p.main, 0.1), 'text-faint': mix(p.muted, p.main, 0.5), ink: mix(p.main, '#000000', 0.3),
    accent: a, 'accent-ink': inkOn(a), 'accent-soft': mix(a, '#ffffff', 0.55), 'accent-link': p.link,
    'wait-bg': mix(p.main, a, 0.16), 'wait-border': mix(p.main, a, 0.55), 'wait-text': mix('#ffffff', a, 0.06), 'wait-text-2': mix('#ffffff', a, 0.2),
    'wait-muted': mix('#ffffff', a, 0.4), 'wait-btn': mix(p.main, a, 0.3), 'wait-btn-text': mix('#ffffff', a, 0.2), 'wait-note': mix(p.main, a, 0.1),
    option: mix(p.main, a, 0.2), 'option-on': mix(p.main, a, 0.32), 'option-off': mix(p.main, a, 0.12),
    ok: p.ok, 'ok-text': mix(p.ok, '#ffffff', 0.35), 'ok-line': mix(p.ok, p.main, 0.3), 'ok-bg': rgba(p.ok, 0.1),
    done: p.done, 'done-text': mix(p.done, '#ffffff', 0.3),
    err: p.err, 'err-text': mix(p.err, '#ffffff', 0.35), 'err-muted': mix(p.err, '#ffffff', 0.5), 'err-bg': mix(p.main, p.err, 0.1),
    'err-border': mix(p.main, p.err, 0.5), 'err-ink': inkOn(p.err), 'err-pre': mix(p.app, p.err, 0.04), 'del-bg': rgba(p.err, 0.1), 'del-line': mix(p.err, p.main, 0.35),
    background: p.info, 'background-line': mix(p.info, p.main, 0.35), 'background-bg': rgba(p.info, 0.12),
    'remote-dot': p.info, 'remote-text': mix(p.info, '#ffffff', 0.4), merged: p.purple, 'merged-text': mix(p.purple, '#ffffff', 0.25),
    'sub-running': p.ok, 'sub-waiting': a, 'sub-error': p.err, 'sub-done': mix(p.done, p.main, 0.25), 'sub-done-cell': mix(p.done, p.main, 0.5), 'sub-stopped': dashed,
  }
}

const CHECKS = [
  ['text', 'bg-main', 7], ['text', 'bg-sidebar', 7], ['text-muted', 'bg-main', 4.5], ['text-dim', 'bg-main', 4.5], ['text-3', 'surface-2', 4.5],
  ['ink', 'text', 7], ['accent-ink', 'accent', 4.5], ['accent', 'bg-main', 3], ['accent-link', 'bg-main', 4.5],
  ['wait-text', 'wait-bg', 7], ['wait-muted', 'wait-bg', 4.5], ['wait-btn-text', 'wait-btn', 4.5], ['text', 'option-on', 4.5],
  ['text', 'bg-tabs', 7], ['ink', 'ok', 4.5], ['ink', 'done', 4.5], ['ok-text', 'bg-main', 4.5], ['done-text', 'bg-main', 4.5], ['err-text', 'err-bg', 4.5], ['err-ink', 'err', 4.5], ['remote-text', 'bg-main', 4.5],
]

function check(id, v) {
  const failed = CHECKS.map(([fg, bg, min]) => [fg, bg, min, contrast(v[fg], v[bg])]).filter(([, , min, ratio]) => ratio < min)
  for (const [fg, bg, min, ratio] of failed) console.error(`${id}: --${fg} on --${bg} is ${ratio.toFixed(2)}, below ${min}`)
  return failed.length === 0
}

const logo = (v) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="${v['bg-main']}"/><rect x="6" y="7" width="20" height="4" rx="2" fill="${v.text}"/><circle cx="9" cy="21" r="4" fill="${v.accent}"/><circle cx="16" cy="21" r="4" fill="${v.ok}"/><circle cx="23" cy="21" r="4" fill="${v.merged}"/></svg>\n`

const manifest = (id, t, theme) => ({
  id,
  version: VERSION,
  api: 1,
  squadron: '>=0.47.0',
  name: typeof t.name === 'string' ? { en: `${t.name} theme`, fr: `Thème ${t.name}` } : t.name,
  description: t.description ?? {
    en: `Recolors Squadron with a dark palette inspired by ${t.from.en}. Pick it in Settings › Theme.`,
    fr: `Recolore Squadron avec une palette sombre inspirée ${t.from.fr}. Choisissez-le dans Réglages › Thème.`,
  },
  logo: t.logo ?? 'logo.svg',
  contributes: { ...t.contributes, theme },
})

const built = Object.entries(THEMES).map(([id, t]) => [id, t, { ...vars(t), ...t.override }])
if (!built.every(([id, , v]) => check(id, v))) process.exit(1)
if (process.argv.includes('--check')) process.exit(0)

for (const [id, t, v] of built) {
  mkdirSync(id, { recursive: true })
  writeFileSync(`${id}/extension.json`, JSON.stringify(manifest(id, t, v), null, 2) + '\n')
  if (!t.logo) writeFileSync(`${id}/logo.svg`, logo(v))
}
console.log(`${built.length} themes written: ${built.map(([id]) => id).join(', ')}`)
