$(document).ready(function () {

  $.ajax({
    type: "GET",
    url: "https://api.github.com/users/matt-taggart/repos",
    success: function(repos) {
      for (var i = 0; i <= repos.length; i++) {
        var repoList = buildRepo(repos[i]);
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
    var commitURL = "https://api.github.com/repos/matt-taggart/";
    commitURL += repoData.name;      
    commitURL += "/commits";

    var newLink = $("<a>")
      .attr("href", commitURL)
      .append(repoName);

    var newEntry = $("<div>")
      .addClass("panel panel-default")
      .append("<div>")
      .addClass("panel-body")
      .append(newLink);


    return newEntry;

  }


  $(document).on("click", "a", function(e) {
    e.preventDefault();

    $.ajax({
      type: "GET",
      url: $(this).attr("href"),
      context: this,
      success: function(commits) {
        for (var i = 0; i < commits.length; i++) {
          var commitList = appendCommit(commits[i]);
          var dateList = appendDate(commits[i]);
          var authorList = appendAuthor(commits[i]);
          var linkList = appendLink(commits[i]);

          var commitLink = $("<a>")
            .attr("href", linkList)
            .append(commitList);

          $(this)
            .parent()
            .append("<p>")
            .append(commitLink)
            .append("<p>")
            .append(dateList)
            .append("<p>")
            .append(authorList)
          }
      },
      error: function(jqXHR, textstatus, errorThrown) {
        console.log(jqXHR);
        console.log(textstatus);
        console.log(errorThrown);
      }
    });

    function appendCommit(commitData) {
      var commitMessage = commitData.commit.message;
      return commitMessage;
    }

    function appendDate(commitData) {
      var commitDate = commitData.commit.author.date;
      return commitDate;
    }

    function appendAuthor(commitData) {
      var commitAuthor = commitData.commit.author.name;
      return commitAuthor;
    }

    function appendLink(commitData) {
      var commitLink = commitData.html_url;
    }

  });


});