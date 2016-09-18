/*$(function(){
	alert(1)//  测试 jQuery引入成功
})
*/ 


window.onload = function(){

	function GetRequest() {
		var url = location.search;//获取url中"?"符后的字串
		if (url.indexOf("?") != -1) {//判断是否有参数
			var str = url.substr(1);// 从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = str.split("=");// 用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			if(strs[0]=="key"){
				return strs[1];
			}else{
				return false;
			}
			// 直接弹出第一个参数 （如果有多个参数 还要进行循环的;
		}
	}
	loadPage();
	useajax(loadPage);
	function loadPage(a){
		if(a){
			var key = GetRequest();
			var keyindex = a.name.indexOf(key,0);
			if(keyindex){
			//	加载搜索页面并覆盖当前页面
			}
		}else{
			//加载普通列表页;
			alert(1);
		}
	}
	function useajax(callback) {
			//ajax 获取数据 load
			var pageSizeV=100;
			var pageIndexV=1;
			$.ajax({
				url:"../../../product/GetProductsByPage_post",
				data:{
					"pagesize":pageSizeV,
					"pageindex":pageIndexV
				},
				success:function(data) {
					for(var i = 0;i<data.length;i++){
						var datajson = JSON.parse(data[i].Data);
						console.log(datajson);
						callback(datajson);
					}
				},
				error:function(){
					alert("ajax error");
				},
				dataType:"json",
				type:"post"
			})
		}
		//加载页面信息
		function loadpage(a) {
			$("#pagename").html(a.name);
			$(".img").html('<img src = "img/'+a.imgSrc+'">');
			$(".img_big_b").html('<img src = "img/'+a.imgSrc+'">');
			$(".name").html(a.name);
			$(".price").html(a.price);

		}

	//------------------------------------------
	// 左侧菜单栏点击切换效果
	//console.log($('.sort-container ul').find('.product-list-nav'))
	$('.sort-container ul').find('.product-list-nav').click(function(){
		//alert(1)
		$(this).find('img').toggleClass('active');
		$(this).find('.sort-child-list').toggle(500);
	})


	$('.sort_pager').find('a').click(function(){
		$(this).toggleClass('checked');
	})

	//------------------------分类菜单点击添加功能------


	// 用事件委托 给所有的 a 标签添加点击事件
	$('.section').on('click','.attr',function(){
		var html = $(this).text()
		// alert(html)
		$(this).parents('.section').hide(500)
		var _this=this
		var aTag=$('<a class="tag" href="javascript:;"> '+html+' </a>');
		$('.attrs').append(aTag);

		//添加点击清除事件
		$(aTag).click(function(){
			$(this).remove()
			$(_this).parents('.section').show(50)
		})
	})

	//----------点击清除选中分类功能-------------
	$('.attrs').find('.tag').click(function(){
		$(this).remove()
	})

	$('.clear-checked').click(function(){
		$('.attrs').find('.tag').remove()
	})



}