var stime = '';
var etime = '';
var dataset = {}; // 获取下拉框的数据
var dataset1 = {}; // 排序后的所有项目信息
var memberset = {};
var clientset={};
var workdetailset = {};
var worktypeset= {};//工作类型下框的数据
var equipmentset= {};//设备品牌、类型、型号的数据
var user_eng=[];//工程师用户数据
var select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};//筛选的条件
$(document).ready(function () {
    console.log($.cookie("username"));
    if ($.cookie("username") == undefined || $.cookie("username") == 'null') {
        window.location.href = '/';
    　　} else {
        $("#headername").html($.cookie("username"));
    }
    $("#dataMg").addClass('libg');
    $("#project_daily").addClass('libg');
    //悬浮出现另一个选项
    $('.datatrack').hover(function(){
        $('.perMg2').show();
    },function(){
        $('.perMg2').hide();
    })
    //点返回清除筛选条件
    $('#fanhui_ht').unbind('click').click(function(){
        if( $('.datatrack').attr('id') == 'project_ing'){
            select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '进行中',"caigou":'' ,"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};
        }else{
            select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};
        }
    });
            
    //选择选项
    $('.datatrack1').unbind('click').click(function(){
        var datatrack = $('.datatrack>span').html();
        var datatrack1 = $('.datatrack1>span').html();
        var datatrack_id = $('.datatrack').attr("id");
        var datatrack1_id = $('.datatrack1').attr("id");
        $('.datatrack>span').html(datatrack1);
        $('.datatrack1>span').html(datatrack);
        $('.datatrack').attr("id",datatrack1_id);
        $('.datatrack1').attr("id",datatrack_id);
        
        $('.datatrack').addClass('libg');
        $('.datatrack1').css('color','#fff');   
    });
    
    $('#leftmenu').on('click', 'li', function (e) {
        var evt = e ? e : window.event;
        if (evt.stopPropagation) { //W3C 
            evt.stopPropagation();
        } else {       //IE      
            evt.cancelBubble = true;
        }
        // $("#dataMg").removeClass('libg');
        var index = $(this).index();
        $(this).addClass('libg');
        // $(this).siblings('li').removeClass('libg');
        console.log(index);
        if(index == 0){
            $(".saleBox").show();
            $(".saleBox").siblings().hide();
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            displaySale();
        }
        else if (index == 1) {
            $(".dataTrackBox").show();
            $(".dataTrackBox").siblings().hide();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(this).siblings('li').removeClass('libg');
            if( $('.datatrack').attr('id') == 'project_ing'){
                if($("#wowowo").length>0){
                    $("#wowowowo").get(0).removeChild($("#wowowo").get(0))
                }
                var data = {
                    "cont": '',
                    "projectname": '',
                    "starttime": '',
                    "endtime":'',
                    "type": '',
                    "state": '进行中',
                    "caigou": '',
                    "daohuo": '',
                    // "shishi": '',
                    "clientname": '',
                    "dutyname": '',
                    "salename": '',
                }
                select_ht_data=data;
                displayTrack(data);
            }
            if( $('.datatrack').attr('id') == 'project_all'){
                if($("#wowowo").length==0){
                    $("#wowowowo").prepend('<th height="30" id="wowowo">操作</th>');
                }
                select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};
                displayTrack();
            }
            
        } else if (index == 2) {
            $('.perMg3').show();
            $('.perMg3').unbind('click').on('click', 'ul', function (e) {
                var evt = e ? e : window.event;
                if (evt.stopPropagation) { //W3C 
                    evt.stopPropagation();
                } else {       //IE      
                    evt.cancelBubble = true;
                }
                var index = $(this).index();
                $(this).addClass('libg');
                $(this).siblings('ul').removeClass('libg');
                console.log(index);
                if  (index == 0){
                    $(".dataMgBox").show();
                    $(".dataMgBox").siblings().hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide()
                    if ($("#title_username_tishi").length>0){//移除原来的人员姓名
                        $("#title_project").get(0).removeChild($("#title_username_tishi").get(0))
                    }
                    if ($("#title_contractno").length==0){
                        $("#title_address").after('<th id="title_contractno">合同编号</th>');
                    }
                    if ($("#title_clientname").length==0){
                        $("#title_projectname").after('<th id="title_clientname">客户名称</th>');
                    }
                    if ($("#title_department").length==0){
                        $("#title_dutyname").before('<th id="title_department">所属部门</th>');
                    }
                    if ($("#title_username").length==0){
                        $("#title_workload").before('<th id="title_username">人员姓名</th>');
                    }
                    if ($("#title_salename").length==0){
                        $("#title_worktype").before('<th id="title_salename">销售负责人</th>');
                    }
                    if ($("#pagebox1").length>0){
                        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
                    }
                    if ($("#pagebox2").length>0){
                        $("#paging2").get(0).removeChild($("#pagebox2").get(0));
                    }
                    $("#search_btn1").removeClass("display_none");
                    $('.perMg3').hide();
                    $("#dataMg").siblings().removeClass('libg');
                    // showAll();
                    $("#paging").show();
                    produce_page_for_showAll();//显示翻页
                    showAll_query(1);
                }else{
                    $("#dataMg").siblings().removeClass('libg'); // 所有兄弟节点
                    $(".project_performanceBox").siblings().hide();
                    $(".project_performanceBox").show();
                    $('.perMg3').hide();
                    //清空页面原有的数据
                    empty_cont_personnel_html1();//清空下拉框
                    empty_cont_personnel_html2();//清空两个table
                    Filling_cont_proj_duty('8');
                    //从服务器获取日期，写入”查询日期“
                    postRequest('/get_server_date/',{},function(data){
                        var tmp_data = data.data;
                        $("#search_personnel_input_data").html(tmp_data.slice(0,4)+'年'+tmp_data.slice(4,6)+'月'+tmp_data.slice(6,8)+'日');
                    });
                    empty_per_per_data();//清空人员绩效页面数据
                }
            });
        } else if (index == 3) {
            $(".systemBox").show();
            $(".systemBox").siblings().hide();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(this).siblings('li').removeClass('libg');
            show_work_count(); //显示每周提交情况
            show_work_count_month();//显示每月提交情况
        }else if(index == 4){
            $('.prj_reportBox').show();
            $(".prj_reportBox").siblings().hide();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(this).siblings('li').removeClass('libg');
            display_project_report();
        }else if(index == 5){
            $('.archiveBox').show();
            $(".archiveBox").siblings().hide();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(this).siblings('li').removeClass('libg');
            resetchoose_archive();
            displayArchive();
        }else if(index == 6){
            $(".equipmentBox").show();
            $(".equipmentBox").siblings().hide();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(this).siblings('li').removeClass('libg');
            displayEquipment();
        }else {
            $(this).siblings('li').removeClass('libg');
            $(".data_sharBox").siblings().hide();
            $(".data_sharBox").show();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            produce_page(); //成翻页栏
            paging_query_file(1);//显示第一页
            $("input[name='searchfile_input']").val('');//清空搜索框
        }
    });
    var i18n = { // 本地化
        previousMonth: '上个月',
        nextMonth: '下个月',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
    }
    var datepicker1 = new Pikaday({
        field: jQuery('#datepicker1')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            stime = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker1').val(stime);
            var i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker2 = new Pikaday({
        field: jQuery('#datepicker2')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            etime = this.getMoment().format('YYYY-MM-DD');
            $('#datepicker2').val(etime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker3 = new Pikaday({
        field: jQuery('#datepicker3')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            stime = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker3').val(stime);
            var i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker4 = new Pikaday({
        field: jQuery('#datepicker4')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            etime = this.getMoment().format('YYYY-MM-DD');
            $('#datepicker4').val(etime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker5 = new Pikaday({
        field: jQuery('#datepicker5')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            time = this.getMoment().format('YYYY-MM-DD');
            $('#datepicker5').val(time);
        }
    });
    var datepicker11 = new Pikaday({
        field: jQuery('#datepicker11')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            stime = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker11').val(stime);
            var i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker12 = new Pikaday({
        field: jQuery('#datepicker12')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            etime = this.getMoment().format('YYYY-MM-DD');
            $('#datepicker12').val(etime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    //选择合同编号匹配项目名称
    $("#cont").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    // console.log(v);
                    $("#projectname_write").attr("value", v.projectname);
                    $("#projectname_write").prop("value", v.projectname);
                    $("select[name='projectname'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#projectname_write").attr("value",$(this).val());
                            $("#projectname_write").prop("value",$(this).val());
                        }
                    })
                    $("select[name='clientname'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.clientname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='sell'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.salename) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='department'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.department) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='projectname'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write").attr("value", '');
            $("#projectname_write").prop("value", '');
            $("select[name='projectname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
            $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department'] option").eq(0).attr('selected', 'selected');
            $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //选择项目名匹配合同号
    $("#projectname").change(function () {
        
        var value = $(this).val();
        //console.log(value);
        //console.log(dataset);
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    console.log(v);
                    $("#cont_write").attr("value", v.contractno);
                    $("#cont_write").prop("value", v.contractno);
                    $("select[name='cont'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#cont_write").attr("value",$(this).val());
                            $("#cont_write").prop("value",$(this).val());
                            // document.getElementById("cont_write").value = $(this).val();
                        }
                    })
                    $("select[name='clientname'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.clientname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='sell'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.salename) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='department'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.department) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='cont'] option").eq(0).attr('selected', 'selected');
            $("#cont_write").attr("value", '');
            $("#cont_write").prop("value", '');
            $("select[name='cont'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
            $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department'] option").eq(0).attr('selected', 'selected');
            $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
   //筛选合同时 选择合同编号匹配项目名称
    $("#cont3").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    $("#projectname_write3").attr("value", v.projectname);
                    $("#projectname_write3").prop("value", v.projectname);
                    $("select[name='projectname3'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#projectname_write3").attr("value",$(this).val());
                            $("#projectname_write3").prop("value",$(this).val());
                        }
                })}
            })
        } else {
            $("select[name='projectname3'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write3").attr("value", '');
            $("#projectname_write3").prop("value", '');
            $("select[name='projectname3'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选合同时 选择项目名匹配合同号
    $("#projectname3").change(function () {
        
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    // console.log(v);
                    $("#cont_write3").attr("value", v.contractno);
                    $("#cont_write3").prop("value", v.contractno);
                    $("select[name='cont3'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#cont_write3").attr("value",$(this).val());
                            $("#cont_write3").prop("value",$(this).val());
                            // document.getElementById("cont_write").value = $(this).val();
                        }
                    })
                }
            })
        } else {
            $("select[name='cont3'] option").eq(0).attr('selected', 'selected');
            $("#cont_write3").attr("value", '');
            $("#cont_write3").prop("value", '');
            $("select[name='cont3'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选归档时 选择合同编号匹配项目名称
    $("#cont1").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    $("#projectname_write1").attr("value", v.projectname);
                    $("#projectname_write1").prop("value", v.projectname);
                    $("select[name='projectname1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#projectname_write1").attr("value",$(this).val());
                            $("#projectname_write1").prop("value",$(this).val());
                        }
                })}
            })
        } else {
            $("select[name='projectname1'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write1").attr("value", '');
            $("#projectname_write1").prop("value", '');
            $("select[name='projectname1'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选归档时 选择项目名匹配合同号
    $("#projectname1").change(function () {
        
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    // console.log(v);
                    $("#cont_write1").attr("value", v.contractno);
                    $("#cont_write1").prop("value", v.contractno);
                    $("select[name='cont1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#cont_write1").attr("value",$(this).val());
                            $("#cont_write1").prop("value",$(this).val());
                            // document.getElementById("cont_write").value = $(this).val();
                        }
                    })
                }
            })
        } else {
            $("select[name='cont1'] option").eq(0).attr('selected', 'selected');
            $("#cont_write1").attr("value", '');
            $("#cont_write1").prop("value", '');
            $("select[name='cont1'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //添加归档记录时 选择合同编号匹配项目名称
    $("#cont4").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    $("#projectname_write4").attr("value", v.projectname);
                    $("#projectname_write4").prop("value", v.projectname);
                    $("select[name='projectname4'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#projectname_write4").attr("value",$(this).val());
                            $("#projectname_write4").prop("value",$(this).val());
                        }
                    })
                    $("select[name='submit_name4'] option").each(function(){
                        $(this).prop('select',false);
                        $(this).attr('select',false);
                        if( $(this).val() == v.dutyname){
                            $(this).prop('selected','selected');
                            $(this).attr('selected','selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='projectname4'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write4").attr("value", '');
            $("#projectname_write4").prop("value", '');
            $("select[name='projectname4'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='submit_name4'] option").eq(0).attr('selected','selected');
            $("select[name='submit_name4'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //添加归档记录时 选择项目名匹配合同号
    $("#projectname4").change(function () {
        
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    // console.log(v);
                    $("#cont_write4").attr("value", v.contractno);
                    $("#cont_write4").prop("value", v.contractno);
                    $("select[name='cont4'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#cont_write4").attr("value",$(this).val());
                            $("#cont_write4").prop("value",$(this).val());
                            // document.getElementById("cont_write").value = $(this).val();
                        }
                    })
                    $("select[name='submit_name4'] option").each(function(){
                        $(this).prop('select',false);
                        $(this).attr('select',false);
                        if( $(this).val() == v.dutyname){
                            $(this).prop('selected','selected');
                            $(this).attr('selected','selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='cont4'] option").eq(0).attr('selected', 'selected');
            $("#cont_write4").attr("value", '');
            $("#cont_write4").prop("value", '');
            $("select[name='cont4'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='submit_name4'] option").eq(0).attr('selected','selected');
            $("select[name='submit_name4'] option").eq(0).siblings().removeAttr('selected');
        }
    })
        
    //选择工作类，工作项下拉框改变
    $("#worktype").change(function(){
        var html7 = '<option value="">请选择</option>';
        var value = $(this).val();
        if (value != '' && worktypeset.length > 0) {
            $.each(worktypeset,function(i , v){
                if (value == v.worktype){
                    html7 += '<option value="' + v.workitem + '">' + v.workitem + '</option>';
                }
            })
            $("#workitem").html(html7);
        }
    })
    //选择报告类填充报告项
    $("#docum_type").change(function(){
        var value = $(this).val();
        var html='';
        if(value == '到货验收报告'){
            html += '<option value="">请选择</option>';
            html += '<option value="到货验收报告">到货验收报告</option>';
        }else if (value == '项目验收报告'){
            html += '<option value="">请选择</option>';
            html += '<option value="初验报告">初验报告</option>';
            html += '<option value="终验报告">终验报告</option>';
        }else if (value == '其他项目报告'){
            html += '<option value="">请选择</option>';
            html += '<option value="设备巡检报告">设备巡检报告</option>';
            html += '<option value="演练方案报告">演练方案报告</option>';
            html += '<option value="实施方案工艺">实施方案工艺</option>';
            html += '<option value="故障处理报告">故障处理报告</option>';
            html += '<option value="测试方案报告">测试方案报告</option>';
            html += '<option value="阶段总结报告">阶段总结报告</option>';
            html += '<option value="客户服务报告">客户服务报告</option>';
            html += '<option value="培训会议签到">培训会议签到</option>';
            html += '<option value="其它项目报告">其它项目报告</option>';
        }else {
            html += '<option value="">请选择</option>';
        }
        $("#docum_item").html(html);
    })
    
    select_option_flag(); //新消息 *
    showmember(); //查找人员 用于写下拉框 *
    displayProject(); //显示合同
    displayWorktype(); //工作类  筛选数据下拉框*
    get_update_tishi();
    // show_work_count(); //显示每周提交情况
    // show_work_count_month();//显示每月提交情况
    // display_project_report();//项目周报提交情况 未用
    // displayArchive(); //显示归档记录
    getEquipment();//获取产品品牌类型型号*
    
    produce_page_for_showAll();//显示翻页
    showAll_query(1);
    // showAll();//显示所有日报数据

    //修改密码按钮
    $("#alterPassword").click(function () {
        console.log($("#headername").html());
        $.each(memberset,function(i,v){
            // console.log(v.username);
            if ($("#headername").html() == v.username){
                persondata=v;
            }
        })
        $("#alterpassword").addClass('showPopup');
        $(".md-overlay").addClass('showOverlay');
        var oH = $("#alterpassword").find(".popup-Content-box").height();
        $("#alterpassword").height(oH);
        $("#alterpassword").siblings('.popup-Box').css('height', 'auto');
        $("input[name='member_id']").val(persondata.id);
    });
    postRequest('/display_user/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            $.each(data.data, function (i, v) {
                // console.log(v);
                if (v.role == "3"&& v.status == "在职"){
                    user_eng.push(v);
                }  
            });
        }
    },function(err){
        console.log(err);
    })
});
//比较两次时间输入
function fortime(s, e) {
    if (s && e) {
        var reg = new RegExp("-", "g");
        var st = s.toString().replace(reg, '');
        var et = e.toString().replace(reg, '');
        if (s > e) {
            var s = ($("input[name='starttime']").val(''));
            var s = ($("input[name='starttime1']").val(''));
            var e = ($("input[name='endtime']").val(''));
            var e = ($("input[name='endtime1']").val(''));
            myalert('系统提示框','开始时间不能大于结束时间');
            return true;
        }
        // else {
        //     showData();
        // }
    }
}

