const canvasTools = {
  toImageElementDelay:0, //toXXX 의 딜레이 부분
  textBox(ctxConf,width,height,text,lineHeightPx,paddingPx){
    if(!ctxConf) ctxConf = {};
    if(paddingPx==undefined) paddingPx = 0;
    let canvas = document.createElement('canvas');
    canvas.dataset.width = width
    canvas.dataset.height = height
    canvas.dataset.text = text
    canvas.dataset.lineHeightPx = lineHeightPx
    canvas.dataset.paddingPx = paddingPx
    canvas.width = width;
    canvas.height = height?height:300;
    let ctx = canvas.getContext('2d');
    console.log();
    for(var k in ctxConf){
      ctx[k] = ctxConf[k];
    }
    // 줄바꿈 계산
    let textWidth = canvas.width-paddingPx*2;
    let lines = [''];
    let linePos = 0;
    let tmpText = '';
    for(let i=0,m=text.length;i<m;i++){
      tmpText = lines[linePos];
      tmpText += text[i];
      if(i===0 || textWidth >= ctx.measureText(tmpText).width){
        lines[linePos] = tmpText;
      }else{
        lines[linePos] = lines[linePos].trim();
        // lines[linePos] = lines[linePos];
        lines.push(text[i])
        linePos++
      }
    }


    if(!height){
      canvas.height = Math.ceil(lineHeightPx*(lines.length)) + (paddingPx*2);
    }
    ctx = canvas.getContext('2d');
    for(var k in ctxConf){
      ctx[k] = ctxConf[k];
    }

    let x = 0;
    switch(ctx.textAlign){
      case 'center':x=Math.ceil(canvas.width/2); break;
      case 'right':x=canvas.width-paddingPx; break;
      case 'left':x=paddingPx; break;
    }
    lines.forEach((text,idx)=>{
      console.log('y',lineHeightPx*(idx+1)+paddingPx);
      ctx.fillText(text, x, lineHeightPx*(idx+1)+paddingPx)
      ctx.strokeText(text, x, lineHeightPx*(idx+1)+paddingPx)
    })

    
    return canvas
  },
  toCanvas(canvas){ // clone
    return this.fromImage(canvas)
  },
  fromImage(image){
    let canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;
    let ctx = canvas.getContext('2d')
    ctx.drawImage(image,0,0,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
    return canvas;
  },
  merge(target,source,sx,sy,sw,sh,dx,dy,dw,dh){
    let ctx = target.getContext('2d')
    ctx.drawImage(source,sx,sy,sw,sh,dx,dy,dw,dh);
  },
  
  toBlob(canvas,cb,type,encoderOptions){
    canvas.toBlob((blob) => {
      cb(blob)
    },type,encoderOptions);
  },
  toDataURL(canvas,cb,type,encoderOptions){
    const dataURL =canvas.toDataURL(type,encoderOptions);
    cb(dataURL)
  },
  toImage(canvas,cb,type,encoderOptions){
    try{
      // throw 'error test'; //for debug
      return this.toImageWithBlob(canvas,cb,type,encoderOptions);
    }catch(e){
      console.error(e)
      return this.toImageWithDataURL(canvas,cb,type,encoderOptions);
    }
  },
  toImageWithBlob(canvas,cb,type,encoderOptions){
    if(!type){type='image/png'}
    let img = new Image();
    img.crossOrigin="anonymous"
    img.dataset.type=type;
    img.dataset.encoderOptions=encoderOptions;
    this.toBlob(canvas,(blob) => {
      img.dataset.type=blob.type;
      img.dataset.size=blob.size;
      const url = URL.createObjectURL(blob);
      img.onload = (event)=>{
        // console.log('img.onload');
        URL.revokeObjectURL(url);
        if(cb){
          if(this.toImageElementDelay>0){ setTimeout(()=>{ cb(img); },this.toImageElementDelay) }
          else{ cb(img); }
        }
      }
      img.src = url;
    },type,encoderOptions);
  },
  toImageWithDataURL(canvas,cb,type,encoderOptions){
    if(!type){type='image/png'}
    let img = new Image();
    img.crossOrigin="anonymous"
    img.dataset.type=type;
    img.dataset.encoderOptions=encoderOptions;
    this.toDataURL(canvas,(dataURL) => {     
      img.onload = (event)=>{
        console.log('img.onload');
        if(cb){
          if(this.toImageElementDelay>0){ setTimeout(()=>{ cb(img); },this.toImageElementDelay) }
          else{ cb(img); }
        }
      }
      img.src = dataURL;
    },type,encoderOptions);
  },
  downloadWithBlob(canvas,filename,type,encoderOptions){
    this.toBlob(canvas,(blob) => {
      const url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.download = filename;
      a.href = url
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },type,encoderOptions);
  },
  downloadWithDataURL(canvas,filename,type,encoderOptions){
    this.toDataURL(canvas,(dataURL) => {
      // const url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.download = filename;
      a.href = dataURL
      a.click();
      // document.body.removeChild(a);
    },type,encoderOptions);
  },
  download(canvas,filename,type,encoderOptions){
    try{
      // throw 'error test'; //for debug
      return this.downloadWithBlob(canvas,filename,type,encoderOptions);
    }catch(e){
      console.error(e)
      return this.downloadWithDataURL(canvas,filename,type,encoderOptions);
    }
  }
}
