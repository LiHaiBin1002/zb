//str1:input的id，str2：select的id，str3：要调用的函数
function input_onclick(str2){
    // var ev = window.event||e;
            // ev.stopPropagation();
            // projectname.style.display = 'block';
    let docu2 = document.getElementById(str2);
    var ev = window.event||e;
    ev.stopPropagation();
    docu2.size = 6;
    docu2.style.display = 'block';
}
function select_onchange(str1,str2){
    // var option = this.options[this.selectedIndex];
            // projectname_write.value = option.innerHTML;
            // projectname.style.display = 'none';
    let docu1 = document.getElementById(str1);
    let docu2 = document.getElementById(str2);
    
    var option = docu2.options[docu2.selectedIndex];
    docu1.value = option.innerHTML;
    docu2.style.display = 'none';
}
// var option_len=0;
var TempArr = [];
function input_oninput(str1,str2,str3){
    let docu1 = document.getElementById(str1);
    let docu2 = document.getElementById(str2);
    var options  = docu2.options;
    $(options).each(function(index, el) {
        TempArr[index] = $(this).text();
    });
    var select = $(docu2);
    select.html("");
    if(TempArr.length > 0){
        if($("input[name='"+str1+"']").val()==""){
            str3();
        }else{
            var val = [];
            for (i = 0; i < TempArr.length; i++) {
                if (TempArr[i].indexOf(docu1.value) >= 0) {
                    val.push(TempArr[i]);
                }
            }
            var val1 = unique(val);//去重
            $.each(val1, function (i, v) {
                var option = $("<option></option>").text(v);
                select.append(option)
            });
        }
    }
}