//查找所有成员
function showmember() {
    postRequest('/display_user/', {}, function (data) {
        if (data.result == 1 || data.result == '1') {
            memberset = data.data;
            if (data.data.length) {
                var html6 = '<option value="">请选择</option>';
                var html7 = '<option value="">请选择</option>';
                $.each(data.data, function (i, v) {
                    if (v.role == '3') {
                        html6 += '<option value="' + v.firstname + '">' + v.firstname + '</option>';
                        if (v.type == '2')
                            html7 += '<option value="' + v.firstname + '">' + v.firstname + '</option>';
                    }
                })
                $("#staffname").html(html7);
                $("#staffname8").html(html7);
                $("#dutyname1").html(html6);
            }
        }
    }, function (err) {
        console.log(err);
    })
}

//生成显示所有日报的page栏
function produce_page_for_showAll(){
    $("#padding_lhb").html('');
    var starttime = $("input[name='starttime']").val()||'';
    var endtime = $("input[name='endtime']").val()||'';
    var contractno = $('#cont_write').val()||'';
    var province = $("select[name='site'] option:selected").val()||'';
    var city = $("select[name='city'] option:selected").val()||'';
    var projectname = $('#projectname_write').val()||'';
    var worktype = $("select[name='worktype'] option:selected").val()||'';
    var workitem = $("select[name='workitem'] option:selected").val()||'';
    var clientname = $("select[name='clientname'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname'] option:selected").val()||'';
    var salename = $("select[name='sell'] option:selected").val()||'';
    var department = $("select[name='department'] option:selected").val()||'';
    var membername = $("select[name='staffname'] option:selected").val()||'';
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
    var flag = ["0","1"]
    var data = {
        "starttime": starttime,
        "endtime":endtime,
        "province": province,
        "city": city,
        // "county": county,
        "contractno": contractno,
        "projectname": projectname,
        "worktype": worktype,
        "workitem": workitem,
        "clientname": clientname,
        "dutyname": dutyname,
        "salename": salename,
        "department": department,
        "membername": membername,
        "user": "admin",
        "flag": flag
    }
    // console.log(data);
    
    postRequest('/produce_page_for_showAll/',{
        "data": JSON.stringify(data)
    },function(data){
        html1 = ''
        // console.log(data);
        if (data.result == 1 || data.result == '1'){
            if (data.page_num){
                //写入表顶的数据
                $(".daysTotal").html(toMoney(data.data[0]));
                $(".monthTotal").html(toMoney(data.data[1]));
                $(".fixedcostTotal").html(toMoney(data.data[2]) + '元');
                $(".othercostTotal").html(toMoney(data.data[3]) + '元');
                var allTotal = parseFloat(data.data[2]) + parseFloat(data.data[3]);
                $(".allTotal").html(toMoney(allTotal) + '元');
            }else{
                $("#paging").html(html1)
                $(".daysTotal").html(0.00);
                $(".monthTotal").html(0.00);
                $(".fixedcostTotal").html(0.00 + '元');
                $(".othercostTotal").html(0.00 + '元');
                $(".allTotal").html(0.00 + '元');
                // $("#show_all").html('<tr><td colspan="20">暂无数据</td></tr>');
            }
            if  (data.page_num > 1){
                //生成翻页
                html1 += '<div id="paging_file" style="float:;width:auto;overflow:hidden;font-size: 14px;text-align: -webkit-center;">';
                html1 += '<ul class="pagination" style="overflow:hidden; width:auto; min-width:113px;width: -moz-fit-content; width: fit-content;">';
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_5_active(1,2)"><a>首页</a></li>';
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_previous_page(2)"><a>上一页</a></li>';
                for (var i =1; i <= data.page_num; i++){
                    if (1 == i){
                        html1 += '<li class="active" style="display:inline;background:#ccc" onclick="show_5_active(1,2)"><a><span>1</span></a></li>';
                    }else if(i<=5){
                        html1 += '<li class="active" style="display:inline" onclick="show_5_active('+i+',2)"><a><span>'+i+'</span></a></li>';
                    }else{
                        html1 += '<li class="active" style="" onclick="show_5_active('+i+',2)"><a><span>'+i+'</span></a></li>';
                    }
                }
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_next_page(2)"><a>下一页</a></li>';
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_last_page(2)"><a>尾页</a></li>';
                
                html1 += '<li class="" style="margin-left:10px;"><input id ="input_page" placeholder="1" style="border:0;width:50px;line-height:30px;text-align:center"/></li>';
                html1 += '<li class="next" style="margin-left:10px;" onclick="jump_that_page(2)"><a>跳转</a></li>';
                
                html1 += '<li class="next" style="border:0px;width:auto;margin-left:10px;"><a>共<span id="page_lhb_total">&nbsp;'+data.page_num+'&nbsp;</span>页&nbsp;&nbsp;&nbsp;&nbsp;共<span id="count_lhb_total">&nbsp;'+data.count+'&nbsp;</span>条数据</a></li>';
                html1 += '</ul>';
                html1 += '</div>';
                $("#paging").html(html1);
            }else{
                $("#paging").html('');
            }
        }else{
            $("#paging").html(html1)
        }
    },function(err){
        console.log(err);
    });
}
function showAll_query(i){
    var current_page = i||1;
    var starttime = $("input[name='starttime']").val()||'';
    var endtime = $("input[name='endtime']").val()||'';
    // var contractno = $('#cont_write').val()||'';
    var contractno = $("select[name='cont'] option:selected").val()||'';
    var province = $("select[name='site'] option:selected").val()||'';
    var city = $("select[name='city'] option:selected").val()||'';
    // var projectname = $('#projectname_write').val()||'';
    var projectname = $("select[name='projectname'] option:selected").val()||'';
    var worktype = $("select[name='worktype'] option:selected").val()||'';
    var workitem = $("select[name='workitem'] option:selected").val()||'';
    var clientname = $("select[name='clientname'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname'] option:selected").val()||'';
    var salename = $("select[name='sell'] option:selected").val()||'';
    var department = $("select[name='department'] option:selected").val()||'';
    var membername = $("select[name='staffname'] option:selected").val()||'';
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
    var flag = ["0","1"]
    var data = {
        "current_page": current_page,
        "starttime": starttime,
        "endtime":endtime,
        "province": province,
        "city": city,
        // "county": county,
        "contractno": contractno,
        "projectname": projectname,
        "worktype": worktype,
        "workitem": workitem,
        "clientname": clientname,
        "dutyname": dutyname,
        "salename": salename,
        "department": department,
        "membername": membername,
        "user": "admin",
        "flag": flag
    }
    // console.log(data);
    postRequest('/display_all_work_content_query/',{
        "data": JSON.stringify(data)
    },function(data){
        // console.log(data);
        if(data.result == 1 || data.result == '1' ){
            html = '';
            if (data.data.length) {
                $.each(data.data, function (i, v) {
                    var count = 0;
                    $.each(v.othercost, function (j, k) {
                        count += Math.floor(parseFloat(k.fee)*100);
                    });
                    html += '\
                        <tr>\
                            <td>'+ (data.serialNummber+i) +'</td>\
                            <td>'+ (v.workdate).slice(0,10) + '</td>\
                            <td>'+ (v.endtime).slice(0,10) + '</td>\
                            <td>'+ v.province + v.city + '</td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.clientname + '</td>\
                            <td>'+ v.department + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.salename + '</td>\
                            <td>'+ v.worktype + '</td>\
                            <td>'+ v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>\
                            <td>'+v.membername +'</td>\
                            <td>'+ v.workload + '</td>\
                            <td>'+ v.level + '</td>\
                            <td>'+ (count/100).toFixed(2) + '</td>\
                            <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                            <td><a href="javascript:;" title="删除" ><button type="button" style="color:#fff;background:#B7AF99;border:solid #B7AF99;border-radius:11px;height:20px;width:40px;font-size:7px;">删除</button></a></td>';
                    html += '</tr>';
                });
                $("#show_all").html(html);
            }else{
                $("#show_all").html('<tr><td colspan="20">暂无数据</td></tr>');
            }
        }else{
            $("#show_all").html('<tr><td colspan="20">暂无数据</td></tr>');
        }
    },function(err){
        console.log(err);
    });
}
//展示所有的日报记录
//未使用
function showAll() {
    if($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    if($("#pagebox2").length>0){
        $("#paging2").get(0).removeChild($("#pagebox2").get(0));
    }
    postRequest('/display_all_work_content/', {
    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            var html = '';
            if (data.data.length) {
                workdetailset = data.data;
                if (workdetailset.length < 17) {
                    var daysTotal = 0;
                    var monthTotal1 = 0;
                    var counttotal = 0;
                    var fixcost = 0;
                    var serialNummber=0;
                    $("#paging").hide();
                    $.each(workdetailset, function (i, v) {
                        var address = v.province + v.city;
                        var workdate = (v.workdate).slice(0,10);
                        var count = 0;
                        serialNummber++;
                        $.each(v.othercost, function (j, k) {
                            //html += '<td>' + k.fee + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                            })
                        html += '\
                        <tr>\
                            <td>'+ serialNummber +'</td>\
                            <td>'+ workdate + '</td>\
                            <td>'+ (v.endtime).slice(0,10) + '</td>\
                            <td>'+ address + '</td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.clientname + '</td>\
                            <td>'+ v.department + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.salename + '</td>\
                            <td>'+ v.worktype + '</td>\
                            <td>'+ v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>\
                            <td>'+v.membername +'</td>\
                            <td>'+ v.workload + '</td>\
                            <td>'+ v.level + '</td>\
                            <td>'+ (count/100).toFixed(2) + '</td>\
                            <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                            <td><a href="javascript:;" title="删除" ><button type="button" style="color:#fff;background:#B7AF99;border:solid #B7AF99;border-radius:11px;height:20px;width:40px;font-size:7px;">删除</button></a></td>';
                        html += '</tr>';
                        fixcost = fixcost + parseFloat(v.fixedcost);
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                        counttotal += count;
                    })
                    var daysTotal = daysTotal.toFixed(2);
                    // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                    // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                    var fixedcostTotal = fixcost;
                    var othercostTotal = counttotal/100;
                    var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                    $(".daysTotal").html(toMoney(daysTotal));
                    $(".monthTotal").html(toMoney(monthTotal));
                    $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                    $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                    $(".allTotal").html(toMoney(allTotal) + '元');
                    $("#show_all").html(html);
                } else {
                    $("#paging").show();
                    var html = '<div class="pagebox" id="pagebox"></div>';
                    $("#paging").html(html);
                    var total = workdetailset.length;
                    var pagenum = Math.ceil(total / 17);
                    $('#pagebox').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            // console.log(page);
                            var html = '';
                            var min = (page - 1) * 17;
                            var max = page * 17;
                            var daysTotal = 0;
                            var monthTotal1 = 0;
                            var counttotal = 0;
                            var fixcost = 0;
                            var serialNummber=0;
                            $.each(workdetailset, function (i, v) {
                                var address = v.province + v.city;
                                var workdate = (v.workdate).slice(0,10);
                                var count = 0;
                                serialNummber++;
                                $.each(v.othercost, function (j, k) {
                                    //html += '<td>' + k.fee + '</td>';
                                    count += Math.floor(parseFloat(k.fee)*100);
                                })
                                // if(v.request == null || v.request == ""){
                                    // request = '无';
                                // } else{
                                    // request = v.request;
                                // }
                                html += '\
                                <tr>\
                                    <td>'+ serialNummber +'</td>\
                                    <td>'+ workdate + '</td>\
                                    <td>'+ (v.endtime).slice(0,10) + '</td>\
                                    <td>'+ address + '</td>\
                                    <td>'+ v.contractno + '</td>\
                                    <td style="text-align: left;">'+ v.projectname + '</td>\
                                    <td>'+ v.clientname + '</td>\
                                    <td>'+ v.department + '</td>\
                                    <td>'+ v.dutyname + '</td>\
                                    <td>'+ v.salename + '</td>\
                                    <td>'+ v.worktype + '</td>\
                                    <td>'+ v.workitem + '</td>\
                                    <td style="text-align: left;">'+ v.workcontent + '</td>\
                                    <td style="text-align: left;">'+ v.toresult + '</td>\
                                    <td>'+v.membername +'</td>\
                                    <td>'+ v.workload + '</td>\
                                    <td>'+ v.level + '</td>\
                                    <td>'+ (count/100).toFixed(2) + '</td>\
                                    <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                                    <td><a href="javascript:;" title="删除" ><button type="button" class="dongjie">删除</button></a></td>';
                                html += '</tr>';
                                daysTotal += parseFloat(v.workload);
                                monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                                counttotal += count;
                                fixcost = fixcost + parseFloat(v.fixedcost);
                            })
                            var daysTotal = daysTotal.toFixed(2);
                            // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                            // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                            var fixedcostTotal = fixcost;
                            var othercostTotal = counttotal/100;
                            // console.log(typeof(fixedcostTotal));
                            // console.log(typeof(othercostTotal));
                            var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                            $(".daysTotal").html(toMoney(daysTotal));
                            $(".monthTotal").html(toMoney(monthTotal));
                            $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                            $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                            $(".allTotal").html(toMoney(allTotal)+ '元');
                            $("#show_all").html(html);
                            $("#show_all").children('tr').each(function (index, value) {
                                if (index >= min && index < max) {
                                    // console.log(index);
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            })
                        }
                    })
                }
            } else {
                $(".daysTotal").html(0.00);
                $(".monthTotal").html(0.00);
                $(".fixedcostTotal").html(0.00 + '元');
                $(".othercostTotal").html(0.00 + '元');
                $(".allTotal").html(0.00 + '元');
                $("#show_all").html('<tr><td colspan="20">暂无数据</td></tr>');
                $("#paging").hide();
            }
        }
    }, function (err) {
        console.log(err);
    })
}


