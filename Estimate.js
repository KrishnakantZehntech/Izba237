// Check if the user is logged in
const Udataa = localStorage.getItem("userData");
const dataEstimate = JSON.parse(Udataa);
const objctID = dataEstimate.objectId;
const usertoken = dataEstimate.token;


$("#loginBtn").hide();
$("#UserNameBlock").show();
$("#GetStartedButton").hide();
$("#tabBlockAfterlogin").show();
$("#tabBlockBeforelogin").hide();
$("#LogOutButton").show();
document.getElementById("UserNameText").innerHTML = dataEstimate.first_name;

//Logout the User and data data from the local Storage
$(document).ready(function () {
  $("#LogOutButton").click(function () {
    localStorage.removeItem("userData");
    const redirectUrl = "https://izba-exchange.webflow.io/log-in";
    window.location.href = redirectUrl;
  });
});


// SHow particular user Estimates list in table 

// Global variables
let EstimateCurrentPage = 1;
const estimateItemsPerPage = 50; // You can change the number of items per page here

// Function to fetch data from API
async function fetchEstimateData() {
    try {
        const response = await fetch(`https://cleanstation.backendless.app/api/services/Estimate/UserIDToEstimate?ID=${objctID}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching invoice data:', error);
        return null;
    }
}

// Function to render the table
async function renderestimateTable(page) {
    const data = await fetchEstimateData();
    if (data.length === 0) {
        // Show the "No rate card for this contact" message if no data is available
        document.getElementById('Estimate-table-body').innerHTML = '';
        document.getElementById('estimate-pagination').innerHTML = '';
        document.getElementById('estimateContainer').style.display = 'none';
        document.getElementById('estimate-no-data-message').style.display = 'block';
        return;
    }
    const EstimatestartIndex = (page - 1) * estimateItemsPerPage;
    const EstimateendIndex = EstimatestartIndex + estimateItemsPerPage;
    const paginatedDataestimate = data.slice(EstimatestartIndex, EstimateendIndex);
    document.getElementById('estimate-no-data-message').style.display = 'none';
    const tableBody = document.getElementById('Estimate-table-body');
    tableBody.innerHTML = paginatedDataestimate.map(estimate => {
        return `
               <tr>
                   <td onclick="handleestimateData('${estimate.objectId}')">${estimate.Estimate_Name}</td>                
                   <td>${new Date(estimate.created).toLocaleString()}</td>
                   <td>
                       <span class="edit-btn glyphicon glyphicon-pencil" onclick="handleestimateEdit('${estimate.objectId}')"></span>
                       <span class="delete-btn glyphicon glyphicon-trash" onclick="handleestimateDelete('${estimate.objectId}')"></span>                       
                   </td>
               </tr>
           `;
    }).join('');
    renderestimatePagination(data.length);
}

// Function to render pagination
function renderestimatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / estimateItemsPerPage);
    const paginationElement = document.getElementById('estimate-pagination');

    let paginationHtmlestimate = `
           <li${EstimateCurrentPage === 1 ? ' class="disabled"' : ''}>
               <a href="#" aria-label="Previous" onclick="prevestmatePage()">
                   <span aria-hidden="true">&laquo; Previous</span>
               </a>
           </li>
       `;
    for (let i = 1; i <= totalPages; i++) {
        paginationHtmlestimate += `<li${EstimateCurrentPage === i ? ' class="active"' : ''}>
                                      <a href="#" onclick="changeEstimatePage(${i})">${i}</a>
                                  </li>`;
    }
    paginationHtmlestimate += `
           <li${EstimateCurrentPage === totalPages ? ' class="disabled"' : ''}>
               <a href="#" aria-label="Next" onclick="nextestimatePage()">
                   <span aria-hidden="true">Next &raquo;</span>
               </a>
           </li>
       `;
    paginationElement.innerHTML = paginationHtmlestimate;
}

// Function to change to the previous page
function prevestmatePage() {
    if (EstimateCurrentPage > 1) {
        EstimateCurrentPage--;
        renderestimateTable(EstimateCurrentPage);
        renderestimatePagination(fetchEstimateData().length); // Pass the totalItems argument here
    }
}

// Function to change to the next page
function nextestimatePage() {
    const data = fetchEstimateData();
    data.then(result => {
        const totalPages = Math.ceil(result.length / estimateItemsPerPage);
        if (EstimateCurrentPage < totalPages) {
            EstimateCurrentPage++;
            renderestimateTable(EstimateCurrentPage);
            renderestimatePagination(result.length);
        }
    }).catch(error => {
        console.error('Error fetching rate data:', error);
    });
}

function changeEstimatePage(pageNumber) {
    EstimateCurrentPage = pageNumber; // Set the current page to the clicked page number
    renderestimateTable(EstimateCurrentPage);
}

// Function call for show Estimate list in the table on page load
renderestimateTable(EstimateCurrentPage);

// Show Estimate List in table End here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const estimateNameError = document.getElementById("estimateNameError");
const estimateContractError = document.getElementById("estimateContractError");
const estimateRateCardError = document.getElementById("estimateRateCardError");
const estimateServiceError = document.getElementById("estimateServiceError");
const estimateStartDateError = document.getElementById("estimateStartDateError");
const estimateEndDateError = document.getElementById("estimateEndDateError");

$("#estimateNameInput").on("input", function () {
    if ($(this).val()) {
        estimateNameError.style.display = "none";
    } else {
        estimateNameError.style.display = "block";
    }
  });
  $("#contractList").on("change", function () {
    if ($(this).val()) {
        estimateContractError.style.display = "none";
    } else {
        estimateContractError.style.display = "block";
    }
  });
  $("#rateCardList").on("change", function () {
    if ($(this).val()) {
        estimateRateCardError.style.display = "none";
    } else {
        estimateRateCardError.style.display = "block";
    }
  });
  $("#serviceList").on("change", function () {
    if ($(this).val()) {
        estimateServiceError.style.display = "none";
    } else {
        estimateServiceError.style.display = "block";
    }
  });
  
  $("#estimateStartDate").on("change", function () {
    if ($(this).val()) {
        estimateStartDateError.style.display = "none";
    } else {
        estimateStartDateError.style.display = "block";
    }
  });
  
  $("#estimateEndDate").on("change", function () {
    if ($(this).val()) {
        estimateEndDateError.style.display = "none";
    } else {
        estimateEndDateError.style.display = "block";
    }
  });

var FulfillmentContratID;
var RateCardID;
var ServiceID;
var ServiceIDToZoneData;
// Creatde and Set Estimate name startdate and end date in Estimate Rate Section
$(document).ready(function () {
    $("#createEstimateButton").click(function () {
        let estimateNameInput = $("#estimateNameInput").val();
        let estimateStartDate = $("#estimateStartDate").val();
        let estimateEndDate = $("#estimateEndDate").val();
        let contract = $("#contractList").val();
        let services = $("#serviceList").val();
        let rateCard = $("#rateCardList").val();
 
        FulfillmentContratID = contract;
        RateCardID = rateCard;
        ServiceID = services;

        // Calculate the difference in days
        const startDate = new Date(estimateStartDate);
        const endDate = new Date(estimateEndDate);
        const timeDifference = endDate.getTime()- startDate.getTime();
        const daysDifference = Math.abs(timeDifference / (1000 * 3600 * 24));

        // get Contract name
        var contractName = $("#contractList option:selected").text();
        // get RatecardName name
        var ratecardName = $("#rateCardList option:selected").text();
        // get service name
        var serviceName = $("#serviceList option:selected").text();

        if (estimateNameInput !== "" && estimateStartDate !== "" && estimateEndDate !== "" && contract !== "" && services !== "" && rateCard !== "") {

            // hide all error if condition is true
            estimateNameError.style.display = "none";
            estimateContractError.style.display = "none";
            estimateRateCardError.style.display = "none";
            estimateServiceError.style.display = "none";
            estimateStartDateError.style.display = "none";
            estimateEndDateError.style.display = "none";
            // Set values in the next page
            $("#EstimateContractNametext").text(estimateNameInput);
            $("#EstimateStartDate").text(estimateStartDate);
            $("#EstimateEndDate").text(estimateEndDate);
            $("#EstimateFCNameText").text(contractName);
            $("#EstimateRCNameText").text(ratecardName);
            $("#EstimateServiceNameText").text(serviceName);
            $("#EstimateFCtotalDays").text(daysDifference + " " + "Days");

            $("#EstimateDetailSectionBlock").show();
            $("#EstimatemainSection").hide();
            $("#createEstimateSection").hide();

            const weightRangeLabel = document.getElementById("weightRangeLabel");
            const ESTweightrangeslider = document.getElementById("ESTweightrangeslider");
            const ESTweightrangeinput = document.getElementById("ESTweightrangeinput");
            fetch(`https://cleanstation.backendless.app/api/services/Estimate/ServiceIDToZone?ID=${ServiceID}`)
            .then((response) => response.json())
            .then((data) => {
                ServiceIDToZoneData = data; 
                const responseLength = Array.isArray(ServiceIDToZoneData) ? ServiceIDToZoneData.length : 0;
                weightRangeLabel.textContent = `${responseLength}`;
                ESTweightrangeslider.max = responseLength;
                ESTweightrangeinput.max = responseLength;
            })
            .catch((error) => {
                console.error("Error fetching API data:", error);
                weightRangeLabel.textContent = "Error fetching API data";
            });

            // clear input fields 
            $("#estimateNameInput").val('');
            $("#estimateStartDate").val('');
            $("#estimateEndDate").val('');

        } else {
            if (estimateNameInput === "") {
                estimateNameError.style.display = "block";
              }
              if (contract === "") {
                estimateContractError.style.display = "block";
              }
              if (rateCard === "") {
                estimateRateCardError.style.display = "block";
              }
              if (services === "") {
                estimateServiceError.style.display = "block";
              }
              if (estimateStartDate === "") {
                estimateStartDateError.style.display = "block";
              }
              if (estimateEndDate === "") {
                estimateEndDateError.style.display = "block";
              }
        }

    });
});

