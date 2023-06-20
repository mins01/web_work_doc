'use strict';

class CanvasHelper {
  static context2dByCanvas_contextAttributes = {
    alpha: true, 
    colorSpace: 'srgb', 
    desynchronized: false, 
    willReadFrequently: true, // true 이면, 소프트웨어 2D캔버스를 강제함.(메모리 절약) getImageData 를 자주 사용시 설정하라.
  }
    /**
     * 
     * @param int w 
     * @param int h 
     * @param string fillStyle 옵션. 배경색 
     * @returns Canvas
     */
    static canvas(w,h,fillStyle){
        let canvas = document.createElement('canvas')
        canvas.width = w;
        canvas.height = h;
        if(fillStyle && fillStyle != undefined){
          this.fillCanvas(canvas,fillStyle)
        }
        return canvas
    }
    /**
     * 
     * @param Canvas canvas 
     * @returns CanvasRenderingContext2D 
     */
    static context2dByCanvas(canvas,contextAttributes){
      if(!contextAttributes){
        contextAttributes = {}
      }
      contextAttributes = Object.assign({},this.context2dByCanvas_contextAttributes,contextAttributes)
      // console.log(contextAttributes);
      return canvas.getContext('2d', contextAttributes);
    }

    /**
     * 
     * @param Canvas canvas 
     * @param string fillStyle 배경색
     */
    static fillCanvas(canvas,fillStyle){
      let ctx = this.context2dByCanvas(canvas);
      ctx.fillStyle = fillStyle;
      ctx.globalAlpha = 1;
      ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    }
    /**
     * URL에서 image를 만든다
     * @param string url 
     * @returns Promise
     */
    static imageByUrl(url){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = (event) => resolve(img)
            img.onerror = reject
            img.src = url
        })
    }
    /**
     * Image 에서 Canvas를 만든다
     * @param Image image 
     * @returns canvas
     */
    static canvasByImage(image){
        let canvas = this.canvas(image.naturalWidth,image.naturalHeight);
        let ctx = this.context2dByCanvas(canvas);
        ctx.drawImage(image,0,0);
        return canvas;
    }
    /**
     * 이미지 객체에서 Canvas를 만든다.
     * @param Object object HTMLImageElement , SVGImageElement , HTMLVideoElement , HTMLCanvasElement , Blob , ImageData , ImageBitmap , OffscreenCanvas
     * @returns Promise
     */
    static canvasByObject(object){
        return new Promise((resolve, reject) => {
            createImageBitmap(object).then((imageBitmap)=>{
                let canvas = this.canvas(imageBitmap.width,imageBitmap.height);
                let ctx = this.context2dByCanvas(canvas);
                ctx.drawImage(imageBitmap,0,0);
                resolve(canvas);
            })
            .catch((e)=>{
                reject(e);
            })
        });
    }

    /**
     * 객체(보통 BLOB)에서 Canvas를 만든다.
     * @param Object object HTMLImageElement , SVGImageElement , HTMLVideoElement , HTMLCanvasElement , Blob , ImageData , ImageBitmap , OffscreenCanvas
     * @returns Promise
     */
    // https://bugs.webkit.org/show_bug.cgi?id=182424 for safari
    static canvasByObjectWithObjectUrl(object){
        return new Promise((resolve, reject) => {
            let url = URL.createObjectURL(object)
            this.canvasByUrl(url).then((canvas)=>{resolve(canvas);}).catch(e=>{reject(e)}).finally(()=>{URL.revokeObjectURL(url);})
          })
    }
    /**
     * URL 에서 Canvas 를 만든다.
     * @param string url 
     * @returns Promise
     */
    static async canvasByUrl(url){
        return await this.imageByUrl(url)
        .then((img)=>{
            return this.canvasByImage(img)
        })
        .catch((e)=>{console.error(e);})
    }

    /**
     * Blob 을 다운로드한다.
     * @param Blob blob Blob or File ...
     * @param string filename xxxx.png , xxxx.jpg
     */
    static downloadBlob(blob,filename){
      const url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.target = "_blank";
      a.download = filename;
      a.click();
      setTimeout(()=>{
        URL.revokeObjectURL(url);
      },60000); // 1분 뒤 revokeObjectURL 처리함
    }

    /**
     * Canvas 를 blob으로 바꿔 다운로드한다.
     * @param Canvas canvas 
     * @param string imageType image/png (default) , image/jpeg , image/webp
     * @param float quality 0~1
     * @param string filename 
     */
    static downloadCanvas(canvas,imageType,quality,filename){
      this.blobByCanvas(canvas,imageType,quality).then((blob)=>{
        this.downloadBlob(blob,filename);
      })
    }

    /**
     * 캔버스를 복제함
     * @param Canvas canvas 
     * @returns Canvas
     */
    static cloneCanvas(canvas){
      let newCanvas = this.canvas(canvas.width,canvas.height);
      let newCtx = this.context2dByCanvas(newCanvas,{"willReadFrequently": true,})
      let ctx = this.context2dByCanvas(canvas,{"willReadFrequently": true,});
      newCtx.putImageData(ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height),0,0);
      return newCanvas;
    }
    /**
     * 
     * @param Canvas canvas 
     * @param int w 
     * @param int h 
     */
    static resizeCanvas(canvas,w,h){
      if(!w && !h){
        throw 'Error : width and height is empty value!'; 
      }
      if(!w){ w = Math.floor(h / canvas.height * canvas.width); }
      else if(!h){ h = Math.floor(w / canvas.width * canvas.height); }
      let newCanvas = this.cloneCanvas(canvas);
      canvas.width = w;
      canvas.height = h;
      let ctx = this.context2dByCanvas(canvas);
      ctx.drawImage(newCanvas,0,0,newCanvas.width,newCanvas.height,0,0,w,h);
    }

    /**
     * 
     * cropCanvasWithImageData 가 cropCanvasWithDrawImage 에 비해서 30% 정도 빠르다
     * @param Canvas canvas 
     * @param int sx 
     * @param int sy 
     * @param int sw 
     * @param int sh 
     */
    static cropCanvas(canvas,sx,sy,sw,sh){
      return this.cropCanvasWithImageData(canvas,sx,sy,sw,sh);
    }
    /**
     * 
     * 주의 : 이미지 범위를 넘어가는 경우 범위 밖의 부분은 이상한 데이터를 가질 수 있다.
     * @param Canvas canvas 
     * @param int sx 
     * @param int sy 
     * @param int sw 
     * @param int sh 
     */
    static cropCanvasWithImageData(canvas,sx,sy,sw,sh){
      // if(sx < 0 || sy < 0){
      //   throw "Error : sx < 0 or sy < 0";
      // }
      // if(sx+sw > canvas.width || sy+sh > canvas.height){
      //   throw "Error : sx+sw > canvas.width or sy+sh > canvas.height";
      // }
      let ctx = this.context2dByCanvas(canvas,{"willReadFrequently": true,});
      let imageData = ctx.getImageData(sx,sy,sw,sh);
      canvas.width = imageData.width
      canvas.height = imageData.height;
      ctx.putImageData(imageData,0,0);
    }

    /**
     * 
     * @param Canvas canvas 
     * @param int sx 
     * @param int sy 
     * @param int sw 
     * @param int sh 
     */
    static cropCanvasWithDrawImage(canvas,sx,sy,sw,sh){
      let cloneCanvas = this.cloneCanvas(canvas);
      canvas.width = sw;
      canvas.height = sh;
      let ctx = this.context2dByCanvas(canvas);
      ctx.drawImage(cloneCanvas,sx,sy,sw,sh,0,0,ctx.canvas.width,ctx.canvas.height);
    }


    /**
     * Canvas에서 Blob 을 만든다.
     * @param Canvas canvas 
     * @param string imageType image/png (default) , image/jpeg , image/webp
     * @param float quality 0~1
     * @returns Promise
     */
    static async blobByCanvas(canvas,imageType,quality){
        return await (new Promise((resolve, reject) => {
            canvas.toBlob((blob)=>{ 
                resolve(blob) 
            },imageType,quality)
        }))
    }

    /**
     * textToCanvas 문자열을 Canvas로 만든다
     * @param string text 
     * @param int width 
     * @param int||null height null이면 높이 자동 계산된다.
     * @param object ctxConf 
     * @param int lineHeightPx 
     * @param int paddingPx 
     * @param string bgFillStyle 
     * @returns Canvas
     */
    static canvasByText(text,width,height,lineHeightPx,ctxConf,paddingPx,bgFillStyle){
        if(!ctxConf) ctxConf = {};
        if(!bgFillStyle) bgFillStyle = null;
        if(paddingPx==undefined) paddingPx = 0;
        let canvas = this.canvas(width,height);
        canvas.dataset.width = width
        canvas.dataset.height = height
        canvas.dataset.text = text
        canvas.dataset.lineHeightPx = lineHeightPx
        canvas.dataset.paddingPx = paddingPx
        canvas.width = width;
        canvas.height = height?height:300; //height 가 없으면 밑에서 자동 재계산한다.
        let ctx = this.context2dByCanvas(canvas);
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
          if(text[i] == '\n'){ //줄바꿈 처리
            lines.push(text[i].trim())
            linePos++;
            continue;
          }
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
        ctx = this.context2dByCanvas(canvas);
        if(bgFillStyle){
          ctx.save();
          ctx.fillStyle = bgFillStyle;
          ctx.beginPath()
          ctx.rect(0,0,canvas.width,canvas.height);
          ctx.fill()
          ctx.restore();
        }
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
          ctx.fillText(text, x, lineHeightPx*(idx+1)+paddingPx)
          ctx.strokeText(text, x, lineHeightPx*(idx+1)+paddingPx)
        })
    
        
        return canvas
    }

    /**
     * 
     * @param Canvas canvas 
     * @param int dx 
     * @param int dy 
     * @param string text 
     * @param int width 
     * @param int||null height null이면 높이즌 자동 계산된다.
     * @param object ctxConf 
     * @param int lineHeightPx 
     * @param int paddingPx 
     * @param string bgFillStyle 
     * @returns null
     */
    static printOnCanvas(canvas,dx,dy,text,width,height,lineHeightPx,ctxConf,paddingPx,bgFillStyle){
        let textCanvas = this.canvasByText(text,width,height,lineHeightPx,ctxConf,paddingPx,bgFillStyle);
        let ctx = this.context2dByCanvas(canvas);
        ctx.drawImage(textCanvas,dx,dy);
    }
}