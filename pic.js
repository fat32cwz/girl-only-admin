$.ajaxSetup({ 
	xhrFields: { 
		withCredentials: true 
	}, 
	crossDomain: true 
});

$(function () {
	initstaupload();


	fileinput1();

	uploadStart();

	dialogClose();
});


function initstaupload() {
    /*初始化模态框和上传控件*/
    var diaoptions = {
        resizable: true,
        modal: false,
        autoOpen: false,
        title: "选择图片",
        title_html: true,
        minWidth: $(window).width()*0.75,
        maxHeight: 500,
        open:function(){
            $(this).closest(".ui-dialog").css('width',$(window).width()*0.75);
            $(this).dialog('option', 'position', 'center');
        }
    };

     var upoptions = {
        language: 'zh', // 设置语言
        uploadUrl: '../../file/uploadQuestionPhotos.do', // 上传的地址
        allowedFileExtensions: ['jpg', 'png', 'JPEG', 'bmp'],// 接收的文件后缀
        allowedFileTypes: ['image'],
        uploadAsync: false, // 默认异步上传
        showUpload: false, // 是否显示上传按钮
        showRemove: true, // 显示移除按钮
        showPreview: true, // 是否显示预览
        showCaption: false,// 是否显示标题
        dropZoneTitle:"最大可加入5张图片,请一次性添加<br>支持拖拽添加<br>",
        browseClass: "btn btn-primary", // 按钮样式
        dropZoneEnabled: true,// 是否显示拖拽区域
        fileActionSettings: {showUpload: false},
        ajaxSettings: {
            async: false
        },
        previewZoomButtonClasses:{
            prev: 'btn btn-white btn-round',
            next: 'btn btn-white btn-round',
            toggleheader: 'btn btn-header-toggle btn-round btn-white',
            fullscreen: 'btn  btn-white btn-round',
            borderless: 'btn btn-white btn-round',
            close: 'btn  btn-white btn-round'
        },
        layoutTemplates: {
            main2: '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n' +
            '<button type="button" tabindex="500" title="确定" class="btn btn-primary no-border input-ok pull-right" id="close1"><i class="glyphicon glyphicon-ok"></i><span class="hidden-xs">&nbsp;确定</span></button>',
            modal: '<div class="modal-dialog modal-lg" role="document">\n' +
            '  <div class="modal-content">\n' +
            '    <div class="modal-header">\n' +
            '      <div class="kv-zoom-actions pull-right">{prev}{next}{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
            '      <h3 class="modal-title">{heading}<small><span class="kv-zoom-title"></span></small></h3>\n' +
            '    </div>\n' +
            '    <div class="modal-body">\n' +
            '      <div class="floating-buttons"></div>\n' +
            '      <div class="kv-zoom-body file-zoom-content"></div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>\n',
            actionEnter: '<button type="button" class="kv-file-zoom {zoomClass}" title="enter">{zoomIcon}</button>'
        },
        maxFileSize: 10240,
        maxFileCount: 5, // 表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount: true,
        overwriteInitial: true,
        autoReplace:false,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
    };

    



     $("#upload-dialog-1-text").dialog(diaoptions);

     $("#upload-photos-1-text").fileinput(upoptions);

     
}

function fileinput1() {
	$("#addPic").click(function () {
		$("#upload-dialog-1-text").dialog("open");
	});

}


function uploadStart(){                      //上传轮播图
	$("#upload").click(function () {
		var files = $('#upload-photos-1-text').fileinput('getFileStack');
		var data = new FormData();
		for (var i = 0; i < files.length; i++) {
            data.append('pic',files[i]);
        }
		url = "http://server.shaonvonly.com/api/admin/promotions";
		$.ajax({
			url: url,
	       	type:"POST",
	       	data:data,
	       	processData: false,  // 不处理数据
    		contentType: false,  // 不设置内容类型
	     	success:function (resp) {
	     		if(resp.message == 'success'){
	     			alert("上传成功！");
	     		}
	     		else{
	     			alert("上传不成功！");
	     		}
	     	}
		});
	});
}

function dialogClose() {                   //模态框关闭和加载图片
    $("#close1").click(function () {
        $("#upload-dialog-1-text").dialog("close");
  //       var file = $("#upload-photos-1-text").fileinput("getFileStack");
  //       var reader = new FileReader();
  //       reader.onload = function(e){
		// 	$("#logo").prop("src",e.target.result);
		// }
		// reader.readAsDataURL(file[0]);
    });
}
