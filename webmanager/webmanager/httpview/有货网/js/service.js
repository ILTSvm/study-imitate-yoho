/**
 * Created by Administrator on 2016/9/10.
 */
window.onload = function () {
    $("#leftnav").on("click","dl",function () {
        console.log($(this));
        if($(this).children("dd").css("display")=="none"){

            $(this).children("dd").slideDown( "slow", function() {
                this.isdown=true;
                console.log(this.isdown);


            });
        }else{
            $(this).children("dd").slideUp( "slow", function() {
                this.isdown=false;
            });
        }

    })
    var isNone = false;
    $("#center-a").click(function () {
        if(!isNone){
            $("#leftnav").css("display","none");
            isNone=true;
        }else{
            $("#leftnav").css("display","block");
            isNone = false;
        }

    })
}