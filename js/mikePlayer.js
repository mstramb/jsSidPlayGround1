console.log("(mikePlayer.js)")
   var playstate=0; 
   var  advance=0; 
   var tuneid=0; var st=0; //these can be initialized differently if you want different startup

   var URLlist=[]; 
   var namelist=[]; 
   var lengthlist=[]; 
   var subtlist=[]; 
   var plreq = '';

   plreq = new XMLHttpRequest(); 
   //plreq.open('GET','music/playlist.txt',true);  // mike
   
   plreq.open('GET','music/playlist-test.txt',true);  // mike

   plreq.overrideMimeType('text/plain; charset=x-user-defined'); //plreq.responseType="arraybuffer";
   
plreq.onload = function() { 
    var playlist = plreq.responseText.split('\n'); //.match(/^.*([\n\r]+|$)/gm); //parse text into lines
 
   URLlist.length=0; 
   namelist.length=0; 
   lengthlist.length=0; 
   subtlist.length=0;

    for (var i=0; i<playlist.length && playlist[i].length>2; i++) { 
       URLlist.push( playlist[i].substr(0,playlist[i].lastIndexOf('.sid')+4) );

     var p=playlist[i].lastIndexOf('/')+1; 
     namelist.push( playlist[i].substr(p,playlist[i].lastIndexOf('.')-p) ); 
     var minsec = playlist[i].substr(playlist[i].lastIndexOf('.sid')+4).split(':'); 
     lengthlist.push( parseInt(minsec[0])*60+parseInt(minsec[1]) ); 
    
     if(parseInt(minsec[2])) 
          subtlist.push( parseInt(minsec[2]-1) ); 
     else subtlist.push(0);

     var listanchor = document.createElement('a'); 
     listanchor.href=URLlist[i]; 
     listanchor.id=i; 
     
     listanchor.onclick = selectune;  // mike  

     var listelement = document.createElement('li'); 
     listanchor.innerHTML=namelist[i].substr(0,32)+(namelist[i].length>32?'..':'');
     var listsubt = document.createElement('span'); 
     listsubt.style.fontSize='9pt'; 
     listsubt.style.color='#506060';
     listsubt.innerHTML = subtlist[i]? ' / '+parseInt(subtlist[i]+1)+' ' : '';

     var listtime = document.createElement('span'); 
     listtime.style.fontSize='9pt'; listtime.style.color='#506070';
     listtime.innerHTML = lengthlist[i]? ' ('+parseInt(minsec[0])+':' + (minsec[1]<10?'0':'') + parseInt(minsec[1])+')' : '';
     listelement.appendChild(listanchor); 
     listelement.appendChild(listsubt); 
     listelement.appendChild(listtime); 
     document.getElementById('playlistui').appendChild(listelement); 
   
     if(playstate) 
        loadtune(tuneid); 
    } // for (var i=0; i<playlist.length && playlist[i].length>2; i++) 
   };  // plreq.onload

  plreq.send();

   var SIDplayer = '';
   SIDplayer = new jsSID(16384,0.0005); SIDplayer.setloadcallback(loadcb); SIDplayer.setstartcallback(startcb); setInterval('show_playtime()',100); 
   function selectune() { tuneid=this.id; loadtune(tuneid); return false; }
   
function loadtune(num) { 
   console.log("(loadtune)")
   st=subtlist[num]; 
   SIDplayer.setendcallback(advance?nextune:null,lengthlist[num]); 
   SIDplayer.loadstart(URLlist[num],st); 
   playstate=1; 
   document.getElementById('titledisp').innerHTML=namelist[num].substr(0,16) + (namelist[num].length>16?'..':''); 
   show_playlength(num); 
   num++; 
   document.getElementById('numdisp').innerHTML = num+'.'; 

  // mike
     SIDplayer.mikePatch1()  // patch the init & play addresses
                              // to just loop on themselves
                              //  init  jmp init     usuall 0x1000
                              //  play  jmp init            0x1003
     SIDplayer.mikeDump1()


}
   function loadcb() { st=subtlist[tuneid]; document.getElementById('subtdisp').innerHTML = SIDplayer.getsubtunes();
    document.getElementById('infodisp').innerHTML=SIDplayer.getauthor()+': '+SIDplayer.gettitle()+' ('+SIDplayer.getinfo()+')  '; 
    document.getElementById('prefmodeldisp').innerHTML='('+SIDplayer.getprefmodel()+')'; startcb(); }
   function startcb() { playstate=1; document.getElementById('selsubt').innerHTML = st+1; document.getElementById('playpause').innerHTML='||'; }  
   function show_playtime() { document.getElementById('playtimedisp').innerHTML=parseInt(SIDplayer.getplaytime()/60)+':' + ((SIDplayer.getplaytime()%60)<10?'0':'') + parseInt(SIDplayer.getplaytime()%60);  }
   function show_playlength(num) { document.getElementById('lengthdisp').innerHTML = (lengthlist[num] && st==subtlist[num])? '/'+parseInt(lengthlist[num]/60)+':'+ ((lengthlist[num]%60)<10?'0':'') + parseInt(lengthlist[num]%60) : ''; }
   
 function show_advance() { 
      document.getElementById('autoadvdisp').innerHTML = (advance?'ON':'OFF'); }

 function nextune() { if(!advance||st!=subtlist[tuneid])return; if(++tuneid>=namelist.length) tuneid=0; loadtune(tuneid); document.getElementById(tuneid).focus(); } //document.getElementById(tuneid).click(); } 
  