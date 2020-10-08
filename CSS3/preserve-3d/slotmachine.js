var slotmachine = (function(){
	var slotmachine = {
		playing:false,
		runCount:0,
		coin:0,
		batCoin:0,
		lastResultNum:["_","_","_"],
		lastResult:'',
		lastMultiply:0,
		lastResultCoin:0,
		rollings:[0,0,0],
		slots:[null,null,null],
		init:function(){
			this.slots[0]=document.querySelector("#slot-0");
			this.slots[1]=document.querySelector("#slot-1");
			this.slots[2]=document.querySelector("#slot-2");
			this.slots[0].addEventListener('animationend', () => {
			  slotmachine.rollings[0]=3;
				slotmachine.animationend();
			});
			this.slots[1].addEventListener('animationend', () => {
			  slotmachine.rollings[1]=3;
				slotmachine.animationend();
			});
			this.slots[2].addEventListener('animationend', () => {
			  slotmachine.rollings[2]=3;
				slotmachine.animationend();
			});
			this.sync();
		},
		animationend:function(){
			if(
				slotmachine.rollings[0]==3
				&& slotmachine.rollings[1]==3
				&& slotmachine.rollings[2]==3
			){
				// console.log('rollend',slotmachine.rollings,slotmachine.getResult());
				slotmachine.processResult(slotmachine.getResult())
				slotmachine.rollings[0]=0;
				slotmachine.rollings[1]=0;
				slotmachine.rollings[2]=0;
			}else{
				// console.log('rolling',slotmachine.rollings,slotmachine.getResult());
			}

		},
		rotateBorad:function(x,y,z,zoom){
			document.querySelector("#machine").style.transform = " rotateX("+x+"deg) rotateY("+y+"deg) rotateZ("+z+"deg) scale3D("+zoom+","+zoom+","+zoom+")"
		},
		setSlot:function(slotN,n){
			this.slots[slotN].setAttribute('num',n);
		},
		rollSlot:function(slotN,n){
			slotmachine.rollings[slotN]=1;
			slotmachine.setSlot(slotN,0);
			setTimeout(function(){
				slotmachine.rollings[slotN]=2;
				slotmachine.setSlot(slotN,n)
			},1000)
		},

		getResult:function(){
			var n1 = this.slots[0].getAttribute('num');
			var n2 = this.slots[1].getAttribute('num');
			var n3 = this.slots[2].getAttribute('num');
			return [n1,n2,n3];
		},
		getMultiply:function(rs){
			var r = [rs[0],rs[1],rs[2]];
			r.sort();
			if(r[0]==7 && r[1]==7 && r[2]==7){ // 777
				return 30;
			}else if(r[0]==r[1] && r[2]==r[1]){ // 전부 같은 숫자
				return 20;
			}else if(r[1]==r[0]+1 && r[1]==r[2]-1){ //연속된 숫자
				return 10;
			}else if(r[0]==r[1] || r[0]==r[2] || r[1]==r[2] ){ // 두개가 같은 숫자
				return 5;
			}else if(r[0]%3==0 && r[1]%3==0 && r[2]%3==0 ){ // 3의 배수
				return 3;
			}else if(r[0]%2==0 && r[1]%2==0 && r[2]%2==0 ){ //모두 짝수
				return 2;
			}else if(r[0]%2==1 && r[1]%2==1 && r[2]%2==1 ){ //모두 홀수
				return 2;
			}
			return 0;
		},
		pullLever:function(){
			if(this.playing){
				alert("이미 게임 중입니다.");
				return;
			}
			if(this.coin == 0 ){
				alert("코인을 넣어주세요.");
				return;
			}
			if(this.batCoin == 0 ){
				alert("코인을 배팅해주세요.");
				return;
			}
			if(this.batCoin > this.coin){
				alert("보유 코인보다 배팅 코인이 더 많습니다.");
				return;
			}
			this.playing = true;
			this.coin -= this.batCoin;
			slotmachine.rollSlot(0,Math.floor(Math.random()*8)+1);
			setTimeout(function(){
				slotmachine.rollSlot(1,Math.floor(Math.random()*8)+1);
			},250);
			setTimeout(function(){
				slotmachine.rollSlot(2,Math.floor(Math.random()*8)+1);
			},500);
			this.sync();
		},
		processResult:function(rs){
			this.lastResultNum[0] = rs[0];
			this.lastResultNum[1] = rs[1];
			this.lastResultNum[2] = rs[2];


			this.lastMultiply = this.getMultiply(rs);
			this.lastResultCoin = this.batCoin * this.lastMultiply;
			this.coin += this.lastResultCoin;
			this.playing = false;
			this.runCount++;
			this.sync();

		},
		insertCoin:function(coin){
			coin = parseInt(coin,10)
			this.coin += coin;
			this.sync();
		},
		setBatCoin:function(coin){
			coin = parseInt(coin,10)
			if(coin>this.coin){
				alert("보유 코인보다 배팅 코인이 더 많습니다.");
				return;
			}
			this.batCoin = coin;
			this.sync();
		},
		sync:function(){
			document.querySelector("#coin").innerText = this.coin;
			document.querySelector("#batCoin").innerText = this.batCoin;
			if(this.playing || this.runCount==0){
				document.querySelector("#lastResult").innerText = this.batCoin+" X ?? = ???";
			}else{
				document.querySelector("#lastResult").innerText = this.batCoin+" X "+this.lastMultiply+" = "+this.lastResultCoin;
			}

			// document.querySelector("#lastResultNum").innerText = this.lastResultNum.join(',');
		}



	}
	return slotmachine;
})()
