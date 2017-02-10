//Establish the branches and what services are offered there.  Link the below reps to their services via their repId.
var branchData = {
    "data": [{
        "id": "0",
        "branchName": "sample",
        "services": [{
            "serviceName": "Mortgages",
            "id": "0",
            "repID": 1,
            "serviceEmail": "sample"
        }, {
            "serviceName": "Investment & Trust Management",
            "id": "1",
            "repID": 0,
            "serviceEmail": "sample"
        }, {
            "serviceName": "Personal Banking",
            "id": "2",
            "repID": 2,
            "serviceEmail": "sample"
        }, {
            "serviceName": "Business Banking",
            "id": "3",
            "repID": 2,
            "serviceEmail": "sample"
        }]
    }]
};

//Establish the reps and fill in their information
var repData = {
    "data": [{
        "repId": 0,
        "title": "sample",
        "repName": "sample",
        "repEmail": "sample",
        "repPhone": "sample",
        "repPictureLink": "sample",
        "repMessage": "",
        "credentials": "",
        "showDisclosures": "false"
    }]
}
//For populating PDF pages.  Attach the "id" of the pdf to a query parameter when linking to the
var pdfData = {
    "data": [{
            "id": "0",
            "pdfName": "Sample",
            "pdfLink": "Sample",
            "pdfImage": "Sample",
            "pdfCopy": "Sample",
            "pdfSubCopy": "TAP TO VIEW",
            "bullets": []
        }
    ]
};
