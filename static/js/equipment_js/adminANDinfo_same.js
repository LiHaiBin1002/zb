//system导入项目设备信息源文件
function upload_equpment(){
    var equipment_fileInput = document.getElementById("equipment_fileInput");
     var regis_name = $("#headername").html();
    $(equipment_fileInput).val('');
    function test(){
        var file1 = equipment_fileInput.files[0];
        var file = new FormData();
        file.append('file',file1);
        $.ajax({
            url: "/upload_equpment/",
            type:"POST",
            data: file,
            processData:false,
            contentType:false,
            success: function(data){
                if(data.result == '1' || data.result == 1){
                    html = '\
                        <span class="alert_or_myconfirm_span1">1、以下行的文本格式错误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0</span><br/>\
                        <span class="alert_or_myconfirm_span1">2、以下合同编号在数据库中不存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>\
                        <span class="alert_or_myconfirm_span1">3、以下行的设备品牌或型号或类型没有元数据：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>\
                        <span class="alert_or_myconfirm_span1">4、以下行的设备数量有误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>\
                        <span class="alert_or_myconfirm_span1">5、以下行的设备序列号在数据库中已存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>\
                        <span class="alert_or_myconfirm_span1">6、文件中有重复的设备序列号：</span><br/>&nbsp;&nbsp&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span>';
                    myconfirm('检查文件',html,function(r){
                        if (r){
                            postRequest('/import_equipment_data_to_db/', {
                                "data1": JSON.stringify({'file_name':data.data[6],'regis_name':regis_name})
                            }, function (data) {
                                if (data.result == 1 || data.result == '1') {
                                    myalert('系统提示框','导入成功');
                                    displayEquipment();
                                } else {
                                    myalert('系统提示框','导入失败');
                                }
                            }, function (err) {
                                console.log(err);
                            });
                        } else {
                            postRequest('/delete_equipment_file_from_server/', {
                                "data1": JSON.stringify({'file_name':data.data[6]})
                            }, function (data) {
                                if (data.result == 1 || data.result == '1') {
                                    myalert('系统提示框','清除成功');
                                } else {
                                    myalert('系统提示框','清除失败');
                                }
                            }, function (err) {
                                console.log(err);
                            });
                        }
                    });
                    $("#mb_tit").css({'background-color': 'rgb(22, 138, 187)','color': 'rgba(255, 255, 255, 1)'});
                }else if (data.result == '2' || data.result == 2){
                    html = '';
                    if (data.data[0].length){
                        html = html + ' <span class="alert_or_myconfirm_span1">1、以下行的文本格式错误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[0] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">1、以下行的文本格式错误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>'
                    }
                    if (data.data[1].length){
                         html = html + ' <span class="alert_or_myconfirm_span1">2、以下合同编号在数据库中不存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[1] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">2、以下合同编号在数据库中不存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>'
                    }
                    if (data.data[2].length){
                         html = html + ' <span class="alert_or_myconfirm_span1">3、以下行的设备品牌或型号或类型没有元数据：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[2] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">3、以下行的设备品牌或型号或类型没有元数据：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>'
                    }
                    if (data.data[3].length){
                         html = html + ' <span class="alert_or_myconfirm_span1">4、以下行的设备数量有误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[3] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">4、以下行的设备数量有误：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>'
                    }
                    if (data.data[4].length){
                         html = html + ' <span class="alert_or_myconfirm_span1">5、以下行的设备序列号在数据库中已存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[4] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">5、以下行的设备序列号在数据库中已存在：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span><br/>'
                    }
                    if (data.data[5].length){
                         html = html + ' <span class="alert_or_myconfirm_span1">6、文件中有重复的设备序列号：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">'+ data.data[5] +'；</span><br/>'
                    } else {
                        html = html + ' <span class="alert_or_myconfirm_span1">6、文件中有重复的设备序列号：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">0；</span>'
                    }
                    myalert('检查文件',html);
                    $("#mb_tit").css({'background-color': 'rgb(22, 138, 187)','color': 'rgba(255, 255, 255, 1)'});
                } else {
                    myalert('系统提示框','导入失败！请检查文件格式……');
                }
            }
        });
        equipment_fileInput.removeEventListener('change',test,false);
    }
    
    equipment_fileInput.addEventListener('change',test,false);

}
//筛选确认按钮
function chooseinfo_equipment(){
    var contractno = $("select[name='cont6'] option:selected").val()||'';
    var projectname = $("select[name='projectname6'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname6'] option:selected").val()||'';
    var serial = $("input[name='equipment_ser_num6']").val();
    var brand = $("select[name='brand7'] option:selected").val()||'';
    var type = $("select[name='type7'] option:selected").val()||'';
    var model = $("select[name='model7'] option:selected").val()||'';

    var data = {"contractno":contractno,"projectname":projectname,"dutyname":dutyname,"serial":serial,"brand": brand,"type":type,"model": model}
    // console.log(data);
    postRequest('/chooseinfo_equipment_item/', {
        "data": JSON.stringify(data)
       },function (data){
           // console.log(data.result);
        if (data.result == 1 || data.result == '1') {
            if (data.data.length){
                var html = '';
                if(data.data.length < 20 ){
                    $("#paging3").hide();
                    $.each(data.data,function(i,v){
                        var str =  encodeURI(JSON.stringify(v));
                        html += '\
                        <tr>\
                            <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\',\''+serial
                            +'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
                            <a href="javascript:;" title="删除" onclick="del_equipment_btn(\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.equip_regis.slice(0,10) + '</td>\
                            <td>'+ v.equip_regis_latest.slice(0,10) + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.regis_name +'</td>\
                            <td style="text-align:left">'+ v.remake + '</td>';
                        html += '</tr>';
                    });
                    $("#show_equipment").html(html);
                }else{
                    if($("#pagebox").length>0){
                        $("#paging").get(0).removeChild($("#pagebox").get(0));//移除数据管理的分页
                    }
                    if($("#pagebox1").length>0){
                        $("#paging1").get(0).removeChild($("#pagebox1").get(0));//移除****的分页
                    }
                    if($("#pagebox2").length>0){
                        $("#paging2").get(0).removeChild($("#pagebox2").get(0));//移除****的分页
                    }
                    $("#paging3").show();
                    var html1 = '<div class="pagebox" id="pagebox3"></div>';
                    $("#paging3").html(html1);
                    var total = data.data.length;
                    var pagenum = Math.ceil(total / 20);
                    $('#pagebox3').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            var html = '';
                            var min = (page - 1) * 20;
                            var max = page * 20;
                            $.each(data.data,function(i,v){
                                // var equip = v.record[0];
                                // var len = v.record.length;
                                var str =  encodeURI(JSON.stringify(v));
                                html += '\
                                <tr>\
                                    <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\',\''+serial+'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
                                    <a href="javascript:;" title="删除" onclick="del_equipment_btn(\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>\
                                    <td>'+ v.contractno + '</td>\
                                    <td style="text-align: left;">'+ v.projectname + '</td>\
                                    <td>'+ v.equip_regis.slice(0,10) + '</td>\
                                    <td>'+ v.equip_regis_latest.slice(0,10) + '</td>\
                                    <td>'+ v.dutyname + '</td>\
                                    <td>'+ v.regis_name +'</td>\
                                    <td style="text-align:left">'+ v.remake + '</td>';
                                html += '</tr>';
                            });
                            $("#show_equipment").html(html);
                            $("#show_equipment").children('tr').each(function (index, value) {
                            if (index >= min && index < max) {
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            });
                        }
                    });
                }
            }else{
                $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
                $("#paging3").hide();
            }
        } else {
            // myalert('系统提示框','无数据');
            $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
            $("#paging3").hide();
        }
        $("#shaixuanequipment").removeClass('showPopup');
        $(".md-overlay").removeClass('showOverlay');
    },function(err){
        console.log(err);
    });
}
/* 点击"添加"出现弹窗  修改设备信息记录*/
function add_equipment_btn(){
    EliminateANDremove_equipmentbox();
    $("#add_equipment_confirm").show();
    $("#update_equipment_confirm").hide();
    
    $('#cont_write5').css('background-color', '');
    $('#cont5').css('background-color', '');
    $('#cont_write5').prop('disabled', false);
    $('#cont_write5').attr('disabled', false);
    $('#cont5').prop('disabled', false);
    $('#cont5').attr('disabled', false);
    $('#projectname_write5').css('background-color', '');
    $('#projectname5').css('background-color', '');
    $('#projectname_write5').prop('disabled', false);
    $('#projectname_write5').attr('disabled', false);
    $('#projectname5').prop('disabled', false);
    $('#projectname5').attr('disabled', false);
    
    // $('#equipment_remark11').css('background-color', '');
    // $('#equipment_remark11').prop('disabled', false);
    // $('#equipment_remark11').attr('disabled', false);

    $("#equipment_title").html("修改合同设备");
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    
    $("#add_equipment_pop").height(oH);
    $("#add_equipment_pop").siblings('.popup-Box').css('height', 'auto');
    
    $("#add_equipment_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');

    Fill_Select();
    Fill_Select_prod_brand('equipment_brand11');
}
//点击“查看”显示单个项目设备信息盒子
function show_equipment_btn(str,s=''){
    $("#search_serial").val(s);
    $('#Cont_Equipment_Div1').prop('onclick','add_cont_equipment_btn(\''+str+'\')');
    $('#Cont_Equipment_Div1').attr('onclick','add_cont_equipment_btn(\''+str+'\')');
    $('#Cont_Equipment_Div2').prop('onclick','update_cont_warranty_btn(\''+str+'\')');
    $('#Cont_Equipment_Div2').attr('onclick','update_cont_warranty_btn(\''+str+'\')');
    $('.equipmentBox').hide();
    $('.One_Cont_equipmentBox').show();
    var json_obj = JSON.parse(decodeURI(str));
    $("input[name='warranty_html_cont']").val(json_obj.contractno);
    $("input[name='warranty_html_projectname']").val(json_obj.projectname);
    var this_s_rank = 1 ; //默认初始页码
    $("#show_cont_equipment").html('<tr><td colspan="9">暂无数据</td></tr>');
    $("#paging4").hide();
    postRequest('/display_cont_equip/', {
        "data": JSON.stringify({'contractno' : json_obj.contractno})
    },function (data){
        // console.log(data.data)
        // input_equip_data(json_obj,data.data);
        if ( s != '' ){
            $.each(data.data,function(i,v){
                // console.log(v);
                if (v.serial == s){
                    this_s_rank = Math.ceil(i / 15); 
                }
            });
        };
        // console.log(this_s_rank);
        if (data.data.length){
            var html = '';
            if(data.data.length < 15 ){
                $("#paging4").hide();
                $.each(data.data,function(i,v){
                    html += '\
                    <tr>\
                        <!--<td>'+ v.contractno + '</td>\
                        <td style="text-align: left;">'+ json_obj.projectname + '</td>\
                        <td>'+ json_obj.dutyname + '</td>-->\
                        <td height = "30">'+ v.brand + '</td>\
                        <td height = "30">'+ v.type + '</td>\
                        <td height = "30">'+ v.model + '</td>\
                        <td height = "30">'+ v.number + '</td>\
                        <td height = "30">'+ v.serial + '</td>\
                        <td height = "30">'+ v.warranty_start_date + '</td>\
                        <td height = "30">'+ v.warranty_end_date + '</td>\
                        <td height = "30">'+ v.remake + '</td>\
                        <td height = "30"><a href="javascript:;" title="修改" onclick="update_one_equipment_btn(\''+str+'\',\''+encodeURI(JSON.stringify(v))+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;\
                        <a href="javascript:;" title="删除" onclick="del_cont_equipment_btn(this,\''+json_obj.id+'\',\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>';
                        
                    html += '</tr>';
                });
                $("#show_cont_equipment").html(html);
            } else {
                if ($("#pagebox3").length>0){
                    $("#paging3").get(0).removeChild($("#pagebox3").get(0));
                }
                $("#paging4").show();
                var html = '<div class="pagebox" id="pagebox4"></div>';
                $("#paging4").html(html);
                var total = data.data.length;
                var pagenum = Math.ceil(total / 15);
                $('#pagebox4').paging({
                    initPageNo: this_s_rank, // 初始页码
                    totalPages: pagenum, //总页数
                    totalCount: '共' + total + '条数据', // 条目总数
                    slideSpeed: 600, // 缓动速度。单位毫秒
                    jump: true, //是否支持跳转
                    callback: function (page) { // 回调函数
                        var html = '';
                        var min = (page - 1) * 15;
                        var max = page * 15;
                        $.each(data.data, function (i, v) {
                            html += '\
                            <tr>\
                                <!--<td>'+ v.contractno + '</td>\
                                <td style="text-align: left;">'+ json_obj.projectname + '</td>\
                                <td>'+ json_obj.dutyname + '</td>-->\
                                <td height = "30">'+ v.brand + '</td>\
                                <td height = "30">'+ v.type + '</td>\
                                <td height = "30">'+ v.model + '</td>\
                                <td height = "30">'+ v.number + '</td>\
                                <td height = "30">'+ v.serial + '</td>\
                                <td height = "30">'+ v.warranty_start_date + '</td>\
                                <td height = "30">'+ v.warranty_end_date + '</td>\
                                <td height = "30">'+ v.remake + '</td>\
                                <td height = "30"><a href="javascript:;" title="修改" onclick="update_one_equipment_btn(\''+str+'\',\''+encodeURI(JSON.stringify(v))+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;\
                                <a href="javascript:;" title="删除" onclick="del_cont_equipment_btn(this,\''+json_obj.id+'\',\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>';
                            html += '</tr>';
                        })
                        $("#show_cont_equipment").html(html);
                        $("#show_cont_equipment").children('tr').each(function (index, value) {
                            if (index >= min && index < max) {
                                // console.log(index);
                                $(this).show();
                            } else {
                                $(this).hide();
                            }
                        })
                    }
                });
            }
        }
    },function(err){
       console.log(err);
    });
    
}
//更新某个项目中的一个设备信息 "修改"按钮
function update_one_equipment_btn(object1,object2){
    var obj1 = JSON.parse(decodeURI(object1));
    var obj2 = JSON.parse(decodeURI(object2));
    // console.log(obj1);
    // console.log(obj2);
    EliminateANDremove_equipmentbox();
    $("#add_equipment_confirm").hide();
    $("#update_equipment_confirm").show();
    
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
    // $('#equipment_remark11').css('background-color', '');
    // $('#equipment_remark11').prop('disabled', false);
    // $('#equipment_remark11').attr('disabled', false);
    $('.border21').find('img').eq(1).hide();
    $("#equipment_title").html("修改设备登记");
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    
    $("#add_equipment_pop").height(oH);
    $("#add_equipment_pop").siblings('.popup-Box').css('height', 'auto');
    
    $("#add_equipment_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');

    Fill_Select();
    Fill_Select_prod_brand('equipment_brand11');
    //写入数据
    if ( !($.isEmptyObject(obj1)) ){
        $("input[name='equipment_id']").val(obj1.id);
        $("select[name='cont5'] option").each(function () {
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj1.contractno) {
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
            if ($(this).val() == obj1.projectname) {
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
            if ($(this).val() == obj1.dutyname) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        // $("textarea[name='equipment_remark11']").val(obj1.remake);
    }
    if ( !($.isEmptyObject(obj2)) ){
        $("input[name='equipment_cont_id1']").val(obj2.id);
        $("select[name='equipment_brand11'] option").each(function(){
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj2.brand) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        Fill_Select_prod_type('equipment_brand11','equipment_type11');
        $("select[name='equipment_type11'] option").each(function(){
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj2.type) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        Fill_Select_prod_model('equipment_brand11','equipment_type11','equipment_model11');
        $("select[name='equipment_model11'] option").each(function(){
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj2.model) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        $("textarea[name='equipment_remark11']").val(obj2.remake);
        $("input[name='equipment_num11']").val(obj2.number);
        $("input[name='equipment_ser_num11']").val(obj2.serial);
    }
    //将id传到Update_Equipment_Confirm()方法，用于后面的·比较是否改动
    $('#update_equipment_confirm').prop('onclick','Update_Equipment_Confirm(\''+object1+'\',\''+object2+'\')');
    $('#update_equipment_confirm').attr('onclick','Update_Equipment_Confirm(\''+object1+'\',\''+object2+'\')');
}
//更新某一个项目的设备信息  添加
function add_cont_equipment_btn(object1){
    var obj1 = JSON.parse(decodeURI(object1));
    EliminateANDremove_equipmentbox();
    $("#add_equipment_confirm").hide();
    $("#update_equipment_confirm").show();
    
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
    // $('#equipment_remark11').css('background-color', 'rgba(127,127,127,0.1)');
    // $('#equipment_remark11').prop('disabled', 'disabled');
    // $('#equipment_remark11').attr('disabled', 'disabled');
    
    $("#equipment_title").html("新增设备登记");
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    
    $("#add_equipment_pop").height(oH);
    $("#add_equipment_pop").siblings('.popup-Box').css('height', 'auto');
    
    $("#add_equipment_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    Fill_Select();
    Fill_Select_prod_brand('equipment_brand11');
    //写入数据

    if ( !($.isEmptyObject(obj1)) ){
        $("input[name='equipment_id']").val(obj1.id);
        $("select[name='cont5'] option").each(function () {
            $(this).prop('selected', false);
            $(this).attr('selected', false);
            if ($(this).val() == obj1.contractno) {
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
            if ($(this).val() == obj1.projectname) {
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
            if ($(this).val() == obj1.dutyname) {
                $(this).prop('selected', 'selected');
                $(this).attr('selected', 'selected');
                return false;
            }
        });
        // $("textarea[name='equipment_remark11']").val(obj1.remake);
    }
    //将id传到Update_Equipment_Confirm()方法，用于后面的·比较是否改动
    $('#update_equipment_confirm').prop('onclick','Update_Equipment_Confirm(\''+object1+'\')');
    $('#update_equipment_confirm').attr('onclick','Update_Equipment_Confirm(\''+object1+'\')');
}
//删除某个项目中的一个设备信息 "删除"按钮
function del_cont_equipment_btn(obj,str1,str2){
    myconfirm('系统提示框','确定删除？', function(r){
        if(r){
            postRequest('/del_cont_equip/', {
                "data": JSON.stringify({'Equip_regist_id' : str1,'Equip_regist_prod_id': str2})
            },function (data){
                if (data.result==1){
                    // console.log(obj);
                    $(obj).parent().parent().remove();
                }
            },function(err){
               console.log(err);
            });
        }
    });
}
//移除单个 设备框
function remove_equipment_box(obj){
    //获得是第几个border2
    var j = parseFloat($(obj).parent().attr('id').replace(/[^0-9]/ig,""));
    //获取border的总个数
    var i = $(obj).parent().siblings('.equipborder').length+1;
    //修改时删除将对应id记录到name为equipment_cont_id的input框中
    if(($("input[name='equipment_cont_id"+j+"']").val())!=''){
        var value = $("input[name='equipment_cont_id']").val() + ";" + $("input[name='equipment_cont_id"+j+"']").val();
        $("input[name='equipment_cont_id']").val(value);
    }
    
    //清除当前元素下子元素中的数据
    $("select[name='equipment_brand1"+j+"'] option").eq(0).attr('selected', 'selected');
    $("select[name='equipment_brand1"+j+"'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='equipment_type1"+j+"'] option").eq(0).attr('selected', 'selected');
    $("select[name='equipment_type1"+j+"'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='equipment_model1"+j+"'] option").eq(0).attr('selected', 'selected');
    $("select[name='equipment_model1"+j+"'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='equipment_num1"+j+"']").val('');
    $("input[name='equipment_ser_num1"+j+"']").val('');
    $("input[name='equipment_cont_id"+j+"']").val('');
    //删除当前元素的父亲点以及子节点
    $(obj).parent().remove();
    //获得新的高度
    var oH = $("#add_equipment_pop").find(".popup-Content-box").height();
    $("#add_equipment_pop").css('height', oH);
    
    var a = j+1;
    
    //修改被删除元素以后的border中的id、class、name的值
    for (a;a<=i;a++){
        var b = a - 1 ;
        $('.border2'+a+'').attr('class','border2'+b+' equipborder');
        
        $('#increase_Equipment_box'+a+'').attr('id','increase_Equipment_box'+b+'');
        
        $('.remove_increase_project_box'+a+'').attr('class','remove_box remove_increase_project_box'+b+'');
        $('#remove_increase_project_box'+a+'').attr('id','remove_increase_project_box'+b+'');
        
        $('input[name="equipment_cont_id'+a+'"]').attr('name','equipment_cont_id'+b+'');
        
        // $('#equipment_brand1'+a+'').attr('id','equipment_brand1'+b+'');
        $('#equipment_brand1'+a+'').attr({id:'equipment_brand1'+b+'',onchange:'Fill_Select_prod_type("equipment_brand1'+b+'","equipment_type1'+b+'")'});
        $('select[name="equipment_brand1'+a+'"]').attr('name','equipment_brand1'+b+'');
        
        // $('#equipment_type1'+a+'').attr('id','equipment_type1'+b+'');
        $('#equipment_type1'+a+'').attr({id:'equipment_type1'+b+'',onchange:'Fill_Select_prod_model("equipment_brand1'+b+'","equipment_type1'+b+'","equipment_model1'+b+'")'});
        $('select[name="equipment_type1'+a+'"]').attr('name','equipment_type1'+b+'');
        
        $('#equipment_model1'+a+'').attr('id','equipment_model1'+b+'');
        $('select[name="equipment_model1'+a+'"]').attr('name','equipment_model1'+b+'');
        
        $('#equipment_num1'+a+'').attr('id','equipment_num1'+b+'');
        $('input[name="equipment_num1'+a+'"]').attr('name','equipment_num1'+b+'');
        
        $('#equipment_ser_num1'+a+'').attr('id','equipment_ser_num1'+b+'');
        $('input[name="equipment_ser_num1'+a+'"]').attr('name','equipment_ser_num1'+b+'');
        
    }
}

//添加设备记录确认
function Add_Equipment_Confirm(){
    var regis_name = $("#headername").html();
    var contractno = $("select[name='cont5'] option:selected").val();
    var projectname = $("select[name='projectname5'] option:selected").val();
    var dutyname = $("select[name='dutyname5'] option:selected").val();
    var remake = $("textarea[name='equipment_remark11']").val();
    var j = $('.equipborder').length;
    var equipment = [];
    var flag = true;
    var flag1 = true;
    for (var i = 1 ; i <= j ; i++){
        var brand = $("select[name='equipment_brand1"+i+"'] option:selected").val();
        var type = $("select[name='equipment_type1"+i+"'] option:selected").val();
        var model = $("select[name='equipment_model1"+i+"'] option:selected").val();
        // var num = $("input[name='equipment_num1"+i+"']").val();
        var num = '1';
        var serial = $("input[name='equipment_ser_num1"+i+"']").val();
        var rank = i;
        if(brand !='' && type !='' && model !='' && num !='' && serial !='' && rank !=''){
            var equip = {'brand':brand,'type':type,'model':model,'num':num,'serial':serial,'rank':rank};
            equipment.push(equip);
        }else{
            // flag = false;
            // myalert('系统提示框','第'+i+'个设备框有数据为空');
            if ( 1 != i && i != j ){
                flag = false;
                myalert('系统提示框','第'+i+'个设备框有数据为空');
            }else{
                continue;
            }
        }
    }
    $.each(equipment,function(i,v){
        $.each(equipment,function(j,w){
            if (i != j && v.serial==w.serial){
                flag1 = false;
                myalert('系统提示框','第'+(i+1)+'个和'+(j+1)+'个设备框的序列号相同');
                return false;
            }
        });
    });
    if(contractno!=''&&projectname!=''&&dutyname!=''){
        if(flag){
            if (flag1){
                postRequest('/check_equipment_item/', {
                 "data": JSON.stringify({'contractno':contractno})
                },function (data){
                 if (data.result == 1 || data.result == '1') {
                     var datas = {'contractno':contractno,'projectname':projectname,'dutyname':dutyname,'equipment':equipment,'regis_name':regis_name,'remake':remake};
                    postRequest('/add_equipment/', {
                        "data": JSON.stringify(datas)
                    }, function (data) {
                        if (data.result == 1 || data.result == '1') {
                            Closes_Equipment_Popup();
                            myalert('系统提示框','添加成功');
                            displayEquipment();
                        } else {
                            myalert('系统提示框','添加失败');
                        }
                    }, function (err) {
                        console.log(err);
                    });
                 } else if (data.result == 2 || data.result == '2') {
                    var datas = {'contractno':contractno,'projectname':projectname,'dutyname':dutyname,'equipment':equipment,'regis_name':regis_name,'remake':remake};
                    postRequest('/change_equipment/', {
                        "data": JSON.stringify(datas)
                    }, function (data) {
                        if (data.result == 1 || data.result == '1') {
                            Closes_Equipment_Popup();
                            myalert('系统提示框','修改成功');
                            displayEquipment();
                        } else {
                            myalert('系统提示框','修改失败');
                        }
                    }, function (err) {
                        console.log(err);
                    });
                 } else {
                     myalert('系统提示框','异常');
                 }
                },function(err){
                 console.log(err);
                });
            }
        }
    }else{
        myalert('系统提示框','项目信息不能为空');
    }
}
//展示设备登记信息
function displayEquipment(){
    postRequest('/display_equipment/', {
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            if (data.data.length){
                var html = '';
                if(data.data.length < 20 ){
                    $("#paging3").hide();
                    $.each(data.data,function(i,v){
                        var str =  encodeURI(JSON.stringify(v));
                        html += '\
                        <tr>\
                            <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
                            <a href="javascript:;" title="删除" onclick="del_equipment_btn(\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.equip_regis.slice(0,10) + '</td>\
                            <td>'+ v.equip_regis_latest.slice(0,10) + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.regis_name +'</td>\
                            <td style="text-align:left">'+ v.remake + '</td>';
                        html += '</tr>';
                    });
                    $("#show_equipment").html(html);
                }else{
                    if($("#pagebox").length>0){
                        $("#paging").get(0).removeChild($("#pagebox").get(0));//移除数据管理的分页
                    }
                    if($("#pagebox1").length>0){
                        $("#paging1").get(0).removeChild($("#pagebox1").get(0));//移除****的分页
                    }
                    if($("#pagebox2").length>0){
                        $("#paging2").get(0).removeChild($("#pagebox2").get(0));//移除****的分页
                    }
                    $("#paging3").show();
                    var html1 = '<div class="pagebox" id="pagebox3"></div>';
                    $("#paging3").html(html1);
                    var total = data.data.length;
                    var pagenum = Math.ceil(total / 20);
                    $('#pagebox3').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            var html = '';
                            var min = (page - 1) * 20;
                            var max = page * 20;
                            $.each(data.data,function(i,v){
                                // var equip = v.record[0];
                                // var len = v.record.length;
                                var str =  encodeURI(JSON.stringify(v));
                                html += '\
                                <tr>\
                                    <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
                                    <a href="javascript:;" title="删除" onclick="del_equipment_btn(\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>\
                                    <td>'+ v.contractno + '</td>\
                                    <td style="text-align: left;">'+ v.projectname + '</td>\
                                    <td>'+ v.equip_regis.slice(0,10) + '</td>\
                                    <td>'+ v.equip_regis_latest.slice(0,10) + '</td>\
                                    <td>'+ v.dutyname + '</td>\
                                    <td>'+ v.regis_name +'</td>\
                                    <td style="text-align:left">'+ v.remake + '</td>';
                                html += '</tr>';
                            });
                            $("#show_equipment").html(html);
                            $("#show_equipment").children('tr').each(function (index, value) {
                            if (index >= min && index < max) {
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            });
                        }
                    });
                }
            }else{
                $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
                $("#paging3").hide();
            }
            
        } else {
            $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
            $("#paging3").hide();
        }
        
    }, function (err) {
        console.log(err);
    });
}
//删除某项目的设备登记信息
function del_equipment_btn(str){
    myconfirm('系统提示框','确定删除？', function(r){
        if(r){
            postRequest('/del_cont_equipment/', {
                "data": JSON.stringify({'id':str})
            }, function (data) {
                if (data.result == 1 || data.result == '1') {
                    myalert('系统提示框','删除成功');
                    displayEquipment();
                } else {
                    myalert('系统提示框','删除失败');
                }
            }, function (err) {
                console.log(err);
            });
        }
    });
}

//修改设备信息确认
function Update_Equipment_Confirm(obj1,obj2){
    if(obj1&&obj2){//改变
        var object1 = JSON.parse(decodeURI(obj1));
        var object2 = JSON.parse(decodeURI(obj2));
        // console.log()
        var regis_name = $("#headername").html();
        var equipment_id = $("input[name='equipment_id']").val();
        var remake = $("textarea[name='equipment_remark11']").val();
        var flag = true;
        var flag2 = false;//判断是否有改动
        var prod_id = $("input[name='equipment_cont_id1']").val()||'';
        var brand = $("select[name='equipment_brand11'] option:selected").val();
        var type = $("select[name='equipment_type11'] option:selected").val();
        var model = $("select[name='equipment_model11'] option:selected").val();
        var num = '1';
        var serial = $("input[name='equipment_ser_num11']").val();
        $("#search_serial").val(serial);
        var equip = {};
        if (brand !='' && type !='' && model !='' && num !='' && serial !=''){
            equip = {'id':prod_id,'brand':brand,'type':type,'model':model,'num':num,'serial':serial,'remake':remake,};
        }else{
            flag = false;
        }
        if((object2.id==equip['id'])&&(object2.brand!=equip.brand||object2.type!=equip.type||object2.model!=equip.model||object2.number.toString()!=equip.num||object2.serial!=equip.serial)){
            flag2 = true;
        }
        if (object1.remake!=remake) flag2 = true;
        var datas = {'id':equipment_id,'regis_name':regis_name,'equip':equip,'contractno':object2.contractno,'object1':obj1};
        // console.log(datas);
        postRequest('/check_equipment_serial/', {
            "data": JSON.stringify({'serial':serial,'id':prod_id})
        }, function (data) {
            if (data.result == 1 || data.result == '1') {
                if(flag){//判断为空
                    if (flag2){//判断改动
                        Update_Equipment_data(datas);
                    }else{
                        myalert('系统提示框','没有数据被改动');
                    }
                }else{
                    myalert('系统提示框','设备框数据不能为空');
                }
            } else {
                myalert('系统提示框',data.data);
            }
        }, function (err) {
            console.log(err);
        });
    }else{//追加
        var regis_name = $("#headername").html();
        var equipment_id = $("input[name='equipment_id']").val();
        var j = $('.equipborder').length;
        var remake = $("textarea[name='equipment_remark11']").val();
        var equipment = [];
        var serial_list = [];
        var flag = true;
        var flag1 = true;
        for (var i = 1 ; i <= j ; i++){
            var brand = $("select[name='equipment_brand1"+i+"'] option:selected").val();
            var type = $("select[name='equipment_type1"+i+"'] option:selected").val();
            var model = $("select[name='equipment_model1"+i+"'] option:selected").val();
            // var num = $("input[name='equipment_num1"+i+"']").val();
            var num = '1';
            var serial = $("input[name='equipment_ser_num1"+i+"']").val();
            var rank = i;
            if(brand !='' && type !='' && model !='' && num !='' && serial !='' && rank !=''){
                serial_list.push(serial);
                var equip = {'brand':brand,'type':type,'model':model,'num':num,'serial':serial,'rank':rank,'remake':remake};
                equipment.push(equip);
            }else{
                flag = false;
                myalert('系统提示框','第'+i+'个设备框有数据为空');
            }
        }
        $.each(equipment,function(i,v){//待优化，两个遍历应该可以一前一后循环
            $.each(equipment,function(j,w){
                if (i != j && v.serial==w.serial){
                    flag1 = false;
                    myalert('系统提示框','第'+(i+1)+'个和'+(j+1)+'个设备框的序列号相同');
                    return false;
                }
            });
        });
        var datas = {'id':equipment_id,'regis_name':regis_name,'equipment':equipment,'object1':obj1};
        postRequest('/check_equipment_serial_list/', {
            "data": JSON.stringify({'serial':serial_list})
        }, function (data) {
            if (data.result == 1 || data.result == '1') {
                if(flag){
                    if (flag1){
                        Update_Equipment_data1(datas);
                    }else{
                        // myalert('系统提示框','设备框数据不能为空');
                    }
                }else{
                    // myalert('系统提示框','没有数据被改动');
                }
            } else {
                myalert('系统提示框',data.data);
            }
        }, function (err) {
            console.log(err);
        });
    }
}
function Update_Equipment_data(datas){
    // console.log(datas);
    postRequest('/updata_change_equipment/', {
        "data": JSON.stringify(datas)
    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            Closes_Equipment_Popup();
            myalert('系统提示框','修改成功');
            v = datas.object1
            // console.log(v);
            show_equipment_btn(v, $("#search_serial").val())
            displayEquipment();
        } else {
            myalert('系统提示框','修改失败');
        }
    }, function (err) {
        console.log(err);
    });
}
function Update_Equipment_data1(datas){
    // console.log(datas);
    postRequest('/updata_add_equipment/', {
        "data": JSON.stringify(datas)
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            Closes_Equipment_Popup();
            myalert('系统提示框','修改成功');
            v = datas.object1
            show_equipment_btn(v, $("#search_serial").val())
        } else {
            myalert('系统提示框','修改失败');
        }
    }, function (err) {
        console.log(err);
    });
}
//清空页面//未用
function resetchoose_cont1(){
    $("select[name='cont7'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont7'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='cont_write7']").val('');
    $("select[name='projectname7'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname7'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='projectname_write7']").val('');
    resetchoose_cont2()
}
//关闭页面//未用
function resetchoose_cont2(){
    $("#search_warranty_ment").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
}
//打开更新维保日期页面//未用
function update_warranty(){
    resetchoose_cont1();
    var oH = $("#search_warranty_ment").find(".popup-Content-box").height();
    
    $("#search_warranty_ment").height(oH);
    $('#search_warranty_ment').siblings('.popup-Box').css('height', 'auto');
    
     $("#search_warranty_ment").addClass('showPopup');
     $(".md-overlay").addClass('showOverlay');
     Fill_Select();
}
// 更新维保确认//未用
function myalert_Equip_select(){
    var contractno = $("select[name='cont7'] option:selected").val()||'';
    // var contractno = $("input[name='cont_write7']").val()||'';//测试方便
    if (contractno != ''){
        html = '\
            <span class="alert_or_myconfirm_span1">当前已支持的设备品牌：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">H3C，华为，IBM，联想，浪潮，HPE</span><br/>\
            <span class="alert_or_myconfirm_span1">当前已支持的设备类型：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">服务器，交换机，路由器，防火墙，光模块</span><br/>';
        myconfirm('更新提示',html,function(r){
            if (r){
                $("#search_warranty_ment").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                html = "<i class='fa fa-spinner fa-spin fa-5x'></i>" 
                myalert('更新提示',html);
                $("#mb_btn_ok").attr('disabled','disabled');
                postRequest('/update_warranty_cont/', {
                    "data": JSON.stringify({'contractno' : contractno})
                }, function (data) {
                    // console.log(data);
                    $("#mb_btn_ok").removeAttr("disabled");
                    if (data.result == 1 || data.result == '1') {
                        $("#mb_msg>i").replaceWith("成功,"+data.data+"条数据被修改");
                    }else if(data.result == 2 || data.result == '2'){
                        $("#mb_msg>i").replaceWith(data.data);
                    } else {
                        $("#mb_msg>i").replaceWith("失败");
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        });
    }else{
        myalert('系统提示框','请选择合同编号')
    }
}


