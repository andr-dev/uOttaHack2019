/* jshint browser: true */
/* global console */
/* global $ */

var lastTab;

var app = {

    // Application Constructor
    initialize: function () {
        console.log("Entering app.initialize()");

        //===========================================
//define the onclick event for the menu
//===========================================
        $(".menuLink").on('click', function (e) {
            console.log("Entering click event");

            //=========================================
            //Set active menu item
            //=========================================
            //first remove active status for the currently selected menu item
            // $(this).parent().parent().find('.active').removeClass('active');
            $('.nav').find('.active').removeClass('active');
            //Then set the current menu item to acive
            $(this).parent().addClass('active');

            //=========================================
            //Show the right content
            //=========================================
            //Disable the link action, so nothing else happens when the menu
            //is selected
            e.preventDefault(); // stops link from loading
            //Hide all existing page content
            $('.content').hide();
            //Then show the content for the current selected menu item
            //get the href and use it find which div to show
            $($(this).attr('href')).show();
        });

//===========================================
        //Do this so the menu collapses when you click an item
        //http://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click
        //===========================================
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });

        console.log("Leaving app.initialize()");
    }
};