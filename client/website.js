if(window.attachEvent) {
    window.attachEvent('onload', main());
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            main(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = main();
    }
}

function main () {
  console.log(_.escape('1<2>3!4@5#6$7*8*9{10}11|'));
}