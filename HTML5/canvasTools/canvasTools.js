const canvasTools = {
  textBox(ctxConf,width,height,text,lineHeightPx,paddingPx){
    if(!ctxConf) ctxConf = {};
    if(paddingPx==undefined) paddingPx = 0;
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height?height:300;
    let ctx = canvas.getContext('2d');
    console.log();
    for(var k in ctxConf){
      ctx[k] = ctxConf[k];
    }
    // 줄바꿈 계산
    let lines = [''];
    let linePos = 0;
    let tmpText = '';
    for(let i=0,m=text.length;i<m;i++){
      tmpText = lines[linePos];
      tmpText += text[i];
      if(width >= ctx.measureText(tmpText).width){
        lines[linePos] = tmpText;
      }else{
        lines[linePos] = lines[linePos].trim();
        lines.push(text[i])
        linePos++
      }
    }


    if(!height){
      canvas.height = Math.ceil(lineHeightPx*(lines.length));
    }
    canvas.width = width+(paddingPx*2);
    canvas.height +=(paddingPx*2);
    ctx = canvas.getContext('2d');
    for(var k in ctxConf){
      ctx[k] = ctxConf[k];
    }

    let x = 0;
    switch(ctx.textAlign){
      case 'center':x=Math.ceil(canvas.width/2); break;
      case 'right':x=canvas.width; break;
    }
    lines.forEach((text,idx)=>{
      ctx.fillText(text, x, lineHeightPx*(idx+1)+paddingPx)
      ctx.strokeText(text, x, lineHeightPx*(idx+1)+paddingPx)
    })

    
    return canvas
  }
}
