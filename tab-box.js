/* Script for Tab Changing */
function Tabber( config ) {
    
    // This will trigger the tab UI CSS
    if( !$('html').hasClass('js') ) {
        $('html').addClass('js');
    }
    
    var config = {
        tabs : config.tabs || $('[role=tab]'),
        tabPanels : config.tabpanels || $('[role=tabpanel]'),
        selectedTab : config.selectedTab || ''
    }
    
    // If no tabs or tab panels, exit out.
    if ( config.tabs.length == 0 || config.tabPanels.length == 0 ) { return; }
    
    function clickTab( target, config ) {
        var tab = '',
            tabpanel = '';
        
        resetSelected( config );
        if( $(target).is("LI") ) {
            tab = target;
        }
        else {
            tab = $(target).parent('LI');
        }
        
        tabpanel = '#' + $(tab).attr('aria-controls');
        
        $( tab ).addClass( 'selected' ).attr("aria-selected", "true");
        $( tabpanel ).addClass('selected').attr("aria-hidden", "false");

    }
    
    function resetSelected( config ) {
        $(config.tabs).removeClass('selected').attr('aria-selected', 'false');
        $(config.tabPanels).removeClass('selected').attr('aria-hidden', 'true');
    }
    
    if( config.selectedTab.length == 0 ) {
        config.tabs.eq(0).addClass( 'selected' ).attr('aria-selected', 'true');
        config.selectedTab = $( '[role=tab].selected' );
        clickTab( config.selectedTab.eq(0), config );
    }
    
    config.tabs.click( function() {
        clickTab( this, config );
        return false;
    });
    
}


$(document).ready(function() {
    var tabber = new Tabber( config = {} );
});
