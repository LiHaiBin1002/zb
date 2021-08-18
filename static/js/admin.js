var stime = '';
var etime = '';
var dataset = {}; // 获取下拉框的数据
var dataset1 = {}; // 排序后的所有项目信息
var memberset = {};
var clientset={};
var workdetailset = {};
var worktypeset= {};//获取工作类型下框的数据
var reportdata = {};//项目周报数据
var select_ht_data;//删选的条件
var equipmentset= {};//设备品牌、类型、型号的数据
$(function () {
    console.log($.cookie("username"));
    if ($.cookie("username") == undefined || $.cookie("username") == 'null') {
        window.location.href = '/';
    } else {
        $("#headername").html($.cookie("username"));
    }
    
    $("#dataMg").addClass('libg');
    $("#project_daily").addClass('libg');
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
        if (index == 1) {
            if($("#userMg").hasClass('libg')||$("#dutyMg").hasClass('libg')||$("#saleMg").hasClass('libg')||$("#worktypeMg").hasClass('libg')||$("#datain").hasClass('libg')||$("#equipmentMg").hasClass('libg')||$("#personnelInMg").hasClass('libg')){
                $("#perMg").addClass('libg');
            }else{$("#perMg").removeClass('libg');}
            if($("#project_daily").hasClass('libg')||$("#project_performance").hasClass('libg')){
                $("#dataMg").addClass('libg');
            }else{$("#dataMg").removeClass('libg');}
            // $("#datatrack").removeClass('libg');
            $('.perMg').hide();
            $('.perMg2').show();
            $('.perMg3').hide();
            $('.perMg2').unbind('click').on('click', 'ul', function (e) {
                var evt = e ? e : window.event;
                if (evt.stopPropagation) { //W3C 
                    evt.stopPropagation();
                } else {       //IE      
                    evt.cancelBubble = true;
                }
                // $("#userMg").removeClass('libg');
                var index = $(this).index();
                $(this).addClass('libg');
                $(this).siblings('ul').removeClass('libg');
                $(this).parent().parent().siblings().removeClass('libg');
                console.log(index);
                if (index == 0){
                    $("#datatrack").addClass('libg');
                    $("#userMg").removeClass('libg');
                    $("#saleMg").removeClass('libg');
                    $("#dutyMg").removeClass('libg');
                    $("#worktypeMg").removeClass('libg');
                    $("#datain").removeClass('libg');
                    $("#equipmentMg").removeClass('libg');
                    $("#perMg").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".perMg").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".systemBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $('.prj_reportBox').hide();
                    $('.archiveBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.perMg2').hide();
                    $('#export_btn1_ht').hide();
                    $('.One_Cont_equipmentBox').hide()
                    $(".project_performanceBox").hide();
                    if($("#pagebox").length>0){
                        $("#paging").get(0).removeChild($("#pagebox").get(0));
                    }
                    select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '进行中',"caigou":'',"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};
                    display_project_ing();
                    $(".dataTrackBox").show();
                    $(".dataTrackBox").siblings().hide();
                } else {
                    $("#datatrack").addClass('libg');
                    $("#userMg").removeClass('libg');
                    $("#saleMg").removeClass('libg');
                    $("#dutyMg").removeClass('libg');
                    $("#worktypeMg").removeClass('libg');
                    $("#datain").removeClass('libg');
                    $("#equipmentMg").removeClass('libg');
                    $("#perMg").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".perMg").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".systemBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $('.prj_reportBox').hide();
                    $('.archiveBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.perMg2').hide();
                    $('#export_btn1_ht').show();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    if($("#pagebox").length>0){
                        $("#paging").get(0).removeChild($("#pagebox").get(0));
                    }
                    select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"daohuo":'',"clientname": '',"dutyname": '',"salename": '',};
                    displayTrack();
                    $(".dataTrackBox").show();
                    $(".dataTrackBox").siblings().hide();
                }
            })
            // $("#wowowowo").append('<th height="30" id="wowowo">操作</th>') 
            // $("#wowowowo").get(0).removeChild($("#wowowo").get(0));
        } else if (index == 2) {
            if($("#userMg").hasClass('libg')||$("#dutyMg").hasClass('libg')||$("#saleMg").hasClass('libg')||$("#worktypeMg").hasClass('libg')||$("#datain").hasClass('libg')||$("#equipmentMg").hasClass('libg')||$("#personnelInMg").hasClass('libg')){
                $("#perMg").addClass('libg');
            }else{$("#perMg").removeClass('libg');}
            if($("#project_ing").hasClass('libg')||$("#project_all").hasClass('libg')){
                $("#datatrack").addClass('libg');
            }else{$("#datatrack").removeClass('libg');}
            $('.perMg').hide();
            $('.perMg2').hide();
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
                $(this).parent().parent().siblings().removeClass('libg');
                console.log(index);
                if (index == 0) {
                    $("#piliangdeletebtn2").hide();//隐藏批量确认按钮
                    $(".perMg").children('ul').removeClass('libg');
                    $("#piliangdeletebtn1").removeClass("display_none");
                    $("#search_btn1").removeClass("display_none");
                    $("#exportData1").removeClass("display_none");
                    $("#userMg").removeClass('libg');
                    $("#saleMg").removeClass('libg');
                    $("#dutyMg").removeClass('libg');
                    $("#worktypeMg").removeClass('libg');
                    $("#datain").removeClass('libg');
                    $("#equipmentMg").removeClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#perMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".userBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").show();
                    $(".dataMgBox").siblings().hide();
                    $(".systemBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $('.prj_reportBox').hide();
                    $('.archiveBox').hide();
                    $('.equipmentBox').hide();
                    $('.perMg3').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    if ($("#title_username_tishi").length>0){//移除点击“提示”增加的“人员姓名”列
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
                    // showAll();
                    $("#paging").show();
                    produce_page_for_showAll();//显示翻页
                    showAll_query(1);
                } else {
                    $("#dataMg").addClass('libg');
                    $("#dataMg").siblings().removeClass('libg'); // 所有兄弟节点
                    $(".perMg").children('ul').removeClass('libg'); // 全部子节点
                    $(".perMg2").children('ul').removeClass('libg'); // 全部子节点
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
                    })
                    empty_per_per_data();//清空人员绩效页面数据
                    // $(".tips").hide();
                    // $('.perMg2').hide();
                    // $('#export_btn1_ht').show();
                }
            })
        } else if (index == 3) {
            $(this).siblings().removeClass('libg');
            $("#userMg").removeClass('libg');
            $("#saleMg").removeClass('libg');
            $("#dutyMg").removeClass('libg');
            $("#worktypeMg").removeClass('libg');
            $("#datain").removeClass('libg');
            $("#equipmentMg").removeClass('libg');
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $("#perMg").removeClass('libg');
            $("#datatrack").removeClass('libg');
            $("#dataMg").removeClass('libg');
            $("#prj_reportMg").removeClass('libg');
            $("#archiveMg").removeClass('libg');
            $("#equipmentRegMg").removeClass('libg');
            $(".perMg").children('ul').removeClass('libg');
            $(".userBox").hide();
            $(".dataInBox").hide();
            $(".equip_metaBox").hide();
            $(".dataMgBox").hide();
            $(".systemBox").show();
            $(".systemBox").siblings().hide();
            $(".dutyBox").hide();
            $(".saleBox").hide();
            $(".worktypeBox").hide();
            $(".dataTrackBox").hide();
            $('.prj_reportBox').hide();
            $('.archiveBox').hide();
            $('.equipmentBox').hide();
            $('.perMg').hide();
            $('.perMg2').hide();
            $('.perMg3').hide();
            $(".perMg3").children('ul').removeClass('libg');
            $('.One_Cont_equipmentBox').hide();
            $(".project_performanceBox").hide();
            $(".tips").hide();
            show_work_count(); //显示每周提交情况
            show_work_count_month();//显示每月提交情况
        } else if(index == 4){
            $(this).siblings().removeClass('libg');
            $("#userMg").removeClass('libg');
            $("#saleMg").removeClass('libg');
            $("#dutyMg").removeClass('libg');
            $("#worktypeMg").removeClass('libg');
            $("#datain").removeClass('libg');
            $("#equipmentMg").removeClass('libg');
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $("#perMg").removeClass('libg');
            $("#datatrack").removeClass('libg');
            $("#dataMg").removeClass('libg');
            $("#systemMg").removeClass('libg');
            $("#archiveMg").removeClass('libg');
            $("#equipmentRegMg").removeClass('libg');
            $(".perMg").children('ul').removeClass('libg');
            $(".userBox").hide();
            $(".dataInBox").hide();
            $(".equip_metaBox").hide();
            $(".dataMgBox").hide();
            $(".systemBox").hide();
            $(".dutyBox").hide();
            $(".saleBox").hide();
            $(".worktypeBox").hide();
            $(".dataTrackBox").hide();
            $('.prj_reportBox').show();
            $(".prj_reportBox").siblings().hide();
            $('.archiveBox').hide();
            $('.equipmentBox').hide();
            $('.perMg').hide();
            $('.perMg2').hide();
            $('.perMg3').hide();
            $(".perMg3").children('ul').removeClass('libg');
            $('.One_Cont_equipmentBox').hide();
            $(".project_performanceBox").hide();
            $(".tips").hide();
            display_project_report();
        }else if(index == 5){
            $(this).siblings().removeClass('libg');
            $("#userMg").removeClass('libg');
            $("#saleMg").removeClass('libg');
            $("#dutyMg").removeClass('libg');
            $("#worktypeMg").removeClass('libg');
            $("#datain").removeClass('libg');
            $("#equipmentMg").removeClass('libg');
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $("#perMg").removeClass('libg');
            $("#datatrack").removeClass('libg');
            $("#dataMg").removeClass('libg');
            $("#systemMg").removeClass('libg');
            $("#prj_reportMg").removeClass('libg');
            $("#equipmentRegMg").removeClass('libg');
            $(".perMg").children('ul').removeClass('libg');
            $(".userBox").hide();
            $(".dataInBox").hide();
            $(".equip_metaBox").hide();
            $(".dataMgBox").hide();
            $(".systemBox").hide();
            $(".dutyBox").hide();
            $(".saleBox").hide();
            $(".worktypeBox").hide();
            $(".dataTrackBox").hide();
            $('.prj_reportBox').hide();
            $('.archiveBox').show();
            $(".archiveBox").siblings().hide();
            $('.equipmentBox').hide();
            $('.perMg').hide();
            $('.perMg2').hide();
            $('.perMg3').hide();
            $(".perMg3").children('ul').removeClass('libg');
            $('.One_Cont_equipmentBox').hide();
            $(".project_performanceBox").hide();
            $(".tips").hide();
            displayArchive();
        }else if(index == 6){
            $(this).siblings().removeClass('libg');
            $("#userMg").removeClass('libg');
            $("#saleMg").removeClass('libg');
            $("#dutyMg").removeClass('libg');
            $("#worktypeMg").removeClass('libg');
            $("#datain").removeClass('libg');
            $("#equipmentMg").removeClass('libg');
            $("#project_ing").removeClass('libg');
            $("#project_all").removeClass('libg');
            $("#perMg").removeClass('libg');
            $("#datatrack").removeClass('libg');
            $("#dataMg").removeClass('libg');
            $("#systemMg").removeClass('libg');
            $("#prj_reportMg").removeClass('libg');
            $("#archiveMg").removeClass('libg');
            $(".perMg").children('ul').removeClass('libg');
            $(".userBox").hide();
            $(".dataInBox").hide();
            $(".equip_metaBox").hide();
            $(".dataMgBox").hide();
            $(".systemBox").hide();
            $(".dutyBox").hide();
            $(".saleBox").hide();
            $(".worktypeBox").hide();
            $(".dataTrackBox").hide();
            $('.prj_reportBox').hide();
            $('.archiveBox').hide();
            $('.equipmentBox').show();
            $(".equipmentBox").siblings().hide();
            $('.perMg').hide();
            $('.perMg2').hide();
            $('.perMg3').hide();
            $(".perMg3").children('ul').removeClass('libg');
            $('.One_Cont_equipmentBox').hide();
            $(".project_performanceBox").hide();
            $(".tips").hide();
            displayEquipment();
            // $("#Equipment_Div").hide();//隐藏新增
            // $("#Equipment_Div4").hide();//隐藏导入
         }else if(index == 7){
            $("#datafileMg").siblings().removeClass('libg');
            $('#perMg1').children('ul').removeClass('libg');
            $('#perMg2').children('ul').removeClass('libg');
            $('#perMg3').children('ul').removeClass('libg');
            $('.data_sharBox').show();
            $('.data_sharBox').siblings().hide();
            
            $('.perMg').hide();
            $('.perMg2').hide();
            $('.perMg3').hide();
            // select_share_file();//查询展示
            paging_query_file(1);//显示第一页
            produce_page(); //成翻页栏
            $("input[name='searchfile_input']").val('');//清空搜索框
         } else {
            if($("#project_ing").hasClass('libg')||$("#project_all").hasClass('libg')){
                $("#datatrack").addClass('libg');
            }else{$("#datatrack").removeClass('libg');}
            if($("#project_daily").hasClass('libg')||$("#project_performance").hasClass('libg')){
                $("#dataMg").addClass('libg');
            }else{$("#dataMg").removeClass('libg');}
            // $('.perMg').css('display','block')
            // $("#perMg").removeClass('libg');
            $('.perMg').show();
            $('.perMg2').hide();
            $('.perMg3').hide();
            $('.perMg').unbind('click').on('click', 'ul', function (e) {
                var evt = e ? e : window.event;
                if (evt.stopPropagation) { //W3C 
                    evt.stopPropagation();
                } else {       //IE      
                    evt.cancelBubble = true;
                }
                $("#userMg").removeClass('libg');
                var index = $(this).index();
                $(this).addClass('libg');
                $(this).siblings('ul').removeClass('libg');
                $(this).parent().parent().siblings().removeClass('libg');
                console.log(index);
                if (index == 0){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").show();
                    $(".userBox").siblings().hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displayUser();
                } else if(index == 1){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dutyBox").show();
                    $(".dutyBox").siblings().hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displayDuty();
                } else if(index==2){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").show();
                    $(".saleBox").siblings().hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displaySale();
                } else if(index==3){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").show();
                    $(".worktypeBox").siblings().hide();
                    $(".dataTrackBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").hide();
                    $(".dataMgBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displayWorktype();
                } else if (index==4){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $(".dataMgBox").hide();
                    $(".equip_metaBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $(".dataInBox").show();
                    $(".dataInBox").siblings().hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displayProject()
                } else if(index == 5){
                    $("#perMg").addClass('libg');
                    $("#project_ing").removeClass('libg');
                    $("#project_all").removeClass('libg');
                    $("#dataMg").removeClass('libg');
                    $("#systemMg").removeClass('libg');
                    $("#datatrack").removeClass('libg');
                    $("#prj_reportMg").removeClass('libg');
                    $("#archiveMg").removeClass('libg');
                    $("#equipmentRegMg").removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $(".userBox").hide();
                    $(".dutyBox").hide();
                    $(".saleBox").hide();
                    $(".worktypeBox").hide();
                    $(".dataTrackBox").hide();
                    $(".dataMgBox").hide();
                    $(".archiveBox").hide();
                    $(".systemBox").hide();
                    $(".dataInBox").hide();
                    $(".equip_metaBox").show();
                    $(".equip_metaBox").siblings().hide();
                    $('.prj_reportBox').hide();
                    $('.equipmentBox').hide();
                    $(".tips").hide();
                    $('.One_Cont_equipmentBox').hide();
                    $(".project_performanceBox").hide();
                    $('.perMg').hide();
                    displayEquipMeta();
                }else{
                    $("#perMg").addClass('libg');
                    $("#perMg").siblings().removeClass('libg'); 
                    $(".perMg2").children('ul').removeClass('libg'); 
                    $(".perMg3").children('ul').removeClass('libg'); 
                    $(".personnel_inputBox").siblings().hide();
                    $(".personnel_inputBox").show();
                    $('.perMg').hide();
                    Display_Personnel_Input();
                    
                    // $("#project_ing").removeClass('libg');
                    // $("#project_all").removeClass('libg');
                    // $("#dataMg").removeClass('libg');
                    // $("#systemMg").removeClass('libg');
                    // $("#datatrack").removeClass('libg');
                    // $("#prj_reportMg").removeClass('libg');
                    // $("#archiveMg").removeClass('libg');
                    // $("#equipmentRegMg").removeClass('libg');
                    // $(".userBox").hide();
                    // $(".dutyBox").hide();
                    // $(".saleBox").hide();
                    // $(".worktypeBox").hide();
                    // $(".dataTrackBox").hide();
                    // $(".dataMgBox").hide();
                    // $(".archiveBox").hide();
                    // $(".systemBox").hide();
                    // $(".dataInBox").hide();
                    // $(".equip_metaBox").hide();
                    // $('.prj_reportBox').hide();
                    // $('.equipmentBox').hide();
                    // $(".tips").hide();
                    // $('.One_Cont_equipmentBox').hide();
                    // $(".project_performanceBox").hide();
                    // $('.perMg').hide();
                }
            })
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
    //选择合同编号匹配项目名称
    $("#cont").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
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
                    $("select[name='dutyname'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.dutyname) {
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
            $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
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
                    $("select[name='dutyname'] option").each(function () {
                        $(this).prop('selected', false);
                        $(this).attr('selected', false);
                        if ($(this).val() == v.dutyname) {
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
            $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            $("select[name='department'] option").eq(0).attr('selected', 'selected');
            $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选时 选择合同编号匹配项目名称
    $("#cont3").change(function () {
        var value = $(this).val();
        if (value != '' && dataset.length > 0) {
            $.each(dataset, function (i, v) {
                if (value == v.contractno) {
                    // console.log(v);
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
                    })
                    // $("select[name='clientname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.clientname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='dutyname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.dutyname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='sell'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.salename) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='department'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.department) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                }
            })
        } else {
            $("select[name='projectname3'] option").eq(0).attr('selected', 'selected');
            $("#projectname_write3").attr("value", '');
            $("#projectname_write3").prop("value", '');
            $("select[name='projectname3'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            // $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='department'] option").eq(0).attr('selected', 'selected');
            // $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
    //筛选时 选择项目名匹配合同号
    $("#projectname3").change(function () {
        
        var value = $(this).val();
        //console.log(value);
        //console.log(dataset);
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
                    // $("select[name='clientname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.clientname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='dutyname'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.dutyname) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='sell'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.salename) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                    // $("select[name='department'] option").each(function () {
                        // $(this).prop('selected', false);
                        // $(this).attr('selected', false);
                        // if ($(this).val() == v.department) {
                            // $(this).prop('selected', 'selected');
                            // $(this).attr('selected', 'selected');
                        // }
                    // })
                }
            })
        } else {
            $("select[name='cont'] option").eq(0).attr('selected', 'selected');
            $("#cont_write").attr("value", '');
            $("#cont_write").prop("value", '');
            $("select[name='cont'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='clientname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='clientname'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='dutyname'] option").eq(0).attr('selected', 'selected');
            // $("select[name='dutyname'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='sell'] option").eq(0).attr('selected', 'selected');
            // $("select[name='sell'] option").eq(0).siblings().removeAttr('selected');
            // $("select[name='department'] option").eq(0).attr('selected', 'selected');
            // $("select[name='department'] option").eq(0).siblings().removeAttr('selected');
        }
    })
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
    select_option_flag();//新数据提交否
    showmember();
    displayProject();
    displaySale();//销售
    displayDuty();//客户
    displayWorktype();//工作类型
    get_update_tishi();
    // show_work_count();
    // show_work_count_month();
    // showAll();
    produce_page_for_showAll();//显示翻页
    showAll_query(1);
    getEquipment();
    
    var work_fileInput = document.getElementById("work_fileInput");
    work_fileInput.addEventListener('change',function(event){
        var file1 = work_fileInput.files[0];
        // console.log(file1);
        var file = new FormData();
        file.append('file',file1);
        // console.log(file);
        $.ajax({
            url: "/upload_project/",
            type:"POST",
            data: file,
            processData:false,
            contentType:false,            
            success: function(data){
                console.log(data);
                if(data.result == '1' || data.result == 1){
                    myalert('系统提示框','导入'+data.count1+'个新项目成功,'+'排除'+data.count2+'个重复项目');
                    displayProject();
            }else{
                    myalert('系统提示框','导入项目失败');
                }
            }
        });
    },false);
    //导出数据
    $("#exportData").click(function(){
        chooseinfo();//原来的筛选函数，现用于获取筛选的值作为导出表格的元数据
        postRequest('/get_info/', {}, function (data) {
            // console.log(data);
            if(data.result == 1 || data.result == '1'){
                var  tempelm  =  document.createElement("iframe");
                tempelm.src  = data.data;
                tempelm.style.display  =  "none";
                document.body.appendChild(tempelm);
                // delete_file(data.data);
                // alert('导出成功');
            } else {
                alert('导出失败');
            }
        }, function(err){
            // delete_file(data.data);
            console.log(err);
        });
    });
   
    //导出合同
    $("#export_btn_ht").click(function(){
        postRequest('/get_workinfo/', {}, function (data) {
            // console.log(data);
            if(data.result == 1 || data.result == '1'){
                var  tempelm  =  document.createElement("iframe");
                tempelm.src  = data.data;
                tempelm.style.display  =  "none";
                document.body.appendChild(tempelm);
                
                // alert('导出成功');
            } else {
                alert('导出失败');
            }
        }, function(err){
            console.log(err);
        });
    });
    
    //修改密码按钮
    $("#alterPassword").click(function () {
        console.log($("#headername").html());
        $.each(memberset,function(i,v){
            console.log(v.username);
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
})
 //删除文件
// function delete_file(str){
    // postRequest('/delete_file/', {
         // "data": JSON.stringify({'name':str})
    // }, function (data) {
        // console.log(data);
        // if(data.result == 1 || data.result == '1'){
            // console.log("删除成功");
        // } else {
            // console.log("删除失败");
        // }
    // }, function(err){
        // console.log(err);
    // });
// }
//比较两次时间输入
function fortime(s, e) {
    if (s && e) {
        var reg = new RegExp("-", "g");
        var st = s.toString().replace(reg, '');
        var et = e.toString().replace(reg, '');
        if (s > e) {
            var s = ($("input[name='starttime']").val(''));
            var e = ($("input[name='endtime']").val(''));
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
                        if (v.type == '2'){
                            html7 += '<option value="' + v.firstname + '">' + v.firstname + '</option>';
                        }
                    }
                });
                $("#staffname").html(html7);
                $("#staffname8").html(html7);
                $("#dutyname1").html(html6)
            }
        }
    }, function (err) {
        console.log(err);
    })
}

function showAll() {
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
                            <td><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
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
                            <td><a href="javascript:;" title="删除" onclick="del_data(\'' + v.id +'\')"><button type="button" style="color:#fff;background:#F0473C;border:solid #F0473C;border-radius:11px;height:20px;width:40px;font-size:7px;">删除</button></a></td>';
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
                                    <td><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
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
                                    <td><a href="javascript:;" title="删除" onclick="del_data(\'' + v.id +'\')"><button type="button" class="shanchu">删除</button></a></td>';
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
                $("#show_all").html('<tr><td colspan="21">暂无数据</td></tr>');
                $("#paging").hide();
            }
        }
    }, function (err) {
        console.log(err);
    })
}
// 删除周报数据
function del_data(id) {
    // var i = 1 ;
    // $(".active").each(function(){
        // if($(this).css("background-color") == 'rgb(204, 204, 204)'  || $(this).css("background-color") == '#ccc'){
            // i = parseInt($(this).html().slice(9,-11));
        // };
    // });
    myconfirm('系统提示框','确定删除吗?',function(r){
        if (r){
            console.log(id);
            var data = { "id": id }
            postRequest('/del_work_content/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                    myalert('系统提示框','删除成功');
                    // showAll();
                    // chooseinfo();
                    produce_page_for_showAll();//生成新的翻页
                    //判断翻页是否存在或者原页码i是否还在新的翻页中
                    // if ($(".active")){
                        // if ($(".active").length >= i){
                            // // showAll_query(i);
                            // show_5_active(i,2)
                        // }else{
                            // show_5_active($(".active").length,2);
                        // }
                    // }else{
                        // show_5_active(1,2);
                    // }
                    showAll_query(1);
                } else {
                    myalert('系统提示框','删除失败');
                }
            }, function (err) {
                console.log(err);
            })
        }
    });
}
//删除多条周报记录
function del_work_content_more(){
    // var i = 1 ;
    // $(".active").each(function(){
        // if($(this).css("background-color") == 'rgb(204, 204, 204)'  || $(this).css("background-color") == '#ccc'){
            // i = parseInt($(this).html().slice(9,-11));
        // };
    // });
    var chk_value =[];//定义一个数组
    $('input[name="piliang"]:checked').each(function(){//遍历每一个名字为piliang的复选框，其中选中的执行函数
        chk_value.push($(this).val());//将选中的值添加到数组chk_value中
    });
    // console.log(chk_value);
    if (chk_value ==""||chk_value==null){
        myalert('系统提示框',"没有数据被选中")
    } else {
        myconfirm('系统提示框','确认删除选中的数据',function(r){
            if(r){
                var data = {"id" : chk_value}
                postRequest('/del_work_content_more/',{
                    "data": JSON.stringify(data)
                },function(data){
                    console.log(data);
                    if (data.result ==1 || data.result == '1'){
                        myalert('系统提示框',data.count_success+'条数据删除成功');
                        // chooseinfo();
                        produce_page_for_showAll();
                        // if ($(".active")){
                            // if ($(".active").length >= i){
                                // show_5_active(i,2);
                            // }else{
                                // show_5_active($(".active").length,2);
                            // }
                        // }else{
                            // show_5_active(1,2);
                        // }
                        showAll_query(1);
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
function change_piliang_checkbox(obj){
    $('input[name="piliang"]').each(function(){
        $(this).prop('checked',(!($(this).parent().parent().attr('style'))&&$(obj).is(':checked'))?true:false);
    });
}
//确认多条周报记录
function change_flag_0_more(){
    var chk_value =[];//定义一个数组
    $('input[name="piliang"]:checked').each(function(){//遍历每一个名字为piliang的复选框，其中选中的执行函数
        chk_value.push($(this).val());//将选中的值添加到数组chk_value中
    });
    if (chk_value ==""||chk_value==null){
        myalert('系统提示框',"没有数据被选中")
    } else {
        var data = {"id" : chk_value}
        postRequest('/change_flag/',{
            "data_id": JSON.stringify(data)
        },function(data){
            // console.log(data);
            if (data.result ==1 || data.result == '1'){
                select_option_flag(data.result);
            }
        },function(err){
            console.log(err);
        })
    }
}


/* 点击"增加用户"出现弹窗 */
function adduser() {
    $("#addUser").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#addUser").find(".popup-Content-box").height();
    $("#addUser").height(oH);
    $("#addUser").siblings('.popup-Box').css('height', 'auto');
    reset();
}

/* 点击"添加项目"出现弹窗 */
function addhetong() {
    $("#editOption").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    $(".popup-header—strong").html('添加项目');
    $("#addprojectbtn").show();
    $("#alterprojectbtn").hide();
    var oH = $("#editOption").find(".popup-Content-box").height();
    $("#editOption").height(oH);
    $("#editOption").siblings('.popup-Box').css('height', 'auto');
    resetproject();
    //自动生成累加序号
    var htm = $("#display_project>tr").eq(1).html();
    // var arr = (htm.split("</td>"))[0].substr(4);
    var arr = parseFloat((htm.split("</td>"))[0].substr(4))+1;
    $("input[name='xuhao']").val(arr);
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
    // $("select[name='state3'] option").eq(0).attr('selected', 'selected');
    // $("select[name='state3'] option").eq(0).siblings().removeAttr('selected');
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
    if($("#project_ing").hasClass('libg')){
        var html1 =  '<option value="">请选择</option>';
        var html2 =  '<option value="">请选择</option>';
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
    }else{
        var html1 =  '<option value="">请选择</option>';
        var html2 =  '<option value="">请选择</option>';
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
    $("#reasonscontent").val('');
}
/* 点击"增加人员系数"出现弹窗 */
// function addposition(){
//     $("#addmemberxishu").addClass('showPopup');
//     $(".md-overlay").addClass('showOverlay');
//     var oH = $("#addmemberxishu").find(".popup-Content-box").height();
//     $("#addmemberxishu").height(oH);
//     $("#addmemberxishu").siblings('.popup-Box').css('height','auto');
// }

/* 点击"修改"出现弹窗 */
function alteruser(id) {
    var data = { "id": id }
    postRequest('/display_this_user/', {
        "data": JSON.stringify(data)
    }, function (data) {
        if (data.result == 1 || data.result == '1') {
            $("#updateUser").addClass('showPopup');
            $(".md-overlay").addClass('showOverlay');
            var oH = $("#updateUser").find(".popup-Content-box").height();
            $("#updateUser").height(oH);
            $("#updateUser").siblings('.popup-Box').css('height', 'auto');
            console.log(data.data);
            var v = data.data;
            $("input[name='id']").val(v.id);
            $("input[name='updateusername']").val(v.username);
            $("input[name='updatefirstname']").val(v.firstname);
            $("input[name='updatepassword']").val(v.password);
            $("select[name='updaterole'] option").each(function (j, k) {
                if ($(this).val() == v.role) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='updatelevel'] option").each(function (j, k) {
                if ($(this).val() == v.level) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='updatemantype'] option").each(function (j, k) {
                if ($(this).val() == v.type) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='updateposition'] option").each(function (j, k) {
                if ($(this).val() == v.position) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
            $("select[name='updatestatus'] option").each(function (j, k) {
                if ($(this).val() == v.status) {
                    $(this).prop('selected', 'true');
                    $(this).attr('selected', 'true');
                }
            });
        } else {
            myalert('系统提示框',data.data);
        }
    }, function (err) {
        console.log(err);
    })
}

// 重置用户
function reset() {
    $("input[name='username']").val('');
    $("input[name='firstname']").val('');
    $("input[name='password']").val('123456');
    $("select[name='role'] option").eq(0).attr('selected', 'selected');
    $("select[name='mantype'] option").eq(0).attr('selected', 'selected');
    $("select[name='level'] option").eq(0).attr('selected', 'selected');
    $("select[name='position'] option").eq(0).attr('selected', 'selected');
    $("select[name='status'] option").eq(0).attr('selected', 'selected');
}

// 添加用户
function confirmAdduser() {
    var username = $("input[name='username']").val();
    var firstname = $("input[name='firstname']").val();
    var password = $("input[name='password']").val();
    var role = $("select[name='role'] option:selected").val();
    var type = $("select[name='mantype'] option:selected").val();
    var level = $("select[name='level']").val();
    var status = $("select[name='status'] option:selected").val();
    var position = $("select[name='position'] option:selected").val();

    if (username == '' || firstname == '' || password == '' || level == '' || position == '' || status == '' || role == ''|| type == '') {
        myalert('系统提示框','请完善所有信息');
    } else {
        var data = {
            "username": username,
            "firstname": firstname,
            "password": password,
            "level": level,
            "type": type,
            "role": role,
            "position": position,
            "status": status
        }
        // console.log(data);
        postRequest('/add_user/', {
            "data": JSON.stringify(data)
        }, function (data) {
            console.log(data);
            if (data.result == 1 || data.result == '1') {
                myalert('系统提示框','添加成功');
                $("#addUser").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                displayUser();
            } else if (data.result == -1 || data.result == '-1') {
                myalert('系统提示框',data.data);
            } else {
                myalert('系统提示框','添加失败');
            }
        }, function (err) {
            console.log(err);
        })
    }
}

// 修改用户
function updateuser() {
    // console.log($("input[name='id']").val());
    // console.log(typeof($("input[name='id']").val()));
    // var id =($("input[name='id']").val()).toString();
    var id =($("input[name='id']").val())
    var username = $("input[name='updateusername']").val();
    var firstname = $("input[name='updatefirstname']").val();
    var password = $("input[name='updatepassword']").val();
    var role = $("select[name='updaterole'] option:selected").val();
    var level = $("select[name='updatelevel']").val();
    var status = $("select[name='updatestatus'] option:selected").val();
    var position = $("select[name='updateposition'] option:selected").val();
    var type = $("select[name='updatemantype'] option:selected").val();

    if (username == '' || firstname == '' || password == '' || level == '' || position == '' || status == '' || role == '' || id == '' || type == '') {
        myalert('系统提示框','请完善所有信息');
    } else {
        var data = {
            "id": id,
            "username": username,
            "firstname": firstname,
            "password": password,
            "level": level,
            "type": type,
            "role": role,
            "position": position,
            "status": status
        }
        // console.log(data);
        postRequest('/update_user/', {
            "data": JSON.stringify(data)
        }, function (data) {
            console.log(data);
            if (data.result == 1 || data.result == '1') {
                myalert('系统提示框','更新成功');
                $("#updateUser").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                displayUser();
            } else {
                myalert('系统提示框','更新失败');
            }
        }, function (err) {
            console.log(err);
        })
    }
}

// 删除用户
function deleteuser(id) {
    myconfirm('系统提示框','确定要删除吗？',function(r) {
        if(r){
            var data = { "id": id };
            postRequest('/del_user/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                    myalert('系统提示框','删除成功');
                    displayUser();
                } else {
                    myalert('系统提示框','删除失败');
                }
            }, function (err) {
                console.log(err);
            })
        }
    });
}
 
 //冻结用户（改状态为离职）
function frozenuser(id) {
    myconfirm('系统提示框','确定要冻结吗？' ,function(r){
        if(r){
            var data = { "id": id };
            postRequest('/frozen_user/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                    displayUser();
                } else {
                    myalert('系统提示框','冻结失败');
                } 
            }, function (err) {
                console.log(err);
            })
        }
    });
}

// 显示用户列表
function displayUser() {
    postRequest('/display_user/', {}, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            if (data.data.length) {
                var html = '';
                $.each(data.data, function (i, v) {
                    html += '<tr>';
                    html += '<td height="30">' + v.username + '</td>';
					html += '<td height="30">' + v.firstname + '</td>';
                    html += '<td height="30">' + v.position + '</td>';
                    html += '<td height="30">' + v.level.replace(/[^\d.]/g, '') + '</td>';
                    if (v.role == '1') {
                        html += '<td height="30">超级管理员</td>';
                    } else if (v.role == '2') {
                        html += '<td height="30">管理员</td>';
                    } else {
                        html += '<td height="30">工程师</td>';
                    }
                    html += '<td height="30">' + v.status + '</td>';
                    html += '<td height="30">\
                        <span onclick="alteruser(\'' + v.id +'\')">\
                            <button type="button" class = "xiugai">修改</button>\
                        </span>\
                        <span onclick="deleteuser(\'' + v.id +'\')">\
                            <button type="button" class = "shanchu">删除</button>\
                        </span>\
                        <span onclick="frozenuser(\'' + v.id +'\')">\
                            <button type="button" class = "dongjie">冻结</button>\
                        </span>\
                    </td>';
                    html += '</tr>';
                })
                $("#display_user").html(html);
            }
        }
    }, function (err) {
        console.log(err);
    })
}

// 添加项目
function addProject() {
    var xuhao = $("input[name='xuhao']").val();
    var contractNo = $("input[name='contractNo']").val();
    var projectname = $("input[name='projectname']").val();
    var clientname = $("select[name='clientname1'] option:selected").val();
    var type = $("select[name='type1'] option:selected").val();
    var dutyname = $("select[name='dutyname1'] option:selected").val();
    var salename = $("select[name='salename1'] option:selected").val();
    var department = $("select[name='department1'] option:selected").val();

    if (xuhao == '' || contractNo == '' || projectname == '' || type == '' || clientname == '' || dutyname == '' || salename == '' || department == '') {
        myalert('系统提示框','请输入信息');
    } else {
        var data = {
            "xuhao": xuhao,
            "contractno": contractNo,
            "projectname": projectname,
            "clientname": clientname,
            "type": type,
            "dutyname": dutyname,
            "salename": salename,
            "department": department
        }
        console.log(data);
        postRequest('/add_project/', {
            "data": JSON.stringify(data)
        }, function (data) {
            console.log(data);
            if (data.result == 1 || data.result == '1') {
                myalert('系统提示框','添加成功');
                $("#editOption").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                displayProject();
            } else {
                myalert('系统提示框',data.data);
            }
        }, function (err) {
            console.log(err);
        })
    }
}

//显示项目信息
function displayProject() {
    postRequest('/display_project/', {

    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            dataset = data.data;
            if (data.data.length) {
                var html = '';
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
                    html += '<tr>';
                    html += '<td>' + v.xuhao + '</td>';
                    html += '<td>' + v.contractno + '</td>';
                    html += '<td style="text-align: left;">' + v.projectname + '</td>';
                    html += '<td>' + v.type + '</td>';
                    html += '<td>' + v.clientname + '</td>';
                    html += '<td>' + v.dutyname + '</td>';
                    html += '<td>' + v.salename + '</td>';
                    html += '<td>' + v.department + '</td>';
                    html += '<td>\
                        <span onclick="updateproject(\'' + v.id +'\')">\
                           <button type="button" class="xiugai">修改</button>\
                        </span>&nbsp;\
                        <span onclick="deleteproject(\'' + v.id +'\')">\
                            <button type="button" class="shanchu">删除</button>\
                        </span>\
                    </td>';
                    html += '</tr>';
                    val1.push(v.clientname);
                    val2.push(v.salename);
                    val3.push(v.department);
                    val4.push(v.dutyname);
                    html1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    html2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                })
                $("#display_project").html(html);
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
                })
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
                var dataset_ing = [];
                $.each(dataset, function (i, v) {
                    if(v.state=='进行中'){
                        dataset_ing.push(v);
                    }
                });
                // var htmll1 = '<option value="">请选择</option>';
                // var htmll2 = '<option value="">请选择</option>';
                // $.each(dataset_ing,function(i,v){
                    // htmll1 += '<option value="' + v.contractno + '">' + v.contractno + '</option>';
                    // htmll2 += '<option value="' + v.projectname + '">' + v.projectname + '</option>';
                // })
                // $("#cont3").html(htmll1);
                // $("#projectname3").html(htmll2);
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

//更新项目页面
function updateproject(id) {
    resetproject();
    var data = { "id": id };
    postRequest('/display_this_project/', {
        "data": JSON.stringify(data)
    }, function (data) {
        // console.log(data);
        if (data.result == 1 || data.result == '1') {
            $("#editOption").addClass('showPopup');
            $(".md-overlay").addClass('showOverlay');
            var oH = $("#editOption").find(".popup-Content-box").height();
            $("#editOption").height(oH);
            $("#editOption").siblings('.popup-Box').css('height', 'auto');
            $(".popup-header—strong1").html('修改数据项');
            $("#addprojectbtn").hide();
            $("#alterprojectbtn").show();
            console.log(data.data);
            var v = data.data;
            $("input[name='projectid']").val(v.id);
            $("input[name='xuhao']").val(v.xuhao);
            $("input[name='contractNo']").val(v.contractno);
            $("input[name='projectname']").val(v.projectname);
            $("select[name='type1']").val(v.type);
            $("select[name='clientname1']").val(v.clientname);
            $("select[name='dutyname1']").val(v.dutyname);
            $("select[name='salename1']").val(v.salename);
            $("select[name='department1']").val(v.department);
        } else {
            myalert('系统提示框',data.data);
        }
    }, function (err) {
        console.log(err);
    })
}

//更新项目确认
function alterProject() {
    var id = ($("input[name='projectid']").val());
    var xuhao = $("input[name='xuhao']").val();
    var contractNo = $("input[name='contractNo']").val();
    var projectname = $("input[name='projectname']").val();
    var type = $("select[name='type1'] option:selected").val();
    var clientname = $("select[name='clientname1'] option:selected").val();
    var dutyname = $("select[name='dutyname1'] option:selected").val();
    var salename = $("select[name='salename1'] option:selected").val();
    var department = $("select[name='department1'] option:selected").val();

    if (xuhao == ''||contractNo == '' || projectname == '' || type == '' || clientname == '' || salename == '' || department == '' || dutyname == '') {
        myalert('系统提示框','请输入信息');
    } else {
        var data = {
            'id': id,
            'xuhao':xuhao,
            "contractno": contractNo,
            "projectname": projectname,
            "type": type,
            "clientname": clientname,
            "dutyname": dutyname,
            "salename": salename,
            "department": department
        }
        // console.log(data);
        postRequest('/update_project/', {
            "data": JSON.stringify(data)
        }, function (data) {
            console.log(data);
            if (data.result == 1 || data.result == '1') {
                myalert('系统提示框','修改成功');
                $("#editOption").removeClass('showPopup');
                $(".md-overlay").removeClass('showOverlay');
                displayProject();
            } else {
                myalert('系统提示框','修改失败');
            }
        }, function (err) {
            console.log(err);
        })
    }
}

//删除项目
function deleteproject(id) {
    myconfirm('系统提示框','确定要删除吗？',function(r) {
        if(r){
            var data = { "id": id };
            postRequest('/del_project/', {
                "data": JSON.stringify(data)
            }, function (data) {
                console.log(data);
                if (data.result == 1 || data.result == '1') {
                    myalert('系统提示框','删除成功');
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

//显示合同跟踪表
function displayTrack(data){
    if($("#wowowo").length==0){
        $("#wowowowo").prepend('<th id="wowowo">操作</th>');
    }
    if($("#uploadType_ht").length==0&&$("#updataOperat").length==0){
        $("#prj_name").after("<th id = uploadType_ht>合同上传状态</th><th id = updataOperat>销售合同操作</th>");
    }
    var html = '';
    var now_dataset = [];
    if(data == null){
        now_dataset = dataset1;
    }else{
        now_dataset = select_before(dataset1, data);
    }
    if (now_dataset.length) {
        if (now_dataset.length < 18) {
            $("#paging1").hide();
            $.each(now_dataset, function (i, v) {
                guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                html += '<tr>';
                html += '<td>\
                    <span onclick="alert_updateTrack(\'' + v.id +'\')">\
                       <button type="button" class="xiugai">更新</button>\
                    </span></td>';
                html += '<td>' + v.xuhao + '</td>';
                html += '<td>' + v.clientname + '</td>';
                html += '<td>' + v.contractno + '</td>';
                html += '<td>' + v.type + '</td>';
                html += '<td style="text-align: left;">' + v.projectname + '</td>';
                html += '<td>' + v.cont_status + '</td>';
                if(v.cont_status!='OK'){
                    html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\',\''+v.projectname+'\')">\
                       <button type="button" class="xiugai">上传</button>\
                        <input type="file" class="file_Input" multiple="multiple">\
                    </a><a class="span_file_Input">\
                       <button type="button" class="dongjie">下载</button>\
                    </a><a class="span_file_Input">\
                       <button type="button" class="dongjie">删除</button>\
                    </a></td>';
                }else{
                    html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\')">\
                       <button type="button" class="xiugai">上传</button>\
                        <input type="file" class="file_Input" multiple="multiple">\
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
                        html += '<td>\
                            <span onclick="alert_updateTrack(\'' + v.id +'\')">\
                               <button type="button" class="xiugai">更新</button>\
                            </span></td>';
                        html += '<td>' + v.xuhao + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td>' + v.type + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
                        html += '<td>' + v.cont_status + '</td>';
                        if(v.cont_status!='OK'){
                            html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\',\''+v.projectname+'\')" >\
                               <button type="button" class="xiugai">上传</button>\
                                <input type="file" class="file_Input" multiple="multiple">\
                            </a><a class="span_file_Input">\
                               <button type="button" class="dongjie">下载</button>\
                            </a><a class="span_file_Input">\
                               <button type="button" class="dongjie">删除</button>\
                            </a></td>';
                        }else{
                            html += '<td><a class="span_file_Input" onclick="uploadtstatus_ht(this,\'' + v.id +'\')" style="width:46px;">\
                               <button type="button" class="xiugai">上传</button>\
                                <input type="file" class="file_Input" multiple="multiple">\
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
        $("#show_track").html('<tr><td colspan="23">暂无数据</td></tr>');
        $("#paging").hide();
    }
}
//显示在建项目
function display_project_ing(data){
    if($("#wowowo").length>0){
        $("#wowowowo").get(0).removeChild($("#wowowo").get(0));
    }
    if($("#uploadType_ht").length>0||$("#updataOperat").length>0){
        $("#uploadType_ht").remove();
        $("#updataOperat").remove();
    }
    var html = '';
    var dataset_ing = [];
    if(data == null){
        $.each(dataset, function (i, v) {
            if(v.state=='进行中'){
                dataset_ing.push(v);
            }
        });
    }else{
        dataset_ing = select_before(dataset, data);
    }
    if (dataset_ing.length) {
        if (dataset_ing.length < 18) {
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
                html += '<td style="text-align: left;">' + v.projectname + '</td>';
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
            var total = dataset_ing.length;
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
                    $.each(dataset_ing, function (i, v) {
                        guidangqingkuang=((v.guidangqingkuang)*100).toFixed(0)+'%';
                        yikaipiao=((v.yikaipiao)*100).toFixed(0)+'%';
                        yishoukuan=((v.yishoukuan)*100).toFixed(0)+'%';
                        html += '<tr>';
                        html += '<td>' + v.xuhao + '</td>';
                        html += '<td>' + v.clientname + '</td>';
                        html += '<td>' + v.contractno + '</td>';
                        html += '<td>' + v.type + '</td>';
                        html += '<td style="text-align: left;">' + v.projectname + '</td>';
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
        $("#show_track").html('<tr><td colspan="20">暂无数据</td></tr>');
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
            if (v.huowuqingdian=='已归档'){
                $('#chuyan2').removeProp('disabled', '');
                $('#chuyan2').removeAttr('disabled', '');
                $('#chuyan2').css('background-color', 'rgba(255,255,255,0.1)');
                if (v.chuyanbaogao=='已归档'){
                    $('#zhongyan2').removeProp('disabled', '');
                    $('#zhongyan2').removeAttr('disabled', '');
                    $('#zhongyan2').css('background-color', 'rgba(255,255,255,0.1)');
                }else{
                    $('#zhongyan2').prop('disabled', 'true');
                    $('#zhongyan2').attr('disabled', 'true');
                    $('#zhongyan2').css('background-color', 'rgba(127,127,127,0.1)');
                }
            }else{
                $('#chuyan2').prop('disabled', 'true');
                $('#chuyan2').attr('disabled', 'true');
                $('#chuyan2').css('background-color', 'rgba(127,127,127,0.1)');
                $('#zhongyan2').prop('disabled', 'true');
                $('#zhongyan2').attr('disabled', 'true');
                $('#zhongyan2').css('background-color', 'rgba(127,127,127,0.1)');
            }
            return false;
        }
    })
}
//确认更新进度表
function updateTrack(){
    var id = $("input[name='track_id']").val();
    var state = $("select[name='state2'] option:selected").val();
    var caigouzhuangtai = $("select[name='caigou2'] option:selected").val();
    var arrival_status = $("select[name='daohuo2'] option:selected").val();
    // var shishiqingkuang = $("select[name='shishi2'] option:selected").val();
    var guidangqingkuang = $("input[name='guidang2']").val();
    var huowuqingdian = $("select[name='huowu2'] option:selected").val();
    var chuyanbaogao = $("select[name='chuyan2'] option:selected").val();
    var zhongyanbaogao = $("select[name='zhongyan2'] option:selected").val();
    var yikaipiao = $("input[name='yikaipiao2']").val();
    var yishoukuan = $("input[name='yishoukuan2']").val();
    var remark = $("input[name='beizhu2']").val();
    var updatacontent = $('#headername').html()+'：更新了';
    var data={};
    if(id==""||caigouzhuangtai==""||arrival_status==""||state==""||guidangqingkuang==""||huowuqingdian==""||chuyanbaogao==""||zhongyanbaogao==""||yikaipiao==""||yishoukuan==""){
        myalert('系统提示框','数据不能为空');
    }else {
        $.each(dataset1,function(i,v){
            if (v.id == id ){
                guidangqingkuang = (guidangqingkuang/100).toFixed(2).toString();
                yikaipiao = (yikaipiao/100).toFixed(2).toString();
                yishoukuan = (yishoukuan/100).toFixed(2).toString();
                if(v.state != state||v.caigouzhuangtai!=caigouzhuangtai
                    ||v.arrival_status!=arrival_status
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
                    if(v.guidangqingkuang != guidangqingkuang){v.guidangqingkuang = guidangqingkuang;updata_item.push('归档情况')};
                    if(v.huowuqingdian != huowuqingdian){v.huowuqingdian = huowuqingdian;updata_item.push('货物清点')};
                    if(v.chuyanbaogao != chuyanbaogao){v.chuyanbaogao = chuyanbaogao;updata_item.push('初验报告')};
                    if(v.zhongyanbaogao != zhongyanbaogao){v.zhongyanbaogao = zhongyanbaogao;updata_item.push('终验报告')};
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
                                // console.log(select_ht_data);
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
                            // console.log(select_ht_data);
                            // displayTrack(select_ht_data);
                            // myalert('系统提示框',"更新成功")
                        }
                    });
                }else{
                    myalert("系统提示","没有数据被修改");
                }
            }
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
                    if(v.guidangqingkuang != guidangqingkuang){v.guidangqingkuang = guidangqingkuang;updata_item.push('归档情况')};
                    if(v.huowuqingdian != huowuqingdian){v.huowuqingdian = huowuqingdian;updata_item.push('货物清点')};
                    if(v.chuyanbaogao != chuyanbaogao){v.chuyanbaogao = chuyanbaogao;updata_item.push('初验报告')};
                    if(v.zhongyanbaogao != zhongyanbaogao){v.zhongyanbaogao = zhongyanbaogao;updata_item.push('终验报告')};
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
//改用于导出数据到excel表
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
    console.log(data);
    postRequest('/select_option/', {
        "data": JSON.stringify(data)
    }, function (data) {
        /*
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
                            <td><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
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
                            <td><a href="javascript:;" title="删除" onclick="del_data(\'' + v.id +'\')"><button type="button" class="shanchu">删除</button></a></td>';
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
                                    <td><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
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
                                    <td><a href="javascript:;" title="删除" onclick="del_data(\'' + v.id +'\')"><button type="button" class="shanchu">删除</button></a></td>';
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
        }*/
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
    postRequest('/sort_clientname/', {
        "data": JSON.stringify(val11)
    }, function (data) {
        if (data.result=='1'||data.result==1){
            $.each(data.data, function (i, v) {
                html3 += '<option value="' + v + '">' + v + '</option>';
                
            });
            $("#clientname").html(html3);
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
                    $("#piliangdeletebtn2").show();//显示批量确认按钮
                    $(".perMg").children('ul').removeClass('libg');
                    $(".perMg2").children('ul').removeClass('libg');
                    $(".perMg3").children('ul').removeClass('libg');
                    $("#dataMg").siblings().removeClass('libg');
                    $("#piliangdeletebtn1").addClass("display_none");
                    $("#search_btn1").addClass("display_none");
                    $("#exportData1").addClass("display_none");
                    $("#dataMg").addClass('libg');
                    $("#project_daily").addClass('libg');
                    $(".dataMgBox").show();
                    $(".dataMgBox").siblings().hide();
                    $(".tips").hide();
                    $(".perMg2").hide();
                    $(".perMg3").hide();
                    $('.One_Cont_equipmentBox').hide()
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
                
            }else {
                display_news(data);
            }
        }
    },function(err){
        console.log(err);
    });
}
//返回按键
function fanhui(){
    $("#piliangdeletebtn2").hide();//隐藏批量确认按钮
    $("#paging").show();
    resetchoose();
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
    $("#piliangdeletebtn1").removeClass("display_none");
    $("#search_btn1").removeClass("display_none");
    $("#exportData1").removeClass("display_none");
    $("#dataMg").addClass('libg');
    $("#perMg").removeClass('libg');
    $("#datain").removeClass('libg');
    $("#systemMg").removeClass('libg');
    $("#userMg").removeClass('libg');
    $("#saleMg").removeClass('libg');
    $("#dutyMg").removeClass('libg');
    $("#datatrack").removeClass('libg');
    $("#worktypeMg").removeClass('libg');
    $(".userBox").hide();
    $(".dataInBox").hide();
    $(".dataMgBox").show();
    $(".systemBox").hide();
    $(".dutyBox").hide();
    $(".saleBox").hide();
    $(".worktypeBox").hide();
    $(".dataTrackBox").hide();
    $(".tips").hide();
    // showAll();
    produce_page_for_showAll();//显示翻页
    showAll_query(1);//展示第一页
}
//展示周报消息
function display_news(data){
    if($("#pagebox1").length>0){
        $("#paging1").get(0).removeChild($("#pagebox1").get(0));
    }
    var html = '';
    if (data.data.length) {
        console.log(data.data.length);
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
                html += '<tr>';
                html += '<td><input type="checkbox" value="'+v.id+'" name="piliang"></td>';
                html += '<td>' + serialNummber + '</td>';
                html += '<td>' + workdate + '</td>';
                html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                html += '<td>' + address + '</td>';
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
                html += '<td>' + v.worktype + '</td>';
                html += '<td>' + v.workitem + '</td>';
                html += '<td style="text-align: left;">'+ v.workcontent + '</td>';
                html += '<td style="text-align: left;">'+ v.toresult + '</td>';
                if($("#title_username").length>0){
                    html += '<td>' + v.membername + '</td>';
                }
                html += '<td>' + v.workload + '</td>';
                html += '<td>' + v.level + '</td>';
                html += '<td>' + (count/100).toFixed(2) + '</td>';
                html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                html += '<td><a href="javascript:;" title="确认" onclick="change_flag_0(\'' + v.id +'\')">\
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
                        html += '<tr>';
                        html += '<td><input type="checkbox" value="'+v.id+'" name="piliang"></td>';
                        html += '<td>' + serialNummber + '</td>';
                        html += '<td>' + workdate + '</td>';
                        html += '<td>' + (v.endtime).slice(0,10) + '</td>';
                        html += '<td>' + address + '</td>';
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
                        html += '<td>' + v.worktype + '</td>';
                        html += '<td>' + v.workitem + '</td>';
                        html += '<td style="text-align: left;">'+ v.workcontent + '</td>';
                        html += '<td style="text-align: left;">'+ v.toresult + '</td>';
                        if($("#title_username").length>0){
                            html += '<td>' + v.membername + '</td>';
                        }
                        html += '<td>' + v.workload + '</td>';
                        html += '<td>' + v.level + '</td>';
                        html += '<td>' + (count/100).toFixed(2) + '</td>';
                        html += '<td>' + parseFloat(v.fixedcost).toFixed(2) + '</td>';
                        html += '<td><a href="javascript:;" title="确认" onclick="change_flag_0(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                            onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                        // html += '</tr>';
                        // html += '\
                         // <tr>\
                            // <td ><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
                            // <td >'+ serialNummber +'</td>\
                            // <td >'+ workdate + '</td>\
                            // <td >'+ (v.endtime).slice(0,10) + '</td>\
                            // <td >'+ address + '</td>\
                            // <td >'+ v.contractno + '</td>\
                            // <td  style="text-align: left;">'+ v.projectname + '</td>\
                            // <td >'+ v.clientname + '</td>\
                            // <td >'+ v.department + '</td>\
                            // <td >'+ v.dutyname + '</td>\
                            // <td >'+ v.salename + '</td>\
                            // <td >'+ v.worktype + '</td>\
                            // <td >'+ v.workitem + '</td>\
                            // <td style="text-align: left;">'+ v.workcontent + '</td>\
                            // <td style="text-align: left;">'+ v.toresult + '</td>\
                            // <td >'+v.membername +'</td>\
                            // <td >'+ v.workload + '</td>\
                            // <td >'+ v.level + '</td>\
                            // <td >'+ (count/100).toFixed(2) + '</td>\
                            // <td >'+ parseFloat(v.fixedcost).toFixed(2) + '</td>\
                            // <td ><a href="javascript:;" title="确认" onclick="change_flag_0(\'' + v.id +'\')">\
                            // <button type="button" class="xiugai">确认</button></a>&nbsp;&nbsp;<a href="javascript:;" title="退回"\
                            // onclick="alertreturn(\'' + v.id +'\')"><button type="button" class="shanchu">退回</button></a></td>';
                        // html += '</tr>';
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
        if(("#title_contractno").length>0){
            $("#show_all").html('<tr><td colspan="21">暂无数据</td></tr>');
        }
        else{
            $("#show_all").html('<tr><td colspan="17">暂无数据</td></tr>');
        }
        $("#paging").hide();
    }
}
//确认
function change_flag_0(id){
    var data_id = { "id": [id] }
    postRequest('/change_flag/', {
        "data_id": JSON.stringify(data_id)
    }, function (data_id) {
        if (data_id.result == 1 || data_id.result == '1') {
            select_option_flag(data_id.result);
            // $("#tishi").trigger('click');
            // postRequest('/select_option_flag/',{
        
            // },function(data){
                // if(data.result == 1 || data.result == '1'){
                    // // $(".header-btn-tishi").html(data.data.length);
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
                // $("#tishi").trigger('click');
                // postRequest('/select_option_flag/',{
            
                // },function(data){
                    // if(data.result == 1 || data.result == '1'){
                        // // $(".header-btn-tishi").html(data.data.length);
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
}
// let perMg1 = document.getElementById('perMg1');
// document.onclick=function(){
    // perMg1.style.display='none';
// }
document.onclick=function(){
    cont.style.display='none';
    cont3.style.display='none';
    projectname.style.display='none';
    projectname3.style.display='none';
    cont.style.display='none';
    document.getElementById('cont6').style.display='none';
    projectname4.style.display='none';
    document.getElementById('projectname6').style.display='none'
    document.getElementById('model6').style.display='none'
    $("#perMg1").hide();
    $("#perMg2").hide();
    $("#perMg3").hide();
    if($("#userMg").hasClass('libg')||$("#dutyMg").hasClass('libg')||$("#saleMg").hasClass('libg')||$("#worktypeMg").hasClass('libg')||$("#datain").hasClass('libg')||$("#equipmentMg").hasClass('libg')||$("#personnelInMg").hasClass('libg')){
        $("#perMg").addClass('libg');
    }else{$("#perMg").removeClass('libg');}
    if($("#project_ing").hasClass('libg')||$("#project_all").hasClass('libg')){
        $("#datatrack").addClass('libg');
    }else{$("#datatrack").removeClass('libg');}
    if($("#project_daily").hasClass('libg')||$("#project_performance").hasClass('libg')){
        $("#dataMg").addClass('libg');
    }else{$("#dataMg").removeClass('libg');}
    for(var i = 1 ; i < 10 ; i++){
        if (i != 2){//cont2和projectname2为项目跟踪里面的input，这里需要隐藏的是select
            if ($("#cont"+i)){
                $("#cont"+i).hide();
            }
            if ($("#projectname"+i)){
                $("#projectname"+i).hide();
            }
        }
            
        
    }; 
    $("#cont81").hide();
    $("#projectname81").hide();
}
//显示客户
function displayDuty(){
    postRequest('/display_duty/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            clientset = data.data;
            var i = 0;
            var html = '';
            var html8 =  '<option value="">请选择</option>';
            $.each(data.data, function (i, v) {
                i += 1;
                html8 += '<option value="' + v.clientname + '">' + v.clientname + '</option>';
                if ( 0 != i%2 ){
                    html+='<tr>';
                }
                html += '\
                    <td height="30" style="text-align:left;">'+v.clientname+'</td>';
                
                if ( 0 == i%2 ){
                    html += '\
                    <td height="30"><a href="javascript:;" title="修改" onclick="alter_client(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">修改</button></a>\
                            <a href="javascript:;" title="删除" onclick="del_client(\'' + v.id +'\')">\
                            <button type="button" class="shanchu">删除</button></a></td>';
                    html+='</tr>';
                } else{
                    html += '\
                    <td height="30"><a href="javascript:;" title="修改" onclick="alter_client(\'' + v.id +'\')">\
                            <button type="button" class="xiugai">修改</button></a>\
                            <a href="javascript:;" title="删除" onclick="del_client(\'' + v.id +'\')">\
                            <button type="button" class="shanchu">删除</button></a></td>';
                }
            })
            // console.log(html8);
            $("#clientname1").html(html8);
            $("#display_duty").html(html);
        }
    },function(err){
        console.log(err);
    })
}
//客户 点击“修改”出现弹窗
function alter_client(id){
    $("#Client_header-title").text("修改客户")
    $("input[name='clientname_id']").val(id);
    $("#addClient").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#addClient").find(".popup-Content-box").height();
    $("#addClient").height(oH);
    $("#addClient").siblings('.popup-Box').css('height', 'auto');
    $(".updateclient").show();
    $(".addclient").hide();
    $.each(clientset, function (i, v) {
        if (v.id == id){
            $("input[name='add_clientname']").val(v.clientname);
        }
    })
    
    }
//确认修改客户
function update_client(){
    var flag = true;
    var similer_client = [];
    var id = $("input[name='clientname_id']").val();
    var clientname = $("input[name='add_clientname']").val();
    var data = {"id":id,"clientname": clientname}
    if (clientname ==""||clientname==null){
        myalert('系统提示框','数据为空');
    } else {
        var per_list =[]
        $.each(clientset,function(i,v){
            per_list = str_conform(clientname,v.clientname)
            if(per_list[0]==1 && per_list[1]==1){
                myalert('系统提示框','客户已存在');
                flag = false;
                return false;
            } else if(((per_list[0]>0.5 && per_list[0]<=1) && (per_list[1] < 1 && per_list[1] > 0.5)) || ((per_list[1]>0.5 && per_list[1]<=1) && (per_list[0] < 1 && per_list[0] > 0.5))){
                similer_client.push(v.clientname);
            } else {
                return true;
            }
        });
        if (flag){
            if (similer_client!=""){
                similer_client.push("确认修改？")
                myconfirm('相似客户名称',similer_client,function(r){
                    if(r){
                        postRequest('/update_client/',{
                            "data": JSON.stringify(data)
                        },function(data){
                            if (data.result==1||data.result=='1'){
                                $("#addClient").removeClass('showPopup');
                                $(".md-overlay").removeClass('showOverlay');
                                displayDuty();
                            }
                        },function(err){
                            console.log(err);
                        })
                     }
                })
            } else{
                postRequest('/update_client/',{
                    "data": JSON.stringify(data)
                },function(data){
                    if (data.result==1||data.result=='1'){
                        $("#addClient").removeClass('showPopup');
                        $(".md-overlay").removeClass('showOverlay');
                        displayDuty();
                    }
                },function(err){
                    console.log(err);
                })
            }
        }
    }
}

/* 点击"添加客户"出现弹窗 */
function addclient() {
    $("#Client_header-title").text("添加客户")
    $("#addClient").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#addClient").find(".popup-Content-box").height();
    $("#addClient").height(oH);
    $("#addClient").siblings('.popup-Box').css('height', 'auto');
    $(".updateclient").hide();
    $(".addclient").show();
    $("input[name='add_clientname']").val("");
}
//添加客户确定
function add_client(){
    var flag = true;
    var similer_client = [];
    var clientname = $("#add_clientname").val();
    if (clientname ==""||clientname==null){
        myalert('系统提示框','数据为空');
    } else {
        var per_list =[]
        $.each(clientset,function(i,v){
            per_list = str_conform(clientname,v.clientname)
            if(per_list[0]==1 && per_list[1]==1){
                myalert('系统提示框','客户已存在');
                flag = false;
                return false;
            } else if(((per_list[0]>0.5 && per_list[0]<=1) && (per_list[1] < 1 && per_list[1] > 0.5)) || ((per_list[1]>0.5 && per_list[1]<=1) && (per_list[0] < 1 && per_list[0] > 0.5))){
                // console.log(per_list[0]);
                // console.log(per_list[1]);
                similer_client.push(v.clientname);
            } else {
                return true;
            }
        });
        if (flag){
            if (similer_client!=""){
                similer_client.push("确认添加？")
                myconfirm('相似客户名称',similer_client,function(r){
                    if(r){
                        data = {"clientname":clientname};
                        postRequest('/add_project_duty/',{
                            "data": JSON.stringify(data)
                        },function(data){
                            if(data.result==1||data.result=='1'){
                                $("#addClient").removeClass('showPopup');
                                $(".md-overlay").removeClass('showOverlay');
                                displayDuty(); 
                            }
                        },function(err){
                            console.log(err);
                        })
                     }
                })
            } else{
                data = {"clientname":clientname};
                postRequest('/add_project_duty/',{
                    "data": JSON.stringify(data)
                },function(data){
                    if(data.result==1||data.result=='1'){
                        $("#addClient").removeClass('showPopup');
                        $(".md-overlay").removeClass('showOverlay');
                        displayDuty(); 
                    }
                },function(err){
                    console.log(err);
                })
            }
        }
    }
}
//删除客户
function del_client(id){
    myconfirm('系统提示框','确定要删除吗？',function(r) {
        if(r){
            data={"id":id};
            postRequest('/del_duty/',{
                "data": JSON.stringify(data)
            },function(data){
                if (data.result==1||data.result=='1'){
                    console.log("删除成功")
                    displayDuty();
                }
            },function(err){
                console.log(err);
            })
        }
    });
}

//显示销售负责人
function displaySale(){
    postRequest('/display_saleman/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            var html = '';
            var html7 = '<option value="">请选择</option>';
            $.each(data.data, function (i, v) {
                html7 += '<option value="' + v.salename + '">' + v.salename + '</option>';
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
            })
            // console.log(html7);
            $("#salename1").html(html7);
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
//显示工作类型
function displayWorktype(){
    postRequest('/display_worktype/',{
        
    },function(data){
        if(data.result==1||data.result=='1'){
            worktypeset = data.data
            if(data.data.length){
                var html = '';
                var html7 = '<option value="">请选择</option>';
                var val7 = [];
                $.each(data.data, function (i, v) {
                    val7.push(v.worktype)
                    html += '\
                        <tr>\
                        <td height="30">'+v.worktype+'</td>\
                        <td height="30">'+v.workitem+'</td>\
                        <td height="30"><a class="a1 display_none" href="javascript:;" title="确认" onclick="update_worktype(this,\'' + v.id +'\')">\
                            <button type="button" class="xiugai">确认</button></a>\
                            <a class="a2" href="javascript:;" title="修改" onclick="alter_worktype(this)">\
                            <button type="button" class="xiugai">修改</button></a>\
                            <a class="a3 display_none" href="javascript:;" title="取消" onclick="displayWorktype()">\
                            <button type="button" class="shanchu">取消</button></a>\
                            <a class="a4" href="javascript:;" title="删除" onclick="del_worktype(\'' + v.id +'\')">\
                            <button type="button" class="shanchu">删除</button></a></td>\
                        </tr>';
                })
                // console.log(html7);
                var val77 = unique(val7);
                $.each(val77, function (i, v) {
                    html7 += '<option value="' + v + '">' + v + '</option>';
                });
                $("#worktype").html(html7);
            }
            html += '\
            <tr>\
                <td height="30"><input id="add_worktype" style="border:#eaeaea solid 1px;width:100%;"></td>\
                <td height="30"><input id="add_workitem" style="border:#eaeaea solid 1px;width:100%;"></td>\
                <td height="30"><a class="a5" href="javascript:;" title="添加"onclick="add_worktype()">\
                    <button type="button" class="xiugai">添加</button></a>\
                    <a class="a6" href="javascript:;" title="取消"onclick="displayWorktype()">\
                    <button type="button" class="shanchu">取消</button></a></td>\
            </tr>';
            
            $("#display_worktype").html(html);
        
        }
    },function(err){
        console.log(err);
    })
}
//添加工作类型
function add_worktype(){
    var worktype = $("#add_worktype").val();
    var workitem = $("#add_workitem").val();
    if (worktype ==""||workitem==""){
        myalert('系统提示框','数据为空');
    }else{
        data = {"workitem":workitem,"worktype":worktype};
        postRequest('/add_worktype/',{
            "data": JSON.stringify(data)
        },function(data){
            if(data.result==1||data.result=='1'){
                console.log(data.result);
                displayWorktype();
            }
        },function(err){
            console.log(err);
        })
    }
}
//删除工作类型
function del_worktype(id){
    myconfirm('系统提示框','确定要删除吗？', function(r){
        if(r){
            var data={"id":id};
            postRequest('/del_worktype/',{
                "data": JSON.stringify(data)
            },function(data){
                if (data.result==1||data.result=='1'){
                    console.log("删除成功")
                    displayWorktype();
                }
            },function(err){
                console.log(err);
            })
        }
    });
}
//工作类型 点击修改出现“input”框 
function alter_worktype(obj){
    var list1=$(obj).parent().find("a:lt(4)");
    $(list1[0]).removeClass("display_none");
    $(list1[1]).addClass("display_none");
    $(list1[2]).removeClass("display_none");
    $(list1[3]).addClass("display_none");
    var list=$(obj).parent().parent().find("td:lt(2)");
    $.each(list,function(i,v){
        $(v).html("<input type='text' value='"+$(v).text()+"' style='border:#eaeaea solid 1px;width:100%;'/>");
    });
}
//确认修改工作类型
function update_worktype(obj,id){
    var list2=$(obj).parent().parent().find("td:lt(2)");
    var worktype = $(list2[0]).children("input").val();
    var workitem = $(list2[1]).children("input").val();
    var data = {"id":id,"worktype":worktype,"workitem":workitem}
    postRequest('/update_worktype/',{
            "data": JSON.stringify(data)
    },function(data){
        if (data.result==1||data.result=='1'){
            console.log("修改成功");
            displayWorktype();
        }
    },function(err){
        console.log(err);
    })
}
//显示日报提交情况
// function show_work_count(){
    // postRequest('/show_work_count/',{
        
    // },function(data){
        // if(data.result==1||data.result=='1'){
            // var html = '';
            // var date = '';
            // $.each(data.data, function (i, v) {
                // if((v.checkdate).slice(0,10)!=date){
                    // date1 = (v.checkdate).slice(0,10);
                    // html += '<tr><td colspan=4">' + date1 + '</td></tr>';
                    // date = date1;
                // }
                // html += '<tr>';
                // html += '<td height="30">' + v.real_name + '</td>';
                // html += '<td height="30">' + v.count + '</td>';
                // html += '<td height="30">' + v.checkresult+ '</td>';
                // html += '</tr>';
            // });
            // $("#display_work_count").html(html);
        // }
    // },function(err){
        // console.log(err);
    // })
// }
//计算两字符串相似度
function str_conform(str1,str2){
    var arr1 = [];
    var arr2 = [];
    for(i=0;i<str1.length;i++){
    arr1.push(str1.charAt(i));
    }
    for(i=0;i<str2.length;i++){
    arr2.push(str2.charAt(i));
    }
    var arr11 = unique(arr1);
    var arr22 = unique(arr2);
    var count1 = 0;
    var count2 = 0;
    $.each(arr11,function(i , v){
        $.each(arr22,function(a , b){
            if (b == v){
                count1 = count1 + 1;
            }
        });
    });
    $.each(arr22,function(i , v){
        $.each(arr11,function(a , b){
            if (b == v){
                count2 = count2 + 1;
            }
        });
    });
    var per1 = count1/arr11.length;
    var per2 = count2/arr22.length;
    var per_list=[per1,per2];
    return per_list;
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
    $('#export_btn1_ht').hide();
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
        display_project_ing(data);
        
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
    }
    select_ht_data=data;
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
//合同进度盒子的返回
function fanhui_ht(){
    if($('#project_ing').hasClass('libg')){
        select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '进行中',"caigou":'' ,"daohuo":'' ,"clientname": '',"dutyname": '',"salename": '',};
        display_project_ing();
    }
    if($('#project_all').hasClass('libg')){
        select_ht_data={"cont": '',"projectname": '',"starttime": '',"endtime":'',"type": '',"state": '',"caigou":'' ,"daohuo":'' ,"clientname": '',"dutyname": '',"salename": '',};
        displayTrack();
        $('#export_btn1_ht').show();
    }
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
                            html += '<tr><td>'+clock+'</td><td>'+v.username+'</td><td>'+v.contractno+'</td><td style="text-align:left">'+v.projectname+'</td><td><a href="javascript:;" title="查看" onclick="show_project_report(\''+v.username+'\',\'' + v.serial_number +'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;<a href="javascript:;" title="删除" onclick="del_project_report(\'' + v.serial_number +'\')"><button type="button" class="shanchu">删除</button></a></td></tr>' ;
                        }else{
                            num = v.serial_number;
                            html +='<tr><td style="border:none;"></td></tr>';
                            var year = v.serial_number.slice(0,4);//年
                            var month = v.serial_number.slice(4,6);//月
                            var day = v.serial_number.slice(6,8);//日
                            var hh = v.serial_number.slice(8,10);//时
                            var mm = v.serial_number.slice(10,12);//分
                            var clock = year + '年' + month + '月' + day + '日' + hh + '时' + mm + '分' ;
                            html += '<tr><td>'+clock+'</td><td>'+v.username+'</td><td>'+v.contractno+'</td><td style="text-align:left">'+v.projectname+'</td><td><a href="javascript:;" title="查看" onclick="show_project_report(\''+v.username+'\',\'' + v.serial_number +'\')"><button type="button" class="xiugai">查看</button></a>&nbsp;<a href="javascript:;" title="删除" onclick="del_project_report(\'' + v.serial_number +'\')"><button type="button" class="shanchu">删除</button></a></td></tr>' ;
                            
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
//删除项目周报
function del_project_report(str){
    data = {'num':str}
    myconfirm('系统提示框','确认删除',function(r){
        if(r){
            postRequest('/del_project_report/',{
                'data':JSON.stringify(data)
            },function(data){
                display_project_report();
            },function(err){
                console.log(err);
                myalert('系统提示框','删除失败')
            });
        }
    });
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
    
    // $.each(arr,function(i,v){
        // // console.log(v);
        // url = '/static/uploads/contract/'+v+'';
        // if(v.indexOf('pdf') != -1||v.indexOf('txt') != -1){
            // // document.getElementById('links').href = url;
            // $(obj).attr('href',url);//只能下载一个该类型文件
        // }else{
            // var fileName = v
            // var form = $("<form></form>").attr("action", url).attr("method", "post");
            // form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
            // form.appendTo('body').submit().remove();
        // }
        
    // });
}

//删除合同
function deletetype_ht(cont_name,id){
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

//归档记录页面的返回按钮
// function fanhui_archive(){
    
    // displayArchive();
// }
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
//筛选归档记录确认---->感觉“展示归档记录”函数没太大必要了
function chooseinfo_archive(){
    var starttime = $("input[name='starttime41']").val()||'';
    var endtime = $("input[name='endtime42']").val()||'';
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
                        <td><a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a></td>\
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
                            <td><a href="javascript:;" title="下载" onclick="get_archive_zip(\''+v.docum_file_id+'\')"><button type="button" class="xiugai">下载</button></a></td>\
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
    $("select[name='docum_item41'] option").eq(0).attr('selected', 'selected');
    $("select[name='docum_item42'] option").eq(0).prop('selected', 'selected');
    $("input[name='starttime41']").val('');
    $("input[name='endtime42']").val('');
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
    $("input[name='guidang2']").val(num);
}
//显示设备产品信息元数据
function displayEquipMeta(){
    if($("select[name='brand6'] option:selected").val()!=""|| $("select[name='type6'] option:selected").val()!=''|| $("input[name='model6']").val()!=''){
        chooseinfo_equipment_meta();
    }else{
        postRequest('/display_equip_meta/',{
            
        },function(data){
            if(data.result==1||data.result=='1'){
                var html = '';
                $.each(data.data, function (i, v) {
                    html += '\
                        <tr>\
                        <td height="30">'+v.brand+'</td>\
                        <td height="30">'+v.type+'</td>\
                        <td height="30">'+v.model+'</td>\
                        <td height="30"><a class="a1 display_none" href="javascript:;" title="确认" onclick="update_EquipMeta(this,\'' + v.id +'\')">\
                            <button type="button" class="xiugai">确认</button></a>\
                            <a class="a2" href="javascript:;" title="修改" onclick="alter_EquipMeta(this)">\
                            <button type="button" class="xiugai">修改</button></a>\
                            <a class="a3 display_none" href="javascript:;" title="取消" onclick="displayEquipMeta()">\
                            <button type="button" class="shanchu">取消</button></a>\
                            <a class="a4" href="javascript:;" title="删除" onclick="del_EquipMeta(\'' + v.id +'\')">\
                            <button type="button" class="shanchu">删除</button></a></td>\
                        </tr>';
                })
                html += '\
                <tr>\
                    <td height="30"><input id="add_brand" style="border:#eaeaea solid 1px;width:100%;" maxlength="15"></td>\
                    <td height="30"><input id="add_type" style="border:#eaeaea solid 1px;width:100%;" maxlength="15"></td>\
                    <td height="30"><input id="add_model"  style="border:#eaeaea solid 1px;width:100%;" maxlength="30"></td>\
                    <td height="30"><a class="a5" href="javascript:;" title="添加"onclick="add_EquipMeta()">\
                        <button type="button" class="xiugai">添加</button></a>\
                        <a class="a6" href="javascript:;" title="取消"onclick="displayEquipMeta()">\
                        <button type="button" class="shanchu">取消</button></a></td>\
                </tr>';
                
                $("#display_equip_meta").html(html);
            }
        },function(err){
            console.log(err);
        })
    }
}
//设备信息元数据 点击修改出现“input”框 
function alter_EquipMeta(obj){
    var list1=$(obj).parent().find("a:lt(4)");
    $(list1[0]).removeClass("display_none");
    $(list1[1]).addClass("display_none");
    $(list1[2]).removeClass("display_none");
    $(list1[3]).addClass("display_none");
    var list=$(obj).parent().parent().find("td:lt(3)");
    $.each(list,function(i,v){
        if(i == 3){
            $(v).html("<input type='text' value='"+$(v).text()+"' style='border:#eaeaea solid 1px;width:100%;' maxlength='30'/>" );
        }else{
            $(v).html("<input type='text' value='"+$(v).text()+"' style='border:#eaeaea solid 1px;width:100%;' maxlength='15'/>");
        }
    });
}
//确认修改设备信息元数据
function update_EquipMeta(obj,id){
    var list2=$(obj).parent().parent().find("td:lt(3)");
    var brand = $(list2[0]).children("input").val();
    var type = $(list2[1]).children("input").val();
    var model = $(list2[2]).children("input").val();
    var data = {"id":id,"brand":brand,"type":type,"model":model}
   
    postRequest('/update_equip_meta/',{
            "data": JSON.stringify(data)
    },function(data){
        if (data.result==1||data.result=='1'){
            console.log("修改成功");
            // if($("select[name='brand6'] option:selected").val()!=""|| $("select[name='type6'] option:selected").val()!=''|| $("input[name='model6']").val()!=''){
                // chooseinfo_equipment_meta();
            // }else{
                 displayEquipMeta();
            // }
           
        } else if (data.result==2||data.result=='2'){
            myalert('系统提示框','该设备已存在');
        }else{
            myalert('系统提示框','修改失败');
        }
    },function(err){
        console.log(err);
    })
}
//添加设备信息元数据
function add_EquipMeta(){
    var brand = $("#add_brand").val();
    var type = $("#add_type").val();
    var model = $("#add_model").val();
    // console.log(data);
    if (brand ==""||type==""||model==""){
        myalert('系统提示框','数据为空');
    }else{
        data = {"brand":brand,"type":type,"model":model};
        postRequest('/add_equip_meta/',{
            "data": JSON.stringify(data)
        },function(data){
            if(data.result==1||data.result=='1'){
                console.log(data.result);
                // if($("select[name='brand6'] option:selected").val()!=""|| $("select[name='type6'] option:selected").val()!=''|| $("input[name='model6']").val()!=''){
                    // chooseinfo_equipment_meta();
                // }else{
                     displayEquipMeta();
                // }
            } else if (data.result==2||data.result=='2'){
                myalert('系统提示框','该设备已存在');
            }else{
                 myalert('系统提示框','添加失败');
            }
        },function(err){
            console.log(err);
        })
    }
}
//筛选无数据时，的添加按钮
function equipment_meta_save(){
    var brand = $("select[name=brand6] option:selected").val();
    var type = $("select[name=type6] option:selected").val();
    var model = $("input[name=model_write6]").val();
    console.log(brand);
    console.log(type);
    console.log(model);
    if (brand ==""||type==""||model==""){
        myalert('系统提示框','数据为空');
    }else{
        data = {"brand":brand,"type":type,"model":model};
        postRequest('/add_equip_meta/',{
            "data": JSON.stringify(data)
        },function(data){
            if(data.result==1||data.result=='1'){
                // console.log(data.result);
                myalert('系统提示框','添加成功');
            } else if (data.result==2||data.result=='2'){
                myalert('系统提示框','该设备已存在');
            }else{
                 myalert('系统提示框','添加失败');
            }
        },function(err){
            console.log(err);
        })
    }
}
//删除设备信息元数据
function del_EquipMeta(id){
    myconfirm('系统提示框','确定要删除吗？',function(r){
        if(r){
            var data={"id":id};
            console.log(data);
            postRequest('/del_equip_meta/',{
                "data": JSON.stringify(data)
            },function(data){
                if (data.result==1||data.result=='1'){
                    console.log("删除成功")
                    // if($("select[name='brand6'] option:selected").val()!=""|| $("select[name='type6'] option:selected").val()!=''|| $("input[name='model6']").val()!=''){
                        // chooseinfo_equipment_meta();
                    // }else{
                         displayEquipMeta();
                    // }
                }
            },function(err){
                console.log(err);
            })
        }
    });
}
//设备元数据 点击筛选数据出现弹窗
function select_equip_meta(){
    resetchoose_equipment_meta();
    // Filling_brand('6');
    // Filling_type('6');
    // Filling_model('6');
    var oH = $("#shaixuanequipment_meta").find(".popup-Content-box").height();
    
    $("#shaixuanequipment_meta").height(oH);
    $('#shaixuanequipment_meta').siblings('.popup-Box').css('height', 'auto');
    
    $("#shaixuanequipment_meta").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
}

//筛选元数据确认
function chooseinfo_equipment_meta(){
    var brand = $("select[name='brand6'] option:selected").val()||'';
    var type = $("select[name='type6'] option:selected").val()||'';
    var model = $("select[name='model6'] option:selected").val()||'';
    var data = {
        "brand": brand,
        "type":type,
        "model": model
    }
    postRequest('/select_equipment_meta/',{
         "data": JSON.stringify(data)
    },function(data){
        if(data.result==1||data.result=='1'){
            $("#shaixuanequipment_meta").removeClass('showPopup');
            $(".md-overlay").removeClass('showOverlay');
             var html = '';
            $.each(data.data, function (i, v) {
                html += '\
                    <tr>\
                    <td height="30">'+v.brand+'</td>\
                    <td height="30">'+v.type+'</td>\
                    <td height="30">'+v.model+'</td>\
                    <td height="30"><a class="a1 display_none" href="javascript:;" title="确认" onclick="update_EquipMeta(this,\'' + v.id +'\')">\
                        <button type="button" class="xiugai">确认</button></a>\
                        <a class="a2" href="javascript:;" title="修改" onclick="alter_EquipMeta(this)">\
                        <button type="button" class="xiugai">修改</button></a>\
                        <a class="a3 display_none" href="javascript:;" title="取消" onclick="displayEquipMeta()">\
                        <button type="button" class="shanchu">取消</button></a>\
                        <a class="a4" href="javascript:;" title="删除" onclick="del_EquipMeta(\'' + v.id +'\')">\
                        <button type="button" class="shanchu">删除</button></a></td>\
                    </tr>';
            })
            html += '\
            <tr>\
                <td height="30"><input id="add_brand" style="border:#eaeaea solid 1px;width:100%;" maxlength="15"></td>\
                <td height="30"><input id="add_type" style="border:#eaeaea solid 1px;width:100%;" maxlength="15"></td>\
                <td height="30"><input id="add_model"  style="border:#eaeaea solid 1px;width:100%;" maxlength="30"></td>\
                <td height="30"><a class="a5" href="javascript:;" title="添加"onclick="add_EquipMeta()">\
                    <button type="button" class="xiugai">添加</button></a>\
                    <a class="a6" href="javascript:;" title="取消"onclick="displayEquipMeta()">\
                    <button type="button" class="shanchu">取消</button></a></td>\
            </tr>';
            $("#display_equip_meta").html(html);
        }
    },function(err){
        console.log(err);
    });
}
//重置要筛选的元数据
function resetchoose_equipment_meta(){
    $("input[name='model_write6']").val('');
    $("select[name='model6'] option").eq(0).attr('selected', 'selected');
    $("select[name='model6'] option").eq(0).prop('selected', 'selected');
    $("select[name='type6'] option").eq(0).attr('selected', 'selected');
    $("select[name='type6'] option").eq(0).prop('selected', 'selected');
    $("select[name='brand6'] option").eq(0).attr('selected', 'selected');
    $("select[name='brand6'] option").eq(0).prop('selected', 'selected');
    Filling_brand('6');
    Filling_type('6');
    Filling_model('6');
}


//清空人员投入信息弹窗
function empty_cont_personnel_input_pop(){
    $("select[name='projectname9'] option").eq(0).attr('selected', 'selected');
    $("#projectname_write9").attr("value", '');
    $("#projectname_write9").prop("value", '');
    $("select[name='projectname9'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='cont9'] option").eq(0).attr('selected', 'selected');
    $("#cont_write9").attr("value",'');
    $("#cont_write9").prop("value",'');
    $("select[name='cont9'] option").eq(0).siblings().removeAttr('selected');
    $("select[name='dutyname9'] option").eq(0).attr('selected', 'selected');
    $("select[name='dutyname9'] option").eq(0).siblings().removeAttr('selected');
    $('#imp_primary').attr("value", '');
    $('#imp_primary').prop("value", '');
    $('#imp_intermediate').attr("value", '');
    $('#imp_intermediate').prop("value", '');
    $('#imp_senior').attr("value", '');
    $('#imp_senior').prop("value", '');
    $('#imp_senior_plus').attr("value", '');
    $('#imp_senior_plus').prop("value", '');
    $('#imp_other_level').attr("value", '');
    $('#imp_other_level').prop("value", '');
    $('#gua_primary').attr("value", '');
    $('#gua_primary').prop("value", '');
    $('#gua_intermediate').attr("value", '');
    $('#gua_intermediate').prop("value", '');
    $('#gua_senior').attr("value", '');
    $('#gua_senior').prop("value", '');
    $('#gua_senior_plus').attr("value", '');
    $('#gua_senior_plus').prop("value", '');
    $('#gua_other_level').attr("value", '');
    $('#gua_other_level').prop("value", '');
    $('#personnel_input_remake').val('');
    $("input[name='update_personnel_input_name']").val('');
}
//验证输入的数字是0-9999之间可保留一位小数的数字
function checknum0_999(obj){
    // if(String(obj.value).indexOf('.') > -1){ //判断有没有输入小数点

    // }else{
        // //删除当我输入第4位的整数时候进行删除
        // obj.value = obj.value.replace(/[^\d]/g, "");
        // obj.value = obj.value.replace(/(\d{3})\d*$/g, "$1");
        // obj.value = obj.value.replace(/(\d*)\3/g,"$1$2");
    // }
    // obj.value = obj.value.replace(/[^\d.]/g,""); //清除数字和.以外的字符
    // obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字
    // obj.value = obj.value.replace(/\.{2,}/g,"."); //ֻ只保留第一个.
    // obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    // obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3');//之能输入1个小数位
    
    obj.value = obj.value.replace(/[^\d]/g, "");
    obj.value = obj.value.replace(/(\d{4})\d*$/g, "$1");
    obj.value = obj.value.replace(/(\d*)\4/g,"$1$2");
}
//验证输入的数字是-9999到9999之间的整数并小于之前的预估数
function checknum00_999(obj){
    var i = $(obj).parent().prevAll().eq(1).children('input').val()||0;
    //最初预计值
    
    var t = obj.value.charAt(0);
    obj.value = obj.value.replace(/[^\d]/g, "");//把非数字的都替换掉
    obj.value = obj.value.replace(/(\d{4})\d*$/g, "$1");
    obj.value = obj.value.replace(/(\d*)\4/g,"$1$2");
    //如果第一位是负号 
    if (t == '-') {
        // 不能大于前一个框的数值
        if (parseInt(i)<parseInt(obj.value)){
            obj.value = obj.value.slice(0,-1)//去掉最后一位
        }
        //添加负号
        obj.value = '-' + obj.value;
    }
}
//打开新增人员投入弹窗
function add_cont_personnel_input_btn(){
    empty_cont_personnel_input_pop();
    // $("#personnel_input_title").html('新增投入信息');
    // $("#add_personnel_input_confirm").show();
    // $("#update_personnel_input_confirm").hide();
    var oH = $("#add_cont_personnel_input_pop").find(".popup-Content-box").height();
    $("#add_cont_personnel_input_pop").height(oH);
    $("#add_cont_personnel_input_pop").siblings('.popup-Box').css('height', 'auto');
    $("#add_cont_personnel_input_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    //填充合同编号、项目名称、项目负责人下拉框
    Filling_cont_proj_duty('9');
}
//确认添加人员投入信息
function Add_Personnel_Input_Confirm(){
    var cont = $("select[name='cont9'] option:selected").val()||'';
    var projectname = $("select[name='projectname9'] option:selected").val()||'';
    var dutyname = $("select[name='dutyname9'] option:selected").val()||'';
    var imp_primary = $("input[name='imp_primary']").val()||'0';
    var imp_intermediate = $("input[name='imp_intermediate']").val()||'0';
    var imp_senior = $("input[name='imp_senior']").val()||'0';
    var imp_senior_plus = $("input[name='imp_senior_plus']").val()||'0';
    var imp_other_level = $("input[name='imp_other_level']").val()||'0';
    var gua_primary = $("input[name='gua_primary']").val()||'0';
    var gua_intermediate = $("input[name='gua_intermediate']").val()||'0';
    var gua_senior = $("input[name='gua_senior']").val()||'0';
    var gua_senior_plus = $("input[name='gua_senior_plus']").val()||'0';
    var gua_other_level = $("input[name='gua_other_level']").val()||'0';
    var personnel_input_remake = $("textarea[name='personnel_input_remake']").val()||'';
    if ((cont != '') && (imp_primary != '0' || imp_intermediate != '0' || imp_senior != '0' || imp_senior_plus != '0' || imp_other_level !='0')||(gua_primary != '0' || gua_intermediate != '0' || gua_senior != '0' || gua_senior_plus != '0' || gua_other_level !='0')){
        var data = {'cont':cont,'projectname':projectname,'dutyname':dutyname,'imp_primary':imp_primary,'imp_intermediate':imp_intermediate,'imp_senior':imp_senior,'imp_senior_plus':imp_senior_plus,'imp_other_level':imp_other_level,'gua_primary':gua_primary,'gua_intermediate':gua_intermediate,'gua_senior':gua_senior,'gua_senior_plus':gua_senior_plus,'gua_other_level':gua_other_level,'personnel_input_remake':personnel_input_remake};
        postRequest('/add_personnel_input/', {
            "data": JSON.stringify(data)
        }, function (data) {
            if(data.resule == 1 || data.result == '1'){
                cancel_click();//关闭弹窗
                myalert('系统提示框',data.data);
                Display_Personnel_Input();
                // display_news(data);
            } else {
                myalert('系统提示框',data.data);
            }
        }, function (err){
            console.log(err);
        });
    }else{
        myalert('系统提示框',"请补全信息！");
    }
}
//查看所有的人员投入信息
function Display_Personnel_Input(){
    postRequest('/display_personnel_input/', {
            
    }, function (data) {
        if(data.resule == 1 || data.result == '1'){
            // display_news(data);
            var html = '' ;
            if (data.data.length){
                $.each(data.data,function(i,v){
                    html+='<tr>';
                    html += '<td><a href="javascript:;" onclick="update_personnel_input_btn(\'' + encodeURI(JSON.stringify(v)) + '\')">\
                    <button type="button" class="xiugai">修改</button></a>&nbsp;&nbsp;<a href="javascript:;" \
                    onclick="del_personnel_input_btn(\'' + v.id +'\')"><button type="button" class="shanchu">删除</button></a></td>';
                    html += '\
                        <td>'+v.contractno+'</td>\
                        <td style="text-align: left;">'+v.projectname+'</td>\
                        <td>'+v.dutyname+'</td>\
                        <td>'+parseInt(v.imp_primary)+'</td>\
                        <td>'+parseInt(v.imp_primary_add)+'</td>\
                        <td>'+parseInt(v.imp_intermediate)+'</td>\
                        <td>'+parseInt(v.imp_intermediate_add)+'</td>\
                        <td>'+parseInt(v.imp_senior)+'</td>\
                        <td>'+parseInt(v.imp_senior_add)+'</td>\
                        <td>'+parseInt(v.imp_senior_plus)+'</td>\
                        <td>'+parseInt(v.imp_senior_plus_add)+'</td>\
                        <td>'+parseInt(v.imp_other)+'</td>\
                        <td>'+parseInt(v.imp_other_add)+'</td>\
                        <td>'+parseInt(v.gua_primary)+'</td>\
                        <td>'+parseInt(v.gua_primary_add)+'</td>\
                        <td>'+parseInt(v.gua_intermediate)+'</td>\
                        <td>'+parseInt(v.gua_intermediate_add)+'</td>\
                        <td>'+parseInt(v.gua_senior)+'</td>\
                        <td>'+parseInt(v.gua_senior_add)+'</td>\
                        <td>'+parseInt(v.gua_senior_plus)+'</td>\
                        <td>'+parseInt(v.gua_senior_plus_add)+'</td>\
                        <td>'+parseInt(v.gua_other)+'</td>\
                        <td>'+parseInt(v.gua_other_add)+'</td>\
                        <td style="text-align: left;">'+v.remake+'</td>\
                        <td>'+v.update_date.slice(0,10)+'</td>';
                    html += '</tr>';
                });
                $("#show_cont_personnel").html(html);
            } else {
                $("#show_cont_personnel").html('<tr><td colspan="26">暂无数据</td></tr>');
            }
        } else {
            myalert('系统提示框','异常');
        }
    }, function (err){
        console.log(err);
    });
}
//打开人员投入信息修改窗口
function update_personnel_input_btn(str){
    empty_cont_personnel_input_pop();
    $('#imp_primary_add').attr("value", '');
    $('#imp_primary_add').prop("value", '');
    $('#imp_intermediate_add').attr("value", '');
    $('#imp_intermediate_add').prop("value", '');
    $('#imp_senior_add').attr("value", '');
    $('#imp_senior_add').prop("value", '');
    $('#imp_senior_plus_add').attr("value", '');
    $('#imp_senior_plus_add').prop("value", '');
    $('#imp_other_level_add').attr("value", '');
    $('#imp_other_level_add').prop("value", '');
    $('#gua_primary_add').attr("value", '');
    $('#gua_primary_add').prop("value", '');
    $('#gua_intermediate_add').attr("value", '');
    $('#gua_intermediate_add').prop("value", '');
    $('#gua_senior_add').attr("value", '');
    $('#gua_senior_add').prop("value", '');
    $('#gua_senior_plus_add').attr("value", '');
    $('#gua_senior_plus_add').prop("value", '');
    $('#gua_other_level_add').attr("value", '');
    $('#gua_other_level_add').prop("value", '');
    // $("#personnel_input_title").html('修改投入信息');
    // $("#add_personnel_input_confirm").hide();
    // $("#update_personnel_input_confirm").show();
    var oH = $("#update_cont_personnel_input_pop").find(".popup-Content-box").height();
    $("#update_cont_personnel_input_pop").height(oH);
    $("#update_cont_personnel_input_pop").siblings('.popup-Box').css('height', 'auto');
    $("#update_cont_personnel_input_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    // 将字符串数据解码为json对象
    var json_obj = JSON.parse(decodeURI(str));
    // 填充数据
    $("input[name='update_personnel_input_name']").val(json_obj.id);
    $("input[name='cont_update_personnel']").val(json_obj.contractno);
    $("input[name='projectname_update_personnel']").val(json_obj.projectname);
    $("input[name='dutyname_update_personnel']").val(json_obj.dutyname);
    $("input[name='imp_primary1']").val(json_obj.imp_primary);
    $("input[name='imp_primary_add']").val(json_obj.imp_primary_add);
    $("input[name='imp_intermediate1']").val(json_obj.imp_intermediate); 
    $("input[name='imp_intermediate_add']").val(json_obj.imp_intermediate_add); 
    $("input[name='imp_senior1']").val(json_obj.imp_senior);
    $("input[name='imp_senior_add']").val(json_obj.imp_senior_add);
    $("input[name='imp_senior_plus1']").val(json_obj.imp_senior_plus);
    $("input[name='imp_senior_plus_add']").val(json_obj.imp_senior_plus_add);
    $("input[name='imp_other_level1']").val(json_obj.imp_other);
    $("input[name='imp_other_level_add']").val(json_obj.imp_other_add);
    $("input[name='gua_primary1']").val(json_obj.gua_primary);
    $("input[name='gua_primary_add']").val(json_obj.gua_primary_add);
    $("input[name='gua_intermediate1']").val(json_obj.gua_intermediate); 
    $("input[name='gua_intermediate_add']").val(json_obj.gua_intermediate_add); 
    $("input[name='gua_senior1']").val(json_obj.gua_senior);
    $("input[name='gua_senior_add']").val(json_obj.gua_senior_add);
    $("input[name='gua_senior_plus1']").val(json_obj.gua_senior_plus);
    $("input[name='gua_senior_plus_add']").val(json_obj.gua_senior_plus_add);
    $("input[name='ogua_ther_level1']").val(json_obj.gua_other);
    $("input[name='gua_other_level_add']").val(json_obj.gua_other_add);
    $("textarea[name='personnel_input_remake1']").val(json_obj.remake);
    //传递个修改确认，比较是否被修改
    $('#update_personnel_input_confirm').prop('onclick','Update_Personnel_Input_Confirm(\''+str+'\')');
    $('#update_personnel_input_confirm').attr('onclick','Update_Personnel_Input_Confirm(\''+str+'\')');
}
//确认修改人员投入信息
function Update_Personnel_Input_Confirm(str){
    // 将字符串数据解码为json对象
    var json_obj = JSON.parse(decodeURI(str));
    var id = $("input[name='update_personnel_input_name']").val();
    // var cont = $("select[name='cont9'] option:selected").val()||'';
    // var projectname = $("select[name='projectname9'] option:selected").val()||'';
    // var dutyname = $("select[name='dutyname9'] option:selected").val()||'';
    var imp_primary_add = $("input[name='imp_primary_add']").val()||'0';
    var imp_intermediate_add = $("input[name='imp_intermediate_add']").val()||'0';
    var imp_senior_add = $("input[name='imp_senior_add']").val()||'0';
    var imp_senior_plus_add = $("input[name='imp_senior_plus_add']").val()||'0';
    var imp_other_level_add = $("input[name='imp_other_level_add']").val()||'0';
    var gua_primary_add = $("input[name='gua_primary_add']").val()||'0';
    var gua_intermediate_add = $("input[name='gua_intermediate_add']").val()||'0';
    var gua_senior_add = $("input[name='gua_senior_add']").val()||'0';
    var gua_senior_plus_add = $("input[name='gua_senior_plus_add']").val()||'0';
    var gua_other_level_add = $("input[name='gua_other_level_add']").val()||'0';
    var personnel_input_remake = $("textarea[name='personnel_input_remake1']").val()||'';
    if (imp_primary_add != '-' && imp_intermediate_add != '-' && imp_senior_add != '-' &&imp_senior_plus_add != '-' &&imp_other_level_add != '-' &&gua_primary_add != '-' &&gua_intermediate_add != '-' &&gua_senior_add != '-' &&gua_senior_plus_add != '-' &&gua_other_level_add != '-' ){
        if ((imp_primary_add != json_obj.imp_primary_add || imp_intermediate_add != json_obj.imp_intermediate_add || imp_senior_add != json_obj.imp_senior_add || imp_senior_plus_add != json_obj.imp_senior_plus_add || imp_other_level_add !=json_obj.imp_other_add)||(gua_primary_add != json_obj.gua_primary_add || gua_intermediate_add != json_obj.gua_intermediate_add || gua_senior_add != json_obj.gua_senior_add || gua_senior_plus_add != json_obj.gua_senior_plus_add || gua_other_level_add !=json_obj.gua_other_add)||personnel_input_remake !=json_obj.remake ){
            var data = {'id':id,'imp_primary_add':imp_primary_add,'imp_intermediate_add':imp_intermediate_add,'imp_senior_add':imp_senior_add,'imp_senior_plus_add':imp_senior_plus_add,'imp_other_level_add':imp_other_level_add,'gua_primary_add':gua_primary_add,'gua_intermediate_add':gua_intermediate_add,'gua_senior_add':gua_senior_add,'gua_senior_plus_add':gua_senior_plus_add,'gua_other_level_add':gua_other_level_add,'personnel_input_remake':personnel_input_remake};
            postRequest('/update_personnel_input/', {
                "data": JSON.stringify(data)
            }, function (data) {
                if(data.resule == 1 || data.result == '1'){
                    cancel_click();//关闭弹窗
                    myalert('系统提示框',data.data);
                    Display_Personnel_Input();
                } else {
                    myalert('系统提示框',data.data);
                }
            }, function (err){
                console.log(err);
            });
        }else{
            myalert('系统提示框',"没有数据被修改！");
        }
    }else{
        myalert('系统提示框',"有数据框为“-”");
    } 
}
//删除人员投入信息
function del_personnel_input_btn(id){
    // console.log(id);
    myconfirm('系统提示框','确定要删除吗？',function(r){
        if(r){
            var data={"id":id};
            postRequest('/del_personnel_input/',{
                "data": JSON.stringify(data)
            },function(data){
                if (data.result==1||data.result=='1'){
                    // myalert('系统提示框','删除成功');
                    console.log('删除成功');
                    Display_Personnel_Input();
                } else{
                    myalert('系统提示框','删除失败');
                }
            },function(err){
                console.log(err);
            })
        }
    });
}
//打开筛选实施成本预估弹窗
function search_cont_personnel_input_btn(){
    $("#cont10").hide();
    $("#projectname10").hide();
    $("input[name='cont_write10']").val('');
    $("select[name='cont10'] option").eq(0).attr('selected', 'selected');
    $("select[name='cont10'] option").eq(0).prop('selected', 'selected');
    $("input[name='projectname_write10']").val('');
    $("select[name='projectname10'] option").eq(0).attr('selected', 'selected');
    $("select[name='projectname10'] option").eq(0).prop('selected', 'selected');
    $("#cont_personnel_input_pop").addClass('showPopup');
    $(".md-overlay").addClass('showOverlay');
    var oH = $("#cont_personnel_input_pop").find(".popup-Content-box").height();
    $("#cont_personnel_input_pop").height(oH);
    $("#cont_personnel_input_pop").siblings('.popup-Box').css('height', 'auto');
   //填充合同编号和项目名称
   Filling_cont_proj_duty('10');

}
//查询筛选实施成本预估
function chooseinfo_personnel_input(){
    var cont = $("select[name='cont10'] option:selected").val();
    postRequest('/search_personnel_input/',{
        "data": JSON.stringify({'cont':cont})
    },function(data){
        cancel_click();
        if(data.resule == 1 || data.result == '1'){
            // display_news(data);
            var html = '' ;
            if (data.data.length){
                $.each(data.data,function(i,v){
                    html+='<tr>';
                    html += '<td><a href="javascript:;" onclick="update_personnel_input_btn(\'' + encodeURI(JSON.stringify(v)) + '\')">\
                    <button type="button" class="xiugai">修改</button></a>&nbsp;&nbsp;<a href="javascript:;" \
                    onclick="del_personnel_input_btn(\'' + v.id +'\')"><button type="button" class="shanchu">删除</button></a></td>';
                    html += '\
                        <td>'+v.contractno+'</td>\
                        <td style="text-align: left;">'+v.projectname+'</td>\
                        <td>'+v.dutyname+'</td>\
                        <td>'+parseInt(v.imp_primary)+'</td>\
                        <td>'+parseInt(v.imp_primary_add)+'</td>\
                        <td>'+parseInt(v.imp_intermediate)+'</td>\
                        <td>'+parseInt(v.imp_intermediate_add)+'</td>\
                        <td>'+parseInt(v.imp_senior)+'</td>\
                        <td>'+parseInt(v.imp_senior_add)+'</td>\
                        <td>'+parseInt(v.imp_senior_plus)+'</td>\
                        <td>'+parseInt(v.imp_senior_plus_add)+'</td>\
                        <td>'+parseInt(v.imp_other)+'</td>\
                        <td>'+parseInt(v.imp_other_add)+'</td>\
                        <td>'+parseInt(v.gua_primary)+'</td>\
                        <td>'+parseInt(v.gua_primary_add)+'</td>\
                        <td>'+parseInt(v.gua_intermediate)+'</td>\
                        <td>'+parseInt(v.gua_intermediate_add)+'</td>\
                        <td>'+parseInt(v.gua_senior)+'</td>\
                        <td>'+parseInt(v.gua_senior_add)+'</td>\
                        <td>'+parseInt(v.gua_senior_plus)+'</td>\
                        <td>'+parseInt(v.gua_senior_plus_add)+'</td>\
                        <td>'+parseInt(v.gua_other)+'</td>\
                        <td>'+parseInt(v.gua_other_add)+'</td>\
                        <td style="text-align: left;">'+v.remake+'</td>\
                        <td>'+v.update_date.slice(0,10)+'</td>';
                    html += '</tr>';
                });
                $("#show_cont_personnel").html(html);
            } else {
                $("#show_cont_personnel").html('<tr><td colspan="26">暂无数据</td></tr>');
            }
        } else {
            myalert('系统提示框','异常');
        }
    },function(err){
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
                        html1 += '<li class="active" style="dispaly:none" onclick="show_5_active('+i+',2)"><a><span>'+i+'</span></a></li>';
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
                            <td><input type="checkbox" value="'+v.id+'" name="piliang"></td>\
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
                            <td><a href="javascript:;" title="删除" onclick="del_data(\'' + v.id +'\')"><button type="button" style="color:#fff;background:#F0473C;border:solid #F0473C;border-radius:11px;height:20px;width:40px;font-size:7px;">删除</button></a></td>';
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






