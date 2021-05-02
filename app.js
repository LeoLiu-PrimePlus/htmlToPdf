const express = require("express");
const app = express();
const pdfcrowd = require("pdfcrowd");

// the recommended method is POST
app.post("/", (req, res) => {
    // create the API client instance
    var client = new pdfcrowd.HtmlToPdfClient("demo", "ce544b6ea52a5621fb9d55f8b542d14d");

    // configure the callback to send a file in the HTTP response
    var callbacks = pdfcrowd.sendImageInHttpResponse(
        res, "application/pdf", "result.pdf", "attachment");

    // configure the callback to send an error in the HTTP response
    callbacks.error = function(errMessage, statusCode) {
        res.set('Content-Type', 'text/plain');
        res.status(statusCode || 400);
        res.send(errMessage);
    }

    // run the conversion
    client.convertUrl("http://en.wikipedia.org", callbacks);
});