// Create Estimate Rate Button 
$("#ESTcreateunitbutton").click(function () {
    let Estmate_name = $("#EstimateContractNametext").text();
    let Start_Date = $("#EstimateStartDate").text();
    let End_Date = $("#EstimateEndDate").text();
    let contractId = localStorage.getItem("selectedContractId");
    let serviceId = localStorage.getItem("selectedServiceId");

    // Reciving
    let ReceiptPallet = $("#ESTpalletsreceivedinput").val();
    let ReceiptCase = $("#ESTcasesreceivedinput").val();

    // Storage
    let Pallets = $("#ESTpalletstorageinput").val();
    let Shelfs = $("#ESTshelfstorageinput").val();
    let Bins = $("#ESTbinstorageinput").val();

    // Picking
    let TotalOrders = $("#ESTbaseordersinput").val();
    let ExtraPicks = $("#ESTbasketsizeinput").val();
    let Returns = $("#ESTbasereturnsinput").val();
    let KitsBuilt = $("#ESTkitscreatedinput").val();

    // Misc
    let WHHours = $("#ESTwarehousehoursinput").val();
    let OTHours = $("#ESTOThoursinput").val();
    let ITHours = $("#ESTIThours").val();

    const ESTweightrangeinput = document.getElementById("ESTweightrangeinput");
const ESTzonerangeinput = document.getElementById("ESTzonerangeinput");
const dataResult = document.getElementById("dataResult");
var result;

// Add event listeners to input elements
ESTweightrangeinput.addEventListener("input", updateDataResult);
ESTzonerangeinput.addEventListener("input", updateDataResult);

function updateDataResult() {
    // Get input values
    const weightInput = parseFloat(ESTweightrangeinput.value);
    const zoneInput = parseInt(ESTzonerangeinput.value);
    const selectedServiceWeightUnit = localStorage.getItem("selectedServiceWeightUnit");

    // Check if input values are valid
    if (!isNaN(weightInput) && !isNaN(zoneInput) && selectedServiceWeightUnit) {
        // Find the matching zone in the API response based on input values
        const weightField = `Weight_${selectedServiceWeightUnit.toUpperCase()}`;
        const matchingZone = ServiceIDToZoneData.find((zone) => {
            result = matchingZone;
            return zone[weightField] === weightInput && zone[`Zone_${zoneInput}`] !== undefined
        });

        // Update #dataResult with the matching zone price
        if (matchingZone) {
            dataResult.textContent = `Zone Value: $ ${matchingZone[`Zone_${zoneInput}`]}`;
        } else {
            dataResult.textContent = "No matching zone found.";
        }
    } else {
        dataResult.textContent = "Please enter valid weight and zone ranges.";
    }
}
    // let Average_Cost = $("#dataResult").text();
    // var numericValues = Average_Cost.match(/\d+/g);
    // var result = numericValues.join(", ");
    let estimateData =
    {
        Estimate_Name: Estmate_name,
        Start_Date: Start_Date,
        End_Date: End_Date,
        ReceiptPallet: parseFloat(ReceiptPallet) ?? 0,
        ReceiptCase: parseFloat(ReceiptCase) ?? 0,
        Pallets: parseFloat(Pallets) ?? 0,
        Shelf: parseFloat(Shelfs) ?? 0,
        Bins: parseFloat(Bins) ?? 0,
        TotalOrders: parseFloat(TotalOrders) ?? 0,
        ExtraPicks: parseInt(ExtraPicks) ?? 0,
        Returns: parseFloat(Returns) ?? 0,
        KitsBuilt: parseFloat(KitsBuilt) ?? 0,
        WHHours: parseFloat(WHHours) ?? 0,
        OTHours: parseFloat(OTHours) ?? 0,
        ITHours: parseFloat(ITHours) ?? 0,
        Average_Cost: parseFloat(result) ?? 0,

        Fulfillment_contract: {
            objectId: contractId
        },
        Service: {
            objectId: serviceId
        },
        Users_ID: {
            objectId: objctID

        }
    }
    fetch(
        "https://cleanstation.backendless.app/api/services/Estimate/Crate_Estimate",
        {
            method: "POST",
            body: JSON.stringify(estimateData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            // handleEstimateID(EstimateId);
            Swal.fire({
                icon:'success', 
                title:'Success',
                text:'Estimate Created Successfully',
                confirmButtonColor: '#146a94'
              });
            // Swal.fire("Success", "Estimate Created Successfully", "success");
            $("#createEstimateSection").hide();
            $("#EstimateDetailSectionBlock").hide();
            $("#Create").css("display", "none");
            $("#EstimateFCDetailSection").show();
            $("#EstimateTotalinvoiceSection").show();
            // $("Create").hide();
            $("#Detail").show();
            // $("#EstimateTotalinvoiceSection").show();
            // getEstimateData(objctID);
            // renderestimateTable();
            console.log(data.objectId);            
            getEstimateData(data.objectId);

            // Reciving
            $("#ESTpalletsreceivedinput").val("");
            $("#ESTcasesreceivedinput").val("");

            // Storage
            $("#ESTpalletstorageinput").val("");
            $("#ESTshelfstorageinput").val("");
            $("#ESTbinstorageinput").val("");

            // Picking
            $("#ESTbaseordersinput").val("");
            $("#ESTbasketsizeinput").val("");
            $("#ESTbasereturnsinput").val("");
            $("#ESTkitscreatedinput").val("");

            // Misc
            $("#ESTwarehousehoursinput").val("");
            $("#ESTOThoursinput").val("");
            $("#ESTIThours").val("");
     })
        .catch((error) => {
            // console.error("Error:", error);
            Swal.fire({
                icon:'error', 
                title:'Error',
                text:'An error occurred while creating the estimate',
                confirmButtonColor: '#146a94'
              });
            // Swal.fire("Error", error, "error");
        });
})

// End here

// Show Create Estimate Form 
$("#AddEstimateButton").click(function () {
    $("#Create").css("display", "block");
    $("#EstimatemainSection").hide();
    $("#createEstimateSection").show();

    // hide errors 
    estimateNameError.style.display = "none";
    estimateContractError.style.display = "none";
    estimateRateCardError.style.display = "none";
    estimateServiceError.style.display = "none";
    estimateStartDateError.style.display = "none";
    estimateEndDateError.style.display = "none";
})

// Hide Create Estimate Form 
$("#CancelCreateEstimateButton").click(function () {
    $("#createEstimateSection").hide();
    $("#Create").css("display", "none");
    $("#EstimatemainSection").show();
   
    // hide errors 
      estimateNameError.style.display = "none";
      estimateContractError.style.display = "none";
      estimateRateCardError.style.display = "none";
      estimateServiceError.style.display = "none";
      estimateStartDateError.style.display = "none";
      estimateEndDateError.style.display = "none";
     // clear input fields 
     $("#estimateNameInput").val('');
     $("#estimateStartDate").val('');
     $("#estimateEndDate").val('');
})

// Cancel Create Estimate Rate and Unit Section 
$("#cancelESTunitbutton").click(function () {
    $("#EstimateDetailSectionBlock").hide();
    $("#EstimatemainSection").show();
    $("Create").hide();
})

// Create Estimate End here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Update Estimate Start From here 
var EstimateId;
//   Function to Edit Estimate data
function handleestimateEdit(objectId) {
    $("#Update").css("display", "block");
    $("#UpdateEstimateDetailSection").show();
    $("#EstimatemainSection").hide();
    // setDataForUpdate(objectId);
    
        function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }
        fetch(`https://cleanstation.backendless.app/api/services/Estimate/EstimateIDToData?ID=${objectId}`)
        .then((res) => {
                res.json().then((data) => {
    
                    EstimateId = data.objectId;
                    document.getElementById("updateESTNameInput").value = data.Estimate_Name;
                    document.getElementById("updateCountyList").value = data.Fulfillment_contract.objectId;
                    document.getElementById("updateRateCardList").value = data.Rate_Card_objectId;
                    document.getElementById("updateServiceList").value = data.Carrier_Services.objectId;
                    document.getElementById("updateEstimateStartDate").value = formatDate(data.Start_Date);
                    document.getElementById("updateEstimateEndDate").value = formatDate(data.End_Date)
    
                    // pick  
                    document.getElementById("updateESTbaseorders").value = data.TotalOrders || 0;
                    document.getElementById("updateESTbasketsize").value = data.ExtraPicks || 0;
                    document.getElementById("updateESTbasereturns").value = data.Returns || 0;
                    document.getElementById("updateESTkitscreated").value = data.KitsBuilt || 0;
    
                    // receipet
                    document.getElementById("updateESTpalletsreceived").value = data.ReceiptPallet || 0;
                    document.getElementById("updateESTcasesreceived").value = data.ReceiptCase || 0;
    
                    // Storage
                    document.getElementById("updateESTpalletstorage").value = data.Pallets || 0;
                    document.getElementById("updateESTshelfstorage").value = data.Shelfs || 0;
                    document.getElementById("updateESTbinstorage").value = data.Bins || 0;
    
                    //  labour
                    document.getElementById("updateESTwarehousehours").value = data.WHHours || 0;
                    document.getElementById("UESTOThoursinput").value = data.OTHours || 0;
                    document.getElementById("UESTIThours").value = data.ITHours || 0;
    
                });
            }
        );
    
}

