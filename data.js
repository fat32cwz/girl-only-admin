$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	loadShopInfo();

	tabChange();	

	showOnsaleGoods(1);


});

function loadShopInfo() {
	$("#shopName").text(sessionStorage.shopName_now);
}

function tabChange() {
	$("#onsale").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showOnsaleGoods(1);
		}
	});

	$("#reserving").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showReservingGoods(1);
		}
	});

	$("#final").bind({
		click:function () {
			$(".nav-tabs li .active").removeClass("active");
			$(this).addClass("active");

			showFinalGoods(1);
		}
	});

}


function showOnsaleGoods(pages_now) {
	$("tbody").html('');
	sessionStorage.pages_now = pages_now;
	var url = "https://server.shaonvonly.com/api/admin/shops/"+sessionStorage.shopId_now+"/orders/full_transfer";
	$.ajax({
		url: url,
       	type:"GET",
       	data:{
       		transfer_status_full:"no"
       	},    	
       	success:function (resp) {
       		if (resp.message=="success") {
       			showdata = 12;                                       //每页显示条数
   				data_total = resp.data.length;		                //总数据条数
				pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
				startRange = (pages_now-1)*showdata;
				endRange = (pages_now==pages_total?data_total:pages_now*showdata);
				console.log(data_total,pages_total,startRange,endRange);
				if($(".active").attr("data-tab")=="1"){
		       		$("tbody").empty();
	       		}
       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
       				order_no = resp.data[j].order_no;               //订单编号
       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间
/*     				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();				//订单生成时间
       				
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);          //交易状态
       				receiver = resp.data[j].address.receiver;		//收货人
       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
       				remark = resp.data[j].remark; 					//备注
					goods_id = resp.data[j].order_goods[0].goods_id;						//商品ID
       				
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);                                 //交易状态
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间*/
       				tab = "1";
       				if($(".active").attr("data-tab")=="1"){
	       				createOrderRows(order_no,goods_name,goods_price,order_goods_count,actual_payment,created_at);    //生成商品卡片
	       				createPagination(pages_now,pages_total,tab);           //分页
       				}
       			}
       		}
       	}
	});
		
}

function showReservingGoods(pages_now) {
	$("tbody").html('');
	sessionStorage.pages_now = pages_now;
	var url = "https://server.shaonvonly.com/api/admin/shops/"+sessionStorage.shopId_now+"/orders/deposit_transfer";
	$.ajax({
		url: url,
       	type:"GET",
       	data:{
       		transfer_status_deposit:"no"
       	},    	
       	success:function (resp) {
       		if (resp.message=="success") {
       			showdata = 12;                                       //每页显示条数
   				data_total = resp.data.length;		                //总数据条数
				pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
				startRange = (pages_now-1)*showdata;
				endRange = (pages_now==pages_total?data_total:pages_now*showdata);
				console.log(data_total,pages_total,startRange,endRange);
				if($(".active").attr("data-tab")=="2"){
		       		$("tbody").empty();
	       		}
       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
       				order_no = resp.data[j].order_no;               //订单编号
       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间
/*     				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();				//订单生成时间
       				
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);          //交易状态
       				receiver = resp.data[j].address.receiver;		//收货人
       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
       				remark = resp.data[j].remark; 					//备注
					goods_id = resp.data[j].order_goods[0].goods_id;						//商品ID
       				
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);                                 //交易状态
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间*/
       				tab = "2";
       				if($(".active").attr("data-tab")=="2"){
	       				createOrderRows(order_no,goods_name,goods_price,order_goods_count,actual_payment,created_at);    //生成商品卡片
	       				createPagination(pages_now,pages_total,tab);           //分页
       				}
       			}
       		}
       	}
	});
		
}

