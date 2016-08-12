# TinyMCE Simple Snippet plugin
TinyMCE Simple Snippet plugin create simple multi level dropdown menu for inserting custom HTML code or plain text templates into your text.

This version supports ***TinyMCE 3.x***.

## Screenshot
dropdown **multilevel menu**

![image](screenshot.png)

## Install
* Copy plugin folder **src/tiny_mce/plugings/snippet** to your TinyMCE plugin folder (etc. tiny_mce/plugins/).

## Configuration
- Add `snippet` to param *plugins*
- Define param `snippet_list`
- Insert the button `snippetmenu`
```
tinyMCE.init({
    mode: "textareas",
    plugins: "snippet",
    snippet_list: snippet_data,
    theme_advanced_buttons2_add_before: "snippetmenu,|"
});
```
## Data


You must define data source `snippet_data`. Source must be defined before `tinyMCE.init` definition.
* `title` = menu item title
* `value` = HTML or plain text that will be inserted
* `items` = submenu = array of menu items

```
var snippet_data = [
{
    title: "Czech Republic",
    value: "",
    items: [
        {
            title: "West Bohemia",
            value: "",
            items: [
                {
                    title: "Mariánské Lázně",
                    value: "City: Mariánské Lázně"
                },
                {
                    title: "Plzeň",
                    value: "City: Plzeň"
                },
                {
                    title: "Karlovy Vary",
                    value: "City: Karlovy Vary"
                }
            ]
        }]
}
];
```
## Events


You can use the callback function:

* `onSelect` = callback function when selecting

```
var snippet_data = [
{
    title: "Cities",
    value: "",
    items: [
        {
            title: "Pilsen",
            value: "49.746955, 13.377288",
            onSelect: function (item) {
            
                //menu item name => Pilsen
                console.log(item.title);
                
                //menu item value => 49.746955, 13.377288
                console.log(item.value);
            }
        }]
}
];
```

## Demo

See the demo.

`/demo/index.html`
