window.onload = function(){
	/*-----------------接入所传值------------------------*/
	function GetRequest() {
		var url = location.search;//获取url中"?"符后的字串
		if (url.indexOf("?") != -1) {//判断是否有参数
			var str = url.substr(1);// 从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
			strs = str.split("=");// 用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
			if(strs[0]=="id"){
				return strs[1];
			}else{
				return false;
			}
			// 直接弹出第一个参数 （如果有多个参数 还要进行循环的;
		}
	}
	var id = GetRequest;
	useajax(id,loadpage);
	//--------------------动态加载页面-----------------------------
	function useajax(a,callback) {
		//ajax 获取数据 load
		$.ajax({
			url:"../../../product/GetProductById_post",
			data:{
				"id":a,
			},
			success:function(data) {
				console.log(data);
				var datajson = JSON.parse(data.Data);
				console.log(datajson);
				callback(datajson);
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
		$(".img").html('<img src = "img/'+a.imgSrc+'">').children().css({"width":"420px","height":"560px"}).attr("id",a.id);
		$(".img_big_b").html('<img src = "img/'+a.imgSrc+'">');
		$(".name").html(a.name);
		$(".price").html(a.price);

	}
	// -------------------------------放大镜------------
	$('.mark_img').bind({
		mouseover:function(){
			$(this).prev().show()
			$(this).next().show().find('.img_big_b').html($('.img').html()).children().css({"width":"1260px","height":"1680px"})
			// $(this).next().show().find('.img_big').html($('.img').html())

		},
		mouseout:function(){
			$(this).prev().hide()
			$(this).next().hide()
		}
	})
	$(document).mousemove(function(evt){
		// console.log($('.img_small').offset().left)
		// console.log($('.img_small').offsetX)
		//console.log(evt.offsetX +"/"+evt.offsetY)// 鼠标相对坐标获取成功
		var oBx = $('.img').width();	
		var oBy = $('.img').height();  //需要放大的图片的宽高
		var oPx = $('.img_small').width();
		var oPy = $('.img_small').height();  //镜头的宽高
 		var left = evt.offsetX-oPx/2;
		var top = evt.offsetY-oPy/2;	//left  top 值
		// 边界检测
		if(left < 0){   
			left = 0
		}else if(left > oBx - oPx){
			left = oBx - oPx;
		}
		if(top < 0){
			top = 0;
		}else if(top > oBy - oPy){
			top = oBy - oPy;
		}
		$('.img_small').css({
			'left':left+'px',
			'top':top+'px'
		})
		// 放大的图片的 left值相对的比例
		var ptX = left/(oBx - oPx);
		var ptY = top/(oBy - oPy);
		$('.img_big_b').css({
			'left': -ptX*($('.img_big_b').width()-$('.img').width())+'px',
			'top': -ptY*($('.img_big_b').height()-$('.img').height())+'px'
		});
	})

	// 选尺寸 ---------------------------------------
	$('.sizer').find('li').click(function(){
		// 点击添加类 
		$(this).addClass('focus').siblings().removeClass('focus')
		// 同时清除右边提示
		$(this).parent().find('.size-warn').hide()
	})
	// 选数量 --------------------------------------

	var good_num = 1;//定义变量
	$('.minus-plus').find('a').eq(0).click(function(){
		// console.log($('.sizer').find('li').is('.focus'))
		if($('.sizer').find('li').is('.focus')){   //判断是否选中了尺寸 
			good_num++;
			$(this).parent().prev().html(good_num)
		}else{										//如果没有 则提示
			$('.size-warn').show()
		}
		
	})
	$('.minus-plus').find('a').eq(1).click(function(){
		if(good_num<=1){
			return false
		}else{
			good_num--;
			$(this).parent().prev().html(good_num)
		}
	})

	 // --------------------------------购物车添加功能-------------------------------------
	$('#addcart').click(function(){
		// alert(1)
		// 判断尺寸是否选中
		if($('.sizer').find('li').is('.focus')){
			var id=$('.img').children('img').attr('id') //获取id
			var size = $('.sizer').find('.focus').attr('id')  //获取型号
			var num=$('#num').html(); //获取数量
			//alert(id+'/'+size+'/'+num)  //成功获取
			$(".row").hide();
			$(".share").hide();
			$(".balance").show();
			useajax(id,addgood);
		}else{
			$('.size-warn').show()
			return false;
		}
	})
	function addgood(a){
	    var num = $(".goods-num-tip").text();
        num++;
        $(".goods-num-tip").text(num);
		a.type = "buy";
        var b = JSON.stringify(a);
        $.ajax({
            url:"../../../product/CreateUpdateProduct_post",
            data:{
                "id":a.id,
                "datajson":b,
            },
            success:function (data) {
                console.log(data);
            },
            error:function () {
                console.log("加载错误");
            },
            datatype:"json",
            type:"post"
        })
	}


	//  点击继续浏览 切换功能
	$('.keep-shopping').click(function(){
		$('.row').show();
		$('.balance').hide();
		$('.share').show();
	})

	//详情-商品信息和洗涤切换
	$.each($('.block-title').find('.title'),function(index){
		$(this).click(function(){
			// alert(index) //测试成功
			$(this).addClass('cur').siblings().removeClass('cur')
			$('.description').find('div').eq(index).stop().slideDown(500).siblings('div').stop().slideUp(500);
		})
	})


	//售后服务点击显示特效
	$('.after-service-switch').click(function(){
		$(this).find('span').toggleClass('show');
		$(this).next().stop().slideToggle(400);
	})


}