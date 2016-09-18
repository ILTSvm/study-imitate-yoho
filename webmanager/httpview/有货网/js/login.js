/**
 * Created by Administrator on 2016/9/8.
 */
window.onload= function(){
    $("#btn").click(function(){

        var username = $("#loginname").val();
        var password = $("#loginpw").val();
        var data = {
            "name":username,
            "password":password
        }
        var url = "../../../user/login";
        userajax(isSuccess,url,data);

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
    /*----------------判断登录是否成功----------------*/
    function isSuccess(a){
        var username = $("#loginname").val();
        if(a==1){
            alert("登录成功");
            window.location.href = "index.html?name="+username;//地址栏传值
        }else{
            alert("账号或密码错误");
        }
    }
}
