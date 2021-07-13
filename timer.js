function showtime() {
    const date = new Date();
    return date.getHours() + "Hrs:" +date.getMinutes() + "Mins:" +date.getSeconds()+ "Secs";
}

function showSessionExpire() {
    console.log("Activity-B: Your Session expired at "+showtime());
}

console.log("Activity-A: Trigerring Activity-B at "+showtime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-A: Trigerring Activity-B at "+showtime()+"will excute after 5 seconds");