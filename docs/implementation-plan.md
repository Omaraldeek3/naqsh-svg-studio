# Naqsh implementation plan

Goal: ship the complete authorized SVG library and studio in an independent folder.
Spec: `docs/design.md`.

- [x] Foundation: isolated package/config/layout; meaningful failing tests for catalog, SVG generation, exports and composition.
- [x] Original content: twelve category definitions, 96 assets, parameterized SVG recipes, palettes, safe import and searchable metadata.
- [x] Library: RTL responsive sidebar, search/category/style/sort, favorites and collections; real thumbnails and loading/empty states.
- [x] Customization and export: live controls, UI previews, SVG/PNG/code/CSS, category ZIPs.
- [x] Composition: layers, pointer/keyboard placement, resize/rotate/opacity/order, history, drafts, project JSON.
- [x] Proof and delivery: focused browser tests, desktop/mobile visual review, production build, static export, README, MIT code license and CC0 assets; open local preview.

Execute inline. No remote deployment or repository publication is assumed from a request to build a reviewable local project; the static output is ready for publishing to GitHub. No edits to the parent portfolio. Dependencies reuse pinned installed versions; package remains independently installable. All product state is local, no simulated accounts or services.

Integration adjustment: exclude `svg-studio` in the parent TypeScript configuration so the standalone application's TypeScript/Next files do not become part of the portfolio compilation. No parent product source changed.

Review: independent read-only review found XML comments/CDATA and literal braces in React exports, whitespace in gradient references, quote handling in root SVG resizing, and ID conflicts in canvas layers. Reproduction tests failed before fixes and now pass. Nine core tests and nine browser flows pass. No unresolved important review findings.
