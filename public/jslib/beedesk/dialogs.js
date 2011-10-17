/*
 * Basic dialogs
 */
(function($) {

  $.fn.dialogs = function(options) {

    var options = $.extend({
      modal: ".carton",
      dialogs: "#dialogs .dialog",
      panes: "#panes .pane"
    }, options);

    var $dialogs = $(options.dialogs); 
    var $panes = $(options.panes);
    var $modal = $(options.body);
    
    var prerolls = [];

    $.fn.hasAttr = function(name) {
      var attr = this.attr(name);
      return attr !== undefined && attr !== false;
    };
  
    $.fn.show = function() {
      var $dialog = $(this);
      $dialog.addClass("show");
      $(options.modal).addClass("modal");
    };
  
    $.fn.hide = function() {
      var $dialog = $(this);
      $dialog.removeClass("show");

      var $visible = $(options.dialogs).filter("show");
      if ($visible.length > 0) {
        $(options.modal).removeClass("modal");
      }
    };

    function init() {
      var $current;

      // Make sure exactly one child of body has "current" class
      if ($panes.length > 0) {
        if ($panes.filter(".current").length == 0) {
            $current = $panes.first();
        } else {
            $current = $panes.filter(".current").first();
            $panes.removeClass("current");
        }
      } else if ($(".pane").length > 0) {
        console.warn("Cannot find any $(" + options.panes + ")'. Used $('.pane') instead.");
        $current = $($(".pane")[0]);
      } else {
        console.error("No '.pane' defined");
      }
      $current.addClass("current");
    }
    
    function parsesearch(q) {
      // Andy E and other @http://stackoverflow.com/posts/2880929/revisions
      var results = {};
      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); };

      while (e = r.exec(q)) {
         results[d(e[1])] = d(e[2]);
      }
      return results;
    };
    
    var defaultrolls = [
      function(contin) {
        // detect browser
        var agent = navigator.userAgent.toLowerCase();
        if (agent.search("webkit") > -1 || agent.search("chrome") > -1) {
          contin();
        } else {
          $("#browser-dialog").bind("cancel", function() {
            contin();
          });
          $("#browser-dialog").show();
        }
      },
      function(contin) {
        // handle special instruction pass as url#foo=abc&bar=def
        var hash = location.hash;
        if (!hash || hash.length === 0 || hash === '#' || hash.indexOf("#") !== 0) {
          contin();
        }

        location.hash = "";

        var paris = parsesearch(hash.substring(1));
        var action = paris.action;
        switch(action) {
        default:
          contin();
          break;
        }
      },
      function(contin) {
        init();
        contin();
      }
    ];

    function loop() {
      var rolls = defaultrolls.concat(prerolls);
      var i = 0;
      var contin = function() {
        if (i < rolls.length) {
          var preroll = rolls[i++];
          preroll(contin);
        }
      };
      contin();
    }

    $(document).bind('ready', function() {
      $(options.dialogs).find("input[type='button'].cancel").bind("click", function(event) {
        event.preventDefault();

        console.warn("trigger cancel");

        var $dialog = $(this).closest(".dialog");
        $dialog.trigger("cancel");
      });

      $("#dialogs").delegate(".dialog", "cancel", function(event) {
        console.warn("default cancel");

        var $dialog = $(this);
        $dialog.removeClass("show");
        $("body").removeClass("modal");
      });

      $(options.modal).delegate(options.dialogs, "submit", function(event) {
        event.preventDefault();
        
        // workaround the problem that validation might be run after
        // the form submit.
        var $dialog = $(this);
        $dialog.trigger("validated-submit");
      });

      if ($.fn.validate) {
        $(options.dialogs).each(function(n, dialog) {
          $(dialog).validate({
            rules: {
              name: {required: true, minlength: 3},
              password: {required: true, minlength: 5},
              password_confirm: {required: true, minlength: 5, equalTo: ".dialog.show #password"},
              password_new: {required: true, minlength: 5},
              password_new_confirm: {required: true, minlength: 5, equalTo: ".dialog.show #password_new"}
            }
          });
        });
      }      
      loop();
    });
    
    var pub = {
      prerolls: prerolls
    };

    return pub;
  };
})(jQuery);

