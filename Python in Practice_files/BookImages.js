/* Adapted from the Rhino book's ImageLoop.js */
function BookImages(start) {
    this.imageId = "bookimage";
    var frameUrls = [
        "defaultad.png",
        "diffpdfad.png",
        "diffpdfad.png",
        "pipbookvs.png",
        "diffpdfad.png",
        "diffpdfad.png",
	"gobookvs.png",
        "diffpdfad.png",
        "diffpdfad.png",
	"aqpvs.png",
        "diffpdfad.png",
        "diffpdfad.png",
	"py3bookvs.png",
        "diffpdfad.png",
        "diffpdfad.png",
	"pyqtbookvs.png",
        "diffpdfad.png",
        "diffpdfad.png",
	];
    this.urlId = "bookurl";
    this.urls = [
        "default.html",
        "diffpdf.html",
        "diffpdf.html",
        "pipbook.html",
        "diffpdf.html",
        "diffpdf.html",
	"gobook.html",
        "diffpdf.html",
        "diffpdf.html",
	"aqpbook.html",
        "diffpdf.html",
        "diffpdf.html",
	"py3book.html",
        "diffpdf.html",
        "diffpdf.html",
	"pyqtbook.html",
        "diffpdf.html",
        "diffpdf.html",
	];
    this.stopped = false;
    this.frameInterval = 1000 * 60; // 60 seconds
    this.frames = new Array(frameUrls.length);
    this.image = null;
    this.anchor = null;
    this.loaded = false;
    this.loadedFrames = 0;
    this.frameNumber = -1;
    this.timer = null;
    if (start) {
        for (var i = 0; i < this.urls.length; ++i) {
            if (this.urls[i].indexOf(start) > -1 ) {
                this.frameNumber = i - 1;
                break;
            }
        }
    }

    var loop = this;
    function countLoadedFrames() {
        loop.loadedFrames++;
        if (loop.loadedFrames == loop.frames.length) {
            loop.loaded = true;
            loop.start();
        }
    }

    for (var i = 0; i < frameUrls.length; i++) {
        this.frames[i] = new Image();
        this.frames[i].onload = countLoadedFrames;
        this.frames[i].src = frameUrls[i];
    }

    this._displayNextFrame = function() {
        clearTimeout(loop.timer);
        loop.frameNumber = (loop.frameNumber + 1) % loop.frames.length;
        loop.image.src = loop.frames[loop.frameNumber].src;
        loop.anchor.href = loop.urls[loop.frameNumber];
        if (!this.stopped)
            loop.timer = setTimeout(loop._displayNextFrame,
                    loop.frameInterval);
    };

    document.onkeydown = function(evt) { // Stop animation on Escape
        evt = evt || window.event;
        if (evt.keyCode == 27) { // Escape
            clearTimeout(loop.timer);
            loop.stopped = true;
        }
    }
}

BookImages.prototype.start = function() {
    if (!this.image) {
        this.image = document.getElementById(this.imageId);
    }
    if (!this.anchor) {
        this.anchor = document.getElementById(this.urlId);
    }
    //this._displayNextFrame(); // leave first image for 20sec
    this.timer = setTimeout(this._displayNextFrame, this.frameInterval);
};
