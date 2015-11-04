$(function() {

  $.ajax({
    url: '/contacts',
    method: 'get',
    dataType: 'json'
  }).done(populateContactList);

  function populateContactList(contacts) {
    contacts.forEach(appendContact);
  }

  function appendContact(contact) {
  //   $('<li>' + contact.firstname + '</li>').appendTo('#contacts');
  // }
    $('<li>')
     .data('id', contact.id)
     .text(contact.firstname)
     .append($('<button>')
       .html('delete')
       .addClass('delete'))
     .append($('<button>')
       .html('show')
       .addClass('show'))
     .appendTo('#contacts');
  }

  $('#button').on('click', function() {
    $.ajax({
      url: $('#new-contact-form').attr('action'),
      method: $('#new-contact-form').attr('method'),
      data: $('#new-contact-form').serialize()
    }).done(appendContact);
    return false;
  });

  $('#contacts').on('click', 'button.delete', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    $.ajax({
      url: '/contacts/' + id,
      method: 'delete',
      success: function() {
        contactListItem.remove();
      }
    });
  });

  function showContact(contact) {
    $('<li>').text(contact.firstname).appendTo($(this).closest('li'));
  }

  $('#contacts').on('click', 'button.show', function(e) {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    $.ajax({
      url: '/contacts/' + id,
      method: 'get',
      dataType: 'json'
    }).done(showContact.bind(this));
  });

});
