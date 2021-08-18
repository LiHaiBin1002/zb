      var stime = '';
var etime = '';
var stime1 = '';
var etime1 = '';
var dataset = {}; // 获取下拉框的数据
var persondata = {}; // 获取当前用户数据
var dataset_persondata_all = [];//当前用户负责项目信息按修改日期排序后的
var dataset_persondata_all1 = [];//当前用户负责项目信息
var workcontentdata = {}; // 获取工作内容数据
var worktypeset = {};//获取工作类型
var reportdata = {};//项目周报数据
var select_ht_data;//筛选条件
var equipmentset= {};//设备品牌、类型、型号的数据
$(document).ready(function () {
    // 设置左右边的高度
    var aH = $(window).height() - $('.header').height();
    $(".user-left, .user-right").css("height", aH);
    //
    // console.log($.cookie("username"));
    if ($.cookie("username") == undefined || $.cookie("username") == 'null') {
        window.location.href = '/';
    } //else {
       // $(".username").html($.cookie("username"));
    //}
    postRequest('/display_user/', {}, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            if (data.data.length) {
                var html6 = '<option value="">请选择</option>';
                $.each(data.data, function (i, v) {
                    if (v.role == '3' && v.type == '2') {
                        html6 += '<option value="' + v.firstname + '">' + v.firstname + '</option>';
                    }
                })
                $("#staffname1").html(html6);
                $("#staffname8").html(html6);
                var html = '';
                $.each(data.data, function (i, v) {
                    if (v.username == $.cookie("username")) {
                        persondata = v;
                        // console.log(persondata);
                        $(".username").html(persondata.firstname);
                        // show_work_table(v.id);
                        produce_page_for_showAll();//显示翻页
                        showAll_query(1);//展示第一页
                        displayProject();
                        $("#fanhui").click(function(){
                            $("#paging").show();
                            resetchoose();
                            $("#filePicker_addwordcontentbtn").show();
                            $("#filePicker_search_btn").show();
                            if ($("#title_contractno").length==0){
                                $("#title_address").after('<th id="title_contractno">合同编号</th>');
                            }
                            if ($("#title_clientname").length==0){
                                $("#title_projectname").after('<th id="title_clientname">客户名称</th>');
                            }
                            if ($("#title_department").length==0){
                                $("#title_worktype").before('<th id="title_department">所属部门</th>');
                            }
                            if ($("#title_salename").length==0){
                                $("#title_dutyname").after('<th id="title_salename">销售负责人</th>');
                            }
                            if ($("#pagebox1").length>0){
                                $("#paging1").get(0).removeChild($("#pagebox1").get(0));
                            }
                            // show_work_table(v.id);
                            produce_page_for_showAll();//显示翻页
                            showAll_query(1);
                        });
                    }
                })
            }
            select_option_flag_person();
        }
    }, function (err) {
        console.log(err);
    })
    //获取工作类和工作项
    postRequest('/display_worktype/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            worktypeset = data.data;
            if(data.data.length){
                var html7 = '<option value="">请选择</option>';
                var val7 = [];
                $.each(data.data, function (i, v) {
                    val7.push(v.worktype)
                });
                var val77 = unique(val7);
                $.each(val77, function (i, v) {
                    html7 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#worktype").html(html7);
                $("#worktype1").html(html7);
            }
        }
    },function(err){
        console.log(err);
    })

    //选择工作类，工作项下拉框改变
    $("#worktype").change(function(){
        var html8 = '<option value="">请选择</option>';
        var value = $(this).val();
        if (value != '' && worktypeset.length > 0) {
            $.each(worktypeset,function(i , v){
                if (value == v.worktype){
                    html8 += '<option value="' + v.workitem + '">' + v.workitem + '</option>';
                }
            });
            $("#workitem").html(html8);
        }
    })
    $("#worktype1").change(function(){
        var html9 = '<option value="">请选择</option>';
        var value = $(this).val();
        if (value != '' && worktypeset.length > 0) {
            $.each(worktypeset,function(i , v){
                if (value == v.worktype){
                    html9 += '<option value="' + v.workitem + '">' + v.workitem + '</option>';
                }
            });
            $("#workitem1").html(html9);
        }
    })

    $("#dataMg").addClass('libg');
    $("#project_daily").addClass('libg');
    //悬浮出现另一个选项
    $('.datatrack').hover(function(){
        $('.perMg2').show();
    },function(){
        $('.perMg2').hide();
    })
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
        
        // if( $('.datatrack').attr('id') == 'project_ing'){
            // show_project_ing();
            // console.log(11111);
        // }
        // if( $('.datatrack').attr('id') == 'project_all'){
            // show_project_persondata_all();
            // console.log(22222);
        // }
        
    })
    $("#leftmenu").on('click','li',function(e){
        var evt = e ? e : window.event;
        if(evt.stopPropagation){
            evt.stopPropagation();
        }else {
            evt.stopPropagation = true;
        }
        var index = $(this).index();
        console.log(index);
        // if(index!=1)
        $(this).addClass('libg');
        if(index==1){
            $(".datatrack1").css('color','#FFF');
        }
        // $(this).siblings('li').removeClass('libg');
        if (index == 0){
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $("#project_all").removeClass('libg');
            $("#dataMg").removeClass('libg');
            $(".dataMgBox").hide();
            $(".dataTrackBox").hide();
            $(".saleBox").show();
            $(".saleBox").siblings().hide();
            $(".prj_reportBox").hide();
            $(".archiveBox").hide();
            $(".equipmentBox").hide();
            $('.One_Cont_equipmentBox').hide()
            show_project_ing();
        } else if(index == 1){
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(".saleBox").hide();
            $(".dataTrackBox").show();
            $(".dataTrackBox").siblings().hide();
            $(".dataMgBox").hide();
            $(".prj_reportBox").hide();
            $(".archiveBox").hide();
            $(".equipmentBox").hide();
            $('.One_Cont_equipmentBox').hide()
            if( $('.datatrack').attr('id') == 'project_ing'){
                select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '进行中',"caigou":'' ,"clientname": '',"dutyname": '',"salename": '',};
                show_project_ing();
            }
            if( $('.datatrack').attr('id') == 'project_all'){
                name = $("#headername").html()
                select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"clientname": '',"dutyname": name,"salename": '',};
                show_project_persondata_all();
            }
        }else if(index == 2){
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
                    $(".saleBox").hide();
                    $("#dataMg").siblings('li').removeClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $(".dataTrackBox").hide();
                    $(".dataMgBox").show();
                    $(".dataMgBox").siblings().hide();
                    $(".prj_reportBox").hide();
                    $(".archiveBox").hide();
                    $(".equipmentBox").hide();
                    $('.One_Cont_equipmentBox').hide()
                    if ($("#title_contractno").length==0){
                        $("#title_address").after('<th id="title_contractno">合同编号</th>');
                    }
                    if ($("#title_clientname").length==0){
                        $("#title_projectname").after('<th id="title_clientname">客户名称</th>');
                    }
                    if ($("#title_department").length==0){
                        $("#title_worktype").before('<th id="title_department">所属部门</th>');
                    }
                    if ($("#title_salename").length==0){
                        $("#title_dutyname").after('<th id="title_salename">销售负责人</th>');
                    }
                    if ($("#pagebox1").length>0){
                        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
                    }
                    $('.perMg3').hide();
                    // show_work_table(persondata.id);
                    produce_page_for_showAll();//显示翻页
                    showAll_query(1);
                    $("#filePicker_addwordcontentbtn").show();
                    $("#filePicker_search_btn").show();
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
        }else if(index == 3){
            $(".systemBox").show();
            $(".systemBox").siblings().hide();
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
        }else if(index == 4){
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(".saleBox").hide();
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $(".dataTrackBox").hide();
            $(".dataMgBox").hide();
            $(".prj_reportBox").hide();
            $(".archiveBox").show();
            $(".archiveBox").siblings().hide();
            $(".equipmentBox").hide();
            $('.One_Cont_equipmentBox').hide()
            displayArchive();
        } else if (index ==5){
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(".saleBox").hide();
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $(".dataTrackBox").hide();
            $(".dataMgBox").hide();
            $(".prj_reportBox").hide();
            $(".archiveBox").hide();
            $(".equipmentBox").show();
            $(".equipmentBox").siblings().hide();
            $('.One_Cont_equipmentBox').hide()
            displayEquipment();
            $(".equipmentBox").css('padding','10px');
            $("#Equipment_Div").hide();//隐藏新增
            $("#Equipment_Div4").hide();//隐藏导入
            // $("#Equipment_Div5").hide();//隐藏更新维保
            // $("#Equipment_Div6").hide();//隐藏更新维保
        } else if (index == 6){
            $(this).siblings('li').removeClass('libg');
            $(".data_sharBox").siblings().hide();
            $(".data_sharBox").show();
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            produce_page(); //成翻页栏
            paging_query_file(1);//显示第一页
            $("input[name='searchfile_input']").val('');//清空搜索框
        } else{
            $(this).siblings('li').removeClass('libg');
            $(".perMg3").children('ul').removeClass('libg');
            $(".perMg3").hide();
            $(".saleBox").hide();
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $(".dataTrackBox").hide();
            $(".dataMgBox").hide();
            $(".prj_reportBox").show();
            $(".prj_reportBox").siblings().hide();
            $(".archiveBox").hide();
            $(".equipmentBox").hide();
            $('.One_Cont_equipmentBox').hide()
            display_project_report();
        }
    })
    
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
            var i =false;
            stime = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker1').val(stime);
            // fortime(stime, etime);
            var etime=stime;//为了判断才加的
            i = fortime(stime, etime);
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
            var i =false;
            etime = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker2').val(etime);
            // fortime(stime, etime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
        
    });
    var datepicker11 = new Pikaday({
        field: jQuery('#datepicker11')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i =false;
            stime1 = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker11').val(stime1);
            // fortime(stime, etime);
            i = fortime(stime1, etime1);
            if (i){
                stime1 = '';
                etime1 = '';
            }
        }
        
    });
    var datepicker21 = new Pikaday({
        field: jQuery('#datepicker21')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i =false;
            etime1 = this.getMoment().format('YYYY-MM-DD'); // 得到的是string类型
            //starttime = document.createTextNode(this.getMoment().format('YYYY-MM-DD')+'');//生成的时间格式化成 2013-09-25 得到的是object类型
            $('#datepicker21').val(etime1);
            // fortime(stime, etime);
            i = fortime(stime1, etime1);
            if (i){
                stime1 = '';
                etime1 = '';
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
            i = fortime(stime, etime);
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
    var datepicker41 = new Pikaday({
        field: jQuery('#datepicker41')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            stime = this.getMoment().format('YYYY-MM-DD'); 
            $('#datepicker41').val(stime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    var datepicker42 = new Pikaday({
        field: jQuery('#datepicker42')[0],
        minDate: new Date('2015-01-01'),
        maxDate: new Date('2025-12-31'),
        yearRange: [2015, 2025],
        i18n: i18n,
        onSelect: function () {
            var i = false;
            etime = this.getMoment().format('YYYY-MM-DD');
            $('#datepicker42').val(etime);
            i = fortime(stime, etime);
            if (i){
                stime = '';
                etime = '';
            }
        }
    });
    //输入起始时间匹配结束时间
    $("#datepicker1").change(function () {
        var value = $(this).val();
        if (value != ''){
            $("#datepicker2").val(value);
        }
    })
    //添加、修改时  选择合同编号自动匹配项目名称
    $("#cont").change(function () {
        var dutyname = $("select[name='dutyname'] option:selected").val();
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno && dutyname == v.dutyname) {
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
                    // $("select[name='dutyname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.dutyname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
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
            // $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department'] option").eq(0).attr('selected', 'selected');
            $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //添加、修改时  选择项目名称自动匹配合同编号
    $("#projectname").change(function () {
        var dutyname = $("select[name='dutyname'] option:selected").val();
        var value = $(this).val();
        //console.log(value);
        //console.log(dataset);
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname && dutyname == v.dutyname) {
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
                    // $("select[name='dutyname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.dutyname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
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
            $("#cont_write").attr("value",'');
            $("#cont_write").prop("value",'');
            $("select[name='cont'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
            $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department'] option").eq(0).attr('selected', 'selected');
            $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    
     //筛选周报时周报  选择合同编号自动匹配项目名称
    $("#cont1").change(function () {
        var value = $(this).val();
        // console.log(value);
        // console.log(dataset);
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    console.log(v);
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
                    })
                    $("select[name='clientname1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.clientname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='dutyname1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.dutyname1) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='sell1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.salename) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='department1'] option").each(function () {
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
            $("select[name='projectname1'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write1").attr("value", '');
            $("#projectname_write1").prop("value", '');
            $("select[name='projectname1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='clientname1'] option").eq(0).attr('selected', 'selected');
            $("select[name='clientname1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell1'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department1'] option").eq(0).attr('selected', 'selected');
            $("select[name='department1'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选周报时  选择项目名称自动匹配合同编号
    $("#projectname1").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    console.log(v);
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
                        }
                    })
                    $("select[name='clientname1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.clientname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='dutyname1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.dutyname1) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='sell1'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.salename) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                    $("select[name='department1'] option").each(function () {
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
            $("select[name='cont1'] option").eq(0).attr('selected', 'selected');
            $("#cont_write1").attr("value",'');
            $("#cont_write1").prop("value",'');
            $("select[name='cont1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='clientname1'] option").eq(0).attr('selected', 'selected');
            $("select[name='clientname1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell1'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell1'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department1'] option").eq(0).attr('selected', 'selected');
            $("select[name='department1'] option").eq(0).siblings().removeAttr('selected');
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
    
    //项目负责人添加项目周报  选择合同编号自动匹配项目名称
    $("#cont21").change(function () {
        $("input[name='guidang21']").val('');
        $("select[name='huowu21'] option").eq(0).attr('selected','selected');
        $("select[name='huowu21'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='chuyan21'] option").eq(0).attr('selected','selected');
        $("select[name='chuyan21'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='zhongyan21'] option").eq(0).attr('selected','selected');
        $("select[name='zhongyan21'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='yikaipiao21']").val('');
        $("input[name='yishoukuan21']").val('');
        var value = $(this).val();
        if (value != '' && dataset_persondata_all1.length > 0) {
            $.each(dataset_persondata_all1, function (i, v) {
                if (value == v.contractno) {
                    $("select[name='projectname21'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='projectname21'] option").eq(0).attr('selected', 'selected');
            $("select[name='projectname21'] option").eq(0).siblings().removeAttr('selected');;
        }
        postRequest('/select_last_pro_update/',{
            "data":JSON.stringify({"contractno":value})
        },function(data){
            if (data.result == 1||data.result == '1'){
                $("input[name='guidang21']").val((data.data.archiving_situation*100).toFixed(0));
                
                $("select[name='huowu21'] option").each(function(l,k){
                    if($(this).val() == data.data.cargo_inventory){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='chuyan21'] option").each(function(l,k){
                    if($(this).val() == data.data.preliminary_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='zhongyan21'] option").each(function(l,k){
                    if($(this).val() == data.data.final_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("input[name='yikaipiao21']").val((data.data.invoiced*100).toFixed(0));
                    
                $("input[name='yishoukuan21']").val((data.data.receivable*100).toFixed(0));
                
            }
        })
    });
      
    //项目负责人添加项目周报  选择项目名称自动匹配合同编号
    $("#projectname21").change(function () {
        $("input[name='guidang21']").val('');
        $("select[name='huowu21'] option").eq(0).attr('selected','selected');
        $("select[name='huowu21'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='chuyan21'] option").eq(0).attr('selected','selected');
        $("select[name='chuyan_21'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='zhongyan21'] option").eq(0).attr('selected','selected');
        $("select[name='zhongyan21'] option").eq(0).siblings().removeAttr('selected');
        $("input[name='yikaipiao21']").val('');
        $("input[name='yishoukuan21']").val('');
        var contractno='';
        var value = $(this).val();
        if (value != '' && dataset_persondata_all1.length > 0) {
            $.each(dataset_persondata_all1, function (i, v) {
                if (value == v.projectname) {
                    $("select[name='cont21'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            contractno = v.contractno;
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='cont21'] option").eq(0).attr('selected', 'selected');
            $("select[name='cont21'] option").eq(0).siblings().removeAttr('selected');;
        }
         postRequest('/select_last_pro_update/',{
            "data":JSON.stringify({"contractno":contractno})
        },function(data){
            if (data.result == 1||data.result == '1'){
                $("input[name='guidang21']").val((data.data.archiving_situation*100).toFixed(0));
                
                $("select[name='huowu21'] option").each(function(l,k){
                    if($(this).val() == data.data.cargo_inventory){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='chuyan21'] option").each(function(l,k){
                    if($(this).val() == data.data.preliminary_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='zhongyan21'] option").each(function(l,k){
                    if($(this).val() == data.data.final_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("input[name='yikaipiao21']").val((data.data.invoiced*100).toFixed(0));
                    
                $("input[name='yishoukuan21']").val((data.data.receivable*100).toFixed(0));
                
            }
        })
    });
    
    $("#cont31").change(function () {
        $("input[name='Last_week_trends31']").val('');
        $("input[name='Next_week_plan31']").val('');
        var value = $(this).val();
        if (value != '' && dataset_persondata_all1.length > 0) {
            $.each(dataset_persondata_all1, function (i, v) {
                if (value == v.contractno) {
                    $("select[name='projectname31'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.projectname) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='projectname31'] option").eq(0).attr('selected', 'selected');
            $("select[name='projectname31'] option").eq(0).siblings().removeAttr('selected');;
        }
        postRequest('/select_last_pro_report/',{
            "data":JSON.stringify({"contractno":value})
        },function(data){
            if (data.result == 1||data.result == '1'){
                
                $("input[name='Last_week_trends31']").val(data.data.next_week_plan);
                    
            }
        });
    });
    $("#projectname31").change(function () {
        var contractno='';
        $("input[name='Last_week_trends31']").val('');
        $("input[name='Next_week_plan31']").val('');
        var value = $(this).val();
        if (value != '' && dataset_persondata_all1.length > 0) {
            $.each(dataset_persondata_all1, function (i, v) {
                if (value == v.projectname) {
                    $("select[name='cont31'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            contractno=v.contractno;
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                        }
                    })
                }
            })
        } else {
            $("select[name='cont31'] option").eq(0).attr('selected', 'selected');
            $("select[name='cont31'] option").eq(0).siblings().removeAttr('selected');;
        }
        postRequest('/select_last_pro_report/',{
            "data":JSON.stringify({"contractno":contractno})
        },function(data){
            if (data.result == 1||data.result == '1'){
                
                $("input[name='Last_week_trends31']").val(data.data.next_week_plan);
                    
            }
        })
    });
    //筛选归档时选择合同编号匹配项目名称
     $("#cont4").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
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
                }
            })
        } else {
            $("select[name='projectname4'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write4").attr("value", '');
            $("#projectname_write4").prop("value", '');
            $("select[name='projectname4'] option").eq(0).siblings().removeAttr('selected');;
        }
    });
     //筛选归档时选择项目名称匹配合同编号
    $("#projectname4").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.projectname) {
                    $("select[name='cont4'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.contractno) {
                            $(this).prop('selected', 'selected');
                            $(this).attr('selected', 'selected');
                            $("#cont_write4").attr("value",$(this).val());
                            $("#cont_write4").prop("value",$(this).val());
                        }
                    })
                }
            })
        } else {
            $("select[name='cont4'] option").eq(0).attr('selected', 'selected');
            $("select[name='cont4'] option").eq(0).siblings().removeAttr('selected');
            $("#cont_write4").attr("value", '');
            $("#cont_write4").prop("value", '');
        }
    });
    //选择工作时长和工作类自动计算当天的固定费用
    $("#workload,#worktype").change(function () {
        // var val = $(this).val() || 0;
        var worktype = $("select[name='worktype'] option:selected").val();
        var val = $("select[name='workload'] option:selected").val();
        if (worktype != "其它事务" && worktype != ""){
            var value = parseFloat(val);
            // var lval = $("select[name='level']").val().replace(/[^\d.]/g, '');
            var lval = persondata.level.replace(/[^\d.]/g, '');
            var levelvalue = parseFloat(lval);
            // console.log(levelvalue);
            // console.log(value);
            var cost = Math.floor(((value * levelvalue) / 21.75 ).toFixed(2) * 12000 * 100) / 100;
            // console.log(cost);
            $("#fixed_costs").html(cost.toFixed(2));
        }else{
            $("#fixed_costs").html(0);
        }
    })
    //选择项目负责人，匹配填充项目名称合同号的下拉框
    $("#dutyname").change(function(){
        $("select[name='projectname'] option").eq(0).attr('selected', 'selected');
        $("#projectname_write").attr("value", '');
        $("#projectname_write").prop("value", '');
        $("select[name='projectname'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='cont'] option").eq(0).attr('selected', 'selected');
        $("#cont_write").attr("value",'');
        $("#cont_write").prop("value",'');
        $("select[name='cont'] option").eq(0).siblings().removeAttr('selected');
        oneper_duty_prj();
        
     })
    
    //添加数据按钮
    $("#addwordcontentbtn").on('click', function () {
        $("#workprocess").addClass('showPopup');
        $(".md-overlay").addClass('showOverlay');
        $("#header-title").html('新增日报记录');
        $("#addwc").show();
        $("#addwc_goon").show();
        $("#updatewc").hide();
        var level = persondata.level.replace(/[^\d.]/g, '');
        $("#level").html(level);
        // $("select[name='level'] option").each(function () {
            // if ($(this).val() == persondata.level) {
                // $(this).prop('selected', 'selected');
                // $(this).attr('selected', 'selected');
            // }
        // })
        // $("select[name='level']").addClass('disabled');
        // $("select[name='level']").attr('disabled', 'true');
        reset_work_content()
    })
    // displayProject();
    //修改密码按钮
    $("#alterPassword").click(function () {
        $("#alterpassword").addClass('showPopup');
        $(".md-overlay").addClass('showOverlay');
        var oH = $("#alterpassword").find(".popup-Content-box").height();
        $("#alterpassword").height(oH);
        $("#alterpassword").siblings('.popup-Box').css('height', 'auto');
        $("input[name='member_id']").val(persondata.id);
    })
    
    //导入数据
    // var fileInput = document.getElementById("fileInput");
    // fileInput.addEventListener('change', function (event) {
        // var file1 = fileInput.files[0];
        // var file = new FormData();
        // file.append('file', file1);
        // // 或file = fileInput.files.item(0);
        // console.log(file);
        // $.ajax({
            // url: "/upload_info/",
            // type:'POST',
            // data: file,
            // processData: false,
            // contentType: false,
            // success: function(data) {
                // console.log(data);
                // if(data.result == '1' || data.result == 1){
                    // myalert('系统提示框','提交成功');
                    // show_work_table(persondata.id);
                // } else{
                    // myalert('系统提示框','提交出错');
                // }
            // }
        // });
    // }, false);
display_project_report();
displaySale();
getEquipment();
show_work_count();
show_work_count_month();
get_update_tishi();
});

//判断两次日期输入是否正确、并比较先后
function fortime(s, e) {
    if (s && e) {
        var reg = new RegExp("-", "g");
        var st = s.toString().replace(reg, '');
        var et = e.toString().replace(reg, '');
        // var st_year = st.slice(0,4);
        // var st_month = st.slice(4,6);
        // var st_day = st.slice(6,8);
        // checkdate(st_year,st_month,st_day);
        // var et_year = st.slice(0,4);
        // var et_month = st.slice(4,6);
        // var et_day = st.slice(6,8);
        // checkdate(et_year,et_month,et_day);
        if (s > e) {
            var s = ($("input[name='starttime']").val(''));
            var e = ($("input[name='endtime']").val(''));
            var s = ($("input[name='starttime1']").val(''));
            var e = ($("input[name='endtime1']").val(''));
            var s = ($("input[name='starttime3']").val(''));
            var e = ($("input[name='endtime3']").val(''));
            myalert('系统提示框','开始时间不能大于结束时间');
            return true;
        }
    }
}
/* 点击"筛选"出现弹窗*/
function select_work_content(){
    $("#shaixuan").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#shaixuan").find(".popup-Content-box").height();
    $("#shaixuan").height(oH);
    $("#shaixuan").siblings('.popup-Box').css('height', 'auto');
    $("#staffname1").val($(".username").html());
    resetchoose();
}
/* 点击"退回"出现弹窗*/
function alertreturn(id){
    $("input[name='returnreasons_id']").val('');
    $("textarea[name='reasonscontent']").val('');
    $("#alter_returnReasons").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#alter_returnReasons").find(".popup-Content-box").height();
    $("#alter_returnReasons").height(oH);
    $("#alter_returnReasons").siblings('.popup-Box').css('height', 'auto');
    $("input[name='returnreasons_id']").val(id);
}
//重置按钮
function resetchoose(){
    // console.log(worktypeset);
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
    $.each(val11, function (i, v) {
        html3 += '<option value="' + v + '">' + v + '</option>';
    });
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
    $("input[name='starttime1']").val('');
    $("input[name='endtime1']").val('');
    $("input[name='cont_write1']").val('');
    $("input[name='projectname_write1']").val('');
    $("#cont1").html(html1);
    $("#projectname1").html(html2);
    // $("#clientname1").html(html3);
    $("#clientname1").val('');
    $("#sell1").html(html4);
    $("#department1").html(html5);
    $("#city1").html(html6);
    $("#dutyname1").html(html8);
    $("#worktype1").html(html9);
    $("#workitem1").html(html10);
    
    $(".searchable-select-holder").html('省/市');
    $("select[name='cont1'] option").eq(0).attr('selected', 'selected');
    $("select[name='site1'] option").eq(0).attr('selected', 'selected');
    $("select[name='site1'] option").eq(0).prop('selected', 'selected');
    $("select[name='city1'] option").eq(0).attr('selected', 'selected');
    var all_searchable_select_item = $(".searchable-select-items").find("div")
    for(var i = 0 ; i < all_searchable_select_item.length ; i++){
        all_searchable_select_item.eq(i).removeClass("selected");
    };
    $("select[name='staffname1'] option").eq(0).attr('selected', 'selected');
    $("select[name='staffname1'] option").eq(0).siblings().removeAttr('selected');
    stime = '';
    etime = '';
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
                    <td height="30">'+v.emailaddr+'</td>';
            });
            $("#display_saleman").html(html);
        }
    },function(err){
        console.log(err);
    })
}
//展示所有项目
function displayProject() {
    var username=$("#headername").html();
    postRequest('/display_project/', {

    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            dataset = data.data;
            var html1 = '<option value="">请选择</option>';
            var html2 = '<option value="">请选择</option>';
            var html3 = '<option value="">请选择</option>';
            var html4 = '<option value="">请选择</option>';
            var html5 = '<option value="">请选择</option>';
            var html6 = '<option value="">请选择</option>';
            var html7 = '<option value="">请选择</option>';
            var html8 = '<option value="">请选择</option>';
            var html0 = '<option value="">请选择</option>';
            var html9 = '<option value="">请选择</option>';
            var val1 = [];
            var val2 = [];
            var val3 = [];
            var val4 = [];
            var val5 = [];
            $.each(dataset, function (i, v) {
                if(v.dutyname==username){
                    dataset_persondata_all1.push(v);
                }
                val1.push(v.clientname);
                val2.push(v.salename);
                val3.push(v.department);
                val4.push(v.dutyname);
                html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                if (v.state=='进行中'){
                    html0 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    html9 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                }
            });
            if (dataset_persondata_all1.length!=0){
                postRequest('/sort_prj_contentdata/',{
                    'data':JSON.stringify({'data':dataset_persondata_all1})
                },function(data){
                    if (data.result == '1' || data.result == 1){
                        dataset_persondata_all=data.data;
                    }
                });
            }
            ///////////////////////////////////////////////dataset_persondata_all1.sort();
            if(dataset_persondata_all1.length==0){
                $("#project_all").parent().remove();
                $("#prj_reportMg").remove();
            }
            if(dataset_persondata_all1.length>0){
                // $("#project_all").removeClass("display_none");
                $("#prj_reportMg").removeClass("display_none");
                var htm1 = '<option value="">请选择</option>';
                var htm2 = '<option value="">请选择</option>';
                var htm3 = '<option value="">请选择</option>';
                var htm4 = '<option value="">请选择</option>';
                $.each(dataset_persondata_all1,function(i,v){
                    htm1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    htm2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                    if(v.state=='进行中'){
						htm3 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
						htm4 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
					}
                });
                $("#cont21").html(htm3);
                $("#projectname21").html(htm4);
                // $("#projectname3").html(htm4);
                $("#cont31").html(htm1);
                $("#projectname31").html(htm2);
            }
            var val11 = unique(val1);
            var val22 = unique(val2);
            var val33 = unique(val3);
            var val44 = unique(val4);
            $.each(worktypeset,function (i , v) {
                val5.push(v.worktype);
            })
            var val55 = unique(val5);
            postRequest('/sort_clientname/', {
                "data": JSON.stringify(val11)
            }, function (data) {
                if (data.result=='1'||data.result==1){
                    $.each(data.data, function (i, v) {
                        html3 += '<option value="' + v + '">' + v + '</option>';
                        
                    });
                    $("#clientname").html(html3);
                    $("#clientname1").html(html3);
                    $("#clientname3").html(html3);
                }
            }, function (err){
                console.log(err);
            })
            
            $.each(val22, function (i, v) {
                html4 += '<option value="' + v + '">' + v + '</option>';
            });
            $.each(val33, function (i, v) {
                html5 += '<option value="' + v + '">' + v + '</option>';
            });
            $.each(val44, function (i, v) {
                html6 += '<option value="' + v + '">' + v + '</option>';
            });
             $.each(val55, function (i, v) {
                html7 += '<option value="' + v + '">' + v + '</option>';
            });
            // $("#cont").html(html1);
            // $("#cont3").html(html0);
            // $("#projectname").html(html2);
            // $("#projectname3").html(html9);
            // $("#clientname").html(html3);
            // $("#clientname3").html(html3);
            $("#sell").html(html4);
            $("#sell3").html(html4);
            $("#department").html(html5);
            $("#dutyname").html(html6);
            $("#dutyname3").html(html6);
            $("#cont1").html(html1);
            $("#projectname1").html(html2);
            // $("#clientname1").html(html3);
            // $("#clientname3").html(html3);
            $("#sell1").html(html4);
            $("#department1").html(html5);
            $("#dutyname1").html(html6);
            $("#worktype").html(html7);
            $("#worktype1").html(html7);
            $("#workitem").html(html8);
            $("#workitem1").html(html8);
            // $("#cont").searchableSelectcontent();
        }
    }, function (err) {
        console.log(err);
    })
}
//选择项目负责人，匹配填充项目名称合同号的下拉框
function oneper_duty_prj(){
    var dutyname = $("select[name='dutyname'] option:selected").val();
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
        "daohuo": "",
        // "shishi": "",
        "clientname":"",
        "dutyname": dutyname,
        "salename":"",
        }
        one_duty_prj = select_before(dataset,data);
       
        $.each(one_duty_prj,function(i,v){
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        })
        $("#cont").html(html1);
        $("#projectname").html(html2);
    }else{
        $("#cont").html(html1);
        $("#projectname").html(html2);
    }
}
//添加数据确认
function add_work_content(str) {
    var starttime = $("input[name='starttime']").val();
    var endtime = $("input[name='endtime']").val();
    // var cont = $("select[name='cont'] option:selected").val();
    var cont = $("input[name='cont_write']").val();
    var site = $("select[name='site'] option:selected").val();
    var city = $("select[name='city'] option:selected").val();
    var county = $("select[name='county'] option:selected").val();
    // var level = $("select[name='level']").val();//人员系数
    // var lval = $("select[name='level']").val().replace(/[^\d.]/g, '');//获得人员系数数字部分
    var level = $("#level").html();
    // var projectname = $("select[name='projectname'] option:selected").val();
    var projectname = $("input[name='projectname_write']").val();
    var clientname = $("select[name='clientname'] option:selected").val();
    var dutyname = $("select[name='dutyname'] option:selected").val();
    var sell = $("select[name='sell'] option:selected").val();
    var department = $("select[name='department'] option:selected").val();
    var workload = $("select[name='workload'] option:selected").val();//日工程量
    var toresult = $("#toresult").val();
    var worktype = $("#worktype").val();
    var workitem = $("#workitem").val();
    var workcontent = $("#workcontent").val();
    var requestResources = $("#requestResources").val();
    var fixedcosts = $("#fixed_costs").html().replace('元', '');
    var username = $(".username").html();
    var memberid = persondata.id;
    var othercost = [];
    $("input[name='othercost']").each(function () {
        var name = $(this).val();
        var at = $(this).attr('id');
        var fee = $('input[name=fee' + at + ']').val();
        if (fee == ""|| null){
            fee = 0;
        } else{
            fee =parseFloat(fee).toFixed(2);
        } 
        // var remark = $('input[name=remark' + at + ']').val();
        var data = {
            "costname": name,
            "fee": fee || 0,
            // "remark": remark || ''
        }
        othercost.push(data);
    })
    othercost = JSON.stringify(othercost)//*************************************************//
    var remark = $("input[name='remark']").val();
    
    var num1 = document.getElementById('1_value').value||0; //获取市内交通的值
    var num2 = document.getElementById('2_value').value||0;  //获取差旅交通的值
    var num3 = document.getElementById('3_value').value||0;  //获取出差补助的值
    var num4 = document.getElementById('4_value').value||0;  //获取住宿费的值
    var num5 = document.getElementById('5_value').value||0;  //获取其他的值
    num1 = parseFloat(num1);  //转换为数字
    num2 = parseFloat(num2);
    num3 = parseFloat(num3);
    num4 = parseFloat(num4);
    num5 = parseFloat(num5);
    if(username == dutyname){
        var data = { "workdate": starttime, "endtime":endtime,"contractno": cont, "province": site, "city": city,"county": county, "projectname": projectname,"clientname":clientname,"dutyname":dutyname,"salename":sell,"department":department, "workload": workload, "worktype":worktype,"workitem":workitem,"workcontent": workcontent, "toresult": toresult,"othercost": othercost, "fixedcost": fixedcosts, "membername": username, "memberid": memberid,"request": requestResources, "level": level, "remark": remark, "flag":"1" };
    } else {
        var data = { "workdate": starttime, "endtime":endtime,"contractno": cont, "province": site, "city": city,"county": county, "projectname": projectname,"clientname":clientname,"dutyname":dutyname,"salename":sell,"department":department, "workload": workload, "worktype":worktype,"workitem":workitem,"workcontent": workcontent, "toresult": toresult,"othercost": othercost, "fixedcost": fixedcosts, "membername": username, "memberid": memberid,"request": requestResources, "level": level, "remark": remark, "flag":"2" };

    }
    console.log(data);
    var address = site + city + county;
    if ((cont == '' && projectname == '')||(starttime == '' || endtime == '' || address == '' || workload == '' ||  workload == '0.00' ||worktype =='' ||workitem==''|| workcontent == '' || toresult == '' || city == ''|| site == '')) {
        myalert('系统提示框','数据不能为空');
    } else if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5)) {  //如果为非数字弹出警告
        myalert('系统提示框','金额输入类型错误');
    } else if(cont != $("select[name='cont'] option:selected").val() || projectname != $("select[name='projectname'] option:selected").val()){
        myalert('系统提示框','项目错误');
    } else {
        postRequest('/add_work_content/', {
            "data": JSON.stringify(data)
        }, function (data) {
            // console.log(data);
            if (data.result == 1 || data.result == '1') {
                // console.log(str);
                if (!str){//判断否需要继续添加，不为空则不关闭弹窗继续添加
                    $("#workprocess").removeClass('showPopup');
                    $(".md-overlay").removeClass('showOverlay');
                }
                // show_work_table(memberid);
                produce_page_for_showAll();//显示翻页
                showAll_query(1);
                myalert('系统提示框',"添加成功");
            }else{
                myalert('系统提示框',"添加失败");
            }
        });
    }
}
//生成显示日报的page栏
function produce_page_for_showAll(str){
    $("#padding_lhb").html('');
    $("#paging").show();
    var starttime = $("input[name='starttime1']").val()||'';
    var endtime = $("input[name='endtime1']").val()||'';
    var contractno = $('#cont_write1').val()||'';
    var province = $("select[name='site1'] option:selected").val()||'';
    var city = $("select[name='city1'] option:selected").val()||'';
    var projectname = $('#projectname_write1').val()||'';
    var worktype = $("select[name='worktype1'] option:selected").val()||'';
    var workitem = $("select[name='workitem1'] option:selected").val()||'';
    var clientname = $("select[name='clientname1'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname1'] option:selected").val()||'';
    var salename = $("select[name='sell1'] option:selected").val()||'';
    var department = $("select[name='department1'] option:selected").val()||'';
    var membername = $("select[name='staffname1'] option:selected").val()||persondata.firstname;
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
    if (str == 'select'){flag = ["0","1"];}else{var flag = ["0","1","2","3","4"];}
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
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_5_active(1,2,\''+str+'\')"><a>首页</a></li>';
                html1 += '<li class="previous" style="margin-right:10px;" onclick="show_previous_page(2,\''+str+'\')"><a>上一页</a></li>';
                for (var i =1; i <= data.page_num; i++){
                    if (1 == i){
                        html1 += '<li class="active" style="display:inline;background:#ccc" onclick="show_5_active(1,2,\''+str+'\')"><a><span>1</span></a></li>';
                    }else if(i<=5){
                        html1 += '<li class="active" style="display:inline" onclick="show_5_active('+i+',2,\''+str+'\')"><a><span>'+i+'</span></a></li>';
                    }else{
                        html1 += '<li class="active" style="" onclick="show_5_active('+i+',2,\''+str+'\')"><a><span>'+i+'</span></a></li>';
                    }
                }
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_next_page(2,\''+str+'\')"><a>下一页</a></li>';
                html1 += '<li class="next" style="margin-left:10px;" onclick="show_last_page(2,\''+str+'\')"><a>尾页</a></li>';
                
                html1 += '<li class="" style="margin-left:10px;"><input id ="input_page" placeholder="1" style="border:0;width:50px;line-height:30px;text-align:center"/></li>';
                html1 += '<li class="next" style="margin-left:10px;" onclick="jump_that_page(2,\''+str+'\')"><a>跳转</a></li>';
                
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
function showAll_query(i,str){
    console.log(i);
    var current_page = i||1;
    var starttime = $("input[name='starttime1']").val()||'';
    var endtime = $("input[name='endtime1']").val()||'';
    // var contractno = $('#cont_write1').val()||'';
    var contractno = $("select[name='cont1'] option:selected").val()||'';
    var province = $("select[name='site1'] option:selected").val()||'';
    var city = $("select[name='city1'] option:selected").val()||'';
    // var projectname = $('#projectname_write1').val()||'';
    var projectname = $("select[name='projectname1'] option:selected").val()||'';
    var worktype = $("select[name='worktype1'] option:selected").val()||'';
    var workitem = $("select[name='workitem1'] option:selected").val()||'';
    var clientname = $("select[name='clientname1'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname1'] option:selected").val()||'';
    var salename = $("select[name='sell1'] option:selected").val()||'';
    var department = $("select[name='department1'] option:selected").val()||'';
    if (str == 'select'){
        var membername = $("select[name='staffname1'] option:selected").val()||'';
    }else{
        var membername = $("select[name='staffname1'] option:selected").val()||persondata.firstname;
    }
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
    if (str == 'select'){flag = ["0","1"];}else{var flag = ["0","1","2","3"];}
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
            // console.log(data.data);
            if (data.data.length) {
                workcontentdata = data.data;
                $.each(data.data, function (i, v) {
                    html += '\
                        <tr>\
                            <td>'+ (data.serialNummber+i) +'</td>\
                            <td>'+ (v.workdate).slice(0,10) + '</td>\
                            <td>'+ (v.endtime).slice(0,10) + '</td>\
                            <td>'+ v.province + v.city + '</td>\
                            <td>'+ v.contractno + '</td>\
                            <td style="text-align: left;">'+ v.projectname + '</td>\
                            <td>'+ v.clientname + '</td>\
                            <td>'+ v.dutyname + '</td>\
                            <td>'+ v.salename + '</td>\
                            <td>'+ v.department + '</td>\
                            <td>'+ v.worktype + '</td>\
                            <td>'+ v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>\
                            <td>'+v.membername +'</td>\
                            <td>'+ v.workload + '</td>\
                            <td>'+ v.level + '</td>\
                            <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>';
                    var count = 0;
                    $.each(v.othercost, function (j, k) {
                        html += '<td height="30">' + parseFloat(k.fee).toFixed(2) + '</td>';
                        count += Math.floor(parseFloat(k.fee)*100);
                    })
                    html +='<td>' + (count/100).toFixed(2) + '</td>';
                     if(v.flag=="2"||v.flag==2||v.flag=="1"||v.flag==1){
                        if(v.flag=="2"||v.flag==2){
                            html += '<td style="color:#cfcfe8" onclick="edit_box(\'' + v.id +'\', \''+persondata.id+'\')">待通过</td>';
                        } else{
                            html += '<td style="color:rgb(89, 89, 113)">待通过</td>';
                        }
                    } else if(v.flag=="3"||v.flag==3){
                         html += '<td style="color:#f1473a">未通过</td>';
                    } else{
                         html += '<td style="color:#1aac7d">已通过</td>';
                    }
                    html += '</tr>';
                });
                $("#display_work_content").html(html);
            }else{
                $("#display_work_content").html('<tr><td colspan="20">暂无数据</td></tr>');
            }
        }else{
            $("#display_work_content").html('<tr><td colspan="20">暂无数据</td></tr>');
        }
    },function(err){
        console.log(err);
    });
}
//显示单个员工记录
function show_work_table(memberid) {
    if ($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    $("#filePicker_addwordcontentbtn").show();
    $("#filePicker_search_btn").show();
    var data = { "memberid": memberid };
    postRequest('/display_work_content/', {
        "data": JSON.stringify(data)
    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            var html = '';
            if (data.data.length) {
                workcontentdata = data.data;
                if (workcontentdata.length < 14) {
                    var daysTotal = 0;
                    var monthTotal1 = 0;
                    var total = 0;
                    var fixcost= 0;
                    var serialNummber = 0;
                    $("#paging").hide();
                    $.each(workcontentdata, function (i, v) {
                        serialNummber++;
                        var address = v.province + v.city + v.county;
                        workdate = (v.workdate).slice(0,10);
                        html += '<tr>';
                        html += '<td>'+serialNummber+'</td>';
                        html += '<td>' + workdate + '</td>';
                        html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                        html += '<td>' + address + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.dutyname + '</td>';
                        html += '<td>' + v.salename + '</td>';
                        html += '<td>' + v.department + '</td>';
                        html += '<td>' + v.worktype + '</td>';
                        html += '<td>' + v.workitem + '</td>';
                        html += '<td style="text-align: left;">' + v.workcontent + '</td>';
                        html += '<td style="text-align: left;">' + v.toresult + '</td>';
                        // if (v.request == null || v.request == "") {
                            // html += '<td height="30">无</td>';
                        // } else {
                            // html += '<td height="30">' + v.request + '</td>';
                        // }
                        html += '<td>' + v.membername + '</td>';
                        html += '<td>' + v.workload + '</td>';
                        html += '<td>' + v.level + '</td>';
                        html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                        var count = 0;
                        $.each(v.othercost, function (j, k) {
                            html += '<td>' + parseFloat(k.fee).toFixed(2) + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                        })
                        // count=count.toFixed(2);
                        html += '<td>' + (count/100).toFixed(2) + '</td>';
                        if(v.flag=="2"||v.flag==2||v.flag=="1"||v.flag==1){
                            if(v.flag=="2"||v.flag==2){
                                html += '<td style="color:#cfcfe8" onclick="edit_box(\'' + v.id +'\', \''+memberid+'\')">待通过</td>';
                            } else{
                                html += '<td style="color:rgb(89, 89, 113)">待通过</td>';
                            }
                        } else if(v.flag=="3"||v.flag==3){
                             html += '<td style="color:#f1473a">未通过</td>';
                        } else{
                             html += '<td style="color:#1aac7d">已通过</td>';
                        }
                        // html += '<td height="30"><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                            // <button type="button" class="xiugai">修改\
                            // </button></a>&nbsp;&nbsp;<a href="javascript:;" onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"\
                            // ><button type="button" class="shanchu">删除</button></a></td>';
                        html += '</tr>';
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
                        //console.log(v.workload);
                        total += count;
                        
                        fixcost = fixcost + parseFloat(v.fixedcost);
                    })
                    var daysTotal = daysTotal.toFixed(2);
                    // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                    // var fixedcostTotal = Math.floor((monthTotal1 / 21.75) * 12000*100) / 100;
                    var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                    // var fixedcostTotal = monthTotal * 12000;
                    var fixedcostTotal = fixcost;
                    var othercostTotal = total/100;
                    var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                    $(".daysTotal").html(toMoney(daysTotal));
                    $(".monthTotal").html(toMoney(monthTotal));
                    $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                    $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                    $(".allTotal").html(toMoney(allTotal) + '元');
                    $("#display_work_content").html(html);
                } else {
                    $("#paging").show();
                    var html = '<div class="pagebox" id="pagebox"></div>';
                    $("#paging").html(html);
                    var total = workcontentdata.length;
                    var pagenum = Math.ceil(total / 14);
                    $('#pagebox').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            // console.log(page);
                            var html = '';
                            var min = (page - 1) * 14;
                            var max = page * 14;
                            var daysTotal = 0;
                            var monthTotal1 = 0;
                            var total = 0;
                            var fixcost= 0;
                            var serialNummber = 0;
                            $.each(workcontentdata, function (i, v) {
                                serialNummber++;
                                var address = v.province + v.city + v.county;
                                workdate = (v.workdate).slice(0,10);
                                html += '<tr>';
                                // html += '<td height="30"><input type="checkbox" value="['+v.id+','+v.memberid+']" name="piliang"></td>'
                                html += '<td>'+serialNummber+'</td>';
                                html += '<td>' + workdate + '</td>';
                                html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                                html += '<td>' + address + '</td>';
                                html += '<td>' + v.contractno + '</td>';
                                html += '<td style="text-align: left;">' + v.projectname + '</td>';
                                html += '<td>' + v.clientname + '</td>';
                                html += '<td>' + v.dutyname + '</td>';
                                html += '<td>' + v.salename + '</td>';
                                html += '<td>' + v.department + '</td>';
                                html += '<td>' + v.worktype + '</td>';
                                html += '<td>' + v.workitem + '</td>';
                                html += '<td style="text-align: left;">' + v.workcontent + '</td>';
                                html += '<td style="text-align: left;">' + v.toresult + '</td>';
                                // if (v.request == null || v.request == "") {
                                    // html += '<td height="30">无</td>';
                                // } else {
                                    // html += '<td height="30">' + v.request + '</td>';
                                // }
                                html += '<td>' + v.membername + '</td>';
                                html += '<td >' + v.workload + '</td>';
                                html += '<td>' + v.level + '</td>';
                                html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                                var count = 0;
                                $.each(v.othercost, function (j, k) {
                                    html += '<td height="30">' + parseFloat(k.fee).toFixed(2) + '</td>';
                                    count += Math.floor(parseFloat(k.fee)*100);
                                })
                            //count=count.toFixed(2);
                                html += '<td>' + (count/100).toFixed(2) + '</td>';
                                if(v.flag=="2"||v.flag==2||v.flag=="1"||v.flag==1){
                                   if(v.flag=="2"||v.flag==2){
                                        html += '<td style="color:#cfcfe8" onclick="edit_box(\'' + v.id +'\', \''+memberid+'\')">待通过</td>';
                                    } else{
                                        html += '<td style="color:rgb(89, 89, 113)">待通过</td>';
                                    }     
                                } else if(v.flag=="3"||v.flag==3){
                                    html += '<td style="color:#f1473a ">未通过</td>';
                                } else{
                                    html += '<td style="color:#1aac7d">已通过</td>';
                                }
                                // html += '<td height="30"><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                                    // <button type="button" class="xiugai">修改\
                                    // </button></a>&nbsp;&nbsp;<a href="javascript:;" onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"\
                                    // ><button type="button" class="shanchu">删除</button></a></td>';
                                html += '</tr>';
                                daysTotal += parseFloat(v.workload);
                                monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
                                //console.log(v.workload);
                                total += count;
                                
                                fixcost = fixcost + parseFloat(v.fixedcost);
                            })
                            var daysTotal = daysTotal.toFixed(2);
                            // var monthTotal = Math.floor((monthTotal1 / 21.75) * 100) / 100;
                            var monthTotal = (monthTotal1 / 21.75 ).toFixed(2);
                            // var fixedcostTotal = monthTotal * 12000;
                            var fixedcostTotal = fixcost;
                            // var fixedcostTotal =  Math.floor(monthTotal * 12000*100) / 100;
                            var othercostTotal = total/100;
                            var allTotal = (fixedcostTotal + othercostTotal).toFixed(2);
                            $(".daysTotal").html(toMoney(daysTotal));
                            $(".monthTotal").html(toMoney(monthTotal));
                            $(".fixedcostTotal").html(toMoney(fixedcostTotal) + '元');
                            $(".othercostTotal").html(toMoney(othercostTotal) + '元');
                            $(".allTotal").html(toMoney(allTotal) + '元');
                            $("#display_work_content").html(html);
                            $("#display_work_content").children('tr').each(function (index, value) {
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
                $(".daysTotal").html(0.00);
                $(".monthTotal").html(0.00);
                $(".fixedcostTotal").html(0.00 + '元');
                $(".othercostTotal").html(0.00 + '元');
                $(".allTotal").html(0.00 + '元');
                $("#display_work_content").html('<tr><td colspan="25">暂无数据</td></tr>');
                $("#paging").hide();
            }
        }
    }, function (err) {
        console.log(err);
    })
}

//修改数据页面
function edit_box(id, memberid) {
    $.each(workcontentdata, function (i, v) {
        if (v.id == id && v.memberid == memberid) {
            $("#workprocess").addClass('showPopup');
            $(".md-overlay").addClass('showOverlay');
            $("#header-title").html('修改日报记录');
            $("#addwc").hide();
            $("#addwc_goon").hide();
            $("#updatewc").show();
            reset_work_content();
            console.log(222);

            $("input[name='work_content_id']").val(v.id);
            $("input[name='work_content_flag']").val(v.flag);
            $("input[name='starttime']").val((v.workdate).slice(0,10));
            $("input[name='endtime']").val((v.endtime).slice(0,10));
            if (v.request != null) {
                $("#requestResources").val(v.request);
            }
            
            $("select[name='worktype'] option").each(function (j, k) {
                if ($(this).val() == v.worktype) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                    var html8 = '<option value="">请选择</option>';
                    var value = $(this).val();
                    $.each(worktypeset,function(a , b){
                        if(value == b.worktype){
                            html8 += '<option value="' + b.workitem + '">' + b.workitem + '</option>';
                        }
                    })
                    $("#workitem").html(html8);
                }
            });
            $("select[name='workitem'] option").each(function (j, k) {
                if ($(this).val() == v.workitem) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='clientname'] option").each(function (j, k) {
                if ($(this).val() == v.clientname) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
             $("select[name='dutyname'] option").each(function (j, k) {
                if ($(this).val() == v.dutyname) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='sell'] option").each(function (j, k) {
                if ($(this).val() == v.salename) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='department'] option").each(function (j, k) {
                if ($(this).val() == v.department) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            
            // var lval = persondata.level.replace(/[^\d.]/g, '')
            // var levelvalue = parseFloat(lval);
            // work_time=(v.workload / levelvalue).toFixed(1);
            // if (1.0 == work_time ){
                // work_time = 1;
            // }
            $("select[name='workload'] option").each(function (j, k) {
                if ($(this).val() == v.workload) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            var count = 0;
            $.each(v.othercost, function (j, k) {
                // console.log(k.costname);
                $("input[name='othercost']").each(function () {
                    if ($(this).val() == k.costname) {
                        // $(this).prop('checked', 'checked');
                        // $(this).attr('checked', 'checked');
                        var at = $(this).attr('id');
                        $('input[name=fee' + at + ']').val(k.fee);
                        count += parseFloat(k.fee);
                        //$('input[name=remark' + at + ']').val(k.remark);
                    }
                })
            });
             oneper_duty_prj();
            $("select[name='cont'] option").each(function (j, k) {
                if ($(this).val() == v.contractno) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                    $("#cont_write").attr("value",$(this).val());
                    $("#cont_write").prop("value",$(this).val());
                }
            });
            $("select[name='projectname'] option").each(function (j, k) {
                if ($(this).val() == v.projectname) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                    $("#projectname_write").attr("value",$(this).val());
                    $("#projectname_write").prop("value",$(this).val());
                }
            });
            document.getElementById('6_value').value = count.toFixed(2);
            $("#workcontent").val(v.workcontent);
            $("#toresult").val(v.toresult);
            if (v.province !== '') {
                $(".searchable-select-holder").html(v.province);
                $("select[name='site'] option:selected").val(v.province);
                var prov = v.province;
                if (prov !== '') {
                    $("#cityBox").show();
                    var oHtml1 = '<option value="">市/区</option>';
                    $.each(city, function (i, v) {
                        // console.log(i);
                        if (i == prov) {
                            $.each(v, function (j, k) {
                                oHtml1 += '<option value="' + j + '">' + j + '</option>';
                            })
                        }
                    })
                    $("#city").html(oHtml1);
                    var t1 = true;
                    $("select[name='city'] option").each(function (j, k) {
                        if ($(this).val() == v.city) {
                            t1 = false;
                            $(this).prop('selected', 'true');
                            $(this).attr('selected', 'true');
                            var cityvalue = v.city;
                            var oHtml2 = '<option value="">县/镇</option>';
                            $.each(city, function (i, v) {
                                // console.log(i);
                                $.each(v, function (j, k) {
                                    if (j == cityvalue) {
                                        $.each(k, function (m, n) {
                                            oHtml2 += '<option value="' + n + '">' + n + '</option>';
                                            // console.log(n);
                                        })
                                    }
                                })
                            })
                            $("#county").html(oHtml2);
                            $("select[name='county'] option").each(function (j, k) {
                                if ($(this).val() == v.county) {
                                    $(this).prop('selected', 'true');
                                    $(this).attr('selected', 'true');
                                }
                            });
                        }
                    });
                    if (t1) {
                        $("#county").html('<option value="">县/镇</option>');
                    }
                } else {
                    // $("#cityBox").hide();
                    $("#city").html('<option value="">市/区</option>');
                    $("#county").html('<option value="">县/镇</option>');
                }
            }
            $("select[name='level'] option").each(function () {
                if ($(this).val() == persondata.level) {
                    $(this).prop('selected', 'selected');
                    $(this).attr('selected', 'selected');
                }
            })
            $("select[name='level']").addClass('disabled');
            $("select[name='level']").attr('disabled', 'true');
            $("#fixed_costs").html(v.fixedcost);
        }
    })
}
//修改数据确认
function update_work_content() {
    var id = ($("input[name='work_content_id']").val()).toString()
    var starttime = $("input[name='starttime']").val();
    var endtime = $("input[name='endtime']").val();
   // var cont = $("select[name='cont'] option:selected").val();
    var cont = $("input[name='cont_write']").val();
    var site = $("select[name='site'] option:selected").val();
    var city = $("select[name='city'] option:selected").val();
    var county = $("select[name='county'] option:selected").val();
    // var lval = $("select[name='level']").val().replace(/[^\d.]/g, '');//获得人员系数数字部分
    var level = $("#level").html();
    // var projectname = $("select[name='projectname'] option:selected").val();
    var projectname = $("input[name='projectname_write']").val();
    var clientname = $("select[name='clientname'] option:selected").val();
    var dutyname = $("select[name='dutyname'] option:selected").val();
    var sell = $("select[name='sell'] option:selected").val();
    var department = $("select[name='department'] option:selected").val();
    var workload = $("select[name='workload'] option:selected").val();//日工程量
    var worktype = $("select[name='worktype'] option:selected").val();
    var workitem = $("select[name='workitem'] option:selected").val();
    var workcontent = $("#workcontent").val();
    var toresult = $("#toresult").val();
    var requestResources = $("#requestResources").val();
    var fixedcosts = $("#fixed_costs").html().replace('元', '');
    //var username = $.cookie("username");
    var memberid = persondata.id;
    var username = $(".username").html();
    // var levelvalue = parseFloat(lval);//人员系数的数字部分转化为数字
    // var workload =((workload*levelvalue).toFixed(2)).toString();//日工程量
    var remark = $("input[name='remark']").val();
    var flag = $("input[name='work_content_flag']").val();
    var othercost = [];
    $("input[name='othercost']").each(function () {
        var name = $(this).val();
        var at = $(this).attr('id');
        var fee = $('input[name=fee' + at + ']').val();
         if (fee == ""|| null){
            fee = 0;
        } else{
            fee =parseFloat(fee);
        } 
        //var remark = $('input[name=remark' + at + ']').val();
        var data = {
            "costname": name,
            "fee": fee || 0,
           // "remark": remark
        }
        othercost.push(data);
    })
	var num1 = document.getElementById('1_value').value||0; //获取市内交通的值
	var num2 = document.getElementById('2_value').value||0;  //获取差旅交通的值
	var num3 = document.getElementById('3_value').value||0;  //获取出差补助的值
	var num4 = document.getElementById('4_value').value||0;  //获取住宿费的值
	var num5 = document.getElementById('5_value').value||0;  //获取其他的值
	num1 = parseFloat(num1);  //转换为数字
	num2 = parseFloat(num2);
	num3 = parseFloat(num3);
	num4 = parseFloat(num4);
	num5 = parseFloat(num5);
    if(username == dutyname){
        var data = {"id": id, "workdate": starttime,"endtime":endtime, "contractno": cont, "province": site, "city": city, "county":county,"projectname": projectname, "clientname": clientname,"dutyname":dutyname, "salename": sell, "department": department,"workload": workload, "worktype":worktype,"workitem":workitem, "workcontent": workcontent, "toresult": toresult,"othercost": othercost,"fixedcost": fixedcosts,"membername": username, "memberid": memberid, "request": requestResources,"remark": remark ,"flag":"1"};
    } else {
        var data = {"id": id, "workdate": starttime,"endtime":endtime, "contractno": cont, "province": site, "city": city, "county":county,"projectname": projectname, "clientname": clientname, "dutyname":dutyname, "salename": sell, "department": department,"workload": workload, "worktype":worktype,"workitem":workitem,"workcontent": workcontent, "toresult": toresult, "othercost": othercost,"fixedcost": fixedcosts,"membername": username, "memberid": memberid, "request": requestResources,"remark": remark ,"flag":"2"};
    }
    console.log(data);
    var address = site + city + county;
    // return false;
    if ((cont == '' && projectname == '')||(starttime == ''||endtime=='' || address == '' || clientname == '' || sell == '' || department == '' || workload == '' || workload == '0.00'||worktype==''||workitem=='' || workcontent == '' || toresult == '' || site == '' || city == '' )) {
        myalert('系统提示框','数据不能为空')
    } else if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5)) {  //如果为非数字弹出警告
		myalert('系统提示框','金额输入类型错误');
	} else if(cont != $("select[name='cont'] option:selected").val() || projectname != $("select[name='projectname'] option:selected").val()){
        myalert('系统提示框','项目错误');
    } else{ postRequest('/update_work_content/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                    if(flag == 3){
                        select_option_flag_person();
                        var dutyname = $(".username").html();
                        var data = {"dutyname": dutyname };
                        postRequest('/select_option_flag_person/',{
                            "data": JSON.stringify(data)
                        },function(data){
                            console.log(data);
                            if(data.resule == 1 || data.result == '1'){
                                // $("#news_count").html(data.data.length);
                                display_news(data);
                            }
                        },function(err){
                            console.log(err);
                        })
                        myalert('系统提示框','修改成功');
                        $("#workprocess").removeClass('showPopup');
                        $(".md-overlay").removeClass('showOverlay');
                    }
                    if (flag == 1  || flag == 2){
                        // show_work_table(memberid);
                        produce_page_for_showAll();//显示翻页
                        showAll_query(1);
                        myalert('系统提示框','修改成功');
                        $("#workprocess").removeClass('showPopup');
                        $(".md-overlay").removeClass('showOverlay');
                    }
                } else {
                    myalert('系统提示框','添加失败');
                }
            }, function (err) {
                console.log(err);
            })
        }
    }
