    function markSingleNotificationAsRead(notificationRecipientId, $this) {
        var request = {};
        var notificationRecipientIds = [notificationRecipientId];
        request.notificationRecipientIds = notificationRecipientIds;
        $.ajax({
            method: "POST",
            type: "POST",
            dataType: "json",
            url: '/libcommon/notification/ajax/ajaxMarkNotificationsAsRead.php',
            data: request,
            success: function (response) {
                if (response.success) {
                    $this.removeClass('notification-unread');
                    $this.attr("data-is-read", 1);
                    var count = $('#notificationDropdownIcon').find('#customBadgeNotifier').text();
                    if (count > 0) {
                        $('.dropdown-menu .notification-item-not-read').each(function () {
                            if ($(this).data('notification-recipient-id') === notificationRecipientId) {
                                $(this).removeClass('notification-item-not-read').data('is-read', 1);
                            }
                        });
                        if (count > 1) {
                            --count;
                            $('#notificationDropdownIcon').find('#customBadgeNotifier').text(count);
                        }
                    }
                    if($('.notification-unread').length==0){
                        if ($('.mobile-notification-icon').length)
                            $('.mobile-notification-icon').find('.fa-circle').addClass('hidden');
                        else
                            $('#customBadgeNotifier').remove();
                    }
                }
            },
            error: function (xhr, status, error) {

            }
        });

    }

    $(document).ready(function (event) {
        if($('[data-toggle="tooltip"]') && $('[data-toggle="tooltip"]').length > 0) {
            $('[data-toggle="tooltip"]').tooltip();
        }
        $('#loader').addClass('hidden');
        $('#notificationDetailsUnorderedList').removeClass('hidden');
        $('.notification-btn').click(function (event) {
            event.stopPropagation();
            event.preventDefault();
            var $this = $(this).closest('.panel-heading');
            if ($this.data("is-read") === 0) {
                var notificationRecipientId = $this.data('notification-recipient-id');
                markSingleNotificationAsRead(notificationRecipientId, $this);
            }
        });
        $('.notification-unread').click(function (event) {
            $this = $(this);
            if ($this.data("is-read") === 0) {
                var notificationRecipientId = $this.data('notification-recipient-id');
                markSingleNotificationAsRead(notificationRecipientId, $this);
            }
        })
    });





$(document).ready(function () {
    applyMomentOnDates();
    $('.notification-panel .notification-item-not-read').click(function (event) {
        event.preventDefault();
        var $this = $(this);
        if ($this.data("is-read") === 0) {
            var notificationRecipientId = $(this).data('notification-recipient-id');
            markDropdownNotificationRead(notificationRecipientId,$this);
        }
    });
});

function markDropdownNotificationRead(notificationRecipientId, $this) {
    var request = {};
    var url =  $this.find('a.notification-list').attr('href');
    var notificationRecipientIds = [notificationRecipientId];
    request.notificationRecipientIds = notificationRecipientIds;
    $.ajax({
        method: "POST",
        type: "POST",
        dataType: "json",
        url: '/libcommon/notification/ajax/ajaxMarkNotificationsAsRead.php',
        data: request,
        success: function (response) {
            if (response.success) {
                $this.removeClass('notification-item-not-read');
                $this.attr("data-is-read", 1);
                var count = $('#notificationDropdownIcon').find('#customBadgeNotifier').text();
                if($.getUrlParam('menu')==="notification"&&$.getUrlParam('action')==="view")
                {
                    $('.notification-panel-head.notification-unread').each(function () {
                        if ($(this).data('notification-recipient-id') === notificationRecipientId) {
                            $(this).removeClass('notification-unread').data('is-read', 1);
                        }
                    });
                }
                if (count > 0) {
                    if (count > 1) {
                        --count;
                        $('#notificationDropdownIcon').find('#customBadgeNotifier').text(count);
                    } else {
                        $('#customBadgeNotifier').remove();
                    }
                }
                window.open(url);
            }
        },
        error: function (xhr, status, error) {
            window.open(url);
        }
    });
}


function applyMomentOnDates() {
    $(".format-date-as-from_now").each(function () {
        if (moment($(this).text().trim()).isValid()) {
            $(this).text(moment(
                $(this).text().trim())
                .fromNow());
        } else {
            $(this).text('');
        }

    });


    $(".format-date-for-date-and-time").each(function () {
        if (moment($(this).text().trim()).isValid()) {
            $(this).text(moment(
                $(this).text().trim())
                .format("MMM Do [at] h:mm a"));
        } else {
            $(this).text('');
        }

    });

}

function markNotificationAsRead() {
    var notificationRecipientIds = [];
    var request = {};
    $(".notification-list-panel").each(function () {
        if ($(this).data("is-read") === 0) {
            notificationRecipientIds.push($(this).data("notification-recipient-id"));
        }

    });
    if (!notificationRecipientIds.length > 0) {
        return false;
    }
    request.notificationRecipientIds = notificationRecipientIds;
    $.ajax({
        method: "POST",
        type: "POST",
        dataType: "json",
        url: '/libcommon/notification/ajax/ajaxMarkNotificationsAsRead.php',
        data: request,
        success: function (response) {
            if (response.success) {
                $("#customBadgeNotifier").remove();
                $(".notification-list-panel").each(function () {
                    if ($(this).data("is-read") == "0") {
                        $(this).attr("data-is-read", 1);
                    }
                });

            } else {

            }
        },
        error: function (xhr, status, error) {

        }
    });
}


