var sales = [
  {
    salesperson: 'James D. Halpert',
    client: 'Shake Shack',
    reams: 100,
  },
  {
    salesperson: 'Stanley Hudson',
    client: 'Toast',
    reams: 400,
  },
  {
    salesperson: 'Michael G. Scott',
    client: 'Computer Science Department',
    reams: 1000,
  },
];

let salespersonName = 'Salesperson';

let clients = [
  'Shake Shack',
  'Toast',
  'Computer Science Department',
  "Teacher's College",
  'Starbucks',
  'Subsconsious',
  'Flat Top',
  "Joe's Coffee",
  'Max Caffe',
  'Nussbaum & Wu',
  'Taco Bell',
];

function makeRow(id, obj) {
  // console.log(obj)

  var newRow = $('<div></div>');
  newRow.addClass('row');

  // make salesperson column
  var salesperson = $('<div></div>');
  salesperson.addClass('col-md-2');
  salesperson.html(obj.salesperson);
  newRow.append(salesperson);

  // make client column
  var client = $('<div></div>');
  client.addClass('col-md-5');
  client.html(obj.client);
  newRow.append(client);

  // make number column
  var number = $('<div></div>');
  number.addClass('col-md-2');
  number.html(obj.reams);
  newRow.append(number);

  // make a cancel button
  var buttonColumn = $('<div></div>');
  buttonColumn.addClass('col-md-1');

  var button = $('<button></button>');
  button.addClass('btn btn-warning');
  button.prop('id', id);
  button.html('X');

  buttonColumn.append(button);
  newRow.append(buttonColumn);

  return newRow;
}

function updateSales() {
  $('#list').empty();

  $.each(sales, function (index, value) {
    var newRow = makeRow(index, value);
    // newRow.append(features)
    // console.log(newRow)

    $('#list').append(newRow);
  });

  $('.btn-warning').click(function () {
    var index = $(this).attr('id');
    console.log(index);

    // delete this sale
    sales.splice(index, 1);
    console.log(sales);

    updateSales();
  });
}

function saleValid(client, reams) {
  if (typeof client == 'undefined' || typeof reams == 'undefined') {
    return false;
  } else {
    var valid = true;

    if (client.replace(/\s+/g, '').length == 0) {
      valid = false;
    } else if (reams.replace(/\s+/g, '').length == 0) {
      valid = false;
    } else if (!/^\d+$/.test(reams.replace(/\s+/g, ''))) {
      valid = false;
    }
    // console.log(valid)
    return valid;
  }
}

function logSales(client, reams) {
  var newSale = {};

  newSale['salesperson'] = salespersonName;
  newSale['client'] = client;
  newSale['reams'] = +reams;

  sales.unshift(newSale);

  // add client to autocomplete list
  if (!Clients.includes(client)) {
    Clients.push(client);
  }
}

function displayWarning(client, reams) {
  // empty past warnings
  $('#client-warning').empty();
  $('#reams-warning').empty();

  // check reams

  if (reams.replace(/\s+/g, '').length == 0) {
    var reamsWarning = $('<div></div>');
    reamsWarning.html('Please fill # reams');
    // reamsWarning.addClass(".warning")
    $('#reams-warning').append(reamsWarning);
    $('#reams-box').focus();
  } else if (!/^\d+$/.test(reams.replace(/\s+/g, ''))) {
    console.log(/^\d+$/.test(reams));
    var reamsWarning = $('<div></div>');
    reamsWarning.html('Please fill valid number');
    // reamsWarning.addClass(".warning")
    $('#reams-warning').append(reamsWarning);
    $('#reams-box').focus();
  }

  // check client
  if (client.replace(/\s+/g, '').length == 0) {
    var clientWarning = $('<div></div>');
    clientWarning.html('Please fill client');
    // clientWarning.addClass(".warning")
    $('#client-warning').append(clientWarning);
    $('#client-box').focus();
  }
}

function requestSubmit() {
  var client = $('#client-box').val();
  var reams = $('#reams-box').val();

  // console.log(client)
  if (saleValid(client, reams)) {
    // empty past warnings
    $('#client-warning').empty();
    $('#reams-warning').empty();

    logSales(client, reams);

    updateSales();

    // start typing next sale
    $('#client-box').val('');
    $('#reams-box').val('');
    $('#client-box').focus();
  } else {
    // console.log("invalid")
    displayWarning(client, reams);
  }
}

$(document).ready(function () {
  updateSales();

  $('#client-box').autocomplete({
    source: Clients,
  });

  $('#submit-button').click(function () {
    requestSubmit();
  });

  $('#reams-box').keyup(function (event) {
    if (event.which == 13) {
      // remove line break
      $('#reams-box').val(
        $('#reams-box')
          .val()
          .replace(/(\r\n|\n|\r)/gm, '')
      );
      requestSubmit();
    }
  });
});
