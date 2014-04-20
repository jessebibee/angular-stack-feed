angular-stack-feed
==================

StackExchange Angular.js driven feed.


Installing Dependencies
-------------

	1) Install Node.js (http://nodejs.org/)

	2) Install Grunt (used for building and testing) - install the grunt command-line tool globally with:

		npm install -g grunt-cli

	3) Install Bower (used to manage client-side packages) - install the bower command-line tool globally with:
	
		npm install -g bower


Development
-------------

	1) Clone your Github repository (after it has been forked)
 
	2) Go to the repo directory on the command line
		cd angular-stack-feed
 
	3) Add the main angular-stack-feed repository as an upstream remote to your repository:
		git remote add upstream https://github.com/jessebibee/angular-stack-feed.git
 
	4) Install node.js dependencies:
		npm install
 
	5) Install bower components:
		bower install


Running Tests
-------------
To execute all unit tests, use:

    grunt test:unit

To execute end-to-end (e2e) tests, use:

    Coming Soon!
