$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});


$(function () {
	$("#submit").click(function () {
		username = $("#username").val();
		password_hash = $.md5($("#password").val()).toUpperCase();
		$.ajax({
            url: "https://server.shaonvonly.com/api/admin/login",
            type:"POST",
            data:{
		         username : username,
		         password_hash: password_hash,
		    	},
		    success:function (resp) {
		    	if(resp.message=="success"){
		    		window.location = "enter.html";
		    	}
		    	else{
		    		alert(resp.message);
		    	}
		    }
		});
	});
});