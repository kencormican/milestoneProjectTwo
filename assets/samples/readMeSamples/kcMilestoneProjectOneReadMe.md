#		Milestone Project 1

This is my First Milestone Project for the Code Institute’s Diploma in Full Stack Development. 

##		The Project Brief

The brief was to create a Web Front End for a fictional 60's band wishing to advertise themselves to fans and potential fans.

A number of deliverables have been set by the stakeholders:
- The fictional band would like to use the site to showcase their music and publicise their availability to perform at events such as weddings and Christmas parties.
- They are in the process of creating a social media presence and would like to these pages.
- They have provided photos, audio clips and video images to showcase on the website

	
##	Technologies used:
		
This Website uses several technlogies & frameworks to deliver its theme, layout and functionality.
These include Balsamiq, Bootstrap 4, Html5, CSS, Fontawesome & JQuery for the audio playlist.

##	Design Overview:

In additional to the Haley Schafer, Whiskey drop & Resume Mini Project WebPages I sampled 3x Commercial Websites before ultimately deciding upon the layout & theme.
		
- https://thekinks.info/
- http://www.thebyrds.com/
- https://www.thehighkings.com/
		
I decided to integrate functionality from each of the web pages into my design.
I particularly liked the layout of the high kings website but felt the home page was too busy.
I also liked the dark theme of the Byrds webpage and the use of images and hover action from the kinks webpage.	
		
Ultimately I decided to use multiple pages segmeneted thematically into descrete functions, similar to the Resume mini project described in the UX tutorials.
I felt there was too much information to be provided from within a single page.  Something that would result in an overwhelming user experience.
		
I tried several colour schemes but ultimately felt a dark theme with greyscale carousel and band memeber navs worked best. 
Note* the index-coloured.html page included gives a flavour of a coloured theme I tried before deciding upon the black/Greyscale theme.
		
Alot of what I decided upon depended on the images and icons I found online.  
For instance, I initially tried 800x600 images for the carousel but dropped them for 1280x540 images because they didn't facilitate progressive disclosure.
		
###		Development Process

The Balsamiq mockup tool was used to create the initial wireframe templates.

The Main Page was created using the Bootstrap 4 Grid System, Default Navs, Default Carousel & Fontawesome Icons
The elements were then styled to my preferred theme using CSS.
I noted the absence of Glyphicons in Bootstarp 4 and the difference apporach to the Nav Toggle & Collapse functions.
I used modals with band image overlays for the the newsletter subscription and about sections.
		
For the Book Now Page I used a standard bootstrap 4 form template which I then modified using CSS to adhere to website template.
I also added a datepicker facilitate using html.
		
For the audio page I decided upon a JQuery playlist as is it allowed for the inclusion of Album graphics and was responsive.
I then personalised the theme using DevTools and CSS.

For the Video Gallery page I used straighforward Bootstrap 4 album snippets in conjunction with video elements, then personalised further with CSS.


### Deployment

Notepad++ run on my local windows based machine was used in conjunction with the Chrome browser to develop the initial Bootstrap based layout for the index.html webpage.
This was then customised further using Chrome Devtools and CSS.
Once comfortable with the page structure and layout I applied the baseline theme to the booking, look, listen and about.html pages.
Note* Discrete  images were used for the carousel on each of the web pages.
The files were uploaded to the Cloud9 IDE, which I used for version control, and an initial git commit was performed.
The Cloud9 repo was then bound to a remote github repo and they were synchronised.
The newsletter modal, booking submit form, listen and READme.md files were then completed and a second commit was initialised.

Github Pages was then used to host and deploy the site at the following url:

- https://kencormican.github.io/first-milestone-project/

Please Note* that after several commits to the local (Cloud9) and remote (Github) repos I made some modifications to the ReadMe.md file directly on Github.
This created a conflict between the local and remote repos.
After several failed attempts to resolve the conflict using git commands I decided the cleanest and quickest way to resolve the issue was to delete the Cloud9 worskpace and reload it again from my local machine copy.
This resulted in some of the commit granularity being lost.

### Testing

#### Responsive Design

During all phases of development I used Chrome Devtools to test the responsive design functionality.
For instance I noted that the Navbar text wrapped  before and after certain breakpoints so used media queries to scale the fonts and transition more smoothly from one breakpoint to another.

