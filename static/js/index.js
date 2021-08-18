var getValue = null;
$(function () {
    // 设置左右边的高度
    var aH = $(window).height() - $('.header').height();
    $(".side-left, .side-right").height(aH);
    // 设置表格的高度
    var aaH = aH - 82;
    $("#table-box").height(aaH);

    // 弹窗动态设置高度
    // var oH = $(".popup-Content-box").height();
    // $(".popup-Box").height(oH);

    $('#table-box').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 0.2, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0px solid #666", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });
       
    $('.infoTableBox').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 0.7, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0px solid #666", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });

    $("#logout").on('click', function () {
        $.cookie('username', 'null', {path:'/' });  
        window.location.href = '/';
    });

    // $("#usersmanagement").on('click', function () {
    //     window.location.href = 'userManagement.html';
    // });

    // $("#administrator").on('click', function () {
    //     window.location.href = 'index.html';
    // });

    // $.cookie('username', null);

    // $("#user").on('click', '', function () {
    //     alert($(this).children('.submenu').attr('class'));
    //     $(this).children('.submenu').toggle();
    // });

    // $(".jobRecord").on('click', function () {
    //     $("#user").children('.submenu').toggle();
    //     window.location.href = 'userData.html';
    // });

    // $(".peosonData").on('click', function () {
    //     $("#user").children('.submenu').toggle();
    //     window.location.href = 'user.html';
    // });




    /** 点击"确定添加"按钮隐藏弹窗 * */
    // $("#addDataBtn").on('click', function () {
    //     var attr = $("select[name='dataAttr'] option:selected").val();
    //     var content = $("#dataContent").val();

    //     var data = { "attr": attr, "content": content };
    //     console.log(data);
    //     $("#editOption").removeClass('showPopup');
    //     $(".md-overlay").removeClass('showOverlay');
    // });

    /** 点击"确定添加"按钮隐藏弹窗 * */
    // $("#updatePersonData").on('click', function () {
    //     var attr = $("select[name='dataAttr'] option:selected").val();
    //     var content = $("#dataContent").val();

    //     var data = { "attr": attr, "content": content };
    //     console.log(data);
    //     $(".md-overlay").removeClass('showOverlay');
    //     $("#editpersonData").removeClass('showPopup');
    // });


})

/*** 点击"修改"数据按钮修改个人项目数据 ***** */
// function editData(id) {
//     var oH = $(".popup-Content-box").height();
//     $(".popup-Box").height(oH);
//     $("#editpersonData").addClass('showPopup');
//     $(".md-overlay").addClass('showOverlay');
//     var oH = $("#editpersonData").find(".popup-Content-box").height();
//     $("#editpersonData").height(oH);
//     $("#editpersonData").siblings('.popup-Box').css('height','auto');
// }