function makeLinks(linkList) {
  console.log("good");
  for (var i = 0; i < linkList.length; i++) {
    var item = linkList[i];
    if ("name" in item && "link" in item && "icon" in item) {
      $(".components").append(
        "<li >" +
          '<a href="' +
          item["link"] +
          '">' +
          '<i class="fa fa-' +
          item["icon"] +
          '"></i>&nbsp;' +
          item["name"] +
          "</a>" +
          "</li>"
      );
      $(".navbar-nav").append(
        '<li class="nav-item"> <a class="nav-link" href="' +
          item["link"] +
          '">' +
          '<i class="fa fa-' +
          item["icon"] +
          '"></i>&nbsp;' +
          item["name"] +
          "</a>" +
          "</li>"
      );
    }
  }
}

function searchFunction() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("tag-collection");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function finishTheme(info) {
  insert(info).done($("body").show());
}

function fadeInContent() {
  $(window).scroll(function() {
    $(".hideme").each(function(i) {
      var top_of_object = $(this).position().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var top_of_object = $(this).position().top;
      if (bottom_of_window > top_of_object + 300) {
        $(this).animate({ opacity: "1" }, 500);
      }
    });
  });

  $(function() {
    $(".hideme").each(function(i) {
      var top_of_object = $(this).position().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if (top_of_object <= bottom_of_window) {
        $(this).animate({ opacity: "1" }, 500);
      }
      if ($(".preview_iframe")[0]) {
        $(this).animate({ opacity: "1" }, 500);
      }
    });
  });
}

function makeCards(tags) {
  for (var i = 0; i < tags.length; i++) {
    var items = tags[i];
    var str =
      ' <div class="card hideme">' +
      '<div class="card-header fandom">' +
      '<div class="card-avatar" style="background-image:url(' +
      items["image"] +
      ')"></div>' +
      items["fandom"] +
      "</div>";
    str += '<ul class="list-group list-group-flush">';
    for (var j = 0; j < items["tags"].length; j++) {
      var tag = items["tags"][j];
      str +=
        '<li class="list-group-item">' +
        '<a href="' +
        tag["url"] +
        '" class="tag-item">' +
        tag["name"] +
        "</a></li>";
    }
    str += "</ul></div>";
    $(".card-columns").append(str);
  }
}

function insert(info) {
  var r = $.Deferred();
  makeLinks(info["additionalLinks"]);
  $(".title-text").each(function() {
    $(this).text(info["title"]);
  });
  $(".description").append(info["description"]);
  if (!info["iconLinks"]["about"]) {
    $(".about").remove();
  }
  if (!info["iconLinks"]["archive"]) {
    $(".about").remove();
  }
  if (!info["iconLinks"]["navLink"]) {
    $(".navlink").remove();
  }
  $(".about").attr("href", info["aboutLink"]);
  $(".navlink").attr("href", info["navLink"]);
  $(".sidebar-header").css("background-image", "url(" + sidebarAvatar + ")");
  makeCards(info["tags"]);
  return r;
}
