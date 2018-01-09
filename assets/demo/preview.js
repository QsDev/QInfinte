function render_preview(n){
	webix.ready(function(){
		webix.ui({
			view:"preview",
			ui:webix.toNode("preview_"+n+"").nextSibling.value
		}, "preview_"+n+"");
	});
}

webix.protoUI({
	name:"preview",
	js2obj:function(ui){
		try {
			webix.exec("webix.temp = "+ui);
			webix.message.hide("preview_error");
			return webix.temp;
		} catch(e){
			webix.message({ type:"error", text:e.toString(), id:"preview_error" });
			return false;
		}
	},
	initUI:function(){
		var ui, text;
		ui = this.config.ui;

		if (typeof ui == "string"){
			text = ui;
			ui = this.js2obj(ui);
		} else {
			text = JSON.stringify(this.config.ui, null, '  ');
		}

		if (ui) webix.ui([ui], this.$$("p"));
		this.$$("w").setValue(text);

		webix.event(this.$$("w").$view, "keydown", webix.bind(this.start_repaint, this));
	},
	start_repaint:function(){
		if (this.timer){
			clearTimeout(this.timer);
			this.timer = false;
		}

		this.timer = setTimeout(webix.bind(this.end_repaint, this), 250);
	},
	end_repaint:function(){
		var ui = this.js2obj( this.$$("w").getValue() );
		if (ui) webix.ui([ui], this.$$("p"));
	},
	$init:function(obj){
		this.$ready.push(this.initUI);
		obj.rows = [
			{ view:"tabbar", height:38, optionWidth:200,
			  options:[
			  	{ id:"p", value:"Live Demo"},
			  	{ id:"w", value:"Edit Code" }
			  ],
			  multiview:true,
			  on:{
					onChange:function(){
						var top = this.getTopParentView();
						if (this.getValue() ==  "p"){
							top.$$("w").hide();
							top.end_repaint();
						} else {
							top.$$("w").show();
							top.$$("w").focus();
						}
					}
			}},
			{ rows:[
				{ id:"w", view:"codemirror-editor", hidden:true, value: "", minHeight:300 },
				{ id:"p", type:"space", rows:[ {} ], height:300 }
			]}
		];
	}
}, webix.IdSpace, webix.ui.layout);
