const urlString = window.location.href;
const url = new URL(urlString);
const params = new URLSearchParams(url.search);
const msgParameter = params.get('msg');
async function notif() {
  alert(msgParameter)
}