/* 点击"筛选数据"出现弹窗*/
function select_work_content(){
    $("#shaixuan").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#shaixuan").find(".popup-Content-box").height();
    $("#shaixuan").height(oH);
    $("#shaixuan").siblings('.popup-Box').css('height', 'auto');
    // resetchoose();
    
}
/* 点击"筛选合同"出现弹窗*/
function select_hetong(){
    $("input[name='cont_write3']").val('');
    $("input[name='projectname_write3']").val('');
    $("select[name='cont3'] option").eq(0).attr('selected', 'selected');
    $("#cont3").val('');
    $("select[name='projectname3'] option").eq(0).attr('selected', 'selected');
    $("#projectname3").val('');
    $("input[name='starttime3']").val('');
    $("input[name='endtime3']").val('');
    $("select[name='type3'] option").eq(0).attr('selected', 'selected');
    $("select[name='type3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='state3'] option").eq(0).attr('selected', 'selected');
    $("select[name='state3'] option").eq(0).siblings().removeAttr('selected');  
    $("select[name='caigou3'] option").eq(0).attr('selected', 'selected');
    $("select[name='caigou3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='daohuo3'] option").eq(0).attr('selected', 'selected');
    $("select[name='daohuo3'] option").eq(0).siblings().removeAttr('selected');
    // $("select[name='shishi3'] option").eq(0).attr('selected', 'selected');
    // $("select[name='shishi3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='clientname3'] option").eq(0).attr('selected', 'selected');
    $("select[name='clientname3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='dutyname3'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='sell3'] option").eq(0).attr('selected', 'selected');
    $("select[name='sell3'] option").eq(0).siblings().removeAttr('selected');
    var html1 =  '<option value="">请选择</option>';
    var html2 =  '<option value="">请选择</option>';
    if($('.datatrack').attr('id')=='project_all'){
        $("select[name='state3']").attr('disabled', false);
        $("select[name='state3']").css('background-color', 'rgba(255,255,255,1)');
        $("select[name='state3'] option").eq(0).attr('selected', 'selected');
        $("select[name='state3'] option").eq(0).siblings().removeAttr('selected');
        $.each(dataset,function(i,v){
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        });
        $("#cont3").html(html1);
        $("#projectname3").html(html2);
        if($("#wowowo").length==0){
            $("#wowowowo").prepend('<th height="30" id="wowowo">操作</th>');
        }
    }
    if( $('.datatrack').attr('id')=='project_ing'){
        $("select[name='state3']").attr('disabled', 'disabled');
        $("select[name='state3']").css('background-color', 'rgba(127,127,127,0.1)');
        $("select[name='state3']").val('进行中');
        $.each(dataset,function(i,v){
            if(v.state=='进行中'){
                html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
            }
        });
        $("#cont3").html(html1);
        $("#projectname3").html(html2);
        if($("#wowowo").length>0){
            $("#wowowowo").get(0).removeChild($("#wowowo").get(0))
        }
    }
    $("#shaixuan_ht").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#shaixuan_ht").find(".popup-Content-box").height();
    $("#shaixuan_ht").height(oH);
    $("#shaixuan_ht").siblings('.popup-Box').css('height', 'auto');
}
/* 点击"退回"出现弹窗*/
function alertreturn(id){
    $("#alter_returnReasons").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#alter_returnReasons").find(".popup-Content-box").height();
    $("#alter_returnReasons").height(oH);
    $("#alter_returnReasons").siblings('.popup-Box').css('height', 'auto');
    $("input[name='returnreasons_id']").val(id);
}
/* 点击"添加"出现弹窗  添加归档记录*/
function add_archive_btn(){
    eliminate_achive();
    empty_tmp();
    $("#achive_title").html("新增报告归档");
    var oH = $("#add_achive_pop").find(".popup-Content-box").height();
    var html1 =  '<option value="">请选择</option>';
    var html2 =  '<option value="">请选择</option>';
    var html3 =  '<option value="">请选择</option>';
    var pro_duty_man = [];//存放所有项目de负责人
    $.each(dataset,function(i,v){
        html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
        html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        pro_duty_man.push(v.dutyname);
    });
    var dutyname = unique(pro_duty_man);//去掉重复的项目负责人
    $.each(dutyname,function(i,v){
        html3 += '<option value="' + v + '">' + v + '</option>';
     })
    $("#cont4").html(html1);
    $("#projectname4").html(html2);
    $("#submit_name4").html(html3);
    $("#add_achive_pop").height(oH);
    $("#add_achive_pop").siblings('.popup-Box').css('height', 'auto');
    $("#achive_btn1").show();
    $("#achive_btn2").hide();
    
    $('#cont_write4').prop('disabled', false);
    $('#cont_write4').attr('disabled', false);
    $('#cont_write4').css('background-color', '');
    
    $('#projectname_write4').prop('disabled', false);
    $('#projectname_write4').attr('disabled', false);
    $('#projectname_write4').css('background-color', '');
    
    $('#docum_type').prop('disabled', false);
    $('#docum_type').attr('disabled', false);
    $('#docum_type').css('background-color', '');
    
    $('#docum_item').prop('disabled', false);
    $('#docum_item').attr('disabled',false);
    $('#docum_item').css('background-color', '');
    
    
    $("#add_achive_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    $("#add_achive_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
}
//显示销售负责人
function displaySale(){
    postRequest('/display_saleman/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            var html = '';
            $.each(data.data, function (i, v) {
                html += '\
                    <tr>\
                    <td height="30">'+v.salename+'</td>\
                    <td height="30">'+v.telnum+'</td>\
                    <td height="30">'+v.emailaddr+'</td>\
                    <td height="30"><a class="a1 display_none" href="javascript:;" title="确认" onclick="update_saleman(this,\'' + v.id +'\')">\
                        <button type="button" class="xiugai">确认</button></a>\
                        <a class="a2" href="javascript:;" title="修改" onclick="alter_saleman(this)">\
                        <button type="button" class="xiugai">修改</button></a>\
                        <a class="a3 display_none" href="javascript:;" title="取消" onclick="displaySale()">\
                        <button type="button" class="shanchu">取消</button></a>\
                        <a class="a4" href="javascript:;" title="删除" onclick="del_saleman(\'' + v.id +'\')">\
                        <button type="button" class="shanchu">删除</button></a></td>\
                    </tr>';
            });
            html += '\
            <tr>\
                <td height="30"><input id="add_saleman" style="border:#eaeaea solid 1px;width:100%;"></td>\
                <td height="30"><input id="add_telnum" style="border:#eaeaea solid 1px;width:100%;"></td>\
                <td height="30"><input id="add_emailaddr" style="border:#eaeaea solid 1px;width:100%;"></td>\
                <td height="30"><a class="a5" href="javascript:;" title="添加"onclick="add_saleman()">\
                    <button type="button" class="xiugai">添加</button></a>\
                    <a class="a6" href="javascript:;" title="取消"onclick="displaySale()">\
                    <button type="button" class="shanchu">取消</button></a></td>\
            </tr>';
            $("#display_saleman").html(html);
        }
    },function(err){
        console.log(err);
    })
}
//销售负责人 点击修改出现“input”框 
function alter_saleman(obj){
    var list1=$(obj).parent().find("a:lt(4)");
    $(list1[0]).removeClass("display_none");
    $(list1[1]).addClass("display_none");
    $(list1[2]).removeClass("display_none");
    $(list1[3]).addClass("display_none");
    var list=$(obj).parent().parent().find("td:lt(3)");
    $.each(list,function(i,v){
        $(v).html("<input type='text' value='"+$(v).text()+"' style='border:#eaeaea solid 1px;width:100%;'/>");
    });
}
//确认修改销售负责人
function update_saleman(obj,id){
    var list2=$(obj).parent().parent().find("td:lt(3)");
    var salename = $(list2[0]).children("input").val();
    var telnum = $(list2[1]).children("input").val();
    var emailaddr = $(list2[2]).children("input").val();
    var data = {"id":id,"salename":salename,"telnum":telnum,"emailaddr":emailaddr}
    console.log(data);
    postRequest('/update_saleman/',{
            "data": JSON.stringify(data)
    },function(data){
        if (data.result==1||data.result=='1'){
            console.log("修改成功");
            displaySale();
        }
    },function(err){
        console.log(err);
    })
}
//添加销售负责人
function add_saleman(){
    var salename = $("#add_saleman").val();
    var telnum = $("#add_telnum").val();
    var emailaddr = $("#add_emailaddr").val();
    if (salename ==""||telnum==""||emailaddr==""){
        myalert('系统提示框','数据为空');
    }else{
        data = {"salename":salename,"telnum":telnum,"emailaddr":emailaddr};
        postRequest('/add_saleman/',{
            "data": JSON.stringify(data)
        },function(data){
            if(data.result==1||data.result=='1'){
                console.log(data.result);
                displaySale();
            }
        },function(err){
            console.log(err);
        })
    }
}
//删除销售负责人
function del_saleman(id){
    myconfirm('系统提示框','确定要删除吗？',function(r){
        if(r){
            var data={"id":id};
            console.log(data);
            postRequest('/del_saleman/',{
                "data": JSON.stringify(data)
            },function(data){
                if (data.result==1||data.result=='1'){
                    console.log("删除成功")
                    displaySale();
                }
            },function(err){
                console.log(err);
            })
        }
    });
}
//显示项目信息
function displayProject() {
    postRequest('/display_project/', {

    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            dataset = data.data;
            //排序
            if (dataset.length!=0){
                postRequest('/sort_prj_contentdata/',{
                    'data':JSON.stringify({'data':dataset})
                },function(data){
                    if (data.result == '1' || data.result == 1){
                        dataset1=data.data;
                    }
                });
            }
            if (data.data.length) {
                
                var html1 = '<option value="">请选择</option>';
                var html2 = '<option value="">请选择</option>';
                var html3 = '<option value="">请选择</option>';
                var html4 = '<option value="">请选择</option>';
                var html5 = '<option value="">请选择</option>';
                var html6 = '<option value="">请选择</option>';
                var val1 = [];
                var val2 = [];
                var val3 = [];
                var val4 = [];
                $.each(data.data, function (i, v) {
                    val1.push(v.clientname);
                    val2.push(v.salename);
                    val3.push(v.department);
                    val4.push(v.dutyname);
                    html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                })
               
                var val11 = unique(val1);
                var val22 = unique(val2);
                var val33 = unique(val3);
                var val44 = unique(val4);
                 postRequest('/sort_clientname/', {
                    "data": JSON.stringify(val11)
                }, function (data) {
                    if (data.result=='1'||data.result==1){
                        $.each(data.data, function (i, v) {
                            html3 += '<option value="' + v + '">' + v + '</option>';
                            
                        });
                        $("#clientname").html(html3);
                        // $("#clientname1").html(html3);
                        $("#clientname3").html(html3);
                    }
                }, function (err){
                    console.log(err);
                });
                // $.each(val11, function (i, v) {
                    // html3 += '<option value="' + v + '">' + v + '</option>';
                // });
                $.each(val22, function (i, v) {
                    html4 += '<option value="' + v + '">' + v + '</option>';
                });
                $.each(val33, function (i, v) {
                    html5 += '<option value="' + v + '">' + v + '</option>';
                });
                $.each(val44, function (i, v) {
                    html6 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#cont").html(html1);
                $("#projectname").html(html2);
                // $("#clientname").html(html3);
                // $("#clientname3").html(html3);
                $("#sell").html(html4);
                $("#sell3").html(html4);
                $("#department").html(html5);
                $("#dutyname").html(html6);
                $("#dutyname3").html(html6);
            }
            // displayTrack();
            if($("#pagebox1").length>0){
                $("#paging1").get(0).removeChild($("#pagebox1").get(0));
            }
            if($("#pagebox2").length>0){
                $("#paging2").get(0).removeChild($("#pagebox2").get(0));
            }
            
        }
    }, function (err) {
        console.log(err);
    })
}
//重置项目
function resetproject() {
    $("input[name='xuhao']").val('');
    $("input[name='projectid']").val('');
    $("input[name='contractNo']").val('');
    $("input[name='projectname']").val('');
    $("select[name='type1'] option").eq(0).attr('selected', 'selected');
    $("select[name='type1'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='clientname1'] option").eq(0).attr('selected', 'selected');
    $("select[name='clientname1'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='dutyname1'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname1'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='salename1'] option").eq(0).attr('selected', 'selected');
    $("select[name='salename1'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='department1'] option").eq(0).attr('selected', 'selected');
    $("select[name='department1'] option").eq(0).siblings().removeAttr('selected');
}
//显示进度表
function displayTrack(data){
    // console.log(data)
    if($("#pagebox").length>0){
        $("#paging").get(0).removeChild($("#pagebox").get(0));
    }
    if($("#pagebox2").length>0){
        $("#paging2").get(0).removeChild($("#pagebox2").get(0));
    }
    if($("#uploadType_ht").length==0&&$("#updataOperat").length==0){
        $("#prj_name").after("<th id = uploadType_ht>合同上传状态</th><th id = updataOperat>销售合同操作</th>");
    }  
    var html = '';
    var now_dataset = [];
    if(data == null){
        now_dataset = dataset1;
    }else{
        if($('.datatrack').attr('id') == 'project_ing'){
            now_dataset = select_before(dataset, data);;
        }else{
            now_dataset = select_before(dataset1, data);;
        }
    }
    // console.log(now_dataset.length);
    // console.log(dataset.length);
    if (now_dataset.length) {
        if (now_dataset.length < 18) {
            $("#paging1").hide();
            $.each(now_dataset, function (i, v) {
                guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                html += '<tr>';
                if($('.datatrack').attr('id')=='project_all'){
                    html += '<td>\
                        <span onclick="alert_updateTrack(\'' + v.id +'\')">\
                           <button type="button" class="xiugai">更新</button>\
                        </span></td>';
                }
                html += '<td>' + v.xuhao + '</td>';
                html += '<td>' + v.clientname + '</td>';
                html += '<td>' + v.contractno + '</td>';
                html += '<td>' + v.type + '</td>';
                html += '<td style="text-align: left;">' + v.projectname + '</td>';
                html += '<td>' + v.cont_status + '</td>';
                if(v.cont_status!='OK'){
                    html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\', \''+v.projectname+'\')">\
                       <button type="button" class="xiugai">上传</button>\
                        <input type="file" class="file_Input"  multiple="multiple">\
                    </a><a class="span_file_Input">\
                       <button type="button" class="dongjie">下载</button>\
                    </a><a class="span_file_Input">\
                       <button type="button" class="dongjie">删除</button>\
                    </a></td>';
                }else{
                    html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\')">\
                       <button type="button" class="xiugai">上传</button>\
                        <input type="file" class="file_Input"  multiple="multiple">\
                    </a><a download class="span_file_Input" onclick="gettype_ht(this,\'' + v.cont_name +'\')">\
                       <button type="button" class="xiugai">下载</button>\
                    </a><a class="span_file_Input" onclick="deletetype_ht(\'' + v.cont_name +'\',\'' + v.id +'\')">\
                       <button type="button" class="shanchu">删除</button>\
                    </a></td>';
                }
                html += '<td>' + v.state + '</td>';
                html += '<td style="text-align:right;">' + toMoney(v.money) + '</td>';
                html += '<td>' + v.caigouzhuangtai + '</td>';
                html += '<td>' + v.arrival_status + '</td>';
                // html += '<td>' + v.shishiqingkuang + '</td>';
                html += '<td>' + guidangqingkuang + '</td>';
                html += '<td>' + v.huowuqingdian + '</td>';
                html += '<td>' + v.chuyanbaogao + '</td>';
                html += '<td>' + v.zhongyanbaogao + '</td>';
                html += '<td>' + v.dutyname + '</td>';
                html += '<td>' + v.salename + '</td>';
                html += '<td>' + yikaipiao + '</td>';
                html += '<td>' + yishoukuan + '</td>';
                html += '<td style="text-align: left;">' + v.remark + '</td>';
                html += '<td>' + v.latestupdate + '</td>';
                html += '<td style="text-align: left;">' + v.latestupdatecontent + '</td>';
                html += '</tr>';
            })
            $("#show_track").html(html);
        } else {
            $("#paging1").show();
            var html1 = '<div class="pagebox" id="pagebox1"></div>';
            $("#paging1").html(html1);
            var total = now_dataset.length;
            var pagenum = Math.ceil(total / 18);
            $('#pagebox1').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    var html = '';
                    var min = (page - 1) * 18;
                    var max = page * 18;
                    $.each(now_dataset, function (i, v) {
                        guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                        yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                        yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                        html += '<tr>';
                        if($('.datatrack').attr('id')=='project_all'){
                            html += '<td>\
                                <span onclick="alert_updateTrack(\'' + v.id +'\')">\
                                   <button type="button" class="xiugai">更新</button>\
                                </span></td>';
                        }
                        html += '<td>' + v.xuhao + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td>' + v.type + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.cont_status + '</td>';
                        if(v.cont_status!='OK'){
                            html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\', \''+v.projectname+'\')" >\
                               <button type="button" class="xiugai">上传</button>\
                                <input type="file" class="file_Input" multiple="multiple">\
                            </a><a class="span_file_Input">\
                               <button type="button" class="dongjie">下载</button>\
                            </a><a class="span_file_Input">\
                               <button type="button" class="dongjie">删除</button>\
                            </a></td>';
                        }else{
                            html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\')">\
                               <button type="button" class="xiugai" >上传</button>\
                                <input type="file" class="file_Input"  multiple="multiple">\
                            </a><a download class="span_file_Input" onclick="gettype_ht(this,\'' + v.cont_name +'\')">\
                               <button type="button" class="xiugai">下载</button>\
                            </a><a class="span_file_Input" onclick="deletetype_ht(\'' + v.cont_name +'\',\'' + v.id +'\')">\
                               <button type="button" class="shanchu">删除</button>\
                            </a></td>';
                        }
                        html += '<td>' + v.state + '</td>';
                        html += '<td style="text-align:right;">' + toMoney(v.money) + '</td>';
                        html += '<td>' + v.caigouzhuangtai + '</td>';
                        html += '<td>' + v.arrival_status + '</td>';
                        // html += '<td>' + v.shishiqingkuang + '</td>';
                        html += '<td>' + guidangqingkuang + '</td>';
                        html += '<td>' + v.huowuqingdian + '</td>';
                        html += '<td>' + v.chuyanbaogao + '</td>';
                        html += '<td>' + v.zhongyanbaogao + '</td>';
                        html += '<td>' + v.dutyname + '</td>';
                        html += '<td>' + v.salename + '</td>';
                        html += '<td>' + yikaipiao + '</td>';
                        html += '<td>' + yishoukuan + '</td>';
                        html += '<td style="text-align: left;">' + v.remark + '</td>';
                        html += '<td>' + v.latestupdate + '</td>';
                        html += '<td style="text-align: left;">' + v.latestupdatecontent + '</td>';
                        
                        html += '</tr>';
                    })
                    $("#show_track").html(html);
                    $("#show_track").children('tr').each(function (index, value) {
                        if (index >= min && index < max) {
                            // console.log(index);
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    })
                }
            })
        }
    }else {
        if($("#pagebox1").length>0){
            $("#paging1").get(0).removeChild($("#pagebox1").get(0));
        }
        if($("#pagebox2").length>0){
            $("#paging2").get(0).removeChild($("#pagebox2").get(0));
        }
        $("#show_track").html('<tr><td colspan="23">暂无数据</td></tr>');
        $("#paging").hide();
    }
}
//显示进度表修改页面
function alert_updateTrack(id){
    $.each(dataset, function (i, v) {
         if(v.id == id){
            //清除页面
            $("input[name='cont2']").val('');
            $("input[name='projectname2']").val('');
            $("input[name='clientname2']").val('');
            $("input[name='type2']").val('');
            $("input[name='dutyname2']").val('');
            $("input[name='sell2']").val('');
            $("select[name='state2']").val('');
            $("select[name='caigou2']").val('');
            // $("select[name='shishi2']").val('');
            $("input[name='guidang2']").val('');
            $("select[name='huowu2']").val('');
            $("select[name='chuyan2']").val('');
            $("select[name='zhongyan2']").val('');
            $("input[name='qixian2']").val('');
            $("input[name='yikaipiao2']").val('');
            $("input[name='yishoukuan2']").val('');
            $("input[name='beizhu2']").val('');
            $("input[name='track_id']").val('');
            
            $("#updateTrack").addClass('showPopup');
            $(".md-overlay").addClass('showOverlay');
            //设置高度
            var oH = $("#updateTrack").find(".popup-Content-box").height();
            $("#updateTrack").css('max-height', oH);
            $("#updateTrack").siblings('.popup-Box').css('height', 'auto');
            //写入该条数据
            $("input[name='cont2']").val(v.contractno);
            $("input[name='projectname2']").val(v.projectname);
            $("input[name='clientname2']").val(v.clientname);
            $("input[name='type2']").val(v.type);
            $("input[name='dutyname2']").val(v.dutyname);
            $("input[name='sell2']").val(v.salename);
            $("select[name='state2']").val(v.state);
            $("select[name='caigou2']").val(v.caigouzhuangtai);
            $("select[name='daohuo2']").val(v.arrival_status);
            // $("select[name='shishi2']").val(v.shishiqingkuang);
            $("input[name='guidang2']").val(((v.guidangqingkuang)*100).toFixed(0));
            $("select[name='huowu2']").val(v.huowuqingdian);
            $("select[name='chuyan2']").val(v.chuyanbaogao);
            $("select[name='zhongyan2']").val(v.zhongyanbaogao);
            $("input[name='yikaipiao2']").val(((v.yikaipiao)*100).toFixed(0));
            $("input[name='yishoukuan2']").val(((v.yishoukuan)*100).toFixed(0));
            $("input[name='beizhu2']").val(v.remark);
            $("input[name='track_id']").val(v.id);
         }
     })
}
//更新项目时根据“货物清点”，“初验报告”，“终验报告”选项；自动计算归档情况
function get_auto_archive(){
    var str1 = $("select[name='huowu2'] option:selected").val();
    var str2 = $("select[name='chuyan2'] option:selected").val();
    var str3 = $("select[name='zhongyan2'] option:selected").val();
    var num = 0;
    if(str1 == '已归档' ){
        $("select[name='chuyan2'] option").eq(0).attr('selected', 'selected');
        $('#chuyan2').removeProp('disabled', '');
        $('#chuyan2').removeAttr('disabled', '');
        $('#chuyan2').css('background-color', '');
        if(str2 == '已归档'){
            $("select[name='zhongyan2'] option").eq(0).attr('selected', 'selected');
            $('#zhongyan2').removeProp('disabled', '');
            $('#zhongyan2').removeAttr('disabled', '');
            $('#zhongyan2').css('background-color', '');
            if(str3 == '已归档' || str3 == '不需要'){
                num = 100;
            }else{
                num = 60;
            }
        }else if(str2 == '不需要'){
            $('#zhongyan2').prop('disabled', 'true');
            $('#zhongyan2').attr('disabled', 'true');
            $('#zhongyan2').css('background-color', 'rgba(127,127,127,0.1)');
            $('#zhongyan2').val('不需要');
            num = 100;
        }else{
            num = 30;
            $("select[name='zhongyan2'] option").each(function (j, k) {
                if ($(this).val() == '未满足') {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $('#zhongyan2').prop('disabled', 'true');
            $('#zhongyan2').attr('disabled', 'true');
            $('#zhongyan2').css('background-color', 'rgba(127,127,127,0.1)');
        }
    }else{
        $("select[name='chuyan2'] option").each(function (j, k) {
            if ($(this).val() == '未满足') {
                $(this).prop('selected', 'true');
                $(this).attr('selected', 'true');
            }
        });
        $("select[name='zhongyan2'] option").each(function (j, k) {
            if ($(this).val() == '未满足') {
                $(this).prop('selected', 'true');
                $(this).attr('selected', 'true');
            }
        });
        $('#chuyan2').prop('disabled', 'true');
        $('#chuyan2').attr('disabled', 'true');
        $('#chuyan2').css('background-color', 'rgba(127,127,127,0.1)');
        $('#zhongyan2').prop('disabled', 'true');
        $('#zhongyan2').attr('disabled', 'true');
        $('#zhongyan2').css('background-color', 'rgba(127,127,127,0.1)');
        num = 0;
    }
    // if(str1 == '已归档' || str1 == '不需要'){num1 = 30;}
    // if(str2 == '已归档' || str2 == ''){num2 = 30;}
    // if(str3 == '已归档' || str3 == ' '){num3 = 40;}
    $("input[name='guidang2']").val(num);
    
    
}
//确认更新进度表
function updateTrack(){
    var id = $("input[name='track_id']").val();
    var state = $("select[name='state2'] option:selected").val();
    var caigouzhuangtai = $("select[name='caigou2'] option:selected").val();
    var arrival_status = $("select[name='daohuo2'] option:selected").val();
    // var shishiqingkuang = $("select[name='shishi2'] option:selected").val();
    var guidangqingkuang = $("input[name='guidang2']").val()||'';
    var huowuqingdian = $("select[name='huowu2'] option:selected").val()||'';
    var chuyanbaogao = $("select[name='chuyan2'] option:selected").val()||'';
    var zhongyanbaogao = $("select[name='zhongyan2'] option:selected").val()||'';
    
    var yikaipiao = $("input[name='yikaipiao2']").val();
    var yishoukuan = $("input[name='yishoukuan2']").val();
    var remark = $("input[name='beizhu2']").val();
    var updatacontent = $('#headername').html()+'：更新了';
    var data={};
    if(id==""||caigouzhuangtai==""||arrival_status==""||state==""||yikaipiao==""||yishoukuan==""){
        myalert('系统提示框','数据不能为空');
    }else {
       $.each(dataset1,function(i,v){
            if (v.id == id ){
                if(guidangqingkuang!=''){
                    guidangqingkuang = (guidangqingkuang/100).toFixed(2).toString();
                }
                yikaipiao = (yikaipiao/100).toFixed(2).toString();
                yishoukuan = (yishoukuan/100).toFixed(2).toString();
                if(v.state != state||v.caigouzhuangtai!=caigouzhuangtai||v.arrival_status!=arrival_status
                    ||v.guidangqingkuang != guidangqingkuang||v.huowuqingdian != huowuqingdian
                    ||v.chuyanbaogao != chuyanbaogao||v.zhongyanbaogao != zhongyanbaogao
                    ||v.yikaipiao != yikaipiao||v.yishoukuan != yishoukuan||v.remark != remark){
                    var updata_item = [];
                    var now = new Date();
                    var year = now.getFullYear();//年
                    var month = now.getMonth() + 1;//月
                    var day = now.getDate();//日
                    var hh = now.getHours();//时
                    var mm = now.getMinutes();//分
                    var ss = now.getSeconds();//秒
                    var clock = year + "-";
                    if(month < 10)
                        clock += "0";
                    clock += month + "-";
                    if(day < 10)
                        clock += "0";
                    clock += day + " ";
                    if(hh < 10)
                        clock += "0";
                    clock += hh + ":";
                    if (mm < 10) 
                        clock += '0'; 
                    clock += mm + ":"; 
                    if (ss < 10) 
                        clock += '0'; 
                    clock += ss;
                    if(v.state != state){v.state = state;updata_item.push('项目状态');};
                    if(v.caigouzhuangtai!=caigouzhuangtai){v.caigouzhuangtai=caigouzhuangtai;updata_item.push('采购状态')};
                    if(v.arrival_status!=arrival_status){v.arrival_status=arrival_status;updata_item.push('到货状态')};
                    // if(v.shishiqingkuang!=shishiqingkuang){v.shishiqingkuang=shishiqingkuang;updata_item.push('实施情况')};
                    // if(v.guidangqingkuang != guidangqingkuang){v.guidangqingkuang = guidangqingkuang;updata_item.push('归档情况')};
                    // if(v.huowuqingdian != huowuqingdian){v.huowuqingdian = huowuqingdian;updata_item.push('货物清点')};
                    // if(v.chuyanbaogao != chuyanbaogao){v.chuyanbaogao = chuyanbaogao;updata_item.push('初验报告')};
                    // if(v.zhongyanbaogao != zhongyanbaogao){v.zhongyanbaogao = zhongyanbaogao;updata_item.push('终验报告')};
                    if(v.yikaipiao != yikaipiao){v.yikaipiao = yikaipiao;updata_item.push('已开票%')};
                    if(v.yishoukuan != yishoukuan){ v.yishoukuan = yishoukuan;updata_item.push('已收款%')};
                    if(v.remark != remark){v.remark = remark;updata_item.push('备注')}
                    v.latestupdate = clock;
                    $.each(updata_item,function(i,item){
                        updatacontent += '“';
                        updatacontent += (item);
                        updatacontent += '”';
                        if(i+1!=updata_item.length){
                            updatacontent += '，';
                        }else{updatacontent += '。';}
                    });
                    v.latestupdatecontent = updatacontent;
                    // for (var j = i ; j >= 0 ; j--){
                        // if (j > 0){
                            // dataset1[j] = dataset1[j-1];
                        // }else{
                            // dataset1[j] = v;
                        // }
                    // }
                    //排序
                    if (dataset1.length!=0){
                        postRequest('/sort_prj_contentdata/',{
                            'data':JSON.stringify({'data':dataset1})
                        },function(data){
                            if (data.result == '1' || data.result == 1){
                                dataset1=data.data;
                                displayTrack(select_ht_data);
                            }
                        });
                    }
                    data={"id":id,"state":state,"caigouzhuangtai":caigouzhuangtai,"arrival_status":arrival_status,"guidangqingkuang":guidangqingkuang,
                    "huowuqingdian":huowuqingdian,"chuyanbaogao":chuyanbaogao,"zhongyanbaogao":zhongyanbaogao,
                    "yikaipiao":yikaipiao,"yishoukuan":yishoukuan,"remark":remark,"updatacontent":updatacontent,}
                    // console.log(data);
                    postRequest('/updateTrack/',{
                        "data":JSON.stringify(data)
                    },function(data){
                        if (data.result == 1 || data.result == '1') {
                            $("#updateTrack").removeClass('showPopup');
                            $(".md-overlay").removeClass('showOverlay');
                            // displayTrack(select_ht_data);
                            // myalert('系统提示框',"更新成功")
                        }
                    });
                }else{
                    myalert("系统提示","没有数据被修改");
                }
            return false;}
        });
        
        $.each(dataset,function(i,v){
            if (v.id == id ){
                // guidangqingkuang = (guidangqingkuang/100).toFixed(2).toString();
                // yikaipiao = (yikaipiao/100).toFixed(2).toString();
                // yishoukuan = (yishoukuan/100).toFixed(2).toString();
                if(v.state != state||v.caigouzhuangtai!=caigouzhuangtai||v.arrival_status!=arrival_status
                    ||v.guidangqingkuang != guidangqingkuang||v.huowuqingdian != huowuqingdian
                    ||v.chuyanbaogao != chuyanbaogao||v.zhongyanbaogao != zhongyanbaogao
                    ||v.yikaipiao != yikaipiao||v.yishoukuan != yishoukuan||v.remark != remark){
                    var updata_item = [];
                    var now = new Date();
                    var year = now.getFullYear();//年
                    var month = now.getMonth() + 1;//月
                    var day = now.getDate();//日
                    var hh = now.getHours();//时
                    var mm = now.getMinutes();//分
                    var ss = now.getSeconds();//秒
                    var clock = year + "-";
                    if(month < 10)
                        clock += "0";
                    clock += month + "-";
                    if(day < 10)
                        clock += "0";
                    clock += day + " ";
                    if(hh < 10)
                        clock += "0";
                    clock += hh + ":";
                    if (mm < 10) 
                        clock += '0'; 
                    clock += mm + ":"; 
                    if (ss < 10) 
                        clock += '0'; 
                    clock += ss;
                    if(v.state != state){v.state = state;updata_item.push('项目状态')};
                    if(v.caigouzhuangtai!=caigouzhuangtai){v.caigouzhuangtai=caigouzhuangtai;updata_item.push('采购状态')};
                    if(v.arrival_status!=arrival_status){v.arrival_status=arrival_status;updata_item.push('到货状态')};
                    // if(v.shishiqingkuang!=shishiqingkuang){v.shishiqingkuang=shishiqingkuang;updata_item.push('实施情况')};
                    // if(v.guidangqingkuang != guidangqingkuang){v.guidangqingkuang = guidangqingkuang;updata_item.push('归档情况')};
                    // if(v.huowuqingdian != huowuqingdian){v.huowuqingdian = huowuqingdian;updata_item.push('货物清点')};
                    // if(v.chuyanbaogao != chuyanbaogao){v.chuyanbaogao = chuyanbaogao;updata_item.push('初验报告')};
                    // if(v.zhongyanbaogao != zhongyanbaogao){v.zhongyanbaogao = zhongyanbaogao;updata_item.push('终验报告')};
                    if(v.yikaipiao != yikaipiao){v.yikaipiao = yikaipiao;updata_item.push('已开票%')};
                    if(v.yishoukuan != yishoukuan){ v.yishoukuan = yishoukuan;updata_item.push('已收款%')};
                    if(v.remark != remark){v.remark = remark;updata_item.push('备注')}
                    v.latestupdate = clock;
                    $.each(updata_item,function(i,item){
                        updatacontent += '“';
                        updatacontent += (item);
                        updatacontent += '”';
                        if(i+1!=updata_item.length){
                            updatacontent += '，';
                        }else{updatacontent += '。';}
                    });
                    v.latestupdatecontent = updatacontent;
                }
            }
        });
    }
}
// 去重
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}
//按条件查询
//未使用
function chooseinfo() {
    //var workdate = $("input[name='starttime']").val();
    var starttime = $("input[name='starttime']").val();
    var endtime = $("input[name='endtime']").val();
    // var contractno = $("select[name='cont'] option:selected").val();
    var contractno = $('#cont_write').val();
    var province = $("select[name='site'] option:selected").val();
    var city = $("select[name='city'] option:selected").val();
    // var county = $("select[name='county'] option:selected").val();
    // var projectname = $("select[name='projectname'] option:selected").val();
    var projectname = $('#projectname_write').val();
    var worktype = $("select[name='worktype'] option:selected").val();
    var workitem = $("select[name='workitem'] option:selected").val();
    var clientname = $("select[name='clientname'] option:selected").val();
    var dutyname = $("select[name='dutyname'] option:selected").val();
    var salename = $("select[name='sell'] option:selected").val();
    var department = $("select[name='department'] option:selected").val();
    var membername = $("select[name='staffname'] option:selected").val();
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
        
    var data = {
        "starttime": starttime,
        "endtime":endtime,
        "province": province,
        "city": city,
        // "county": county,
        "contractno": contractno,
        "projectname": projectname,
        "worktype": worktype,
        "workitem": workitem,
        "clientname": clientname,
        "dutyname": dutyname,
        "salename": salename,
        "department": department,
        "membername": membername,
        "user": "admin"
    }
    // console.log(data);
    postRequest('/select_option/', {
        "data": JSON.stringify(data)
    }, function (data) {
        console.log(data);
        if (data.result == 1 || data.result == '1') {
            $("#shaixuan").removeClass('showPopup');
            $(".md-overlay").removeClass('showOverlay');
            var html = '';
            if (data.data.length) {
                workdetailset = data.data;
                if (workdetailset.length < 17) {
                    var daysTotal = 0;
                    var counttotal = 0;
                    var monthTotal1 = 0;
                    var fixcost = 0;
                    var serialNummber=0;
                    $("#paging").hide();
                    $.each(workdetailset, function (i, v) {
                        var address = v.province + v.city;
                        var workdate = (v.workdate).slice(0,10);
                        var count = 0;
                        serialNummber++;
                        $.each(v.othercost, function (j, k) {
                            //html += '<td>' + k.fee + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                            })
                        // if(v.request == null || v.request == ""){
                                // request = '无';
                            // } else{
                                // request = v.request;
                            // }
                        html += '\
                        <tr>\
                            <td>'+ serialNummber +'</td>\
                            <td>'+ workdate + '</td>\
                            <td>'+ (v.endtime).slice(0,10) + '</td>\
                            <td>'+ address + '</td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.clientname + '</td>\
                            <td>'+ v.department + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.salename + '</td>\
                            <td>'+ v.worktype + '</td>\
                            <td>'+ v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>\
                            <td>'+v.membername +'</td>\
                            <td>'+ v.workload + '</td>\
                            <td>'+ v.level + '</td>\
                            <td>'+ (count/100).toFixed(2) + '</td>\
                            <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                            <td><a href="javascript:;" title="删除" ><button type="button" class="dongjie">删除</button></a></td>';
                        html += '</tr>';
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                        counttotal += count;
                        fixcost = fixcost+parseFloat(v.fixedcost);
                    })
                    var daysTotal = daysTotal.toFixed(2);
                    // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                    // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                            var fixedcostTotal = fixcost;
                    var othercostTotal = counttotal/100;
                    var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                    $(".daysTotal").html(toMoney(daysTotal));
                    $(".monthTotal").html(toMoney(monthTotal));
                    $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                    $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                    $(".allTotal").html(toMoney(allTotal) + '元');
                    $("#show_all").html(html);
                } else {
                    $("#paging").show();
                    var html = '<div class="pagebox" id="pagebox"></div>';
                    $("#paging").html(html);
                    var total = workdetailset.length;
                    var pagenum = Math.ceil(total / 17);
                    $('#pagebox').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            // console.log(page);
                            var html = '';
                            var min = (page - 1) * 17;
                            var max = page * 17;
                            var daysTotal = 0;
                            var counttotal = 0;
                            var monthTotal1 = 0;
                            var fixcost = 0;
                            var serialNummber=0;
                            $.each(workdetailset, function (i, v) {
                                var address = v.province + v.city;
                                var workdate = (v.workdate).slice(0,10);
                                var count = 0;
                                serialNummber++;
                                $.each(v.othercost, function (j, k) {
                                    //html += '<td>' + k.fee + '</td>';
                                    count += Math.floor(parseFloat(k.fee)*100);
                                })
                                // if(v.request == null || v.request == ""){
                                    // request = '无';
                                // } else{
                                    // request = v.request;
                                // }
                                html += '\
                                <tr>\
                                    <td>'+ serialNummber +'</td>\
                                    <td>'+ workdate + '</td>\
                                    <td>'+ (v.endtime).slice(0,10) + '</td>\
                                    <td>'+ address + '</td>\
                                    <td>'+ v.contractno + '</td>\
                                    <td style="text-align: left;">'+ v.projectname + '</td>\
                                    <td>'+ v.clientname + '</td>\
                                    <td>'+ v.department + '</td>\
                                    <td>'+ v.dutyname + '</td>\
                                    <td>'+ v.salename + '</td>\
                                    <td>'+ v.worktype + '</td>\
                                    <td>'+ v.workitem + '</td>\
                                    <td style="text-align: left;">'+ v.workcontent + '</td>\
                                    <td style="text-align: left;">'+ v.toresult + '</td>\
                                    <td>'+v.membername +'</td>\
                                    <td>'+ v.workload + '</td>\
                                    <td>'+ v.level + '</td>\
                                    <td>'+ (count/100).toFixed(2) + '</td>\
                                    <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                                    <td><a href="javascript:;" title="删除" ><button type="button" class="dongjie">删除</button></a></td>';
                                html += '</tr>';
                                daysTotal += parseFloat(v.workload);
                                monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                                counttotal += count;
                                fixcost = fixcost+parseFloat(v.fixedcost);
                            })
                            var daysTotal = daysTotal.toFixed(2);
                            // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                            // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                            var fixedcostTotal = fixcost;
                            var othercostTotal = counttotal/100;
                            var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                            $(".daysTotal").html(toMoney(daysTotal));
                            $(".monthTotal").html(toMoney(monthTotal));
                            $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                            $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                            $(".allTotal").html(toMoney(allTotal) + '元');
                            $("#show_all").html(html);
                            $("#show_all").children('tr').each(function (index, value) {
                                if (index >= min && index < max) {
                                    // console.log(index);
                                    $(this).show();
                                } else {
                                    $(this).hide();
                                }
                            })
                        }
                    })
                }
            } else {
                $(".daysTotal").html(0.00);
                $(".monthTotal").html(0.00);
                $(".fixedcostTotal").html(0.00 + '元');
                $(".othercostTotal").html(0.00 + '元');
                $(".allTotal").html(0.00 + '元');
                $("#show_all").html('<tr><td colspan="21">暂无数据</td></tr>');
                $("#paging").hide();
            }
        } else {
            myalert('系统提示框',"筛选失败")
        }
    }, function (err) {
        console.log(err);
    })
}
//重置按钮
function resetchoose(){
    // console.log(dataset);
    var html1 = '<option value="">请选择</option>';
    var html2 = '<option value="">请选择</option>';
    var html3 = '<option value="">请选择</option>';
    var html4 = '<option value="">请选择</option>';
    var html5 = '<option value="">请选择</option>';
    var html6 = '<option value="">市/区</option>';
    var html7 = '<option value="">省/市</option>';
    var html8 = '<option value="">请选择</option>';
    var html9 = '<option value="">请选择</option>';
    var html10 = '<option value="">请选择</option>';
    var val1 = [];
    var val2 = [];
    var val3 = [];
    var val4 = [];
    var val5 = [];
    $.each(dataset, function (i, v) {
        val1.push(v.clientname);
        val2.push(v.salename);
        val3.push(v.department);
        val4.push(v.dutyname);
        html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
        html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
    });
    $.each(worktypeset, function (i, v) {
        val5.push(v.worktype)
    });
    var val11 = unique(val1);
    var val22 = unique(val2);
    var val33 = unique(val3);
    var val44 = unique(val4);
    var val55 = unique(val5);
    // postRequest('/sort_clientname/', {
        // "data": JSON.stringify(val11)
    // }, function (data) {
        // if (data.result=='1'||data.result==1){
            // $.each(data.data, function (i, v) {
                // html3 += '<option value="' + v + '">' + v + '</option>';
                
            // });
            // $("#clientname").html(html3);
        // }
    // }, function (err){
        // console.log(err);
    // });
    // $.each(val11, function (i, v) {
        // html3 += '<option value="' + v + '">' + v + '</option>';
    // });
    $.each(val22, function (i, v) {
        html4 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val33, function (i, v) {
        html5 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val44, function (i, v) {
        html8 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val55, function (i, v) {
        html9 += '<option value="' + v + '">' + v + '</option>';
    });
    $("input[name='starttime']").val('');
    $("input[name='endtime']").val('');
    $("input[name='cont_write']").val('');
    $("input[name='projectname_write']").val('');
    $("#cont").html(html1);
    $("#projectname").html(html2);
    // $("#clientname").html(html3);
    $("#sell").html(html4);
    $("#department").html(html5);
    $("#city").html(html6);
    $("#dutyname").html(html8);
    $("#worktype").html(html9);
    $("#workitem").html(html10);
    $(".searchable-select-holder").html('省/市');
    $("select[name='cont'] option").eq(0).attr('selected', 'selected');
    $("select[name='site'] option").eq(0).attr('selected', 'selected');
    $("select[name='site'] option").eq(0).prop('selected', 'selected');
    $("select[name='city'] option").eq(0).attr('selected', 'selected');
    var all_searchable_select_item = $(".searchable-select-items").find("div")
    for(var i = 0 ; i < all_searchable_select_item.length ; i++){
        all_searchable_select_item.eq(i).removeClass("selected");
    };
    $("select[name='staffname'] option").eq(0).attr('selected', 'selected');
    $("select[name='staffname'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
    $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
    stime = '';
    etime = '';
}
//新消息
function select_option_flag(a){
    postRequest('/select_option_flag/',{
        
    },function(data){
        if(data.result == 1 || data.result == '1'){
            $(".header-btn-tishi").html(data.data.length);
            if (data.data.length !=0){
                $(".header-btn-tishi").css("color","red");
            }else {
                $(".header-btn-tishi").css("color","#fff");
            }
            $("#tishi").click (function(){
                $(".perMg3").children('ul').removeClass('libg');
                $("#search_btn1").addClass("display_none");
                $("#dataMg").addClass('libg');
                $("#dataMg").siblings().removeClass('libg');
                $("#project_daily").addClass('libg');
                $("#project_daily").siblings().removeClass('libg');
                $("#systemMg").removeClass('libg');
                $("#saleMg").removeClass('libg');
                $("#project_all").removeClass('libg');
                $("#prj_reportMg").removeClass('libg');
                $("#archiveMg").removeClass('libg');
                $("#equipmentMg").removeClass('libg');
                $(".dataMgBox").show();
                $(".dataMgBox").siblings().hide();
                if ($("#title_contractno").length>0){
                    $("#title_project").get(0).removeChild($("#title_contractno").get(0))
                }
                if ($("#title_clientname").length>0){
                    $("#title_project").get(0).removeChild($("#title_clientname").get(0))
                }
                if ($("#title_department").length>0){
                    $("#title_project").get(0).removeChild($("#title_department").get(0))
                }
                if ($("#title_salename").length>0){
                    $("#title_project").get(0).removeChild($("#title_salename").get(0))
                } 
                if ($("#title_username").length>0){//移除原来的人员姓名
                    $("#title_project").get(0).removeChild($("#title_username").get(0))
                }
                if ($("#title_username_tishi").length==0){//新加人员姓名到项目负责人后面
                    $("#title_dutyname").after('<th id="title_username_tishi">人员姓名</th>');
                }
                display_news(data);
            });
            if (a==null){
                //a用于判断“查看”是否被点击，被点击，执行上面click代码，未被点击（通过/退回）执行下面的else
            }else {
                display_news(data);
            }
        }
    },function(err){
        console.log(err);
    })
}
//返回按键
function fanhui(){
    resetchoose();
    $("#paging").show();
    if ($("#title_username_tishi").length>0){//移除原来的人员姓名
        $("#title_project").get(0).removeChild($("#title_username_tishi").get(0))
    }
    if ($("#title_contractno").length==0){
        $("#title_address").after('<th id="title_contractno">合同编号</th>');
    }
    if ($("#title_clientname").length==0){
        $("#title_projectname").after('<th id="title_clientname">客户名称</th>');
    }
    if ($("#title_department").length==0){
        $("#title_dutyname").before('<th id="title_department">所属部门</th>');
    }
    if ($("#title_username").length==0){
        $("#title_workload").before('<th id="title_username">人员姓名</th>');
    }
    if ($("#title_salename").length==0){
        $("#title_worktype").before('<th id="title_salename">销售负责人</th>');
    }
    
    $("#search_btn1").removeClass("display_none");
    $("#dataMg").addClass('libg');
    $("#systemMg").removeClass('libg');
    $("#saleMg").removeClass('libg');
    $("#datatrack").removeClass('libg');
    $(".dataMgBox").show();
    $(".systemBox").hide();
    $(".dutyBox").hide();
    $(".saleBox").hide();
    $(".dataTrackBox").hide();
    $(".tips").hide();
    // showAll();
    produce_page_for_showAll();//显示翻页
    showAll_query(1);//展示第一页
}
//展示周报消息//只有筛选后的数据用了，可以优化减少代码去掉if……
function display_news(data){
    if($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    if($("#pagebox2").length>0){
        $("#paging2").get(0).removeChild($("#pagebox2").get(0));
    }
    var html = '';
    if (data.data.length) {
        // console.log(data.data.length);
        workdetailset = data.data;
        if (workdetailset.length < 17) {
            var daysTotal = 0;
            var counttotal = 0;
            var monthTotal1 = 0;
            var fixcost = 0;
            var serialNummber=0;
            $("#paging").hide();
            $.each(workdetailset, function (i, v) {
                serialNummber++;
                var address = v.province + v.city;
                var workdate = (v.workdate).slice(0,10);
                var count = 0;
                $.each(v.othercost, function (j, k) {
                    //html += '<td>' + k.fee + '</td>';
                    count += Math.floor(parseFloat(k.fee)*100);
                    })
                // if(v.request == null || v.request == ""){
                        // request = '无';
                    // } else{
                        // request = v.request;
                    // }
                html += '\
                <tr>\
                    <td>'+ serialNummber +'</td>\
                    <td>'+ workdate + '</td>\
                    <td>'+ (v.endtime).slice(0,10) + '</td>\
                    <td>'+ address + '</td>';
                if($("#title_contractno").length>0){
                    html += '<td>' + v.contractno + '</td>';
                }
                html += '<td style="text-align: left;">'+ v.projectname + '</td>';
                if($("#title_clientname").length>0){
                    html += '<td>' + v.clientname + '</td>';
                }
                if($("#title_department").length>0){
                    html += '<td>' + v.department + '</td>';
                }
                html += '<td>' + v.dutyname + '</td>';
                if($("#title_username_tishi").length>0){
                    html += '<td>' + v.membername + '</td>';
                }
                if($("#title_salename").length>0){
                    html += '<td>' + v.salename + '</td>';
                }
                html +='\
                    <td>'+ v.worktype + '</td>\
                    <td>'+ v.workitem + '</td>\
                    <td style="text-align: left;">'+ v.workcontent + '</td>\
                    <td style="text-align: left;">'+ v.toresult + '</td>';
                if($("#title_username").length>0){
                    html += '<td>' + v.membername + '</td>';
                }
                html +=
                    '\<td>'+ v.workload + '</td>\
                    <td>'+ v.level + '</td>\
                    <td>'+ (count/100).toFixed(2) + '</td>\
                    <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                    <td><a href="javascript:;" title="确认" onclick="change_flag_0(\'' + v.id +'\')">\
                    <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                    onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                html += '</tr>';
                daysTotal += parseFloat(v.workload);
                monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                counttotal += count;
                fixcost = fixcost + parseFloat(v.fixedcost);
            })
            var daysTotal = daysTotal.toFixed(2);
            // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
            // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                            var fixedcostTotal = fixcost;
            var othercostTotal = counttotal/100;
            var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
            $(".daysTotal").html(toMoney(daysTotal));
            $(".monthTotal").html(toMoney(monthTotal));
            $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
            $(".othercostTotal").html(toMoney(othercostTotal) + '元');
            $(".allTotal").html(toMoney(allTotal) + '元');
            $("#show_all").html(html);
        } else {
            $("#paging").show();
            var html = '<div class="pagebox" id="pagebox"></div>';
            $("#paging").html(html);
            var total = workdetailset.length;
            var pagenum = Math.ceil(total / 17);
            $('#pagebox').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    // console.log(page);
                    var html = '';
                    var min = (page - 1) * 17;
                    var max = page * 17;
                    var daysTotal = 0;
                    var counttotal = 0;
                    var monthTotal1 = 0;
                    var fixcost = 0;
                    var serialNummber=0;
                    $.each(workdetailset, function (i, v) {
                        serialNummber++;
                        var address = v.province + v.city;
                        var workdate = (v.workdate).slice(0,10);
                        var count = 0;
                        $.each(v.othercost, function (j, k) {
                            //html += '<td>' + k.fee + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                        })
                        // if(v.request == null || v.request == ""){
                            // request = '无';
                        // } else{
                            // request = v.request;
                        // }
                        html += '\
                        <tr>\
                            <td>'+ serialNummber +'</td>\
                            <td>'+ workdate + '</td>\
                            <td>'+ (v.endtime).slice(0,10) + '</td>\
                            <td>'+ address + '</td>';
                            if($("#title_contractno").length>0){
                                html += '<td>' + v.contractno + '</td>';
                            }
                            html += '<td style="text-align: left;">'+ v.projectname + '</td>';
                            if($("#title_clientname").length>0){
                                html += '<td>' + v.clientname + '</td>';
                            }
                            if($("#title_department").length>0){
                                html += '<td>' + v.department + '</td>';
                            }
                            html += '<td>' + v.dutyname + '</td>';
                            if($("#title_username_tishi").length>0){
                                html += '<td>' + v.membername + '</td>';
                            }
                            if($("#title_department").length>0){
                                html += '<td>' + v.salename + '</td>';
                            }
                        html +='\
                            <td >'+ v.worktype + '</td>\
                            <td >'+ v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>';
                        if($("#title_username").length>0){
                            html += '<td>' + v.membername + '</td>';
                        }
                        html +='\
                            <td >'+ v.workload + '</td>\
                            <td >'+ v.level + '</td>\
                            <td >'+ (count/100).toFixed(2) + '</td>\
                            <td >'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                            <td ><a href="javascript:;" title="确认" onclick="change_flag_0(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                            onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                        html += '</tr>';
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload)* parseFloat(v.level));
                        counttotal += count;
                        fixcost= fixcost+parseFloat(v.fixedcost);

                    })
                    var daysTotal = daysTotal.toFixed(2);
                    // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                    // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000 * 100) / 100;
                    var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                    // var fixedcostTotal = monthTotal * 12000;
                    var fixedcostTotal = fixcost;
                    var othercostTotal = counttotal/100;
                    var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                    $(".daysTotal").html(toMoney(daysTotal));
                    $(".monthTotal").html(toMoney(monthTotal));
                    $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                    $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                    $(".allTotal").html(toMoney(allTotal) + '元');
                    $("#show_all").html(html);
                    $("#show_all").children('tr').each(function (index, value) {
                        if (index >= min && index < max) {
                            // console.log(index);
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    })
                }
            })
        }
    } else {
        $(".daysTotal").html(0.00);
        $(".monthTotal").html(0.00);
        $(".fixedcostTotal").html(0.00 + '元');
        $(".othercostTotal").html(0.00 + '元');
        $(".allTotal").html(0.00 + '元');
        $("#show_all").html('<tr><td colspan="21">暂无数据</td></tr>');
        $("#paging").hide();
    }
}
//确认
function change_flag_0(id){
    var data_id = { "id": [id] };
    postRequest('/change_flag/', {
        "data_id": JSON.stringify(data_id)
    }, function (data_id) {
        console.log(data_id);
        if (data_id.result == 1 || data_id.result == '1') {
            select_option_flag(data_id.result);
        }
    }, function (err) {
        console.log(err);
    })
}
//退回
function change_flag_3(){
    var id = $("input[name=returnreasons_id]").val();
    if(($("textarea[name='reasonscontent']").val())!=''){
        var reasonscontent = $("#headername").html()+ '：' + $("textarea[name='reasonscontent']").val();
        var data_id = { "id": id,"reasonscontent": reasonscontent};
        postRequest('/change_flag_3/', {
            "data_id": JSON.stringify(data_id)
        }, function (data_id) {
            if (data_id.result == 1 || data_id.result == '1') {
                $("#alter_returnReasons").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                select_option_flag(data_id.result);
                
            }
        }, function (err) {
            console.log(err);
        })
    } else {
        myalert('系统提示框','原因不能为无！');
    }
}
//修改密码确认
function update_password(){
    console.log(persondata);
    var firstpassword = $("input[name='firstpassword']").val();
    var newpassword = $("input[name='newpassword']").val();
	var renewpassword = $("input[name='renewpassword']").val();
    // console.log(firstpassword);
    if(firstpassword==''||newpassword==""||renewpassword==''){
        myalert('系统提示框',"数据不能为空")
    }else{
        if (newpassword!=renewpassword){
            myalert('系统提示框',"两次密码输入不一致！请重新输入")
        }else{
            myconfirm('系统提示框','确定修改密码？修改后请重新登入', function(r){
                if(r){
                    if (firstpassword == persondata.password) {
                        if (firstpassword == newpassword) {
                            myalert('系统提示框','新密码与旧密码相同，请重新输入');
                        } else {
                            var memberid = $("input[name='member_id']").val();
                            var data = {
                                "id": memberid,
                                "username": persondata.username,
                                "firstname": persondata.firstname,
                                "password": newpassword,
                                "level": persondata.level,
                                "type": persondata.type,
                                "role": persondata.role,
                                "position": persondata.position,
                                "status": persondata.status
                            }
                            // console.log(data);
                            postRequest('/update_user/', {
                                "data": JSON.stringify(data)
                            }, function (data) {
                                if (data.result == 1 || data.result == '1') {
                                    myalert('系统提示框','修改成功');
                                    $.cookie('username', 'null', { path: '/' });
                                    window.location.href = '/';
                                } else {
                                    myalert('系统提示框','修改失败');
                                }
                            }, function (err) {
                                console.log(err);
                            })
                        }
                    } else {
                        myalert('系统提示框','初始密码不一致，请重新输入');
                    }
                }
            });
        }
    }
}

//限制输入框为0~100的正整数
function check_postive_int(obj){
    obj.value = obj.value.replace(/[^\d]/g,""); //清除数字以外的字符
    obj.value = obj.value.replace(/[^0-9]+/g, "");
    if(obj.value>=0&&obj.value<=100){
        obj.value=obj.value;
    }else{
        obj.value=(obj.value).slice(0,2);
    }
}
//筛选合同进度表
function chooseinfo_ht(){
    var cont = $("#cont3").val()||'';
    var projectname = $("#projectname3").val()||'';
    var starttime = $("input[name='starttime3']").val();
    var endtime = $("input[name='endtime3']").val();
    var type = $("select[name='type3'] option:selected").val();
    var state = $("select[name='state3'] option:selected").val();
    var caigou = $("select[name='caigou3'] option:selected").val();
    var daohuo = $("select[name='daohuo3'] option:selected").val();
    // var shishi = $("select[name='shishi3'] option:selected").val();
    var clientname = $("select[name='clientname3'] option:selected").val();
    var dutyname = $("select[name='dutyname3'] option:selected").val();
    var salename = $("select[name='sell3'] option:selected").val();
    
    if($('#project_ing').hasClass('libg')){
        var data = {
            "cont": cont,
            "projectname": projectname,
            "starttime": starttime,
            "endtime":endtime,
            "type": type,
            "state": '进行中',
            "caigou": caigou,
            "daohuo": daohuo,
            // "shishi": shishi,
            "clientname": clientname,
            "dutyname": dutyname,
            "salename": salename,
        }
        displayTrack(data);
        select_ht_data=data;
    }
    if($('#project_all').hasClass('libg')){
        var data = {
            "cont": cont,
            "projectname": projectname,
            "starttime": starttime,
            "endtime":endtime,
            "type": type,
            "state": state,
            "caigou": caigou,
            "daohuo": daohuo,
            // "shishi": shishi,
            "clientname": clientname,
            "dutyname": dutyname,
            "salename": salename,
        }
        displayTrack(data);
        select_ht_data=data;
    }
    $("#shaixuan_ht").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
    
}
//前端筛选
function select_before(products, data){
    // console.log(data);
    
    // console.log(data.endtime);
    const ProductFilters = {
        /**
         * 区间类型筛选
         * @param {array<Product>} products
         * @param {array<{starttime: string, endtime: string}>} ranges
         */
        rangesFilter: function (products, ranges) {
            if (ranges.length === 0) {
                return products;
            } else {
                /**
                 * 循环多个区间条件，
                 * 每种区间类型应该只有一个
                 */
                for (let range of ranges) {
                    // 多个不同类型区间是与逻辑，可以直接赋值给自身
                    products = products.filter(function (item) {
                        return item.latestupdate.slice(0,10) >= range.starttime && item.latestupdate.slice(0,10) <= range.endtime;
                    });
                }
                return products;
            }
        },

        /**
         * 选择类型筛选
         * @param {array<Product>} products
         * @param {array<{type: String, state: String}>} chooses
         */
        choosesFilter: function (products, chooses) {
            
            if (chooses.length === 0) {
                products = products;
            } else {
                for (let choice of chooses) {
                    for(var i in choice){//用javascript的for/in循环遍历对象的属性 
                        temp = i;
                        if (temp == 'shishiqingkuang'){//实施情况是后期加的字段原来的数据中无这个字段的值（null），在下面的indexOF时会报错。
                            if(choice[i]!=''){
                                // console.log(choice[i]);
                                products = products.filter(function (item) {
                                    if (item.shishiqingkuang != null){
                                        // console.log(item.shishiqingkuang);
                                        for(var j in item){
                                            if(j==i){
                                                testya=item[j];
                                            }
                                        }
                                        return testya.indexOf(choice[i]) !== -1;
                                    }
                                });
                            }
                        }else{
                            if(choice[i]!=''){
                                // console.log(choice[i]);
                                products = products.filter(function (item) {
                                    // console.log(item.shishiqingkuang);
                                    for(var j in item){
                                        if(j==i){
                                            testya=item[j];
                                        }
                                    }
                                    return testya.indexOf(choice[i]) !== -1;
                                });
                            }
                        }
                    }
                }
            }
            return products;
        }
    }
     if (data.starttime!=''&&data.endtime!=''){
        data={
            ranges: [
                {
                    "starttime": data.starttime,
                    "endtime": data.endtime,
                }
            ],  
            chooses: [
                {
                    "contractno": data.cont
                },
                {
                    "projectname": data.projectname
                },
                {
                    "type": data.type
                },
                {
                    "state": data.state
                },
                {
                    "caigouzhuangtai": data.caigou
                },
                {
                    "arrival_status": data.daohuo
                },
                // {
                    // "shishiqingkuang": data.shishi
                // },
                {
                    "clientname": data.clientname
                },
                {
                    "dutyname": data.dutyname
                },
                {
                    "salename": data.salename,
                }
            ]
        }
    }else{
        if (data.starttime!=''){
            data={ 
                chooses: [
                    {
                        "contractno": data.cont
                    },
                    {
                        "projectname": data.projectname
                    },
                    {
                        "latestupdate": data.starttime,
                    },
                    {
                        "type": data.type
                    },
                    {
                        "state": data.state
                    },
                    {
                        "caigouzhuangtai": data.caigou
                    },
                    {
                        "arrival_status": data.daohuo
                    },
                    // {
                        // "shishiqingkuang": data.shishi
                    // },
                    {
                        "clientname": data.clientname
                    },
                    {
                        "dutyname": data.dutyname
                    },
                    {
                        "salename": data.salename,
                    }
                ]
            }
        }else if (data.endtime!=''){
            data={ 
                chooses: [
                    {
                        "contractno": data.cont
                    },
                    {
                        "projectname": data.projectname
                    },
                    {
                        "latestupdate": data.endtime,
                    },
                    {
                        "type": data.type
                    },
                    {
                        "state": data.state
                    },
                    {
                        "caigouzhuangtai": data.caigou
                    },
                    {
                        "arrival_status": data.daohuo
                    },
                    // {
                        // "shishiqingkuang": data.shishi
                    // },
                    {
                        "clientname": data.clientname
                    },
                    {
                        "dutyname": data.dutyname
                    },
                    {
                        "salename": data.salename,
                    }
                ]
            }
        }else{
            data={ 
                chooses: [
                    {
                        "contractno": data.cont
                    },
                    {
                        "projectname": data.projectname
                    },
                    {
                        "type": data.type
                    },
                    {
                        "state": data.state
                    },
                    {
                        "caigouzhuangtai": data.caigou
                    },
                    {
                        "arrival_status": data.daohuo
                    },
                    // {
                        // "shishiqingkuang": data.shishi
                    // },
                    {
                        "clientname": data.clientname
                    },
                    {
                        "dutyname": data.dutyname
                    },
                    {
                        "salename": data.salename,
                    }
                ]
            }
        }
    }
    for(key in data){
        if (ProductFilters.hasOwnProperty(key + 'Filter') && typeof ProductFilters[key + 'Filter'] === 'function') {
            products = ProductFilters[key + 'Filter'](products, data[key]);
        }
    }
    return products
}
//显示工作类型
function displayWorktype(){
    postRequest('/display_worktype/',{
        
    },function(data){
        // console.log(data);
        if(data.result==1||data.result=='1'){
            worktypeset = data.data
            if(data.data.length){
                var html7 = '<option value="">请选择</option>';
                var val7 = [];
                $.each(data.data, function (i, v) {
                    val7.push(v.worktype)
                })
                // console.log(html7);
                var val77 = unique(val7);
                $.each(val77, function (i, v) {
                    html7 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#worktype").html(html7);
            }
        }
    },function(err){
        console.log(err);
    })
}
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
//显示项目周报提交的情况
function display_project_report(){
    var data = {};
    postRequest('/display_project_report/',{
        "data":JSON.stringify(data)
    },function (data){
        if (data.result==1||data.result=='1'){
            // console.log(data.data);
            reportdata = data.data;
            var html = '';
            var arr = reportdata.pro_update.concat();
            for(var i=0;i<reportdata.pro_report.length;i++){
                arr.indexOf(reportdata.pro_report[i]) === -1 ? arr.push(reportdata.pro_report[i]) : 0;
            }
            postRequest('/sort_report_serial_number/',{
                    'data':JSON.stringify({'data':arr})
                },function(data){
                    if (data.result == '1' || data.result == 1){
                        var num = '';
                        $.each(data.data,function(i,v){
                            if(num == v.serial_number){
                                var year = v.serial_number.slice(0,4);//年
                                var month = v.serial_number.slice(4,6);//月
                                var day = v.serial_number.slice(6,8);//日
                                var hh = v.serial_number.slice(8,10);//时
                                var mm = v.serial_number.slice(10,12);//分
                                var clock = year + '年' + month + '月' + day + '日' + hh + '时' + mm + '分';
                                html += '<tr><td>'+clock+'</td><td>'+v.username+'</td><td>'+v.contractno+'</td><td style="text-align:left">'+v.projectname+'</td><td><a href="javascript:;" title="查看" onclick="show_project_report(\''+v.username+'\',\'' + v.serial_number +'\')"><button type="button" class="xiugai">查看</button></a></td></tr>' ;
                            }else{
                                num = v.serial_number;
                                html +='<tr><td style="border:none;"></td></tr>';
                                var year = v.serial_number.slice(0,4);//年
                                var month = v.serial_number.slice(4,6);//月
                                var day = v.serial_number.slice(6,8);//日
                                var hh = v.serial_number.slice(8,10);//时
                                var mm = v.serial_number.slice(10,12);//分
                                var clock = year + '年' + month + '月' + day + '日' + hh + '时' + mm + '分' ;
                                html += '<tr><td>'+clock+'</td><td>'+v.username+'</td><td>'+v.contractno+'</td><td style="text-align:left">'+v.projectname+'</td><td><a href="javascript:;" title="查看" onclick="show_project_report(\''+v.username+'\',\'' + v.serial_number +'\')"><button type="button" class="xiugai">查看</button></a></td></tr>' ;
                                
                            }
                            $("#show_prj_report").html(html);
                        });
                    }
                });
            
            
        }
    });
}
//查看项目周报信息
function show_project_report(user,str){
    signout();
    $("#show_prj_rep").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    //设置高度
    var oH = $("#show_prj_rep").find(".popup-Content-box").height();
    $("#show_prj_rep").css('max-height', oH);
    $("#show_prj_rep").siblings('.popup-Box').css('height', 'auto');
    
    $("#Serial_number").html(str);
    $("#dutyname2").html(user);
    var num1 = parseFloat(str.slice(14,16))-1;
    var num2 = parseFloat(str.slice(16,18))-1;
    for (var i =0 ; i < num1 ; i++){
        var html = '';
        var j = i + 2 ;
        var classname = '.border'+j;
        if ($(classname).length<1){
            html = 
                '<div class="border'+j+'" id="increase_project_box'+j+'"  style="border:1px solid #b9c5e1;">\
                    <div class="clear div-margin" >\
                        <div class="col-xs-1 text-center">\
                            <label>合同编号</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" id="cont2'+j+'" name="cont2'+j+'" disabled="disabled">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <input class="form-control" id="projectname2'+j+'" name="projectname2'+j+'" disabled="disabled">\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>归档情况%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="guidang2'+j+'" name="guidang2'+j+'" oninput="check_postive_int(this)" maxlength="3" disabled="disabled">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>货物清点</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" id="huowu2'+j+'" name="huowu2'+j+'" disabled="disabled">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>初验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" id="chuyan2'+j+'" name="chuyan2'+j+'" disabled="disabled">\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>终验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" id="zhongyan2'+j+'" name="zhongyan2'+j+'" disabled="disabled">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>已开票%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="yikaipiao2'+j+'" name="yikaipiao2'+j+'" oninput="check_postive_int(this)" maxlength="3" disabled="disabled">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>已收款%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="yishoukuan2'+j+'" name="yishoukuan2'+j+'" oninput="check_postive_int(this)" maxlength="3" disabled="disabled">\
                        </div>\
                    </div>\
                </div>';
            var x = i + 1;
            var idname = '#increase_project_box'+x;
            $(idname).after(html);
            var oH = $("#show_prj_rep").find(".popup-Content-box").height();
            $("#show_prj_rep").css('max-height', oH);
        }
    }
    for (var a =0 ; a < num2 ; a++){
        var b = a + 2;
        var classname = '.border1'+b;
        if ($(classname).length<1){
            html = 
                '<div class="border1'+b+'" id="increase_project_box1'+b+'" style="border:1px solid #b9c5e1;">\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>合同编号</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" id="cont3'+b+'" name="cont3'+b+'" disabled="disabled" >\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <input class="form-control" id="projectname3'+b+'" name="projectname3'+b+'" disabled="disabled">\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>上周动态</label>\
                        </div>\
                        <div class="col-xs-9">\
                           <input class="form-control" type = "text" id = "Last_week_trends3'+b+'" name="Last_week_trends3'+b+'" disabled="disabled">\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>下周计划</label>\
                        </div>\
                        <div class="col-xs-9">\
                            <input class="form-control" type = "text" id = "Next_week_plan3'+b+'" name="Next_week_plan3'+b+'" disabled="disabled">\
                        </div>\
                    </div>\
                </div>';
            var y = a + 1 ;
            var idname = '#increase_project_box1'+y;
            $(idname).after(html);
            var oH = $("#show_prj_rep").find(".popup-Content-box").height();
            $("#show_prj_rep").css('max-height', oH);
        }
    }
    var data_pro_update = [];
    var data_pro_report = [];
    $.each(reportdata.pro_update,function(i,v){
        if (v.serial_number == str){
            data_pro_update.push(v);
        }
    })
    // console.log(data_pro_update);
    for (var i =0 ; i < (num1+1) ; i++){
        var j = i + 1 ;
        $.each(data_pro_update,function(index,obj){
            if(obj.pro_update_order == j ){
                var cont_name = 'cont2'+j;
                var projectname_name = 'projectname2'+j;
                var guidang_name = 'guidang2'+j;
                var huowu_name = 'huowu2'+j;
                var chuyan_name = 'chuyan2'+j;
                var zhongyan_name = 'zhongyan2'+j;
                var yikaipiao_name = 'yikaipiao2'+j;
                var yishoukuan_name = 'yishoukuan2'+j;
                $("input[name='"+cont_name+"']").val(obj.contractno);
                $("input[name='"+projectname_name+"']").val(obj.projectname);
                $("input[name='"+guidang_name+"']").val((obj.archiving_situation*100).toFixed(0));
                $("input[name='"+huowu_name+"']").val(obj.cargo_inventory);
                $("input[name='"+chuyan_name+"']").val(obj.preliminary_report);
                $("input[name='"+zhongyan_name+"']").val(obj.final_report);
                $("input[name='"+yikaipiao_name+"']").val((obj.invoiced*100).toFixed(0));
                $("input[name='"+yishoukuan_name+"']").val((obj.receivable*100).toFixed(0));
                
            }
        });
    }
    
    $.each(reportdata.pro_report,function(j,w){
        if (w.serial_number == str){
            data_pro_report.push(w);
        }
    })
    // console.log(data_pro_report);
    for (var a =0 ; a < (num2+1) ; a++){
        var b = a + 1 ;
        $.each(data_pro_report,function(index,obj){
            if(obj.pro_report_order == b ){
                var cont_name = 'cont3'+b;
                var projectname_name = 'projectname3'+b;
                var last_week_trends_name = 'Last_week_trends3'+b;
                var next_week_plan_name = 'Next_week_plan3'+b;
                $("input[name='"+cont_name+"']").val(obj.contractno);
                $("input[name='"+projectname_name+"']").val(obj.projectname);
                $("input[name='"+last_week_trends_name+"']").val(obj.last_week_trends);
                $("input[name='"+next_week_plan_name+"']").val(obj.next_week_plan);
                
            }
        });
    }
}
//关闭项目周报弹窗并清除数据
function signout(){
    var serial_number = $("#Serial_number").html();
    var num1 = parseFloat(serial_number.slice(14,16));
    var num2 = parseFloat(serial_number.slice(16,18));
    for (var i = 0 ; i < num1 ; i++){
        var a = i+1;
        var cont_name = "cont2"+a;
        var projectname_name = "projectname2"+a;
        var guidang_name = "guidang2"+a;
        var huowu_name = "huowu2"+a;
        var chuyan_name = "chuyan2"+a;
        var zhongyan_name = "zhongyan2"+a;
        var yikaipiao_name = "yikaipiao2"+a;
        var yishoukuan_name = "yishoukuan2"+a;
        $("select[name='"+cont_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+cont_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+projectname_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+projectname_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='"+guidang_name+"']").val('');
        $("select[name='"+huowu_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+huowu_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+chuyan_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+chuyan_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+zhongyan_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+zhongyan_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='"+yikaipiao_name+"']").val('');
        $("input[name='"+yishoukuan_name+"']").val('');
        var x = i + 2;
        var border = ".border"+x;
        if($(border).length>0){
            $(border).remove();
        }
    }
    for (var j = 0 ; j < num2 ; j++){
        var b = j+1;
        var cont_name = "cont3"+b;
        var projectname_name = "projectname3"+b;
        var last_week_trends_name = "Last_week_trends3"+b;
        var next_week_plan_name = "Next_week_plan3"+b;
        $("select[name='"+cont_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+cont_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+projectname_name+"'] option").eq(0).attr('selected','selected');
        $("select[name='"+projectname_name+"'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='"+last_week_trends_name+"']").val('');
        $("input[name='"+next_week_plan_name+"']").val('');
        var y = j + 2;
        var border = ".border1"+y;
        if($(border).length>0){
            $(border).remove();
        }
    }
    $("#dutyname2").html('XXX');
    $("#Serial_number").html('XXX');
    
    $("#show_prj_rep").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
    
}
//上传合同
function uploadtstatus_ht(obj,id,str){
    if(str){//该项目无合同时，上传合同文件（obj，id，str）
        var now = new Date();
        var hash = randomChar(str)+ now.getMinutes()+now.getSeconds();
        $($(obj).children('input')).attr('id','cont_input');
        var cont_input = document.getElementById("cont_input");
        $("#cont_input").unbind('change').change(function(event){
            var files = cont_input.files;
            var file = new FormData();
            // file.append('file',files);
            $.each(files,function(i,v){
                file.append('file',v);
            })
            file.append('name',hash);
            $.ajax({
                url: "/upload_contract/",
                type:"POST",
                data: file,
                processData:false,
                contentType:false,            
                success: function(data){
                    console.log(data);
                    if(data.result == '1' || data.result == 1){
                        postRequest('/change_cont_status_OK/',{
                            'data1':JSON.stringify({'id':id,'name':hash})
                        },function(data1){
                            if(data1.result == 1||data1.result == '1'){
                                myalert('系统提示框','上传合同成功');
                                $($(obj).children('input')).removeAttr('id');
                                $.each(dataset1,function(i,v){
                                    if(v.id==id){
                                        v.cont_status = 'OK';
                                        v.cont_name = hash
                                        // if (v.cont_name==null||v.cont_name==''){
                                            // v.cont_name = data.name
                                        // }else{
                                            // v.cont_name = v.cont_name+';'+data.name
                                        // }
                                    }
                                });
                                $.each(dataset,function(i,v){
                                    if(v.id==id){
                                        v.cont_status = 'OK';
                                        v.cont_name = hash
                                        // if (v.cont_name==null||v.cont_name==''){
                                            // v.cont_name = data.name
                                        // }else{
                                            // v.cont_name = v.cont_name+';'+data.name
                                        // }
                                    }
                                });
                                
                                if( $('.datatrack').attr('id') == 'project_ing'){
                                    var tmp = select_ht_data;
                                    tmp['state']='进行中';
                                    displayTrack(tmp);
                                }else{
                                    displayTrack(select_ht_data);
                                }
                               
                            }
                        });
                    }else{
                        myalert('系统提示框','上传合同失败');
                        $($(obj).children('input')).removeAttr('id');
                    }
                }
            });
        });
    } else{//有合同时追加合同文件（obj，id）
        $($(obj).children('input')).attr('id','cont_input');
        var cont_input = document.getElementById("cont_input");
        $("#cont_input").unbind('change').change(function(event){
            var files = cont_input.files;
            var file = new FormData();
            // file.append('file',files);
            $.each(files,function(i,v){
                file.append('file',v);
            })
            file.append('id',id)
            $.ajax({
                url: "/upload_contract1/",
                type:"POST",
                data: file,
                processData:false,
                contentType:false,            
                success: function(data){
                    console.log(data);
                    if(data.result == '1' || data.result == 1){
                        myalert('系统提示框','上传合同成功');
                        $($(obj).children('input')).removeAttr('id');
                        if( $('.datatrack').attr('id') == 'project_ing'){
                            var tmp = select_ht_data;
                            tmp['state']='进行中';
                            displayTrack(tmp);
                        }else{
                            displayTrack(select_ht_data);
                        }
                    }else{
                        myalert('系统提示框','上传合同失败');
                        $($(obj).children('input')).removeAttr('id');
                    }
                }
            });
        });
    }
        
}
//下载合同
function gettype_ht(obj,cont_name){
    // arr = cont_name.split(';');
    postRequest('/download_ht/',{
        'data':JSON.stringify({'filenames':cont_name})
    },function(data){
        if(data.result==1||data.result=='1'){
            var tempelm  =  document.createElement("iframe");
            tempelm.src  = data.data;
            tempelm.style.display  =  "none";
            document.body.appendChild(tempelm);
        }else{
            myalert('系统提示框',data.data);
        }
    },
    function(err){
        console.log(err);
    });
}
//删除合同
function deletetype_ht(cont_name,id){
    // arr = cont_name.split(';');
    // console.log(arr);
    postRequest('/change_cont_status_None/',{
        'data':JSON.stringify({'id':id,'name':cont_name})
    },function(data){
        if(data.result==1){
            myalert('系统提示框','删除成功');
            $.each(dataset1,function(i,v){
                if(v.id==id){
                    v.cont_status = 'None';
                    v.cont_name = '';
                }
            });
            $.each(dataset,function(i,v){
                if(v.id==id){
                    v.cont_status = 'None';
                    v.cont_name = '';
                }
            });
            if( $('.datatrack').attr('id') == 'project_ing'){
                var tmp = select_ht_data;
                tmp['state']='进行中';
                displayTrack(tmp);
            }else{
                displayTrack(select_ht_data);
            }
        }else{
            myalert('系统提示框','删除合同失败');
        }
    });
}
//添加归档记录确认
function add_achive() {
    var docum_sign = $("input[name='docum_sign4']").val();
    var contractno = $("select[name='cont4'] option:selected").val();
    var contractno_w = $("input[name='cont_write4']").val();
    var projectname = $("select[name='projectname4'] option:selected").val();
    var projectname_w = $("input[name='projectname_write4']").val();
    var docum_type = $("select[name='docum_type'] option:selected").val();
    var docum_item = $("select[name='docum_item'] option:selected").val();
    var docum_intro = $("input[name='docum_intro']").val();
    var submit_name = $("select[name='submit_name4'] option:selected").val();
    var other_intro = $("input[name='other_intro4']").val();
    var achive_document_value = $("input[name='achive_document_value']").val();
    var achive_document_file_old = $("#achive_document_file_old").html();
    var achive_document_file = $("#achive_document_file").html();
    var regis_name = $("#headername").html();
    var arr = achive_document_value.split(';');
    // console.log(contractno);
    // console.log(projectname);
    var updata_item = [];
    var now = new Date();
    var year = now.getFullYear();//年
    var month = now.getMonth() + 1;//月
    var day = now.getDate();//日
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    console.log(clock);
    //当是终验报告的时候，要确认是否有初验报告。
    var flag_cy = true;
    if (docum_item=="终验报告"){flag_cy = check_archive_item_cy({"contractno":contractno});}
    if(contractno==''|| projectname==''||contractno==undefined||projectname==undefined){myalert('系统提示','请选择项目名称和合同编号，不用输入');}else{
        if(check_archive_item({"contractno":contractno,"docum_item":docum_item})){
            if(flag_cy){
                if (docum_sign == ''||contractno == '' || projectname == '' || docum_type == '' || docum_item == '' || docum_intro == '' || submit_name == ''|| achive_document_file == '') {
                    myalert('系统提示框','请输入信息');
                } else if (docum_sign > clock){
                     myalert('系统提示框','日期选择错误');
                } else {
                    var hash = randomChar(achive_document_value);
                    var data = {
                        'docum_sign': docum_sign,
                        'contractno': contractno,
                        "projectname": projectname,
                        "docum_type": docum_type,
                        "docum_item": docum_item,
                        "docum_intro": docum_intro,
                        "submit_name": submit_name,
                        "other_intro": other_intro,
                        "regis_name": regis_name,
                        "docum_file_id": hash,
                        "filenames":arr
                    }
                    // console.log(data);
                    if($(".myawesome").length==0){
                        postRequest('/addAchive/', {
                            "data": JSON.stringify(data)
                        }, function (data) {
                            // console.log(data);
                            if (data.result == 1 || data.result == '1') {
                                // console.log(data.result);
                                myalert('系统提示框','添加成功');
                                $("#add_achive_pop").removeClass('showPopup');
                                $(".md-overlay").removeClass('showOverlay');
                                displayArchive();
                                displayProject();
                                // $.each(dataset,function(i,v){
                                    // if (v.xuhao == 524){
                                        // console.log(v);
                                    // }
                                // })
                            } else {
                                myalert('系统提示框','添加失败');
                            }
                            empty_tmp();
                        }, function (err) {
                            console.log(err);
                        });
                    }else{
                        myalert('系统提示框','请等待文件上传完成');
                    }
                }
            }else{
                myalert('系统提示框','该项目不存在初验报告，请先添加初验报告');
            }
        }else{
            myalert('系统提示框','该项目已存在'+docum_item+'纪录');
        }
    }
}
//展示归档记录
function displayArchive(){
    postRequest('/display_archive/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            
                showArchibe(data.data);
            
        }
    },function(err){
        console.log(err);
    })
}
//真正的展示，为分页而生
function showArchibe(data){
    if ($("#pagebox").length>0){
        $("#paging").get(0).removeChild($("#pagebox").get(0));
    }
    if ($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    if(data.length){
        var html = '';
        if (data.length < 20){
            $("#paging2").hide();
            $.each(data, function (i, v) {
                html += '\
                    <tr>\
                        <td><a href="javascript:;" title="修改" onclick="change_archive_btn(\''+v.id+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;<a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a>&nbsp;<a href="javascript:;" title="删除" onclick="delete_archive_btn(this,\''+v.id+'\')"><button type="button" class="shanchu">删除</button></a></td>\
                        <td>'+ v.contractno + '</td>\
                        <td style="text-align:left;">'+ v.projectname + '</td>\
                        <td>'+ v.docum_type + '</td>\
                        <td>'+ v.docum_item + '</td>\
                        <td style="text-align:left;">'+ v.docum_intro + '</td>\
                        <td>'+ (v.docum_sign).slice(0,10) + '</td>\
                        <td>'+ (v.docum_regis).slice(0,10) + '</td>\
                        <td>'+ (v.docum_regis_latest).slice(0,10) + '</td>\
                        <td>'+ v.submit_name + '</td>\
                        <td>'+ v.regis_name + '</td>\
                        <td style="text-align:left;">'+ v.other_intro + '</td>';
                html += '</tr>';
            })
            $("#show_archive").html(html);
        } else {
            $("#paging2").show();
            var html1 = '<div class="pagebox" id="pagebox2"></div>';
            $("#paging2").html(html1);
            var total = data.length;
            var pagenum = Math.ceil(total / 20);
            $('#pagebox2').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    var html = '';
                    var min = (page - 1) * 20;
                    var max = page * 20;
                    $.each(data, function (i, v) {
                    html += '\
                        <tr>\
                            <td><a href="javascript:;" title="修改" onclick="change_archive_btn(\''+v.id+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;<a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a>&nbsp;<a href="javascript:;" title="删除" onclick="delete_archive_btn(this,\''+v.id+'\')"><button type="button" class="shanchu">删除</button></a></td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align:left;">'+ v.projectname + '</td>\
                            <td>'+ v.docum_type + '</td>\
                            <td>'+ v.docum_item + '</td>\
                            <td style="text-align:left;">'+ v.docum_intro + '</td>\
                            <td>'+ (v.docum_sign).slice(0,10) + '</td>\
                            <td>'+ (v.docum_regis).slice(0,10) + '</td>\
                            <td>'+ (v.docum_regis_latest).slice(0,10) + '</td>\
                            <td>'+ v.submit_name + '</td>\
                            <td>'+ v.regis_name + '</td>\
                            <td  style="text-align:left;">'+ v.other_intro + '</td>';
                    html += '</tr>';
                    })
                    $("#show_archive").html(html);
                    $("#show_archive").children('tr').each(function (index, value) {
                        if (index >= min && index < max) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    })
                }
            })
        }
    } else{
        $("#show_archive").html('<tr><td colspan="12">暂无数据</td></tr>');
        $("#paging2").hide();
    }   
}
//清除"新增归档"框
function eliminate_achive(){
    $("input[name='achive_id']").val('');
    $("input[name='docum_sign4']").val('');
    $("input[name='cont_write4']").val('');
    $("input[name='projectname_write4']").val('');
    $("select[name='cont4'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont4'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='projectname4'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname4'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='docum_type'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_type'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='docum_item'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_item'] option").eq(0).siblings().removeAttr('selected');
    $("#docum_item").html('<option value="">请选择</option>');
    $("input[name='docum_intro']").val('');
    $("select[name='submit_name4'] option").eq(0).attr('selected', 'selected');
    $("select[name='submit_name4'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='other_intro4']").val('');
    $("#achive_document_file_old").empty();
    $("#achive_document_file").empty();
    $("input[name='achive_document_value']").val('');
    $("input[name='achive_document_value1']").val('');
    $("input[name='achive_document']").val('');
}
//新增归档记录弹窗的 取消按钮
function quxiao_achive(){
    //删除上传到临时文件夹的文件
    var achive_document_value = $("input[name='achive_document_value']").val();
    var arr = achive_document_value.split(';');
    var data = {"filenames":arr};
    // console.log(data);
    postRequest('/delete_tmp_achive/', {
            "data": JSON.stringify(data)
        }, function (data) {
            if (data.result == 1 || data.result == '1') {
                // myalert('系统提示框','删除成功');
            } else {
                // myalert('系统提示框','删除失败');
            }
        }, function (err) {
            console.log(err);
        })
    eliminate_achive();
    empty_tmp();
    $("#add_achive_pop").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
}
//上传归档文件到临时目录
function uploadt_achive_tmp(obj){
    $($(obj).children('input')).attr('id','cont_input');
    var cont_input = document.getElementById("cont_input");
    var file = new FormData();
    var achive_document_filename = $("input[name='achive_document_value']").val();
    $("#cont_input").unbind('change').change(function(event){
        var files = cont_input.files;
        for (var i = 0; i < files.length; i++){
            // console.log(files[i].name);
            if(achive_document_filename==''){
                achive_document_filename = files[i].name;
                $("input[name='achive_document_value']").val(achive_document_filename);
            }else{
                achive_document_filename = achive_document_filename+';'+ files[i].name;
                $("input[name='achive_document_value']").val(achive_document_filename);
            }
            // console.log(files[i]);
            file.append('file',files[i]);
        }
        
            // console.log(file.get("file"));
        $.ajax({
            url: "/upload_achive_tmp/",
            type:"POST",
            data: file,
            processData:false,
            contentType:false,            
            success: function(data){
                if(data.result == '1' || data.result == 1){
                    // console.log(data.name);
                    // myalert('系统提示框','上传归档文件成功');
                    $($(obj).children('input')).removeAttr('id');
                    if($('.myawesome').length!=0){
                        
                        $(".myawesome").remove();
                    }
            }else{
                    myalert('系统提示框','添加附件失败');
                    $($(obj).children('input')).removeAttr('id');
                }
            }
        });
        
        var html=''
        $("#achive_document_file").empty();
        var arr = achive_document_filename.split(";")
        $.each(arr,function(i,v){
            html +='<div><div class="col-xs-1">&nbsp;</div><div class="col-xs-9" ><span onclick="show_this_achive(this,\''+v+'\')" onmouseover="over(this)" onmouseleave="leave(this)" >'+v+'</span><i class=" myawesome fa fa-refresh fa-spin" style="padding:0 10px;"></i><a href="javascript:;"  onclick="delete_tmp_achive(this,\''+v+'\')" style="padding:0 10px;color:red;cursor: pointer;text-decoration:none;">[删除]</a></div></div>';
        })
        $("#achive_document_file").append(html);
         
        var oH = $("#add_achive_pop").find(".popup-Content-box").height();
        $("#add_achive_pop").height(oH);
        $("#add_achive_pop").siblings('.popup-Box').css('height', 'auto');
        // var hash = new String(achive_document_filename).hashCode();
    });
}
//删除当前行上传的文件
function delete_tmp_achive(obj,filename){
    var achive_document_value = $("input[name='achive_document_value']").val();
    var arr1 = achive_document_value.split(';');
    var arr = [];
    arr.push(filename)
    //删除上传到临时文件夹的文件
    var data = {"filenames":arr};
    postRequest('/delete_tmp_achive/', {
        "data": JSON.stringify(data)
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            // myalert('系统提示框','删除成功');
        } else {
            // myalert('系统提示框','删除失败');
        }
    }, function (err) {
        console.log(err);
    });
    //移除当前的文件所在div
    $(obj).parent().parent().remove();
    //设置高度
    var oH = $("#add_achive_pop").find(".popup-Content-box").height();
    $("#add_achive_pop").height(oH);
    $("#add_achive_pop").siblings('.popup-Box').css('height', 'auto');
   if(arr1.length==1){
        $("input[name='achive_document_value']").val('');
    }else{
        achive_document_value='';
        var arr2=[];
        $.each(arr1,function(i,v){
            if(v!=filename){
                arr2.push(v);
            }
        })
        $.each(arr2,function(i,v){
            achive_document_value += (v+';')
        })
       
        $("input[name='achive_document_value']").val(achive_document_value.slice(0,achive_document_value.length-1));
    }
}
//删除当前行的压缩文件（以前的），同时去删除数据库中docum_file_id字段中的对应字符串
function delete_tmp_achive_old(obj,filename,id){
    //将要删除的文件名称保存到achive_document_value1中
    var achive_document_value1 = $("input[name='achive_document_value1']").val();
    if(achive_document_value1==''){
        $("input[name='achive_document_value1']").val(filename);
    }else{
        $("input[name='achive_document_value1']").val(achive_document_value1+';'+filename);
    }
    //移除当前的文件所在div
    $(obj).parent().parent().remove();
    //设置高度
    var oH = $("#add_achive_pop").find(".popup-Content-box").height();
    $("#add_achive_pop").height(oH);
    $("#add_achive_pop").siblings('.popup-Box').css('height', 'auto');
}
//删除压缩包(移动到临时目录)
function delete_zip(id){
    var data = {"id":id};
    postRequest('/delete_tmp_achive_old/', {
        "data": JSON.stringify(data)
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            // myalert('系统提示框','删除成功');
        } else {
            // myalert('系统提示框','删除失败');
        }
    }, function (err) {
        console.log(err);
    })
}
//移回原目录
function nu_delete_zip(id){
    var data = {"id":id};
    postRequest('/add_tmp_achive_old/', {
        "data": JSON.stringify(data)
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            // myalert('系统提示框','删除成功');
        } else {
            // myalert('系统提示框','删除失败');
        }
    }, function (err) {
        console.log(err);
    })
}
//点击文档--》下载
function show_this_achive(obj,str){
    url = '/static/uploads/archive_file_tmp/'+str+'';
    // if(str.indexOf('pdf') != -1||str.indexOf('txt') != -1||str.indexOf('jpg') != -1){
    file_type = str.substr(str.lastIndexOf('.')+1).toLowerCase();
    // console.log(file_type);
    var types = ['jpg','html','txt','pdf','jpeg','png','gif','xml'];
    var flag = false;
    $.each(types,function(i,v){
        if(file_type == v){
            flag = true;
            return false
        }
    });
    if(flag){
        // fileName.substr(fileName.lastIndexOf(".") + 1).toLowerCase();
        // document.getElementById('links').href = url;
        // $(obj).attr('href',url);
        var tmp=window.open("about:blank","","fullscreen=1") 
        tmp.moveTo(0,0); 
        tmp.resizeTo(screen.width+20,screen.height); 
        tmp.focus(); 
        tmp.location=url; 
    }else{
        var fileName = str
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        form.appendTo('body').submit().remove();
    }
}
//点击压缩包--》下载单个压缩包
function show_this_achive_old(obj,str){
    url = '/static/uploads/archive_file/'+str+'.zip';
    var fileName = str
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
    form.appendTo('body').submit().remove();
}
//下载所有压缩包
function get_archive_zip(str){
    var arr = str.split(';');
    $.each(arr,function(i,v){   
        url = '/static/uploads/archive_file/'+v+'.zip';
        var  tempelm  =  document.createElement("iframe");
        tempelm.src  = url;
        tempelm.style.display  =  "none";
        document.body.appendChild(tempelm);
    })

}
//点击“修改”出现修改归档记录窗口
function change_archive_btn(id){
    eliminate_achive();
    empty_tmp();
    $("#achive_title").html("修改报告归档");
    var html1 =  '<option value="">请选择</option>';
    var html2 =  '<option value="">请选择</option>';
    var html3 =  '<option value="">请选择</option>';
    var pro_duty_man = [];//存放所有项目de负责人
    $.each(dataset,function(i,v){
        html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
        html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        pro_duty_man.push(v.dutyname);
    });
     // $.each(user_eng,function(i,v){
        // html3 += '<option value="' + v.firstname + '">' + v.firstname + '</option>';
     // })
    var dutyname = unique(pro_duty_man);//去掉重复的项目负责人
    $.each(dutyname,function(i,v){
        html3 += '<option value="' + v + '">' + v + '</option>';
    })
    $("#cont4").html(html1);
    $("#projectname4").html(html2);
    $("#submit_name4").html(html3);
    postRequest('/select_archive_id/',{
        "data": JSON.stringify({"id":id})
    },function(data){
        console.log(data);
        if(data.result==1||data.result=='1'){
            $("input[name='achive_id']").val(data.data['id']);
            $("input[name='docum_sign4']").val(data.data['docum_sign'].slice(0,10));
            $("input[name='cont_write4']").val(data.data['contractno']);
            $("input[name='projectname_write4']").val(data.data['projectname']);
            $("select[name='cont4'] option").each(function (j, k) {
                if ($(this).val() == data.data['contractno']) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='projectname4'] option").each(function (j, k) {
                if ($(this).val() == data.data['projectname']) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='docum_type'] option").each(function (j, k) {
                if ($(this).val() == data.data['docum_type']) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            var type = $("select[name='docum_type'] option:selected").val();
            var html='';
            if(type == '到货验收报告'){
                html += '<option value="">请选择</option>';
                html += '<option value="到货验收报告">到货验收报告</option>';
            }else if (type == '项目验收报告'){
                html += '<option value="">请选择</option>';
                html += '<option value="初验报告">初验报告</option>';
                html += '<option value="终验报告">终验报告</option>';
            }else if (type == '其他项目报告'){
                html += '<option value="">请选择</option>';
                html += '<option value="设备巡检报告">设备巡检报告</option>';
                html += '<option value="演练方案报告">演练方案报告</option>';
                html += '<option value="实施方案工艺">实施方案工艺</option>';
                html += '<option value="故障处理报告">故障处理报告</option>';
                html += '<option value="测试方案报告">测试方案报告</option>';
                html += '<option value="阶段总结报告">阶段总结报告</option>';
                html += '<option value="客户服务报告">客户服务报告</option>';
                html += '<option value="培训会议签到">培训会议签到</option>';
                html += '<option value="其它项目报告">其它项目报告</option>';
            }else {
                html += '<option value="">请选择</option>';
            }
            $("#docum_item").html(html);
            $("select[name='docum_item'] option").each(function (j, k) {
                if ($(this).val() == data.data['docum_item']) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='submit_name4'] option").each(function (j, k) {
                
                if ($(this).val() == data.data['submit_name']) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("input[name='docum_intro']").val(data.data['docum_intro']);
            $("input[name='other_intro4']").val(data.data['other_intro']);
            var html='';
            // arr = data.data['filename_in_zip'].split(';');
            $.each(data.data['filename_in_zip'],function(i,v){
                // console.log(v);
                html +='<div><div class="col-xs-1">&nbsp;</div><div class="col-xs-9" ><span onclick="show_this_achive(this,\''+v+'\')" onmouseover="over(this)" onmouseleave="leave(this)">'+v+'</span><a href="javascript:;"  onclick="delete_tmp_achive_old(this,\''+v+'\',\''+data.data['id']+'\')" style="padding:0 10px;color:red;cursor: pointer;text-decoration:none;">[删除]</a></div></div>';
            })
            $("#achive_document_file_old").append(html);
            var oH = $("#add_achive_pop").find(".popup-Content-box").height();
            $("#add_achive_pop").height(oH);
            $("#add_achive_pop").siblings('.popup-Box').css('height', 'auto');
        }
    },function(err){
        console.log(err);
    });
    $("#achive_btn2").show();
    $("#achive_btn1").hide();
    
    $('#cont_write4').prop('disabled', 'true');
    $('#cont_write4').attr('disabled', 'true');
    $('#cont_write4').css('background-color', 'rgba(127,127,127,0.1)');
    
    $('#projectname_write4').prop('disabled', 'true');
    $('#projectname_write4').attr('disabled', 'true');
    $('#projectname_write4').css('background-color', 'rgba(127,127,127,0.1)');
    
    $('#docum_type').prop('disabled', 'true');
    $('#docum_type').attr('disabled', 'true');
    $('#docum_type').css('background-color', 'rgba(127,127,127,0.1)');
    
    $('#docum_item').prop('disabled', 'true');
    $('#docum_item').attr('disabled', 'true');
    $('#docum_item').css('background-color', 'rgba(127,127,127,0.1)');
    
    $("#add_achive_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    
}
//确认修改归档记录
function change_achive(){
    var id = $("input[name='achive_id']").val();
    var docum_sign = $("input[name='docum_sign4']").val();
    // var contractno = $("input[name='cont_write4']").val();
    // var projectname = $("input[name='projectname_write4']").val();
    // var docum_type = $("select[name='docum_type'] option:selected").val();
    // var docum_item = $("select[name='docum_item'] option:selected").val();
    var docum_intro = $("input[name='docum_intro']").val();
    // var submit_name = $("select[name='submit_name4'] option:selected").val();
    var other_intro = $("input[name='other_intro4']").val();
    var achive_document_value = $("input[name='achive_document_value']").val();//要添加的文件名称
    var achive_document_value1 = $("input[name='achive_document_value1']").val();//要删除的文件名
    var achive_document_file_old = $("#achive_document_file_old").html();
    var achive_document_file = $("#achive_document_file").html();
    // var arr = achive_document_value.split(';');
    var regis_name = $("#headername").html();
    var updata_item = [];
    var now = new Date();
    var year = now.getFullYear();//年
    var month = now.getMonth() + 1;//月
    var day = now.getDate();//日
    var clock = year + "-";
    if(month < 10)
        clock += "0";
    clock += month + "-";
    if(day < 10)
        clock += "0";
    clock += day + " ";
    console.log(clock);
    // var flag = check_archive_item({"contractno":contractno,"docum_item":docum_item})用于检测是否存在该项目有没有该归档文件的
    postRequest('/select_archive_id/',{
        "data": JSON.stringify({"id":id})
    },function(data){
        if(data.result==1||data.result=='1'){
            var archive =data.data;
            console.log(archive);
            if(docum_sign == archive['docum_sign'].slice(0,10) && docum_intro == archive['docum_intro'] &&achive_document_value1 == '' && achive_document_value == ''){
                myalert('系统提示框','没有数据被修改');
            } else {
                if (docum_sign == '' || docum_intro == '' ||(achive_document_file_old == '' && achive_document_file == '')) {
                    myalert('系统提示框','请输入信息');
                } else if (docum_sign > clock){
                    myalert('系统提示框','日期选择错误');
                }else {
                    var data = {
                        'id': archive['id'],
                        'docum_sign': docum_sign,
                        // 'contractno': contractno,
                        // "projectname": projectname,
                        // "docum_type": docum_type,
                        // "docum_item": docum_item,
                        "docum_intro": docum_intro,
                        // "submit_name": submit_name,
                        "other_intro": other_intro,
                        "regis_name": regis_name,
                        "achive_document_value1": achive_document_value1,
                        "achive_document_value": achive_document_value,
                        "filenames": archive['filename_in_zip'],
                    }
                    console.log(data);
                    if($('.myawesome').length==0){
                        // if(achive_document_value1!=''||achive_document_value!=''){
                            // delete_zip(archive['id']);//忘记有什么卵用了，不用好像也行
                        // }
                        postRequest('/changeAchive/', {
                            "data": JSON.stringify(data)
                        }, function (data) {
                            // console.log(data);
                            if (data.result == 1 || data.result == '1') {
                                $("#add_achive_pop").removeClass('showPopup');
                                $(".md-overlay").removeClass('showOverlay');
                                
                                myalert('系统提示框','修改成功');
                                chooseinfo_archive();
                                empty_tmp();
                            } else {
                                myalert('系统提示框','修改失败');
                                // nu_delete_zip(archive['id']);这个也养一样，移来移去有意思嘛？
                            }
                        }, function (err) {
                            console.log(err);
                        });
                    }else{
                        myalert('系统提示框','请等待文件上传完成');
                    }
                }
            }
        }
    },function(err){
        console.log(err);
    });
}
//删除临时目录里的全部文件
function empty_tmp(){
    postRequest('/delete_tmp_all/',{
        
    },function(data){
        // console.log(data);
        if(data.result==1||data.result=='1'){
            // console.log('临时文件夹清空成功');
        }else{
            // console.log('临时文件夹清空失败');
        }
    },function(err){
        console.log(err);
    })
}
//删除当前选中的归档记录
function  delete_archive_btn(obj,id){
    var data = {"id":id};
    myconfirm('系统提示框','确定删除该条记录？', function(r){
        if(r){
            postRequest('/delete_achive_jilu/', {
                "data": JSON.stringify(data)
            }, function (data) {
                if (data.result == 1 || data.result == '1') {
                    myalert('系统提示框','删除成功');
                    $(obj).parents('tr').empty();
                    displayProject();
                } else {
                    myalert('系统提示框','删除失败');
                }
            }, function (err) {
                console.log(err);
            })
        }
    });
}
//鼠标悬浮变色
function over(obj){
    $(obj).css('color','red');
    $(obj).css('cursor','pointer');
}
//鼠标移出变色
function leave(obj){
    $(obj).css('color','black');
    $(obj).css('cursor','pointer');
}
//点击筛选归档出现弹窗
function search_archive(){
    resetchoose_archive();
    $("#shaixuanArchive").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#shaixuanArchive").find(".popup-Content-box").height();
    $("#shaixuanArchive").height(oH);
    $("#shaixuanArchive").siblings('.popup-Box').css('height', 'auto');
   //填充合同编号和项目名称
    var html1='<option value="">请选择</option>';
    var html2='<option value="">请选择</option>';
    $.each(dataset,function(i,v){
        html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
        html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
    });
    $("#cont1").html(html1);
    $("#projectname1").html(html2);
   //填充报告类
    var html3 = '<option value="">请选择</option>';
    html3 += '<option value="到货验收报告">到货验收报告</option>';
    html3 += '<option value="项目验收报告">项目验收报告</option>';
    html3 += '<option value="其他项目报告">其他项目报告</option>';
    $("#docum_type1").html(html3);
   //填充报告项
    $("#docum_type1").unbind('change').change(function(event){
        var type = $("select[name='docum_type1'] option:selected").val();
        var html4='<option value="">请选择</option>';
        if(type == '到货验收报告'){
            html4 += '<option value="到货验收报告">到货验收报告</option>';
        }else if (type == '项目验收报告'){
            html4 += '<option value="初验报告">初验报告</option>';
            html4 += '<option value="终验报告">终验报告</option>';
        }else if (type == '其他项目报告'){
            html4 += '<option value="设备巡检报告">设备巡检报告</option>';
            html4 += '<option value="演练方案报告">演练方案报告</option>';
            html4 += '<option value="实施方案工艺">实施方案工艺</option>';
            html4 += '<option value="故障处理报告">故障处理报告</option>';
            html4 += '<option value="测试方案报告">测试方案报告</option>';
            html4 += '<option value="阶段总结报告">阶段总结报告</option>';
            html4 += '<option value="客户服务报告">客户服务报告</option>';
            html4 += '<option value="培训会议签到">培训会议签到</option>';
            html4 += '<option value="其它项目报告">其它项目报告</option>';
        }else {
            html4 += '<option value="">请选择</option>';
        }
        $("#docum_item1").html(html4);
    });
}
//筛选归档记录时的重置
function resetchoose_archive(){
    $("input[name='cont_write1']").val('');
    $("select[name='cont1'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont1'] option").eq(0).prop('selected', 'selected');
    $("input[name='projectname_write1']").val('');
    $("select[name='projectname1'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname1'] option").eq(0).prop('selected', 'selected');
    $("select[name='docum_type1'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_type1'] option").eq(0).prop('selected', 'selected');
    var html = '<option value="">请选择</option>';
    $("#docum_item1").html(html);
    $("select[name='docum_item1'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_item1'] option").eq(0).prop('selected', 'selected');
    $("input[name='starttime1']").val('');
    $("input[name='endtime1']").val('');
}
//筛选归档记录确认---->感觉“展示归档记录”函数没太大必要了
function chooseinfo_archive(){
    var starttime = $("input[name='starttime1']").val()||'';
    var endtime = $("input[name='endtime1']").val()||'';
    var contractno = $("select[name='cont1'] option:selected").val()||'';
    var projectname = $("select[name='projectname1'] option:selected").val()||'';
    var documtype = $("select[name='docum_type1'] option:selected").val()||'';
    var documitem = $("select[name='docum_item1'] option:selected").val()||'';
    // if(contractno == '请选择'){contractno = '';}
    // if(projectname == '请选择'){projectname = '';}
        
    var data = {
        "starttime": starttime,
        "endtime":endtime,
        "contractno": contractno,
        "projectname": projectname,
        "documtype": documtype,
        "documitem": documitem
    }
    // console.log(data);
    postRequest('/select_archive/',{
         "data": JSON.stringify(data)
    },function(data){
        if(data.result==1||data.result=='1'){
            $("#shaixuanArchive").removeClass('showPopup');
            $(".md-overlay").removeClass('showOverlay');
            showArchibe(data.data);
        }
    },function(err){
        console.log(err);
    });
}
//归档记录页面的返回按钮
function fanhui_archive(){
    resetchoose_archive();
    displayArchive();
}
//检查某个项目是否存在某个归档项的记录
function check_archive_item(data){
    var flag = false;
    $.ajax({
        type: 'POST',
        url: '/check_archive_item/',
        data:  data,
        async: false,
        success: function(data){
            if(data.result == '1' || data.result == 1){
                // console.log("该项目不存在此类报告项纪录");
                flag = true;
            }else{
                // console.log("该项目已存在此类报告项纪录或者出错");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    return flag;
}
//检查某个项目是否存在初验报告的记录
function check_archive_item_cy(data){
    var flag = false;
    $.ajax({
        type: 'POST',
        url: '/check_archive_item_cy/',
        data:  data,
        async: false,
        success: function(data){
            if(data.result == '1' || data.result == 1){
                // console.log("该项目存在初验报告");
                flag = true;
            }else{
                // console.log("该项目已不存在初验报告或者出错");
                flag = false;
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    return flag;
}