I also created multiple discrete webpages to test colour schemes and responsive layouts.
The ones that were uploaded to github can be accessed at in the test directory:

- https://kencormican.github.io/first-milestone-project/test/index-coloured.html
- https://kencormican.github.io/first-milestone-project/test/index-nav.html

Note* Coloured theme was enhanced with coloured overlay elements with varying degrees of opacity.

#### Element Functionality

I initially used iframe container elements for the Video gallery, however, I encountered difficulty preventing the autoplay function 
and ultimately decided to change to a video element to overcome the problem.

#### Browser Rendering

Once the webpages were completed I ran trials using Opera, Edge, IE-11 and Firefox to confirm functionality, html, css & boostrap rendering was consistent across various web browsers.
This enabled me to identify inconsistent flexbox display behaviour for the section element in the booking page when using ie version 11.
Per Github url below the issue appears to be a bug associated max-width config applied to nested elements using flex display. 
The abnormal behaviour resulted in the form input elements aligning to the right of the page as opposed to the center.
I overcame the problem by adding an addtional class to the booking-form column that specifically targetted the bug.
During this process I also decided to change the section & booking request row margins and padding for smaller breakpoints under 560px using media queries.

I also noted that for IE and Edge browsers they did not recognise the 8xdigit hex colour values I used when styling various buttons and the carousel caption text.
The addition 2 digits associated with the opacity of the colour were recognised by Opera, Firefox & Chrome but not by IE or Edge.
To overcome the issue on IE & Edge I used Chrome Devtools to identify the RGBa values corresponding to the 8Digit Hex codes and applied where relevant.
For instance #83838e47 which was a transparent charcoal grey I initially used to make the Social Icons responsive on hover has an RGba equivalent of RGBa (131,131,142,0.28)
Also the hex value #341b1b80 which I initially used as a transparent brown wrapper for the Carousel Caption was changed to RGBa (52,27,27,0.502)
The RGBa values were recognised by IE & Edge so the colour rendering was made consistent across all browsers.

Finally I noted the social icons displayed blue (#007bf) line to their right on hover when using IE which appeared to be a boostrap default.
I removed it by targeted the footer icon anchor element on hover and changing the text colour to black.

#### HTML/CSS Syntax Validation

Prior to submission I validated the html and css code syntax/structure using the below W3C validators, amending errors where they were highlighted.
- https://jigsaw.w3.org/css-validator/#validate_by_input
- https://validator.w3.org/#validate_by_input

		
###		Code samples referenced include
		
Zoom Effect 
- https://superdevresources.com/zoom-effect-image-css/
		
Image Overlays
- https://www.solodev.com/blog/web-design/how-to-add-transparent-overlays-to-images-with-css.stml
		
Bootstrap 4 datepicker
- https://www.codeply.com/go/HuVBaGvN8K/bootstrap-4-datepicker
		
Bootstrap 4 JQuery Audio Playlist
- https://www.jqueryscript.net/other/Bootstrap-Audio-Player-Playlist-jQuery.html
		
Video snippets
- https://getbootstrap.com/docs/4.3/examples/album/
- https://mdbootstrap.com/plugins/jquery/video/

IE11 Flexbox Issue Resolution
- https://github.com/philipwalton/flexbugs/issues/170


###	Content

The sample photos, audio and video clips provided by the Code Institute were for The Monkees.  
I've dowloaded additional content from a number of sources and modified them to facilitate the theme of this fictional website.
Sources include but were not limited to:
- https://en.wikipedia.org/wiki/The_Monkees
- https://en.wikipedia.org/wiki/Micky_Dolenz
- https://en.wikipedia.org/wiki/Michael_Nesmith
- https://en.wikipedia.org/wiki/Peter_Tork
- https://www.goldminemag.com/articles/the-monkees-still-have-plenty-to-say
- https://medium.com/cuepoint/fake-it-til-you-make-it-how-the-monkees-performed-live-f9fea6c9a6b9
- https://people.com/music/peter-tork-monkees-dead-at-77/
- https://www.irishtimes.com/culture/music/peter-tork-obituary-folk-and-blues-singer-who-became-a-pop-sensation-1.3802121
- https://www.emmys.com/news/online-originals/hey-hey-its-monkees-50-part-ii
- https://www.bandlogojukebox.com/blog/2017/12/4/m1-the-monkees
- https://www.pinterest.com/pin/780037597932820955