# Photos

Drop gallery images in this folder, then reference them in `index.html`:

```html
<div class="photo"><img src="photos/your-photo.jpg" alt="Santa Michael with a family"></div>
```

Tips:
- Use `.jpg` for photos, `.png` for graphics with transparency.
- Aim for ~1200px on the long edge and compress (e.g. https://squoosh.app) so the
  page loads fast.
- Always write a short, descriptive `alt` text for accessibility & SEO.
- The gallery tiles are cropped to a 4:5 portrait ratio.

This file just keeps the folder in git (git ignores empty folders). You can
delete it once real photos are added.
