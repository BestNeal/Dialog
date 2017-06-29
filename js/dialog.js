;(function($){
	var Dialog = function(config){
		var _this_ = this;
		
		//默认参数配置
		this.config = {
			width:"auto",//对话框的宽
			height:"auto",//对话框的高
			message:null,//对话框提示信息
			type:"loading",//对话框的类型
			buttons:null,//按钮配置
			delay:null,//弹出框延迟关闭
			maskOpacity:null,//对话框遮罩层透明度
			dialogOpacity:null,//对话框透明度
			effect:null,//是否启用动画
			callback:null,
		};
//		//默认参数扩展
	//	console.log(this.config);		
		if(config && $.isPlainObject(config)){
			$.extend(this.config,config);
		}else{
			this.isConfig = true;
		}
		//console.log(this.config);
		
	//创建DOM
	this.body = $('body');
	
	this.mask = $('<div class="g-dialog-container">');
	this.win = $('<div class="dialog-window">');
	this.winHeader = $('<div class="dialog-header"></div>');
	this.winContent = $('<div class="dialog-content">');
	this.winFooter = $('<div class="dialog-footer">');
	
	//渲染Dom;
	this.creat();	
	}	
	//记录弹框层级
	Dialog.zIndex = 10000;
	Dialog.prototype = {
		//创建弹出框
		creat:function(){
			var _this_ = this,
				config = this.config,
				mask = this.mask,
				win = this.win,
				header = this.winHeader,
				content = this.winContent,
				footer = this.winFooter,
				body = this.body;
				
				//增加弹框的层级
				Dialog.zIndex++;
				this.mask.css("z-index",Dialog.zIndex);
				
			//如果没有传递任何配置参数,默认为加载中的弹框
			if(this.isConfig){
				win.append(header.addClass('loading'));
				if(config.effect){
					this.animate();
				}
				mask.append(win);
				body.append(mask);
			}else{
				//根据配置参数创建相应的参数;
				header.addClass(config.type);
				win.append(header);
				//信息文本
				if(config.message){
					content.text(config.message);
					win.append(content);
				}
				//按钮组
				if(config.buttons){
					this.creatButtons(footer,config.buttons);
					win.append(footer);
				}
				//插入到页面
				mask.append(win);
				body.append(mask);
				
				//对话框的宽和高
				if(config.width != "auto"){
					win.width(config.width);
				}
				if(config.height != "auto"){
					win.height(config.height);
				}
				//对话框遮罩层的透明度
				if(config.maskOpacity){
					mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")");
				}
				//对话框透明度
				if(config.dialogOpacity){
					win.css("backgroundColor","rgba(0,0,0,"+config.dialogOpacity+")");
				}
				//弹出层延迟关闭时间
				if(config.delay && config.delay != 0){
					window.setTimeout(function(){
						_this_.close();
					},config.delay);
				}
				//动画
				if(config.effect){
					this.animate();
				}
				//默认加载框的回调函数
				if(config.callback){
					window.setTimeout(function(){
						config.callback();
					},config.delay)
				}else if(!config.callback){
						config.callback == null;			
				}
				
				
			}
		},
		//关闭
		close:function(){
			this.mask.remove();
		},
		//创建按钮参数
		creatButtons:function(footer,buttons){
		//	console.log(buttons);
			var _this_ = this;
			
			$(buttons).each(function(i){
				/*{
					type:"cancel",
					text:"取消",
					callback:function(){
						
					}
				}*/
				//获取按钮样式、回调、以及文本
				var type = this.type?" class='"+this.type+"'":"";
				var btnText = this.text?this.text:"按钮"+(++i);
				var callback = this.callback?this.callback:null;
				var button = $("<button"+type+">"+this.text+"</button>");
				if(callback){
					button.tap(function(e){
						var isClose = callback();
						e.stopPropagation();//阻止事件冒泡
						if(isClose != false){
							_this_.close();
						}
						
					});
				}else{
					button.tap(function(e){
						e.stopPropagation();
						_this_.close();
					});
				}
				footer.append(button);
			})
		},
		//动画
		animate:function(){
			var _this_ = this;
			this.win.css("-webkit-transform","scale(0,0)");
			this.win.css("transform","scale(0,0)");
			this.win.css("-moz-transform","scale(0,0)");
			this.win.css("-ms-transform","scale(0,0)");
			
			window.setTimeout(function(){
				_this_.win.css("-webkit-transform","scale(1,1)");
				_this_.win.css("transform","scale(1,1)");
				_this_.win.css("-moz-transform","scale(1,1)");
				_this_.win.css("-ms-transform","scale(1,1)");
			},600);
		}
	};
	window.Dialog = Dialog;
	$.dialog = function(config){
		return new Dialog(config);
	}
})(jQuery);
