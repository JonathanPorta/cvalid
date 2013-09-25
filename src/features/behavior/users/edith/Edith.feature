Feature: Site is available
	As a user of our site
	Edith wants to see the site
	So that she knows it exists

	Scenario: Direct Browsing
		Given Edith has her browser open
		When Edith goes to the url directly
		Then she should see "cValid" in the "title"

Feature: Site loads
	As a person given a card in real life
	Edith wants the site to load
	So she can login with her card

	Scenario: Landing bootstrap
		Given Edith has her browser open
		When she goes to the landing page
		Then she should see "cValid" in the title
		And she should see "cValid" in the "header"
		And she should be invited to enter her "card-number"

	Scenario: First visit-enter card number
		Given Edith is on the landing page
		When she enters "4066470397" into the "card-number" box
		Then the page shows "Valid Card"
		And the page shows "Enter PIN"

	Scenario: First visit-enter PIN
		Given Edith is on the landing page
		And she enters "4066470397" into the "card-number" box
		And the page shows "Valid Card"
		And the page shows "Enter PIN"
		When she enters "8098" into the "card-pin" box
		Then the page shows "PIN is Valid"
		And she should be invited to enter her "full-name"

	Scenario: First visit-enter name
		Given Edith is on the landing page
		And she enters "4066470397" into the "card-number" box
		And the page shows "Valid Card"
		And the page shows "Enter PIN"
		And she enters "8098" into the "card-pin" box
		And the page shows "PIN is Valid"
		And the page shows "Your Name"
		When she enters "Edith" into the "full-name" box
		Then the page shows "Hello Edith!"
		And she should be invited to enter her "email"

	Scenario: First visit-enter email
		Given Edith is on the landing page
		And she enters "4066470397" into the "card-number" box
		And the page shows "Valid Card"
		And the page shows "Enter PIN"
		And she enters "8098" into the "card-pin" box
		And the page shows "PIN is Valid"
		And the page shows "Your Name"
		And she enters "Edith" into the "full-name" box
		And the page shows "Hello Edith!"
		When she enters "edith@old.name" into the "email" box
		Then the page shows "Registration Complete!"


