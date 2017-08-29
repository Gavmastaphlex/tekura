$(document).ready(function() {

	var definitions = new Array();
	definitions[0] = new Object();
	definitions[1] = new Object();
	definitions[2] = new Object();

	definitions[0]["word"] = 'venenatis'
	definitions[0]["definition"] = 'This is the definition for the venenatis keyword.'

	definitions[1]["word"] = 'vestibulum'
	definitions[1]["definition"] = 'This is the definition for the vestibulum keyword.'

	definitions[2]["word"] = 'massa et elit gravida'
	definitions[2]["definition"] = 'This is the definition for the massa et elit gravida keyword.'

	console.log(definitions)

	// console.log(definitions[0][0])
	// console.log(definitions[0][1])

	$.each(definitions , function( index, obj ) {
    $.each(obj, function( key, value ) {
        console.log(key);
        console.log(value);
    });
});

	$('#container').html($('#container').html().replace(/(dog)/g,'<span class="highlight">$1</span>'));
	

}); /*END OF $(DOCUMENT).READY(FUNCTION(){}*/
