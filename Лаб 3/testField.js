
//ниже линии ВУ

function setPixel(x, y, c, canvas) {
    'use strict';
    // window.alert("gere");
    var p = canvas.createImageData(1, 1);
    // window.alert("gere");
    p.data[0] = c.r;
    p.data[1] = c.g;
    p.data[2] = c.b;
    p.data[3] = c.a;
    // window.alert("gere");
    var data = canvas.getImageData(x, y, 1, 1).data;
    p.data[3] = Math.max(p.data[3], data[3]);
    canvas.putImageData(p, x, y);
   //  window.alert("gere");
}

var plot = function (x, y, c, canvas) {
    'use strict';
    if (isFinite(x) && isFinite(y)) {
        var color = {
            r: plot.color.r,
            g: plot.color.g,
            b: plot.color.b,
            a: plot.color.a * c
        };
 
        setPixel(x, y, color, canvas);
    }
};
 

var ipart = Math.floor;
 
function fpart(x) {
    'use strict';
    return x - Math.floor(x);
}
 
function rfpart(x) {
    'use strict';
    return 1.0 - fpart(x);
}
 
function drawLine(x0, y0, x1, y1, canvas, color) {
    'use strict';
    
   
    
    var tmp;
    var x;
    
    if (color) {
        plot.color = color;
    } else {
        plot.color = {r: 0, g: 0, b: 0, a: 255};
    }
    var steep = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (steep) {
        tmp = x0;
        x0 = y0;
        y0 = tmp;
        tmp = x1;
        x1 = y1;
        y1 = tmp;
    }
    if (x0 > x1) {
        tmp = x0;
        x0 = x1;
        x1 = tmp;
        tmp = y0;
        y0 = y1;
        y1 = tmp;
    }
 
    var dx = x1 - x0;
    var dy = y1 - y0;
    var gradient = dy / dx;
 
    var xend = Math.round(x0);
    var yend = y0 + gradient * (xend - x0);
    var xgap = rfpart(x0 + 0.5);
    var xpxl1 = xend;
    var ypxl1 = ipart(yend);
    
    if(rfpart(x0 + 0.5) + fpart(x1 + 0.5) < 1.5) {
        xgap = 1;
    }
    
    if (steep) {
        plot(ypxl1, xpxl1, rfpart(yend) * xgap, canvas);
        plot(ypxl1 + 1, xpxl1, fpart(yend) * xgap, canvas);
    } else {
        plot(xpxl1, ypxl1, rfpart(yend) * xgap, canvas);
        plot(xpxl1, ypxl1 + 1, fpart(yend) * xgap, canvas);
    }
    var intery = yend + gradient;
 
    xend = Math.round(x1);
    yend = y1 + gradient * (xend - x1);
    xgap = fpart(x1 + 0.5);
    var xpxl2 = xend;
    var ypxl2 = ipart(yend);
 
    if(rfpart(x0 + 0.5) + fpart(x1 + 0.5) < 1.5) {
        xgap = 1;
    }
    
    if (steep) {
        plot(ypxl2, xpxl2, rfpart(yend) * xgap, canvas);
        plot(ypxl2 + 1, xpxl2, fpart(yend) * xgap, canvas);
    } else {
        plot(xpxl2, ypxl2, rfpart(yend) * xgap, canvas);
        plot(xpxl2, ypxl2 + 1, fpart(yend) * xgap, canvas);
    }
 
    for (x = xpxl1 + 1; x <= xpxl2 - 1; x += 1) {
        if (steep) {
            plot(ipart(intery), x, rfpart(intery), canvas);
            plot(ipart(intery) + 1, x, fpart(intery), canvas);
        } else {
            plot(x, ipart(intery), rfpart(intery), canvas);
            plot(x, ipart(intery) + 1, fpart(intery), canvas);
        }
        intery = intery + gradient;
    }
}

//выше линии ВУ


var ctx;
var canvas;

function fillCircle(centerX, centerY, radius, fillColor) {
    
    var pointX, pointY;
    var picture = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    var tdata;
    
    var thisX = 1;
    var thisY = 1;
    var tX = thisX * radius + centerX;
    var tY = thisY * radius + centerY;
    
    //window.alert(centerX);
    var chek = (tX - centerX) * (tX - centerX) + (tY - centerY)  * (tY - centerY);
    
    
        
    for(pointY = centerY - radius * 2; pointY <= centerY + radius * 2; pointY += 1) {
    
        for(pointX = centerX - radius * 2; pointX <= centerX + radius * 2; pointX += 1) {
        
            var tmp = (pointX - centerX) * (pointX - centerX)
            + (pointY - centerY) * (pointY - centerY);
            
            if(tmp <= chek) {
                
                
                //window.alert(fillColor);  
                
                tdata =  4 * pointX + 4 * (canvas.width) * pointY;
                picture.data[tdata] = fillColor.r;
                picture.data[tdata + 1] = fillColor.g;
                picture.data[tdata + 2] = fillColor.b;
                picture.data[tdata + 3] = fillColor.a;
                
            }
            
        }
    }
    ctx.putImageData(picture, 0, 0);
    
}

function drawCircle(centerX, centerY, radius, fill, color ) {
    
    if (color) {
    } else {
        color = {r: 0, g: 0, b: 0, a: 255};
    }
    
    //window.alert(color);
   
    var thisX, thisY, pastX, pastY;
    pastX = 1;
    pastY = 1;
    
    //drawLine(pastX + centerX, pastY + centerY,
    //         pastX + centerX, pastY + centerY, ctx);
    
    var t = 0, tX, tY, pX, pY;
    
    var adder = Math.PI / 100;
    
        //window.alert("here");
    while (t <= 2 * Math.PI) {
    //while (t <= Math.PI) {
        thisX = Math.cos(t) - Math.sin(t);
        thisY = Math.sin(t) + Math.cos(t);
        pastX = Math.cos(t - adder) - Math.sin(t - adder);
        pastY = Math.sin(t - adder) + Math.cos(t - adder);
        
        tX = thisX * radius + centerX;
        tY = thisY * radius + centerY;
        pX = pastX * radius + centerX;
        pY = pastY * radius + centerY;
        
        drawLine(pX, pY, tX, tY, ctx, color);
        
        //window.alert(thisX);
        pastX = Math.cos(t) - Math.sin(t);
        pastY = Math.sin(t) + Math.cos(t);
        //window.alert(pastX);
        
        t += adder;
    }
    
    
    
        //window.alert(fill);
    
    if(fill === 'fill') {
        
        fillCircle(centerX, centerY, radius, color);
    }
    
}

function drawSquare(x, y, width, height) {
    //window.alert(x);
    drawLine(x, y, x + width, y, ctx);
    drawLine(x, y, x, y + height, ctx);
    drawLine(x + width, y, x + width, y + height, ctx);
    drawLine(x, y + height, x + width, y + height, ctx);
}
    
function drawMyPicture() {
    
}

function Init() {
    'use strict';
    canvas = document.getElementById("paint");
    ctx = canvas.getContext('2d');

    //drawLine(0, 0, canvas.width, canvas.height, ctx);
    drawCircle(canvas.width / 2, canvas.height / 2, 100, "fill"
              , {r: 0, g: 0, b:255, a: 255});
    
    drawCircle(canvas.width / 2, canvas.height / 2,
               100);
    //drawLine(0, 0, 100, 100, ctx);
    drawSquare(400, 400, 100, 100);
}