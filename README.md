# Squadron themes

Six dark themes for Squadron, inspired by PhpStorm and by popular JetBrains themes. Each theme is its own extension, in its own folder:

| Extension | Inspired by |
| --- | --- |
| `theme-darcula` | Darcula, PhpStorm's classic dark theme |
| `theme-new-ui-dark` | The dark theme of PhpStorm's new UI |
| `theme-high-contrast` | PhpStorm's High Contrast theme |
| `theme-dracula` | Dracula |
| `theme-one-dark` | One Dark |
| `theme-nord` | Nord |

## Use

Install the theme you want from Settings › Extensions › Discover, or add its folder (Add an extension › A folder on this computer), and turn it on. Turn it off to go back to Squadron's copper theme.

Turn on one theme at a time: Squadron merges the colors of every active extension, so two themes on together mix.

Each theme keeps Squadron's color roles: the accent marks what waits for you (permissions, questions, badges), green is a working agent, red an error. The terminal, the code editor and a few fixed colors listed in Squadron's `DESIGN.md` keep Squadron's own colors, since an extension cannot reach them. Squadron is dark only, so there is no light theme.

## What it asks Squadron for

Nothing: no WebAssembly, no program, no network. Each extension is an `extension.json` with `contributes.theme` and a logo.

## Change a theme

The palettes live in `build.mjs`: about twenty colors per theme, from which it derives Squadron's 68 color variables. It checks the contrast of text, the main button, waiting cards and errors, and writes nothing when one is too low.

```sh
node build.mjs
```

All themes share `VERSION` in `build.mjs`. Bump it, add a section to the `CHANGELOG.md` and `CHANGELOG.fr.md` of each theme, and publish each one with the tag `<id>/v<version>`.
