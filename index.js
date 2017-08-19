$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	loadShopList(1);

	batchDeliver();

	batchCancel();

	allSelect();

	//stateCheck();


});

function loadShopList(pages_now) {
	$("tbody").html('');
	sessionStorage.shopslist_pages_now = pages_now;
	var url = "https://server.shaonvonly.com/api/admin/shops";
	$.ajax({
			url: url,
	       	type:"GET",   	
	       	success:function (resp) {
	       		if (resp.message=="success") {
	       			showdata = 12;                                       //每页显示条数
       				data_total = resp.data.length;		                //总数据条数
					pages_total = parseInt(data_total/showdata)+(data_total % showdata == 0 ? 0:1);    //总页数
					startRange = (pages_now-1)*showdata;
					endRange = (pages_now==pages_total?data_total:pages_now*showdata);
					console.log(data_total,pages_total,startRange,endRange);
	       			for (var j = ((pages_now-1)*showdata); j < endRange; j++) {
	       				name = resp.data[j].name;                             //店铺名称
	       				id = resp.data[j].id;                                 //商铺ID
	       				auth_authed = resp.data[j].auth_authed;               
	       				auth_status = (auth_authed=="yes")?"是":"否";         //有无授权
	       				auth_alipay_account = resp.data[j].auth_alipay_account;   //支付宝账号
	       				createOrderRows(name,id,auth_alipay_account,auth_status);                  //生成商店行
	       				createPagination(pages_now,pages_total);           //分页
	       			}
	       		}
	       	}
	});
}

function createOrderRows(a,b,c,d) {
	$("tbody").append('<tr>'+
        '<td><input type="checkbox"></td>'+
        '<td><a href="##" data-num="1" onclick="shop_enter(this)">'+a+'</a></td>'+
        '<td>'+b+'</td>'+
        '<td>'+c+'</td>'+
        '<td>'+d+'</td>'+
    '</tr>');
}


function createPagination(pages_now,pages_total) {                     //新建分页导航
	$(".text-center").html('<ul class="pagination pagination"></ul>');
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
    $(".pagination a[data-page]").click(function(){          //页码跳转
    	target = $(this).attr("data-page");
    	loadShopList(target);
    });

    $(".pagination .prev").click(function () {               //上一页跳转
    	prevPage = sessionStorage.shopslist_pages_now-1;
    	loadShopList(prevPage);
    })

    $(".pagination .next").click(function () {               //下一页跳转
    	nextPage = parseInt(sessionStorage.shopslist_pages_now)+1;      //注意加法会变成字符串拼接！！！！！
    	loadShopList(nextPage);
    })

    $(".jump-btn").click(function () {                     //指定页码跳转
		mytarget = $(".jump-ipt").val();
		if(mytarget){
			loadShopList(mytarget);
    	}	
		
	});

}

function batchDeliver() {                                 //批量授权
	$("#plfh").click(function () {
		var checkedArray = $("td input:checked");
		Array.from(checkedArray);
		for (var i = 0; i < checkedArray.length; i++) {
			id = $(checkedArray[i]).parent().next().next().text();
			name = $(checkedArray[i]).parent().next().text();
			console.log(id);
			$.ajax({
				url: "https://server.shaonvonly.com/api/admin/shops/"+id+"/authentication",
				type:"PATCH",
				success:function (resp) {
					if (resp.message=="success") {
						alert("授权成功！");
						loadShopList(1);
					}
					else{
						alert("授权失败！"+resp.message);
					}
				}


			});
		}


	});
}

function batchCancel() {                                 //批量取消授权
	$("#cancel").click(function () {
		var checkedArray = $("td input:checked");
		Array.from(checkedArray);
		for (var i = 0; i < checkedArray.length; i++) {
			id = $(checkedArray[i]).parent().next().next().text();
			name = $(checkedArray[i]).parent().next().text();
			console.log(id);
			$.ajax({
				url: "https://server.shaonvonly.com/api/admin/shops/"+id+"/authentication_withdrawal",
				type:"PATCH",
				success:function (resp) {
					if (resp.message=="success") {
						alert("取消授权成功！");
						loadShopList(1);
					}
					else{
						alert("取消授权失败！"+resp.message);
					}
				}


			});
		}


	});
}




function allSelect(){
	$("#allSelect label input").change(function () {
		state = $("#allSelect label input").prop("checked");
		if(state==true){
			$("tbody input").prop("checked","checked");
		}
		else if(state==false){
			$("tbody input").prop("checked","");
		}
		
	});
}

function stateCheck() {
	$("td input").change(function () {
		alert("hello");
		var checkedArray = $("td input:checked");
		Array.from(checkedArray);
		for (var i = 0; i < checkedArray.length; i++){
			state = $(checkedArray[i]).parent().next().next().next().text();
			if(state == "否"){
				$("#plfh").addClass("disabled");
				break;
			}
			$("#plfh").removeClass("disabled");
		}
		
	});
	
}

function shop_enter(obj) {
	var shopId = $(obj).parent().next().text();
	var shopName =  $(obj).text();
	sessionStorage.shopId_now = shopId;
	sessionStorage.shopName_now = shopName;
	window.location = "data.html";
	console.log(shopId,shopName);
	//sessionStorage.shopslist_pages_now = pages_now;
}



