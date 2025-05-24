function classToggle() {
    document.getElementById("hide").classList.add('newclass');
  };

var button = document.getElementById("secret"),
count = 0;
button.onclick = function() {
count += 1;

if(count == 10){
  document.getElementById("secret").classList.remove('secret');
}
};