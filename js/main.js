$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').click(function() {
        alert('تم الاضافة فى عربة الشراء')
    })

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    // Change Price while Change Quantity 
    $('[data-product-quantity]').change(function() {
        var newQuantity = $(this).val();
        var parent = $(this).parents('[data-product-info]');
        var pricePerUnit = parent.attr('data-product-price');
        var totalPrice = newQuantity * pricePerUnit;
        parent.find('.total-price-for-product').text(totalPrice);

        calculateTotalPrice();
    });

    //Remove Product In card 
    $('[data-remove-from-card]').click(function() {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    })


    //Quantity For All Product
    function calculateTotalPrice() {
        var totalPriceForAllProduct = 0;

        $('[data-product-info]').each(function() {

            var pricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPrice = pricePerUnit * quantity;

            totalPriceForAllProduct = totalPriceForAllProduct + (totalPrice);
        });

        $('#total-price-for-all-product').text(totalPriceForAllProduct + '$')
    }

    //Select City
    var citiesByCountry = {
        eg: ['القاهرة', 'الاسكندرية'],
        sa: ['جدة', 'الرياض'],
        sy: ['الزرقاء', 'حلب'],
        ua: ['العين', 'دبي']
    };
    $('#form-checkout select[name="country"]').change(function() {
        var country = $(this).val();
        var cities = citiesByCountry[country];
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );

        cities.forEach(function(city) {
            var newOPtion = $('<option></option>');
            newOPtion.text(city);
            newOPtion.val(city);
            $('#form-checkout select[name="city"]').append(newOPtion);
        });
    });

    // Select Payment Way 
    $('#form-checkout input[name="payment_method"]').change(function() {
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivary') {
            $('#credit-card-info input').prop('disabled', true);
        } else {
            $('#credit-card-info input').prop('disabled', false);
        }

        $('#credit-card-info').toggle();
    });

    //search by price jquery-ui library
    $('#price-range').slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function(event, ui) {
            $('#price-min').text(ui.values[0]);
            $('#price-max').text(ui.values[1]);
        }
    });

});