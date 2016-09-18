/**
 * Created by Administrator on 2016/9/13.
 */
$(function () {
    $("#btn").click(function () {
        if($("#btn").val()=="添加"){
            if($("#sid").val()&&$("#sname").val()&&($("#sprice")).val()&&$("#count").val()){
                var sid = $("#sid").val();
                var dataid = {
                    "id":sid
                }
                var url = "../../../product/GetProductById_post";
                useAjax(url,isExist,dataid);//判断所写商品是否存在调用isExist函数
            }else{
                alert("信息填写不完整");
            }
        }
        if($("#btn").val()=="修改"){
            if($("#sid").val()){
                var sid = $("#sid").val();
                var dataid = {
                    "id":sid
                }
                var url = "../../../product/GetProductById_post";
                useAjax(url,isExist,dataid);//判断所写商品是否存在调用isExist函数
            }else{
                alert("请填写需要修改的商品ID");
            }
        }
        if($("#btn").val()=="删除"){
            if($("#deleteid").val()){
                showOrHide("hide","show");
            }else{
                alert("id不能为空");
            }
        }
    })
    //弹出框确认信息
    $("#yes").click(function () {
        showOrHide("show","hide");
        if($("#btn").val()=="添加"){//如果所在网页是添加网页，执行
            var url ="../../../product/CreateUpdateProduct_post";
            var pName= $("#sname").val();
            var pId=$("#sid").val();
            var pPrice=$("#sprice").val();
            var pImgsrc=pId+".jpg";
            var pCount=$("#count").val();
            var pLocate = $("#slocal").val();
            var pdate = $("#sdate").val();
            var datajson = {
                "id":pId,
                "name":pName,
                "price":pPrice,
                "count":pCount,
                "from":pLocate,
                "date":pdate,
                "imgSrc":pImgsrc
            }
            var dataJsonStr=JSON.stringify(datajson);
            var data={
                "id":pId,
                "datajson":dataJsonStr
            }
            var al = "添加";
            useAjax(url,isSuccess,data,al);
        }else if($("#btn").val()=="修改"){//如果所在网页是修改,执行
            var sid = $("#sid").val();
            var dataid = {
                "id":sid
            }
            var url = "../../../product/GetProductById_post";
            useAjax(url,shopChange,dataid);//判断所写商品是否存在调用isExist函数
        }else if($("#btn").val()=="删除"){
            var sid = $("#deleteid").val();
            var url ="../../../product/DeleteProductById_post";
            var data = {
                id:sid,
            }
            var al = "删除";
            useAjax(url,isSuccess,data,al);
        }
    })
    $("#no").click(function () {
        showOrHide("show","hide");
    })
    function showOrHide(a,b){//显示或者隐藏提示信息
        $(".tit").removeClass(a);
        $(".tit").addClass(b);
        $(".warning").removeClass(a);
        $(".warning").addClass(b);
    }
    function useAjax(url,callback,dataJson,al){
        $.ajax({
            url:url,
            data:dataJson,
            success:function(data) {
                console.log(data);
                callback(data,al);
            },
            error:function(){
                alert("ajax error");
            },
            //data  array,
            dataType:"json",
            type:"post"
        })
    }
    function isSuccess(a,al){//判断操作是否成功
        if(a==1){
            console.log(a);
            alert(al+"成功");
            window.location.href="welcome.html";
        }else{
            alert(al+"失败,请确认");
        }
    }
    function isExist(a){//判断商品是否存在
        if(a){
            if($("#btn").val()=="修改"){
                showOrHide("hide","show");
            }else if($("#btn").val()=="添加"){//如果已经存在，则不能添加
                alert("商品已存在");
            }

        }else{
            if($("#btn").val()=="修改"){//如果不存在，则不能修改
                alert("商品不存在");
            }else if($("#btn").val()=="添加"){
                showOrHide("hide","show");
            }
        }

    }
    function shopChange(a){
        var url ="../../../product/CreateUpdateProduct_post";
        var sid = $("#sid").val();
        a.id=sid;
        var slist = JSON.parse(a.Data);
        if($("#sname").val()){
            slist.name=$("#sname").val();
        }
        if($("#sprice").val()){
            slist.price=$("#sprice").val();
        }
        if($("#count").val()){
            slist.count=$("#count").val();
        }
        if($("#sdate").val()){
            slist.date = $("#sdate").val();
        }
        if($("#slocal").val()){
            slist.from = $("#slocal").val();
        }
        slist.imgSrc=$("#sid").val()+".jpg";


        var dataJsonStr=JSON.stringify(slist);
        var data={
            "id":sid,
            "datajson":dataJsonStr
        }
        var al = "修改";
        useAjax(url,isSuccess,data,al);
    }

})