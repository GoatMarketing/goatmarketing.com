var SlackRubyBotServer = {};

$(document).ready(function() {

  SlackRubyBotServer.message = function(text) {
    $('#messages').fadeOut('slow', function() {
      $('#messages').fadeIn('slow').html(text)
    });
  };

  SlackRubyBotServer.error = function(xhr) {
    try {
      var message;
      if (xhr.responseText) {
        var rc = JSON.parse(xhr.responseText);
        if (rc && rc.message) {
          message = rc.message;
          if (message == 'invalid_code') {
            message = 'The code returned from the OAuth workflow was invalid.'
          } else if (message == 'code_already_used') {
            message = 'Coinbot has already been installed on this Slack team!'
          }
        }
      }

      SlackRubyBotServer.message(message || xhr.statusText || xhr.responseText || 'Unexpected Error');

    } catch(err) {
      SlackRubyBotServer.message(err.message);
    }
  };

  // Slack OAuth
  var code = $.url('?code')
  if (code) {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
        return "Wait! if you leave now Coinbot will not have finished installing!";
    }
    SlackRubyBotServer.message('Working, please wait ...');
    $('#register').hide();
    $.ajax({
      type: "POST",
      url: "https://snappy-slackbot.herokuapp.com/api/teams",
      crossDomain: true,
      data: {
        code: code
      },
      success: function(data) {
        SlackRubyBotServer.message('Hooray!<br><br>Direct Message <b>@coinbot</b><br />or create a <b>#channel</b> and invite <b>@coinbot</b> to it.');
      },
      error: SlackRubyBotServer.error
    });
  }
});
