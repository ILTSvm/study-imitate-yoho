$(function(){
    var url = "../../../product/GetProductsByPage_post";
    useajax(showgood,url);

    function useajax(callback,url) {
        $.ajax({
            url:url,
            data:{
                "pagesize":150,
                "pageindex":1
            },
            success:function (data) {
                var data1 = JSON.parse(data);
                for(var i =0;i<data1.length;i++){
                    var datajson = JSON.parse(data1[i].Data);
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
            var otr = $('<tr id = "'+data.id+'"><td><div class="pay-pro"><input class="cart-item-check " type="checkbox" name="" id="" checked=""><a class="pay-pro-icon " href="javascript:;"><img src="img/'+data.imgSrc+'"></a><p class="pay-pro-info"><a href="">'+data.name+'<br></a><span>颜色：灰色 尺码：L</span></p></div></td><td><span class="productPrice">'+data.price+'</span></td><td>0个</td><td class="add_num"><span class="minus"></span><input type="text" value="1" readonly="readonly" id = "goodnum"><span class="plus"></span></td><td class="price">'+data.price+'</td><td class="cart-operation"><a href="javascript:;" class="cart-del-btn"><span class="del_btn">删除</span><span class="b"></span></a><a href="javascript:;" class="cart-remove-btn"><span class="a">移入收藏</span><span class="b"></span></a></td></tr>');
            console.log(otr);
            $("#car_warp").append(otr);

        }
        totalprice();
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
        totalprice();
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
        totalprice();
    })
    $("table").on("click",".del_btn",function () {
        var goodid =  $(this).parents("tr").attr("id");
        $(this).parents("tr").remove();
        totalprice();

        $.ajax({
            url:"../../../product/GetProductById_post",
            data:{
                "id":goodid,
            },
            success:function (data) {
                var data1 = JSON.parse(data)
                var datajson = JSON.parse(data1.Data);
                deletedata(datajson);
            },
            error:function () {
              console.log("error");
            },
            datatype:"json",
            type:"post"
        })
    })
    function totalprice(){
        var total = 0;
        var good = document.getElementsByClassName("price");
        console.log(good);
        for(var i=0;i<good.length;i++){
            total += parseInt(good[i].innerHTML);
        }
        $(".sum").html("商品总价（¥"+total+"）- 活动（¥0.00）= 商品金额总计（¥"+total+"）").next().children("strong").html(total);
    }
    function deletedata(a) {
        a.type = "";
        var datajson = a;
        var datajsonstr = JSON.stringify(datajson);
        $.ajax({
            url:"../../../product/CreateUpdateProduct_post",
            data:{
                "id":a.id,
                "datajson":datajsonstr
            },
            success:function (data) {
            },
            error:function () {
                console.log("error");
            },
            datatype:"json",
            type:"post"
        })
    }
})
