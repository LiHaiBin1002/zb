        var TempArr1 = [];
        let cont_write = document.getElementById('cont_write');
        let cont_write1 = document.getElementById('cont_write1');
        let cont_write3 = document.getElementById('cont_write3');
        let cont_write4 = document.getElementById('cont_write4');
        let cont = document.getElementById('cont');
        let cont1 = document.getElementById('cont1');
        let cont3 = document.getElementById('cont3');
        let cont4 = document.getElementById('cont4');
        cont_write.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            cont.style.display = 'block';
        }
        cont_write1.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            cont1.style.display = 'block';
        }
        cont_write3.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            cont3.style.display = 'block';
        }
        cont_write4.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            cont4.style.display = 'block';
        }
        cont.size = 6;
        cont1.size = 6;
        cont3.size = 6;
        cont4.size = 6;
        cont.onchange = function(e){
            var option = this.options[this.selectedIndex];
            cont_write.value = option.innerHTML;
            cont.style.display = 'none';
        }
        cont1.onchange = function(e){
            var option = this.options[this.selectedIndex];
            cont_write1.value = option.innerHTML;
            cont1.style.display = 'none';
        }
        cont3.onchange = function(e){
            var option = this.options[this.selectedIndex];
            cont_write3.value = option.innerHTML;
            cont3.style.display = 'none';
        }
        cont4.onchange = function(e){
            var option = this.options[this.selectedIndex];
            cont_write4.value = option.innerHTML;
            cont4.style.display = 'none';
        }
        cont_write.oninput = function(e){
            var options  = cont.options;
            console.log(options.length); 
            $(options).each(function(index, el) {
                TempArr1[index] = $(this).text();
            });
            // console.log(TempArr1.length);
            // console.log(TempArr1);
            var select = $(cont);
            select.html("");
            if(TempArr1.length > 0){
                if($("input[name='cont_write']").val()==""){
                    displayProject();
                }
               else{
                    var val = [];
                    for (i = 0; i < TempArr1.length; i++) {
                        if (TempArr1[i].indexOf(cont_write.value) >= 0) {
                            val.push(TempArr1[i]);
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
        cont_write1.oninput = function(e){
            var options  = cont1.options;
            $(options).each(function(index, el) {
                TempArr1[index] = $(this).text();
            });
            var select = $(cont1);
            select.html("");
            if(TempArr1.length > 0){
                if($("input[name='cont_write1']").val()==""){
                    search_archive();
                }
               else{
                    var val = [];
                    for (i = 0; i < TempArr1.length; i++) {
                        if (TempArr1[i].indexOf(cont_write1.value) >= 0) {
                            val.push(TempArr1[i]);
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
        cont_write3.oninput = function(e){
            var options  = cont3.options;
            $(options).each(function(index, el) {
                TempArr1[index] = $(this).text();
            });
            var select = $(cont3);
            select.html("");
            if(TempArr1.length > 0){
                if($("input[name='cont_write3']").val()==""){
                    select_hetong();
                }
               else{
                    var val = [];
                    for (i = 0; i < TempArr1.length; i++) {
                        if (TempArr1[i].indexOf(cont_write3.value) >= 0) {
                            val.push(TempArr1[i]);
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
        cont_write4.oninput = function(e){
            var options  = cont4.options;
            $(options).each(function(index, el) {
                TempArr1[index] = $(this).text();
            });
            var select = $(cont4);
            select.html("");
            if(TempArr1.length > 0){
                if($("input[name='cont_write4']").val()==""){
                    add_archive_btn();
                }
               else{
                    var val = [];
                    for (i = 0; i < TempArr1.length; i++) {
                        if (TempArr1[i].indexOf(cont_write4.value) >= 0) {
                            val.push(TempArr1[i]);
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
       
        
        var TempArr2 = [];
        let projectname_write = document.getElementById('projectname_write');
        let projectname_write1 = document.getElementById('projectname_write1');
        let projectname_write3 = document.getElementById('projectname_write3');
        let projectname_write4 = document.getElementById('projectname_write4');
        let projectname = document.getElementById('projectname');
        let projectname1 = document.getElementById('projectname1');
        let projectname3 = document.getElementById('projectname3');
        let projectname4 = document.getElementById('projectname4');
        projectname_write.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            projectname.style.display = 'block';
        }
        projectname_write1.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            projectname1.style.display = 'block';
        }
        projectname_write3.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            projectname3.style.display = 'block';
        }
        projectname_write4.onclick = function(e){
            var ev = window.event||e;
            ev.stopPropagation();
            projectname4.style.display = 'block';
        }
        projectname.size = 6;
        projectname1.size = 6;
        projectname3.size = 6;
        projectname4.size = 6;
        projectname.onchange = function(e){
            var option = this.options[this.selectedIndex];
            projectname_write.value = option.innerHTML;
            projectname.style.display = 'none';
        }
        projectname1.onchange = function(e){
            var option = this.options[this.selectedIndex];
            projectname_write1.value = option.innerHTML;
            projectname1.style.display = 'none';
        }
        projectname3.onchange = function(e){
            var option = this.options[this.selectedIndex];
            projectname_write3.value = option.innerHTML;
            projectname3.style.display = 'none';
        }
        projectname4.onchange = function(e){
            var option = this.options[this.selectedIndex];
            projectname_write4.value = option.innerHTML;
            projectname4.style.display = 'none';
        }
        projectname_write.oninput = function(e){
            var options  = projectname.options;
            $(options).each(function(index, el) {
                TempArr2[index] = $(this).text();
            });
            var select = $(projectname);
            select.html("");
            if(TempArr2.length > 0){
                if($("input[name='projectname_write']").val()==""){
                    displayProject();
                }
                else{
                    var val = [];
                    for (i = 0; i < TempArr2.length; i++) {
                        if (TempArr2[i].indexOf(projectname_write.value) >= 0) {
                            val.push(TempArr2[i]);
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
        projectname_write1.oninput = function(e){
            var options  = projectname1.options;
            $(options).each(function(index, el) {
                TempArr2[index] = $(this).text();
            });
            var select = $(projectname1);
            select.html("");
            if(TempArr2.length > 0){
                if($("input[name='projectname_write1']").val()==""){
                    search_archive();
                }
                else{
                    var val = [];
                    for (i = 0; i < TempArr2.length; i++) {
                        if (TempArr2[i].indexOf(projectname_write1.value) >= 0) {
                            val.push(TempArr2[i]);
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
        projectname_write3.oninput = function(e){
            var options  = projectname3.options;
            $(options).each(function(index, el) {
                TempArr2[index] = $(this).text();
            });
            var select = $(projectname3);
            select.html("");
            if(TempArr2.length > 0){
                if($("input[name='projectname_write3']").val()==""){
                    select_hetong();
                }
                else{
                    var val = [];
                    for (i = 0; i < TempArr2.length; i++) {
                        if (TempArr2[i].indexOf(projectname_write3.value) >= 0) {
                            val.push(TempArr2[i]);
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
        projectname_write4.oninput = function(e){
            var options  = projectname4.options;
            $(options).each(function(index, el) {
                TempArr2[index] = $(this).text();
            });
            var select = $(projectname4);
            select.html("");
            if(TempArr2.length > 0){
                if($("input[name='projectname_write4']").val()==""){
                    add_archive_btn();
                }
                else{
                    var val = [];
                    for (i = 0; i < TempArr2.length; i++) {
                        if (TempArr2[i].indexOf(projectname_write4.value) >= 0) {
                            val.push(TempArr2[i]);
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
        
document.onclick=function(){
    cont.style.display='none';
    cont1.style.display='none';
    cont3.style.display='none';
    cont4.style.display='none';
    document.getElementById('cont5').style.display='none';
    document.getElementById('cont6').style.display='none';
    projectname.style.display='none';
    projectname1.style.display='none';
    projectname3.style.display='none';
    projectname4.style.display='none';
    document.getElementById('projectname5').style.display='none';
    document.getElementById('projectname6').style.display='none';
}