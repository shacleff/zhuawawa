require=function t(e,i,o){function a(c,s){if(!i[c]){if(!e[c]){var u="function"==typeof require&&require;if(!s&&u)return u(c,!0);if(n)return n(c,!0);var h=new Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h}var r=i[c]={exports:{}};e[c][0].call(r.exports,function(t){var i=e[c][1][t];return a(i||t)},r,r.exports,t,e,i,o)}return i[c].exports}for(var n="function"==typeof require&&require,c=0;c<o.length;c++)a(o[c]);return a}({game:[function(t,e,i){"use strict";cc._RF.push(e,"75d52VzxixEZbClr5yh2/2S","game"),cc.Class({extends:cc.Component,properties:{audio_click:{url:cc.AudioClip,default:null},audio_readygo:{url:cc.AudioClip,default:null},zhua_line:{type:cc.Sprite,default:null},zhuazi:{type:cc.Sprite,default:null},zhua_top:{type:cc.Sprite,default:null},zhuanchang_name:{type:cc.Label,default:null},cost_num:{type:cc.Label,default:null},coin_num:{type:cc.Label,default:null},wawa_prefab:{type:cc.Prefab,default:null},result_prefab:{type:cc.Prefab,default:null},prize:{type:cc.Node,default:null},xiazhua_btn:cc.Button,shake_zhuazi_seq:null,shake_zhualine_seq:null,shake_zhuatop_seq:null,shake_wawa_seq:null,orign_zhuazi_pos:null,orign_zhualine_pos:null,orign_zhuatop_pos:null,prize_list_layout_pos:null,orign_zhualine_scale_y:0,prize_bar:{type:cc.Sprite,default:null},prize_list_layout:{type:cc.Layout,default:null},lottery_data:null,zhua_click:0},shake:function(){this.shake_zhuazi_seq=cc.repeatForever(cc.sequence(cc.moveBy(1,-100,0),cc.moveBy(1,100,0),cc.moveBy(1,100,0),cc.moveBy(1,-100,0))),this.shake_zhualine_seq=cc.repeatForever(cc.sequence(cc.moveBy(1,-100,0),cc.moveBy(1,100,0),cc.moveBy(1,100,0),cc.moveBy(1,-100,0))),this.shake_zhuatop_seq=cc.repeatForever(cc.sequence(cc.moveBy(1,-100,0),cc.moveBy(1,100,0),cc.moveBy(1,100,0),cc.moveBy(1,-100,0))),this.zhuazi.node.runAction(this.shake_zhuazi_seq),this.zhua_top.node.runAction(this.shake_zhuatop_seq),this.zhua_line.node.runAction(this.shake_zhualine_seq),this.prize_list_layout.node.setCascadeOpacityEnabled(!1),this.prize_list_layout.node.opacity=0;var t=this.prize_list_layout.node.width;console.log(t),this.shake_wawa_seq=cc.repeatForever(cc.sequence(cc.moveBy(2,-t/3,0),cc.moveBy(2,t/3,0),cc.moveBy(2,t/3,0),cc.moveBy(2,-t/3,0))),this.prize_list_layout.node.runAction(this.shake_wawa_seq)},onLoad:function(){this.orign_zhuazi_pos=this.zhuazi.node.position,this.orign_zhuatop_pos=this.zhua_top.node.position,this.orign_zhualine_pos=this.zhua_line.node.position,this.prize_list_layout_pos=this.prize_list_layout.node.position,this.orign_zhualine_height=this.zhua_line.node.height,this.initData()},sendHttpReq:function(t,e,i){var o=this,a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState&&a.status>=200&&a.status<400){var t=a.responseText;i(JSON.parse(t),t,o)}},a.open("POST",t,!0),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");var n=[];for(var c in e)n.push(c+"="+e[c]);var s=n.join("&");a.send(s)},getLotteryId:function(){var t=window.location.href,e=t.indexOf("id/"),i=t.indexOf(".html");return t.substr(e+3,i-e-3)},initData:function(){var t={id:this.getLotteryId()};this.sendHttpReq("https://fssw.bichonfrise.cn/index.php/Wechat/Index/ajax_get_lottery",t,function(t,e,i){i.coin_num.string="糖豆："+t.data.user_coin_num,i.zhuanchang_name.string=t.data.name,i.cost_num.string=t.data.coin_num+"糖豆/次",i.lottery_data=t;for(var o=0;o<parseInt(t.data.good_num);o++){var a=cc.instantiate(i.wawa_prefab);a.setPosition(cc.p(0,0)),a.getComponent("good").setData(t.data["lottery_good"+o].name,t.data["lottery_good"+o].img_url),i.prize_list_layout.node.addChild(a)}setTimeout(function(){i.shake()},500)}),this.shake()},zhuawawa_go:function(){this.zhuazi.node.stopAction(this.shake_zhuazi_seq),this.zhua_top.node.stopAction(this.shake_zhuatop_seq),this.zhua_line.node.stopAction(this.shake_zhualine_seq),this.prize_list_layout.node.stopAction(this.shake_wawa_seq);var t=this.prize_bar.node.height,e=this.zhuazi.node.height,i=this.prize_bar.node.position.y+t,o=this.zhuazi.node.position.x;i+=297,i-=t;var a=cc.sequence(cc.moveTo(.1,o,i),cc.rotateTo(.1,3),cc.rotateTo(.1,0),cc.rotateTo(.1,-3),cc.rotateTo(.1,0));this.zhuazi.node.runAction(a);this.orign_zhualine_scale_y=(this.orign_zhualine_pos.y+this.zhua_line.node.height/2-i-e/2)/this.orign_zhualine_height;cc.director.getWinSizeInPixels().height,this.orign_zhualine_pos.y,i=this.orign_zhualine_pos.y+this.zhua_line.node.height/2-this.orign_zhualine_scale_y*this.zhua_line.node.height/2;var n=this.zhua_line.node.x,c=cc.spawn(cc.scaleTo(.1,1,this.orign_zhualine_scale_y),cc.moveTo(.1,n,i));this.zhua_line.node.runAction(c);var s={id:this.getLotteryId()},u=this;this.sendHttpReq("https://fssw.bichonfrise.cn/index.php/Wechat/Index/lottery",s,function(t,e,i){var o;(i.coin_num.string="糖豆："+t.data.user_coin_num,""==t.data.good_name)?((o=cc.instantiate(i.result_prefab)).setPosition(cc.p(0,0)),o.getComponent("result").setData(t.data.msg,t.data.good_url,function(){u.resetGame()}),i.node.addChild(o)):((o=cc.instantiate(i.result_prefab)).setPosition(cc.p(0,0)),o.getComponent("result").setData("恭喜您抓到了"+t.data.good_name+"，已存入背包！",t.data.good_url,function(){u.resetGame()}),i.node.addChild(o))})},zhuawawa:function(){if(1!=this.zhua_click){this.zhua_click=1,cc.audioEngine.play(this.audio_readygo,!1);var t=this,e=cc.sequence(cc.rotateTo(.1,2),cc.rotateTo(.1,0),cc.rotateTo(.1,-2),cc.rotateTo(.1,0),cc.rotateTo(.1,2),cc.rotateTo(.1,0),cc.rotateTo(.1,-2),cc.rotateTo(.1,0),cc.rotateTo(.1,2),cc.rotateTo(.1,0));this.zhuazi.node.runAction(e),setTimeout(function(){t.zhuawawa_go()},1200)}},resetGame:function(){cc.audioEngine.play(this.audio_click,!1),this.zhua_line.node.height=64,this.zhua_line.node.scaleY=1,this.zhuazi.node.position=this.orign_zhuazi_pos,this.zhua_top.node.position=this.orign_zhuatop_pos,this.zhua_line.node.position=this.orign_zhualine_pos,this.prize_list_layout.node.position=this.prize_list_layout_pos,this.shake(),this.zhua_click=0,this.prize.destroy()},charge:function(){this.resetGame()},detail:function(){cc.audioEngine.play(this.audio_click,!1),zhuawawa.show_detail(this.lottery_data)}}),cc._RF.pop()},{}],good:[function(t,e,i){"use strict";cc._RF.push(e,"e8c1cRLnANCuKCOs9FpC66t","good"),cc.Class({extends:cc.Component,properties:{good:{type:cc.Sprite,default:null},good_name:{type:cc.Label,default:null}},onLoad:function(){},setData:function(t,e){var i=this;this.good_name.string=t,cc.loader.load(e,function(t,e){var o=new cc.SpriteFrame(e);i.good.spriteFrame=o})},start:function(){}}),cc._RF.pop()},{}],result:[function(t,e,i){"use strict";cc._RF.push(e,"aa21dQ/CZ1OurlI1XXO6pNt","result"),cc.Class({extends:cc.Component,properties:{msg:cc.Label,good:cc.Sprite,audio_click:{url:cc.AudioClip,default:null},gameCallback:null},setData:function(t,e,i){var o=this;this.msg.string=t,this.gameCallback=i,cc.loader.load(e,function(t,e){var i=new cc.SpriteFrame(e);o.good.spriteFrame=i})},start:function(){},ok:function(){cc.audioEngine.play(this.audio_click,!1),this.node.destroy(),this.gameCallback()}}),cc._RF.pop()},{}]},{},["game","good","result"]);