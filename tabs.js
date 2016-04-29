// Script for Tab Changing
;function Tabber(tabset) {
	'use strict';

	var $tabset = $(tabset);

	// For each individual tab DIV, set class and aria-hidden attribute, and hide it
	$tabset.find('> div').attr({
		'class': 'tab-panel is-hidden',
		'aria-hidden': 'true'
	});
	
	// Get the list of tab links
	var $tabsList = $tabset.find('ul:first').attr({
        'class': 'tabslist'
    });
	
	// For each link in the tabs list...
	$tabsList.find('a').each(function(i) {
		
		var $tab = $(this);
		
		// Create a unique id using the tab link's href
		// Assumes a fragment
		var tabId = 'tab-' + $tab.attr('href').slice(1);
		
		// Assign tab id and aria-selected attribute to the tab control
		// Assign presentation role to tab parent.
		$tab.attr({
			'id': tabId,
			'aria-selected': 'false'
		}).parent().attr('role', 'presentation');
		
		// Assign aria attribute to the relevant tab panel
		$tabset.find(".tab-panel").eq(i).attr("aria-labelledby", tabId);
		
		// Set the click event for each tab link
		$tab.on('click', function(e) {
			var $tabPanel;
			
			// Prevent default click event
			e.preventDefault();
			
			// Change state of previously selected tabList item
			$tabsList.
				find('li.current').removeClass('current').
				find('a').attr('aria-selected', 'false');
			
			// Hide previously selected tab-panel
			$tabset.find('.tab-panel:visible').attr('aria-hidden', 'true').addClass('is-hidden');
			
			// Show newly selected tab-panel
			$tabPanel = $tabset.find('.tab-panel').eq($tab.parent().index());
			$tabPanel.attr('aria-hidden', 'false').removeClass('is-hidden');
			
			// Set state of newly selected tab list item
			$tab.attr('aria-selected', 'true').parent().addClass('current');
			
			// Set focus to the first heading in the newly revealed tab content
			$tabPanel.children('h2').attr('tabindex', -1).focus();
		});
	});
	
	// Show the first tab-panel
	$tabset.find(".tab-panel:first").attr("aria-hidden", "false").removeClass('is-hidden');
	
	// Set state for the first tabsList li
	$tabsList.find('li:first').addClass('current').find('a').attr({
        'aria-selected': 'true',
        'tabindex': '0'
    });
}


$(document).ready(function() {
    var tabber = new Tabber($('#tabber'));
});
