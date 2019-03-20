# js-upload-preview
use js preview the image upload

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="upload_image_widget.css">
    <title>Upload Image Widget</title>
  </head>
  <body>
    <input type="file" name="upload" class="upload testing" data-uiw-width="400" data-uiw-del="true">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="upload_image_widget.js"></script>
    <script>
      $(function(){
        upload_image_widget.init($(".upload"));
      })
    </script>
  </body>
</html>
```

## attribute:<br>
data-uiw-width; //number default: 300<br>
data-uiw-height; //number default: 0<br>
data-uiw-mode; //auto, cover default: cover<br>
data-uiw-del; //boolean, default: false<br>
data-uiw-path; //file path, default: null

provide the "data-uiw-path", when you in edit page;

## method:
generate();

```
const source = {
  field: "fieldName", //element name
  width: 280,
  height: 280,
  model: cover,
  del:true
},
const element = upload_image_widget.generate(source);
$('#parentElement').append(element);
```
