$(function(){
    /** 点击透明块隐藏弹窗 * */
    $(".md-overlay").on('click', function (event) {
        event.stopPropagation();
        $(".popup-Box").removeClass('showPopup');
        $(".md-overlay").removeClass('showOverlay');
    });
    /** 点击"取消"按钮隐藏弹窗 * */
    $(".cancel").on('click', function () {
        $(".popup-Box").removeClass('showPopup');
        $(".md-overlay").removeClass('showOverlay');
    });
})
function cancel_click(){ //因为用load后加载的页面失去了click事件的绑定只能写个函数咯
    $(".popup-Box").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
}

//网络请求
function httpRequest(url, data, successfun, errorfun) {
    $.ajax({
        type: "get",
        url: url,
        data: data,//JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        timeout: 30000,
        dataType: "json",
        success: function (msg) {
            if (successfun) successfun(msg);
        },
        error: function (err) {
            if (errorfun) errorfun(err);
        }
    });
}

function postRequest(url, data, successfun, errorfun) {
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'json',
        success: function (msg) {
            if (successfun) successfun(msg);
        },
        error: function (err) {
            if (errorfun) errorfun(err);
        }
    });
}
/**
 * @return {number}
 */
// String.prototype.hashCode = function(){
    // if (Array.prototype.reduce){
        // return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    // } 
    // var hash = 0;
    // if (this.length === 0) return hash;
    // for (var i = 0; i < this.length; i++) {
        // var character  = this.charCodeAt(i);
        // hash  = ((hash<<5)-hash)+character;
        // hash = hash & hash; // Convert to 32bit integer
    // }
    // return hash;
// }

var I64BIT_TABLE ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split('');
function randomChar(input){
    var hash = 5381;
    var i = input.length - 1;
    if(typeof input == 'string'){
        for (; i > -1; i--)
        hash += (hash << 5) + input.charCodeAt(i);
    }
    else{
        for (; i > -1; i--)
            hash += (hash << 5) + input[i];
    }
    var value = hash & 0x7FFFFFFF;
    var retValue = '';
    do{
        retValue += I64BIT_TABLE[value & 0x3F];
    }while(value >>= 2);
    return retValue;
}

//将数字转换成带两位小数的金额显示
function toMoney(num){
    //console.log(num);
    num = typeof num == 'string' ? parseFloat(num) : num // 判断是否是字符串如果是字符串转成数字
    num = num.toFixed(2);
    num = parseFloat(num)
    num = num.toLocaleString();
    if (num.indexOf(".")>0){
        if(1 == num.split('.')[1].length ){
            num = num + '0';
        }else{
            num =num;
        }
    }else{
        num = num + '.00'
    }
    return num;//返回的是字符串23,245.12保留2位小数
}