// // Set Estimate data on click for update
// async function setDataForUpdate(objectId){

// }
// End here

document.getElementById('updateESTunitsbutton').addEventListener('click', function () {
  
    let updateEstimateName = document.getElementById('updateESTNameInput').value;
    let updateFulfillmentContract = document.getElementById('updateCountyList').value ;
    let updateService = document.getElementById('updateServiceList').value ;
    const Url = `https://cleanstation.backendless.app/api/services/Estimate/EstimateUpdate`;

    // Collect updated data from the input fields
    const updatedData = {
        EstimateID: {
            objectId: EstimateId
        },
        Estimate_Name: updateEstimateName,
        Fulfillment_contract: {
            objectId: updateFulfillmentContract
        },
        Service: {
            objectId: updateService
        },
        TotalOrders: parseInt(document.getElementById('updateESTbaseorders').value),
        ExtraPicks: parseInt(document.getElementById('updateESTbasketsize').value),
        Returns: parseInt(document.getElementById('updateESTbasereturns').value),
        KitsBuilt: parseInt(document.getElementById('updateESTkitscreated').value),
        ReceiptCase: parseInt(document.getElementById('updateESTcasesreceived').value),
        ReceiptPallet: parseInt(document.getElementById('updateESTpalletsreceived').value),
        Pallets: parseInt(document.getElementById('updateESTpalletstorage').value),
        Shelfs: parseInt(document.getElementById('updateESTshelfstorage').value),
        Bins: parseInt(document.getElementById('updateESTbinstorage').value),
        Start_Date: document.getElementById('updateEstimateStartDate').value,
        End_Date: document.getElementById('updateEstimateEndDate').value,
        WHHours: parseFloat(document.getElementById('updateESTwarehousehours').value),
        OTHours: parseFloat(document.getElementById('UESTOThoursinput').value),
        ITHours: parseFloat(document.getElementById('UESTIThours').value),
        Average_Cost: 0, // You can set this value as needed
      
    };

    // Perform the PUT request to update the data
    fetch( Url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        renderestimateTable(data.objectId);
        getEstimateData(data.objectId);
        // You can also show a success message to the user using a library like SweetAlert2
        $("#UpdateEstimateDetailSection").hide();
        $("#EstimateFCDetailSection").show();
        $("#EstimateTotalinvoiceSection").show();
        Swal.fire({
            icon:'success', 
            title:'Success',
            text:'Estimate data updated successfully',
            confirmButtonColor: '#146a94'
          });

    })
    .catch(error => {
        console.error('Error updating estimate data:', error);
        // Handle the error and show an error message to the user
        Swal.fire({
            icon:'error', 
            title:'Error',
            text:'Failed to update estimate data!',
            confirmButtonColor: '#146a94'
          });
    });

});
   
