var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

window.onload = function(){
	canvas.height = 600;
	canvas.width = 600;		
	setInterval(draw, 1000);
}

function draw(){
	var ctx = context;
	var x = canvas.height/2;
	var y = canvas.height/2;
	var r = canvas.height/2;

	ctx.clearRect(0 ,0, canvas.height, canvas.width);

	//画出圆盘
	ctx.beginPath();
	ctx.lineWidth = 10;
	ctx.strokeStyle= "#000";
	ctx.arc(x, y, r-20, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	//画出刻度表
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle= "#999";
	for(var i = 0; i<60; i++) {
		ctx.moveTo(x+(r-40)*Math.cos(2*Math.PI/360*i*6),y-(r-40)*Math.sin(2*Math.PI/360*i*6));
		ctx.lineTo(x+(r-60)*Math.cos(2*Math.PI/360*i*6),y-(r-60)*Math.sin(2*Math.PI/360*i*6));
		ctx.stroke();
	}
	ctx.closePath();
	//画出数字
	ctx.beginPath();
	ctx.font = "bold 30px Arial"
	for(let i = -2; i<10; i++) {
		context.fillText(i+3 ,x+(r-90)*Math.cos(-2*Math.PI/360*i*30)-15 ,y-(r-90)*Math.sin(-2*Math.PI/360*i*30)+15 ,400);
	}
    ctx.closePath() 

	var time = new Date();
	var s = time.getSeconds();
	var m = time.getMinutes() + s/60;
	var h = time.getHours() + m/60;
	h = h>12 ? h-12 : h;

	//画出秒针
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(s*Math.PI/30);
	ctx.translate(-x,-y);	
    ctx.moveTo(x,y+40);
    ctx.lineTo(x,y-220);
    ctx.stroke();
	ctx.restore();

    //画出分针
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(m*Math.PI/30);
	ctx.translate(-x,-y);	
    ctx.moveTo(x,y+30);
    ctx.lineTo(x,y-180);
    ctx.stroke();
	ctx.restore();

	//画出时针
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(h*Math.PI/6);
	ctx.translate(-x,-y);	
    ctx.moveTo(x,y+20);
    ctx.lineTo(x,y-140);
    ctx.stroke();
	ctx.restore();
    
	//画出枢纽
	ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();

    var val = document.querySelectorAll("input");
    if (val[0].value === time.getHours() && val[1].value === time.getMinutes()) {
    	alert("到时间了");
	}
}