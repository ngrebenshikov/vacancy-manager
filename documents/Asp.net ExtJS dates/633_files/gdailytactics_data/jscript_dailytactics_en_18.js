var sqsize = 18;function responseHandler0() { reqcollection[0].HandleResponse(); }
function responseHandler1() { reqcollection[1].HandleResponse(); }
function responseHandler2() { reqcollection[2].HandleResponse(); }
function responseHandler3() { reqcollection[3].HandleResponse(); }
function responseHandler4() { reqcollection[4].HandleResponse(); }
function responseHandler5() { reqcollection[5].HandleResponse(); }
function responseHandler6() { reqcollection[6].HandleResponse(); }
function responseHandler7() { reqcollection[7].HandleResponse(); }
function responseHandler8() { reqcollection[8].HandleResponse(); }
function responseHandler9() { reqcollection[9].HandleResponse(); }
function responseHandler10() { reqcollection[10].HandleResponse(); }
function responseHandler11() { reqcollection[11].HandleResponse(); }
function responseHandler12() { reqcollection[12].HandleResponse(); }
function responseHandler13() { reqcollection[13].HandleResponse(); }
function responseHandler14() { reqcollection[14].HandleResponse(); }
function responseHandler15() { reqcollection[15].HandleResponse(); }
function responseHandler16() { reqcollection[16].HandleResponse(); }
function responseHandler17() { reqcollection[17].HandleResponse(); }
function responseHandler18() { reqcollection[18].HandleResponse(); }
function responseHandler19() { reqcollection[19].HandleResponse(); }
function responseHandler20() { reqcollection[20].HandleResponse(); }

var reqcollection = new Array();
var reqcount = 0;

function RequestObject(ownerid) {
	this.ownerid = ownerid;
	this.skipallbutlast = true;
	this.http = createRequestObject();
	this.script = 'fetch.php';
	this.responsehandlername = "responseHandler"+reqcount;
	reqcollection[reqcount] = this;
	reqcount++;	
	this.queue = new Array();
}

function sendNext(no) {
	var ob = Objectmap.Get(no).req;
	if (ob.skipallbutlast && ob.queue.length > 1) {
		ob.queue.splice(0,ob.queue.length-1);
	}
	var thenext = ob.queue[0];
		try {
    ob.http.open("GET", thenext, true);
    ob.http.onreadystatechange = eval(ob.responsehandlername);
    ob.http.send(null);
	} catch (x) {alert(x);}
}


function RequestObject_HandleResponse() {

	  if(this.http.readyState == 4){
        var response = this.http.responseText;
        
        var reqid = null;
        var hook = null;
        var obid = null;
        var value = null;
        var data = response.split('|');
				for (var i = 0; i < data.length; i++) {
					if (data[i] == "hook") {
						hook = data[i+1];
						i++;
					}
					else if (data[i] == "reqid") {
						reqid = data[i+1];
						i++;
					}
					else if (data[i] == "value") {
						value = data[i+1];
						i++;
					}
					else if (data[i] == "obid") {
						obid = data[i+1];
						i++;
					}
        }      
      if (obid != null) {
      	var theob = Objectmap.Get(obid);
      	theob.ParseRequestResult(reqid,value);
      }

      this.queue.splice(0,1);
      if (this.queue.length > 0) {
				setTimeout('sendNext(\''+this.ownerid+'\')',100);
    	}
    }
}

RequestObject.prototype.HandleResponse = RequestObject_HandleResponse;


function RequestObject_SendRequest(hook,action) {
	var reqid = 'req'+Math.random();
	var u = this.script+'?obid='+this.ownerid+'&reqid='+reqid+'&hook='+hook+'&action='+action;
	if (this.queue.length == 0) {
		try {
			this.queue.push(u);
	    this.http.open("GET", u, true);
	    this.http.onreadystatechange = eval(this.responsehandlername);
	    this.http.send(null);
  	} catch (x) {alert(x);}
  }
	else {
		this.queue.push(u);
	}
  return reqid;
}

RequestObject.prototype.SendRequest = RequestObject_SendRequest;

function createRequestObject() {
    var ro;
    var browser = navigator.appName;
    if(browser == "Microsoft Internet Explorer"){
        ro = new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        ro = new XMLHttpRequest();
    }
    return ro;
}



function Objectmap() {}

Objectmap.objectcount = 0;
Objectmap.objectmap = new Array();

function Objectmap_Add(baseid,ob) {
	var theid = baseid + '' + Objectmap.objectcount + Math.random();
	Objectmap.objectmap[theid] = ob;
	Objectmap.objectcount++;
	return theid;
}

Objectmap.Add = Objectmap_Add;

function Objectmap_Get(id) {
	return Objectmap.objectmap[id];
}

Objectmap.Get = Objectmap_Get;



function scrollOffsetX() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageXOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollLeft;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollLeft;
	}
}
function scrollOffsetY() {
	if (self.pageYOffset) // all except Explorer
	{
		return self.pageYOffset;
	}
	else if (document.documentElement && document.documentElement.scrollTop)
		// Explorer 6 Strict
	{
		return document.documentElement.scrollTop;
	}
	else if (document.body) // all other Explorers
	{
		return document.body.scrollTop;
	}
}
var piecegraphics = new Array("images/a"+sqsize+"free.gif","images/a"+sqsize+"wk.gif","images/a"+sqsize+"wq.gif","images/a"+sqsize+"wr.gif","images/a"+sqsize+"wb.gif","images/a"+sqsize+"wn.gif","images/a"+sqsize+"wp.gif",
"images/a"+sqsize+"bk.gif","images/a"+sqsize+"bq.gif","images/a"+sqsize+"br.gif","images/a"+sqsize+"bb.gif","images/a"+sqsize+"bn.gif","images/a"+sqsize+"bp.gif");
var moveindicatorgraphics = new Array("images/a"+sqsize+"mw0.gif","images/a"+sqsize+"mw1.gif","images/a"+sqsize+"mb0.gif","images/a"+sqsize+"mb1.gif");
var emptyboardgraphics = "images/a"+sqsize+"empty.gif";
var startboardgraphics = "images/a"+sqsize+"start.gif";
var promowgraphics = "images/a"+sqsize+"promow.gif";
var promobgraphics = "images/a"+sqsize+"promob.gif";
var movegraphics = "images/a"+sqsize+"move.gif";
var _f=false, _t=true;




function Position() {
	this.b = new Array(64);
	this.wtm = _t;
	this.ep = 0;
	this.castling = 0;
	this.pliesplayed = 0;
	this.halfmovecounter = 0;
	this.moves = null;
	this.listeners = new Array();
	this.lastmove = 0;
	this.makemovetext = false;
	this.lastmovetext = null;
		this.piececodes = new Array('','K','Q','R','B','N','','K','Q','R','B','N',''); 
	
}

function Position_CopyFrom(p) {
	var o=this;	for (var i=0;i<64;i++) o.b[i] = p.b[i];	o.wtm = p.wtm;o.ep = p.ep;o.castling = p.castling;o.pliesplayed = p.pliesplayed; 
	o.halfmovecounter = p.halfmovecounter;} Position.prototype.CopyFrom = Position_CopyFrom;

