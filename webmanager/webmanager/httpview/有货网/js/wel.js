/**
 * Created by Administrator on 2016/9/11.
 */
window.onload = function () {
    var ps = 10;
    var pi = 1;
    var index = 1;
    // createBox();
    var tp = 1;
    for(var page=0;page<10;page++){
        ajax(ps,pi,createTable);
        pi+=1;
    }
    //AJAX加载数据
    function createBox(){
        var otable = $('<table id = "tab'+tp+'"> <tr> <th><input type = "checkbox" name = "all" id="all">全选</th> <th>商品名称</th> <th>上市日期</th> <th>商品产地</th> <th>价格</th> <th>是否有库存</th> <th>库存量</th> <th>下载商品</th> </tr> </table>')
        $("#table-before").after(otable);
        if(tp==1){
            $("#tab"+tp).addClass("show");
        }else{
            $("#tab"+tp).addClass("hide");
        }
        tp++;
        return otable;
    }
    function createTable(datastr,box){
        var data = JSON.parse(datastr);
        var otr = $("<tr></tr>");
        var ochoose = $("<td><input type = \"checkbox\" name = \"choose\"></td>");
        var oname = $("<td>"+data.name+"</td>");
        var odate = $("<td>"+data.date+"</td>");
        var oform = $("<td>"+data.from+"</td>");
        var oprice = $("<td>"+data.price+"</td>");
        var download = $("<td><a href = \"javascript:void(0)\"><img src = \"img/xz.png\"></a></td>")
        if(data.count !=0){
            var okucun = $("<td><img src = \"img/device-1.png\"></td>");
        }else{
            var okucun = $("<td><img src = \"img/device-2.png\"></td>");
        }
        var count = $("<td>"+data.count+"</td>");
        otr.append(ochoose,oname,odate,oform,oprice,okucun,count,download);
        box.append(otr);
    }
    $("#firstpage").click(function () {
        $("#tab"+index).addClass("hide");
        $("#tab"+index).removeClass("show");
        index=1;
        $("#tab"+index).addClass("show");
        $("#tab"+index).removeClass("hide");
    })
    $("#lastpage").click(function () {
        $("#tab"+index).addClass("hide");
        $("#tab"+index).removeClass("show");
        index=10;
        $("#tab"+index).addClass("show");
        $("#tab"+index).removeClass("hide");
    })
    $("#nextpage").click(function() {
        if(index<10){
            index+=1;
        }
        $("#tab"+index).addClass("show");
        $("#tab"+index).removeClass("hide");
        $("#tab"+(index-1)).addClass("hide");
        $("#tab"+(index-1)).removeClass("show");
    })
    $("#prepage").click(function() {
        if(index>1){
            index-=1;
        }
        $("#tab"+index).addClass("show");
        $("#tab"+index).removeClass("hide");
        $("#tab"+(index+1)).addClass("hide");
        $("#tab"+(index+1)).removeClass("show");
    })

    function ajax(PS,PI,callback){
        var pageSizeV = PS;
        var pageIndexV = PI;
        //ajax 获取数据 load
        $.ajax({
            url:"../../../product/GetProductsByPage_get",
            data:{
                "pagesize":pageSizeV,
                "pageindex":pageIndexV
            },
            success:function(data) {
                var box = createBox(pi);
                // console.log(data);
                for(var i = 0;i<data.length;i++){
                    callback(data[i].Data,box);
                }

            },
            error:function(){
                console.log("请检查Ajax路径");
            },
            //data  array,
            dataType:"json"
        })
    }








    $("table").on("click","input:checkbox",function () {
        if(this.checked){
            $(this).attr("checked", true);
        }else{
            $(this).attr("checked", false);
        }
    })
    $("#sub").click(function () {
        $("input:checkbox[checked]").parents("tr").remove();
    })
        
    $("#all").click(function() {
        $('input[name="choose"]').attr("checked",this.checked);
    });
    var $subBox = $("input[name='choose']");
    $subBox.click(function(){
        $("#all").attr("checked",$subBox.length == $("input[name='choose']:checked").length ? true : false);
    });
}