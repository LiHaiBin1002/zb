$(function(){

    $("#login").validate({
        rules: {
            password: {
                required: true
            }
        },
        submitHandler: function () {
            //验证通过后 的js代码写在这里
            login();
        }
    });

})

function  login(){
    // var username = $("select[name='username'] option:selected").val();
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    var data = { 'username': username, 'password': password }
    if(username == '' || password == ''){
        myalert('系统提示框','不能为空');
        return false;
    } else{
        //console.log(data);
        top.postRequest('/login/',{
            "data": JSON.stringify(data)
        }, function(data){
            // console.log(data);
            if(data.result == '1' || data.result == 1){
                if(data.data == '1'){
                    window.location.href = '/static/admin.html';
                } else if(data.data == '2'){
                    window.location.href = '/static/info.html';
                } else{
                    window.location.href = '/static/user.html';
                }
                $.cookie("username", username, { path:'/' });
            } else if(data.result == '-2' || data.result == -2){
                myalert('系统提示框',data.data);
            } else{
                myalert('系统提示框',data.data);
            }
        },function(err){
            console.log(err);
        })
    }
}

//配置通用的默认提示语
$.extend($.validator.messages, {
    required: '不能为空'
});