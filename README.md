# minify-html

This plugin aims to reduce webpage loading speeds by minifying HTML files.

Given any .html file, when activated, the plugin will replace this file with
a minified version of the code. It will also generate a .max.html file with
the original unminified document's contents.

If the .max.html file has already been generated, the plugin can be used on
either the .html file or the .max.html file to update the minified .html file.

The minify-html plugin can be activated by selecting
"Packages > minify-html > minify" in the menu, or by pressing CTRL+ALT+M.
