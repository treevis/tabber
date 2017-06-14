// Script for Tab Changing
;function Tabber(tabset) {
	'use strict';

	var $tabset = document.querySelector(tabset);
	
	// Add a class to our tabset to trigger the tabbed interface from our CSS.
	$tabset.classList.add('js-powered');

	// For each individual tab panel, set aria-hidden attribute and hidden class
	// First panel has area-hidden of false; others have value of true; Non-first panels have a hidden class
	var $tabPanels = $tabset.querySelectorAll('.tab-panel');
	for (let i = 0; i < $tabPanels.length; i++) {
		if (i > 0) {
			$tabPanels[i].classList.add('is-hidden');
			$tabPanels[i].setAttribute('aria-hidden', 'true');
		}
		else {
			$tabPanels[i].setAttribute('aria-hidden', 'false');
		}
	}

	// Get the list of tab links
	var $tabsList = $tabset.querySelectorAll('.tabslist');
	
	// Set up initial state of tabs
	// First tab has class of 'current' and aria-selected of true, all have tabindex 0
	var $tabsListLinks = $tabset.querySelectorAll('.tabslist a');
	for (let i = 0; i < $tabsListLinks.length; i++) {
		if (i > 0) {
			$tabsListLinks[i].setAttribute('aria-selected', 'false');
		}
		else {
			$tabsListLinks[i].parentNode.classList.add('current');
			$tabsListLinks[i].setAttribute('aria-selected', 'true');
		}
		$tabsListLinks[i].setAttribute('tabindex', 0);
	}
	
	// For each link, determine its corresponding panel and assign click events.
	for (let i = 0; i < $tabsListLinks.length; i++) {
		var $tab = $tabsListLinks[i],
			tabPanelId = $tab.getAttribute('href').slice(1),
			$tabPanel = document.getElementById(tabPanelId);
		
		$tab.addEventListener('click', function(e) {
			// Prevent default click event
			e.preventDefault();
			
			var thisTab = this,
				thisTabParent = thisTab.parentNode,
				thisPanelId = thisTab.getAttribute('href').slice(1),
				thisPanel = document.getElementById(thisPanelId);
			
			// Change state of previously selected tab
			// If a tab has 'current' class, remove it & set all tabs to 'aria-selected' false.
			// .entries() returns an array, so need to reference the 1 index for the node
			for (var thatTab of $tabsListLinks.entries()) {
				var thatParent = thatTab[1].parentNode;
				if (thatParent.classList.contains('current')) {
					thatParent.classList.remove('current');
					thatTab[1].setAttribute('aria-selected', 'false');
				}
			}
			
			// Change state of previously shown tab panel
			// If panel doesn't have a class of 'is-hidden', add it. Set 'aria-hidden' true
			for (var panel of $tabPanels.entries()) {
				if (!panel[1].classList.contains('is-hidden')) {
					panel[1].classList.add('is-hidden');
					panel[1].setAttribute('aria-hidden', 'true');
				}
			}
			
			// Show newly selected tab-panel ('aria-hidden' false and remove hidden class)
			thisPanel.setAttribute('aria-hidden', 'false');
			thisPanel.classList.remove('is-hidden');
			
			// Change clicked tab to selected state
			thisTabParent.classList.add('current');
			thisTab.setAttribute('aria-selected', 'true');
		}, false);
	}
}

window.addEventListener('load', function() {
	var tabber = new Tabber('#tabber');
}, false);
