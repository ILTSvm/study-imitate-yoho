/**
 * Created by Administrator on 2016/9/17.
 */
/*------------------------搜索功能-----------------------------*/
$(function () {
    $("#searchBtn").on("click",function () {
        // alert(1);
        var keyword = $("#keyword").val();
        window.location.href = "list.html?key="+keyword;
    })
})
