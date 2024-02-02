$(document).ready(function() {
    const show_label = $("#pkt1");
    const hide_label = $("#pkt2");
    const main = $("#main");
    const menu = $("#menu");

    main.hide();

    function update() {
        if (main.is(":hidden")) {
            menu.css("border-radius", "10px");
            menu.css("transition","0.1s")
        } else {
            menu.css("border-radius", "10px 10px 0 0");
            menu.css("transition","0.1s")
        }
    }

    update();

    show_label.on("click", function() {
        main.slideDown(600, function() {
            update();
        });
    });

    hide_label.on("click", function() {
        main.slideUp(600, function() {
            update();
        });
    });
});
