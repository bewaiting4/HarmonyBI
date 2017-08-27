$('.box .inputbox .input').focus(function () {
	$(this).parent().addClass('focus');
});

$('.box .inputbox .input').blur(function () {
	$(this).parent().removeClass('focus');
});

$('.box .error .dismiss').click(function () {
	$(this).parent().removeClass('visible');
});

$('.box .password .eye').click(function () {
	var type = $(this).parent().find('input').attr('type');

	if (type === 'password') {
		$(this).addClass('show');

		$(this).parent().find('input').attr('type', 'text');
	} else {
		$(this).removeClass('show');

		$(this).parent().find('input').attr('type', 'password');
	}
});

$('.admin-submit').click(function () {
	$('.admin').val('admin');

	$('.login-form').submit();
});