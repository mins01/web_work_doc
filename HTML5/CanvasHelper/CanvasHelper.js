'use strict';

class CanvasHelper {
    /**
     * 
     * @param int w 
     * @param int h 
     * @returns Canvas
     */
    static canvnas(w,h){
        let canvas = document.createElement('canvas')
        canvas.width = w;
        canvas.height = h;
        return canvas
    }
    /**
     * 
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
     * 
     * @param Image image 
     * @returns canvas
     */
    static canvasByImage(image){
        let canvas = this.canvnas(image.naturalWidth,image.naturalHeight);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(image,0,0);
        return canvas;
    }
    /**
     * 
     * @param Object object HTMLImageElement , SVGImageElement , HTMLVideoElement , HTMLCanvasElement , Blob , ImageData , ImageBitmap , OffscreenCanvas
     * @returns Promise
     */
    static canvasByObject(object){
        return new Promise((resolve, reject) => {
            createImageBitmap(object).then((imageBitmap)=>{
                let canvas = this.canvnas(imageBitmap.width,imageBitmap.height);
                let ctx = canvas.getContext('2d');
                ctx.drawImage(imageBitmap,0,0);
                resolve(canvas);
            })
            .catch((e)=>{
                reject(e);
            })
        });
    }
    /**
     * 
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
     * 
     * @param Canvas canvas 
     * @param string imageType image/png , image/jpg , image/webp
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
        let canvas = document.createElement('canvas');
        canvas.dataset.width = width
        canvas.dataset.height = height
        canvas.dataset.text = text
        canvas.dataset.lineHeightPx = lineHeightPx
        canvas.dataset.paddingPx = paddingPx
        canvas.width = width;
        canvas.height = height?height:300; //height 가 없으면 밑에서 자동 재계산한다.
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
        ctx = canvas.getContext('2d');
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
        let ctx = canvas.getContext('2d');
        ctx.drawImage(textCanvas,dx,dy);
    }
}