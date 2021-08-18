//合同编号、项目名称、项目负责人的关联匹配
//str1为选择的select的id、str2为要匹配的select的id、str3为项目负责人的select的id
function Auto_Matching(str1,str2,str3){
    var str1_zimu = str1.match(/^[a-z|A-Z]+/gi);
    var str2_zimu = str2.match(/^[a-z|A-Z]+/gi);
    var str1_shuzi = str1.match(/\d+$/gi);
    var str2_shuzi = str2.match(/\d+$/gi);
    var value = $("select[name='"+str1+"'] option:selected").val();
    if (value != '' && dataset.length > 0) {
        $.each(dataset, function (i, v) {
            if (value == v.contractno) {
                $("#"+str2_zimu+"_write"+str2_shuzi+"").attr("value", v.projectname);
                $("#"+str2_zimu+"_write"+str2_shuzi+"").prop("value", v.projectname);
                $("select[name='"+str2+"'] option").each(function () {
                    $(this).prop('selected', false);
                    $(this).attr('selected', false);
                    if ($(this).val() == v.projectname) {
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        // $("#"+str2_zimu+"_write"+str2_shuzi+"").attr("value",$(this).val());
                        // $("#"+str2_zimu+"_write"+str2_shuzi+"").prop("value",$(this).val());
                    }
                })
                $("select[name='"+str3+"'] option").each(function () {
                    $(this).prop('selected', false);
                    $(this).attr('selected', false);
                    if ($(this).val() == v.dutyname) {
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                    }
                })
            }
            if (value == v.projectname) {
                $("#"+str2_zimu+"_write"+str2_shuzi+"").attr("value", v.contractno);
                $("#"+str2_zimu+"_write"+str2_shuzi+"").prop("value", v.contractno);
                $("select[name='"+str2+"'] option").each(function () {
                    $(this).prop('selected', false);
                    $(this).attr('selected', false);
                    if ($(this).val() == v.contractno) {
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                        // $("#"+str2_zimu+"_write"+str2_shuzi+"").attr("value",$(this).val());
                        // $("#"+str2_zimu+"_write"+str2_shuzi+"").prop("value",$(this).val());
                    }
                })
                $("select[name='"+str3+"'] option").each(function () {
                    $(this).prop('selected', false);
                    $(this).attr('selected', false);
                    if ($(this).val() == v.dutyname) {
                        $(this).prop('selected', 'selected');
                        $(this).attr('selected', 'selected');
                    }
                })
            }
        })
    } else {
        $("select[name='"+str1+"'] option").eq(0).attr('selected', 'selected');
        $("#"+str1_zimu+"_write"+str1_shuzi+"").attr("value", '');
        $("#"+str1_zimu+"_write"+str1_shuzi+"").prop("value", '');
        $("select[name='"+str2+"'] option").eq(0).attr('selected', 'selected');
        $("#"+str2_zimu+"_write"+str2_shuzi+"").attr("value", '');
        $("#"+str2_zimu+"_write"+str2_shuzi+"").prop("value", '');
        $("select[name='"+str1+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+str2+"'] option").eq(0).siblings().removeAttr('selected');
        $("select[name='"+str3+"'] option").eq(0).attr('selected', 'selected');
        $("select[name='"+str3+"'] option").eq(0).siblings().removeAttr('selected');
    }
}