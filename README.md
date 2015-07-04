MapGive
===========

**gh-pages branch: used for testing**

This branch does not have the assets directory in the gitignore file. It includes the assets folder so jekyll can access the assets when displaying the site. In the master branch you are expected to run Grunt first, which will build the assets directory for you.

Dec 16, 2014:

- couldn't integrate Leaflet until added L as a global variable in the grunt file!
(https://github.com/tombatossals/angular-leaflet-directive/issues/519)


This site was built using Jekyll, a static site generator (Intro to Jekyll video: https://www.youtube.com/watch?v=O7NBEFmA7yA)

This is an existing Grunt project (http://gruntjs.com/getting-started). 
Assuming that the Grunt CLI has been installed and that the project has already been configured with a package.json and a Gruntfile, it's very easy to start working with Grunt:

1. Navigate to the project's root directory.
2. Install project dependencies with 'npm install' command.
3. run Grunt with 'grunt' command.

-The Grunt file does many optimization functions and builds the Jekyll site

Deploying Jekyll site to GitHub Pages (http://jekyllrb.com/docs/github-pages/)
-This involves changing the baseurl name in the _config file

used this site to validate favicon:
http://www.html-kit.com/favicon/validator/

check out test site:   
http://d3netxer.github.io/Mapgive/index.html

