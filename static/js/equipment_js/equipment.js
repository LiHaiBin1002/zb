//查询产品
function getEquipment(){
    postRequest('/get_equipment/',{
        
    },function(data){
        // console.log(data);
        if(data.result==1||data.result=='1'){
            equipmentset = data.data
        }
    },function(err){
        console.log(err);
    });
}
//清除数据、移除多余的框
function EliminateANDremove_equipmentbox(){
    $('#projectname_write5').prop('value','');
    $('#projectname_write5').attr('value','');
    $('#cont_write5').prop('value','');
    $('#cont_write5').attr('value','');
    $("input[name='equipment_id']").val('');
    $("select[name='cont5'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont5'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='cont_write5']").val('');
    $("select[name='projectname5'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname5'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='projectname_write5']").val('');
    $("select[name='dutyname5'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname5'] option").eq(0).siblings().removeAttr('selected');
    $("textarea[name='equipment_remark11']").val('');
    var border2s = $('.border21').siblings('.equipborder');
    for (var i = 1 ; i <= (border2s.length+1); i++){
        $("select[name='equipment_brand1"+i+"'] option").eq(0).attr('selected', 'selected');
        $("select[name='equipment_brand1"+i+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='equipment_type1"+i+"'] option").eq(0).attr('selected', 'selected');
        $("select[name='equipment_type1"+i+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='equipment_model1"+i+"'] option").eq(0).attr('selected', 'selected');
        $("select[name='equipment_model1"+i+"'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='equipment_num1"+i+"']").val('');
        $("input[name='equipment_ser_num1"+i+"']").val('');
        $("input[name='equipment_cont_id']").val('');
        if(i != 1){
             $('.border2'+i+'').remove();
        }else{
            var html = '<option value="">请选择</option>';
            // $("#cont5").html(html1);equipment_brand11
            $("#equipment_type1"+i+"").html(html); //equipment_type11
            $("#equipment_model1"+i+"").html(html);//equipment_model11
            $("input[name='equipment_num1"+i+"']").val('1');
            ($('.border2'+i+'').find('img').eq(0)).hide();
            ($('.border2'+i+'').find('img').eq(1)).show();
        }
    }
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    $("#add_equipment_pop").css('height', oH);
}
//根据brand选择后 过滤填充类型下拉框 品牌id为str1，类型id为str2
function Fill_Select_prod_type(str1,str2){
    if(equipmentset.length>0){
        var brand_value = $("select[name='"+str1+"'] option:selected").val();
        var html  = '<option value="">请选择</option>';
        var val = [];
        $.each(equipmentset,function(i , v){
            if (brand_value == v.brand){
                val.push(v.type);
            }
        });
        var val1 = unique(val);//去重
        $.each(val1, function (i, v) {
            html += '<option value="' + v + '">' + v + '</option>';
        });
    } else {
         var html  = '<option value="">请选择</option>';
    }
    $("#"+str2+"").html(html);
}
//根据brand和type选择后 过滤填充型号下拉框 品牌id为str1，类型id为str2，类型id为str3
function Fill_Select_prod_model(str1,str2,str3){
    if(equipmentset.length>0){
        var brand_value = $("select[name='"+str1+"'] option:selected").val();
        var type_value = $("select[name='"+str2+"'] option:selected").val();
        var html  = '<option value="">请选择</option>';
        $.each(equipmentset,function(i , v){
            if (brand_value == v.brand && type_value == v.type){
                html += '<option value="' + v.model + '">' + v.model + '</option>';
            }
        });
    } else {
         var html  = '<option value="">请选择</option>';
    }
    $("#"+str3+"").html(html);
}
//按顺序逐条写入数据
function input_equip_data(obj,data){
    if ( !($.isEmptyObject(obj)) ){
        $("input[name='equipment_id']").val(obj.id);
        $("select[name='cont5'] option").each(function () {
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj.contractno) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                $("#cont_write5").attr("value",$(this).val());
                $("#cont_write5").prop("value",$(this).val());
                return false;
            }
        });
        $("select[name='projectname5'] option").each(function () {
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj.projectname) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                $("#projectname_write5").attr("value",$(this).val());
                $("#projectname_write5").prop("value",$(this).val());
                return false;
            }
        });
        $("select[name='dutyname5'] option").each(function () {
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj.dutyname) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        $("textarea[name='equipment_remark11']").val(obj.remake);
    }
    if ( data.length > 0 ){
        $.each(data,function(i,v){
            var j = i+1;
            $("input[name='equipment_cont_id"+j+"']").val(v.id);
            $("select[name='equipment_brand1"+j+"'] option").each(function(){
                $(this).prop('selected', false);
                $(this).attr('selected', false);
                if ($(this).val() == v.brand) {
                    $(this).prop('selected', 'selected');
                    $(this).attr('selected', 'selected');
                    return false;
                }
            });
            
            Fill_Select_prod_type('equipment_brand1'+j+'','equipment_type1'+j+'');
            
            $("select[name='equipment_type1"+j+"'] option").each(function(){
                $(this).prop('selected', false);
                $(this).attr('selected', false);
                if ($(this).val() == v.type) {
                    $(this).prop('selected', 'selected');
                    $(this).attr('selected', 'selected');
                    return false;
                }
            });
            Fill_Select_prod_model('equipment_brand1'+j+'','equipment_type1'+j+'','equipment_model1'+j+'');
            $("select[name='equipment_model1"+j+"'] option").each(function(){
                $(this).prop('selected', false);
                $(this).attr('selected', false);
                if ($(this).val() == v.model) {
                    $(this).prop('selected', 'selected');
                    $(this).attr('selected', 'selected');
                    return false;
                }
            });
            $("input[name='equipment_num1"+j+"']").val(v.number);
            $("input[name='equipment_ser_num1"+j+"']").val(v.serial);
        });
    }
    //将所有数据传到Update_Equipment_Confirm()方法
    var obj =  encodeURI(JSON.stringify(obj));//将json对象转为json字符串，
    var data =  encodeURI(JSON.stringify(data));//由于转义字符后不能有中文，用URI编码后传递
    $('#update_equipment_confirm').prop('onclick','Update_Equipment_Confirm(\''+obj+'\',\''+data+'\')');
    $('#update_equipment_confirm').attr('onclick','Update_Equipment_Confirm(\''+obj+'\',\''+data+'\')');
}
/* 新增、修改设备信息  添加下一项方法*/
function filePicker_equipment1(obj){
    var j = parseFloat($(obj).parent().parent().attr('id').replace(/[^0-9]/ig,""))+1;
    var html='';
    var classname = '.border2'+j;
    if ($(classname).length<1){
        html ='\
        <div class="border2'+j+' equipborder" id="increase_Equipment_box'+j+'" style="border: 1px solid #b9c5e1;">\
            <div class="remove_box remove_increase_project_box'+j+'" onclick="remove_equipment_box(this)" style="float:right;margin-top: -13px;line-height:0px; position: relative;right: -5px;top: 8px;">\
                <img src="/static/img/gb.png" width="20" height="20" id="remove_increase_project_box'+j+'" style="display:none;">\
                <!-- 存放id用于修改时 -->\
                <input type="hidden" name="equipment_cont_id'+j+'"> \
            </div>\
            <div style="float:left;margin-top: -20px;line-height:0px;position: relative;right: -10px;top: 36px; z-index:9999" >\
                <img src="/static/img/zj.png" width="20" height="20" style="vertical-align:middle; margin-bottom:5px;" onclick="filePicker_equipment1(this)">\
            </div>\
            <div class="clear div-margin">\
                <div class="col-xs-1 text-right" style="width:5%">\
                        <label>品牌&nbsp;</label>\
                </div>\
                <div class="col-xs-1" style="width:13%">\
                    <select class="form-control" id="equipment_brand1'+j+'" name="equipment_brand1'+j+'" onchange="Fill_Select_prod_type(&quot;equipment_brand1'+j+'&quot;, &quot;equipment_type1'+j+' &quot;)">\
                       <option value="">请选择</option>\
                    </select>\
                </div>\
                <div class="col-xs-1 text-right" style="width:5%">\
                    <label>类型&nbsp;</label>\
                </div>\
                <div class="col-xs-1" style="width:13%">\
                    <select class="form-control" id="equipment_type1'+j+'" name="equipment_type1'+j+'"  onchange="Fill_Select_prod_model(&quot;equipment_brand1'+j+'&quot;,&quot;equipment_type1'+j+'&quot;,&quot;equipment_model1'+j+'&quot;)">\
                        <option value="">请选择</option>\
                    </select>\
                </div>\
                <div class="col-xs-1 text-right" style="width:5%">\
                    <label>型号&nbsp;</label>\
                </div>\
                <div class="col-xs-1" style="width:24%">\
                    <select class="form-control"  id="equipment_model1'+j+'" name="equipment_model1'+j+'">\
                        <option value="">请选择</option>\
                    </select>\
                </div>\
                <div class="col-xs-1 text-right" style="width:5%">\
                    <label>数量&nbsp;</label>\
                </div>\
                <div class="col-xs-1" style="width:5%">\
                    <input class="form-control" type="text" id="equipment_num1'+j+'" disabled="disabled"style="text-align:center;background-color:rgba(127,127,127,0.1)" name="equipment_num1'+j+'" maxlength="2" value="1" onkeyup="value=value.replace(/[^\\d]/g,&apos;&apos;)">\
                </div>\
                <div class="col-xs-1 text-right" style="width:5%">\
                    <label>序列号&nbsp;</label>\
                </div>\
                <div class="col-xs-3" style="width:20%">\
                    <input class="form-control" type="text" id="equipment_ser_num1'+j+'" name="equipment_ser_num1'+j+'" maxlength="30" onkeyup="value=value.replace(/[^\\w\\-]/g,&apos;&apos;)">\
                </div>\
            </div>\
        </div>';
        var idname = '#increase_Equipment_box'+(j-1);
        $(idname).after(html);
        var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
        // $("#add_equipment_pop").css('max-height', oH);
        $("#add_equipment_pop").css('height', oH);
        // $("#add_equipment_pop").css('height', '782px');
        $(obj).css('display','none');
        var delpic='#remove_increase_project_box'+(j-1);
        $(delpic).css('display','initial');
        Fill_Select_prod_brand('equipment_brand1'+j+'');
    }else{
        alert('error!');
    }
    
}
//填充下拉框 合同编号 项目名称 项目负责人
function Fill_Select(){
    if(dataset.length>0){
        var html1  = '<option value="">请选择</option>';
        var html2  = '<option value="">请选择</option>';
        var html3  = '<option value="">请选择</option>';
        var val = [];
        $.each(dataset, function (i, v) {
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
            val.push(v.dutyname);
        });
        var val1 = unique(val);//去重
        $.each(val1, function (i, v) {
            html3 += '<option value="' + v + '">' + v + '</option>';
        });
    }else{
        var html1  = '<option value="">请选择</option>';
        var html2  = '<option value="">请选择</option>';
        var html3  = '<option value="">请选择</option>';
    }
    $("#cont5").html(html1);
    $("#cont6").html(html1);
    $("#projectname5").html(html2);
    $("#projectname6").html(html2);
    $("#dutyname5").html(html3);
    $("#dutyname6").html(html3);
    $("#cont7").html(html1);
    $("#cont8").html(html1);
    $("#cont81").html(html1);
    $("#projectname7").html(html2);
    $("#projectname8").html(html2);
    $("#projectname81").html(html2);
}
//填充下拉框 品牌   id为str
function Fill_Select_prod_brand(str){
    if(equipmentset.length>0){
        // console.log(equipmentset);
        var html  = '<option value="">请选择</option>';
        var val = [];
        $.each(equipmentset,function(i , v){
           val.push(v.brand);
        });
        var val1 = unique(val);//去重
        $.each(val1, function (i, v) {
            html += '<option value="' + v + '">' + v + '</option>';
        });
    } else {
         var html  = '<option value="">请选择</option>';
    }
    $("#"+str+"").html(html);
}
//查询项目的设备信息
function search_cont_equip(obj,serial){
     postRequest('/display_cont_equip/', {
         "data": JSON.stringify({'contractno' : obj.contractno})
     },function (data){
         input_equip_data(obj,data.data);
         if (serial && serial != ''){
             var box = $('.equipborder');
             $.each(box,function(i,v){
            // console.log($(v).children('.div-margin').children('.col-xs-3').children('input').val());
            // //.children('.div-margin').children('.col-xs-3').children('input')
                if ($(v).children('.div-margin').children('.col-xs-3').children('input').val() == serial){
                    $(v).css('border',' 1px solid #F44336');
                    $('#add_equipment_pop').scrollTop($(v).offset().top-56);
                    return false;
                }
            });
         }
     },function(err){
         console.log(err);
     });
}
//退出关闭“添加”/“修改”/“查看”弹窗
function Closes_Equipment_Popup(){
    EliminateANDremove_equipmentbox();
    $('#update_equipment_confirm').prop('onclick','Update_Equipment_Confirm()');
    $('#update_equipment_confirm').attr('onclick','Update_Equipment_Confirm()');
    $("#add_equipment_pop").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
}
/* 点击"筛选"出现弹窗  */
function search_equiment(){
    resetchoose_equipment();

    var oH = $("#shaixuanequipment").find(".popup-Content-box").height();
    
    $("#shaixuanequipment").height(oH);
    $('#shaixuanequipment').siblings('.popup-Box').css('height', 'auto');
    
     $("#shaixuanequipment").addClass('showPopup');
     $(".md-overlay").addClass('showOverlay');
     Fill_Select();
}