//查看某项目设备登记记录页面的更新维保按钮
function update_cont_warranty_btn(str){
    var json_obj = JSON.parse(decodeURI(str));
    var contractno = json_obj.contractno;
    html = '\
        <span class="alert_or_myconfirm_span1">当前已支持的设备品牌：</span><br/>&nbsp;&nbsp;&nbsp;&nbsp;<span class="alert_or_myconfirm_span2">H3C，华为，IBM，联想，浪潮，HPE，锐捷，迈普</span><br/>\
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
                    show_equipment_btn(str);
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
}
//打开不同厂商维保页面查询入口弹窗
function official_query_warranty_pop(){
    var oH = $("#official_search_warranty_ment").find(".popup-Content-box").height();
    
    $("#official_search_warranty_ment").height(oH);
    $('#official_search_warranty_ment').siblings('.popup-Box').css('height', 'auto');
    
    $("#official_search_warranty_ment").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
}
//打开其他设备维保查询指引
function other_warranty_guide(){
    
    html = '\
        <table cellspacing="0" cellpadding="0" border="0" class="displayTable">\
            <thead>\
                <tr><th>厂商</th><th>客服电话</th><th>厂商</th><th>客服电话</th></tr>\
            </thead>\
            <tbody>\
                <tr><td>EMC</td><td>400-670-0009</td><td>HDS</td><td>400-670-0009</td></tr>\
                <tr><td>Juniper</td><td>852-233-23636</td><td>NetApp</td><td>400-120-3317</td></tr>\
                <tr><td>博科</td><td></td><td>思科</td><td>400-810-0110</td></tr>\
                <tr><td>昆腾</td><td>400-120-3563</td><td>绿盟</td><td>400-818-6868</td></tr>\
                <tr><td>启明星辰</td><td>400-624-3900</td><td>山石网科</td><td>400-828-6655</td></tr>\
                <tr><td>天融信</td><td>400-777-0777</td><td>网御</td><td>400-810-7766</td></tr>\
                <tr><td>信安世纪</td><td>400-670-5518</td><td></td><td></td></tr>\
            </tbody>\
        </table>';
    myalert('查询引导',html);
}
//选择某项目后显示该项目绩效
function display_cont_performance(){
    empty_cont_personnel_html2();
    var cont = $("select[name='cont8'] option:selected").val()||'';
    var data = {"cont":cont};
    //从服务器获取日期，写入”查询日期“
    postRequest('/get_server_date/',{},function(data){
        var tmp_data = data.data;
        $("#search_personnel_input_data").html(tmp_data.slice(0,4)+'年'+tmp_data.slice(4,6)+'月'+tmp_data.slice(6,8)+'日');
    });
    postRequest('/display_cont_performance/',{
        "data": JSON.stringify(data)
    },function(data){
        // console.log(data);
        if (data.result==1||data.result=='1'){
            var html1 = '';
            var html2 = '';
            var html3 = '';
            html1 += '\
                <tr style="height:50px;">\
                    <td>初级</td>\
                    <td>0.7</td>\
                    <td>'+data.data[0].imp_primary+'</td>\
                    <td>'+data.data[0].imp_primary_add+'</td>\
                    <td>'+data.data[0].primary+'</td>';
            if (parseFloat(data.data[0].imp_primary)+parseFloat(data.data[0].imp_primary_add)-parseFloat(data.data[0].primary) <= 0){
                html1 += ' <td style="color:red;">'+(parseFloat(data.data[0].imp_primary)+parseFloat(data.data[0].imp_primary_add)-parseFloat(data.data[0].primary))+'</td>';
            }else{
                html1 += ' <td>'+(parseFloat(data.data[0].imp_primary)+parseFloat(data.data[0].imp_primary_add)-parseFloat(data.data[0].primary))+'</td>';
            };
            html1 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>中级</td>\
                    <td>1</td>\
                    <td>'+data.data[0].imp_intermediate+'</td>\
                    <td>'+data.data[0].imp_intermediate_add+'</td>\
                    <td>'+data.data[0].intermediate+'</td>';
            if (parseFloat(data.data[0].imp_intermediate)+parseFloat(data.data[0].imp_intermediate_add)-parseFloat(data.data[0].intermediate) <= 0){
                html1 += ' <td style="color:red;">'+(parseFloat(data.data[0].imp_intermediate)+parseFloat(data.data[0].imp_intermediate_add)-parseFloat(data.data[0].intermediate))+'</td>';
            }else{
                html1 += ' <td>'+(parseFloat(data.data[0].imp_intermediate)+parseFloat(data.data[0].imp_intermediate_add)-parseFloat(data.data[0].intermediate))+'</td>';
            };
            html1 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>高级</td>\
                    <td>1.5</td>\
                    <td>'+data.data[0].imp_senior+'</td>\
                    <td>'+data.data[0].imp_senior_add+'</td>\
                    <td>'+data.data[0].senior+'</td>';
            if (parseFloat(data.data[0].imp_senior)+parseFloat(data.data[0].imp_senior_add)-parseFloat(data.data[0].senior) <= 0){
                html1 += ' <td style="color:red;">'+(parseFloat(data.data[0].imp_senior)+parseFloat(data.data[0].imp_senior_add)-parseFloat(data.data[0].senior))+'</td>';
            }else{
                html1 += ' <td>'+(parseFloat(data.data[0].imp_senior)+parseFloat(data.data[0].imp_senior_add)-parseFloat(data.data[0].senior))+'</td>';
            };
            html1 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>高级以上</td>\
                    <td>2</td>\
                    <td>'+data.data[0].imp_senior_plus+'</td>\
                    <td>'+data.data[0].imp_senior_plus_add+'</td>\
                    <td>'+data.data[0].senior_plus+'</td>';
            if (parseFloat(data.data[0].imp_senior_plus)+parseFloat(data.data[0].imp_senior_plus_add)-parseFloat(data.data[0].senior_plus) <= 0){
                html1 += ' <td style="color:red;">'+(parseFloat(data.data[0].imp_senior_plus)+parseFloat(data.data[0].imp_senior_plus_add)-parseFloat(data.data[0].senior_plus))+'</td>';
            }else{
                html1 += ' <td>'+(parseFloat(data.data[0].imp_senior_plus)+parseFloat(data.data[0].imp_senior_plus_add)-parseFloat(data.data[0].senior_plus))+'</td>';
            };
            html1 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>其他</td>\
                    <td>2.5</td>\
                    <td>'+data.data[0].imp_other+'</td>\
                    <td>'+data.data[0].imp_other_add+'</td>\
                    <td>'+data.data[0].other+'</td>';
            if (parseFloat(data.data[0].imp_other)+parseFloat(data.data[0].imp_other_add)-parseFloat(data.data[0].other) <= 0){
                html1 += ' <td style="color:red;">'+(parseFloat(data.data[0].imp_other)+parseFloat(data.data[0].imp_other_add)-parseFloat(data.data[0].other))+'</td>';
            }else{
                html1 += ' <td>'+(parseFloat(data.data[0].imp_other)+parseFloat(data.data[0].imp_other_add)-parseFloat(data.data[0].other))+'</td>';
            };
            html1 += '</tr>';
            $("#show_cont_performance_people").html(html1);
            html3 += '\
                <tr style="height:50px;">\
                    <td>初级</td>\
                    <td>0.7</td>\
                    <td>'+data.data[0].gua_primary+'</td>\
                    <td>'+data.data[0].gua_primary_add+'</td>\
                    <td>'+data.data[0].primary1+'</td>';
            if (parseFloat(data.data[0].gua_primary)+parseFloat(data.data[0].gua_primary_add)-parseFloat(data.data[0].primary1) <= 0){
                html3 += ' <td style="color:red;">'+(parseFloat(data.data[0].gua_primary)+parseFloat(data.data[0].gua_primary_add)-parseFloat(data.data[0].primary1))+'</td>';
            }else{
                html3 += ' <td>'+(parseFloat(data.data[0].gua_primary)+parseFloat(data.data[0].gua_primary_add)-parseFloat(data.data[0].primary1))+'</td>';
            };
            html3 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>中级</td>\
                    <td>1</td>\
                    <td>'+data.data[0].gua_intermediate+'</td>\
                    <td>'+data.data[0].gua_intermediate_add+'</td>\
                    <td>'+data.data[0].intermediate1+'</td>';
            if (parseFloat(data.data[0].gua_intermediate)+parseFloat(data.data[0].gua_intermediate_add)-parseFloat(data.data[0].intermediate1) <= 0){
                html3 += ' <td style="color:red;">'+(parseFloat(data.data[0].gua_intermediate)+parseFloat(data.data[0].gua_intermediate_add)-parseFloat(data.data[0].intermediate1))+'</td>';
            }else{
                html3 += ' <td>'+(parseFloat(data.data[0].gua_intermediate)+parseFloat(data.data[0].gua_intermediate_add)-parseFloat(data.data[0].intermediate1))+'</td>';
            };
            html3 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>高级</td>\
                    <td>1.5</td>\
                    <td>'+data.data[0].gua_senior+'</td>\
                    <td>'+data.data[0].gua_senior_add+'</td>\
                    <td>'+data.data[0].senior1+'</td>';
            if (parseFloat(data.data[0].gua_senior)+parseFloat(data.data[0].gua_senior_add)-parseFloat(data.data[0].senior1) <= 0){
                html3 += ' <td style="color:red;">'+(parseFloat(data.data[0].gua_senior)+parseFloat(data.data[0].gua_senior_add)-parseFloat(data.data[0].senior1))+'</td>';
            }else{
                html3 += ' <td>'+(parseFloat(data.data[0].gua_senior)+parseFloat(data.data[0].gua_senior_add)-parseFloat(data.data[0].senior1))+'</td>';
            };
            html3 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>高级以上</td>\
                    <td>2</td>\
                    <td>'+data.data[0].gua_senior_plus+'</td>\
                    <td>'+data.data[0].gua_senior_plus_add+'</td>\
                    <td>'+data.data[0].senior_plus1+'</td>';
            if (parseFloat(data.data[0].gua_senior_plus)+parseFloat(data.data[0].gua_senior_plus_add)-parseFloat(data.data[0].senior_plus1) <= 0){
                html3 += ' <td style="color:red;">'+(parseFloat(data.data[0].gua_senior_plus)+parseFloat(data.data[0].gua_senior_plus_add)-parseFloat(data.data[0].senior_plus1))+'</td>';
            }else{
                html3 += ' <td>'+(parseFloat(data.data[0].gua_senior_plus)+parseFloat(data.data[0].gua_senior_plus_add)-parseFloat(data.data[0].senior_plus1))+'</td>';
            };
            html3 += '\
                </tr>\
                <tr style="height:50px;">\
                    <td>其他</td>\
                    <td>2.5</td>\
                    <td>'+data.data[0].gua_other+'</td>\
                    <td>'+data.data[0].gua_other_add+'</td>\
                    <td>'+data.data[0].other1+'</td>';
            if (parseFloat(data.data[0].gua_other)+parseFloat(data.data[0].gua_other_add)-parseFloat(data.data[0].other1) <= 0){
                html3 += ' <td style="color:red;">'+(parseFloat(data.data[0].gua_other)+parseFloat(data.data[0].gua_other_add)-parseFloat(data.data[0].other1))+'</td>';
            }else{
                html3 += ' <td>'+(parseFloat(data.data[0].gua_other)+parseFloat(data.data[0].gua_other_add)-parseFloat(data.data[0].other1))+'</td>';
            };
            html3 += '</tr>';
            $("#show_cont_performance_people1").html(html3);
            d = data.data[0].workload_input
            // console.log(d);
            if (d.length){
                for (i = 0;i < 9; i++){
                    if (i < d.length  ){
                        // var ratio = String(Number(d[i].workload / data.data[0].total_workload * 100))+'%';
                        var ratio = String( Math.floor(d[i].workload / data.data[0].total_workload * 100))+'%';
                        // console.log(ratio);
                        html2 += '\
                            <tr style="height:50px;">\
                                <td>'+d[i].worktype+'</td>\
                                <td>'+d[i].workitem+'</td>\
                                <td>'+d[i].workload+'</td>\
                                <td>'+ratio+'</td>\
                            </tr>';
                    } else {
                        html2 += '\
                            <tr style="height:50px;">\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                                <td></td>\
                            </tr>';
                    }
                }
                $("#show_cont_performance_work").html(html2);
            } else{
                
            }
        } else{
            // html1 = '\
                // <tr style="height:50px;">\
                    // <td>初级</td>\
                    // <td>0.7</td>\
                    // <td></td>\
                    // <td></td>\
                    // <td></td>\
                // </tr>\
                // <tr style="height:50px;">\
                    // <td>中级</td>\
                    // <td>1</td>\
                    // <td></td>\
                    // <td></td>\
                    // <td></td>\
                // </tr>\
                // <tr style="height:50px;">\
                    // <td>高级</td>\
                    // <td>1.5</td>\
                    // <td></td>\
                    // <td></td>\
                    // <td></td>\
                // </tr>\
                // <tr style="height:50px;">\
                    // <td>高级以上</td>\
                    // <td>2</td>\
                    // <td></td>\
                    // <td></td>\
                    // <td></td>\
                // </tr>\
                // <tr style="height:50px;">\
                    // <td>其他</td>\
                    // <td>2.5</td>\
                    // <td></td>\
                    // <td></td>\
                    // <td></td>\
                // </tr>';
            // $("#show_cont_performance_people").html(html1);
            // html2 = '';
            // for (i = 0;i < 5; i++){
                // html2 += '\
                    // <tr style="height:50px;">\
                        // <td></td>\
                        // <td></td>\
                        // <td></td>\
                        // <td></td>\
                    // </tr>'; 
            // }
            // $("#show_cont_performance_work").html(html2);
        }
    },function(err){
        console.log(err);
    });
}
//清空项目绩效页面原有的数据
function empty_cont_personnel_html1(){
    $("select[name='projectname8'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname8'] option").eq(0).siblings().removeAttr('selected');
    $("#projectname_write8").attr("value", '');
    $("#projectname_write8").prop("value", '');
    $("select[name='cont8'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont8'] option").eq(0).siblings().removeAttr('selected');
    $("#cont_write8").attr("value",'');
    $("#cont_write8").prop("value",'');
    $("select[name='dutyname8'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname8'] option").eq(0).siblings().removeAttr('selected');
    $("#search_personnel_input_data").html('');
    
}
function empty_cont_personnel_html2(){
    var html1 = '';
    html1 = '\
        <tr style="height:50px;">\
            <td>初级</td>\
            <td>0.7</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>中级</td>\
            <td>1</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>高级</td>\
            <td>1.5</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>高级以上</td>\
            <td>2</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>其他</td>\
            <td>2.5</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>';
    $("#show_cont_performance_people").html(html1);
    var html2 = '';
    html2 = '\
        <tr style="height:50px;">\
            <td>初级</td>\
            <td>0.7</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>中级</td>\
            <td>1</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>高级</td>\
            <td>1.5</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>高级以上</td>\
            <td>2</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>\
        <tr style="height:50px;">\
            <td>其他</td>\
            <td>2.5</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
        </tr>';
    $("#show_cont_performance_people1").html(html2);
    html3 = '';
    for (i = 0;i < 9; i++){
        html3 += '\
            <tr style="height:50px;">\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
            </tr>'; 
    }
    $("#show_cont_performance_work").html(html3);
}
//填充下拉框
function Filling_cont_proj_duty(str){
    if (dataset.length) {
        var html1 = '<option value="">请选择</option>';
        var html2 = '<option value="">请选择</option>';
        var html3 = '<option value="">请选择</option>';
        var val1 = [];
        $.each(dataset, function (i, v) {
            val1.push(v.dutyname);
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        })
        var val11 = unique(val1);
        $.each(val11, function (i, v) {
            html3 += '<option value="' + v + '">' + v + '</option>';
        });
        $("#cont"+str).html(html1);
        $("#projectname"+str).html(html2);
        $("#dutyname"+str).html(html3);
    }
}
//选择项目负责人，匹配填充项目名称合同号的下拉框
function change_dutyname(str1){
    $("select[name='projectname"+str1+"'] option").eq(0).attr('selected', 'selected');
    $("#projectname_write"+str1+"").attr("value", '');
    $("#projectname_write"+str1+"").prop("value", '');
    $("select[name='projectname"+str1+"'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='cont"+str1+"'] option").eq(0).attr('selected', 'selected');
    $("#cont_write"+str1+"").attr("value",'');
    $("#cont_write"+str1+"").prop("value",'');
    $("select[name='cont"+str1+"'] option").eq(0).siblings().removeAttr('selected');
    var dutyname = $("select[name='dutyname"+str1+"'] option:selected").val();
    var html1 = '<option value="">请选择</option>';
    var html2 = '<option value="">请选择</option>';
    if(dutyname!=''){
        var data = {
        "cont": '',
        "projectname": '',
        "starttime":"",
        "endtime":"",
        "type":"",
        "state": "",
        "caigou": "",
        // "shishi": "",
        "clientname":"",
        "dutyname": dutyname,
        "salename":"",
        }
        one_duty_prj = select_before(dataset,data);//按dutyname条件筛选
        $.each(one_duty_prj,function(i,v){
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        })
        $("#cont"+str1+"").html(html1);
        $("#projectname"+str1+"").html(html2);
    }else{
        Filling_cont_proj_duty(str1);
    }
}
//显示每周提交情况
function show_work_count(){
    postRequest('/show_work_count/',{
        
    },function(data){
        // console.log(data);
        if(data.result==1||data.result=='1'){
            var html = '';
            var date = '';
            var a = -2;
            $.each(data.data, function (i, v) {
                if((v.checkdate).slice(0,16).replace('T',' ')!=date){
                    //两个判断是在前一个日期结束后才有可能执行的
                    if (0 != a%2){
                        html += '<td height="30"></td><td></td></tr>';
                    }
                    if (0 == a){
                        html += '<tr ><th colspan=4 style="color:#33CC00;" height="30">上周提交情况正常</th></tr>';
                    }
                    date1 = (v.checkdate).slice(0,16).replace('T',' ');
                    html += '<tr ><th height="30" colspan=4>' + date1 + '（上周日报提交情况）</th></tr>';
                    html += '<tr ><th height="30">姓名</th><th height="30">未提交日报的日期</th><th height="30">姓名</th><th height="30">未提交日报的日期</th>';
                    date = date1;
                    a = 0;
                }
                if (v.checkresult != '正常提交'){
                    a += 1;
                    if ( 0 == a%2){
                        html += '<td height="30">' + v.real_name + '</td>\
                            <td height="30">' + v.checkresult + '</td></tr>';
                    }else{
                        html+='<tr><td height="30">' + v.real_name + '</td>\
                            <td height="30">' + v.checkresult + '</td>';
                    }
                }
            });
            $("#display_work_count").html(html);
        }
    },function(err){
        console.log(err);
    })
}
//显示每月提交情况
function show_work_count_month(){
    postRequest('/show_work_count_month/',{
        
    },function(data){
        // console.log(data);
        if(data.result==1||data.result=='1'){
            var html = '';
            var date = '';
            a = -2
            $.each(data.data, function (i, v) {
                if((v.checkdate).slice(0,16).replace('T',' ')!=date){
                    if (0 == a){
                        html += '<tr ><th colspan=4 style="color:#33CC00;" height="30">上月提交情况正常</th></tr>';
                    }
                    date1 = (v.checkdate).slice(0,16).replace('T',' ');
                    html += '<tr ><th height="30" colspan=4>' + date1 + '（上个月日报提交情况）</th></tr>';
                    html += '<tr ><th height="30">姓名</th><th height="30">未提交日报的日期</th></tr>';
                    date = date1;
                    a = 0
                }
                if (v.checkresult != '正常提交'){
                    a += 1
                    html += '<tr ><td height="30">' + v.real_name + '</td><td height="30">' + v.checkresult + '</td></tr>';
                } else {
                    return true
                }
            });
            $("#display_work_count1").html(html);
        }
    },function(err){
        console.log(err);
    })
}
//提交情况页面点击每周情况
function display_everyweek_result(){
    $(".check_everyweek_result_div").show();
    $(".check_everymonth_result_div").hide();
    $('#result_span1').addClass('libg');
    $('#result_span2').removeClass('libg');
}
//提交情况页面点击每月情况
function display_everymonth_result(){
    $(".check_everyweek_result_div").hide();
    $(".check_everymonth_result_div").show();
    $('#result_span1').removeClass('libg');
    $('#result_span2').addClass('libg');
}
//项目绩效页面的项目绩效
function project_per_span_click(){
    $(".pro_per_span1").addClass("libg");
    $(".pro_per_span2").removeClass("libg");
    // $(".pro_per_span3").removeClass("libg");
    $(".project_performance_div").show();
    $(".personal_performance_div").hide();
    // $(".pro_per_span1").css('font-size','');
    // $(".pro_per_span2").css('font-size','6px');
}
//项目绩效页面的人员绩效
function personsal_per_span_click(){
    $(".pro_per_span1").removeClass("libg");
    $(".pro_per_span2").addClass("libg");
    // $(".pro_per_span3").removeClass("libg");
    $(".project_performance_div").hide();
    $(".personal_performance_div").show();
    // $(".pro_per_span1").css('font-size','6px');
    // $(".pro_per_span2").css('font-size','');

    Filling_cont_proj_duty('81');
}
//项目绩效页面的项目执行情况
// function project_imp_span_click(){
    // $(".pro_per_span1").removeClass("libg");
    // $(".pro_per_span2").removeClass("libg");
    // $(".pro_per_span3").addClass("libg");
    // $(".project_performance_div").hide();
    // $(".personal_performance_div").show();
    // // disabled="disabled"
    // // style="background-color:rgba(127,127,127,0.1)"
    
