const t={body:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};function e(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}const s={intervalId:null,isActive:!1,start(){this.isActive||(this.isActive=!0,this.intervalId=setInterval((()=>{e()}),1e3))},stop(){clearInterval(this.intervalId),this.isActive&&(this.isActive=!1)}};t.startBtn.addEventListener("click",(()=>{s.start()})),t.stopBtn.addEventListener("click",(()=>{s.stop()}));
//# sourceMappingURL=01-color-switcher.c250d8fc.js.map