//重置按钮
function resetchoose_equipment(){
    $("select[name='cont6'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont6'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='cont_write6']").val('');
    $("select[name='projectname6'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname6'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='projectname_write6']").val('');
    $("select[name='dutyname6'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname6'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='equipment_ser_num6']").val('');
    $("input[name='model_write6']").val('');
    $("select[name='model7'] option").eq(0).attr('selected', 'selected');
    $("select[name='model7'] option").eq(0).prop('selected', 'selected');
    $("select[name='type7'] option").eq(0).attr('selected', 'selected');
    $("select[name='type7'] option").eq(0).prop('selected', 'selected');
    $("select[name='brand7'] option").eq(0).attr('selected', 'selected');
    $("select[name='brand7'] option").eq(0).prop('selected', 'selected');
    $("input[name='model_write7']").val('');
    Filling_brand('7');
    Filling_type('7');
    Filling_model('7');
    
}
//填充品牌下拉框
function Filling_brand(i){
    var val1 = [];
    var html1 = "<option value=''>请选择</option>";
    $.each(equipmentset,function(i,v){
        val1.push(v.brand);
    })
    var arr1 = unique(val1);
    $.each(arr1, function (i, v) {
        html1 += '<option value="' + v + '">' + v + '</option>';
    });
    $("#brand"+i+"").html(html1);
}
//填充类型下拉框
function Filling_type(i){
    var val2 = [];
    var html2 = "<option value=''>请选择</option>";
    $.each(equipmentset,function(i,v){
        val2.push(v.type);
    });
    var arr2 = unique(val2);
    $.each(arr2, function (i, v) {
        html2 += '<option value="' + v + '">' + v + '</option>';
    });
    $("#type"+i+"").html(html2);
}
//填充型号下拉框
function Filling_model(i){
    var val3 = [];
    var html3 = "<option value=''>请选择</option>";
    $.each(equipmentset,function(i,v){
        val3.push(v.model);
    });
    // var arr3 = unique(val3);
    $.each(val3, function (i, v) {
        html3 += '<option value="' + v + '">' + v + '</option>';
    });
    $("#model"+i+"").html(html3);
}
//筛选设备元数据时 三下拉框的联动
function change_equip_search_select(i,j){
    var brand = $("select[name='brand"+j+"'] option:selected").val()||'';
    var type = $("select[name='type"+j+"'] option:selected").val()||'';
    // var model = $("select[name='model6'] option:selected").val()||'';
    var model = $("input[name='model_write"+j+"']").val()||'';
    if(model == "请选择"){model='';}
    var html1  = '<option value="">请选择</option>';
    var html2  = '<option value="">请选择</option>';
    var html3  = '<option value="">请选择</option>';
    var val1 = [];
    var val2 = [];
    var val3 = [];
    if ( i == 1){
        if ( brand != '' ){
            if ( type == '' && model == '' ){
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand){
                        val2.push(v.type);
                        val3.push(v.model);
                    }
                });
                var arr2 = unique(val2);
                var arr3 = unique(val3);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if ( type != '' && model == '' ){
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand ){
                        val2.push(v.type);
                    } 
                });
                var arr2 = unique(val2);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
                $("#type"+j+" option").each(function (){
                    var txt = $(this).text();  
                    if(txt == type ){
                        $.each(equipmentset, function (i, v) {
                            if (brand == v.brand && type == v.type){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if($("#select[name=type"+j+"] option:selected").val()==''){
                    $.each(equipmentset, function (i, v) {
                        if (brand == v.brand){
                            val3.push(v.model);
                        }
                    });
                    var arr3 = unique(val3);
                    $.each(arr3, function (i, v) {
                        html3 += '<option value="' + v + '">' + v + '</option>';
                    });
                    $("#model"+j+"").html(html3);
                }
            }
            if ( type == '' && model != '' ){
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand ){
                        val3.push(v.model);
                    } 
                });
                var arr3 = unique(val3);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
                $('input[name = "model_write'+j+'" ]').val('');
                $("#model"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == model ){
                        $.each(equipmentset, function (i, v) {
                            if (brand == v.brand && model == v.model){
                                val2.push(v.type);
                            }
                        });
                        var arr2 = unique(val2);
                        $.each(arr2, function (i, v) {
                            html2 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#type"+j+"").html(html2);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        $('input[name = "model_write'+j+'" ]').val(txt);
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if ($("input[name = model_write"+j+"]").val() == ''){
                    $.each(equipmentset, function (i, v) {
                            if (brand == v.brand){
                                val2.push(v.type);
                            }
                        });
                        var arr2 = unique(val2);
                        $.each(arr2, function (i, v) {
                            html2 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#type"+j+"").html(html2);
                }
            }
            if ( type != '' && model != '' ){
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand ){
                        val2.push(v.type);
                    } 
                });
                var arr2 = unique(val2);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
                $("#type"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == type ){
                        $.each(equipmentset, function (i, v) {
                            if (brand == v.brand && type == v.type){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                        $("#model"+j+" option").each(function (){  
                            var txt1 = $(this).text();  
                            if(txt1 == model ){
                                $(this).prop('selected', 'selected');
                                $(this).attr('selected', 'selected');
                                return false;
                            }else{
                                return true;
                            }
                        });
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if($("#select[name=type"+j+"] option:selected").val()==''){
                    $.each(equipmentset, function (i, v) {
                        if (brand == v.brand){
                            val3.push(v.model);
                        }
                    });
                    var arr3 = unique(val3);
                    $.each(arr3, function (i, v) {
                        html3 += '<option value="' + v + '">' + v + '</option>';
                    });
                    $("#model"+j+"").html(html3);
                }
            }
        }else{
            if ( type == '' && model == '' ){
                Filling_brand(j);
                Filling_type(j);
                Filling_model(j);
                //select_equip_meta();
            }
            if ( type != '' && model == '' ){
                Filling_type(j);
                $("#type"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == type ){
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $.each(equipmentset, function (i, v) {
                    if (type == v.type){
                        val1.push(v.brand);
                        val3.push(v.model);
                    }
                });
                var arr1 = unique(val1);//去重
                var arr3 = unique(val3);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if ( type == '' && model != '' ){
                Filling_model(j);
                $("input[name=model_write"+j+"").val('');
                $("#model"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == model ){
                        $("input[name=model_write"+j+"").val(txt);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $.each(equipmentset, function (i, v) {
                    if (model == v.model){
                        val1.push(v.brand);
                        val2.push(v.type);
                    }
                });
                var arr1 = unique(val1);
                var arr2 = unique(val2);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
            }
            if ( type != '' && model != '' ){
                Filling_type(j);
                Filling_model(j);
                $("#type"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == type ){
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $("input[name=model_write"+j+"").val('');
                $("#model"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == model ){
                        $("input[name=model_write"+j+"").val(txt);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $.each(equipmentset, function (i, v) {
                    if (model == v.model||type==v.type){
                        val1.push(v.brand);
                    }
                });
                var arr1 = unique(val1);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
            }
        }
    }
    if ( i == 2 ){
        if ( type != '' ){
            if ( brand == '' && model == '' ){
                $.each(equipmentset, function (i, v) {
                    if (type == v.type){
                        val1.push(v.brand);
                        val3.push(v.model);
                    }
                });
                var arr1 = unique(val1);
                var arr3 = unique(val3);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if ( brand != '' && model == '' ){
                $.each(equipmentset, function (i, v) {
                    if (type == v.type ){
                        val1.push(v.brand);
                    } 
                });
                var arr1 = unique(val1);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $("#brand"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == brand ){
                        $.each(equipmentset, function (i, v) {
                            if (brand == v.brand && type == v.type){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if ($("select[name=brand"+j+"] option:selected").val()==''){
                     $.each(equipmentset, function (i, v) {
                            if (brand == v.brand){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                }
            }
            if ( brand == '' && model != '' ){
                $.each(equipmentset, function (i, v) {
                    if (type == v.type ){
                        val3.push(v.model);
                    } 
                });
                var arr3 = unique(val3);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
                $("input[name=model_write"+j+"").val('');
                $("#model"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == model ){
                        $.each(equipmentset, function (i, v) {
                            if (type == v.type && model == v.model){
                                val1.push(v.brand);
                            }
                        });
                        var arr1 = unique(val1);
                        $.each(arr1, function (i, v) {
                            html1 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#brand"+j+"").html(html1);
                        $("input[name=model_write"+j+"").val(txt);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if ($("select[name=model"+j+"] option:selected").val()=='') {
                    $.each(equipmentset, function (i, v) {
                            if (model == v.model){
                                val1.push(v.brand);
                            }
                        });
                        var arr1 = unique(val1);
                        $.each(arr1, function (i, v) {
                            html1 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#brand"+j+"").html(html1);
                }
            }
            if ( brand != '' && model != '' ){
                $("input[name=model_write"+j+"").val('');
                $.each(equipmentset, function (i, v) {
                    if (type == v.type ){
                        val1.push(v.brand);
                    } 
                });
                var arr1 = unique(val1);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $("input[name=model_write"+j+"").val('');
                $("#brand"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == brand ){
                        $.each(equipmentset, function (i, v) {
                            if (brand == v.brand && type == v.type){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                        $("#model"+j+" option").each(function (){  
                            var txt1 = $(this).text();  
                            if(txt1 == model ){
                                $("input[name=model_write"+j+"").val(txt1);
                                $(this).prop('selected', 'selected');
                                $(this).attr('selected', 'selected');
                                return false;
                            }else{
                                return true;
                            }
                        });
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;//jquery中 跳出循环为return false，相当于break， continue为return ture  
                    }else{
                        return true;
                    }
                });
                if($("#select[name=brand"+j+"] option:selected").val()==''){
                    $.each(equipmentset, function (i, v) {
                        if (type == v.type){
                            val3.push(v.model);
                        }
                    });
                    var arr3 = unique(val3);
                    $.each(arr3, function (i, v) {
                        html3 += '<option value="' + v + '">' + v + '</option>';
                    });
                    $("#model"+j+"").html(html3);
                }
            }
        }else{
            if ( brand == '' && model == '' ){
                Filling_brand(j);
                Filling_type(j);
                Filling_model(j);
                // select_equip_meta();
            }
            if ( brand != '' && model == '' ){
                Filling_brand(j);
                $("#brand"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == brand ){
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand){
                        val2.push(v.type);
                        val3.push(v.model);
                    }
                });
                var arr2 = unique(val2);
                var arr3 = unique(val3);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if ( brand == '' && model != '' ){
                Filling_model(j);
                $("input[name=model_write"+j+"").val('');
                $("#model"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == model ){
                        $("input[name=model_write"+j+"").val(txt);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                $.each(equipmentset, function (i, v) {
                    if (model == v.model){
                        val1.push(v.brand);
                        val2.push(v.type);
                    }
                });
                var arr1 = unique(val1);
                var arr2 = unique(val2);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
            }
            if ( brand != '' && model != '' ){
                Filling_brand(j);
                // Filling_model();
                $("#brand"+j+" option").each(function (){  
                    var txt = $(this).text();  
                    if(txt == brand ){
                        $.each(equipmentset, function (i, v) {
                            if (brand==v.brand){
                                val3.push(v.model);
                            }
                        });
                        var arr3 = unique(val3);
                        $.each(arr3, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                        });
                        $("#model"+j+"").html(html3);
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        return false;
                    }else{
                        return true;
                    }
                });
                if($("select[name=brand"+j+"] option:selected").val()==''){
                    $("input[name=model_write"+j+"").val('');
                    $("#model"+j+" option").each(function (){  
                        var txt = $(this).text();  
                        if(txt == model ){
                            $("input[name=model_write"+j+"").val(txt);
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            return false;
                        }else{
                            return true;
                        }
                    });
                }
                $.each(equipmentset, function (i, v) {
                    if (brand==v.brand){
                        val2.push(v.type);
                    }
                });
                var arr2 = unique(val2);
                $.each(arr2, function (i, v) {
                    html2 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
            }
        }
    }
    if ( i == 3 ){
        if ( model != '' ){
            $.each(equipmentset, function (i, v) {
                if (model == v.model){
                    val1.push(v.brand);
                    val2.push(v.type);
                }
            });
            var arr1 = unique(val1);
            var arr2 = unique(val2);
            $.each(arr1, function (i, v) {
                html1 += '<option value="' + v + '">' + v + '</option>';
            });
            $("#brand"+j+"").html(html1);
            if (arr1.length==1){
                $("select[name = 'brand"+j+"'] option").eq(1).attr('selected','selected');
            }
            $.each(arr2, function (i, v) {
                html2 += '<option value="' + v + '">' + v + '</option>';
            });
            $("#type"+j+"").html(html2);
            if (arr2.length==1){
                $("select[name = 'type"+j+"'] option").eq(1).attr('selected','selected');
            }
        }else{
            if( brand == '' && type == ''){
                Filling_brand(j);
                Filling_type(j);
                Filling_model(j);
                // select_equip_meta();
            }
            if( brand == '' && type != ''){
                $.each(equipmentset, function (i, v) {
                    if (type == v.type){
                        val1.push(v.brand);
                        val3.push(v.model);
                    }
                });
                var arr1 = unique(val1);
                var arr3 = unique(val3);
                $.each(arr1, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#brand"+j+"").html(html1);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if( brand != '' && type == ''){
                 $.each(equipmentset, function (i, v) {
                    if (brand == v.brand){
                        val2.push(v.type);
                        val3.push(v.model);
                    }
                });
                var arr2 = unique(val2);
                var arr3 = unique(val3);
                $.each(arr2, function (i, v) {
                    html1 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#type"+j+"").html(html2);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
            if( brand != '' && type != ''){
                $.each(equipmentset, function (i, v) {
                    if (brand == v.brand && type == v.type){
                        val3.push(v.model);
                    }
                });
                var arr3 = unique(val3);
                $.each(arr3, function (i, v) {
                    html3 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#model"+j+"").html(html3);
            }
        }
    } 
}
