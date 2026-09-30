# Connected geometric ornament — 2026-10-01

The user supplied examples of a dense repeated star/polygon network and
framed geometric ribbons. The library now includes 96 further constructions:
12 network families with four geometric detail variants, and 12 ribbon
families with four compositions. The count is 384 ornament compositions,
480 originals and 14,108 library assets. Repeat tiles are export forms of
these designs and are not counted as additional assets.

Networks combine octagons, hexagons, truncated triangles, concave stars,
diamonds and rectilinear knots. Polygon lines are parallel geometric insets,
computed from intersections of adjacent shifted edges. Ribbons use complete
horizontal periods with framing rails. Multiple bands increase the drawing
space when necessary so low density does not overlap them.

The main gallery starts with these networks and ribbons. Featured links
filter the two sets of 48. Existing IDs, categories, favorites and drafts
remain compatible. The Islamic and ornamental border categories now each
have 96 assets; the other four ornament categories retain 48 each.

Customization supports primary/secondary colors, transparent background,
line thickness and density. SVG repeat-tile export shows the actual unit
with its native geometric dimensions; whole-drawing controls are hidden
there. CSS exports repeat that tile at its aspect ratio rather than scaling
the whole composition with cover. Adding to Studio still adds the complete
design and the button states that explicitly while viewing a tile.

Sources are new contemporary vector constructions inspired by the visual
references, not bitmap traces or claims of historical reproduction. They
fall under the existing original-asset CC0 dedication.

Verification includes distinct geometry, repeat-unit export, polygon inset
sanity, repeating CSS, browser PNG/SVG exports, XML parsing, and raster
edge comparisons for all 96 new units. Networks compare both axes;
ribbons compare the horizontal axis. The test caught missing lower boundary
cells in truncated-triangle networks. Review also caught an incomplete
zigzag period and missing edge connector copies in two ribbon families.
Those defects were fixed rather than relaxing the raster tolerance.

Final evidence: 16 core tests and 17 production browser tests passed; all
480 original SVG files parsed as XML; all 576 complete/tile React exports
parsed without syntax errors. Production build and TypeScript checks passed.
