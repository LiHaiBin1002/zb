
/* 点击"查看"出现弹窗 */
function update_equipment_btn(str,i,serial){
    EliminateANDremove_equipmentbox();
    
    $('#cont_write5').css('background-color', 'rgba(127,127,127,0.1)');
    $('#cont5').css('background-color', 'rgba(127,127,127,0.1)');
    $('#cont_write5').prop('disabled', 'disabled');
    $('#cont_write5').attr('disabled', 'disabled');
    $('#cont5').prop('disabled', 'disabled');
    $('#cont5').attr('disabled', 'disabled');
    $('#projectname_write5').css('background-color', 'rgba(127,127,127,0.1)');
    $('#projectname5').css('background-color', 'rgba(127,127,127,0.1)');
    $('#projectname_write5').prop('disabled', 'disabled');
    $('#projectname_write5').attr('disabled', 'disabled');
    $('#projectname5').prop('disabled', 'disabled');
    $('#projectname5').attr('disabled', 'disabled');
    $('#equipment_remark11').css('background-color', 'rgba(127,127,127,0.1)');
    $('#equipment_remark11').prop('disabled', 'disabled');
    $('#equipment_remark11').attr('disabled', 'disabled');
    
    // disabled="disabled" style="background-color:rgba(127,127,127,0.1)"
    
    $("#equipment_title").html("查看设备登记");
    var border_name = 'border2';
    for (var j = 1 ; j < i ; j++){
       var obj = $("#increase_Equipment_box"+j+"").children('div').eq(1).children('img').eq(0);
       filePicker_equipment1(obj);
    }
    for (var j = 1 ; j <= i ; j++){
        $('#equipment_brand1'+j+'').css('background-color', 'rgba(127,127,127,0.1)');
        $('#equipment_brand1'+j+'').prop('disabled', 'disabled');
        $('#equipment_brand1'+j+'').attr('disabled', 'disabled');
        $('#equipment_type1'+j+'').css('background-color', 'rgba(127,127,127,0.1)');
        $('#equipment_type1'+j+'').prop('disabled', 'disabled');
        $('#equipment_type1'+j+'').attr('disabled', 'disabled');
        $('#equipment_model1'+j+'').css('background-color', 'rgba(127,127,127,0.1)');
        $('#equipment_model1'+j+'').prop('disabled', 'disabled');
        $('#equipment_model1'+j+'').attr('disabled', 'disabled');
        $('#equipment_num1'+j+'').css('background-color', 'rgba(127,127,127,0.1)');
        $('#equipment_num1'+j+'').prop('disabled', 'disabled');
        $('#equipment_num1'+j+'').attr('disabled', 'disabled');
        $('#equipment_ser_num1'+j+'').css('background-color', 'rgba(127,127,127,0.1)');
        $('#equipment_ser_num1'+j+'').prop('disabled', 'disabled');
        $('#equipment_ser_num1'+j+'').attr('disabled', 'disabled');
        ($('.border2'+j+'').find('img').eq(0)).hide();
        ($('.border2'+j+'').find('img').eq(1)).hide();
    }
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    
    $("#add_equipment_pop").height(oH);
    $('#add_equipment_pop').siblings('.popup-Box').css('height', 'auto');
    
    $("#add_equipment_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    
    $("#add_equipment_confirm").hide();//隐藏添加确认按钮
    $("#update_equipment_confirm").hide();//隐藏更新确认按钮
    Fill_Select();//填充合同编号下拉框
    Fill_Select_prod_brand('equipment_brand11');//填充设备品牌下拉框
    //写入数据
    var object = JSON.parse(decodeURI(str));
    if (serial && serial != '' ){
        search_cont_equip(object,serial);
    }else{
        search_cont_equip(object);
    }
   
}
