var ellipsize = function(string) {
  var length = 50;
  if (string.length > length)
    return string.substr(0, length) + '&hellip;';
  return string;
};

$(function() {
  chrome.tabs.query({ currentWindow: true }, function(tab) {
    for (var i = tab.length - 1; i >= 0; i--) {
      var currentTab = tab[i];
      
      $('ul').append(
        '<li id="' + currentTab.id + '">' +
          '<img width="25" height="25" src="' + currentTab.favIconUrl + '">' +
          '<a>' + ellipsize(currentTab.title) + '</a>' +
        '</li>');
    };
    $('.tab-count').text(tab.length);
  });

  $('body').on('click', 'li', function() {
    var tabId = parseInt($(this).attr('id'), 10);
    chrome.tabs.update(tabId, { active: true });
  });
});
