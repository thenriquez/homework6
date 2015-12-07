$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: "https://api.github.com/users/matt-taggart/repos/",
    success: function(repos) {
      for (var i = 0; i <= repos.length; i++) {
        var repoList = buildRepo(repos[i]);
        var commitList = buildCommit(repos[i])
        $(".container").append(repoList);
      }
    },
    error: function(jqXHR, textstatus, errorThrown) {
      console.log(jqXHR);
      console.log(teststatus);
      console.log(errorThrown);
    }
  });


  function buildRepo (repoData) {
    var repoName = repoData.full_name;

    var newEntry = $("<div>")
      .addClass("panel panel-default")
      .append("<div>")
      .addClass("panel-body")
      .append("<p>")
      .append(repoName);

    return newEntry;

  }


});