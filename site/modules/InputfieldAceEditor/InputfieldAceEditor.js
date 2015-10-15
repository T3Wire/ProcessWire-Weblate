// Generated by CoffeeScript 1.4.0
(function() {
  var Editor, _c,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _c = {
    part: {
      tools: 'ace-editor-tools',
      measure_node: 'hack_ace_measure_node'
    },
    status: {
      active: 'is-active'
    },
    options: {
      focus_mode: 'focus_mode'
    },
    size: {
      normal: {
        "class": 'setting-size-normal',
        line_height: 28
      }
    }
  };

  /* --------------------------------------------
       Begin editor.coffee
  --------------------------------------------
  */


  Editor = (function() {

    function Editor(config) {
      this.config = config;
      this.setup_hooks = __bind(this.setup_hooks, this);

      this.setup_html();
      this.setup_ace();
    }

    Editor.prototype.setup_html = function() {
      this.$textarea = $("#" + this.config.id).hide();
      this.$toolarea = this.$textarea.siblings("." + _c.part.tools);
      return this.$ace = $('<div/>').attr('id', "" + this.config.id + "_ace").data('for', "#" + this.config.id).insertAfter(this.$toolarea).addClass(_c.size.normal["class"]).height(this.config.rows * _c.size.normal.line_height).text(this.$textarea.val());
    };

    Editor.prototype.setup_ace = function() {
      this.ace = ace.edit(this.$ace.attr('id'));
      this.$measure_node = $('>div:not([class])', this.$ace);
      this.$measure_node.addClass(_c.part.measure_node);
      this.ace.getSession().setMode("ace/mode/" + this.config.mode);
      this.ace.setTheme("ace/theme/pw-light");
      this.ace.setShowInvisibles(this.config.f_invisible_characters);
      if (this.config.f_focus_mode === 1) {
        this.$ace.addClass(_c.options.focus_mode);
      }
      this.ace.getSession().setUseWrapMode(true);
      this.ace.getSession().setWrapLimitRange(null);
      this.ace.setShowPrintMargin(false);
      this.ace.renderer.setShowGutter(true);
      this.ace.setSelectionStyle('text');
      this.ace.setShowFoldWidgets(true);
      this.ace.setHighlightActiveLine(false);
      this.drop_target = $('#wrap_Inputfield_images .ui-widget-content').get(0);
      return this.setup_hooks();
    };

    Editor.prototype.setup_hooks = function() {
      var _this = this;
      this.ace.on('blur', function(e) {
        return _this.$textarea.val(_this.ace.getValue().replace(/\s+$/g, ""));
      });
      this.ace.on('changeSelection', function(e) {
        return _this.highlight_active_line;
      });
      this.ace.container.addEventListener('drop', function(e) {
        var dropEvt;
        dropEvt = document.createEvent("Event");
        dropEvt.initEvent("drop", true, true);
        dropEvt.dataTransfer = e.dataTransfer;
        _this.drop_target.dispatchEvent(dropEvt);
        e.preventDefault();
        return e.stopPropagation();
      });
      return true;
    };

    Editor.get_active_line_index = function() {
      return this.ace.getCursorPosition().row - this.ace.getFirstVisibleRow();
    };

    Editor.prototype.highlight_line = function(index) {
      return $('.ace_line_group', this.$ace).removeClass(_c.status.active).eq(index).addClass(_c.status.active);
    };

    Editor.prototype.highlight_active_line = function() {
      return this.highlight_line(this.get_active_line_index());
    };

    return Editor;

  })();

  /* --------------------------------------------
       Begin InputfieldAceEditor.coffee
  --------------------------------------------
  */


  $(function() {
    var editors;
    if (config.InputfieldAceEditor) {
      editors = [];
      return $.each(config.InputfieldAceEditor, function(i, el) {
        return editors[el] = new Editor(config[el]);
      });
    }
  });

}).call(this);