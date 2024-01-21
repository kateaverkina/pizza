$(document).ready(function () {

new WOW({
    animateClass: 'animate__animated'
}).init();


$('.product-img').magnificPopup({
    type:'image',
});

    let menu = $('.menu');

    function menuOpen () {
        menu.addClass('open');
    }

    function menuClose () {
        menu.removeClass('open');
    }

    $('#burger').on('click', menuOpen);

    $('.close').on('click', menuClose);

    $('.menu-item').on('click', menuClose);


$('.rights span').text((new Date()).getFullYear());

function choosePizza () {
    $('.products')[0].scrollIntoView({behavior: "smooth"});
}

$('#pizzas').on('click', choosePizza);

$('#choose-pizza').on('click', choosePizza);


$('.btn-add-to-cart').click((e) => {
    product.val($(e.target).parents('.product').find('.product-title').text());
    $('.order')[0].scrollIntoView({behavior: "smooth"});
});


    let loader = $('.loader');
    function loaderOpen() {
        loader.css('display', 'flex');
    }

    function loaderClose() {
        loader.hide();
    }

    let product = $('#product');
    let address = $('#address');
    let phone = $('#phone');
    phone.inputmask({"mask": "(999) 999-9999"});

    function formValidation() {

        let hasError = false;

        $('.error-input').hide();

        if (!product.val()) {
            product.css('border-color', 'red');
            product.next().show();
            hasError = true;
        } else if (product.val()) {
            product.css('border-color', 'rgb(185, 145, 80)');
        }

        if (!address.val()) {
            address.css('border-color', 'red');
            address.next().show();
            hasError = true;
        } else if (address.val()) {
            address.css('border-color', 'rgb(185, 145, 80)');
        }

        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'rgb(185, 145, 80)');
        }


        if (!hasError) {
            loaderOpen();
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: product.val(), phone: phone.val(), address: address.val() }
            })
                .done(function (msg) {
                    setTimeout(() => {
                        loaderClose();
                        console.log(msg);
                        if (msg.success) {
                            hideForm();
                        } else {
                            alert("Возникла ошибка");
                        }
                    }, 1000);
                });
            clearForm();

        }

        function clearForm() {
            product.val("");
            address.val("");
            phone.val("");
        }
    }

    function hideForm() {
        $('.order-text').remove();
        $('.order-img').remove();
        $('.order-form').remove();
        $('.order-success').show();
    }

    $('#create-order').on('click', formValidation);

});


