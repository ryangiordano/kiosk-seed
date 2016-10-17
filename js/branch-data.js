"use strict";
//append the branches to the drop down.

var branchSelect = document.getElementById('branch');
var serviceSelect = document.getElementById('service');

function dropDownPop() {
  //map branch and the associated services out and attach to respective select elements
  branchData.data.map(function (branch) {
    var option = document.createElement("option");
    option.text = branch.branchName;
    option.value = branch.id;
    branchSelect.appendChild(option);
    if (branch.id == 0) {
      servicePopulate(branch);
    }
  });
};

//looks inside a branch's services and adds them to the dropdown
function servicePopulate(branch) {
  branch.services.map(function (service) {
    var option = document.createElement("option");
    option.text = service.serviceName;
    option.value = service.id;
    serviceSelect.appendChild(option);
  });
}

function updateElements() {
  var selectedValue = branchSelect.options[branchSelect.selectedIndex].value,
      newBranch = void 0;
  serviceSelect.selectedIndex = 0;
  //every time select is set, repopulate the Service field according to the ID value.
  // TODO: make vanilla
  $("#service option[value!='null']").each(function () {
    $(this).remove();
  });
  //grab the new service information from the data with the selectedValue
  branchData.data.map(function (branch) {
    if (branch.id == selectedValue) {
      newBranch = branch;
    }
  });
  servicePopulate(newBranch);
};

function updateInputs() {
  var currentBranch = branchSelect.options[branchSelect.selectedIndex].value; //id of current branch
  var selectedValue = serviceSelect.options[serviceSelect.selectedIndex].value; //id of current service
  //match the repData's id with the id of the currently selected service
  branchData.data.map(function (branch) {
    if (branch.id == currentBranch) {
      branch.services.map(function (service) {
        if (service.id == selectedValue) {
          document.getElementById('serviceEmail').setAttribute('value', service.serviceEmail);
          document.getElementById('serviceName').setAttribute('value', service.serviceName);
          repData.data.map(function(rep){
            if(rep.repId === service.repID){
              document.getElementById('repName').setAttribute('value', rep.repName);
              document.getElementById('repEmail').setAttribute('value', rep.repEmail);
              document.getElementById('repPhone').setAttribute('value', rep.repPhone);
              document.getElementById('repPictureLink').setAttribute('value', rep.repPictureLink);
              document.getElementById('repMessage').setAttribute('value', rep.repMessage);
              document.getElementById('repTitle').setAttribute('value', rep.title);
              document.getElementById('repCredentials').setAttribute('value', rep.credentials);
              document.getElementById('showDisclosures').setAttribute('value', rep.showDisclosures);
            }
          });

        }
      });
    }
  });
}

dropDownPop();

//add event listeners
branchSelect.onchange = updateElements;
serviceSelect.onchange = updateInputs;
