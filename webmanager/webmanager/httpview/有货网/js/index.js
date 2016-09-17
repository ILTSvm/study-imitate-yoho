/**
 * Created by Administrator on 2016/9/6.
 */
window.onload = function () {


    //小图标轮播
    $('.check_unslider_l').click(function(){
        $(this).parent().siblings().find('.img2').fadeToggle(500).siblings().fadeToggle(500);
    })
    $('.check_unslider_r').click(function(){
        $(this).parent().siblings().find('.img2').fadeToggle(500).siblings().fadeToggle(500);
    })
    //上方轮播功能
    $('.unslider').bind({
        mouseover:function(){
            $(this).children().eq(1).find('a').show();
        },
        mouseout:function(){
            $(this).children().eq(1).find('a').hide();
        }
    })
    var optimization_index = 0;
    // 右侧翻页按钮----------
    $('.optimization-switch').find('a').eq(1).click(function(){
        //alert(1)
        if(optimization_index >= 3){
            optimization_index=1;
            $('.unslider ul').css('left','0').stop().animate({
                left:-1150*optimization_index+'px'
            })
        }else{
            optimization_index++;
            //alert(optimization_index)
            $('.unslider ul').stop().animate({
                left:-1150*optimization_index+'px'
            })
        }
    })
    // 左侧翻页按钮----------
    $('.optimization-switch').find('a').eq(0).click(function(){
        if(optimization_index <= 0){
            optimization_index = 2;
            $('.unslider ul').css('left',-1150*(optimization_index+1)+'px').stop().animate({
                left:-1150*optimization_index+'px'
            })
        }else{
            optimization_index--;
            //alert(optimization_index)
            $('.unslider ul').stop().animate({
                left:-1150*optimization_index+'px'
            })
        }
    })
    setInterval(function(){

    },1000)


    //AJAX获取商品信息
    var pageSizeV = 0;
    var pageIndexV=0;
    var username = GetRequest();
    if(username){
        $("#user").html("<a href = \"javascript:void(0)\">欢迎您，"+username+"</a>");
    }
    function load(){
        pageSizeV = 10;
        pageIndexV+=1;
        //ajax 获取数据 load
        $.ajax({
            url:"../../../product/GetProductsByPage_get",
            data:{
                "pagesize":pageSizeV,
                "pageindex":pageIndexV
            },
            success:function(data) {
                console.log(data);
                for(var i = 0;i<data.length;i++){
                    var dataObj=JSON.parse(data[i].Data);
                    console.log(dataObj);
                    var slist = $("<li id = \""+dataObj.id+"\"></li>");
                    var img=$("<a href = \"javascript:void(0);\"><img src=\"img/"+dataObj.imgSrc+"\"/></a>");
                    // var trOb=$("<tr><td>"+dataObj.name+"</td><td>"+dataObj.price+"</td><td><img src=\""+dataObj.imgsrc+"\"/></td><td><a href='07-manageredit.html?id="+dataObj.id+"'>编辑</a></td></tr>");
                    var name=$("<p>"+dataObj.name+"</p>");
                    var price=$("<p>"+dataObj.price+"</p>");
                    $(slist).append(img,name,price);         // 追加新元素
                    $("#ajaxshop").append(slist);
                }
                stop=true;

            },
            error:function(){
                alert("ajax error");
            },
            //data  array,
            dataType:"json"
        })
    }

    /*-----------意见反馈切换效果-----------*/
    $.each($("#feed-back-page").find("span"),function(index){
        $(this).click(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
            $(".vote").find("li").eq(index).stop().show().siblings().stop().hide()
        })
    })


    function GetRequest() {
        var url = location.search;//获取url中"?"符后的字串
        if (url.indexOf("?") != -1) {//判断是否有参数
            var str = url.substr(1);// 从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
            strs = str.split("=");// 用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
            if(strs[0]=="name"){
                return strs[1];
            }else{
                return false;
            }
            // 直接弹出第一个参数 （如果有多个参数 还要进行循环的;
        }
    }


    //页面滚动加载商品
    var stop=true;
    $(window).scroll(function(){
        var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
        if($(document).height() <= totalheight){
            if(stop==true){
                stop=false;
                load();
            }
        }
    });


/*-----------------------页面跳转传值----------------------------*/
    $("#ajaxshop").on("click","li",function () {
        window.location.href='details.html?id='+this.id;
    })

}





// function appendShopList(data) {
//     var img=$("<img>");
//     for(var i = 0;i<data.length;i++){
//             var dataObj=JSON.parse(data[i].Data);
//             img.src = "img/"+dataObj[i].imgsrc;
//             var name=$("<p></p>").text(dataObj[i].name);   // 以 jQuery 创建新元素
//             var price=$("<p></p>").text(dataObj[i].price);
//             $("#ajaxshop").append(img,name,price);         // 追加新元素
//     }
// }