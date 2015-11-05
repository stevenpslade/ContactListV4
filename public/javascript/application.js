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
     .append($('<span>').text(contact.firstname))
     .append($('<button>')
       .html('delete')
       .addClass('delete'))
     .append($('<button>')
       .html('show')
       .addClass('show'))
     .appendTo('#contacts')
     .append($('<button>')
       .html('edit')
       .addClass('edit'))
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

  $('#contacts').on('click', 'button.edit', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    contactListItem.append(addForm);
    var editBtn = $(this);
    $('#edit').on('click', 'button#test', function() {
      $.ajax({
        url: '/contacts/' + id,
        method: $('#edit').attr('method'),
        data: $('#edit').serialize(),
        dataType: 'json',
        success: function(contact) {
          editBtn.siblings('span').replaceWith(contact.firstname);
          $('#edit').remove();
        }
      });
      return false;
    });
  });

  function addForm() {
    return '<form id="edit" method="put"><input type="text" id="firstname" name="firstname" /><button id="test">Edit</button></form>';
  }

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
    $('<li>').text(contact.firstname).addClass('content').appendTo($(this).closest('li'));
  }

  $('#contacts').on('click', 'button.show', function() {
    var contactListItem = $(this).closest('li');
    var id = contactListItem.data('id');
    $.ajax({
      url: '/contacts/' + id,
      method: 'get',
      dataType: 'json'
    }).done(showContact.bind(this));
  });

});
