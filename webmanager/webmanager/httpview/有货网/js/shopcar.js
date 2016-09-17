$(function(){
    var url = "../../../product/GetProductsByPage_post"
    useajax(showgood,url);
    function useajax(callback,url) {
        $.ajax({
            url:url,
            data:{
                "pagesize":150,
                "pageindex":1
            },
            success:function (data) {

                var data1 = JSON.parse(data)
                for(var i =0;i<data1.length;i++){
                    var datajson = JSON.parse(data1[i].Data);
                    console.log(datajson);
                    callback(datajson);
                }
            },
            error:function () {
                console.log("wrong");
            },
            datatype:"json",
            type:"post"
        })
    }
    function showgood(data){
        if(data.type=="buy"){
            var otr = $('<tr><td><div class="pay-pro"><input class="cart-item-check " type="checkbox" name="" id="" checked=""><a class="pay-pro-icon " href="javascript:;"><img src="img/'+data.imgSrc+'"></a><p class="pay-pro-info"><a href="">'+data.name+'<br></a><span>颜色：灰色 尺码：L</span></p></div></td><td><span class="productPrice">'+data.price+'</span></td><td>0个</td><td class="add_num"><span class="minus"></span><input type="text" value="1" readonly="readonly" id = "goodnum"><span class="plus"></span></td><td class="price">'+data.price+'</td><td class="cart-operation"><a href="javascript:;" class="cart-del-btn"><span class="del_btn">删除</span><span class="b"></span></a><a href="javascript:;" class="cart-remove-btn"><span class="a">移入收藏</span><span class="b"></span></a></td></tr>');
            console.log(otr);
            $("#car_warp").append(otr);
        }
    }
//    绑定事件
    $("table").on("click",".minus",function(){

        var txt = $(this).next().val();
        if(txt>0){
            txt--;
            $(this).next().val(txt);
        }
        var count = $(this).parent().prev().prev().text();
        $(this).parent().next().text(txt*count);
    })
    $("table").on("click",".plus",function () {

        var txt = $(this).prev().val();
        if(txt<50){
            txt++;
            $(this).prev().val(txt);
        }else{
            alert("限购50件");
        }
        var count = $(this).parent().prev().prev().text();
        $(this).parent().next().text(txt*count);
    })
    $(".sum")
})
