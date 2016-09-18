/**
 * Created by Administrator on 2016/9/8.
 */
window.onload= function(){
    var isright = false;
    $("#regname").blur(function(){
        var username = $("#regname").val();
       var reg =/^[a-z0-9_-]{3,16}$/;
       var istrue = reg.test(username);
       if(!istrue){
           // alert("用户名不合法");
           $("#username-tit").html("● 用户名不合法").removeClass().addClass("red");
           isright = false;
       }else{
           var url = "../../../user/CheckUserName"
           var data = {
               "username" :username,
           }
           var isExist = userajax(isUserEisxt,url,data);
           if(!isExist){
               $("#username-tit").html("● 用户名可用").removeClass().addClass("green");
               isright = true;
           }
       }
    })
    $("#regpw").blur(function () {
        var pw = $("#regpw").val()
        if(pw.length<6){
            // alert("密码长度至少6位");
            $("#password-tit").html("● 密码长度6位以上").removeClass().addClass("red");
            isright = false;
        }else{
            $("#password-tit").html("● 密码可用").removeClass().addClass("green");
            isright = true;
        }
    })
    $("#regpwconfirm").blur(function () {
        var password = $("#regpw").val();
        var password1 = $("#regpwconfirm").val();
        if(password==password1){
            $("#passwordfirm-tit").html("").removeClass();
            isright = true;
        }else{
            isright = false;
            $("#passwordfirm-tit").html("● 两次密码不一致").removeClass().addClass("red");
            // alert("两次密码不一致");
        }
    })
    //验证码
    function set_captcha(){
        var captcha_num=Math.floor(Math.random()*9999)
        if(captcha_num<1000){
            captcha_num+=1000
        }
        $('.captcha_yanz').html(captcha_num)
    }
    set_captcha();
    $('.captcha_yanz,.change_captcha_y').click(function(){
        set_captcha();
    })

    $('.captcha').bind({
        focus:function(){
            $(this).nextAll('.yanzn').hide()
        },
        keyup:function(){
            if($(this).val() == ''){
                $(this).addClass('input_err')
                $(this).nextAll('.yanzn').find('span').html('请输入验证码').end().show()
            }else{
                if($(this).val()!=$('.captcha_yanz').html()){
                    $(this).addClass('input_err')
                    $(this).nextAll('.yanzn').find('span').html('验证码不正确').end().show()
                    arr[1]=0;
                }else{
                    $(this).removeClass('input_err')
                    $(this).nextAll('.yanzn').hide()
                    arr[1]=1;
                }
            }
        }
    })
    $("#btn").click(function(){
        if(isright) {
            var username = $("#regname").val();
            var password = $("#regpw").val();
            var url = "../../../user/register";
            var data = {
                "name":username,
                "password":password,
            }
            userajax(isSuccess,url,data);

        }else{
            alert("请输入正确的信息");
        }
    });
    function userajax(callback,url,datajson){
        $.ajax({
            url:url,
            data:datajson,
            success:function(data){
                callback(data);
            },
            error:function(){
                alert("ajax error");
            },
            dataType:"json",
            type:"post"
        })
    }
    function isUserEisxt(a){
        if(a==1){
            $("#username-tit").html("● 用户名已存在").removeClass().addClass("red");
            return false;
        }else{

            return true;
        }
    }
    function isSuccess(a){
        if(a==1){
            alert("注册成功");
            location.href = "login.html";
        }else{
            alert("注册失败，请核对信息");
        }
    }
}
