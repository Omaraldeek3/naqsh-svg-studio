# Ornament focus — 2026-10-01

The user prioritizes Arabic, Islamic and botanical ornament for design work.
The previous expansion placed 13,636 icons beside eight generic patterns,
which did not match that purpose.

The default library now contains 288 ornament compositions in six sections
of 48 each. Eight motif families per section have six distinct compositions.
Geometry is checked after removing names and normalizing internal IDs, so
palette changes and title changes do not inflate the count. The originals
are contemporary constructions inspired by ornament, under CC0.

Primary navigation groups Islamic geometry, arabesque, botanical ornament,
rosettes, ornamental frames and borders. Secondary interface categories are
collapsed in the sidebar. Library and collection scopes separate ornaments,
interface assets and the full catalog. Favorites retain assets from every
scope. Existing project IDs and local drafts remain compatible.

The studio starts with arabesque. Ornaments export on transparent backgrounds
by default, retain their geometry when changing aspect ratio, and expose line
thickness. Islamic tiling also exposes density. Pattern references are
namespaced when composed with other layers. Physical SVGs, the manifest,
ornament ZIP and full ZIP are regenerated locally with `npm run export:assets`.

Acceptance: default cards are ornaments, each category returns 48 assets,
botanical keyword search works, secondary icons remain accessible, scoped
collections download, tiling customization changes output, projects reload,
and mobile rendering has no horizontal overflow.

Verified: 14 core tests, 15 production browser tests, all 384 original XML and
React exports, and production build passed. Independent review found a scope
mismatch when returning from filtered favorites; its regression failed before
the fix and passed afterwards in both scope directions.
