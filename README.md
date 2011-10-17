Dialogs -- Minimalistic Html5 Dialogs Templates
=======

Dialogs.js the bare essentials for building a single html webapp. 

It supports dialog similar to the one in jquery-ui, but with less than 2k minified.


Example
-------
http://dialogs.heroku.com/index.html

Setup
-------
<script type="text/javascript">
  $("body").dialogs();
</script>


HTML
-------
The HTML follows these simple pattern:

  <body class="carton"> <!-- class carton mandatory. -->

    <div class="panes">
      <div id="pane-a" class="pane"> <!-- only one pane is showed at a time under a carton -->
        <h1>Header</h1>
      </div>
      <div id="pane-b" class="pane">
      </div>
    </div>
    <div id="dialogs"> 
      <div id="progress-dialog" class="dialog"> <!-- dialog is showed when show() is called. (eg, $("#progress-dialog").show()) -->
        <h1>Dialog 1</h1>
      </div>
      <form id="browser-dialog" class="dialog" action="" method="POST">
        <h1>Dialog 2</h1>
      </form>
    </div>

Credits
-------

Created by Thomas Yip

(c) 2011 BeeDesk, Inc. See LICENSE.txt for license.