//删除数据操作
function del_work_content(id, memberid) {
    myconfirm('系统提示框','确定删除吗?',function(r) {
        if(r){
            console.log(id);
            var data = { "id": id }
            postRequest('/del_work_content/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                select_option_flag_person();
                    var dutyname = $(".username").html();
                    var data = {"dutyname": dutyname };
                    postRequest('/select_option_flag_person/',{
                        "data": JSON.stringify(data)
                    },function(data){
                        console.log(data);
                        if(data.resule == 1 || data.result == '1'){
                            // $("#news_count").html(data.data.length);
                            display_news(data);
                        }
                    },function(err){
                        console.log(err);
                    })
                    myalert('系统提示框',"删除成功");
                } else {
                    myalert('系统提示框','删除失败');
                }
            }, function (err) {
                console.log(err);
            })
        }
    });
}
//删除多条记录
// 无用
function del_work_content_more(){
    var chk_value =[];//定义一个数组
    var id = [];
    var memberid="";
    $('input[name="piliang"]:checked').each(function(){//遍历每一个名字为piliang的复选框，其中选中的执行函数    
        chk_value.push($(this).val());//将选中的值添加到数组chk_value中    
    });
    // console.log(chk_value);
    if (chk_value ==""||chk_value==null){
        myalert('系统提示框',"没有数据被选中")
    } else {
        $.each(chk_value,function(index,value){
            value = value.substring(1,50);
            value = value.split(",")
            id.push(value[0]);
            memberid = value[1];
        });
        myconfirm('系统提示框','确认删除选中的数据',function(r){
            if(r){
                var data = {"id" : id}
                postRequest('/del_work_content_more/',{
                    "data": JSON.stringify(data)
                },function(data){
                    console.log(data);
                    if (data.result ==1 || data.result == '1'){
                        myalert('系统提示框',data.count_success+'条数据删除成功');
                        show_work_table(memberid);
                    } else {
                        myalert('系统提示框','删除失败');
                    }
                },function(err){
                    console.log(err);
                })
            }
        });
    }
}