// }
//点击“人员绩效”时清空页面数据
function empty_per_per_data(){
    $("select[name='projectname81'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname81'] option").eq(0).siblings().removeAttr('selected');
    $("#projectname_write81").attr("value", '');
    $("#projectname_write81").prop("value", '');
    $("select[name='cont81'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont81'] option").eq(0).siblings().removeAttr('selected');
    $("#cont_write81").attr("value",'');
    $("#cont_write81").prop("value",'');
    $("select[name='staffname8'] option").eq(0).attr('selected', 'selected');
    $("select[name='staffname8'] option").eq(0).siblings().removeAttr('selected');
    //填充年份下拉框
    html = '<option value="">请选择</option>'
    var myDate = new Date();
    y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    m = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    year = y.toString();
    if (0<=m&&m<=8) {
        month = "0" + (m+1).toString();
    }else{
        month = (m+1).toString();
    }
    for (a=0;a<10;a++){
        yy = year - 9 + a
        html += '<option value="' + yy +'">' + yy + '</option>'
    }
    $("#choice_Year").html(html);
    //默认选中当前年月
    $("select[name='choice_Year'] option").each(function () {
        $(this).prop('selected', false);
        $(this).attr('selected', false);
        if ($(this).val() == year) {
            $(this).prop('selected', 'selected');
            $(this).attr('selected', 'selected');
        }
    });
    $("select[name='choice_Month'] option").each(function () {
        $(this).prop('selected', false);
        $(this).attr('selected', false);
        if ($(this).val() == month) {
            $(this).prop('selected', 'selected');
            $(this).attr('selected', 'selected');
        }
    });
    empty_per_per_data_c()
}
function empty_per_per_data_c(){
    html1 = '';
    html2 = '';
    html3 = '';
    for (i = 0;i < 9; i++){
        html1 += '\
            <tr style="height:50px;">\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
            </tr>'; 
    }
    for (i = 0;i < 9; i++){
        html2 += '\
            <tr style="height:50px;">\
                <td></td>\
                <td></td>\
                <td></td>\
            </tr>'; 
    }
    for (i = 0; i < 9; i++){
        html3 += '\
            <tr style="height:50px;">\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
                <td></td>\
            </tr>';
    }
    $("#show_cont_performance_people2").html(html1);
    $("#show_cont_performance_work1").html(html2);
    $("#show_Top9project_workitemTop3").html(html3);
}
//查询人员绩效
function query_personal_performance(){
    var username = $("select[name='staffname8'] option:selected").val()||'';
    var year = $("select[name='choice_Year'] option:selected").val()||'';
    var month = $("select[name='choice_Month'] option:selected").val()||'';
    var cont = $("input[name='cont_write81']").val()||'';
    var projectname = $("input[name='projectname_write81']").val()||'';
    // alert(!(year == '') ^ !(month == ''))
    if (username != ''){
        if ( (year == '') == (month == '') ){
        // if ( (!(year == '') ^ !(month == ''))){
            if( ( year == '' || month == '' ) && ( cont == '' || projectname == '' ) ){
                myalert('系统提示框','时间和合同二者至少选一个！');
            } else {
                var data = {'username':username,'year':year,'month':month,'cont':cont,'projectname':projectname}
                postRequest('/query_per_per/',{
                    'data': JSON.stringify(data)
                },function(data){
                    if (data.result == 1 || data.result == '1'){
                        $("#engineering_number_Top9").html(data.data.header+'工程量投入情况（Top9）')
                        d = data.data.dataone;
                        if (d.length){
                            var html1 = '';
                            for (i = 0;i < 9; i++){
                                if (i < d.length  ){
                                    var ratio = String( Math.floor(d[i].workload / data.data.total_workload * 100))+'%';
                                    html1 += '\
                                        <tr style="height:50px;">\
                                            <td>'+d[i].worktype+'</td>\
                                            <td>'+d[i].workitem+'</td>\
                                            <td>'+d[i].workload+'</td>\
                                            <td>'+ratio+'</td>\
                                        </tr>';
                                } else {
                                    html1 += '\
                                        <tr style="height:50px;">\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                            <td></td>\
                                        </tr>';
                                }
                            }
                            $("#show_cont_performance_people2").html(html1);
                        } else{
                            for(i = 0;i < 9; i++){
                                html1 += '\
                                    <tr style="height:50px;">\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                    </tr>';
                            }
                            $("#show_cont_performance_people2").html(html1);
                        }
                        q = data.data.cont_top9;
                        var html3 = '';
                        if(q.length){
                            $.each(q, function (i, v) {
                                if(i%2!=0){
                                    html3 += '<tr style="height:50px;background:#F3F3F3">'
                                    html3 += '<td style="text-align: left;">'+data.data.cont_top9[i].projectname+'</td>'
                                    if (v.workload_input2.length<3){
                                         // style = "background:#F3F3F3"
                                        for (var x = 0; x < v.workload_input2.length; x++){
                                            html3 += '<td>'+(v.workload_input2)[x].workitem+'</td>'
                                            html3 += '<td>'+String( Math.floor(((v.workload_input2)[x].workload)/(data.data.cont_top9[i].ont_cont_total_workload)*100))+'%</td>'
                                        }
                                        for (y = v.workload_input2.length+1; y <= 3;y++){
                                            html3 += '<td></td>'
                                            html3 += '<td></td>'
                                        }
                                    }else{
                                        for (var x = 0; x < 3; x++){
                                            html3 += '<td>'+(v.workload_input2)[x].workitem+'</td>'
                                            html3 += '<td>'+String( Math.floor(((v.workload_input2)[x].workload)/(data.data.cont_top9[i].ont_cont_total_workload)*100))+'%</td>'
                                        }
                                    }
                                }else{
                                    html3 += '<tr style="height:50px;">'
                                    html3 += '<td style="text-align: left;">'+data.data.cont_top9[i].projectname+'</td>'
                                    if (v.workload_input2.length<3){
                                         style = "background:#F3F3F3"
                                        for (var x = 0; x < v.workload_input2.length; x++){
                                            html3 += '<td>'+(v.workload_input2)[x].workitem+'</td>'
                                            html3 += '<td>'+String( Math.floor(((v.workload_input2)[x].workload)/(data.data.cont_top9[i].ont_cont_total_workload)*100))+'%</td>'
                                        }
                                        for (y = v.workload_input2.length+1; y <= 3;y++){
                                            html3 += '<td></td>'
                                            html3 += '<td></td>'
                                        }
                                    }else{
                                        for (var x = 0; x < 3; x++){
                                            html3 += '<td>'+(v.workload_input2)[x].workitem+'</td>'
                                            html3 += '<td>'+String( Math.floor(((v.workload_input2)[x].workload)/(data.data.cont_top9[i].ont_cont_total_workload)*100))+'%</td>'
                                        }
                                    }
                                }
                                    
                                    
                                html3 += '</tr>';
                            });
                            for (z = q.length+1; z <= 9; z++){
                                html3 += '\
                                    <tr style="height:50px;">\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                    </tr>';
                            }
                            $("#show_Top9project_workitemTop3").html(html3); 
                        }else{
                            for (i = 0; i < 9; i++){
                                html3 += '\
                                    <tr style="height:50px;">\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                    </tr>';
                            }
                            $("#show_Top9project_workitemTop3").html(html3); 
                        }
                        if(data.data.type == 1 || data.data.type == 2){
                            b = data.data.datatwo
                            if (b.length){
                                var html2 = ''
                                for ( j =0 ; j < 9 ; j++ ){
                                    if(j < b.length){
                                        var ratio = String( Math.floor(b[j].workload / data.data.total_workload * 100))+'%';
                                        html2 += '\
                                            <tr style="height:50px;">\
                                                <td style="text-align: left;">'+b[j].projectname+'</td>\
                                                <td>'+b[j].workload+'</td>\
                                                <td>'+ratio+'</td>\
                                            </tr>';
                                    }else{
                                        html2 += '\
                                            <tr style="height:50px;">\
                                                <td></td>\
                                                <td></td>\
                                                <td></td>\
                                            </tr>';
                                    }
                                }
                                $("#show_cont_performance_work1").html(html2);
                            }else{
                            
                            }
                        }else{
                            for (i = 0;i < 9; i++){
                                html2 += '\
                                    <tr style="height:50px;">\
                                        <td></td>\
                                        <td></td>\
                                        <td></td>\
                                    </tr>'; 
                            }
                            $("#show_cont_performance_work1").html(html2);
                        }
                    } else if(data.result==2||data.result=='2'){
                        // myalert('系统提示框','无数据！');
                        $("#engineering_number_Top9").html(data.data.header+'工程量投入情况（Top9）')
                        empty_per_per_data_c();
                    }else{
                        myalert('系统提示框','查询失败！');
                        empty_per_per_data_c();
                    }
                },function(err){
                    alert(err);
                });
            }
        }else{
            myalert('系统提示框','年份和月份不能只选一个！');
        }
    }else{
        myalert('系统提示框','人员姓名为必选项！');
    }
}
//select的option显示全部内容
/*
    当鼠标悬停到<select>时，创建一个这个下拉列表的副本，同时把焦点移到这个副本上，把副本的样式设成绝对定位，而且盖在原来的下拉列表上，宽度根据option的显示内容自动拉伸，当这个副本失去焦点，或者用户对它进行了选择操作后，获取副本的selectedIndex，赋给原来的select对象。
*/
function FixWidth(selectObj){
    var newSelectObj = document.createElement("select");
    newSelectObj = selectObj.cloneNode(true);
    newSelectObj.setAttribute("ID", "aa");
    newSelectObj.setAttribute("NAME", "bb");
    newSelectObj.setAttribute("onchange", "");
    newSelectObj.selectedIndex = selectObj.selectedIndex;
    newSelectObj.onmouseenter = null;
    var e = selectObj;
    var absTop = e.offsetTop;
    var absLeft = e.offsetLeft;
    var width = e.offsetWidth;//select宽度
    while(e = e.offsetParent){
        absTop += e.offsetTop;
        absLeft += e.offsetLeft;
    }
    //给新的select添加样式
    with (newSelectObj.style){
        position = "absolute";
        top = absTop + "px";
        left = absLeft + "px";
        width = "auto";
        padding = "6px 6px";
        // min-width = width + "px";
    }
    newSelectObj.style.minWidth= width + "px";

    var rollback = function(){ RollbackWidth(selectObj, newSelectObj); };//失去焦点或者移出元素时执行，移除克隆的select
    var rollback1 = function(){ RollbackWidth1(selectObj, newSelectObj); };//选项改变时执行，移除克隆的select、隐藏原来的select
    newSelectObj.onmouseleave = rollback;
    newSelectObj.focus();
    newSelectObj.onfocus = function(){ newSelectObj.onmouseout=null; };
    newSelectObj.onchange = rollback1;
    newSelectObj.onblur = rollback;
    selectObj.style.visibility = "hidden";
    document.body.appendChild(newSelectObj);

    }
