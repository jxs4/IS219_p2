// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/



var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	console.log('swap photo');
	
	mCurrentIndex += 1;
	if (mCurrentIndex == mImages.length) {
		mCurrentIndex = 0;
	};
	renderPhoto();
	//console.log(mCurrentImage);
}

function renderPhoto() {
	mCurrentImage = mImages[mCurrentIndex];
	$('#photo').attr('src', mCurrentImage.URL);
	$('.details .location').text('Location:' + mCurrentImage.location);
	$('.details .description').text('Description:' + mCurrentImage.description);
	$('.details .date').text('Date:' + mCurrentImage.date);
	$('.details').eq(0).show();
}


// Counter for the mImages array
var mCurrentIndex = 0;



// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';

function reqListener () {
  mJson = JSON.parse(this.responseText);
  images = mJson.images;
  for (i in images){
  	imgPath = images[i].imgPath;
  	imgLocation = images[i].imgLocation;
  	description = images[i].description;
  	date = images[i].date;
  	galleryImage = new GalleryImage(imgLocation,description,date,imgPath);
  	mImages.push(galleryImage);
  }
};


function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
};

var jsonFile = GetURLParameter('json');
if (!jsonFile) {
	jsonFile = "images.json"
}


mRequest.addEventListener("load", reqListener);
mRequest.open("GET", jsonFile);
mRequest.send();


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	$('#prevPhoto').click( function(){
		//alert(mCurrentIndex);
		mCurrentIndex -= 1;
		if (mCurrentIndex == -1) {
			mCurrentIndex = mImages.length - 1;
		};
		renderPhoto();
	});

	$('#nextPhoto').click( function(){
		//alert(mCurrentIndex);
		mCurrentIndex += 1;
		if (mCurrentIndex == mImages.length) {
			mCurrentIndex = 0;
		};
		renderPhoto();
	});

	//animate();
	
});

window.addEventListener('load', function() {
	
	console.log('window loaded 1');

}, false);



function GalleryImage(location, description, date, URL) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	this.location = location;
	this.description = description;
	this.date = date;
	this.URL = URL;
};