function showFinalGoods(pages_now) {
	$("tbody").html('');
	sessionStorage.pages_now = pages_now;
	var url = "https://server.shaonvonly.com/api/admin/shops/"+sessionStorage.shopId_now+"/orders/remain_transfer";
	$.ajax({
		url: url,
       	type:"GET",
       	data:{
       		transfer_status_remain:"no"
       	},    	
       	success:function (resp) {
       		if (resp.message=="success") {
       			showdata = 12;                                       //每页显示条数
   				data_total = resp.data.length;		                //总数据条数
				pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
				startRange = (pages_now-1)*showdata;
				endRange = (pages_now==pages_total?data_total:pages_now*showdata);
				console.log(data_total,pages_total,startRange,endRange);
				if($(".active").attr("data-tab")=="3"){
		       		$("tbody").empty();
	       		}
       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
       				order_no = resp.data[j].order_no;               //订单编号
       				goods_name = resp.data[j].order_goods[0].goods_name;						//商品名称
       				goods_price = resp.data[j].order_goods[0].goods_price;					//单价
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间
/*     				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();				//订单生成时间
       				
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);          //交易状态
       				receiver = resp.data[j].address.receiver;		//收货人
       				customer_nickname = resp.data[j].customer_nickname;                              //买家昵称
       				remark = resp.data[j].remark; 					//备注
					goods_id = resp.data[j].order_goods[0].goods_id;						//商品ID
       				
       				order_goods_count = resp.data[j].order_goods[0].order_goods_count;      //数量
       				statusNum = resp.data[j].status;										
                    status = statusNumToStatus(statusNum);                                 //交易状态
       				actual_payment = resp.data[j].order_goods[0].actual_payment;			//实收款
       				var date = new Date(resp.data[j].created_at);
       				created_at = date.toLocaleString();					 		          //订单生成时间*/
       				tab = "3";
       				if($(".active").attr("data-tab")=="3"){
	       				createOrderRows(order_no,goods_name,goods_price,order_goods_count,actual_payment,created_at);    //生成商品卡片
	       				createPagination(pages_now,pages_total,tab);           //分页
       				}
       			}
       		}
       	}
	});
		
}



function createOrderRows(a,b,c,d,e,f) {                           //生成订单表格行
	$("tbody").append('<tr>'+
                        '<td>'+a+'</td>'+
                        '<td>'+b+'</td>'+
                        '<td>'+c+'</td>'+
                        '<td>'+d+'</td>'+
                        '<td>'+e+'</td>'+
                        '<td>'+f+'</td>'+
                    '</tr>');
}

function createPagination(pages_now,pages_total,tab) {                     //新建分页导航
	$("#pagination").html('<ul class="pagination pagination"></ul>');
     $(".pagination.pagination").pagination({
     	pageCount: pages_total,
     	current: pages_now,
     	jump:true,
     	coping:true,
     	homePage:'首页',
	    endPage:'末页',
	    prevContent:'上一页',
	    nextContent:'下一页', 
	    isHide:true
     });
    $(".pagination a[data-page]").click(function(){                       //页码跳转
    	target = $(this).attr("data-page");
    	switch(tab){
    		case '1':
    			showOnsaleGoods(target);
    			break;
    		case '2':
    			showReservingGoods(target);
    			break;
    		case '3':
    			showFinalGoods(target);
    			break;
    	}
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.pages_now-1;
    	switch(tab){
			case '1':
    			showOnsaleGoods(target);
    			break;
    		case '2':
    			showReservingGoods(target);
    			break;
    		case '3':
    			showFinalGoods(target);
    			break;
    	}
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	switch(tab){
    		case '1':
    			showOnsaleGoods(target);
    			break;
    		case '2':
    			showReservingGoods(target);
    			break;
    		case '3':
    			showFinalGoods(target);
    			break;
    	}
    })

    $(".jump-btn").click(function () {                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			switch(tab){
	    	case '1':
    			showOnsaleGoods(target);
    			break;
    		case '2':
    			showReservingGoods(target);
    			break;
    		case '3':
    			showFinalGoods(target);
    			break;
	    	}
    	}	
		
	});

}