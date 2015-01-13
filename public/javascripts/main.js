$(document).ready(function(){
	$('.deletesubscriber').on('click', deleteSubscriber);
});

function deleteSubscriber(){
	event.preventDefault();

	var confirmation = confirm('Are you sure?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url: '/subscriber/'+ $('.deletesubscriber').data('id')
		}).done(function(response){
			window.location.replace('/');
		});
	} else {
		return false;
	}
}