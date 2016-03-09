console.log("(mike1.js)(v 0.02")


onload = function () {
         console.log("-- onload -- (mike1.js)")
         document.getElementById('volslider').value=1;
//         show_advance();

       var e1 = document.getElementById('inputMemAddr');
       e1.oninput = getMemHandler;  // mike1.js
       e1.onpropertychange = e1.oninput; // for IE8

       var e2 = document.getElementById('inputData');
       e2.oninput = inputDataHandler;   // mike1.js
       e2.onpropertychange = e2.oninput; // for IE8

       // e.onchange = e.oninput; // FF needs this in <select><option>...
       // other things for onload()

// initNoteTable();

 //testjunk();

 // this was before 'loadNoteTableFile' and was working
  initjsSidPlayer();
 loadNoteTableFile();

}; // onload

//////////////////////

//var nTabrequest = new XMLHttpRequest();

var noteFreqLo = new Uint8Array(256);
var noteFreqHi = new Uint8Array(256);
var noteTable = '';
function loadNoteTableFile() {
 // console.log("(mike1.js)(loadNoteTableFile)(entry)");

 var nTabrequest = new XMLHttpRequest();

 nTabrequest.onload = function() {
   console.log("(mike1.js)(request.onload) nTabrequest.response.length : (file length) " + nTabrequest.response.length)

   // noteTable = new Uint8Array(nTabrequest.responseText.length);

   noteTable = nTabrequest.responseText.split('\n');

	 console.log("(mike1.js)(request.onload) noteTable.length:" + noteTable.length );

//	 console.log("(mike1.js)(request.onload)  for(var i= 0 ...");

   for (var i=0; i <= noteTable.length;  i++) {
			console.log("i:"+i+" noteTable[i]:"+noteTable[i] + " noteTable[i+1]:" + noteTable[i+1]);
//			console.log("i:"+i+" noteTable[i]:"+noteTable[i] );
	 	  noteFreqLo[i]= parseInt(noteTable[i]);
	 	  noteFreqHi[i]= parseInt(noteTable[i+1]);
   };

 }; // nrequest.onload

 nTabrequest.onreadystatechange = function() {
	// console.log("(mike1.js)(nTabrequest.onreadystatechange) nTabrequest.readyState:" + nTabrequest.readyState );

  if (nTabrequest.readyState == XMLHttpRequest.DONE) {
     //   alert(nTabrequest.responseText);
      console.log("nTabrequest.responseText.length: " + nTabrequest.responseText.length)
    }
 }

 nTabrequest.open('GET','data/noteTable.txt',true);
 nTabrequest.overrideMimeType('text/plain; charset=x-user-defined');
// nTabrequest.responseType = 'arraybuffer';

//console.log("(initNoteTable)(after XMLHttpRequest)");

// nTabrequest = new XMLHttpRequest();
// console.log("nTabrequest" +  nTabrequest);
// nTabrequest.open('GET','data/noteTable2.txt',true);
// nTabrequest.open('GET','music/stuff2.txt',true);
// nTabrequest.open('GET','http://localhost/jsSIDpg/data/noteTable.txt',true);  // mike
// console.log("nTabrequest.response.length:" + nTabrequest.response.length);
// nTabrequest.open('GET','data/noSuchFile.txt',true);  // mike


 nTabrequest.send(null);
};
////////////



////////////
onbeforeunload = function() { SIDplayer.stop(); }

 var addr,data;

function selNoteV1(sel) {
 	 var val = sel.value;
	 console.log("(mike1.js)(selNoteV1) val:" + val)
}

function inputDataHandler () {
 console.log("(inputDataHandler)")
  data = document.getElementById('inputData').value;
  data = parseInt(data);
  var t = data + 3;
  console.log("data :" + data + " data + 3 :" + t)
  SIDplayer.setmem(addr,data)
  document.getElementById('showmem').innerHTML = SIDplayer.getmem(addr).toString(16) // to hex
}
var ee;
//function getMemHandler(e) {

function getMemHandler() {
  //ee = e;
  //console.log("(getMemHandler)  e:" + e)
  addr = document.getElementById('inputMemAddr').value;
  addr = parseInt(addr);
  var t = addr + 3;
  console.log("addr :" + addr + " addr + 3 :" + t)
  document.getElementById('showmem').innerHTML = SIDplayer.getmem(addr).toString(16) // to hex
}

function testjunk() {
	 console.log("(testjunk)")
}