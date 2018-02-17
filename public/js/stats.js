$(document).ready(function() {

  $.ajax({
    type: "GET",

    url: "https://snappy-slackbot.herokuapp.com/api/teams",
    success: function(data) {
      var active_teams_count = data.active_teams_count;
      $('#active_teams_count').hide().text(
        active_teams_count + " Active Teams!"
      ).fadeIn('slow');
    },
  });

});
