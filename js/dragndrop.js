$(document).ready(function($) {
    $('.dragndrop-game').each(function() {
        var game = this;
        $('.word', game).draggable({
            stop: function(event, ui) {
                $(this).animate({top: 0, left: 0});
            }
        });
        $('.word-drop', game).droppable({
            drop: function(event, ui) {
                // Prevent the animated position reset.
                ui.draggable.draggable({stop: null});
                // Reset position relative to the image.
                ui.draggable.removeAttr('style');
                $(this).append(ui.draggable);
                // Color by correct/wrong.
                var is_correct = ui.draggable.data('word') === $(this).data('word');
                ui.draggable.addClass(is_correct ? 'correct_choice' : 'wrong_choice');
                // Disable further dragging/dropping.
                $(this).droppable({disabled: true});
                $(ui.draggable).draggable({disabled: true});
                checkFinished();
            }
        });
        var checkFinished = function() {
            var isAllFinished = true;
            var score = 0;
            $('.word-drop', game).each(function() {
                if (!$(this).find('.word').length) {
                    isAllFinished = false;
                } else {
                    if ($(this).find('.word').hasClass('correct_choice')) {
                        score++;
                    }
                }
            });
            if (isAllFinished) {
                $modal = $('<div class="popup-blur"><div class="card popup-card"><div class="card-content"></div></div></div>');
                $modal.find('.card-content').append($('<p>Du hade ' + score + ' rätt</p>'));
                $modal.find('.card').append($('<div class="card-action"><a href="exercise-words.html"><i class="fa fa-arrow-left"></i> Tillbaka</a> <a href="gaps.html">Next<i class="fa fa-arrow-right"></i></a></div>'));
                $(game).append($modal);
            }
        }
    });
});
