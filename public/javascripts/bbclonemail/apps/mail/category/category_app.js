BBCloneMail.module("MailApp.Category", function (Category, App, Backbone, Marionette, $, _) {

  var API = {
    showCategoriesList: function() {
      Category.List.Controller.showCategories();
    }
  };

  App.vent.on("app:started", function(appName) {
    if (appName === "mail") {
      API.showCategoriesList();
    }
  });
});