# Fittext
Fit text to element by scaling the font-size of the text.

# Dependencies
None

# Usage
Include the script
`<script src="tm.fittext.js"></script>`

Apply `fittext` attribute to element
`<h1 fittext>Suspendisse pellentesque purus massa, sit.</h1>`

## Webfonts
If using a webfont you will need to include a loader script such as [webfontloader](https://github.com/typekit/webfontloader) and trigger `tm.fittext()` after the webfont loaded event.

### Google Fonts
```
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Abril Fatface']
    },
    active: function() {
      tm.fittext();
    }
  });
</script>
```