(function () {
    var PLUGIN_NAME = 'snippet';
    tinymce.PluginManager.requireLangPack(PLUGIN_NAME);

    tinymce.create('tinymce.plugins.SnippetPlugin', {
        init: function (ed, url) {
            // Data
            s_data = ed.getParam('snippet_list');
            // Relative plugin path
            s_url = url;
            // Button image
            s_image = s_url + '/img/snippet_button.gif';
            // Title
            s_title = PLUGIN_NAME + '.title';
            // Plugin CSS class
            s_class = 'snippet_list';

            // Register CSS
            ed.onBeforeRenderUI.add(function () {
                tinymce.DOM.loadCSS(s_url + '/css/' + PLUGIN_NAME + '.css');
            });
        },

        createControl: function (n, cm) {
            switch (n) {

                // First type = snippet with submenu support
                case 'snippetmenu':
                    var c = cm.createMenuButton(n, {
                        title: s_title,
                        image: s_image,
                        icons: false
                    });

                function addItems(data, c, m, level) {

                    if (typeof level === "undefined") {
                        level = 0;
                    }

                    for (var i = 0; i < data.length; i++) {

                        // Create submenu
                        if (typeof data[i].items !== "undefined") {

                            var sub = m.addMenu({title: data[i].title});

                            if (level > 1
                                && typeof data[i].value !== "undefined"
                                && data[i].value !== ""
                            ) {
                                sub.add({
                                    title: data[i].title,
                                    onclick: function (g) {
                                        return function () {
                                            tinyMCE.activeEditor.execCommand('mceInsertContent', false, g.value);
                                            if(typeof g.onSelect !== "undefined") {
                                                g.onSelect();
                                            }
                                        };
                                    }(data[i])
                                });
                                sub.addSeparator();
                            }

                            level++;
                            addItems(data[i].items, c, sub, level);
                        }
                        // Create action button
                        else {
                            m.add({
                                title: data[i].title,
                                onclick: function (g) {
                                    return function () {
                                        tinyMCE.activeEditor.execCommand('mceInsertContent', false, g.value);
                                        if(typeof g.onSelect !== "undefined") {
                                            g.onSelect();
                                        }
                                    };
                                }(data[i])
                            });
                        }
                    }
                }

                    if (typeof s_data !== "undefined") {
                        c.onRenderMenu.add(function (c, m) {
                            addItems(s_data, c, m);
                        });
                    }
                    else {
                        console.log("var snippet_data is not defined");
                    }

                    // Return menu button instance
                    return c;
            }
            return null;
        }
    });

    // Register plugin
    tinymce.PluginManager.add(PLUGIN_NAME, tinymce.plugins.SnippetPlugin);
})();