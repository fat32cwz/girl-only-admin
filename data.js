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
	sessionStorage.pages_now = pages_now;
	var url = "http://server.shaonvonly.com/api/admin/shops/"+sessionStorage.shopId_now+"/orders/full_transfer?transfer_status_full=no";
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