function RollbackWidth(selectObj, newSelectObj){
    selectObj.selectedIndex = newSelectObj.selectedIndex;
    selectObj.style.visibility = "visible";
    document.body.removeChild(newSelectObj);
}
function RollbackWidth1(selectObj, newSelectObj){
    selectObj.selectedIndex = newSelectObj.selectedIndex;
    // selectObj.style.visibility = "visible";
    selectObj.style.display = "none";
    //执行原select中的onchange
    if (selectObj.fireEvent){
        selectObj.fireEvent('onchange');
    }
    else{
        selectObj.onchange();
    }
    document.body.removeChild(newSelectObj);
}
//上传共享文档
var ajax_state = null;
function softBatchUpload(){
    var cont_input = document.getElementById("softBatchDownload_input");
    var file = new FormData();
    $("#softBatchDownload_input").unbind('change').change(function(event){
        var files = cont_input.files;
        var sizelist = [];
        var namelist = [];
        var sharename = $("#headername").html();
        for (var i = 0; i < files.length; i++){
            // file.append('file',files[i]);
            namelist.push(files[i].name);
        }
        ajax_state = 
        postRequest('/check_upload_filename_same/', {
            "data": JSON.stringify({'namelist':namelist})
        }, function (data2) {
            //将不重复的文件放到FormData()对象file中
            for (var i = 0; i < files.length; i++){
                var flag = true;
                for (var j =0; j < data2.data.length; j++){
                    if (files[i].name == data2.data[j]){
                        flag = false;
                        break;
                    } else {
                        continue;
                    }
                }
                if (flag){
                    file.append('file',files[i]);
                } else {
                    continue;
                }
            }
            if (file.entries().next().value){
                html = '<!-- 进度条外壳 -->\
                <div>\
                    <div style="float:left;">\
                        <div class="file_outer" style="width:400px;height:30px;border: 1px solid #000;box-sizing: border-box;">\
                            <!-- 进度条 -->\
                            <div class="file_inner" style="width:0px;height:28px;background-color: yellowgreen;"></div>\
                        </div>\
                    </div>\
                    <div style="float:left;">\
                        &nbsp;&nbsp;&nbsp;&nbsp;<span class="upload_file_percent" style="height:30px;line-height:30px;">0%</span>\
                    </div>\
                </div>';
                myalert('上传文件',html);
                //隐藏确定按钮
                $("#mb_btn_ok").css('display','none');
                //增加取消按钮
                var html_cancel = '<input id="mb_btn_cancel" type="button" value="取消上传" style="width: 85px; height: 30px; color: white; border: none; background-color: rgb(22, 139, 187);" onclick="cancel_file_upload()">'
                $("#mb_btnbox").html(html_cancel);
                $("#mb_ico").css('display','none');
                $.ajax({
                    url: "/upload_file_soft/",
                    type:"POST",
                    data: file,
                    processData:false,
                    contentType:false,
                    enctype: 'multipart/form-data',
                    xhr: function () {
                        //获取ajax中的ajaxSettings的xhr对象  为他的upload属性绑定progress事件的处理函数
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) {
                            //检查其属性upload是否存在
                            myXhr.upload.addEventListener("progress", function (e) {
                                if (e.lengthComputable) {
                                    var percent = e.loaded / e.total * 100;
                                    $(".file_inner").width((e.loaded / e.total) * 398);
                                    var str = Math.floor(percent.toFixed(2));
                                    $(".upload_file_percent").html(str+'%');
                                }
                            }, false);  
                        }
                        return myXhr;
                    },
                    success: function(data){
                        if(data.result == '1' || data.result == 1){
                            //关闭提示弹窗
                            $.alerts._hide();
                            if (data.name.length != 0 ){
                                if (data2.data.length != 0){
                                    var t = '<p style="font-weight:bold;">已存在相同的文件：</p>'
                                    for (var l =0; l < data2.data.length; l++){
                                        t += '<p style="margin:5px 25px;"> '+data2.data[l]+'</p>'
                                    }
                                    myalert('系统提示框',t);
                                }
                            }else{
                                myalert('系统提示框','无文件上传成功');
                            }
                           //计算文件大小
                            if(data.name.length > 0){
                                for (var i = 0; i < data.name.length; i++){
                                    for (var j = 0; j < files.length; j++){
                                        if (data.name[i] == files[j].name){
                                            byteSize = files[j].size;
                                            s = Math.ceil(byteSize / 1024);//KB
                                            if (s > 999 && s <= (999*1024)){
                                                s = Math.ceil((s / 1024)*100)/100;//MB
                                                size1 = String(s)+'MB'
                                            }
                                            else if(s > (999*1024)){
                                                s = Math.ceil((s / 1024 / 1024)*100)/100; //GB
                                                size1 = String(s)+'GB'
                                            }else{
                                                size1 = String(s)+'KB'
                                            }
                                            tmp={'filename':files[j].name,'filesize':size1}
                                            sizelist.push(tmp);
                                            break;
                                        }else{
                                            continue;
                                        }
                                    }
                                }
                                postRequest('/upload_file_soft_wdb/', {
                                    "data": JSON.stringify({'sharename':sharename,'file_Size':sizelist})
                                }, function (data1) {
                                    if (data1.result == 1 || data1.result == '1') {
                                        //清除上传文件框的内容，避免下一次上传文件时点击取消，改变了value值而执行onchange函数
                                        $("#softBatchDownload_input").val('');
                                        // myalert('系统提示框','修改成功');
                                        //关闭提示弹窗
                                        // $.alerts._hide();
                                        //重新加载page板块
                                        produce_page()
                                        //显示第一页
                                        show_5_active(1)
                                        // //显示尾页，问题：翻页栏无法定位到尾页，但显示的是尾页
                                        // show_last_page()
                                    } else {
                                        console.log('记录写入数据库失败');
                                        // myalert('系统提示框','添加失败');
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                            }
                        }else{
                            myalert('系统提示框','上传文件失败');
                        }
                        
                    }
                });
            } else {
                var t = '<p style="font-weight:bold;">已存在相同的文件：</p>'
                for (var j =0; j < data2.data.length; j++){
                    t += '<p style="margin:5px 25px;"> '+data2.data[j]+'</p>'
                }
                myalert('系统提示框',t);
            }
        },function (err) {
            console.log(err);
        });
        
    });
}
//取消上传
function cancel_file_upload(){
    if(ajax_state) {ajax_state.abort();ajax_state=null;}  
    $.alerts._hide();
}
//查询共享文件列表Share_file//未使用
function select_share_file(){
    var keyword = $("input[name='searchfile_input']").val()||'';
    postRequest('/select_share_file/',{
        "data": JSON.stringify({'keyword':keyword})
    },function(data){
        // console.log(data);
        if(data.result == 1 || data.result == '1' ){
            dispaly_share_file(data.data)
        }
        $('#checkSoft').prop('checked',false);
        // $("input[name='searchfile_input']").val('');
    },function(err){
        console.log(err);
    });
}
//展示共享文件列表//未使用
function dispaly_share_file(data){
    html = ''
    if(data.length){
        // if(data.length < 20)
        $.each(data, function (i, v) {
            html += '\
            <tr class="_sharefile_hover_tr">\
                <td style="padding-right:0px;border:0px;" >\
                    <input type="checkbox" style="margin:5px 8px 0px 0px;" name="file_checkbox" id=\"'+v.id+'\" value=\"'+v.id+'\">\
                </td>\
                <td style="padding-left:0px;border:0px;text-align:left;" >\
                    '+v.filename+'\
                </td>\
                <td style="border:0px;text-align:center;">'+v.sharename+'</td>\
                <td style="border:0px;text-align:center;">'+v.filesize+'</td>\
                <td style="border:0px;text-align:center;">'+(v.sharedate).slice(0,10)+'</td>\
                <td style="border:0px;text-align:center;">'+v.downloadcounte+'</td>\
                <td style="border:0px;text-align:center;color:#0066FF;">\
                    <a title="文件下载" href="javascript:void(0);" onclick="downloadPortal([\''+v.id+'\']);return false;">\
                    <i class="fa fa-arrow-down" style="color:#0066FF;"></i> \
                </td>\
            </tr>';
        });
    }
    $(show_share_file).html(html);
}
//单个下载共享文件,数据库记录下载次数加1
function downloadPortal(list){
    // 获取当前页数
    var all_active = $(".active");
    var current_page = 1;
    $.each(all_active,function(i,v){
        if($(v).attr("style").indexOf("#ccc")>1|| $(v).attr("style").indexOf("rgb(204, 204, 204)")>1){
            current_page = i+1
            return false;
        }else{
            return true;
        }
    });
    //
    postRequest('/download_share_file/', {
        "data": JSON.stringify({'list':list})
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            $.each(data.data.filename,function(i,v){
                url = data.data.url_b+v;
                //txt pdf等会自动打开
                // var  tempelm  =  document.createElement("iframe");
                // tempelm.src  = url;
                // tempelm.style.display  =  "none";
                // document.body.appendChild(tempelm);

                let down = document.createElement('a');
                down.href = url;
                down.download = '';// 默认为文件的名字
                document.body.appendChild(down);
                down.click();
                down.remove();
            });
            paging_query_file(current_page);
            // show_5_active(1);
        }
    }, function (err) {
        console.log(err);
    })
}
//全选和反选共享文件前面的复选框
function choice_filelist_checkbox(obj){
    $('input[name="file_checkbox"]').each(function(){
        $(this).prop('checked',(!($(this).parent().parent().attr('style'))&&$(obj).is(':checked'))?true:false);
    });
}
//批量下载共享文件入口
function softBatchDownload(){
    var file_list =[];//定义一个数组
    $('input[name="file_checkbox"]:checked').each(function(){//遍历每名字为file_checkbox并且已被选中的复选框
        file_list.push($(this).val());//将选中的值添加到数组file_list中
    });
    if (file_list ==""||file_list==null){
        myalert('系统提示框',"没有数据被选中")
    } else {
        downloadPortal(file_list)
    }
}

//生成page栏
function produce_page(){
    $("#paging").html('');
    var keyword = $("input[name='searchfile_input']").val()||'';
    postRequest('/produce_page/',{
        "data": JSON.stringify({'keyword':keyword})
    },function(data){
        html1 = ''
        // console.log(data);
        if (data.result == 1 || data.result == '1'){
            if  (data.page_num > 1){
                //生成翻页
                html1 += '<div id="paging_file" style="float:;width:auto;overflow:hidden;font-size: 14px;text-align: -webkit-center;">'
                html1 += '<ul class="pagination" style="overflow:hidden; width:auto; min-width:113px;width: -moz-fit-content; width: fit-content;">'
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_5_active(1,6)"><a>首页</a></li>'
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_previous_page(6)"><a>上一页</a></li>'
                for (var i =1; i <= data.page_num; i++){
                    if (1 == i){
                        html1 += '<li class="active" style="display:inline;background:#ccc" onclick="show_5_active(1,6)"><a><span>1</span></a></li>'
                    }else if(i<=5){
                        html1 += '<li class="active" style="display:inline" onclick="show_5_active('+i+',6)"><a><span>'+i+'</span></a></li>'
                    }else{
                        html1 += '<li class="active" style="" onclick="show_5_active('+i+',6)"><a><span>'+i+'</span></a></li>'
                    }
                }
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_next_page(6)"><a>下一页</a></li>'
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_last_page(6)"><a>尾页</a></li>'
                
                html1 += '<li class="" style="margin-left:10px;"><input id ="input_page" placeholder="1" style="border:0;width:50px;line-height:30px;text-align:center"/></li>'
                html1 += '<li class="next" style="margin-left:10px;" onclick="jump_that_page(6)"><a>跳转</a></li>'
                
                html1 += '<li class="next" style="border:0px;width:auto;margin-left:10px;"><a>共<span id="page_lhb_total">&nbsp;'+data.page_num+'&nbsp;</span>页&nbsp;&nbsp;&nbsp;&nbsp;共<span id="count_lhb_total">&nbsp;'+data.count+'&nbsp;</span>条数据</a></li>'
                html1 += '</ul>'
                html1 += '</div>'
                $("#padding_lhb").html(html1)
            }else{
            $("#padding_lhb").html(html1)
            }
        }else{
            $("#padding_lhb").html(html1)
        }
    },function(err){
        console.log(err);
    });
}
//分页展示文件共享
function paging_query_file(i){
    console.log('第'+i+'页');
    //清空全选或全部选的选择框
    $('#checkSoft').prop('checked',false);
    //获取搜素框的值，为空时值也为空
    var keyword = $("input[name='searchfile_input']").val()||'';
    //根据当前页数数码和搜索框的值，查询出对应的记录，并显示
    postRequest('/paging_query_file/',{
        "data": JSON.stringify({'i':i,'keyword':keyword})
    },function(data){
        // console.log(data);
        if(data.result == 1 || data.result == '1' ){
            html = '';
            if (data.data.data.length){
                $.each(data.data.data, function(i,v){
                    //当前页面数据写入
                    html += '\
                    <tr class="_sharefile_hover_tr">\
                        <td style="padding-right:0px;border:0px;" >\
                            <input type="checkbox" style="margin:5px 8px 0px 0px;" name="file_checkbox" id=\"'+v.id+'\" value=\"'+v.id+'\">\
                        </td>\
                        <td style="padding-left:0px;border:0px;text-align:left;" >\
                            '+v.filename+'\
                        </td>\
                        <td style="border:0px;text-align:center;">'+v.sharename+'</td>\
                        <td style="border:0px;text-align:center;">'+v.filesize+'</td>\
                        <td style="border:0px;text-align:center;">'+(v.sharedate).slice(0,10)+'</td>\
                        <td style="border:0px;text-align:center;">'+v.downloadcounte+'</td>\
                        <td style="border:0px;text-align:center;color:#0066FF;">\
                            <a title="文件下载" href="javascript:void(0);" onclick="downloadPortal([\''+v.id+'\']);return false;">\
                            <i class="fa fa-arrow-down" style="color:#0066FF;"></i> \
                        </td>\
                    </tr>';
                });
            }else{
                html = '<tr><td>没有搜索到相关内容</td></tr>';
            }
            $("#show_share_file").html(html);
        }else if(data.result == 2 || data.result == '2'){
            $("#show_share_file").html('<tr><td colspan="7">没有搜索到相关内容</td></tr>');
        }
    },function(err){
        console.log(err);
    });
}
 
//测试用休眠函数，用法：sleep(5000)，休眠5秒
function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}
//滚动条展示五个数字按钮
function show_5_active(i,x,str){
    var all_active = $(".active");
    var l = 0;
    if (all_active[0] != undefined){
        $(all_active[i-1]).siblings('.active').css('background','#fff');
        $(all_active[i-1]).css('background','#ccc');
        l = all_active.length;
    }
    console.log("第"+i+"页");
    console.log("共"+l+"页");
    if (l > 5){
        $(all_active[i-1]).siblings('.active').css('display','none');
        if (i > 2 && i < l-1){
            for (var j = i-3; j < i+2; j++){
                $(all_active[j]).css('display','inline');
            }
        }else if(i <= 2){
            for (var j = 0; j < 5; j++){
                $(all_active[j]).css('display','inline');
            }
        }else{
            for (var j = l; j > l-6; j--){
                $(all_active[j]).css('display','inline');
            }
        }
    }
    if (6 == x){
        paging_query_file(i);
    }else if(2 == x){
        if (str == 'select'){
            showAll_query(i,'select')
        }else{
            showAll_query(i)
        }
        
    }
    // console.log($(all_active[i-1]).html());
    // console.log($(all_active[i-1]).attr("style"));
}
//上一页
function show_previous_page(j,str){
    var all_active = $(".active");
    $.each(all_active,function(i,v){
        if($(v).attr("style").indexOf("#ccc")>1|| $(v).attr("style").indexOf("rgb(204, 204, 204)")>1){
            // 判断页码是否小于页码范围值
            if (i<=1){
                if (str == 'select'){
                    show_5_active(1,j,str);
                }else{
                    show_5_active(1,j);
                }
                
            }else{
                if (str == 'select'){
                    show_5_active(1,j,str);
                }else{
                    show_5_active(1,j);
                }
            }

            return false;
        }else{
            return true;
        }
    });
}
//下一页
function show_next_page(j,str){
    var all_active = $(".active");
    $.each(all_active,function(i,v){
        if($(v).attr("style").indexOf("#ccc")>1|| $(v).attr("style").indexOf("rgb(204, 204, 204)")>1){
            // 判断页码是否存在
            if (i+2 >= all_active.length){
                // show_5_active(all_active.length,j);
                if (str == 'select'){
                    show_5_active(all_active.length,j,str);
                }else{
                    show_5_active(all_active.length,j);
                }
            }else{
                // show_5_active(i+2,j);
                if (str == 'select'){
                    show_5_active(i+2,j,str);
                }else{
                    show_5_active(i+2,j);
                }
            }
            return false;
        }else{
            return true;
        }
    });
}
//尾页
function show_last_page(j,str){
    var all_active_l = $(".active").length;
    if (all_active_l==0){//只有一页
        // show_5_active(1,j);
        if (str == 'select'){
            show_5_active(1,j,str);
        }else{
            show_5_active(1,j);
        }
    }else{
        // show_5_active(all_active_l,j);
        if (str == 'select'){
            show_5_active(all_active_l,j,str);
        }else{
            show_5_active(all_active_l,j);
        }
    }
}
//跳转到指定页
function jump_that_page(j,str){
    var that = Number($("#input_page").val()) || 1;
    console.log(that);
    var all_active_l = $(".active").length;
    if (1 <= that && that <= all_active_l){
        // show_5_active(that,j);
        if (str == 'select'){
            show_5_active(that,j,str);
        }else{
            show_5_active(that,j);
        }
        $("#input_page").val(that);
    }else if(that > all_active_l){
        // show_5_active(all_active_l,j);
        if (str == 'select'){
            show_5_active(all_active_l,j,str);
        }else{
            show_5_active(all_active_l,j);
        }
        $("#input_page").val(all_active_l);
    }else{
        // show_5_active(1,j);
        if (str == 'select'){
            show_5_active(1,j,str);
        }else{
            show_5_active(1,j);
        }
    }
}
function get_update_tishi(){
    postRequest('/get_update_tishi/',{
       
    },function(data){
        if(data.result==1||data.result=='1'){
            $("#update_tishi_font").html(data.data);
            var style = document.styleSheets[0];
            var w = $("#update_tishi_font").width();
            try{
                //从右边滚动，到update_tishi_font长度结束
                var h = style.insertRule("@keyframes marquee { from {text-indent: 100%;} to { text-indent:-"+w+"px;} }",0);
            }catch(exception){
                console.log("name属性-->"+exception.name);//name属性-->TypeError
                console.log("message属性-->"+exception.message);//message属性-->str.charat is not a function
            }
        }else{
            $("#update_tishi_font").html('未找到');
        }
    },function(err){
        console.log(err);
    });
}
document.onclick=function(){
    $("#cont").hide();
    $("#cont1").hide();
    $("#cont3").hide();
    $("#cont4").hide();
    $("#cont5").hide();
    $("#cont6").hide();
    $("#cont8").hide();
    $("#cont81").hide();
    $("#projectname").hide();
    $("#projectname1").hide();
    $("#projectname3").hide();
    $("#projectname4").hide();
    $("#projectname5").hide();
    $("#projectname6").hide();
    $("#projectname8").hide();
    $("#projectname81").hide();
    $(".perMg3").hide();
    if($("#project_daily").hasClass('libg')||$("#project_performance").hasClass('libg')){
        $("#dataMg").addClass('libg');
    }else{$("#dataMg").removeClass('libg');}
}







