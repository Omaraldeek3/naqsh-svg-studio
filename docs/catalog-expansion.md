# Catalog expansion

User requested over 10,000 SVGs. Delivered inventory: 13,724 assets: 96 original
Naqsh designs + 6,198 distinct Tabler icons + 7,430 distinct Material Design Icons.

Source: Iconify icon-sets, pinned snapshot
`43130404cc0c8be8d2d371492d806fa940852f5c`. Preserve MIT and Apache-2.0 licenses;
do not mark imported icons as Naqsh originals or CC0. Exclude hidden aliases,
duplicate geometry and constructs unsupported by the importer.

All files are stored locally in public/assets. Compact index contains metadata
only. Icon SVG bodies load when shown, with caching and deduplicated requests.
Library pagination has 24 items per page; studio picker has 8 items per page.
Search is pre-indexed, source-filterable, and includes Arabic keyword aliases.
Saved projects embed source geometry for cold reload without fetching files.

Verified: 12 core tests and 12 production-browser tests passed; TypeScript and
production static build passed. Delayed source loads are ignored when the studio
has unmounted, preventing them from replacing subsequent edits.

ZIP packs include original notices. Individual SVG/React/CSS exports preserve
source notices. PNG exports embed UTF-8 source notices in an iTXt chunk.
Branding packs are generated in bounded batches with progress;
unmodified packs use pre-built local ZIPs.
