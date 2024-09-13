$(function () {
    $(".menu-item").on('click', function(){
        $(".menu-item .submenu").stop().slideUp()
        $(this).find(".submenu").stop().slideToggle()
        $(".menu-item").removeClass('active')
        $(this).toggleClass('active')
        // $(".menu-item .submenu").removeClass('active')
        // $(this).find(".submenu").toggleClass('active')
    })
    $(".user-info .user-avatar").on('click', function()  {
        $(this).next(".user-info .user-card").toggleClass('show')
    })
    $("#mclcik").on('click', function(){
        $(this).toggleClass('add-Z')
        $(".sidebar").addClass('open')
        $("#mask").addClass('open')
    })
    $("#mclose").on('click', function(){
        $(".sidebar").removeClass('open')
        $("#mask").removeClass('open')
    })
    $("#mask").on('touchstart', function(){
        $(".sidebar").removeClass('open')
        $("#mask").removeClass('open')
    })
    $(".content,#mclcik,.sidebar").on("click touchstart", function(){
        $('.user-card').removeClass('show')
    })
})