// Cancel Estimate Update Rate and Unit Section 
$("#cancelupdateESTunitbutton").click(function () {
    $("#Update").css("display", "none");
    $("#UpdateEstimateDetailSection").hide();
    $("#EstimatemainSection").show();
})

// Update Estimate End here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Delete Estimate start from here 
// Function to Delete Estimate 
function handleestimateDelete(objectId) {
    // deleteEstimate(objectId);
// async function deleteEstimate(objectID) {
    Swal.fire({
        icon: "warning",
        title: "Are You sure?",
        text : "You want to delete this estimate!",
        confirmButtonText: "Delete",
        confirmButtonColor: '#ff5f5f',
        showCancelButton: true,
      })
    .then((result) => {
         if (result.isConfirmed) {
            // Delete
            // If user confirms the deletion, proceed with the actual deletion
            const estimateID = {
                objectId: objectId,
            };

            fetch(
                "https://cleanstation.backendless.app/api/services/Estimate/Delete_Estimate",
                {
                    method: "DELETE",
                    body: JSON.stringify(estimateID),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                    Swal.fire({
                        icon:'success', 
                        title:'Success',
                        text:'Estimate Delete SuccessFully',
                        confirmButtonColor: '#146a94'
                      });
                    // Swal.fire("Success", "Estimate Delete SuccessFully", "success");
                    renderestimateTable(EstimateCurrentPage);
                })
                .catch((error) => {
                    Swal.fire({
                    icon:'error', 
                    title:'Error',
                    text:'Failed to deleting estimate data!',
                    confirmButtonColor: '#146a94'
                });
            });
        }
    });
}

// Delete estimate end here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Show Particular Estimate Data
function handleestimateData(objectId){
    $("#Detail").css("display", "block");
    getEstimateData(objectId);

    $("#EstimatemainSection").hide();
    $("#EstimateFCDetailSection").show();
    $("#EstimateTotalinvoiceSection").show();
}

// show particular invoive by Id 
async function getEstimateData(objctId) {
    // let EstimateRCName = localStorage.getItem("selectedRateCardName")
    // let EstimateServiceName = localStorage.getItem("selectedServiceName")
    fetch(`https://cleanstation.backendless.app/api/services/Estimate/EstimateIDToData?ID=${objctId}`).then(
        (res) => {
            res.json().then((data) => {

                const startDat = new Date(data.Start_Date);
                const endDat = new Date(data.End_Date);
                document.getElementById("EstimateContractName").innerHTML = data.Estimate_Name;
                document.getElementById("EstimateFCName").innerHTML = data.Fulfillment_contract.Contract_name;
                document.getElementById("EstimateRCName").innerHTML = data.Rate_Card;
                document.getElementById("EstimateServiceName").innerHTML = data.Carrier_Services.Name;

                // document.getElementById("EstimateStartDateText").innerHTML = data.Start_Date;
                // document.getElementById("EstimateEndDateText").innerHTML = data.End_Date;

                const startDateText = `${startDat.getDate()}/${startDat.getMonth() + 1}/${startDat.getFullYear()}`;
                const endDateText = `${endDat.getDate()}/${endDat.getMonth() + 1}/${endDat.getFullYear()}`;

                document.getElementById("EstimateStartDateText").textContent = startDateText;
                document.getElementById("EstimateEndDateText").textContent = endDateText;
                const timeDifference = startDat.getTime() - endDat.getTime() ;
                const daysDifference = Math.abs(timeDifference / (1000 * 3600 * 24));
                document.getElementById("EstimateFCtotalDaysText").textContent = daysDifference + " " + "days";

                // pick  
                document.getElementById("ESTtotalBaseOrderText").innerHTML = data.TotalOrders || 0;
                document.getElementById("ESTtotalAdditionalPickText").innerHTML = data.ExtraPicks || 0;
                document.getElementById("ESTtotalBaseReturnText").innerHTML = data.Returns || 0;
                document.getElementById("ESTtotalKitText").innerHTML = data.KitsBuilt || 0;
                // price 
                document.getElementById("ESTbaseOrderFeeText").innerHTML = "$" + data.Fulfillment_contract.Base_Per_Order_Fee || 0;
                document.getElementById("ESTadditionalPickFeeText").innerHTML = "$" + data.Fulfillment_contract.Additional_Pick_Fee || 0;
                document.getElementById("ESTbaseReturnFeeText").innerHTML = "$" + data.Fulfillment_contract.Base_Per_Return_Fee || 0;
                document.getElementById("ESTperKitFeeText").innerHTML = "$" + data.Fulfillment_contract.Additional_Pick_Kit || 0;

                // receipet
                document.getElementById("ESTtotalPalletReceivedText").innerHTML = data.ReceiptPallet || 0;
                document.getElementById("ESTtotalcasesReceivedText").innerHTML = data.ReceiptCase || 0;
                // Price 
                document.getElementById("ESTreceiptPerPalletText").innerHTML = "$" + data.Fulfillment_contract.Receipt_Per_Pallet_Fee || 0;
                document.getElementById("ESTreceiptPerCaseText").innerHTML = "$" + data.Fulfillment_contract.Receipt_Per_Case_Fee || 0;

                // Storage
                document.getElementById("ESTtotalPalletStorageText").innerHTML = data.Pallets || 0;
                document.getElementById("ESTtotalShelfStorageText").innerHTML = data.Shelfs || 0;
                document.getElementById("ESTtotalBinStorageText").innerHTML = data.Bins || 0;
                // Price 
                document.getElementById("ESTstoragePerPalletText").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Pallet || 0;
                document.getElementById("ESTstoragePerShelftext").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Shelf || 0;
                document.getElementById("ESTstoragePerBinText").innerHTML = "$" + data.Fulfillment_contract.Storage_Per_Bin || 0;

                //  labour
                document.getElementById("ESTtotalStandardHourtext").innerHTML = data.WHHours || 0 + "Hrs";
                document.getElementById("ESTtotalOTHourlyText").innerHTML = data.OTHours || 0 + "Hrs";
                document.getElementById("ESTtotalITHourlyText").innerHTML = data.ITHours || 0 + "Hrs";
                 // Price 
                 document.getElementById("ESTmanagementFeeText").innerHTML = "$" + data.Fulfillment_contract.Management_Fee || 0;
                 document.getElementById("ESTminimunFeeText").innerHTML = "$" + data.Fulfillment_contract.Minimum_Fee || 0;
                 document.getElementById("ESTstandardHourlyLaborText").innerHTML = "$" + data.Fulfillment_contract.Labor_Warehouse_Rate || 0;
                 document.getElementById("ESTOTHourlytext").innerHTML = "$" + data.Fulfillment_contract.Labor_OT_Rate || 0;
                 document.getElementById("ESTITHourlyText").innerHTML = "$" + data.Fulfillment_contract.Labor_IT_Rate || 0;

                //   Total 
                document.getElementById("ESTTotalPickFeesCalc").innerHTML = "$" + data.TotalPickCharge || 0;
                document.getElementById("ESTTotalStorage").innerHTML = "$" + data.TotalStorageCharge || 0;
                document.getElementById("ESTTotalkReceipt").innerHTML = "$" + data.TotalReceiptCharge || 0;
                document.getElementById("ESTTotalMisclabor").innerHTML = "$" + data.TotalMiscCharge || 0;
                document.getElementById("ESTtotal3plshipping").innerHTML = "$" + data.Total3PLShipping || 0;
                document.getElementById("ESTtotalbrnadshipping").innerHTML = "$" + data.TotalBrandShipping || 0;

                let TotalSpents =data.TotalCost / data.TotalOrders;
                let RoundSpentCost =  TotalSpents.toFixed(3);      
                document.getElementById("ESTTotalSpent").textContent ="$" + data.TotalCost
                document.getElementById("ESTTotalAveragePerOrder").textContent ="$" + RoundSpentCost;

                // show donat
                const chartData = {
                    totalStorage: data.TotalStorageCharge,
                    totalPicCharges: data.TotalPickCharge,
                    totalReceipts: data.TotalReceiptCharge,
                    totalMisc: data.TotalMiscCharge,
                    TotalBrandShipping:data.TotalBrandShipping,
                    Total3PLShipping:data.Total3PLShipping
                  };
                  // Create the doughnut chart using the provided function
                  createDoughnutChart(chartData);

            });
        }
    );

}

