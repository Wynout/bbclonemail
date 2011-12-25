// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp.Mailbox
// ---------------

// The mail box view to display the list of emails
// for the mailbox.
BBCloneMail.MailApp.MailBox = (function(BBCloneMail, Backbone, $){
  var MailBox = {};

  // Mail Box Views
  // --------------
  
  // The the full contents of the email.
  var EmailView = BBCloneMail.ItemView.extend({
    tagName: "ul",
    className: "email-list",
    template: "#email-view-template"
  });

  // Show a preview of the email in the list of
  // available email.
  var EmailPreview = BBCloneMail.ItemView.extend({
    tagName: "li",
    template: "#email-preview-template",

    // The click event toggles the show and hide of
    // the email contents.
    events: {
      "click": "showEmail"
    },

    // Show or hide the body of the email when
    // the email header is clicked.
    showEmail: function(e){
      BBCloneMail.vent.trigger("mail:message:show", this.model);
    }
  });

  // The actual mail box view, which renders each
  // of the individual email items. 
  MailBox.EmailListView = BBCloneMail.CollectionView.extend({
    tagName: "ul",
    className: "email-list",
    itemView: EmailPreview
  });

  // Mail Box Public API
  // -------------------

  // A method to display a specific email message.
  MailBox.showMessage = function(message){
    var emailView = new EmailView({
      model: message
    });
    BBCloneMail.mainRegion.show(emailView);
  }

  // Mail Box Event Handlers
  // -----------------------

  // Handle the selection of an email message by displaying
  // it in the main area of the application.
  BBCloneMail.vent.bind("mail:message:show", function(message){
    MailBox.showMessage(message);
  });

  return MailBox;
})(BBCloneMail, Backbone, jQuery);
