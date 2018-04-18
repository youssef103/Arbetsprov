$(document)
    .ready(function () {
        var logsArr = []; // create Logs Array to save all values after click in enter

        var logsElem = $(".logs__items"),
            searchInput = $('.search__input');

        // API request
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            data: {
                format: 'json'
            },
            error: function () {
                $('.results__items').html('<p>An error has occurred</p>');
            },
            dataType: 'jsonp',
            success: function (data) {
                for (var i in data) {
                    $(".results__items").append('<li class="results__item">' + data[i].name + '</li>');
                }
            },
            type: 'GET'
        });

        // Add keyup event on search box
        $(searchInput).on('keyup', function (event) {
            if (logsArr.length == 0) {
                $(".logs__items").css('display', 'none');
            }

            // when user click enter
            if (event.which == 13 && $(this).val()) {
                logsArr.push($(this).val());
                $(".logs__items").append('<li class="logs__item"><p>' + event.target.value + '</p><time>' + getTimeStamp() + '</time><div class="del"><i>x</i></li></div>');
                $(searchInput).val('');

                $(".logs__items").css('display', 'block');
                $(".results__items").css('display', 'none');
            } else { // Make search in list
                if ($('.results__item:contains("' + $(searchInput).val() + '")').length == 0) {
                    $(".results__items").hide();
                } else {
                    $(".results__items").show();
                    // Hide all content class element
                    $(".results__item").hide();

                    // Search and show
                    $('.results__item:contains("' + $(searchInput).val() + '")').show();
                }
            }
        });

        // When user click on value in Results Items. will be add it to search box and hide Results items
        $('.results__items').on('click', '.results__item', function () {
            $('.search__input').val($(this).text()).focus();
            $('.results__items').slideUp();

        });

        // Delete function
        $(logsElem).on("click", '.del', function (event) {
            var curParentEl = $(this).parent();

            // Add delete class to li and romve it from DOM
            $(curParentEl).addClass('delete--item');

            setTimeout(function () {
                $(curParentEl).remove();
                // Delete item from logsArr
                logsArr.splice($.inArray($(curParentEl).find('p').text(), logsArr), 1);

                if (logsArr.length == 0) {
                    $(".logs__items").css('display', 'none');
                }
            }, 1200);
        });

        //get Timestamp with format yyyy-mm-dd hh:mm:ss
        function getTimeStamp() {
            now = new Date();
            year = "" + now.getFullYear();
            month = "" + (now.getMonth() + 1);
            if (month.length == 1) {
                month = "0" + month;
            }
            day = "" + now.getDate();
            if (day.length == 1) {
                day = "0" + day;
            }
            hour = "" + now.getHours();
            if (hour.length == 1) {
                hour = "0" + hour;
            }
            minute = "" + now.getMinutes();
            if (minute.length == 1) {
                minute = "0" + minute;
            }
            second = "" + now.getSeconds();
            if (second.length == 1) {
                second = "0" + second;
            }
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        }
    });