// SHow particular estimate data End here  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Set dropdown values Start here  during create estimate  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const BrandContractURL = `https://cleanstation.backendless.app/api/services/Brand/BrandContract?User_id=${objctID}`;

var contractList = document.getElementById("contractList"),
    rateCardList = document.getElementById("rateCardList"),
    serviceList = document.getElementById("serviceList");
    
var contractData; // Store fetched contract data

// Fetch contract data and populate contract dropdown
fetch(BrandContractURL, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then(responseData => {
        contractData = responseData; // Store the contract data
        populateContractDropdown(contractData);
    })
    .catch(error => {
        console.error("Error fetching contract data:", error);
        populateRateCardDropdown([]); // Display "No rate card found" message
    });


function populateContractDropdown(data) {
    for (var entry of data) {
        contractList.options[contractList.options.length] = new Option
        (entry.Contract_name, entry.objectId);
    }
    // Check if there's a selected contract and pre-select it
    var selectedContractId = localStorage.getItem("selectedContractId");
    if (selectedContractId) {
        contractList.value = selectedContractId;
        populateRateCardDropdown(selectedContractId);
    }
}

contractList.onchange = function () {
    var selectedContractId = this.value;
    var selectedContractName = this.options[this.selectedIndex].text;
    localStorage.setItem("selectedContractId", selectedContractId);
    localStorage.setItem("selectedContractName", selectedContractName);
    populateRateCardDropdown(selectedContractId);
};

function populateRateCardDropdown(selectedContractId) {
    rateCardList.innerHTML = ""; // Clear previous options

    // Fetch rate card data using the selected contract objectId
    var rateCardUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
    fetch(rateCardUrl)
        .then(response => response.json())
        .then(rateCardData => {
            if (rateCardData.length === 0) {
                rateCardList.innerHTML = "<option value='noRateCard'>No rate card found for this contract</option>";
                serviceList.innerHTML = ""; // Clear services dropdown
                return;
            }
            rateCardList.innerHTML = "<option value='' selected='selected'>Select Rate Card</option>";

            for (var entry of rateCardData) {
                rateCardList.options[rateCardList.options.length] = new Option(entry.Rate_Card_Name, entry.objectId);
            }

            // Check if there's a selected rate card and pre-select it
            var selectedRateCardId = localStorage.getItem("selectedRateCardId");
            if (selectedRateCardId) {
                rateCardList.value = selectedRateCardId;
            } else {
                rateCardList.selectedIndex = 0; // Select the "Select Rate Card" option
            }

            populateServiceDropdown(selectedRateCardId);
        })
        .catch(error => {
            console.error("Error fetching rate card data:", error);
            rateCardList.innerHTML = "<option value='noRateCard'>No rate card found for this contract</option>";
        });
}

rateCardList.onchange = function () {
    var selectedRateCardId = this.value;
    var selectedRateCardName = this.options[this.selectedIndex].text;
    localStorage.setItem("selectedRateCardId", selectedRateCardId);
    localStorage.setItem("selectedRateCardName", selectedRateCardName);
    populateServiceDropdown();
};

serviceList.onchange = function () {
    var selectedServiceId = this.value;
    var selectedServiceName = this.options[this.selectedIndex].text;
    var selectedServiceWeightUnit = this.options[this.selectedIndex].getAttribute("data-weight-unit");
    var selectedServiceWeightRange = this.options[this.selectedIndex].getAttribute("data-weight-range");
    localStorage.setItem("selectedServiceId", selectedServiceId);
    localStorage.setItem("selectedServiceName", selectedServiceName);
    localStorage.setItem("selectedServiceWeightUnit", selectedServiceWeightUnit);
    localStorage.setItem("selectedServiceWeightRange", selectedServiceWeightRange);
};

function populateServiceDropdown() {
    serviceList.innerHTML = ""; // Clear previous options
    var selectedContractId = localStorage.getItem("selectedContractId");
    // Fetch service data using the selected contract ID
    var rateCardUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
    fetch(rateCardUrl)
        .then(response => response.json())
        .then(rateCardData => {
            var selectedRateCardName = localStorage.getItem("selectedRateCardName");
            var selectedRateCard = rateCardData.find(rateCard => rateCard.Rate_Card_Name === selectedRateCardName);
            var services = selectedRateCard?.Carrier_Services || [];
            if (services.length === 0) {
                serviceList.innerHTML = "<option value='noService'>No services found for this rate card</option>";
                return;
            }
            serviceList.options[serviceList.options.length] = new Option("Select Service", ""); // Add the "Select Service" option
            for (var entry of services) {
                var serviceName = entry.Name || "Service name not found"; // Use a default name if Name property is missing
                var serviceWeightUnit = entry.Weight_Unit || "N/A"; // Use a default weight unit if Weight_Unit property is missing
                var serviceWeightRange = entry.Weight_Range || "N/A";
                serviceList.options[serviceList.options.length] = new Option(serviceName, entry.objectId);
                serviceList.options[serviceList.options.length - 1].setAttribute("data-weight-unit", serviceWeightUnit); // Set weight unit as attribute
                serviceList.options[serviceList.options.length - 1].setAttribute("data-weight-range", serviceWeightRange);
            }
        })
        .catch(error => {
            console.error("Error fetching service data:", error);
            serviceList.innerHTML = "<option value='noService'>No services found for this rate card</option>";
        });
}


// Check if there's a selected contract and pre-select it
var selectedContractId = localStorage.getItem("selectedContractId");
if (selectedContractId) {
    contractList.value = selectedContractId;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Set dropdown values END here  during create estimate  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Create estimate zone and weight slider 
// // manage slider and inputs for both 
// const weightRangeInput = document.getElementById("ESTweightrangeinput");
// const zoneRangeInput = document.getElementById("ESTzonerangeinput");
// const zoneValueElement = document.getElementById("dataResult");
// const weightRangeLabel = document.getElementById("weightRangeLabel");
// const weightRangeSlider = document.getElementById("ESTweightrangeslider");
// const ESTzonerangeslider = document.getElementById("ESTzonerangeslider");
// weightRangeInput.addEventListener("input", fetchZoneValue);
// zoneRangeInput.addEventListener("input", fetchZoneValue);

// weightRangeInput.addEventListener("input", updateWeightRange);
// weightRangeSlider.addEventListener("input", updateWeightRange);

// function updateWeightRange(event) {
//     const maxWeightRange = parseInt(localStorage.getItem("selectedServiceWeightRange")) || 100; // Default to 100 if value not available
//     weightRangeSlider.max = maxWeightRange;
//     weightRangeLabel.textContent = `${weightRangeSlider.value}`;
//     let newWeightRange = parseInt(event.target.value);
//     if (isNaN(newWeightRange)) {
//         newWeightRange = 0;
//     }
//     if (newWeightRange > maxWeightRange) {
//         newWeightRange = maxWeightRange;
//     }

//     weightRangeInput.value = newWeightRange;
//     weightRangeSlider.value = newWeightRange;
//     fetchZoneValue(); // Update the zone value based on the new weight range
// }

// zoneRangeInput.addEventListener("input", updateZoneRange);
// ESTzonerangeslider.addEventListener("input", updateZoneRange);

// function updateZoneRange(event) {
//     const maxZoneRange = 8; // Maximum zone range value
//     let newZoneRange = parseInt(event.target.value);
//     if (isNaN(newZoneRange)) {
//         newZoneRange = 0;
//     }
//     if (newZoneRange > maxZoneRange) {
//         newZoneRange = maxZoneRange;
//     }

//     zoneRangeInput.value = newZoneRange;
//     ESTzonerangeslider.value = newZoneRange;
//     fetchZoneValue(); // Update the zone value based on the new zone range 
// }
// // end here 

// function fetchZoneValue(ServiceIDToZoneData) {
//     const weightRange = parseInt(weightRangeInput.value);
//     const zoneRange = parseInt(zoneRangeInput.value);
//     const selectedServiceWeightUnit = localStorage.getItem("selectedServiceWeightUnit");
//     // var serviceId = localStorage.getItem("selectedServiceId");

//     if (!isNaN(weightRange) && !isNaN(zoneRange) && selectedServiceWeightUnit) { 
//         const weightField = `Weight_${selectedServiceWeightUnit.toUpperCase()}`;

//         // const apiUrl = `https://cleanstation.backendless.app/api/services/Estimate/ServiceIDToZone?ID=${serviceId}`;

//         // fetch(apiUrl)
//         //     .then(response => response.json())
//             // .then(data => {
//                 const matchingZone = ServiceIDToZoneData.find(entry =>
//                     entry[weightField] === weightRange && entry[`Zone_${zoneRange}`] !== undefined
//                 );

//                 if (matchingZone) {
//                     zoneValueElement.textContent = `Zone Value: $ ${matchingZone[`Zone_${zoneRange}`]}`;
//                 } else {
//                     zoneValueElement.textContent = "0";
//                 }
//             // })
//             // .catch(error => {
//             //     console.error("Error fetching zone data:", error);
//                 // zoneValueElement.textContent = "Error fetching zone data.";
//             // });
//     } else {
//         zoneValueElement.textContent = "Please enter valid weight and zone ranges.";
//     }
// }
// End here


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   Update dropdown values Start here  during update estimate  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var updateCountyList = document.getElementById("updateCountyList"),
    updateRateCardList = document.getElementById("updateRateCardList"),
    updateServiceList = document.getElementById("updateServiceList");

var updateContractData; // Store fetched contract data

// Fetch contract data and populate contract dropdown
fetch( BrandContractURL, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }
)
  .then((response) => response.json())
  .then((updateresponseData) => {
    updateContractData = updateresponseData; // Store the contract data
    updatepopulateContractDropdown(updateContractData);
  })
  .catch((error) => {
    console.error("Error fetching contract data:", error);
    updatepopulateRateCardDropdown([]);
  });

function updatepopulateContractDropdown(data) {
  for (var entry of data) {
    updateCountyList.options[updateCountyList.options.length] = new Option(entry.Contract_name,entry.objectId);
  }
  // Check if there's a selected contract and pre-select it
  var selectedContractId = localStorage.getItem("selectedContractId");
  if (selectedContractId) {
    updateCountyList.value = selectedContractId;
    updatepopulateRateCardDropdown(selectedContractId);
  }
}

updateCountyList.onchange = function () {
  var selectedContractId = this.value;
  var selectedContractName = this.options[this.selectedIndex].text;
  localStorage.setItem("selectedContractId", selectedContractId);
  localStorage.setItem("selectedContractName", selectedContractName);
  updatepopulateRateCardDropdown(selectedContractId);
};

function updatepopulateRateCardDropdown(selectedContractId) {
  updateRateCardList.innerHTML = ""; // Clear previous options

  var updateRateCardUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
  fetch(updateRateCardUrl)
    .then((response) => response.json())
    .then((updaterateCardData) => {
      if (updaterateCardData.length === 0) {
        updateRateCardList.innerHTML =
          "<option value='noRateCard'>No rate card found for this contract</option>";
        updateServiceList.innerHTML = ""; // Clear services dropdown
        return;
      }
      updateRateCardList.innerHTML =
        "<option value='' selected='selected'>Select Rate Card</option>";

      for (var entry of updaterateCardData) {
        updateRateCardList.options[updateRateCardList.options.length] = new Option(
          entry.Rate_Card_Name,entry.objectId );
      }

      var selectedRateCardId = localStorage.getItem("selectedRateCardId");
      if (selectedRateCardId) {
        updateRateCardList.value = selectedRateCardId;
      } else {
        updateRateCardList.selectedIndex = 0;
      }

      updatepopulateServiceDropdown(selectedRateCardId);
    })
    .catch((error) => {
      console.error("Error fetching rate card data:", error);
      updateRateCardList.innerHTML =
        "<option value='noRateCard'>No rate card found for this contract</option>";
    });
}

updateRateCardList.onchange = function () {
  var updateselectedRateCardId = this.value;
  var updateselectedRateCardName = this.options[this.selectedIndex].text;
  localStorage.setItem("selectedRateCardId", updateselectedRateCardId);
  localStorage.setItem("selectedRateCardName", updateselectedRateCardName);
  updatepopulateServiceDropdown();
};

updateServiceList.onchange = function () {
  var updateselectedServiceId = this.value;
  var updateselectedServiceName = this.options[this.selectedIndex].text;
  var updateselectedServiceWeightUnit = this.options[this.selectedIndex].getAttribute("data-weight-unit");
  var updateselectedServiceWeightRange = this.options[this.selectedIndex].getAttribute("data-weight-range");
  localStorage.setItem("selectedServiceId", updateselectedServiceId);
  localStorage.setItem("selectedServiceName", updateselectedServiceName);
  localStorage.setItem("selectedServiceWeightUnit", updateselectedServiceWeightUnit);
  localStorage.setItem("selectedServiceWeightRange", updateselectedServiceWeightRange);
};

function updatepopulateServiceDropdown() {
  updateServiceList.innerHTML = ""; // Clear previous options
  var selectedContractId = localStorage.getItem("selectedContractId");
  var updateServiceUrl = `https://cleanstation.backendless.app/api/services/Estimate/ContractIDToServices?ID=${selectedContractId}`;
  fetch(updateServiceUrl)
    .then((response) => response.json())
    .then((updateServiceData) => {
      var selectedRateCardName = localStorage.getItem("selectedRateCardName");

      var selectedRateCard = updateServiceData.find(
        (rateCard) => rateCard.Rate_Card_Name === selectedRateCardName
      );
      var services = selectedRateCard?.Carrier_Services || [];
      console.log("Services:", services);

      if (services.length === 0) {
        updateServiceList.innerHTML =
          "<option value='noService'>No services found for this rate card</option>";
        return;
      }

      updateServiceList.options[updateServiceList.options.length] = new Option("Select Service","" );
      for (var entry of services) {
        var serviceName = entry.Name || "Unnamed Service";
        var serviceWeightUnit = entry.Weight_Unit || "N/A";
        var serviceWeightRange = entry.Weight_Range || "N/A";
        updateServiceList.options[updateServiceList.options.length] = new Option(serviceName,entry.objectId);
        updateServiceList.options[updateServiceList.options.length - 1].setAttribute("data-weight-unit",serviceWeightUnit);
        updateServiceList.options[updateServiceList.options.length - 1].setAttribute("data-weight-range",serviceWeightRange);
      }
    })
    .catch((error) => {
      console.error("Error fetching service data:", error);
      updateServiceList.innerHTML =
        "<option value='noService'>No services found for this rate card</option>";
    });
}

var selectedContractId = localStorage.getItem("selectedContractId");
if (selectedContractId) {
  updateCountyList.value = selectedContractId;
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   update dropdown values END here  during update estimate  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// Update estimate zone and weight slider 
// manage slider and inputs for both 
const updateESTweightrangeinput = document.getElementById("updateESTweightrangeinput");
const upateESTzonerangeinput = document.getElementById("upateESTzonerangeinput");
const UpdateAvgCost = document.getElementById("UpdateAvgCost");
const updateweightRangeLabel = document.getElementById("updateweightRangeLabel");
const updateESTweightrangeSlider = document.getElementById("updateESTweightrangeSlider");
const upateESTzonerangeSlider = document.getElementById("upateESTzonerangeSlider");
updateESTweightrangeinput.addEventListener("input", updatefetchZoneValue);
upateESTzonerangeinput.addEventListener("input", updatefetchZoneValue);

updateESTweightrangeinput.addEventListener("input", updateWeightRange1);
updateESTweightrangeSlider.addEventListener("input", updateWeightRange1);

function updateWeightRange1(event) {
    const updatemaxWeightRange = parseInt(localStorage.getItem("selectedServiceWeightRange")) || 100; // Default to 100 if value not available
    updateESTweightrangeSlider.max = updatemaxWeightRange;
    updateweightRangeLabel.textContent = `${updateESTweightrangeSlider.value}`;
    let newWeightRange = parseInt(event.target.value);
    if (isNaN(newWeightRange)) {
        newWeightRange = 0;
    }
    if (newWeightRange > updatemaxWeightRange) {
        newWeightRange = updatemaxWeightRange;
    }

    updateESTweightrangeinput.value = newWeightRange;
    updateESTweightrangeSlider.value = newWeightRange;
    updatefetchZoneValue(); // Update the zone value based on the new weight range
}

upateESTzonerangeinput.addEventListener("input", updateZoneRange);
upateESTzonerangeSlider.addEventListener("input", updateZoneRange);

function updateZoneRange(event) {
    const updatemaxZoneRange = 8; // Maximum zone range value
    let updatenewZoneRange = parseInt(event.target.value);
    if (isNaN(updatenewZoneRange)) {
        updatenewZoneRange = 0;
    }
    if (updatenewZoneRange > updatemaxZoneRange) {
        updatenewZoneRange = updatemaxZoneRange;
    }

    upateESTzonerangeinput.value = updatenewZoneRange;
    upateESTzonerangeSlider.value = updatenewZoneRange;
    updatefetchZoneValue(); // Update the zone value based on the new zone range 
}
// end here 

function updatefetchZoneValue() {
    const updateweightRange = parseInt(updateESTweightrangeinput.value);
    const updatezoneRange = parseInt(upateESTzonerangeinput.value);
    const selectedServiceWeightUnit = localStorage.getItem("selectedServiceWeightUnit");
    var serviceId = localStorage.getItem("selectedServiceId");

    if (!isNaN(updateweightRange) && !isNaN(updatezoneRange) && selectedServiceWeightUnit) {
        const weightField = `Weight_${selectedServiceWeightUnit.toUpperCase()}`;

        const apiUrl = `https://cleanstation.backendless.app/api/services/Estimate/ServiceIDToZone?ID=${serviceId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const matchingZone = data.find(entry =>
                    entry[weightField] === updateweightRange && entry[`Zone_${updatezoneRange}`] !== undefined
                );

                if (matchingZone) {
                    UpdateAvgCost.textContent = `Zone Value: $ ${matchingZone[`Zone_${updatezoneRange}`]}`;
                } else {
                    UpdateAvgCost.textContent = "0";
                }
            })
            .catch(error => {
                console.error("Error fetching zone data:", error);
                UpdateAvgCost.textContent = "Error fetching zone data.";
            });
    } else {
        UpdateAvgCost.textContent = "Please enter valid weight and zone ranges.";
    }
}
// End here


function calcEstimateDays() {
    const startDateInput = document.getElementById("estimateStartDate");
    const endDateInput = document.getElementById("estimateEndDate");
    const totalEstimateDays = document.getElementById("totalEstimate-Days");

    var startDateValue =  startDateInput.value  ;
    var endDateValue =    endDateInput.value;

    if (startDateValue && endDateValue) {
        var startDate = new Date(startDateValue);
        var endDate =   new Date(endDateValue);  
        // One day in milliseconds
        var oneDay = 24 * 60 * 60 * 1000;
        // Calculate the difference in days
        var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
        // Display the result
        totalEstimateDays.textContent = diffDays + " days";
        // Set the minimum selectable date in the end date picker
        const maxStartDate = new Date(endDate);
        maxStartDate.setDate(maxStartDate.getDate() - 1); // Increment by 1 day to disable the selected start date
        startDateInput.max = maxStartDate.toISOString().slice(0, 10);
    } else {
        // Handle the case when either input is empty
        totalEstimateDays.textContent = ""; // Clear the total days
      }
}

function setEndDateEstimatelog() {
    const startDateInput = document.getElementById("estimateStartDate");
    const endDateInput = document.getElementById("estimateEndDate");
    // const errorElement = document.getElementById("estimateErrormsg");
    const startDate = new Date(startDateInput.value);
    const today = new Date();
    // Check if startDate is before today
    if (estimateEndDate < startDate) {
        // errorElement.style.display = "block";
        startDateInput.value = "";
        endDateInput.value = "";
        endDateInput.disabled = true;
    } else {
        // errorElement.style.display = "none";
        endDateInput.disabled = false;
    }
    // Set the minimum selectable date in the end date picker
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 1); // Increment by 1 day to disable the selected start date
    endDateInput.min = minEndDate.toISOString().slice(0, 10);

    calcEstimateDays()
}

function updateEndDateEstimatelog() {
    const updateEstimateStartDateInput = document.getElementById("updateEstimateStartDate");
    const updateEstimateEndDateInput = document.getElementById("updateEstimateEndDate");
    //const updateEstimateErrorElement = document.getElementById("updateEstimateErrormsg");

    const updateEstimateStartDate = new Date(updateEstimateStartDateInput.value);
    const today = new Date();

    // Check if updateEstimateEndDate is before updateEstimateStartDate
    if (updateEstimateEndDate < updateEstimateStartDate) {
        //updateEstimateErrorElement.style.display = "block";
        updateEstimateStartDateInput.value = "";
        updateEstimateEndDateInput.value = "";
        updateEstimateEndDateInput.disabled = true;
    } else {
        //updateEstimateErrorElement.style.display = "none";
        updateEstimateEndDateInput.disabled = false;
    }

    // Set the minimum selectable date in the end date picker
    const minEndDate = new Date(updateEstimateStartDate);
    minEndDate.setDate(minEndDate.getDate() + 1); // Increment by 1 day to disable the selected start date
    updateEstimateEndDateInput.min = minEndDate.toISOString().slice(0, 10);

    updateCalcEstimateDays();
}

function updateCalcEstimateDays() {
    const updateStartDateInput = document.getElementById("updateEstimateStartDate");
    const updateEndDateInput = document.getElementById("updateEstimateEndDate");
    const updateTotalEstimateDays = document.getElementById("updateEstimateTotalDays");

    var updateStartDateValue =  updateStartDateInput.value  ;
    var updateEndDateValue =    updateEndDateInput.value;

    if (updateStartDateValue && updateEndDateValue) {
        var updateStartDate = new Date(updateStartDateValue);
        var updateEndDate =   new Date(updateEndDateValue);  
        // One day in milliseconds
        var oneDay = 24 * 60 * 60 * 1000;
        // Calculate the difference in days
        var diffDays = Math.round(Math.abs((updateStartDate - updateEndDate) / oneDay));
        // Display the result
        updateTotalEstimateDays.textContent = diffDays + " days";

      // Set the minimum selectable date in the end date picker
      const maxStartDate = new Date(updateEndDate);
      maxStartDate.setDate(maxStartDate.getDate() - 1); // Increment by 1 day to disable the selected start date
      updateStartDateInput.max = maxStartDate.toISOString().slice(0, 10);
    } else {
        // Handle the case when either input is empty
        updateTotalEstimateDays.textContent = ""; // Clear the total days
      }
}


// Donut
function createDoughnutChart(dataValues) {
    new Chart(document.getElementById("doughnut-chart-after-log"), {
      type: "doughnut",
      data: {
        labels: [
          "Total Pick Fee",
          "Total Storage",
          "Total Receipts",
          "Misc Labor",
          "Total 3PL Shipping",
          "Total Brand Shipping",
        ],
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4", "#47b39c","#ff0000"],
            data: [
              dataValues.totalPicCharges,
              dataValues.totalStorage,
              dataValues.totalReceipts,
              dataValues.totalMisc,
              dataValues.Total3PLShipping,
              dataValues.TotalBrandShipping,
            ],
          },
        ],
      },
      options: {
        title: {
          display: true,
        },
      },
    });
  }

//   manage breadcrumb 

$("#Home").click(function () {  
    const redirectUrl = "https://izba-exchange.webflow.io/fulfillment-contract";
    window.location.href = redirectUrl; 
  });
$("#estimate").click(function() {
    renderestimateTable(EstimateCurrentPage);
    $("#Detail, #Create, #Update").hide();
    $("#EstimateFCDetailSection").hide();
    $("#EstimateTotalinvoiceSection").hide();
    $("#UpdateEstimateDetailSection").hide();
    $("#createEstimateSection").hide();
    $("#EstimateDetailSectionBlock").hide();
    $("#EstimatemainSection").show(); 
});

$("#Detail").click(function() {
    $("#Update").hide();
    $("#UpdateEstimateDetailSection").hide();
    $("#createEstimateSection").hide();
    $("#EstimateFCDetailSection").show();
    $("#EstimateTotalinvoiceSection").show();
});

$("#Create").click(function() {
    $("#Update").hide();
})


$("#Update").click(function() {
})