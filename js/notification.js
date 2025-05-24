function launch_toast_one() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function launch_toast_two() {
    var xx = document.getElementById("toast2")
    xx.className = "show2";
    setTimeout(function(){ xx.className = xx.className.replace("show2", ""); }, 5000);
}

function launch_toast_three() {
    var xxx = document.getElementById("toast3")
    xxx.className = "show3";
    setTimeout(function(){ xxx.className = xxx.className.replace("show3", ""); }, 5000);
}
let vid = document.getElementById("myVideo");
	window.onload = function() {
    setTimeout(function() {
      launch_toast_one();
      document.getElementById("myVideo").play();
      
	}, 100);
  setTimeout(function() {
      launch_toast_two()
	}, 10000);
  setTimeout(function() {
      launch_toast_three()
	}, 15000);
	};


  