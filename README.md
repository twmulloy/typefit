# TypeFit
Fit text to element by scaling the font-size of the text.

# Dependencies
None

# Bower
`$ bower install typefit`

# Usage
Include the script
```
<script src="tm.typefit.js"></script>
```

Apply `typefit` or `tf` attribute to element, these will be rendered automatically.
```
<h1 typefit>Suspendisse pellentesque purus massa, sit.</h1>
```
```
<h1 tf>Suspendisse pellentesque purus massa, sit.</h1>
```

Or invoke with javascript using the `typefit()` or `tf()` functions.
```
<h1 id='my-id'>Suspendisse pellentesque purus massa, sit.</h1>
<script>
  document.getElementById('my-id').tf();

  // Options
  document.getElementById('my-id').tf({
    scale: 0.5
  });
</script>
```

```
<h1 class='my-class'>Suspendisse pellentesque purus massa, sit.</h1>
<h2 class='my-class'>Suspendisse pellentesque purus massa, sit.</h2>
<h3 class='my-class'>Suspendisse pellentesque purus massa, sit.</h3>
<script>
  document.querySelectorAll('.my-class').tf();
</script>
```

```
<h1 my-attribute>Suspendisse pellentesque purus massa, sit.</h1>
<script>
  document.querySelector('[my-attribute]').tf();
</script>
```

To render registered elements
```
tm.typefit();
```

## jQuery
```
$('.my-class').get(0).tf();
```

```
$('.my-class')[0].tf();
```

## Webfonts
If using a webfont you will need to include a loader script such as [webfontloader](https://github.com/typekit/webfontloader) and trigger `tm.typefit()` after the webfont loaded event to render registered elements.

### Google Fonts
```
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
<script>
  WebFont.load({
    google: {
      families: ['Abril Fatface']
    },
    active: function() {
      tm.typefit(); // Render typefit
    }
  });
</script>
```