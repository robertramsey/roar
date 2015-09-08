Template.posts.onRendered(function() {
	this.find('.wrapper')._uihooks = {
		insertElement: function (node, next) {
			$(node)
				.hide()
				.insertBefore(next)
				.fadeIn();
		},
		removeElement: function(node) {
      		$(node).fadeOut(function() {
        	$(this).remove();
      		});
    	}
	}
});