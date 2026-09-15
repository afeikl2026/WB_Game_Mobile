# WillBet Casino Mobile Prototype

A static HTML, CSS and Vanilla JavaScript prototype for WillBet Casino. Open `index.html` directly or serve this directory with any static web server.

## Prototype and Specs Mode

The prototype opens in **Prototype** mode by default. Use the compact `Prototype / Specs` control above the bottom navigation to enter **Specs** mode.

In Specs mode, annotated elements show a numbered requirement marker. Select either a marker or the annotated UI element to open its requirement:

- On desktop, details open in a right-side Requirement Drawer.
- On mobile, details open as a Bottom Sheet.
- Use the Requirements control in Specs mode to open the searchable Requirement List.

Leaving Specs mode hides all markers, highlights and requirement panels. Prototype interactions remain unchanged in Prototype mode.

## Requirement Data

Structured requirement records are maintained in [requirements.js](./requirements.js). Each entry contains its requirement ID, title, page, description, optional rules and criteria, status, version, a navigation route and optional CSS selectors for binding.

Do not place requirement copy directly in `index.html`. Add or edit records in `requirements.js` instead.

### Add a requirement

1. Add a structured object to `window.CASINO_REQUIREMENTS` in `requirements.js`.
2. Give it a stable ID, such as `REQ-CASINO-058`.
3. Add one or more `selectors` that identify the relevant rendered UI elements.
4. Add a `route` such as `{ view: 'casino', category: 'slots' }` so the list and deep links can navigate to it.
5. Use `status: 'To Confirm'` when behavior cannot be verified from the prototype or project documentation.

At runtime, `specs.js` writes the matching IDs into each element’s `data-requirement` attribute. This keeps requirements independent from DOM order and allows one requirement to bind to several elements.

For a stable static element, a direct binding may also be added manually:

```html
<button data-requirement="REQ-CASINO-005">Providers</button>
```

## Requirement deep links

Append a requirement ID to the prototype URL:

```text
?spec=REQ-CASINO-004
```

For example, `index.html?spec=REQ-CASINO-004` automatically enables Specs mode, navigates to the required page state, highlights the bound element and opens its requirement.

## GitHub Pages

All Specs Mode assets use relative paths and require no runtime service or third-party dependency, so the static prototype remains compatible with GitHub Pages.