//显示空白添加数据页面
function reset_work_content() {
    // console.log(worktypeset);
    // console.log(dataset);
    var html1 = '<option value="">请选择</option>';
    var html2 = '<option value="">请选择</option>';
    var html3 = '<option value="">请选择</option>';
    var html4 = '<option value="">请选择</option>';
    var html5 = '<option value="">请选择</option>';
    var html6 = '<option value="">请选择</option>';
    var html7 = '<option value="">请选择</option>';
    var html8 = '<option value="">请选择</option>';
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
        // html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
        // html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
    });
    $.each(worktypeset,function(i , v){
        val5.push(v.worktype);
    })
    var val11 = unique(val1);
    var val22 = unique(val2);
    var val33 = unique(val3);
    var val44 = unique(val4);
    var val55 = unique(val5);
    $.each(val11, function (i, v) {
        html3 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val22, function (i, v) {
        html4 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val33, function (i, v) {
        html5 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val44, function (i, v) {
        html6 += '<option value="' + v + '">' + v + '</option>';
    });
    $.each(val55, function (i, v) {
        html7 += '<option value="' + v + '">' + v + '</option>';
    });
    $("#cont").html(html1);
    $("#projectname").html(html2);
    $("#clientname").html(html3);
    $("#sell").html(html4);
    $("#department").html(html5);
    $("#dutyname").html(html6);
    $("#worktype").html(html7);
    $("#workitem").html(html8);

    $("#fixed_costs").html(0)
    $("input[name='work_content_id']").val('');
    $("input[name='remark']").val('');
    $("input[name='starttime']").val('');
    $("input[name='endtime']").val('');
    $("#requestResources").val('');
    $(".searchable-select-holder").html('省/市');
    $("select[name='cont'] option").eq(0).attr('selected', 'selected');
    $("input[name='cont_write']").val('');
    var all_searchable_select_item = $(".searchable-select-items").find("div")
    for(var i = 0 ; i < all_searchable_select_item.length ; i++){
        all_searchable_select_item.eq(i).removeClass("selected");
    };
    $("select[name='site'] option").eq(0).attr('selected', 'selected');
    $("select[name='city'] option").eq(0).attr('selected', 'selected');
    $("#city").val("");//我加的
    $("select[name='county'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname'] option").eq(0).attr('selected', 'selected');
    $("input[name='projectname_write']").val('');
    $("select[name='worktype'] option").eq(0).attr('selected', 'selected');
    $("select[name='workitem'] option").eq(0).attr('selected', 'selected');
    $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
    $("select[name='sell'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
    $("select[name='department'] option").eq(0).attr('selected', 'selected');
    $("select[name='workload'] option").each(function () {
        $(this).removeAttr('selected');
    })
    $("select[name='workload'] option").eq(0).attr('selected', 'selected');
    $("#workcontent").val('');
    $("#toresult").val('');
    $("input[name='othercost']").each(function () {
        // $(this).removeAttr('checked');
        var at = $(this).attr('id');
        var fee = $('input[name=fee' + at + ']').val('');
        //var remark = $('input[name=remark' + at + ']').val('');
    })
     $("input[name='fee6']").val('');

    var oH = $("#workprocess").find(".popup-Content-box").height();
    $("#workprocess").css('max-height', oH);
    $("#workprocess").siblings('.popup-Box').css('height', 'auto');
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
//修改密码
function update_password() {
    console.log(persondata);
    var firstpassword = $("input[name='firstpassword']").val();
    var newpassword = $("input[name='newpassword']").val();
	var renewpassword = $("input[name='renewpassword']").val();
    if(firstpassword==''||newpassword==""||renewpassword==''){
        myalert('系统提示框',"数据不能为空")
    }else{
        if (newpassword!=renewpassword){
            myalert('系统提示框',"两次密码输入不一致！请重新输入")
        }else{
            myconfirm('系统提示框','确定修改密码？修改后请重新登入',function(r) {
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
                            console.log(data);
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
//计算变动费用小计
function getSum(obj) {
    if(String(obj.value).indexOf('.') > -1){ //判断有没有输入小数点

    }else{
        //删除当我输入第5位的整数时候进行删除
        obj.value = obj.value.replace(/[^\d]/g, "");
        obj.value = obj.value.replace(/(\d{4})\d*$/g, "$1");
        obj.value = obj.value.replace(/(\d*)\4/g,"$1$2");
    }
    obj.value = obj.value.replace(/[^\d.]/g,""); //清除数字和.以外的字符
    obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    obj.value = obj.value.replace(/\.{2,}/g,"."); //ֻ只保留第一个.
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//之能输入两个小数位
	var num1 = document.getElementById('1_value').value||0; //获取市内交通的值
	var num2 = document.getElementById('2_value').value||0;  //获取差旅交通的值
	var num3 = document.getElementById('3_value').value||0;  //获取出差补助的值
	var num4 = document.getElementById('4_value').value||0;  //获取住宿费的值
	var num5 = document.getElementById('5_value').value||0;  //获取其他的值
	num1 = Math.floor(parseFloat(num1)*100)/100;  //转换为数字
	num2 = Math.floor(parseFloat(num2)*100)/100;
	num3 = Math.floor(parseFloat(num3)*100)/100;
	num4 = Math.floor(parseFloat(num4)*100)/100;
	num5 = Math.floor(parseFloat(num5)*100)/100;
    document.getElementById('6_value').value = Math.floor(num1*100 + num2*100 + num3*100 + num4*100 + num5*100)/100;
	// if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5)) {  //如果为非数字弹出警告
		 // alert('金额输入有误');
	// } else {  //小计的值
		// document.getElementById('6_value').value = ((num1 + num2 + num3 + num4 + num5).toFixed(2));
		// }
    }
//按条件查询
function chooseinfo() {
    var starttime = $("input[name='starttime1']").val();
    var endtime = $("input[name='endtime1']").val();
    var contractno = $('#cont_write1').val();
    var province = $("select[name='site1'] option:selected").val();
    var city = $("select[name='city1'] option:selected").val();
    var projectname = $('#projectname_write1').val();
    var clientname = $("select[name='clientname1'] option:selected").val();
    var salename = $("select[name='sell1'] option:selected").val();
    var dutyname = $("select[name='dutyname1'] option:selected").val();
    var department = $("select[name='department1'] option:selected").val();
    var membername = $("select[name='staffname1'] option:selected").val();
    // var membername = $("input[name='staffname1']").val();
    var worktype = $("select[name='worktype1'] option:selected").val();
    var workitem = $("select[name='workitem1'] option:selected").val();
    if(contractno == '请选择'){contractno = '';}
    if(projectname == '请选择'){projectname = '';}
    var data = {
        "starttime": starttime,
        "endtime":endtime,
        "province": province,
        "city": city,
        "dutyname": dutyname,
        "contractno": contractno,
        "projectname": projectname,
        "worktype": worktype,
        "workitem": workitem,
        "clientname": clientname,
        "salename": salename,
        "department": department,
        "membername": membername,
        "user": membername
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
                workcontentdata = data.data
                if (workdetailset.length < 14) {
                    var daysTotal = 0;
                    var counttotal = 0;
                    var monthTotal1 = 0;
                    var fixcost = 0;
                    var serialNummber=0;
                    $("#paging").hide();
                    $.each(workdetailset, function (i, v) {
                        // console.log(workdetailset);
                        serialNummber++;
                        // console.log(serialNummber);
                        var address = v.province + v.city + v.county;
                        var workdate = (v.workdate).slice(0,10);
                        html += '<tr>';
                        // html += '<td height="30"><input type="checkbox" value="['+v.id+','+v.memberid+']" name="piliang"></td>'
                        html += '<td height="30">'+serialNummber+'</td>';
                        html += '<td>' + workdate + '</td>';
                        html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                        html += '<td>' + address + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.dutyname + '</td>';
                        html += '<td>' + v.salename + '</td>';
                        html += '<td>' + v.department + '</td>';
                        html += '<td>' + v.worktype + '</td>';
                        html += '<td>' + v.workitem + '</td>';
                        html += '<td style="text-align: left;">' + v.workcontent + '</td>';
                        html += '<td style="text-align: left;">' + v.toresult + '</td>';
                        // if (v.request == null || v.request == "") {
                            // html += '<td height="30">无</td>';
                        // } else {
                            // html += '<td height="30">' + v.request + '</td>';
                        // }
                        html += '<td>' + v.membername + '</td>';
                        html += '<td>' + v.workload + '</td>';
                        html += '<td>' + v.level + '</td>';
                        html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                        var count = 0;
                        $.each(v.othercost, function (j, k) {
                            html += '<td>' + parseFloat(k.fee).toFixed(2) + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                        })
                        html += '<td>' + (count/100).toFixed(2) + '</td>';
                         if(v.flag=="2"||v.flag==2||v.flag=="1"||v.flag==1){
                             html += '<td style="color:#cfcfe8">待通过</td>';
                        } else if(v.flag=="3"||v.flag==3){
                             html += '<td style="color:#f1473a">未通过</td>';
                        } else{
                             html += '<td style="color:#1aac7d">已通过</td>';
                        }
                        // html += '<td height="30"><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                            // <button type="button" class="xiugai">修改\
                            // </button></a>&nbsp;&nbsp;<a href="javascript:;" onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"\
                            // ><button type="button" class="shanchu">删除</button></a></td>';
                        html += '</tr>';
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
                        //console.log(v.workload);
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
                    $("#display_work_content").html(html);
                } else {
                    $("#paging").show();
                    var html = '<div class="pagebox" id="pagebox"></div>';
                    $("#paging").html(html);
                    var total = workdetailset.length;
                    var pagenum = Math.ceil(total / 14);
                    $('#pagebox').paging({
                        initPageNo: 1, // 初始页码
                        totalPages: pagenum, //总页数
                        totalCount: '共' + total + '条数据', // 条目总数
                        slideSpeed: 600, // 缓动速度。单位毫秒
                        jump: true, //是否支持跳转
                        callback: function (page) { // 回调函数
                            // console.log(page);
                            var html = '';
                            var min = (page - 1) * 14;
                            var max = page * 14;
                            var daysTotal = 0;
                            var monthTotal1 = 0;
                            var counttotal = 0;
                            var fixcost = 0;
                            var serialNummber=0;
                            $.each(workdetailset, function (i, v) {
                                serialNummber++;
                                var address = v.province + v.city + v.county;
                                workdate = (v.workdate).slice(0,10);
                                html += '<tr>';
                                // html += '<td height="30"><input type="checkbox" value="['+v.id+','+v.memberid+']" name="piliang"></td>'
                                html += '<td height="30">'+serialNummber+'</td>';
                                html += '<td>' + workdate + '</td>';
                                html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                                html += '<td>' + address + '</td>';
                                html += '<td>' + v.contractno + '</td>';
                                html += '<td style="text-align: left;">' + v.projectname + '</td>';
                                html += '<td>' + v.clientname + '</td>';
                                html += '<td>' + v.dutyname + '</td>';
                                html += '<td>' + v.salename + '</td>';
                                html += '<td>' + v.department + '</td>';
                                html += '<td>' + v.worktype + '</td>';
                                html += '<td>' + v.workitem + '</td>';
                                html += '<td style="text-align: left;">' + v.workcontent + '</td>';
                                html += '<td style="text-align: left;">' + v.toresult + '</td>';
                                html += '<td>' + v.membername + '</td>';
                                html += '<td>' + v.workload + '</td>';
                                html += '<td>' + v.level + '</td>';
                                html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                                // if (v.request == null || v.request == "") {
                                    // html += '<td height="30">无</td>';
                                // } else {
                                    // html += '<td height="30">' + v.request + '</td>';
                                // }
                                var count = 0;
                                $.each(v.othercost, function (j, k) {
                                    html += '<td >' + parseFloat(k.fee).toFixed(2) + '</td>';
                                    count += Math.floor(parseFloat(k.fee)*100);
                                })
                            //count=count.toFixed(2);
                                html += '<td>' + (count/100).toFixed(2) + '</td>';
                                 if(v.flag=="2"||v.flag==2||v.flag=="1"||v.flag==1){
                                    html += '<td style="color:#cfcfe8">待通过</td>';
                                } else if(v.flag=="3"||v.flag==3){
                                    html += '<td style="color:#f1473a">未通过</td>';
                                } else{
                                    html += '<td style="color:#1aac7d">已通过</td>';
                                }
                                // html += '<td height="30"><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                                    // <button type="button" style="color:#fff;background:#1AAD7E;border:solid #1AAD7E;border-radius:11px;">编辑\
                                    // </button></a>&nbsp;&nbsp;<a href="javascript:;" onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"\
                                    // ><button type="button" style="color:#fff;background:#F0473C;border:solid #F0473C;border-radius:11px;">清除</button></a></td>';
                                html += '</tr>';
                                daysTotal += parseFloat(v.workload);
                                monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
                                //console.log(v.workload);
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
                            $("#display_work_content").html(html);
                            $("#display_work_content").children('tr').each(function (index, value) {
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
                $("#display_work_content").html('<tr><td colspan="25">暂无数据</td></tr>');
                $("#paging").hide();
            }
        } else {
            myalert('系统提示框',"筛选失败")
        }
    }, function (err) {
        console.log(err);
    })
}

//消息
function select_option_flag_person(a){
    var dutyname = $(".username").html();
    var data = {"dutyname": dutyname };
    postRequest('/select_option_flag_person/',{
        "data": JSON.stringify(data)
    },function(data){
        // console.log(data);
        if(data.resule == 1 || data.result == '1'){
            $("#news_count").html(data.data.length);
            if (data.data.length != 0){
                $("#news_count").css("color","red");
            }else {$("#news_count").css("color","#fff");}
            $("#display_news").click (function(){
                $(".dataMgBox").siblings().hide();
                $(".saleBox").hide();
                $(".dataMgBox").show();
                $(".dataTrackBox").hide();
                $(".prj_reportBox").hide();
                $(".archiveBox").hide();
                $('.One_Cont_equipmentBox').hide()
                $("#filePicker_addwordcontentbtn").hide();
                $("#filePicker_search_btn").hide();
                $("#dataMg").addClass('libg');
                $("#dataMg").siblings().removeClass('libg');
                $("#project_daily").addClass('libg');
                $("#project_daily").siblings().removeClass('libg');
                $("#saleMg").removeClass('libg');
                $("#project_ing").removeClass('libg');
                $("#project_all").removeClass('libg');
                $("#prj_reportMg").removeClass('libg');
                $("#archiveMg").removeClass('libg');
                $("#equipmentMg").removeClass('libg');
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
                display_news(data);
            });
            if(a==null){
                
            }else {
                display_news(data);
            }
        }
    },function(err){
        console.log(err);
    })
}
//查看显示消息
function display_news(data){
    if ($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    var html = '';
    if (data.data.length) {
        workdetailset = data.data;
        workcontentdata = data.data
        if (workdetailset.length < 14) {
            var daysTotal = 0;
            var monthTotal1 = 0;
            var counttotal = 0;
            var fixcost = 0;
            var serialNummber=0;
            $("#paging").hide();
            $.each(workdetailset, function (i, v) {
                serialNummber++;
                var address = v.province + v.city;
                var workdate = (v.workdate).slice(0,10);
                var count = 0;
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
                    if($("#title_department").length>0){
                        html += '<td>' + v.salename + '</td>';
                    }
                    html += '\
                    <td>' + v.worktype + '</td>\
                    <td>' + v.workitem + '</td>\
                    <td style="text-align: left;">'+ v.workcontent + '</td>\
                    <td style="text-align: left;">'+ v.toresult + '</td>\
                    <td>'+v.membername +'</td>\
                    <td>'+ v.workload + '</td>\
                    <td>'+ v.level + '</td>\
                    <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>';
                $.each(v.othercost, function (j, k) {
                    html += '<td height="30">' + parseFloat(k.fee).toFixed(2) + '</td>';
                    count += Math.floor(parseFloat(k.fee)*100);
                })
                html += '<td height="30">'+ (count/100).toFixed(2) + '</td>';
                
                if (v.flag=="2"||v.flag==2){
                    html += '<td><a href="javascript:;" title="确认" onclick="change_flag_1(\'' + v.id +'\')">\
                    <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                    onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                }
                if(v.flag=="3"||v.flag==3){
                    html += '<td><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                    <button type="button" class="xiugai">修改</button></a>&nbsp;&nbsp;<a href="javascript:;" \
                    onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"><button type="button" class="shanchu">删除</button></a></td>';
                    html += '<td><a href="javascript:;" onclick="show_returnReasons(\'' + v.returnreasons + '\')">\
                    <button type="button" class="dongjie">原因</button></a></td>';
                }
                html += '</tr>';
                daysTotal += parseFloat(v.workload);
                monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
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
            $("#display_work_content").html(html);
        } else {
            $("#paging").show();
            var html = '<div class="pagebox" id="pagebox"></div>';
            $("#paging").html(html);
            var total = workdetailset.length;
            var pagenum = Math.ceil(total / 14);
            $('#pagebox').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    // console.log(page);
                    var html = '';
                    var min = (page - 1) * 14;
                    var max = page * 14;
                    var daysTotal = 0;
                    var monthTotal1 = 0;
                    var counttotal = 0;
                    var fixcost = 0;
                    var serialNummber=0;
                    $.each(workdetailset, function (i, v) {
                        serialNummber++;
                        var address = v.province + v.city;
                        var workdate = (v.workdate).slice(0,10);
                        var count = 0;
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
                            if($("#title_department").length>0){
                                html += '<td>' + v.salename + '</td>';
                            }
                            html += '\
                            <td>' + v.worktype + '</td>\
                            <td>' + v.workitem + '</td>\
                            <td style="text-align: left;">'+ v.workcontent + '</td>\
                            <td style="text-align: left;">'+ v.toresult + '</td>\
                            <td>'+v.membername +'</td>\
                            <td>'+ v.workload + '</td>\
                            <td>'+ v.level + '</td>\
                            <td>'+ parseFloat(v.fixedcost).toFixed(2) + '</td>';
                        $.each(v.othercost, function (j, k) {
                            html += '<td height="30">' + parseFloat(k.fee).toFixed(2) + '</td>';
                            count += Math.floor(parseFloat(k.fee)*100);
                        })
                        html += '<td height="30">'+ (count/100).toFixed(2) + '</td>';
                        if (v.flag=="2"||v.flag==2){
                            html += '<td><a href="javascript:;" title="确认" onclick="change_flag_1(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                            onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                        }
                        if(v.flag=="3"||v.flag==3){
                            html += '<td ><a href="javascript:;" onclick="edit_box(\'' + v.id + '\',\'' + v.memberid + '\')">\
                            <button type="button" class="xiugai">修改</button></a>&nbsp;&nbsp;<a href="javascript:;" \
                            onclick="del_work_content(\'' + v.id + '\',\'' + v.memberid + '\')"><button type="button" class="shanchu">删除</button></a></td>';
                            html += '<td ><a href="javascript:;" onclick="show_returnReasons(\'' + v.returnreasons + '\')">\
                            <button type="button" class="shanchu">原因</button></a></td>';
                        }
                        html += '</tr>';
                        daysTotal += parseFloat(v.workload);
                        monthTotal1 += (parseFloat(v.workload) * parseFloat(v.level));
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
                    $("#display_work_content").html(html);
                    $("#display_work_content").children('tr').each(function (index, value) {
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
        if(("#title_contractno").length>0){
        $("#display_work_content").html('<tr><td colspan="25">暂无数据</td></tr>');
        }
        else{
            $("#display_work_content").html('<tr><td colspan="21">暂无数据</td></tr>');
        }
        $("#paging").hide();
    }
}
//确认
function change_flag_1(id){
    var data_id = { "id": id };
    postRequest('/change_flag_1/', {
        "data_id": JSON.stringify(data_id)
    }, function (data_id) {
        // console.log(data_id);
        if (data_id.result == 1 || data_id.result == '1') {
            select_option_flag_person(data_id.result);
            // $("#display_news").trigger('click');
            // var dutyname = $(".username").html();
            // var data = {"dutyname": dutyname };
            // postRequest('/select_option_flag_person/',{
                // "data": JSON.stringify(data)
            // },function(data){
                // if(data.resule == 1 || data.result == '1'){
                    // display_news(data);
                // }
            // },function(err){
                // console.log(err);
            // })
            // console.log("确认成功");
        }
    }, function (err) {
        console.log(err);
    })
}
//退回
function change_flag_3(){
    var id = $("input[name=returnreasons_id]").val();
    if (id !=''){
        if(($("textarea[name='reasonscontent']").val())!=''){
            var reasonscontent = $("#headername").html()+ '：' + $("textarea[name='reasonscontent']").val();
            var data_id = { "id": id,"reasonscontent": reasonscontent};
            postRequest('/change_flag_3/', {
                "data_id": JSON.stringify(data_id)
            }, function (data_id) {
                if (data_id.result == 1 || data_id.result == '1') {
                $("#alter_returnReasons").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                    select_option_flag_person(data_id.result);
                    // $("#display_news").trigger('click');
                    // var dutyname = $(".username").html();
                    // var data = {"dutyname": dutyname };
                    // postRequest('/select_option_flag_person/',{
                        // "data": JSON.stringify(data)
                    // },function(data){
                        // console.log(data);
                        // if(data.resule == 1 || data.result == '1'){
                            // display_news(data);
                        // }
                    // },function(err){
                        // console.log(err);
                    // })
                    // console.log("退回成功");
                }
            }, function (err) {
                console.log(err);
            })
        } else {
            myalert('系统提示框','原因不能为无！');
        }
    } else{
        $("#alter_returnReasons").removeClass('showPopup');
        $(".md-overlay").removeClass('showOverlay');
    }
}
//被退回原因
function show_returnReasons(str){
    $("input[name='returnreasons_id']").val('');
    $("textarea[name='reasonscontent']").val('');
    $("#alter_returnReasons").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#alter_returnReasons").find(".popup-Content-box").height();
    $("#alter_returnReasons").height(oH);
    $("#alter_returnReasons").siblings('.popup-Box').css('height', 'auto');
    $("textarea[name='reasonscontent']").val(str);
}
//显示当前员工负责的项目进度表
function show_project_persondata_all(data){
    $("#search_btn1_ht").show();
    if($("#wowowo").length==0){
        $("#wowowowo").prepend('<th height="30" id="wowowo">操作</th>');
    }
    if($("#uploadType_ht").length==0&&$("#updataOperat").length==0){
        $("#prj_name").after("<th id = uploadType_ht>合同上传状态</th><th id = updataOperat>销售合同操作</th>");
    }
    if($("#cont_money").length==0){
        $("#prj_state").after("<th id = 'cont_money'>合同金额</th>");
    }                                            
    if ($("#pagebox").length>0){
        $("#paging").get(0).removeChild($("#pagebox").get(0));
    }
    var html = '';
    // var dataset_persondata_all = [];
    console.log(dataset_persondata_all);
    if(data == null){
        dataset_persondata = dataset_persondata_all;
    }else {
        dataset_persondata = select_before(dataset, data);
    }
    if (dataset_persondata.length) {
        if (dataset_persondata.length < 20) {
            $("#paging1").hide();
            $.each(dataset_persondata, function (i, v) {
                guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                html += '<tr>';
                html += '<td><span class="span_file_Input" onclick="alert_updateTrack_remark(\'' + v.id +'\')">\
                       <button type="button" class="xiugai">更新</button>\
                    </span></td>';
                html += '<td>' + v.xuhao + '</td>';
                html += '<td>' + v.clientname + '</td>';
                html += '<td>' + v.contractno + '</td>';
                html += '<td>' + v.type + '</td>';
                html += '<td style="text-align: left;">' + v.projectname + '</td>';
                html += '<td>' + v.cont_status + '</td>';
                if(v.cont_status!='OK'){
                    html += '<td><span class="span_file_Input">\
                       <button type="button" class="dongjie">下载</button>\
                    </span></td>';
                }else{
                    html += '<td><span class="span_file_Input" onclick="gettype_ht(this,\'' + v.cont_name +'\',\'' + v.projectname +'\')">\
                       <button type="button" class="xiugai">下载</button>\
                    </span></td>';
                }
                html += '<td>' + v.state + '</td>';
                html += '<td style="text-align:right;">' + toMoney(v.money) + '</td>';
                html += '<td>' + v.caigouzhuangtai + '</td>';
                html += '<td>' + v.arrival_status + '</td>';
                // html += '<td>' + v.shishiqingkuang + '</td>';
                html += '<td>' + guidangqingkuang + '</td>';
                html += '<td>' + v.huowuqingdian + '</td>';
                html += '<td >' + v.chuyanbaogao + '</td>';
                html += '<td >' + v.zhongyanbaogao + '</td>';
                html += '<td >' + v.dutyname + '</td>';
                html += '<td >' + v.salename + '</td>';
                html += '<td >' + yikaipiao + '</td>';
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
            var total = dataset_persondata.length;
            var pagenum = Math.ceil(total / 20);
            $('#pagebox1').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    var html = '';
                    var min = (page - 1) * 20;
                    var max = page * 20;
                    $.each(dataset_persondata, function (i, v) {
                        guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                        yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                        yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                        html += '<tr>';
                        html += '<td><span class="span_file_Input" onclick="alert_updateTrack_remark(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">更新</button>\
                            </span></td>';
                        html += '<td >' + v.xuhao + '</td>';
                        html += '<td >' + v.clientname + '</td>';
                        html += '<td >' + v.contractno + '</td>';
                        html += '<td >' + v.type + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.cont_status + '</td>';
                        if(v.cont_status!='OK'){
                            html += '<td><span class="span_file_Input">\
                               <button type="button" class="dongjie">下载</button>\
                            </span></td>';
                        }else{
                            html += '<td><span class="span_file_Input" onclick="gettype_ht(this,\'' + v.cont_name +'\',\'' + v.projectname +'\')">\
                               <button type="button" class="xiugai">下载</button>\
                            </span></td>';
                        }
                        html += '<td >' + v.state + '</td>';
                        html += '<td style="text-align:right;">' + toMoney(v.money) + '</td>';
                        html += '<td>' + v.caigouzhuangtai + '</td>';
                        html += '<td>' + v.arrival_status + '</td>';
                        // html += '<td>' + v.shishiqingkuang + '</td>';
                        html += '<td >' + guidangqingkuang + '</td>';
                        html += '<td >' + v.huowuqingdian + '</td>';
                        html += '<td >' + v.chuyanbaogao + '</td>';
                        html += '<td >' + v.zhongyanbaogao + '</td>';
                        html += '<td >' + v.dutyname + '</td>';
                        html += '<td >' + v.salename + '</td>';
                        html += '<td >' + yikaipiao + '</td>';
                        html += '<td >' + yishoukuan + '</td>';
                        html += '<td style="text-align: left;">' + v.remark + '</td>';
                        html += '<td >' + v.latestupdate + '</td>';
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
        if(data == null){
            show_project_ing();
            // $("#paging").hide();
        }else{
            $("#show_track").html('<tr><td colspan="23">暂无数据</td></tr>');
            $("#paging1").hide();
        }
    }
}
//显示进度表修改页面
function alert_updateTrack_remark(id){
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
            $("select[name='daohuo2']").val('');
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
            
            $("#updateTrack_remark").addClass('showPopup');
            $(".md-overlay").addClass('showOverlay');
            //设置高度
            var oH = $("#updateTrack_remark").find(".popup-Content-box").height();
            $("#updateTrack_remark").css('max-height', oH);
            $("#updateTrack_remark").siblings('.popup-Box').css('height', 'auto');
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
//确认更新进度表备注
function updateTrack_remark(){
    var id = $("input[name='track_id']").val();
    var remark = $("input[name='beizhu2']").val();
    var updatacontent = $('#headername').html()+'：更新了';
    var data={};
    if (remark != ''){
        $.each(dataset_persondata_all,function(i,v){
            if (v.id == id ){
                if(v.remark != remark){
                    var updata_item = [];
                    v.remark = remark;
                    updata_item.push('备注');
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
                    v.latestupdate = clock;
                    updatacontent += '“备注”。';
                    v.latestupdatecontent = updatacontent;
                    // for (var j = i ; j >= 0 ; j--){//排序到第一位
                        // if (j > 0){
                            // dataset_persondata_all[j] = dataset_persondata_all[j-1];
                        // }else{
                            // dataset_persondata_all[j] = v;
                        // }
                    // }
                    //排序
                    if (dataset_persondata_all.length!=0){
                        postRequest('/sort_prj_contentdata/',{
                            'data':JSON.stringify({'data':dataset_persondata_all})
                        },function(data){
                            if (data.result == '1' || data.result == 1){
                                dataset_persondata_all=data.data;
                                show_project_persondata_all();
                            }
                        });
                    }
                    data = {'id':id,"remark":remark,"updatacontent":updatacontent}
                    postRequest('/updateTrack_remark/',{
                        "data":JSON.stringify(data)
                    },function(data){
                        if (data.result == 1 || data.result == '1') {
                            $("#updateTrack_remark").removeClass('showPopup');
                            $(".md-overlay").removeClass('showOverlay');
                            show_project_persondata_all();
                            // show_project_persondata_all(select_ht_data);
                            // myalert('系统提示框',"更新成功")
                        }
                    });
                }else{
                    myalert("系统提示","没有数据被修改");
                }
            }
        });
        $.each(dataset_persondata_all1,function(i,v){
            if (v.id == id ){
                if(v.remark != remark){
                    var updata_item = [];
                    v.remark = remark;
                    updata_item.push('备注');
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
                    v.latestupdate = clock;
                    v.latestupdatecontent = updatacontent;
                }
            }
        })
    }else{
        myalert('系统提示框','备注为空');
    }
}
//显示在建项目进度表
function show_project_ing(data){
    if($("#wowowo").length>0){
         $("#wowowowo").get(0).removeChild($("#wowowo").get(0))
    }
    if ($("#pagebox").length>0){
        $("#paging").get(0).removeChild($("#pagebox").get(0));
    }
    if($("#uploadType_ht").length>0||$("#updataOperat").length>0||$("#cont_money").length>0){
        $("#uploadType_ht").remove();
        $("#updataOperat").remove();
        $("#cont_money").remove();
    }
    var html = '';
    var dataset_ing = [];
    if (data == null){
        $.each(dataset, function (i, v) {
            if(v.state=='进行中'){
                dataset_ing.push(v);
            }
        })
    } else{
        dataset_ing = select_before(dataset, data);
    }
    if (dataset_ing.length) {
        if (dataset_ing.length < 20) {
            $("#paging1").hide();
            $.each(dataset_ing, function (i, v) {
                guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                html += '<tr>';
                html += '<td>' + v.xuhao + '</td>';
                html += '<td>' + v.clientname + '</td>';
                html += '<td>' + v.contractno + '</td>';
                html += '<td>' + v.type + '</td>';
                html += '<td  style="text-align: left;">' + v.projectname + '</td>';
                html += '<td>' + v.state + '</td>';
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
            var total = dataset_ing.length;
            var pagenum = Math.ceil(total / 20);
            $('#pagebox1').paging({
                initPageNo: 1, // 初始页码
                totalPages: pagenum, //总页数
                totalCount: '共' + total + '条数据', // 条目总数
                slideSpeed: 600, // 缓动速度。单位毫秒
                jump: true, //是否支持跳转
                callback: function (page) { // 回调函数
                    var html = '';
                    var min = (page - 1) * 20;
                    var max = page * 20;
                    $.each(dataset_ing, function (i, v) {
                        guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                        yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                        yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                        html += '<tr>';
                        html += '<td >' + v.xuhao + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td>' + v.type + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.state + '</td>';
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
        $("#show_track").html('<tr><td colspan="19">暂无数据</td></tr>');
        $("#paging1").hide();
    }
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
    $("select[name='dutyname3'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='caigou3'] option").eq(0).attr('selected', 'selected');
    $("select[name='caigou3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='daohuo3'] option").eq(0).attr('selected', 'selected');
    $("select[name='daohuo3'] option").eq(0).siblings().removeAttr('selected');
    // $("select[name='shishi3'] option").eq(0).attr('selected', 'selected');
    // $("select[name='shishi3'] option").eq(0).siblings().removeAttr('selected');
    if($('.datatrack').attr('id')=='project_all'){
        var html1 =  '<option value="">请选择</option>';
        var html2 =  '<option value="">请选择</option>';
        $("select[name='dutyname3']").attr('disabled', 'disabled');
        $("select[name='dutyname3']").css('background-color', 'rgba(127,127,127,0.1)');
        $("select[name='dutyname3']").val(persondata.firstname);
        
        $("select[name='state3']").attr('disabled', false);
        $("select[name='state3']").css('background-color', 'rgba(255,255,255,1)');
        $("select[name='state3'] option").eq(0).attr('selected', 'selected');
        $("select[name='state3'] option").eq(0).siblings().removeAttr('selected');
        
        $.each(dataset_persondata_all1,function(i,v){
            html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
            html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
        });
        $("#cont3").html(html1);
        $("#projectname3").html(html2);
    }
    if( $('.datatrack').attr('id')=='project_ing'){
        var html1 =  '<option value="">请选择</option>';
        var html2 =  '<option value="">请选择</option>';
        $("select[name='state3']").attr('disabled', 'disabled');
        $("select[name='state3']").css('background-color', 'rgba(127,127,127,0.1)');
        $("select[name='state3']").val('进行中');
        
        $("select[name='dutyname3']").attr('disabled', false);
        $("select[name='dutyname3']").css('background-color', 'rgba(255,255,255,1)');
        $("select[name='dutyname3'] option").eq(0).attr('selected', 'selected');
        $("select[name='dutyname3'] option").eq(0).siblings().removeAttr('selected');
        $.each(dataset,function(i,v){
            if(v.state=='进行中'){
                html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
            }
        });
        $("#cont3").html(html1);
        $("#projectname3").html(html2);
    }
    $("select[name='clientname3'] option").eq(0).attr('selected', 'selected');
    $("select[name='clientname3'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='sell3'] option").eq(0).attr('selected', 'selected');
    $("select[name='sell3'] option").eq(0).siblings().removeAttr('selected');
    $("#shaixuan_ht").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#shaixuan_ht").find(".popup-Content-box").height();
    $("#shaixuan_ht").height(oH);
    $("#shaixuan_ht").siblings('.popup-Box').css('height', 'auto');
}
//合同进度盒子的返回
function fanhui_ht(){
    if($('#project_ing').hasClass('libg')){
        select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '进行中',"caigou":'' ,"clientname": '',"dutyname": '',"salename": '',};
        show_project_ing();
    }
    if($('#project_all').hasClass('libg')){
        name = $("#headername").html()
        select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"clientname": '',"dutyname": name,"salename": '',};
        show_project_persondata_all();
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
        select_ht_data=data;
        show_project_ing(data);
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
        "dutyname": persondata.firstname,
        "salename": salename,
        }
        // console.log(data);
        select_ht_data=data;
        show_project_persondata_all(data);
    }
    $("#shaixuan_ht").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
    console.log(data);
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
                        "caigouzhuangtai": data.caigou
                    },
                    {
                        "arrival_status": data.daohuo
                    },
                    // {
                        // "shishiqingkuang": data.shishi
                    // },
                    {
                        "state": data.state
                    },
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
//显示项目周报添加页面
function alert_updateTrack(){
    //清除页面
    signout();
    //显示弹窗   
    $("#updateTrack").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    //设置高度
    var oH = $("#updateTrack").find(".popup-Content-box").height();
    $("#updateTrack").css('max-height', oH);
    $("#updateTrack").siblings('.popup-Box').css('height', 'auto');
    //显示提交按钮
    $("#updatepc").show();
    $("#Space").show();
    //显示’更新更多合同‘、’报告更多项目‘按钮
    $("#increase_project_div").show();
    $("#increase_project1_div").show();
    //设置原有的选择框和输入框可以选择、输入
    $("#cont21").removeAttr('disabled','disabled');
    $("#projectname21").removeAttr('disabled','disabled');
    $("#guidang21").removeAttr('disabled','disabled');
    $("#huowu21").removeAttr('disabled','disabled');
    $("#chuyan21").removeAttr('disabled','disabled');
    $("#zhongyan21").removeAttr('disabled','disabled');
    $("#yikaipiao21").removeAttr('disabled','disabled');
    $("#yishoukuan21").removeAttr('disabled','disabled');
    $("#cont31").removeAttr('disabled','disabled');
    $("#projectname31").removeAttr('disabled','disabled');
    $("#Last_week_trends31").removeAttr('disabled','disabled');
    $("#Next_week_plan31").removeAttr('disabled','disabled');
    //写入流水号和项目负责人    
    var serial_number='';
    postRequest('/get_server_date/',{},function(data){
        var rand = '';
        for (var i = 0 ; i < 3 ; i++){
            r = Math.floor(Math.random()*10);
            rand += r;
        }
        serial_number = data.data+'0101'+ rand;
        $("#Serial_number").html(serial_number);
    })
    $("#dutyname2").html($("#headername").html()); 
}
//“更新更多合同”按钮
function filePicker_increase_project(){
    for (var i=1;i<50;i++){
        var j = i+1;
        var html='';
        var classname = '.border'+j;
        if ($(classname).length<1){
            html = 
                '<div class="border'+j+'" id="increase_project_box'+j+'"  style="border:1px solid #b9c5e1;position:relative;">\
                    <div class="remove_box remove_increase_project_box'+j+'" onclick="remove_project_box(this)">x</div>\
                    <div class="clear div-margin" >\
                        <div class="col-xs-1 text-center">\
                            <label>合同编号</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="cont2'+j+'" name="cont2'+j+'">\
                               <option value="">请选择</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <select class="form-control" id="projectname2'+j+'" name="projectname2'+j+'">\
                                <option value="">请选择</option>\
                            </select>\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>归档情况%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="guidang2'+j+'" name="guidang2'+j+'" oninput="check_postive_int(this)" maxlength="3">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>货物清点</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="huowu2'+j+'" name="huowu2'+j+'">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>初验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="chuyan2'+j+'" name="chuyan2'+j+'">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>终验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="zhongyan2'+j+'" name="zhongyan2'+j+'">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>已开票%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="yikaipiao2'+j+'" name="yikaipiao2'+j+'" oninput="check_postive_int(this)" maxlength="3">\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>已收款%</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <input class="form-control" type = "text" id ="yishoukuan2'+j+'" name="yishoukuan2'+j+'" oninput="check_postive_int(this)" maxlength="3">\
                        </div>\
                    </div>\
                </div>';
            var idname = '#increase_project_box'+i;
            $(idname).after(html);
            var oH = $("#updateTrack").find(".popup-Content-box").height();
            $("#updateTrack").css('max-height', oH);
            //更新流水号
            var num = $("#Serial_number").html()
            var num1 = num.slice(0,14);
            if (j<10){
                var num2 = '0'+String(j);
            }
            else{
                var num2 = String(j);
            }
            var num3 = num.slice(16,21);
            $("#Serial_number").html(num1+num2+num3);
            //填充下拉框
            var cont = "#cont2"+j;
            var cont_name = "cont2"+j;
            var projectname = "#projectname2"+j;
            var projectname_name = "projectname2"+j;
            var htm1 = '<option value="">请选择</option>';
            var htm2 = '<option value="">请选择</option>';
            if(dataset_persondata_all1.length>0){
                $.each(dataset_persondata_all1,function(i,v){
                   if(v.state=='进行中'){
						htm1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
						htm2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
					}
                });
            }
            $(cont).html(htm1);
            $(projectname).html(htm2);
            //自动匹配
            $(cont).change(function () {
                var guidang = 'guidang2'+j;
                var huowu = 'huowu2'+j;
                var chuyan = 'chuyan2'+j;
                var zhongyan = 'zhongyan2'+j;
                var yikaipiao = 'yikaipiao2'+j;
                var yishoukuan = 'yishoukuan2'+j;
                $("input[name='"+guidang+"']").val('');
                $("select[name='"+huowu+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+huowu+"'] option").eq(0).siblings().removeAttr('selected');
                $("select[name='"+chuyan+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+chuyan+"'] option").eq(0).siblings().removeAttr('selected');
                $("select[name='"+zhongyan+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+zhongyan+"'] option").eq(0).siblings().removeAttr('selected');
                $("input[name='"+yikaipiao+"']").val('');
                $("input[name='"+yishoukuan+"']").val('');
                var value = $(this).val();
                if (value != '' && dataset_persondata_all1.length > 0) {
                    $.each(dataset_persondata_all1, function (i, v) {
                        if (value == v.contractno) {
                            $("select[name='"+projectname_name+"'] option").each(function () {
                                $(this).prop('selected', false);
                                $(this).attr('selected', false);
                                if ($(this).val() == v.projectname) {
                                    $(this).prop('selected', 'selected');
                                    $(this).attr('selected', 'selected');
                                }
                            })
                        }
                    })
                } else {
                    $("select[name='"+projectname_name+"'] option").eq(0).attr('selected', 'selected');
                    $("select[name='"+projectname_name+"'] option").eq(0).siblings().removeAttr('selected');
                }
                postRequest('/select_last_pro_update/',{
                    "data":JSON.stringify({"contractno":value})
                },function(data){
                    if (data.result == 1||data.result == '1'){
                        $("input[name='"+guidang+"']").val((data.data.archiving_situation*100).toFixed(0));
                        
                        $("select[name='"+huowu+"'] option").each(function(l,k){
                            if($(this).val() == data.data.cargo_inventory){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("select[name='"+chuyan+"'] option").each(function(l,k){
                            if($(this).val() == data.data.preliminary_report){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("select[name='"+zhongyan+"'] option").each(function(l,k){
                            if($(this).val() == data.data.final_report){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("input[name='"+yikaipiao+"']").val((data.data.invoiced*100).toFixed(0));
                            
                        $("input[name='"+yishoukuan+"']").val((data.data.receivable*100).toFixed(0));
                        
                    }
                });
            });
            $(projectname).change(function () {
                var guidang = 'guidang2'+j;
                var huowu = 'huowu2'+j;
                var chuyan = 'chuyan2'+j;
                var zhongyan = 'zhongyan2'+j;
                var yikaipiao = 'yikaipiao2'+j;
                var yishoukuan = 'yishoukuan2'+j;
                $("input[name='"+guidang+"']").val('');
                $("select[name='"+huowu+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+huowu+"'] option").eq(0).siblings().removeAttr('selected');
                $("select[name='"+chuyan+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+chuyan+"'] option").eq(0).siblings().removeAttr('selected');
                $("select[name='"+zhongyan+"'] option").eq(0).attr('selected','selected');
                $("select[name='"+zhongyan+"'] option").eq(0).siblings().removeAttr('selected');
                $("input[name='"+yikaipiao+"']").val('');
                $("input[name='"+yishoukuan+"']").val('');
                var contractno='';
                var value = $(this).val();
                if (value != '' && dataset_persondata_all1.length > 0) {
                    $.each(dataset_persondata_all1, function (i, v) {
                        if (value == v.projectname) {
                            $("select[name='"+cont_name+"'] option").each(function () {
                                $(this).prop('selected', false);
                                $(this).attr('selected', false);
                                if ($(this).val() == v.contractno) {
                                    contractno = v.contractno;
                                    $(this).prop('selected', 'selected');
                                    $(this).attr('selected', 'selected');
                                }
                            })
                        }
                    })
                } else {
                    $("select[name='"+cont_name+"'] option").eq(0).attr('selected', 'selected');
                    $("select[name='"+cont_name+"'] option").eq(0).siblings().removeAttr('selected');
                }
                postRequest('/select_last_pro_update/',{
                    "data":JSON.stringify({"contractno":contractno})
                },function(data){
                    if (data.result == 1||data.result == '1'){
                        var guidang = 'guidang2'+j;
                        var huowu = 'huowu2'+j;
                        var chuyan = 'chuyan2'+j;
                        var zhongyan = 'zhongyan2'+j;
                        var yikaipiao = 'yikaipiao2'+j;
                        var yishoukuan = 'yishoukuan2'+j;
                        $("input[name='"+guidang+"']").val((data.data.archiving_situation*100).toFixed(0));
                        
                        $("select[name='"+huowu+"'] option").each(function(l,k){
                            if($(this).val() == data.data.cargo_inventory){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("select[name='"+chuyan+"'] option").each(function(l,k){
                            if($(this).val() == data.data.preliminary_report){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("select[name='"+zhongyan+"'] option").each(function(l,k){
                            if($(this).val() == data.data.final_report){
                                $(this).prop('selected', 'true');
                                $(this).attr('selected', 'true');
                            }
                        });
                        $("input[name='"+yikaipiao+"']").val((data.data.invoiced*100).toFixed(0));
                            
                        $("input[name='"+yishoukuan+"']").val((data.data.receivable*100).toFixed(0));
                        
                    }
                });
            });
            break;
        }else{
            continue;
        }
    }
}
//“报告更多项目”按钮
function filePicker_increase_project1(){
    for (var i=1;i<50;i++){//这里有点问题，每次都会做前面的循环，影响执行速度，暂时不影响使用
        var j = i+1;
        var html='';
        var classname = '.border1'+j;
        if ($(classname).length<1){
            html = 
                '<div class="border1'+j+'" id="increase_project_box1'+j+'" style="border:1px solid #b9c5e1;position:relative;">\
                    <div class="remove_box remove_increase_project_box1'+j+'" onclick="remove_project_box1(this)">x</div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>合同编号</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="cont3'+j+'" name="cont3'+j+'" >\
                               <option value="">请选择</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <select class="form-control" id="projectname3'+j+'" name="projectname3'+j+'">\
                                <option value="">请选择</option>\
                            </select>\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>上周动态</label>\
                        </div>\
                        <div class="col-xs-9">\
                           <input class="form-control" type = "text" id = "Last_week_trends3'+j+'" name="Last_week_trends3'+j+'"placeholder="请输入">\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>下周计划</label>\
                        </div>\
                        <div class="col-xs-9">\
                            <input class="form-control" type = "text" id = "Next_week_plan3'+j+'" name="Next_week_plan3'+j+'" placeholder="请输入">\
                        </div>\
                    </div>\
                </div>';
            var idname = '#increase_project_box1'+i;
            $(idname).after(html);
            var oH = $("#updateTrack").find(".popup-Content-box").height();
            $("#updateTrack").css('max-height', oH);
            var num = $("#Serial_number").html()
            var num1 = num.slice(0,16);
            if (j<10){
                var num2 = '0'+String(j);
            }
            else{
                var num2 = String(j);
            }
            var num3 = num.slice(18,21);
            $("#Serial_number").html(num1+num2+num3);
             //填充下拉框
            var cont = "#cont3"+j;
            var cont_name = "cont3"+j;
            var projectname = "#projectname3"+j;
            var projectname_name = "projectname3"+j;
            var htm1 = '<option value="">请选择</option>';
            var htm2 = '<option value="">请选择</option>';
            if(dataset_persondata_all1.length>0){
                $.each(dataset_persondata_all1,function(i,v){
                    htm1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    htm2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                });
            }
            $(cont).html(htm1);
            $(projectname).html(htm2);
            //自动匹配
            $(cont).change(function () {
                var Last_week_trends = "Last_week_trends3"+j;
                var Next_week_plan = "Next_week_plan3"+j;
                $("input[name='"+Last_week_trends+"']").val('');
                $("input[name='"+Next_week_plan+"']").val('');
                var value = $(this).val();
                if (value != '' && dataset_persondata_all1.length > 0) {
                    $.each(dataset_persondata_all1, function (i, v) {
                        if (value == v.contractno) {
                            $("select[name='"+projectname_name+"'] option").each(function () {
                                $(this).prop('selected', false);
                                $(this).attr('selected', false);
                                if ($(this).val() == v.projectname) {
                                    $(this).prop('selected', 'selected');
                                    $(this).attr('selected', 'selected');
                                }
                            })
                        }
                    })
                } else {
                    $("select[name='"+projectname_name+"'] option").eq(0).attr('selected', 'selected');
                    $("select[name='"+projectname_name+"'] option").eq(0).siblings().removeAttr('selected');
                }
                postRequest('/select_last_pro_report/',{
                    "data":JSON.stringify({"contractno":value})
                },function(data){
                    if (data.result == 1||data.result == '1'){
                        
                        $("input[name='"+Last_week_trends+"']").val(data.data.next_week_plan);
                            
                    }
                });
            });
            $(projectname).change(function () {
                var Last_week_trends = "Last_week_trends3"+j;
                var Next_week_plan = "Next_week_plan3"+j;
                $("input[name='"+Last_week_trends+"']").val('');
                $("input[name='"+Next_week_plan+"']").val('');
                var contractno="";
                var value = $(this).val();
                if (value != '' && dataset_persondata_all1.length > 0) {
                    $.each(dataset_persondata_all1, function (i, v) {
                        if (value == v.projectname) {
                            $("select[name='"+cont_name+"'] option").each(function () {
                                $(this).prop('selected', false);
                                $(this).attr('selected', false);
                                if ($(this).val() == v.contractno) {
                                    contractno = v.contractno;
                                    $(this).prop('selected', 'selected');
                                    $(this).attr('selected', 'selected');
                                }
                            })
                        }
                    })
                } else {
                    $("select[name='"+cont_name+"'] option").eq(0).attr('selected', 'selected');
                    $("select[name='"+cont_name+"'] option").eq(0).siblings().removeAttr('selected');
                }
                postRequest('/select_last_pro_report/',{
                    "data":JSON.stringify({"contractno":contractno})
                },function(data){
                    // console.log(data);
                    if (data.result == 1||data.result == '1'){
                        
                        $("input[name='"+Last_week_trends+"']").val(data.data.next_week_plan);
                            
                    }
                });
            });
            break;
        }else{
            continue;
        }
    }

}
//确认更新进度表、提交项目周报
function updateTrack(){
    var flag = true;
    var flag1 = true;
    var flag2 = true;
    var serial_number = $("#Serial_number").html();
    var username = $("#headername").html();
    var num1 = parseFloat(serial_number.slice(14,16));
    var pro_update = new Array(num1);
    for (var i = 0 ; i < num1 ; i++){
        var a = i+1; 
        // console.log(a);
        var cont_name = "cont2"+a;
        var projectname_name = "projectname2"+a;
        var guidang_name = "guidang2"+a;
        var huowu_name = "huowu2"+a;
        var chuyan_name = "chuyan2"+a;
        var zhongyan_name = "zhongyan2"+a;
        var yikaipiao_name = "yikaipiao2"+a;
        var yishoukuan_name = "yishoukuan2"+a;
        var contractno = $("select[name='"+cont_name+"'] option:selected").val();
        var projectname = $("select[name='"+projectname_name+"'] option:selected").val();
        var archiving_situation = $("input[name='"+guidang_name+"']").val();
        var cargo_inventory = $("select[name='"+huowu_name+"'] option:selected").val();
        var preliminary_report = $("select[name='"+chuyan_name+"'] option:selected").val();
        var final_report = $("select[name='"+zhongyan_name+"'] option:selected").val();
        var invoiced = $("input[name='"+yikaipiao_name+"']").val();
        var receivable = $("input[name='"+yishoukuan_name+"']").val();
        var updatacontent = $('#headername').html()+'：更新了';
        if((contractno!=""&&projectname!="")&&(archiving_situation==""||cargo_inventory==""||preliminary_report==""||final_report==""||invoiced==""||receivable=="")){
            myalert('系统提示框','第'+a+'个项目更新有数据为空');
            flag = false;
        }else if((contractno!=""&&projectname!="")&&(archiving_situation!=""&&cargo_inventory!=""&&preliminary_report!=""&&final_report!=""&&invoiced!=""&&receivable!="")){
            //记录被修改的项
            $.each(dataset_persondata_all1,function(i,v){
                if ((v.contractno != ""&&v.contractno == contractno)||(v.contractno == ""&&v.projectname==projectname) ){
                    archiving_situation = (archiving_situation/100).toFixed(2).toString();
                    invoiced = (invoiced/100).toFixed(2).toString();
                    receivable = (receivable/100).toFixed(2).toString();
                    var updata_item = [];
                    if(v.guidangqingkuang != archiving_situation){updata_item.push('归档情况%')};
                    if(v.huowuqingdian != cargo_inventory){updata_item.push('货物清点')};
                    if(v.chuyanbaogao != preliminary_report){updata_item.push('初验报告')};
                    if(v.zhongyanbaogao != final_report){updata_item.push('终验报告')};
                    if(v.yikaipiao != invoiced){updata_item.push('已开票%')};
                    if(v.yishoukuan != receivable){updata_item.push('已收款%')};
                    $.each(updata_item,function(i,item){
                        updatacontent += '“';
                        updatacontent += (item);
                        updatacontent += '”';
                        if(i+1!=updata_item.length){
                            updatacontent += '，';
                        }else{updatacontent += '。';}
                    });
                }
            });
            pro_update[i] = {"username":username,"serial_number":serial_number,"pro_update_order":a,"contractno":contractno,"projectname":projectname,"archiving_situation":archiving_situation,"cargo_inventory":cargo_inventory,"preliminary_report":preliminary_report,"final_report":final_report,"invoiced":invoiced,"receivable":receivable,"updatacontent":updatacontent};
            
        }else{flag1=false;}
    }
    
    var num2 = parseFloat(serial_number.slice(16,18));
    var pro_report = new Array(num2);
    for (var j = 0 ; j < num2 ; j++){
        var b = j+1;
        var cont_name = "cont3"+b;
        var projectname_name = "projectname3"+b;
        var last_week_trends_name = "Last_week_trends3"+b;
        var next_week_plan_name = "Next_week_plan3"+b;
        var contractno = $("select[name='"+cont_name+"'] option:selected").val();
        var projectname = $("select[name='"+projectname_name+"'] option:selected").val();
        var last_week_trends = $("input[name='"+last_week_trends_name+"']").val();
        var next_week_plan = $("input[name='"+next_week_plan_name+"']").val();
        // console.log(contractno);console.log(projectname);console.log(last_week_trends);console.log(next_week_plan);
        if((contractno==""&&projectname=="")||(last_week_trends==""&&next_week_plan=="")){
            myalert('系统提示框','第'+b+'个项目周报有数据为空');
            flag = false;
        }else if((contractno==""&&projectname=="")||(last_week_trends!=""||next_week_plan!="")){
            pro_report[j] = {"username":username,"serial_number":serial_number,"pro_report_order":b,"contractno":contractno,"projectname":projectname,"last_week_trends":last_week_trends,"next_week_plan":next_week_plan};
        }else{flag2=false;}
    }
    //判断是否有重复项目 重复返回true，不重复返回false
    function isRepeat(arr){
        var hash = {};
        for(var i in arr) {
            if(hash[arr[i].contractno])
                return true;
            hash[arr[i].contractno] = true;
        }
        return false;
    }
    //判断是否有多余的框为空  有返回false ，无返回true
    function isEmpty(arr){
        if(arr.length<=1){
            return true;
        }else {
            if (arr[0]==undefined){
                return false;
            }else {
                for(var i = 0 ;i < arr.length ; i++){
                    if(i != 0 && arr[i] == undefined){
                        return false;
                    }
                }
            }
        return true;
        }
    }
    
    if(flag1||flag2){
        if (flag){
            if(isEmpty(pro_update)&&isEmpty(pro_report)){
                if(!(isRepeat(pro_update)||isRepeat(pro_report))){
                    // console.log(pro_update);
                    // console.log(pro_report);
                    var data = {"pro_update":pro_update,"pro_report":pro_report};
                    postRequest('/duty_updateTrack_AND_add_pro_report/',{
                        "data":JSON.stringify(data)
                    },function(data){
                        if (data.result == 1 || data.result == '1') {
                            signout();
                            if(flag1){
                                $.each(pro_update,function(i,v){
                                    $.each(dataset_persondata_all1,function(j,w){
                                        if((v.contractno != ""&&v.contractno == w.contractno)||(v.contractno == ""&&v.projectname==w.projectname)){
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
                                            w.guidangqingkuang = v.archiving_situation;
                                            w.huowuqingdian = v.cargo_inventory;
                                            w.chuyanbaogao = v.preliminary_report;
                                            w.zhongyanbaogao = v.final_report;
                                            w.yikaipiao = v.invoiced;
                                            w.yishoukuan = v.receivable;
                                            w.latestupdate = clock;
                                            w.latestupdatecontent = v.updatacontent;
                                            return false;
                                        }
                                    });
                                    $.each(dataset_persondata_all,function(j,w){
                                        if((v.contractno != ""&&v.contractno == w.contractno)||(v.contractno == ""&&v.projectname==w.projectname)){
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
                                            w.guidangqingkuang = v.archiving_situation;
                                            w.huowuqingdian = v.cargo_inventory;
                                            w.chuyanbaogao = v.preliminary_report;
                                            w.zhongyanbaogao = v.final_report;
                                            w.yikaipiao = v.invoiced;
                                            w.yishoukuan = v.receivable;
                                            w.latestupdate = clock;
                                            w.latestupdatecontent = v.updatacontent;
                                            return false;
                                        }
                                    });
                                });
                            }
                            show_project_persondata_all();
                            // myalert('系统提示框',"更新成功")
                            display_project_report();
                        }else if(data.result == 2 || data.result == '2'){
                            myalert('系统提示框',data.data);
                        }else{myalert('系统提示框','后台异常');}
                    });
                }else{
                    myalert('系统提示框',"项目重复");
                }
            }else{
                myalert('系统提示框',"增加了的项目框但是有空的");
            }
        }
    }else{
        myalert('系统提示框','更新合同和报告项目不能同时为空');
    }
}
//移除增加的要更新的合同
function remove_project_box(obj){
    var num = $("#Serial_number").html()
    var num1 = num.slice(0,14);
    var i = parseFloat(num.slice(14,16))-1;
    if (i<10){
        var num2 = '0'+String(i);
    }
    else{
        var num2 = String(i);
    }
    var num3 = num.slice(16,21);
    var oH = $("#updateTrack").find(".popup-Content-box").height();
    $("#updateTrack").css('max-height', oH);
   //获得是第几个border
    var j = parseFloat($(obj).parent().attr('id').slice(-1));
    // console.log(j);
    //清空当前border中的数据
    var cont_name = "cont2"+j;
    var projectname_name = "projectname2"+j;
    var guidang_name = "guidang2"+j;
    var huowu_name = "huowu2"+j;
    var chuyan_name = "chuyan2"+j;
    var zhongyan_name = "zhongyan2"+j;
    var yikaipiao_name = "yikaipiao2"+j;
    var yishoukuan_name = "yishoukuan2"+j;
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
    //删除当前元素的父亲点以及子节点
    $(obj).parent().remove();
    var a = j+1;
    // console.log(a);
    //修改被删除元素以后的border中的id、class、name的值
    for (a;a<=i+1;a++){
        var b = a - 1 ;
        $('.border'+a+'').attr('class','border'+b+'');
        $('#increase_project_box'+a+'').attr('id','increase_project_box'+b+'');
        $('.remove_increase_project_box'+a+'').attr('class','remove_box remove_increase_project_box'+b+'');
        $('#cont2'+a+'').attr('id','cont2'+b+'');
        $('select[name="cont2'+a+'"]').attr('name','cont2'+b+'');
        $('#projectname2'+a+'').attr('id','projectname2'+b+'');
        $('select[name="projectname2'+a+'"]').attr('name','projectname2'+b+'');
        $('#guidang2'+a+'').attr('id','guidang2'+b+'');
        $('input[name="guidang2'+a+'"]').attr('name','guidang2'+b+'');
        $('#huowu2'+a+'').attr('id','huowu2'+b+'');
        $('select[name="huowu2'+a+'"]').attr('name','huowu2'+b+'');
        $('#chuyan2'+a+'').attr('id','chuyan2'+b+'');
        $('select[name="chuyan2'+a+'"]').attr('name','chuyan2'+b+'');
        $('#zhongyan2'+a+'').attr('id','zhongyan2'+b+'');
        $('select[name="zhongyan2'+a+'"]').attr('name','zhongyan2'+b+'');
        $('#yikaipiao2'+a+'').attr('id','yikaipiao2'+b+'');
        $('input[name="yikaipiao2'+a+'"]').attr('name','yikaipiao2'+b+'');
        $('#yishoukuan2'+a+'').attr('id','yishoukuan2'+b+'');
        $('input[name="yishoukuan2'+a+'"]').attr('name','yishoukuan2'+b+'');
    }
    
    $("#Serial_number").html(num1+num2+num3);
        
    
}
//移除增加的报告更多项目
function remove_project_box1(obj){
    var num = $("#Serial_number").html()
    var num1 = num.slice(0,16);
    var i = parseFloat(num.slice(16,18))-1;
    if (i<10){
        var num2 = '0'+String(i);
    }
    else{
        var num2 = String(i);
    }
    var num3 = num.slice(18,21);
    $("#Serial_number").html(num1+num2+num3);
   //获得是第几个border1
    var j = parseFloat($(obj).parent().attr('id').slice(-1));
    //清空当前border1中的数据
    var cont_name = "cont2"+j;
    var projectname_name = "projectname2"+j;
    var last_week_trends_name = "Last_week_trends3"+j;
    var next_week_plan_name = "Next_week_plan3"+j;
    $("select[name='"+cont_name+"'] option").eq(0).attr('selected','selected');
    $("select[name='"+cont_name+"'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='"+projectname_name+"'] option").eq(0).attr('selected','selected');
    $("select[name='"+projectname_name+"'] option").eq(0).siblings().removeAttr('selected');
    $("input[name='"+last_week_trends_name+"']").val('');
    $("input[name='"+next_week_plan_name+"']").val('');
    //删除当前元素的父亲点以及子节点
    $(obj).parent().remove();
    
    var oH = $("#updateTrack").find(".popup-Content-box").height();
    $("#updateTrack").css('max-height', oH);
    var a = j+1;
    //修改被删除元素以后的border1中的id、class、name的值
    for (a;a<=i+1;a++){
        var b = a - 1 ;
        $('.border1'+a+'').attr('class','border1'+b+'');
        $('#increase_project_box1'+a+'').attr('id','increase_project_box1'+b+'');
        $('.remove_increase_project_box1'+a+'').attr('class','remove_box remove_increase_project_box1'+b+'');
        $('#cont3'+a+'').attr('id','cont3'+b+'');
        $('select[name="cont3'+a+'"]').attr('name','cont3'+b+'');
        $('#projectname3'+a+'').attr('id','projectname3'+b+'');
        $('select[name="projectname3'+a+'"]').attr('name','projectname3'+b+'');
        $('#Last_week_trends3'+a+'').attr('id','Last_week_trends3'+b+'');
        $('input[name="Last_week_trends3'+a+'"]').attr('name','Last_week_trends3'+b+'');
        $('#Next_week_plan3'+a+'').attr('id','Next_week_plan3'+b+'');
        $('input[name="Next_week_plan3'+a+'"]').attr('name','Next_week_plan3'+b+'');
    }
    
    $("#Serial_number").html(num1+num2+num3);
}
//关闭项目周报弹窗并清除数据和增加的合同
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
    
    $("#updateTrack").removeClass('showPopup');
    $(".md-overlay").removeClass('showOverlay');
    
}
//显示项目周报提交的情况
function display_project_report(){
    var username = $("#headername").html();
    var data = {"username":username};
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
    $("#updateTrack").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    //设置高度
    var oH = $("#updateTrack").find(".popup-Content-box").height();
    $("#updateTrack").css('max-height', oH);
    $("#updateTrack").siblings('.popup-Box').css('height', 'auto');
    //隐藏提交按钮
    $("#updatepc").hide();
    $("#Space").hide();
    //隐藏’更新更多合同‘、’报告更多项目‘按钮
    $("#increase_project_div").hide();
    $("#increase_project1_div").hide();
    //设置原有的选择框和输入框不可选择、输入
    $("#cont21").attr('disabled','disabled');
    $("#projectname21").attr('disabled','disabled');
    $("#guidang21").attr('disabled','disabled');
    $("#huowu21").attr('disabled','disabled');
    $("#chuyan21").attr('disabled','disabled');
    $("#zhongyan21").attr('disabled','disabled');
    $("#yikaipiao21").attr('disabled','disabled');
    $("#yishoukuan21").attr('disabled','disabled');
    $("#cont31").attr('disabled','disabled');
    $("#projectname31").attr('disabled','disabled');
    $("#Last_week_trends31").attr('disabled','disabled');
    $("#Next_week_plan31").attr('disabled','disabled');
    
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
                            <select class="form-control" id="cont2'+j+'" name="cont2'+j+'" disabled="disabled">\
                               <option value="">请选择</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <select class="form-control" id="projectname2'+j+'" name="projectname2'+j+'" disabled="disabled">\
                                <option value="">请选择</option>\
                            </select>\
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
                            <select class="form-control" id="huowu2'+j+'" name="huowu2'+j+'" disabled="disabled">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>初验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="chuyan2'+j+'" name="chuyan2'+j+'" disabled="disabled">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
                        </div>\
                    </div>\
                    <div class="clear div-margin">\
                        <div class="col-xs-1 text-center">\
                            <label>终验报告</label>\
                        </div>\
                        <div class="col-xs-3" style="width:23.33%">\
                            <select class="form-control" id="zhongyan2'+j+'" name="zhongyan2'+j+'" disabled="disabled">\
                                <option value="">请选择</option>\
                                <option value="未满足">未满足</option>\
                                <option value="申请中">申请中</option>\
                                <option value="已签署">已签署</option>\
                                <option value="部分已归档">部分已归档</option>\
                                <option value="已归档">已归档</option>\
                            </select>\
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
            var oH = $("#updateTrack").find(".popup-Content-box").height();
            $("#updateTrack").css('max-height', oH);
        }
        //填充下拉框
        var cont = "#cont2"+j;
        var projectname = "#projectname2"+j;
        var htm1 = '<option value="">请选择</option>';
        var htm2 = '<option value="">请选择</option>';
        if(dataset_persondata_all1.length>0){
            $.each(dataset_persondata_all1,function(i,v){
                htm1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                htm2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
            });
        }
        $(cont).html(htm1);
        $(projectname).html(htm2);
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
                            <select class="form-control" id="cont3'+b+'" name="cont3'+b+'" disabled="disabled" >\
                               <option value="">请选择</option>\
                            </select>\
                        </div>\
                        <div class="col-xs-1 text-center">\
                            <label>项目名称</label>\
                        </div>\
                        <div class="col-xs-5" style="width:56.66%">\
                            <select class="form-control" id="projectname3'+b+'" name="projectname3'+b+'" disabled="disabled">\
                                <option value="">请选择</option>\
                            </select>\
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
            var oH = $("#updateTrack").find(".popup-Content-box").height();
            $("#updateTrack").css('max-height', oH);
        }
        //填充下拉框
        var cont = "#cont3"+b;
        var projectname = "#projectname3"+b;
        var htm1 = '<option value="">请选择</option>';
        var htm2 = '<option value="">请选择</option>';
        if(dataset_persondata_all1.length>0){
            $.each(dataset_persondata_all1,function(i,v){
                htm1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                htm2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
            });
        }
        $(cont).html(htm1);
        $(projectname).html(htm2);
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
                $("select[name='"+cont_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.contractno){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='"+projectname_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.projectname){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("input[name='"+guidang_name+"']").val((obj.archiving_situation*100).toFixed(0));
                
                $("select[name='"+huowu_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.cargo_inventory){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='"+chuyan_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.preliminary_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='"+zhongyan_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.final_report){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
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
                $("select[name='"+cont_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.contractno){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("select[name='"+projectname_name+"'] option").each(function(l,k){
                    if($(this).val() == obj.projectname){
                        $(this).prop('selected', 'true');
                        $(this).attr('selected', 'true');
                    }
                });
                $("input[name='"+last_week_trends_name+"']").val(obj.last_week_trends);
               
                $("input[name='"+next_week_plan_name+"']").val(obj.next_week_plan);
                
            }
        });
    }
}
//获取当前时间
function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hh = date.getHours();//时
        var mm = date.getMinutes();//分
        var ss = date.getSeconds();//秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate+seperator1+hh+seperator1+ss+seperator1+ss;
        return currentdate;
    }
// 下载合同
function gettype_ht(obj,cont_name,prj_name){
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
//展示归档记录
function displayArchive(){
    postRequest('/display_archive/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
           showArchibe(data.data)
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
                        <td><a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a>&nbsp;\
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
                            <td><a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a>&nbsp;\
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
//下载所有压缩包
function get_archive_zip(str){
    var arr = str.split(';');
    $.each(arr,function(i,v){   
        url = '/static/uploads/archive_file/'+v+'.zip';
        var  tempelm  =  document.createElement("iframe");
        tempelm.src  = url;
        tempelm.style.display  =  "none";
        document.body.appendChild(tempelm);
    });
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
    $("#cont4").html(html1);
    $("#projectname4").html(html2);
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
    $("input[name='cont_write4']").val('');
    $("select[name='cont4'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont4'] option").eq(0).prop('selected', 'selected');
    $("input[name='projectname_write4']").val('');
    $("select[name='projectname4'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname4'] option").eq(0).prop('selected', 'selected');
    $("select[name='docum_type1'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_type1'] option").eq(0).prop('selected', 'selected');
    var html = '<option value="">请选择</option>';
    $("#docum_item1").html(html);
    $("select[name='docum_item1'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_item1'] option").eq(0).prop('selected', 'selected');
    $("input[name='starttime41']").val('');
    $("input[name='endtime41']").val('');
}
//筛选归档记录确认---->感觉“展示归档记录”函数没太大必要了
function chooseinfo_archive(){
    var starttime = $("input[name='starttime41']").val()||'';
    var endtime = $("input[name='endtime41']").val()||'';
    var contractno = $("select[name='cont4'] option:selected").val()||'';
    var projectname = $("select[name='projectname4'] option:selected").val()||'';
    var documtype = $("select[name='docum_type1'] option:selected").val()||'';
    var documitem = $("select[name='docum_item1'] option:selected").val()||'';
        
    var data = {
        "starttime": starttime,
        "endtime":endtime,
        "contractno": contractno,
        "projectname": projectname,
        "documtype": documtype,
        "documitem": documitem
    }
    postRequest('/select_archive/',{
         "data": JSON.stringify(data)
    },function(data){
        if(data.result==1||data.result=='1'){
            $("#shaixuanArchive").removeClass('showPopup');
            $(".md-overlay").removeClass('showOverlay');
            showArchibe(data.data)
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
                        // var equip = v.record[0];
                        // var len = v.record.length;
                        var str =  encodeURI(JSON.stringify(v));
                        html += '\
                        <tr>\
                            <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
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
                // myalert('系统提示框','无数据！');
                $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
                $("#paging3").hide();
            }
            
        } else {
            // myalert('系统提示框','无数据或者出错！');
            $("#show_equipment").html('<tr><td colspan="8">暂无数据</td></tr>');
            $("#paging3").hide();
        }
        
    }, function (err) {
        console.log(err);
    });
}

//点击“查看”显示单个项目设备信息盒子
function show_equipment_btn(str,s=''){
    $("#search_serial").val(s);
    $('.equipment_one_operate').hide();
    // $('#Cont_Equipment_Div2').hide();
    $('#Cont_Equipment_Div2').prop('onclick','update_cont_warranty_btn(\''+str+'\')');
    $('#Cont_Equipment_Div2').attr('onclick','update_cont_warranty_btn(\''+str+'\')');
    $('#Cont_Equipment_Div1').hide();
    $('.equipmentBox').hide();
    $('.One_Cont_equipmentBox').show();
    var json_obj = JSON.parse(decodeURI(str));
    $("input[name='warranty_html_cont']").val(json_obj.contractno);
    $("input[name='warranty_html_projectname']").val(json_obj.projectname);
    var this_s_rank = 1 ; //默认初始页码
    postRequest('/display_cont_equip/', {
        "data": JSON.stringify({'contractno' : json_obj.contractno})
    },function (data){
        $.each(data.data,function(i,v){
            if (s != '' && v.serial == s){
                this_s_rank = Math.ceil(i / 15); 
            }
        });
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
                            <td height = "30">'+ v.warranty_start_date.slice(0,10) + '</td>\
                            <td height = "30">'+ v.warranty_end_date.slice(0,10) + '</td>\
                            <td height = "30">'+ v.remake + '</td>\
                            <!--<td><a href="javascript:;" title="修改" onclick="update_one_equipment_btn(\''+str+'\',\''+encodeURI(JSON.stringify(v))+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;\
                            <a href="javascript:;" title="删除" onclick="del_cont_equipment_btn(this,\''+json_obj.id+'\',\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>-->';
                            
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
                                    <td height = "30">'+ json_obj.dutyname + '</td>-->\
                                    <td height = "30">'+ v.brand + '</td>\
                                    <td height = "30">'+ v.type + '</td>\
                                    <td height = "30">'+ v.model + '</td>\
                                    <td height = "30">'+ v.number + '</td>\
                                    <td height = "30">'+ v.serial + '</td>\
                                    <td height = "30">'+ v.warranty_start_date.slice(0,10) + '</td>\
                                    <td height = "30">'+ v.warranty_end_date.slice(0,10) + '</td>\
                                    <td height = "30">'+ v.remake + '</td>\
                                    <!--<td><a href="javascript:;" title="修改" onclick="update_one_equipment_btn(\''+str+'\',\''+encodeURI(JSON.stringify(v))+'\')"><button type="button" class="xiugai">修改</button></a>&nbsp;\
                                    <a href="javascript:;" title="删除" onclick="del_cont_equipment_btn(this,\''+json_obj.id+'\',\''+v.id+'\')"><button type="button" class= "shanchu">删除</button></a></td>-->';
                                    
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
                })
            }
        }
    },function(err){
       console.log(err);
    });
}

//筛选确认按钮
function chooseinfo_equipment(){
    var contractno = $("select[name='cont6'] option:selected").val()||'';
    var projectname = $("select[name='projectname6'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname6'] option:selected").val()||'';
    var serial = $("input[name='equipment_ser_num6']").val()||'';
    var brand = $("select[name='brand7'] option:selected").val()||'';
    var type = $("select[name='type7'] option:selected").val()||'';
    var model = $("select[name='model7'] option:selected").val()||'';

    var data = {"contractno":contractno,"projectname":projectname,"dutyname":dutyname,"serial":serial,"brand": brand,"type":type,"model": model}
    postRequest('/chooseinfo_equipment_item/', {
        "data": JSON.stringify(data)
       },function (data){
        if (data.result == 1 || data.result == '1') {
            if (data.data.length){
                var html = '';
                if(data.data.length < 20 ){
                    $("#paging3").hide();
                    $.each(data.data,function(i,v){
                        var str =  encodeURI(JSON.stringify(v));
                        html += '\
                        <tr>\
                            <td><a href="javascript:;" title="查看" onclick="show_equipment_btn(\''+str+'\',\''+serial+'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;\
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
// //判断日期正确性
// function checkdate(year,month,day){
    // if( year != "" && month != "" && day != ""){
        // y = parseFloat(year);
        // m = parseFloat(month);
        // d = parseFloat(day);
        // var reg = /^[0-9]+.?[0-9]*$/;
        // if ( reg.test(y) && reg.test(m) && reg.test(d) ){
            // if (y>0&&y<10000){
                // if(y>0&&m<13){
                    // if(d==31){
                        // if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
                            // // alert("日期正确0");
                        // }else{
                            // alert("该月无31日");
                        // }
                    // }else if(d==29){
                        // if (m==2){
                            // if(y%4==0&&y%100!=0||y%400==0){
                                // // alert("日期正确1");
                            // }else{
                                // alert("该月无29日");
                            // }
                        // } else{
                            // // alert("日期正确2");
                        // }
                    // }else if(d==30){
                        // if(m==2){
                            // alert("2月无30日");
                        // }
                    // }else if(d>0&&d<29){
                        // // alert(d+"日期正确3");
                    // } else {
                        // alert("日期错误");
                    // }
                // } else {
                    // alert("月份错误");
                // }
            // }else {
                // alert("年份错误");
            // }
        // }
    // } else{
        // alert("日期错误");
    // }
// }
