// Data
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

let sales = [
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

// Constants
const salespersonName = 'Suji Lee';

// Autocomplete for Client input
$(function () {
  $('#client').autocomplete({
    source: clients,
    select: function (event, ui) {
      // When a client is selected from autocomplete, add it to the list if not already present
      let selectedClient = ui.item.value;
      if (!clients.includes(selectedClient)) {
        clients.push(selectedClient);
      }
    },
  });
});

// Populate sales records
$(function () {
  sales.forEach(function (sale) {
    addSalesRecord(sale.salesperson, sale.client, sale.reams);
  });
});

// Submit sale button click event
$('#submit-sale').click(function () {
  const salesperson = salespersonName;
  const client = $('#client').val();
  const reams = $('#reams').val();

  // Validation
  let isValid = true;
  if (!client.trim()) {
    $('#client-error').text('Client name is required');
    isValid = false;
  } else {
    $('#client-error').text('');
  }
  if (!reams.trim() || isNaN(reams) || parseInt(reams) <= 0) {
    $('#reams-error').text('Valid number of reams is required');
    isValid = false;
  } else {
    $('#reams-error').text('');
  }

  if (isValid) {
    addSalesRecord(salesperson, client, reams);
    // Clear input fields after successful submission
    $('#client').val('');
    $('#reams').val('');
  }
});

// Function to add sales record
function addSalesRecord(salesperson, client, reams) {
  let newRow = `
    <div class="row" id="draggable">
      <div class="col-3 column-padding">${salesperson}</div>
      <div class="col-5 column-padding">${client}</div>
      <div class="col-3 column-padding">${reams}</div>
      <div class="col-1 column-padding">
        <button class="delete-button">Delete</button>
      </div>
    </div>
  `;
  $('#sales-records').prepend(newRow);

  // Add click event for delete button
  $('.delete-button').click(function () {
    $(this).closest('.row').remove(); // Remove the closest parent row
  });

  // Make the row draggable
  $('#draggable').draggable({
    cursor: 'move', // Change cursor to "move" when hovering over draggable
    revert: 'invalid', // Revert back to original position if not dropped on a valid drop target
    start: function (event, ui) {
      $(droppable).addClass('ui-state-highlight'); // Change background color when dragging starts
    },
    stop: function (event, ui) {
      $(this).css('background-color', ''); // Reset background color when dragging stops
    },
  });

  //
  $('#droppable').droppable({
    // accept: '#sales-records', // Accept only elements with the 'draggable' class

    drop: function (event, ui) {
      $(this).removeClass('ui-state-highlight');
      ui.draggable.remove(); // Remove the dragged element from the DOM
    },
    over: function (event, ui) {
      $(this).addClass('ui-state-highlight'); // Change background color when hovering over droppable area
    },

    // out: function (event, ui) {
    //   $(this).removeClass('ui-state-highlight'); // Revert background color when not hovering over droppable area
    // },
  });
}
