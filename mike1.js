console.log("(mike.js)")


onload = function () {
         console.log("-- onload -- (mike1.js)")
         document.getElementById('volslider').value=1;
         show_advance();
         
       var e1 = document.getElementById('inputMemAddr');
       e1.oninput = getMemHandler;  // mike1.js
       e1.onpropertychange = e1.oninput; // for IE8

       var e2 = document.getElementById('inputData');
       e2.oninput = inputDataHandler;   // mike1.js
       e2.onpropertychange = e2.oninput; // for IE8

       // e.onchange = e.oninput; // FF needs this in <select><option>...
       // other things for onload()

    };

onbeforeunload = function() { SIDplayer.stop(); }

 var addr,data;

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