function Position_SetStart() {
	this.SetFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'); } Position.prototype.SetStart = Position_SetStart;

function Position_SetSetupTable(t) {
	this.setuptable = t; } Position.prototype.SetSetupTable = Position_SetSetupTable;

function Position_Clear() {
	var o = this; for (var i=0; i<64; i++) o.b[i] = 0; o.wtm = _t; o.ep = 0; o.castling = 0; o.pliesplayed = 0; o.halfmovecounter = 0; o.moves = null;
	o.PositionChanged();} Position.prototype.Clear = Position_Clear;

function Position_ClearHistory(cc,ce) {
	var o = this; if (ce) {o.ep = 0;} if (cc) {o.castling = 0;} o.pliesplayed = 0; o.halfmovecounter = 0; o.moves = null;
	o.lastmove = 0; o.lastmovetext = null; } Position.prototype.ClearHistory = Position_ClearHistory;

function Position_SetFEN(fen) {
 try { while (fen.indexOf('  ')>=0) fen=fen.replace('  ',' '); var p=0, o=this, tok=fen.split(' '); for (var r=7; r>=0; r--) {for (var f = 0; f <= 7; f++) {var s = r*8+f, c = fen.charAt(p);
 switch (c) {case '/': f--; break;case 'K': o.b[s]=1;break;case 'Q': o.b[s]=2;break; case 'R': o.b[s]=3;break;case 'B': o.b[s]=4;break; case 'N': o.b[s]=5;break;case 'P': o.b[s]=6;break;
 case 'k': o.b[s]=7;break;case 'q': o.b[s]=8;break; case 'r': o.b[s]=9;break;case 'b': o.b[s]=10;break; case 'n': o.b[s]=11;break;case 'p': o.b[s]=12;break; case '.': o.b[s]=0;break;
 case '1': o.b[s]=0;break; case '2': o.b[s]=0;o.b[s+1]=0;f++;break;case '3': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;f+=2;break; case '4': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;o.b[s+3]=0;f+=3;break;
 case '5': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;o.b[s+3]=0;o.b[s+4]=0;f+=4;break; case '6': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;o.b[s+3]=0;o.b[s+4]=0;o.b[s+5]=0;f+=5;break;
 case '7': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;o.b[s+3]=0;o.b[s+4]=0;o.b[s+5]=0;o.b[s+6]=0;f+=6;break; case '8': o.b[s]=0;o.b[s+1]=0;o.b[s+2]=0;o.b[s+3]=0;o.b[s+4]=0;o.b[s+5]=0;o.b[s+6]=0;o.b[s+7]=0;f+=7;break;}
 p++;}} o.wtm = tok[1] == 'w'; o.castling = 0; for (var i = 0; i < tok[2].length; i++) { if (tok[2].charAt(i) == 'K') o.castling |= 1; if (tok[2].charAt(i) == 'Q') o.castling |= 2;
 if (tok[2].charAt(i) == 'k') o.castling |= 4; if (tok[2].charAt(i) == 'q') o.castling |= 8;}
 switch(tok[3].charAt(0)) {case 'a': o.ep=16;break;case 'b': o.ep=17;break;case 'c': o.ep=18;break;case 'd': o.ep=19;break;case 'e': o.ep=20;break;case 'f': o.ep=21;break;case 'g': o.ep=22;break;case 'h': o.ep=23;break;default:o.ep=0;}
 if (o.ep>0&&o.wtm) o.ep+=24; o.halfmovecounter = tok.length>4?eval(tok[4]):0; o.pliesplayed = (tok.length>5?2*eval(tok[5]):2) - (o.wtm ? 2 : 1); o.lastmove = 0; o.lastmovetext = null;} catch (e) {} o.PositionChanged();} Position.prototype.SetFEN = Position_SetFEN;

var fenpiecechars = "1KQRBNPkqrbnp";

function Position_GetFEN() {
	var r,f,R="";
	for (r = 7; r >= 0; r--) {
		for (f = 0; f <= 7; f++) {
			 if (this.b[r*8+f] == 0) {
			 		var em = 1;
			 		f++;
			 		while (f <= 7 && this.b[r*8+f] == 0) {
			 			f++;
			 			em++;
			 		}
			 		R += em;
			 		f--;
				}
			else 
	 		 R += fenpiecechars.charAt(this.b[r*8+f]);
			}
		if (r > 0) R += "/";
	}
	R += this.wtm ? " w " : " b ";
	var c = "";
	if ((this.castling & 1) == 1) c += "K";
	if ((this.castling & 2) == 2) c += "Q";
	if ((this.castling & 4) == 4) c += "k";
	if ((this.castling & 8) == 8) c += "q";
	if ( c == "" ) c = "-";
	var eptext = '-';
	if (this.ep > 0) {f=this.ep&7;switch(f) {case 0:eptext='a';break;case 1:eptext='b';break;case 2:eptext='c';break;case 3:eptext='d';break;case 4:eptext='e';break;case 5:eptext='f';break;case 6:eptext='g';break;case 7:eptext='h';break;} eptext += this.wtm?'6':'3';}
	return R + c + ' '+eptext+' ' +this.halfmovecounter + " " + (Math.floor(this.pliesplayed/2)+1);
}

Position.prototype.GetFEN = Position_GetFEN;

function Position_MakeMove(f,t,p) {
 var o=this,c=o.castling; if (o.makemovetext) {o.lastmovetext=o.GetMoveString(f|(t<<6)|(p<<12));} if (t==o.ep&& o.ep > 0 &&(o.b[f]==6||o.b[f]==12)) {o.b[o.ep+(o.wtm?-8:8)]=0;}o.b[t]=o.b[f]; o.b[f]=0; 
 o.wtm ^= _t; if (((c&1)==1)&&(f==4||t==4||f==7||t==7)) {c ^= 1;}	if (((c&2)==2)&&(f==4||t==4||f==0||t==0)) {c ^= 2;}
 if (((c&4)==4)&&(f==60||t==60||f==63||t==63)) {c ^= 4;} if (((c&8)==8)&&(f==60||t==60||f==56||t==56)) {c ^= 8;} o.castling = c;
 if (o.b[t]==1&&f==4&&t==2) {o.b[0]=0; o.b[3]=3; } if (o.b[t]==1&&f==4&&t==6) {o.b[7]=0; o.b[5]=3; } if (o.b[t]==7&&f==60&&t==58) {o.b[56]=0; o.b[59]=9; }
 if (o.b[t]==7&&f==60&&t==62) {o.b[63]=0; o.b[61]=9;} if (p!=0) {o.b[t]=p;} if ((o.b[t]==6||o.b[t]==12)&&Math.abs(f-t)==16)	o.ep = (f+t)/2;	else o.ep = 0; 
 if (o.ep>0) {if ((o.wtm&&((((t&7)>0)&&o.b[t-1]==6)||(((t&7)<7)&& o.b[t+1]==6)))||(!o.wtm&&((((t&7)>0)&&o.b[t-1]==12)||(((t&7)<7)&&o.b[t+1]==12)))); else o.ep=0;}
 o.pliesplayed++; o.lastmove=(f|(t<<6)|(p<<12)); o.PositionChanged();} Position.prototype.MakeMove = Position_MakeMove;

function Position_PositionChanged() {this.moves=null;for (var i = 0; i < this.listeners.length; i++)	this.listeners[i].PositionChanged(this);} Position.prototype.PositionChanged = Position_PositionChanged;

function Position_AddListener(listener) {	this.listeners.push(listener);} Position.prototype.AddListener = Position_AddListener;

function Position_NumberOfPieces() { var r = 0; for (var i = 0; i < 64; i++) if (this.b[i] > 0) r++; return r; } Position.prototype.NumberOfPieces = Position_NumberOfPieces;

function Position_GetMoves() {if (this.moves!=null)return this.moves; this.moves = MG.FindMoves(this);return this.moves;} Position.prototype.GetMoves = Position_GetMoves;

function Position_InCheck() {
	var wkpos = -1, bkpos = -1;
	for (var i = 0; i < 64; i++) {
		if (this.b[i] == 1) wkpos = i;
		else if (this.b[i] == 7) bkpos = i;
	}
	
	return (MG.IAS(this,this.wtm ? wkpos : bkpos,_t));
} Position.prototype.InCheck = Position_InCheck;

function Position_IsValid(doSetupTesting) {
	// TODO integritaetstest fuer ep und 0-0 / 0-0-0
	var wkpos = -1, bkpos = -1;
	for (var i = 0; i < 64; i++) {
		if (this.b[i] == 1) 
			if (wkpos >= 0)
				return _f;
			else
				wkpos = i;
		else 
			if (this.b[i] == 7) 
				if (bkpos >= 0)
					return _f;
				else
					bkpos = i;
	}
	if (wkpos == -1 || bkpos == -1) 
		return _f;

	if (MG.IAS(this,this.wtm ? bkpos : wkpos, _f))
		return _f;
	
	if (doSetupTesting) {
		var numberOfPieces = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
		for (var i = 0; i < 64; i++)
			numberOfPieces[this.b[i]]++;
		if (numberOfPieces[2] > 9 ||
			numberOfPieces[3] > 10 ||
			numberOfPieces[4] > 10 ||
			numberOfPieces[5] > 10 ||
			numberOfPieces[6] > 8 ||
			numberOfPieces[8] > 9 ||
			numberOfPieces[9] > 10 ||
			numberOfPieces[10] > 10 ||
			numberOfPieces[11] > 10 ||
			numberOfPieces[12] > 8
		)
			return _f;
			
		var forcedPromotionW = 0;
		if (numberOfPieces[2] > 1) forcedPromotionW += numberOfPieces[2] - 1;
		if (numberOfPieces[3] > 2) forcedPromotionW += numberOfPieces[3] - 2;
		if (numberOfPieces[4] > 2) forcedPromotionW += numberOfPieces[4] - 2;
		if (numberOfPieces[5] > 2) forcedPromotionW += numberOfPieces[5] - 2;
		if (numberOfPieces[6] + forcedPromotionW > 8)
			return _f;
		var forcedPromotionB = 0;
		if (numberOfPieces[8] > 1) forcedPromotionB += numberOfPieces[8] - 1;
		if (numberOfPieces[9] > 2) forcedPromotionB += numberOfPieces[9] - 2;
		if (numberOfPieces[10] > 2) forcedPromotionB += numberOfPieces[10] - 2;
		if (numberOfPieces[11] > 2) forcedPromotionB += numberOfPieces[11] - 2;
		if (numberOfPieces[12] + forcedPromotionB > 8)
			return _f;
		for (var i = 0; i <= 7; i++) {
			if (this.b[i] == 6 || 
				this.b[i] == 12 ||
				this.b[i+56] == 6 ||
				this.b[i+56] == 12)
				return _f;
		}
		if (numberOfPieces[1] + 
			numberOfPieces[2] + 
			numberOfPieces[3]+ 
			numberOfPieces[4] + 
			numberOfPieces[5]+ 
			numberOfPieces[6] > 16)
			return _f;
		if (numberOfPieces[7] + 
				numberOfPieces[8] + 
				numberOfPieces[9]+ 
				numberOfPieces[10] + 
				numberOfPieces[11]+ 
				numberOfPieces[12] > 16)
				return _f;
	}
	
	return _t;
}
	
Position.prototype.IsValid = Position_IsValid;

function Position_InsuffMaterial() {
		var numlights = 0;
		for (var i = 0; i < 64; i++) {
			if (this.b[i]==2 || this.b[i]==3 || this.b[i]==6 || this.b[i]==8 || this.b[i]==9 || this.b[i]==12) return false;
			if (this.b[i]==4 || this.b[i]==5 || this.b[i]==10 || this.b[i]==11) {numlights++; if (numlights > 1) return false;}
		}
	return true;	
}

Position.prototype.InsuffMaterial = Position_InsuffMaterial;
	
function Position_GetMoveString(move) {
	if (move == 0) return "";
	var from = move & 63;
	var fromrank = from >> 3;
	var fromfile = from & 7;
	var to = (move >> 6 ) & 63;
	var ispromotion = ((move >> 12) & 63 ) > 0;
	var piece = this.b[from];
	var isep = (piece == 6 || piece == 12) && (fromfile != (to&7)) && (this.b[to] == 0); 
	var iscapture = (this.b[to] != 0) || isep;
	var set = this.GetMoves();
	var countEqualFile = 0;
	var countEqualRank = 0;
	var countOtherPieces = 0;

	for (var i = 0; i < set.length; i++) {
		var m = set[i];
		
		if (((m>>6)&63) == to && this.b[m&63] == piece && (m&63) != from) {
			countOtherPieces ++;
			var rank = (m&63) >> 3;
			var file = (m&63) & 7;
			if (rank == fromrank) countEqualRank++;
			if (file == fromfile) countEqualFile++;
		}
	}
	
	var result = "";
	var castling = false;
	
	if (piece == 1 && from == 4 && to == 6) {
		result += "O-O";
		castling = true;
	}
	else if (piece == 1 && from == 4 && to == 2) {
		result += "O-O-O";
		castling = true;
	}
	else if (piece == 7 && from == 60 && to == 62) {
		result += "O-O";
		castling = true;
	}
	else if (piece == 7 && from == 60 && to == 58) {
		result += "O-O-O";
		castling = true;
	}

	if (!castling) {
		result += this.piececodes[piece];
		
		if (countOtherPieces != 0 && !(piece == 6 || piece == 12)) { // nicht eindeutig
			if (countEqualFile == 0) { // Linie reicht
				result += SQ.names[from].charAt(0);
			}
			else if (countEqualRank == 0) { // Reihe reicht
				result += SQ.names[from].charAt(1);
			}
			else { // komplettes Startfeld noetig
				result += SQ.names[from];
			}
		}

     if (iscapture) {
		    if (piece == 6 || piece == 12) {
		        result += SQ.names[from].charAt(0);
		        countOtherPieces = 0; // schon eindeutig!
		    }
		    result += "x";
		}
		result += SQ.names[to];
		//if (isep) result += " e.p.";
	}
	if (ispromotion) {
		result += "("+this.piececodes[(move>>12)&63]+")";
	}
	return result;
} Position.prototype.GetMoveString = Position_GetMoveString;















function Board(sqsize, darkcolor, lightcolor, posx, posy) {
	this.sqsize = sqsize;
	this.darkcolor = darkcolor;
	this.lightcolor = lightcolor;
	this.posx = posx;
	this.posy = posy;
	this.currentpieces = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	this.boardid = Objectmap.Add("b",this);
	this.liftedpiece=0;
	this.liftedfrom=0;
	this.promoshown=new Array();
	this.inputenabled=_t;
	this.position = null;
	this.whiteonbottom=true;
	this.hasmarked = _f;
	this.hashint = _f;
	this.setuptable = null;
	this.allowfreemoving = _f;
	this.lastclick = -1;
	this.acceptclick = _f;
	this.acceptdrag = _t;
	this.hascoords = _t;
	this.hasmoveindicators = _t;
	this.bordercolor = 'rgb(207,213,223)';
	var d = this.GetDivElement();	
	document.getElementsByTagName("body")[0].appendChild(d);
}

function Board_SetDragging(dragging) {
  this.acceptdrag = dragging;
  this.acceptclick = !dragging;
}
Board.prototype.SetDragging = Board_SetDragging;

function Board_GetDivElement() {
	var d = document.createElement("div");
	d.id = this.boardid;
	d.style.visibility = 'hidden';
	d.style.position = 'absolute';
	d.style.left = this.posx + "px";
	d.style.top = this.posy + "px";
	var result = "";
	var i;
	for (i = 0; i < 64; i++) {
		var f = i & 7; 
		var r = i >> 3;
		var le = f * this.sqsize;
		var to = (7-r) * this.sqsize;
		var col = ((r % 2) == (f % 2)) ? this.darkcolor : this.lightcolor;
		var sqid = this.boardid+"_"+i;
		result += "<div id=\""+sqid+"\" style=\"position:absolute;left:"+le+"px;top:"+to+"px;width:"+this.sqsize+"px;height:"+this.sqsize+"px;background-color:"+col+";\" onmousedown=\"Board.Mousedown(event,this);\" onmouseup=\"Board.Mouseup(event,this);\" onmousemove=\"Board.Mousemove(event,this);\" ></div>\n";
	}
	result += "<div id=\""+this.boardid+"_dr\" style=\"position:absolute;left:"+0+"px;top:"+0+"px;visibility:hidden;\" onmousedown=\"Board.Mousedown(event,this);\" onmousemove=\"Board.Mousemove(event,this);\" onmouseup=\"Board.Mouseup(event,this);\"><img src=\""+piecegraphics[0]+"\" ></div>\n";	
	result += '<div id="'+this.boardid+'_pro0" style="position:absolute;left:0px;top:0px;width:'+this.sqsize+'px;height:'+this.sqsize+'px;visibility:hidden;" onmousemove=\"Board.Mousemove(event,this);\" onmouseup=\"Board.Mouseup(event,this);\"> </div>';
	result += '<div id="'+this.boardid+'_pro1" style="position:absolute;left:0px;top:0px;width:'+this.sqsize+'px;height:'+this.sqsize+'px;visibility:hidden;" onmousemove=\"Board.Mousemove(event,this);\" onmouseup=\"Board.Mouseup(event,this);\"> </div>';
	result += '<div id="'+this.boardid+'_pro2" style="position:absolute;left:0px;top:0px;width:'+this.sqsize+'px;height:'+this.sqsize+'px;visibility:hidden;" onmousemove=\"Board.Mousemove(event,this);\" onmouseup=\"Board.Mouseup(event,this);\"> </div>';
   
  if (this.hasmoveindicators) {
	 result += '<div id="'+this.boardid+'_miw" style="position:absolute;left:'+(this.sqsize*8+20)+'px;top:'+(this.sqsize*7)+'px;width:'+this.sqsize+'px;height:'+this.sqsize+'px;visibility:visible;" onmousedown=\"Board.Mousedownmoveind(event,this);\"><img src="'+moveindicatorgraphics[0]+'"></div>';
	 result += '<div id="'+this.boardid+'_mib" style="position:absolute;left:'+(this.sqsize*8+20)+'px;top:'+(0)+'px;width:'+this.sqsize+'px;height:'+this.sqsize+'px;visibility:visible;" onmousedown=\"Board.Mousedownmoveind(event,this);\"><img src="'+moveindicatorgraphics[2]+'"></div>';
  }
  if (this.hascoords) {
   var ls = new Array('a','b','c','d','e','f','g','h');
	 var letters='<div id="'+this.boardid+'_lettersbottom" style="position:absolute;left:0px;top:'+(8*this.sqsize)+'px;width:'+(8*this.sqsize)+'px;"><table border="0" cellpadding="0" cellspacing="0"><tr height="'+(20)+'px">';
	 for (var i=0;i<8;i++)
		 letters += '<td width="'+this.sqsize+'px" style="color:rgb(81,89,106);font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'+(this.sqsize>30?'font-weight:bold;':'')+'vertical-align:middle;text-align:center;">'+ls[i]+'</td>';
	 letters += '</tr></table></div>\n';
	 letters += '<div id="'+this.boardid+'_lettersbottominv" style="visibility:hidden;position:absolute;left:0px;top:'+(8*this.sqsize)+'px;width:'+(8*this.sqsize)+'px;"><table border="0px" cellpadding="0px" cellspacing="0px"><tr height="'+(20)+'px">';
	 for (var i=0;i<8;i++)
		 letters += '<td width="'+this.sqsize+'px" style="color:rgb(81,89,106);font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'+(this.sqsize>30?'font-weight:bold;':'')+'vertical-align:middle;text-align:center;">'+ls[7-i]+'</td>';
	 letters += '</tr></table></div>\n';
	
	 letters += '<div id="'+this.boardid+'_numbersright" style="position:absolute;left:'+(8*this.sqsize)+'px;top:0px;height:'+(8*this.sqsize)+'px;width:'+(20)+'px;"><table border="0px" cellpadding="0px" cellspacing="0px">';
	 for (var i=0;i<8;i++)
		 letters += '<tr height="'+this.sqsize+'"><td width="'+(20)+'px" height="'+this.sqsize+'px" style="color:rgb(81,89,106);font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'+(this.sqsize>30?'font-weight:bold;':'')+'vertical-align:middle;text-align:center;">'+(8-i)+'</td></tr>';
	 letters += '</table></div>\n';

	 letters += '<div id="'+this.boardid+'_numbersrightinv" style="visibility:hidden;position:absolute;left:'+(8*this.sqsize)+'px;top:0px;height:'+(8*this.sqsize)+'px;width:'+(20)+'px;"><table border="0px" cellpadding="0px" cellspacing="0px">';
	 for (var i=0;i<8;i++)
 		 letters += '<tr height="'+this.sqsize+'px"><td width="'+(20)+'px" height="'+this.sqsize+'px" style="color:rgb(81,89,106);font-family:verdana,arial,helvetica,sans-serif;font-size:11px;'+(this.sqsize>30?'font-weight:bold;':'')+'vertical-align:middle;text-align:center;">'+(1+i)+'</td></tr>';
	 letters += '</table></div>\n';

   result += letters;
  }
	d.innerHTML = result;
	return d;
}

Board.prototype.GetDivElement = Board_GetDivElement;

function Board_SetPieceAt(s,p) {
	if (this.currentpieces[s] == p) return;
	document.getElementById(this.boardid+"_"+s).innerHTML = "<img src=\""+piecegraphics[p]+"\">";
	this.currentpieces[s] = p;
}
Board.prototype.SetPieceAt = Board_SetPieceAt;


function Board_Mousedownmoveind(ev, ob) {
	var o = Objectmap.Get(ob.id.split('_')[0]);
	var c = ob.id.split('_')[1];
	if (o.setuptable == null) return;
	if (c == 'miw') {
		if (o.position.wtm == _t) return;
		o.position.wtm = true;
	  o.position.ClearHistory(_t,_t);
	  o.position.PositionChanged();
	}
	else if (c == 'mib') {
		if (o.position.wtm == _f) return;
		o.position.wtm = false;
	  o.position.ClearHistory(_t,_t);
	  o.position.PositionChanged();	
	 }
}
Board.Mousedownmoveind = Board_Mousedownmoveind;


function Board_Mousedown(ev, ob) {
	var o = Objectmap.Get(ob.id.split('_')[0]);
	
	if (o.acceptdrag) {
	  o.UnmarkAll();
	}
	
	if (!o.inputenabled||o.position==null) { return;}
	if (o.liftedpiece != 0)  { return;}

	if (o.acceptclick) {
	  o.UnmarkAll();
	}

	var sq = eval(ob.id.split('_')[1]);

	if (o.setuptable != null && o.setuptable.IsSetupMode()) {
		var old = o.position.b[sq];
		if (old == o.setuptable.selEctedpiece && old != 0)	
			o.position.b[sq] = old < 7 ?  old+6 : old-6;
		else if (((old == o.setuptable.selectedpiece+6) || (old == o.setuptable.selectedpiece-6))&& old != 0)	
			o.position.b[sq] = 0;
		else {
			if ((sq < 8 || sq >= 56) && (o.setuptable.selectedpiece == 6 || o.setuptable.selectedpiece == 12)) return; 
			if (o.setuptable.selectedpiece == 1) {
				for (var i=0; i<64;i++) if (o.position.b[i]==1) o.position.b[i]=0;
			}
			else if (o.setuptable.selectedpiece == 7) {
				for (var i=0; i<64;i++) if (o.position.b[i]==7) o.position.b[i]=0;
			}
			o.position.b[sq] = o.setuptable.selectedpiece;
		}	
		o.position.ClearHistory(_f);
		o.position.PositionChanged();
		
		return;
	}
	
	if (o.acceptclick && sq == o.lastclick && sq >= 0 ) {
		o.lastclick = -1;
		if (o.liftedpiece > 0) {
		 document.getElementById(o.boardid+"_dr").style.visibility = "hidden";
		 o.SetPieceAt(o.liftedfrom,o.liftedpiece);
		 o.liftedpiece = 0;
		 o.HidePromos();
		}
		return;
	}

	var set = o.position.GetMoves();
		 
	var moveable = false;
	var promosq = new Array();
	if (o.allowfreemoving==_f) {
		for (var i = 0; i < set.length; i++) {
			if ((set[i]&63) == sq) { o.MarkSquare((set[i]>>6)&63); moveable = true; if(((set[i]>>12)&63)>0) promosq.push((set[i]>>6)&63);}
		}	
	}
	else {
		if (sq >=48 && o.position.b[sq] == 6) {if (o.position.b[sq+8] == 0) promosq.push(sq+8); if (sq != 48 && o.position.b[sq+7] > 6) promosq.push(sq+7);if (sq != 55 && o.position.b[sq+9] > 6) promosq.push(sq+9); }
		if (sq <=15 && o.position.b[sq] == 12) {if (o.position.b[sq-8] == 0)promosq.push(sq-8); if (sq != 8 && o.position.b[sq-9] > 0 && o.position.b[sq-9] < 7) promosq.push(sq-9);if (sq != 15 && o.position.b[sq-7] > 0 && o.position.b[sq-7] < 7) promosq.push(sq-7); }
		if (o.position.b[sq] > 0) moveable = true;
		for (var i = 0; i < set.length; i++) {
			if ((set[i]&63) == sq) { o.MarkSquare((set[i]>>6)&63);}
		}	
	}
	if (promosq.length>0) {promosq.sort();for(var i=1;i<promosq.length;i++) if (promosq[i]==promosq[i-1]){promosq.splice(i,1);i--;}  }

	if (!moveable) return;

  if (o.acceptclick) {
    o.MarkSquare(sq);
  }

	o.liftedpiece=o.position.b[sq];
	o.liftedfrom=sq;

	var el = o.boardid+"_"+sq;
	var eldr = o.boardid+"_dr";

	o.SetPieceAt(sq,0);
	document.getElementById(eldr).innerHTML = "<img src=\""+piecegraphics[o.liftedpiece]+"\">";
 
  var x;
  var y;
  if (o.acceptclick) {
    document.getElementById(eldr).style.left = document.getElementById(el).style.left;
 	  document.getElementById(eldr).style.top = document.getElementById(el).style.top;
  }
  else {
 	  var x = ev.clientX - document.getElementById(o.boardid).offsetLeft + scrollOffsetX();
	  var y = ev.clientY - document.getElementById(o.boardid).offsetTop + scrollOffsetY();
	  document.getElementById(eldr).style.left = x - o.sqsize/2 + "px";
 	  document.getElementById(eldr).style.top = y - o.sqsize/2 + "px";
 	}

	document.getElementById(eldr).style.visibility = 'visible';
	
	if (o.promoshown.length>0)o.promoshown.splice(0,o.promoshown.length);	
	for (var i=0;i<promosq.length;i++) {
		document.getElementById(o.boardid+"_pro"+i).innerHTML = "<img src=\""+(promosq[i]<8?promobgraphics:promowgraphics)+"\">";
		document.getElementById(o.boardid+"_pro"+i).style.left = document.getElementById(o.boardid+"_"+promosq[i]).style.left;
		document.getElementById(o.boardid+"_pro"+i).style.top = document.getElementById(o.boardid+"_"+promosq[i]).style.top;
		
		document.getElementById(o.boardid+"_pro"+i).style.visibility = 'visible';
		o.promoshown.push(promosq[i]);
	}			
}
Board.Mousedown = Board_Mousedown;






function Board_Mousemove(ev,ob) {
	var o = Objectmap.Get(ob.id.split('_')[0]);
	if (!o.inputenabled||o.position==null) return;
	if (o.liftedpiece == 0) return;
	
	if (o.acceptdrag == _f) return;
	
//	var sq = eval(ob.id.split('_')[1]);
		
	var x = ev.clientX - document.getElementById(o.boardid).offsetLeft - o.sqsize/2 +scrollOffsetX();
	var y = ev.clientY - document.getElementById(o.boardid).offsetTop - o.sqsize/2 +scrollOffsetY();
	
	if (x +o.sqsize/2 >= 8 * o.sqsize || x+o.sqsize/2 <= 0 || y+o.sqsize/2 <= 0 || y+o.sqsize/2 >= 8*o.sqsize) {
		document.getElementById(o.boardid+"_dr").style.visibility = "hidden";
		o.SetPieceAt(o.liftedfrom,o.liftedpiece);
		o.liftedpiece = 0;
		o.HidePromos();
		o.UnmarkAll();
		return;

	}
	
	document.getElementById(o.boardid+"_dr").style.left = x + "px";
	document.getElementById(o.boardid+"_dr").style.top = y + "px";
}
Board.Mousemove = Board_Mousemove;










function Board_Mouseup(ev, ob) {
	var o = Objectmap.Get(ob.id.split('_')[0]);
	if (!o.inputenabled||o.position==null) return;
	if (o.liftedpiece == 0) return;
	
	if (o.acceptdrag) {
	 o.UnmarkAll();
	 document.getElementById(o.boardid+"_dr").style.visibility = 'hidden';
  }


	var s = ob.id.split('_')[1];

	var promo=0;
	if (s.indexOf('pro') >= 0) {
		s = 'dr';
		var x = (ev.clientX - document.getElementById(o.boardid).offsetLeft+scrollOffsetX())%o.sqsize;
		var y = (ev.clientY - document.getElementById(o.boardid).offsetTop+scrollOffsetY())%o.sqsize;
		x *= 2; y *= 2;
		promo = x > o.sqsize ? (y > o.sqsize ? 5 : 3 ) : (y > o.sqsize ? 4 : 2);
		if (o.liftedpiece > 6)promo += 6;
	}

		if (s == 'dr') {
			var x = ev.clientX - document.getElementById(o.boardid).offsetLeft+scrollOffsetX();
			var y = ev.clientY - document.getElementById(o.boardid).offsetTop+scrollOffsetY();
			s = o.GetClicksquare(x,y);
		}
		s = eval(s);

  if (s != o.liftedfrom && o.acceptclick) {    
    o.UnmarkAll();
	 document.getElementById(o.boardid+"_dr").style.visibility = 'hidden';
  }
  if (s == o.liftedfrom && o.acceptclick) {
    return;
  }

  o.HidePromos();
 	
 	if (o.allowfreemoving==_t) {
		if (o.liftedfrom != s) {
			if ((s >= 56 && o.liftedpiece == 12) || (s <= 7 && o.liftedpiece == 6)) {  o.SetPieceAt(o.liftedfrom,o.liftedpiece); o.liftedpiece = 0; return; }
			if (s >= 56 && o.liftedpiece == 6 && promo == 0) promo = 2;
			else if (s <= 7 && o.liftedpiece == 12 && promo == 0) promo = 8;
			
			var set = o.position.GetMoves();
			var islegal = false;
			for (var i = 0; i < set.length; i++) {
				if ((set[i]&63) == o.liftedfrom && ((set[i]>>6)&63) == s) islegal = true;
			}

			if (!islegal) {o.position.wtm ^= true;}			
			o.position.MakeMove(o.liftedfrom, s, promo);
			o.position.ClearHistory(_t,_f);
		}
		else
			o.SetPieceAt(o.liftedfrom,o.liftedpiece);
 		o.liftedpiece = 0;
 		return;
 	}
 	
 	var set =o.position.GetMoves();
 	for (var i = 0; i < set.length; i++) {
 		if ((set[i]&63)==o.liftedfrom&&((set[i]>>6)&63)==s) {
	  	o.position.MakeMove(o.liftedfrom, s, promo);
	  	o.liftedpiece = 0;
	  	return;
 		}
 	} 
	o.SetPieceAt(o.liftedfrom,o.liftedpiece);
  o.liftedpiece = 0;
}
Board.Mouseup = Board_Mouseup;


function Board_GetClicksquare(x,y) {
	return this.whiteonbottom ? (Math.floor(x/this.sqsize) + (7 - Math.floor(y/this.sqsize)) * 8) : (7 - Math.floor(x/this.sqsize) + Math.floor(y/this.sqsize) * 8);
}
Board.prototype.GetClicksquare = Board_GetClicksquare;

function Board_HidePromos() {
	for (var i=0;i<this.promoshown.length;i++) try{
		document.getElementById(this.boardid+"_pro"+i).style.visibility = 'hidden';
	} catch (ex) {}
	this.promoshown.splice(0,this.promoshown.length);	
}
Board.prototype.HidePromos = Board_HidePromos;


function Board_SetRefPosition(pos) {
	this.position=pos;
}
Board.prototype.SetRefPosition = Board_SetRefPosition;

function Board_SetPosition(pos) {
	for (var i = 0; i < 64; i++) {
	//	var el = this.boardid+"_"+i;
	//	document.getElementById(el).innerHTML = "<img src=\""+piecegraphics[pos.b[i]]+"\">";
			this.SetPieceAt(i,pos.b[i]);
	}
	if (this.hasmoveindicators) {
	 document.getElementById(this.boardid+'_miw').innerHTML = "<img src=\""+moveindicatorgraphics[pos.wtm?1:0]+"\">";
	 document.getElementById(this.boardid+'_mib').innerHTML = "<img src=\""+moveindicatorgraphics[pos.wtm?2:3]+"\">";
	}
}

Board.prototype.SetPosition = Board_SetPosition;

function Board_SetVisible(b) {
	document.getElementById(this.boardid).style.visibility = b ? 'visible' : 'hidden';
}
Board.prototype.SetVisible = Board_SetVisible;


function Board_MarkSquare(sq) {
	var f = sq & 7;
	var r = sq >> 3;
	var col = ((r % 2) == (f % 2)) ? "rgb(146,174,221)" : "rgb(198,221,255)";
	document.getElementById(this.boardid+"_"+sq).style.background = col;
	this.hasmarked = _t;
}

Board.prototype.MarkSquare = Board_MarkSquare;

function Board_UnmarkSquare(sq) {
	var f = sq & 7;
	var r = sq >> 3;
	var col = ((r % 2) == (f % 2)) ? this.darkcolor : this.lightcolor;
	document.getElementById(this.boardid+"_"+sq).style.background = col;
}

Board.prototype.UnmarkSquare = Board_UnmarkSquare;

function Board_UnmarkAll() {
	if (this.hasmarked == _f) return;
	for (var i=0;i<64;i++) this.UnmarkSquare(i);
	this.hasmarked = false;
}

Board.prototype.UnmarkAll = Board_UnmarkAll;

function Board_PositionChanged(pos) {
	this.SetPosition(pos);
	this.UnmarkAll();
	this.hashint = _f;
}

Board.prototype.PositionChanged = Board_PositionChanged;


function Board_Flip() {
	for (var i=0;i<32;i++) {
		var l = document.getElementById(this.boardid+"_"+i).style.left;
		var t = document.getElementById(this.boardid+"_"+i).style.top;
		document.getElementById(this.boardid+"_"+i).style.left = document.getElementById(this.boardid+"_"+(63-i)).style.left;
		document.getElementById(this.boardid+"_"+i).style.top = document.getElementById(this.boardid+"_"+(63-i)).style.top;
		document.getElementById(this.boardid+"_"+(63-i)).style.left = l;
		document.getElementById(this.boardid+"_"+(63-i)).style.top = t;
	}
	if (this.hasmoveindicators) {
	 var l = document.getElementById(this.boardid+"_mib").style.left;
	 var t = document.getElementById(this.boardid+"_mib").style.top;
	 document.getElementById(this.boardid+"_mib").style.left = document.getElementById(this.boardid+"_miw").style.left;
	 document.getElementById(this.boardid+"_mib").style.top = document.getElementById(this.boardid+"_miw").style.top;
	 document.getElementById(this.boardid+"_miw").style.left = l;
	 document.getElementById(this.boardid+"_miw").style.top = t;
	}
	this.whiteonbottom ^= true;
	if (this.hascoords) {
	 document.getElementById(this.boardid+"_lettersbottom").style.visibility = this.whiteonbottom ? 'visible' : 'hidden';
	 document.getElementById(this.boardid+"_lettersbottominv").style.visibility = this.whiteonbottom ? 'hidden' : 'visible';
	 document.getElementById(this.boardid+"_numbersright").style.visibility = this.whiteonbottom ? 'visible' : 'hidden';
	 document.getElementById(this.boardid+"_numbersrightinv").style.visibility = this.whiteonbottom ? 'hidden' : 'visible';
	}
}
Board.prototype.Flip = Board_Flip;




























function SQ() {}
function SQ_ILB(s) {return (s&7)==0;} SQ.ILB = SQ_ILB;
function SQ_IRB(s) {return ((~(s))&7)==0;} SQ.IRB = SQ_IRB;
function SQ_IBB(s) {return ((s)&120)==0;} SQ.IBB = SQ_IBB;
function SQ_ITB(s) {return ((~(s))&56) == 0;} SQ.ITB = SQ_ITB;
SQ.names = new Array('a1','b1','c1','d1','e1','f1','g1','h1','a2','b2','c2','d2','e2','f2','g2','h2','a3','b3','c3','d3','e3','f3','g3','h3','a4','b4','c4','d4','e4','f4','g4','h4','a5','b5','c5','d5','e5','f5','g5','h5','a6','b6','c6','d6','e6','f6','g6','h6','a7','b7','c7','d7','e7','f7','g7','h7','a8','b8','c8','d8','e8','f8','g8','h8');

function MG () {}
function MG_TML(s,n,b,w,S) {return !(SQ.ILB(s-n))&&MG.TMAST(s,s-1-n,b,w,S,s-1-n);} MG.TML = MG_TML;
function MG_TMR(s,n,b,w,S) {return !(SQ.IRB(s+n))&&MG.TMAST(s,s+1+n,b,w,S,s+1+n);} MG.TMR = MG_TMR;
function MG_TMD(s,n,b,w,S) {return !(SQ.IBB(s-8*n))&&MG.TMAST(s,s-8-8*n,b,w,S,s-8-8*n);} MG.TMD = MG_TMD;
function MG_TMU(s,n,b,w,S) {return !(SQ.ITB(s+8*n))&&MG.TMAST(s,s+8+8*n,b,w,S,s+8+8*n);} MG.TMU = MG_TMU;
function MG_TMUL(s,n,b,w,S) {return !(SQ.ITB(s+7*n) || SQ.ILB(s+7*n))&&MG.TMAST(s,s+7+7*n,b,w,S,s+7+7*n);} MG.TMUL = MG_TMUL;
function MG_TMUR(s,n,b,w,S) {return !(SQ.ITB(s+9*n) || SQ.IRB(s+9*n))&&MG.TMAST(s,s+9+9*n,b,w,S,s+9+9*n);} MG.TMUR = MG_TMUR;
function MG_TMDL(s,n,b,w,S) {return !(SQ.IBB(s-9*n) || SQ.ILB(s-9*n))&&MG.TMAST(s,s-9-9*n,b,w,S,s-9-9*n);} MG.TMDL = MG_TMDL;
function MG_TMDR(s,n,b,w,S) {return !(SQ.IBB(s-7*n) || SQ.IRB(s-7*n))&&MG.TMAST(s,s-7-7*n,b,w,S,s-7-7*n);} MG.TMDR = MG_TMDR;
function MG_TKM(f,d,D,b,w,S) {
 var t=(f&7)+d,T=(f>>3)+D;	if (t< 0||t>7||T< 0||T>7) return; var x=T*8+t; if (b[x]==0) {S.push(f|(x<<6)); return;}
 if (w&&(b[x]>=7)) S.push(f|(x<<6)); else if ((!w)&&b[x]>=0&&b[x]<=6) S.push(f|(x<<6));} MG.TKM = MG_TKM;
function MG_TPM(f,b,w,e,S) {
 var F=f>>3; if (w) {if (b[f+8]==0) {if (F<6) {S.push(f|((f+8)<<6));if (F==1&&b[f+16]==0) S.push(f|((f+16)<<6));} else {var t=f|((f+8)<<6);S.push(t|(2<<12),t|(3<<12),t|(4<<12),t|(5<<12));}}
 if (!SQ.ILB(f)&&b[f+7]>=7) {if (F<6) S.push(f|((f+7)<<6)); else {var t=f|((f+7)<<6);S.push(t|(2<<12),t|(3<<12),t|(4<<12),t|(5<<12));}}
 if (!SQ.IRB(f)&&b[f+9]>=7) {if (F<6) S.push(f|((f+9)<<6)); else {var t=f|((f+9)<<6);S.push(t|(2<<12),t|(3<<12),t|(4<<12),t|(5<<12));}}
 if (e>0) {if (!SQ.ILB(f)&&f+7==e) S.push(f|((f+7)<<6)); if (!SQ.IRB(f)&&f+9==e) S.push(f|((f+9)<<6));}} else {
 if (b[f-8]==0) {if (F>1) {S.push(f|((f-8)<<6));if (F==6&&b[f-16]==0) S.push(f|((f-16)<<6));} else {var t=f|((f-8)<<6);S.push(t|(8<<12),t|(9<<12),t|(10<<12),t|(11<<12));}}
 if (!SQ.ILB(f)&&b[f-9]>0&&b[f-9]<=6) {if (F>1) S.push(f|((f-9)<<6)); else {var t=f|((f-9)<<6);S.push(t|(8<<12),t|(9<<12),t|(10<<12),t|(11<<12));}}
 if (!SQ.IRB(f)&&b[f-7]>=1&&b[f-7]<=6) {if (F>1) S.push(f|((f-7)<<6)); else {var t=f|((f-7)<<6);S.push(t|(8<<12),t|(9<<12),t|(10<<12),t|(11<<12));}}
 if (e>0) {if (!SQ.ILB(f)&&f-9==e) S.push(f|((f-9)<<6)); if (!SQ.IRB(f)&&f-7==e) S.push(f|((f-7)<<6));}}} MG.TPM = MG_TPM;
function MG_TMAST(f,t,b,w,S,T) {
 if (b[t]==0) {if (t==T) S.push(f|(t<<6)); return _t;} if (t!=T)	return _f; if (w&&b[t]>=7) S.push(f|(t<<6));	else if ((!w)&&b[t]>0&&b[t]<=6) S.push(f|(t<<6)); return _f;} MG.TMAST = MG_TMAST;
function MG_FindMoves(p) {var S = MG.FPM(p); MG.RIM(S,p); return S;} MG.FindMoves = MG_FindMoves;
function MG_FPM(p) {
 var S=new Array(),b=p.b,i; if (p.wtm) {	for (var s=0; s<64; s++) {switch (b[s]) {case 0: continue; case 1:	MG.TML(s,0,b,_t,S);MG.TMR(s,0,b,_t,S);MG.TMU(s,0,b,_t,S);MG.TMD(s,0,b,_t,S);MG.TMUL(s,0,b,_t,S);MG.TMUR(s,0,b,_t,S);MG.TMDL(s,0,b,_t,S);MG.TMDR(s,0,b,_t,S);	
 if (((p.castling&1)==1)&&b[5]==0&&b[6]==0&&s==4&&b[7]==3)	S.push(s|(6<<6));	if (((p.castling&2)==2)&&b[3]==0&&b[2]==0&&b[1]==0&&s==4&&b[0]==3)S.push(s|(2<<6));break;
 case 2:	i=0;while(MG.TML(s,i++,b,_t,S));i=0;while(MG.TMR(s,i++,b,_t,S));i=0;while(MG.TMU(s,i++,b,_t,S));i=0;while(MG.TMD(s,i++,b,_t,S));
 i=0;while(MG.TMUL(s,i++,b,_t,S));i=0;while(MG.TMUR(s,i++,b,_t,S));i=0;while(MG.TMDL(s,i++,b,_t,S));i=0;while(MG.TMDR(s,i++,b,_t,S));break;
 case 3:	i=0;while(MG.TML(s,i++,b,_t,S));i=0;while(MG.TMR(s,i++,b,_t,S));i=0;while(MG.TMU(s,i++,b,_t,S));i=0;while(MG.TMD(s,i++,b,_t,S));break;
 case 4:	i=0;while(MG.TMUL(s,i++,b,_t,S));i=0;while(MG.TMUR(s,i++,b,_t,S));i=0;while(MG.TMDL(s,i++,b,_t,S));i=0;while(MG.TMDR(s,i++,b,_t,S));break;
 case 5:	MG.TKM(s,1,2,b,_t,S);MG.TKM(s,2,1,b,_t,S);MG.TKM(s,2,-1,b,_t,S);MG.TKM(s,1,-2,b,_t,S);MG.TKM(s,-1,-2,b,_t,S);MG.TKM(s,-2,-1,b,_t,S);MG.TKM(s,-2,1,b,_t,S);MG.TKM(s,-1,2,b,_t,S);break;
 case 6:	MG.TPM(s,b,_t,p.ep,S);break;}}}else {	for (var s=0; s<64; s++) {switch (b[s]) {case 0: continue; case 7: MG.TML(s,0,b,_f,S);MG.TMR(s,0,b,_f,S);MG.TMU(s,0,b,_f,S);MG.TMD(s,0,b,_f,S);MG.TMUL(s,0,b,_f,S);MG.TMUR(s,0,b,_f,S);MG.TMDL(s,0,b,_f,S);MG.TMDR(s,0,b,_f,S);	
 if (((p.castling&4)==4)&&b[61]==0&&b[62]==0&&s==60&&b[63]==9)	S.push(s|(62<<6));if (((p.castling&8)==8)&&b[59]==0&&b[58]==0&&b[57]==0&&s==60&&b[56]==9) S.push(s|(58<<6));break;
 case 8:	i=0;while(MG.TML(s,i++,b,_f,S));i=0;while(MG.TMR(s,i++,b,_f,S));i=0;while(MG.TMU(s,i++,b,_f,S));i=0;while(MG.TMD(s,i++,b,_f,S));i=0;while(MG.TMUL(s,i++,b,_f,S));
 i=0;while(MG.TMUR(s,i++,b,_f,S));i=0;while(MG.TMDL(s,i++,b,_f,S));i=0;while(MG.TMDR(s,i++,b,_f,S));break;
 case 9:	i=0;while(MG.TML(s,i++,b,_f,S));i=0;while(MG.TMR(s,i++,b,_f,S));i=0;while(MG.TMU(s,i++,b,_f,S));i=0; while(MG.TMD(s,i++,b,_f,S));break;
 case 10: i=0; while(MG.TMUL(s,i++,b,_f,S));i=0;while(MG.TMUR(s,i++,b,_f,S));i=0;while(MG.TMDL(s,i++,b,_f,S));i=0;while(MG.TMDR(s,i++,b,_f,S));break;
 case 11: MG.TKM(s,1,2,b,_f,S);MG.TKM(s,2,1,b,_f,S);MG.TKM(s,2,-1,b,_f,S);MG.TKM(s,1,-2,b,_f,S);MG.TKM(s,-1,-2,b,_f,S);MG.TKM(s,-2,-1,b,_f,S);MG.TKM(s,-2,1,b,_f,S);MG.TKM(s,-1,2,b,_f,S);break;
 case 12: MG.TPM(s,b,_f,p.ep,S);	break;}}}return S;} MG.FPM = MG_FPM;
function MG_RIM(S,p) {
 var X = new Position();	for (var i = 0; i < S.length; i++) {X.CopyFrom(p); var c=S[i],f=c&63,t=(c>>6)&63,q=(c>>12)&63,P=p.b[f];
 if (P==1&&f==4) {if (t==6) {X.wtm ^= _t;if (MG.IAS(X,4,_f)||MG.IAS(X,5,_f)) {S.splice(i,1);i--;X.wtm ^= _t;continue;}	X.wtm ^= _t;}
 else if (t==2) {X.wtm ^= _t;if (MG.IAS(X,4,_f)||MG.IAS(X,3,_f)) {S.splice(i,1);i--;X.wtm ^= _t;continue;}	X.wtm ^= _t;}} else if (P==7&&f==60) {
 if (t==62) {X.wtm ^= _t;if (MG.IAS(X,60,_f)||MG.IAS(X,61,_f)) {S.splice(i,1);i--;X.wtm ^= _t;continue;}	X.wtm ^= _t;}
 else if (t==58) {X.wtm ^= _t;	if (MG.IAS(X,60,_f)||MG.IAS(X,59,_f)) {S.splice(i,1);i--;X.wtm ^= _t;continue;} X.wtm ^= _t;}}
 X.MakeMove(f,t,q);if (!X.IsValid(_f)) {S.splice(i,1);i--;}}} MG.RIM = MG_RIM;
function MG_IAS(p, s, W) {
 var B=p.b,q,r,b,n,k,S=s,w=W?!p.wtm:p.wtm; if (w) {q=2;r=3;b=4;n=5;k=1;} else {q=8;r=9;b=10;n=11;k=7;} while (!SQ.ILB(S)) {S--; if (B[S]==0) continue; if (B[S]==r||B[S]==q) return _t;
 break;} if (!SQ.ILB(s)&&B[s-1]==k) return _t; S=s; while (!SQ.IRB(S)) {S++; if (B[S]==0) continue; if (B[S]==r||B[S]==q) return _t; break;} if (!SQ.IRB(s)&&B[s+1]==k) return _t;
 S=s; while (!SQ.ITB(S)) {S+=8; if (B[S]==0) continue; if (B[S]==r||B[S]==q) return _t; break;} if (!SQ.ITB(s)&&B[s+8]==k) return _t; S=s;	while (!SQ.IBB(S)) {S-=8;	if (B[S]==0) continue;
 if (B[S]==r||B[S]==q) return _t; break;} if (!SQ.IBB(s)&&B[s-8]==k) return _t; S=s; while (!SQ.ILB(S)&&!SQ.ITB(S)) {S+=7;	if (B[S]==0) continue;if (B[S]==b||B[S]==q) return _t; break;}
 if (!SQ.ILB(s)&&!SQ.ITB(s)&&B[s+7]==k) return _t; S=s; while (!SQ.IRB(S)&&!SQ.ITB(S)) {S+=9; if (B[S]==0) continue; if (B[S]==b||B[S]==q) return _t; break;}
 if (!SQ.IRB(s)&&!SQ.ITB(s)&&B[s+9]==k) return _t; S=s; while (!SQ.ILB(S)&&!SQ.IBB(S)) {S-=9; if (B[S]==0) continue; if (B[S]==b||B[S]==q) return _t; break;}
 if (!SQ.ILB(s)&&!SQ.IBB(s)&&B[s-9]==k) return _t; S=s; while (!SQ.IRB(S)&&!SQ.IBB(S)) {S-=7; if (B[S]==0) continue; if (B[S]==b||B[S]==q) return _t; break;}
 if (!SQ.IRB(s)&&!SQ.IBB(s)&& B[s-7]==k) return _t; if (w) {if (!SQ.IBB(s)) {if (!SQ.ILB(s)&&B[s-9]==6) return _t;if (!SQ.IRB(s)&&B[s-7]==6) return _t;}} else {
 if (!SQ.ITB(s)) {if (!SQ.ILB(s)&&B[s+7]==12) return _t;if (!SQ.IRB(s)&&B[s+9]==12) return _t;}}p=s&7;r=s>>3;
 return (p>=1&&r<=5&&B[s+15]==n)||(p<=6&&r<=5&&B[s+17]==n)||(p<=5&&r<=6&&B[s+10]==n)||(p>=2&&r<=6&&B[s+6]==n)||(p<=6&&r>=2&&B[s-15]==n)||(p>=1&&r>=2&&B[s-17]==n)||(p>=2&&r>=1&&B[s-10]==n)||(p<=5&&r>=1&&B[s-6]==n); } MG.IAS = MG_IAS;











	var p;
	var b;
	var t;
	
	function buildIt() {

		p = new Position();
		b = new Board(sqsize, "rgb(181,189,206)" , "rgb(233,236,240)", 0, 0);
  	
		b.SetVisible(true);	
		p.AddListener(b);
		b.SetRefPosition(p);
		t = new Tactics();
		p.AddListener(t);	
		if (initialTactics) {
			t.ParseRequestResult(null,initialTactics);
		}
		else 
			t.LoadOne();
	}


	function setInfo(text) {
		document.getElementById('info').innerHTML = text;
	}

		
	function setLevel(l) {
				t.level = l;
				paintLevel();
				t.LoadOne();
	}
	function setDay(l) {
				t.day = l;
				paintDay();
				t.LoadOne();
	}

	function paintLevel() {
				document.getElementById('level0').style.color = '#455D7F';
				document.getElementById('level0').style.background = '#E7F1FF';
				document.getElementById('level1').style.color = '#455D7F';
				document.getElementById('level1').style.background = '#E7F1FF';
				document.getElementById('level2').style.color = '#455D7F';
				document.getElementById('level2').style.background = '#E7F1FF';
				document.getElementById('level'+t.level).style.background = '#455D7F';
				document.getElementById('level'+t.level).style.color = '#E7F1FF';
	}
	function paintDay() {
			if (document.getElementById('day0')) {
				document.getElementById('day0').style.color = '#455D7F';
				document.getElementById('day0').style.background = '#E7F1FF';
				document.getElementById('day1').style.color = '#455D7F';
				document.getElementById('day1').style.background = '#E7F1FF';
				document.getElementById('day2').style.color = '#455D7F';
				document.getElementById('day2').style.background = '#E7F1FF';
				document.getElementById('day'+t.day).style.background = '#455D7F';
				document.getElementById('day'+t.day).style.color = '#E7F1FF';
		}
	}
	
	function over(t) {
		t.style.background = '#455D7F';
		t.style.color = '#E7F1FF';
	}
	function leave(t) {
		t.style.color = '#455D7F';
		t.style.background = '#E7F1FF';
	}
	

function Tactics() {
	this.tacid = Objectmap.Add("tac",this);
	this.req = new RequestObject(this.tacid); 
	this.fen = null;
	this.moves = new Array();
	this.level = 0;
	this.day = 0;
	this.startplies = 0;
	this.lastcorrectfen = null;
}

function Tactics_LoadOne() {
	this.req.SendRequest(null,"tacticsoftheday&level="+this.level+"&day="+this.day);
}

Tactics.prototype.LoadOne = Tactics_LoadOne;

function Tactics_ParseRequestResult(req,text) {
	var ar = text.split('_');
	this.fen = ar[0];
	this.lastcorrectfen = this.fen;
	this.moves = new Array();
	ar[1] = ar[1].replace(/[\r\n]+/,"");
	var t = ar[1].split(' ');
	for (var i = 0; i < t.length; i++) {
		var u = t[i].split('-');
		var mv;
		if (u.length == 2) {
			mv = u[0] | (u[1] << 6);
		}
		else {
			if (u[2] == "Q") { u[2] = (u[1] > 20) ? 2 : 8; }
			if (u[2] == 'R') u[2] = (u[1] > 20) ? 3 : 9;
			if (u[2] == 'B') u[2] = (u[1] > 20) ? 4 : 10;
			if (u[2] == 'N') u[2] = (u[1] > 20) ? 5 : 11;
			 
			mv = u[0] | (u[1] << 6) | (u[2] << 12);
		}
		this.moves.push(mv);
	}

	p.SetFEN(this.fen);
	this.startplies = p.pliesplayed;
	if (p.wtm == b.whiteonbottom) b.Flip();
	makeOneMove();
	setInfo(p.wtm?'Best move for white?':'Best move for black?');
	b.inputenabled = true;	
}

Tactics.prototype.ParseRequestResult = Tactics_ParseRequestResult;

function Tactics_PositionChanged(p) {
	if (this.fen == p.GetFEN()) {
		return;
	}
	if (((p.pliesplayed - this.startplies) & 1) == 0) {
		if (p.lastmove == this.moves[0]) {
			this.lastcorrectfen = p.GetFEN();
			this.moves.splice(0,1);
			if (this.moves.length == 0) {
				setInfo('<span style="color:rgb(0,160,0);">Correct! Problem solved!</span>');
				b.inputenabled = false;
			}
			else {
				makeOneMove();
				setInfo(p.wtm?'Best move for white?':'Best move for black?');
			}
		}
		else {
			p.SetFEN(this.lastcorrectfen);
			setInfo('<span style="color:rgb(160,0,0);">Wrong answer! Try again.</span>');
		}
	}
	else {
		this.lastcorrectfen = p.GetFEN();
	}
}

Tactics.prototype.PositionChanged = Tactics_PositionChanged;



function hint() {
	if (t.moves == null || t.moves.length == 0) return;
	b.UnmarkAll();
	if(b.hashint == _t)
		b.MarkSquare((t.moves[0] >> 6 )& 63);
	b.MarkSquare(t.moves[0] & 63);
	b.hashint = _t;
}

function makeOneMove() {
	if (t.moves == null || t.moves.length == 0) return;
	var sm = p.pliesplayed != t.startplies;
	p.MakeMove(t.moves[0] & 63,(t.moves[0] >> 6 )& 63,(t.moves[0] >> 12 )& 63);
	if (sm) {
		b.MarkSquare(t.moves[0] & 63);
		b.MarkSquare((t.moves[0] >> 6 )& 63);
	}
	t.moves.splice(0,1);
}





























