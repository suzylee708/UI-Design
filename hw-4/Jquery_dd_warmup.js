$(function () {
  $('#draggable').draggable({
    cursor: 'move', // Change cursor to "move" when hovering over draggable
    revert: 'invalid', // Revert back to original position if not dropped on a valid drop target
  });

  $('#droppable').droppable({
    drop: function (event, ui) {
      $(this).addClass('ui-state-highlight').find('p').html('Dropped!');
    },
  });
});
