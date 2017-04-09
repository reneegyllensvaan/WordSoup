$(document).ready(function($) {
    $('.word').draggable({
        stop: function(event, ui) {
            $(this).animate({top: 0, left: 0});
        }
    });
    $('.lexicon-image').droppable({
        drop: function(event, ui) {
            // Prevent the animated position reset.
            ui.draggable.draggable({stop: null})
            // Reset position relative to the image.
            ui.draggable.removeAttr('style');
            $(this).append(ui.draggable);
            // Color by correct/wrong.
            var is_correct = ui.draggable.data('word') === $(this).data('word');
            ui.draggable.addClass(is_correct ? 'correct_choice' : 'wrong_choice');
            // Disable further dragging/dropping.
            $(this).droppable({disabled: true});
            $(ui.draggable).draggable({disabled: true});
        }
    })
})