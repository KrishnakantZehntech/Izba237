let BrandId;
let fcobjId;
let EstimatBrandId;

$(document).ready(function () {
  var tabIds = [
    "TabReceiving",
    "TabStorage",
    "TabPicking",
    "TabMisc",
    "TabEstimate",
  ];
  disableTabs(tabIds);
});

const brandNameError = document.getElementById("brandNameError");
const StartDateError = document.getElementById("StartDateError");
const EndDateError = document.getElementById("EndDateError");

$("#brandNameInput").on("input", function () {
  if ($(this).val()) {
    brandNameError.style.display = "none";
  } else {
    brandNameError.style.display = "block";
  }
});

$("#startDate").on("change", function () {
  if ($(this).val()) {
    StartDateError.style.display = "none";
  } else {
    StartDateError.style.display = "block";
  }
});

$("#endDate").on("change", function () {
  if ($(this).val()) {
    EndDateError.style.display = "none";
  } else {
    EndDateError.style.display = "block";
  }
});

var Brandname;
var StartDate;
var EndDate;
var FulfillmentCenter;

// click next button on get started tab
$("#goToReciving").click(function () {
  let brandNameInput = $("#brandNameInput").val();
  let startDate = $("#startDate").val();
  let endDate = $("#endDate").val();
  let centers = $("#centers").val();

  Brandname = brandNameInput;
  StartDate = startDate;
  EndDate = endDate;
  FulfillmentCenter = centers;


  if (brandNameInput !== "" && startDate !== "" && endDate !== "" && centers !== "") {
      enableTabAndTriggerClick("TabReceiving");
  } else {
    if (brandNameInput === "") {
      brandNameError.style.display = "block";
    }
    if (startDate === "") {
      StartDateError.style.display = "block";
    }
    if (endDate === "") {
      EndDateError.style.display = "block";
    }
  }
  return false;
});

function disableTabs(tabIds) {
  tabIds.forEach(function (tabId) {
    var tab = document.getElementById(tabId);
    tab.setAttribute("disabled", "disabled");
    tab.style.pointerEvents = "none";
    tab.style.opacity = "0.5";
  });
}

function enableTabAndTriggerClick(tabId) {
  var tab = document.getElementById(tabId);
  tab.removeAttribute("disabled");
  tab.style.pointerEvents = "auto";
  tab.style.opacity = "1";
  tab.click();
}

$(document).ready(function () {
  $("#backToGetStarted").click(function () {
    enableTabAndTriggerClick("GetStarted");
  });
});



$("#GetStarted").click(function () {
  const errorReciving = document.getElementById("errorReciving");
  errorReciving.style.display = "none";
  const errorStorage = document.getElementById("errorStorage");
  errorStorage.style.display = "none";
  const errorPicking = document.getElementById("errorPicking");
  errorPicking.style.display = "none";
  const MinimumFeeError = document.getElementById("MinimumFeeError");
  MinimumFeeError.style.display = "none";
  const ManagementFeeError = document.getElementById("ManagementFeeError");
  ManagementFeeError.style.display = "none";
  const errorMisc = document.getElementById("errorMisc");
  errorMisc.style.display = "none";
});

$("#TabReceiving").click(function () {
  const errorReciving = document.getElementById("errorReciving");
  errorReciving.style.display = "none";
  const errorStorage = document.getElementById("errorStorage");
  errorStorage.style.display = "none";
  const errorPicking = document.getElementById("errorPicking");
  errorPicking.style.display = "none";
  const MinimumFeeError = document.getElementById("MinimumFeeError");
  MinimumFeeError.style.display = "none";
  const ManagementFeeError = document.getElementById("ManagementFeeError");
  ManagementFeeError.style.display = "none";
  const errorMisc = document.getElementById("errorMisc");
  errorMisc.style.display = "none";
});

$("#TabStorage").click(function () {
  const errorReciving = document.getElementById("errorReciving");
  errorReciving.style.display = "none";
  const errorStorage = document.getElementById("errorStorage");
  errorStorage.style.display = "none";
  const errorPicking = document.getElementById("errorPicking");
  errorPicking.style.display = "none";
  const MinimumFeeError = document.getElementById("MinimumFeeError");
  MinimumFeeError.style.display = "none";
  const ManagementFeeError = document.getElementById("ManagementFeeError");
  ManagementFeeError.style.display = "none";
  const errorMisc = document.getElementById("errorMisc");
  errorMisc.style.display = "none";
});

$("#TabPicking").click(function () {
  const errorReciving = document.getElementById("errorReciving");
  errorReciving.style.display = "none";
  const errorStorage = document.getElementById("errorStorage");
  errorStorage.style.display = "none";
  const errorPicking = document.getElementById("errorPicking");
  errorPicking.style.display = "none";
  const MinimumFeeError = document.getElementById("MinimumFeeError");
  MinimumFeeError.style.display = "none";
  const ManagementFeeError = document.getElementById("ManagementFeeError");
  ManagementFeeError.style.display = "none";
  const errorMisc = document.getElementById("errorMisc");
  errorMisc.style.display = "none";
});

$(document).ready(function () {
  var tabIds = ["TabStorage", "TabPicking", "TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  function CheckReceivingInputError(){
   let receiptPerCase = $("#receiptPerCaseInput").val();
   let receiptPerPallet = $("#receiptPerPalletInput").val();
   const errorReciving = document.getElementById("errorReciving");

   if (receiptPerCase !== "" || receiptPerPallet !== "") {
    errorReciving.style.display = "none";
    return true;

  } else {
    errorReciving.style.display = "block";
    return false;
  }
  };

  $("#receiptPerCaseInput").on("input", function () {
    CheckReceivingInputError();
  });

  $("#receiptPerPalletInput").on("input", function () {
    CheckReceivingInputError();
  });


$("#goToStorage").click(function () {
    if (CheckReceivingInputError()) {
      enableTabAndTriggerClick("TabStorage");
    }
  });

});

//Back to reciving
$(document).ready(function () {
  $("#backToReceiving").click(function () {
    enableTabAndTriggerClick("TabReceiving");
  });
});

// Go to Picking and Validation
$(document).ready(function () {
  var tabIds = ["TabPicking", "TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  
  function CheckStorageInputError(){
    let storagePerPallet = $("#storagePerPalletInput").val();
    let storagePerShelf = $("#storagePerShelfInput").val();
    let storagePerBin = $("#storagePerBin").val();
    const errorStorage = document.getElementById("errorStorage");

    if ( storagePerPallet !== "" ||  storagePerShelf !== "" || storagePerBin !== "") {
      errorStorage.style.display = "none";
     return true;
 
   } else {
    errorStorage.style.display = "block";
     return false;
   }
};

   $("#storagePerPalletInput").on("input", function () {
    CheckStorageInputError();
  });

  $("#storagePerShelfInput").on("input", function () {
    CheckStorageInputError();
  });

  $("#storagePerBin").on("input", function () {
    CheckStorageInputError();
  });


  $("#goToPicking").click(function () {   
    if ( CheckStorageInputError() ) {
      enableTabAndTriggerClick("TabPicking");
    }
  });
});

$(document).ready(function () {
  $("#backToStorage").click(function () {
    enableTabAndTriggerClick("TabStorage");
  });
});


$(document).ready(function () {
  var tabIds = ["TabMisc", "TabEstimate"];
  disableTabs(tabIds);

  function CheckPickingInputError(){
    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#AssemblyPerKitInput").val();
   const errorPicking = document.getElementById("errorPicking");

    if ( BaseFeePerOrderInput !== "" || AdditionalPickFeeInput !== "" || BaseReturnFeeInput !== "" ||  AssemblyPerKitInput !== "") {
      errorPicking.style.display = "none";
     return true; 
   } else {
    errorPicking.style.display = "block";
     return false;
   }
};

$("#BaseFeePerOrderInput").on("input", function () {
  CheckPickingInputError();
});

$("#AdditionalPickFeeInput").on("input", function () {
  CheckPickingInputError();
});

$("#BaseReturnFeeInput").on("input", function () {
  CheckPickingInputError();
});

$("#BaseReturnFeeInput").on("input", function () {
  CheckPickingInputError();
});

$("#goToMisc").click(function () {
    
    if (CheckPickingInputError() ) {
      enableTabAndTriggerClick("TabMisc");
    } 
  });
});

//Back to Picking
$(document).ready(function () {
  $("#backToPicking").click(function () {
    enableTabAndTriggerClick("TabPicking");
  });
});

//Go to Estimate and save Fullfillment contract data with realtion
$(document).ready(function () {
  var tabIds = ["TabEstimate"];
  disableTabs(tabIds);


  function CheckManagementInputError(){
    let MonthlyManagementFeeInput = $("#MonthlyManagementFeeInput").val();
    let MonthlyMinimumFeeInput = $("#MonthlyMinimumFeeInput").val();
    const MinimumFeeError  = document.getElementById("MinimumFeeError");
    const ManagementFeeError   = document.getElementById("ManagementFeeError");

    if ( MonthlyManagementFeeInput !== "" && MonthlyMinimumFeeInput !== "") {
      MinimumFeeError.style.display = "none";
      ManagementFeeError.style.display = "none";
      return true;
   } else {
      var value = true;
      if (MonthlyManagementFeeInput !== "") {
        ManagementFeeError.style.display = "none";
        value = true;
      } else {
        ManagementFeeError.style.display = "block";
        value = false;
      }

      if (MonthlyMinimumFeeInput !== "") {
        MinimumFeeError.style.display = "none";
        value = true;
      } 
      else {
        ManagementFeeError.style.display = "block";
        value = false;
      }
      return value; 
    } 
   }

  $("#MonthlyManagementFeeInput").on("input", function () {
    CheckManagementInputError();
  });

  $("#MonthlyMinimumFeeInput").on("input", function () {
    CheckManagementInputError();
  });

  function CheckMiscInputError(){

  let StandardHourlyLaborInput = $("#StandardHourlyLaborInput").val();
  let OTHourlyLaborInput = $("#OTHourlyLaborInput").val();
  let ITHourlyLaborInput = $("#ITHourlyLaborInput").val();
  const errorMisc = document.getElementById("errorMisc");

    if ( StandardHourlyLaborInput !== "" || OTHourlyLaborInput !== "" || ITHourlyLaborInput !== "") {
      errorMisc.style.display = "none";
     return true; 
   } else {
    errorMisc.style.display = "block";
     return false;
   }
};

$("#StandardHourlyLaborInput").on("input", function () {
  CheckMiscInputError();
});

$("#OTHourlyLaborInput").on("input", function () {
  CheckMiscInputError();
});

$("#ITHourlyLaborInput").on("input", function () {
  CheckMiscInputError();
});


  
$("#goToEstimates").click(function () {
  CheckManagementInputError();
  CheckMiscInputError();

  if ( CheckManagementInputError() && CheckMiscInputError()) { 
    let MonthlyManagementFeeInput = $("#MonthlyManagementFeeInput").val();
    let MonthlyMinimumFeeInput = $("#MonthlyMinimumFeeInput").val();
    let StandardHourlyLaborInput = $("#StandardHourlyLaborInput").val();
    let OTHourlyLaborInput = $("#OTHourlyLaborInput").val();
    let ITHourlyLaborInput = $("#ITHourlyLaborInput").val();

    // api object
    let receiptPerCase = $("#receiptPerCaseInput").val();
    let receiptPerPallet = $("#receiptPerPalletInput").val();

    let storagePerPallet = $("#storagePerPalletInput").val();
    let storagePerShelf = $("#storagePerShelfInput").val();
    let storagePerBin = $("#storagePerBin").val();

    let BaseFeePerOrderInput = $("#BaseFeePerOrderInput").val();
    let AdditionalPickFeeInput = $("#AdditionalPickFeeInput").val();
    let BaseReturnFeeInput = $("#BaseReturnFeeInput").val();
    let AssemblyPerKitInput = $("#AssemblyPerKitInput").val();

    // Assuming you have already set the FulfillmentCenter and BrandId as strings or numbers
    let postContract = {
        Fulfillment_Center: {
            objectId: FulfillmentCenter,
        },  
        Brand_id: {
          brand_name: Brandname,
          Guest_Brand: true,  
        },
        Base_Per_Order_Fee: parseFloat(BaseFeePerOrderInput) ?? 0,
        Additional_Pick_Fee: parseFloat(AdditionalPickFeeInput) ?? 0,
        Additional_Pick_Kit: parseFloat(AssemblyPerKitInput) ?? 0,
        Base_Per_Return_Fee: parseFloat(BaseReturnFeeInput) ?? 0,
        Start_Date: StartDate,
        End_Date: EndDate,
        Management_Fee: parseFloat(MonthlyManagementFeeInput) ?? 0,
        Minimum_Fee: parseFloat(MonthlyMinimumFeeInput) ?? 0,
        Labor_Warehouse_Rate: parseFloat(StandardHourlyLaborInput) ?? 0,
        Labor_OT_Rate: parseFloat(OTHourlyLaborInput) ?? 0,
        Labor_IT_Rate: parseFloat(ITHourlyLaborInput) ?? 0,
        Receipt_Per_Case_Fee: parseFloat(receiptPerCase) ?? 0,
        Receipt_Per_Pallet_Fee: parseFloat(receiptPerPallet) ?? 0,
        Storage_Per_Pallet: parseFloat(storagePerPallet) ?? 0,
        Storage_Per_Shelf: parseFloat(storagePerShelf) ?? 0,
        Storage_Per_Bin: parseFloat(storagePerBin) ?? 0,
    };

    fetch("https://cleanstation.backendless.app/api/services/Estimate/LogOutCreateContract", {
        method: "POST",
        body: JSON.stringify(postContract),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
                    BrandId = data.BrandObjectId;           
                    fcobjId = data.objectId;    
                    // Handle success or further actions
                    enableTabAndTriggerClick("TabEstimate");
                    handleFcobjId(fcobjId);        
        })
        .catch((error) => {
            console.error("Error:", error);
            // Handle errors
        });
  } else {
     
        if (MonthlyManagementFeeInput == ""){
          ManagementFeeError.style.display = "block";
        }

        if (MonthlyMinimumFeeInput == ""){
          MinimumFeeError.style.display = "block";
        }     
        if (StandardHourlyLaborInput == "" || OTHourlyLaborInput == "" || ITHourlyLaborInput == ""){
          errorMisc.style.display = "block";
        }     
          // Handle validation errors
     }
});

 // --------------------------------------------------------------------
    // Function to set data

    function handleFcobjId(id) {
      console.log("Retrieved Fulfillment Contract detail:", id);
      fetch(
        `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${id}`
      ) .then((res) => {
        res.json()
        .then((data) => {

          const startDatee = new Date(data.Start_Date);
          const endDatee = new Date(data.End_Date);

          document.getElementById(
            "startDateText"
          ).innerHTML = `${startDatee.getDate()}/${
            startDatee.getMonth() + 1
          }/${startDatee.getFullYear()}`;
          document.getElementById(
            "endDateText"
          ).innerHTML = `${endDatee.getDate()}/${
            endDatee.getMonth() + 1
          }/${endDatee.getFullYear()}`;

          const timeDifference = endDatee.getTime() - startDatee.getTime();
          // Convert the time difference to days
          const daysDifference = timeDifference / (1000 * 3600 * 24);
          document.getElementById("daysDifference").innerHTML = daysDifference + " " + "Days";
          document.getElementById("brandNameText").innerHTML = Brandname;
          document.getElementById("managementFeeText").innerHTML = "$" + data.Management_Fee;
          document.getElementById("minimunFeeText").innerHTML = "$" + data.Minimum_Fee;
          document.getElementById("standardHourlyLaborText").innerHTML = "$" + data.Labor_Warehouse_Rate;
          document.getElementById("OTHourlytext").innerHTML = "$" + data.Labor_OT_Rate;
          document.getElementById("ITHourlyText").innerHTML = "$" + data.Labor_IT_Rate;
          document.getElementById("baseOrderFeeText").innerHTML = "$" + data.Base_Per_Order_Fee;
          document.getElementById("additionalPickFeeText").innerHTML = "$" + data.Additional_Pick_Fee;
          document.getElementById("baseReturnFeeText").innerHTML = "$" + data.Base_Per_Return_Fee;
          document.getElementById("perKitFeeText").innerHTML = "$" + data.Additional_Pick_Kit;
          document.getElementById("storagePerBinText").innerHTML = "$" + data.Storage_Per_Bin;
          document.getElementById("storagePerShelftext").innerHTML = "$" + data.Storage_Per_Shelf;
          document.getElementById("storagePerPalletText").innerHTML = "$" + data.Storage_Per_Pallet;
          document.getElementById("receiptPerPalletText").innerHTML = "$" + data.Receipt_Per_Pallet_Fee;
          document.getElementById("receiptPerCaseText").innerHTML = "$" + data.Receipt_Per_Case_Fee;
    });
  });
}

  //Back to Misc
  $(document).ready(function () {
    $("#backToMisc").click(function () {
      enableTabAndTriggerClick("TabMisc");
    });
  });

  // Show Hide using Estimate Button and set Quntity in Estimate Table

  $(document).ready(function () {
    checkInputs();
    // Attach the input event handlers
    $(
      "#receiptPerPalletInput, #storagePerPalletInput, #storagePerShelfInput, #receiptPerCaseInput, #storagePerBin, #BaseFeePerOrderInput, #AdditionalPickFeeInput, #BaseReturnFeeInput, #AssemblyPerKitInput, #StandardHourlyLaborInput, #OTHourlyLaborInput, #ITHourlyLaborInput"
    ).on("input", function () {
      checkInputs();
    });

    function checkInputs() {
      var receiptPerPalletValue = $("#receiptPerPalletInput").val();
      var storagePerPalletValue = $("#storagePerPalletInput").val();
      var storagePerShelfValue = $("#storagePerShelfInput").val();
      var receiptPerCaseValue = $("#receiptPerCaseInput").val();
      var storagePerBinValue = $("#storagePerBin").val();
      var BaseOrdersValue = $("#BaseFeePerOrderInput").val();
      var BasketSizeValue = $("#AdditionalPickFeeInput").val();
      var BaseReturnValue = $("#BaseReturnFeeInput").val();
      var AssemblyPerKitValue = $("#AssemblyPerKitInput").val();
      var StandardHourlyLaborValue = $("#StandardHourlyLaborInput").val();
      var ITHourlyLaborValue = $("#ITHourlyLaborInput").val();
      var OTHourlyLaborValue = $("#OTHourlyLaborInput").val();

      $("#PalletsReceivedInput").prop("readonly", receiptPerPalletValue === "");
      $("#PalletStorageInput").prop("readonly", storagePerPalletValue === "");
      $("#ShelfStorageInput").prop("readonly", storagePerShelfValue === "");
      $("#CasesReceivedInput").prop("readonly", receiptPerCaseValue === "");
      $("#BinStorageInput").prop("readonly", storagePerBinValue === "");
      $("#BaseOrdersInput").prop("readonly", BaseOrdersValue === "");
      $("#BasketSizeInput").prop("readonly", BasketSizeValue === "");
      $("#BaseReturnsInput").prop("readonly", BaseReturnValue === "");
      $("#KitsCreatedInput").prop("readonly", AssemblyPerKitValue === "");
      $("#WarehouseHoursInput").prop("readonly", StandardHourlyLaborValue === "" );
      $("#ITHours").prop("readonly", ITHourlyLaborValue === "");
      $("#OTHoursInput").prop("readonly", OTHourlyLaborValue === "");
    }

    let EstimateId; // Define EstimateId outside the click event handler
    $("#gotoEstimateDetail").click(function () {
      $("#GetStartedSection").hide();
      $("#EstimateDetailSection").show();
      $("#EstimateEnvoice").show();

      // Get values from input fields
      var PalletsReceivedInput = $("#PalletsReceivedInput").val();
      var casesReceived = $("#CasesReceivedInput").val();
      var palletStorage = $("#PalletStorageInput").val();
      var shelfStorage = $("#ShelfStorageInput").val();
      var binStorage = $("#BinStorageInput").val();
      var baseOrders = $("#BaseOrdersInput").val();
      var basketSize = $("#BasketSizeInput").val();
      var baseReturns = $("#BaseReturnsInput").val();
      var kitsCreated = $("#KitsCreatedInput").val();
      var warehouseHours = $("#WarehouseHoursInput").val();
      var otHours = $("#OTHoursInput").val();
      var itHours = $("#ITHours").val();


      // Create Object

      let estimatorDetails = {
        Fulfillment_contract: {
          objectId: fcobjId,
        },
        ReceiptPallet: PalletsReceivedInput !== "" ? parseFloat(PalletsReceivedInput) : 0,
        ReceiptCase: casesReceived !== "" ? parseFloat(casesReceived) : 0,
        Pallets: palletStorage !== "" ? parseFloat(palletStorage) : 0,
        Shelfs: shelfStorage !== "" ? parseFloat(shelfStorage) : 0,
        Bins: binStorage !== "" ? parseFloat(binStorage) : 0,
        TotalOrders: baseOrders !== "" ? parseFloat(baseOrders) : 0,
        ExtraPicks: basketSize !== "" ? parseInt(basketSize) : 0,
        Returns: baseReturns !== "" ? parseFloat(baseReturns) : 0,
        KitsBuilt: kitsCreated !== "" ? parseFloat(kitsCreated) : 0,
        WHHours: warehouseHours !== "" ? parseFloat(warehouseHours) : 0,
        OTHours: otHours !== "" ? parseFloat(otHours) : 0,
        ITHours: itHours !== "" ? parseFloat(itHours) : 0,
      };

      // Call API to save the Estimate data
      fetch(
        "https://cleanstation.backendless.app/api/services/Estimate/LogOutEstimata",
        {
          method: "POST",
          body: JSON.stringify(estimatorDetails),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          EstimateId = data.objectId;
          EstimatBrandId = data.objectId;
          localStorage.setItem("EstimatBrandId", EstimatBrandId);
          handleEstimateId(EstimatBrandId);

          const chartData = {
            totalStorage: data.TotalStorageCharge,
            totalPicCharges: data.TotalPickCharge,
            totalReceipts: data.TotalReceiptCharge,
            totalMisc: data.TotalMiscCharge,
          };

          // Create the doughnut chart using the provided function
          createDoughnutChart(chartData);

          let TotalSpents = data.TotalCost / data.TotalOrders == 0 ? 1 : data.TotalOrders ;

          TotalSpents = data.TotalOrders != 0 ? "$ " + data.TotalCost / data.TotalOrders : "No order found!" ;

          document.getElementById("TotalSpent").textContent = "$ " + data.TotalCost;
          document.getElementById("TotalAveragePerOrder").textContent = TotalSpents;
          document.getElementById("TotalPickFeesCalc").textContent = "$ " + data.TotalPickCharge;
          document.getElementById("TotalStorage").textContent = "$ " + data.TotalStorageCharge;
          document.getElementById("TotalkReceipt").textContent = "$ " + data.TotalReceiptCharge;
          document.getElementById("TotalMisclabor").textContent = "$ " + data.TotalMiscCharge;
        });
    });
  });

  // handle EstimatorID
  function handleEstimateId(id) {
    console.log("Retrieved Estimator:", id);

    // load estimator by id
    fetch(
      `https://cleanstation.backendless.app/api/data/Estimate/${id}?loadRelations=Fulfillment_Contract`
    ).then((res) => {
      res.json().then((data) => {
        // Pick Fee
        document.getElementById("totalBaseOrderText").innerHTML = data.TotalOrders;
        document.getElementById("totalAdditionalPickText").innerHTML = data.ExtraPicks;
        document.getElementById("totalBaseReturnText").innerHTML = data.Returns;
        document.getElementById("totalKitText").innerHTML = data.KitsBuilt;

        // Storage
        document.getElementById("totalPalletStorageText").innerHTML = data.Pallets;
        document.getElementById("totalShelfStorageText").innerHTML = data.Shelfs;
        document.getElementById("totalBinStorageText").innerHTML = data.Bins;

        // Receiving
        document.getElementById("totalPalletReceivedText").innerHTML = data.ReceiptPallet;
        document.getElementById("totalcasesReceivedText").innerHTML = data.ReceiptCase;

        // Labour
        document.getElementById("totalStandardHourtext").innerHTML = data.WHHours;
        document.getElementById("totalOTHourlyText").innerHTML = data.OTHours;
        document.getElementById("totalITHourlyText").innerHTML = data.ITHours;
      });
    });
  }



  // // Add Fullfillment Center
  // $("#addFccenter").click(function () {
  //   showAllErrors();

  //   let fcName = $("#fcName").val();
  //   let fcUrl = $("#fcUrl").val();
  //   let fcaddress = $("#fcaddress").val();
  //   let fcstorageType = $("#fcstorageType").val();
  //   let fcCity = $("#fcCity").val();
  //   let fcState = $("#fcState").val();
  //   let fcZipCode = $("#fcZipCode").val();
  //   let fcCounter = $("#fcCounter").val();

  //   // Check if any required field is empty
  //   if (
  //     !fcName ||
  //     !fcUrl || 
  //     !fcstorageType ||
  //     !fcaddress ||
  //     !fcCity ||
  //     !fcState ||
  //     !fcZipCode ||
  //     !fcCounter
  //   ) {
  //     // // Set the error message and apply red color
  //     $("#errorAddfccenter").text("Please fill all required fields.");
  //     $("#errorAddfccenter").css("color", "red");
  //     $("#errorAddfccenter").show();
  //     return; // Stop the function from proceeding further
  //     // Set up input events for each field
  //   }

  //   let createFCData = {
  //     Center_Name: fcName,
  //     Street_Address: fcaddress,
  //     ZIP_Code: parseFloat(fcZipCode) ?? 0,
  //     Storage_Type: fcstorageType,
  //     City: fcCity,
  //     URL: fcUrl,      
  //     State: fcState,
  //     Country: fcCounter,
  //   };

  //   // Show a loading indicator while the API call is being made

  //   fetch(
  //     "https://cleanstation.backendless.app/api/services/Fulfillment_center/Fulfillment_Center",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(createFCData),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const redirectUrl =
  //         "https://izba-exchange.webflow.io/invoice-estimator";

  //       // Perform the redirect using window.location.href
  //       window.location.href = redirectUrl;
  //     })

  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // });


  // $("#addFccenter").click(function () {
  //   showAllErrors();

  //   let fcName = $("#fcName").val();
  //   let fcUrl = $("#fcUrl").val();
  //   let fcaddress = $("#fcaddress").val();
  //   let fcstorageType = $("#fcstorageType").val();
  //   let fcCity = $("#fcCity").val();
  //   let fcState = $("#fcState").val();
  //   let fcZipCode = $("#fcZipCode").val();
  //   let fcCounter = $("#fcCounter").val();

  //   // Reset previous error messages
  //   $("#fcNameError, #fcUrlError, #fcaddressError, #fcCityError, #fcStateError, #fcZipCodeError, #fcCounterError").text(""); // Reset the error messages

  //   // Check if any required field is empty
  //   let hasError = false;

  //   if (!fcName) {
  //     $("#fcNameError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcUrl) {
  //     $("#fcUrlError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcaddress) {
  //     $("#fcaddressError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcCity) {
  //     $("#fcCityError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcState) {
  //     $("#fcStateError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcZipCode) {
  //     $("#fcZipCodeError").text("Field is required");
  //     hasError = true;
  //   }

  //   if (!fcCounter) {
  //     $("#fcCounterError").text("Field is required");
  //     hasError = true;
  //   }

  //   // Add input event listeners to clear error messages on input
  //   $("#fcName").on("input", function () {
  //     if ($("#fcName").val()) {
  //       $("#fcNameError").text(""); // Clear the error message
  //     } else {
  //       $("#fcNameError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcUrl").on("input", function () {
  //     if ($("#fcUrl").val()) {
  //       $("#fcUrlError").text(""); // Clear the error message
  //     } else {
  //       $("#fcUrlError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcaddress").on("input", function () {
  //     if ($("#fcaddress").val()) {
  //       $("#fcaddressError").text(""); // Clear the error message
  //     } else {
  //       $("#fcaddressError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcCity").on("input", function () {
  //     if ($("#fcCity").val()) {
  //       $("#fcCityError").text(""); // Clear the error message
  //     } else {
  //       $("#fcCityError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcState").on("input", function () {
  //     if ($("#fcState").val()) {
  //       $("#fcStateError").text(""); // Clear the error message
  //     } else {
  //       $("#fcStateError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcZipCode").on("input", function () {
  //     if ($("#fcZipCode").val()) {
  //       $("#fcZipCodeError").text(""); // Clear the error message
  //     } else {
  //       $("#fcZipCodeError").text("Field is required"); // Set the error message
  //     }
  //   });

  //   $("#fcCounter").on("input", function () {
  //     if ($("#fcCounter").val()) {
  //       $("#fcCounterError").text(""); // Clear the error message
  //     } else {
  //       $("#fcCounterError").text("Field is required"); // Set the error message
  //     }
  //   });


  //   if (hasError) {
  //     return;
  //   }

  //   let createFCData = {
  //     Center_Name: fcName,
  //     Street_Address: fcaddress,
  //     ZIP_Code: parseFloat(fcZipCode) ?? 0,
  //     Storage_Type: fcstorageType,
  //     City: fcCity,
  //     URL: fcUrl,
  //     State: fcState,
  //     Country: fcCounter,
  //   };

  //   // Show a loading indicator while the API call is being made

  //   fetch(
  //     "https://cleanstation.backendless.app/api/services/Fulfillment_center/Fulfillment_Center",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(createFCData),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw  Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const redirectUrl = "https://izba-exchange.webflow.io/invoice-estimator";

  //       // Perform the redirect using window.location.href
  //       window.location.href = redirectUrl;
  //     })

  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // });



  // function handleInputWithValidation(inputId, errorId) {
  //   const input = $(inputId);
  //   const error = $(errorId);
  //   input.on("input", function () {
  //     if (input.val()) {
  //       error.text(""); // Clear the error message
  //     } else {
  //       error.text("Field is required"); // Set the error message
  //     }
  //   });
  // }

  // $("#addFccenter").click(function () {
  //   showAllErrors();

  //   const fields = [
  //     { inputId: "#fcName", errorId: "#fcNameError" },
  //     { inputId: "#fcUrl", errorId: "#fcUrlError" },
  //     { inputId: "#fcaddress", errorId: "#fcaddressError" },
  //     { inputId: "#fcCity", errorId: "#fcCityError" },
  //     { inputId: "#fcState", errorId: "#fcStateError" },
  //     { inputId: "#fcZipCode", errorId: "#fcZipCodeError" },
  //     { inputId: "#fcCounter", errorId: "#fcCounterError" },
  //   ];

  //   // Reset previous error messages
  //   fields.forEach(field => $(field.errorId).text(""));

  //   // Check if any required field is empty
  //   let hasError = false;

  //   fields.forEach(field => {
  //     const input = $(field.inputId);
  //     if (!input.val()) {
  //       $(field.errorId).text("Field is required");
  //       hasError = true;
  //     }
  //     handleInputWithValidation(field.inputId, field.errorId);
  //   });

  //   if (hasError) {
  //     return;
  //   }

  //     let createFCData = {
  //     Center_Name: fcName,
  //     Street_Address: fcaddress,
  //     ZIP_Code: parseFloat(fcZipCode) ?? 0,
  //     Storage_Type: "Chilled",
  //     City: fcCity,
  //     URL: fcUrl,
  //     State: fcState,
  //     Country: fcCounter,
  //   };

  //   // Show a loading indicator while the API call is being made

  //   fetch(
  //     "https://cleanstation.backendless.app/api/services/Fulfillment_center/Fulfillment_Center",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(createFCData),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw  Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const redirectUrl = "https://izba-exchange.webflow.io/invoice-estimator";

  //       // Perform the redirect using window.location.href
  //       window.location.href = redirectUrl;
  //     })

  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // });

 $("#AddFulfillmentButton").click(function () {
      $("#GetStartedSection").hide();
      $("#errorAddfccenter").hide();
      $("#NewFulfillmentCenterSection").show();    

      // hide error msg 
      hideError("#fcNameError");
      hideError("#fcUrlError");
      hideError("#fcaddressError");
      hideError("#fcCityError");
      hideError("#fcStateError");
      hideError("#fcZipCodeError");
      hideError("#fcCounterError");
  });

  $("#closeFulfillmentCenterPopup").click(function () {
      $("#NewFulfillmentCenterSection").hide();
      $("#GetStartedSection").show();
       // hide error msg 
       hideError("#fcNameError");
       hideError("#fcUrlError");
       hideError("#fcaddressError");
       hideError("#fcCityError");
       hideError("#fcStateError");
       hideError("#fcZipCodeError");
       hideError("#fcCounterError");
    });

    function showError(selector, message) {
      $(selector).text(message).show();
    }

    function hideError(selector) {
      $(selector).hide();
    }

    function showAllErrors() {
      let fcName = $("#fcName").val();
      let fcUrl = $("#fcUrl").val();
      let fcaddress = $("#fcaddress").val();
      let fcCity = $("#fcCity").val();
      let fcState = $("#fcState").val();
      let fcZipCode = $("#fcZipCode").val();
      let fcCounter = $("#fcCounter").val();
      // Check if input fields are empty
      if (fcName === "") {
        showError("#fcNameError", "Fulfillment center name should not be blank");
      } else {
        hideError("#fcNameError");
      }

      if (fcUrl === "") {
        showError("#fcUrlError", "Fulfillment center URL should not be blank");
      } else {
        hideError("#fcUrlError");
      }

      if (fcaddress === "") {
        showError("#fcaddressError", "Fulfillment center address should not be blank");
      } else {
        hideError("#fcaddressError");
      }

      if (fcCity === "") {
        showError("#fcCityError", "Fulfillment center city should not be blank");
      } else {
        hideError("#fcCityError");
      }

      if (fcState === "") {
        showError( "#fcStateError","Fulfillment center state should not be blank"  );
      } else {
        hideError("#fcStateError");
      }

      if (fcZipCode === "") {
        showError( "#fcZipCodeError",  "Fulfillment center zip code should not be blank"   );
      } else {
        hideError("#fcZipCodeError");
      }

      if (fcCounter === "") {
        showError("#fcCounterError","Fulfillment center country should not be blank"  );
      } else {
        hideError("#fcCounterError");
      }
    }


  function handleInputWithValidation(inputId, errorId) {
    const input = $(inputId);
    const error = $(errorId);
    input.on("input", function () {
      if (input.val()) {
        error.text(""); // Clear the error message
      } else {
        error.text("Field is required"); // Set the error message
      }
    });
  }

  

  $("#addFccenter").click(function () {
    showAllErrors();

   const fields = [
      { inputId: "#fcName", errorId: "#fcNameError" },
      { inputId: "#fcUrl", errorId: "#fcUrlError" },
      { inputId: "#fcaddress", errorId: "#fcaddressError" },
      { inputId: "#fcCity", errorId: "#fcCityError" },
      { inputId: "#fcState", errorId: "#fcStateError" },
      { inputId: "#fcZipCode", errorId: "#fcZipCodeError" },
      { inputId: "#fcCounter", errorId: "#fcCounterError" },
    ];
    // Reset previous error messages
    fields.forEach(field => $(field.errorId).text(""));

    // Check if any required field is empty
    let hasError = false;

    fields.forEach(field => {
      const input = $(field.inputId);
      if (!input.val()) {
        $(field.errorId).text("Field is required");
        hasError = true;
      }
      handleInputWithValidation(field.inputId, field.errorId);
    });

    if (hasError) {
      return;
    }

    let createFCData = {
      Center_Name: $("#fcName").val(),
      Street_Address: $("#fcaddress").val(),
      ZIP_Code: parseFloat($("#fcZipCode").val()) || 0,
      // Storage_Type: $("#fcstorageType").val(),
      City: $("#fcCity").val(),
      URL: $("#fcUrl").val(),
      State: $("#fcState").val(),
      Country: $("#fcCounter").val(),
    };

    // Show a loading indicator while the API call is being made
    fetch("https://cleanstation.backendless.app/api/services/Fulfillment_center/Fulfillment_Center", {
      method: "POST",
      body: JSON.stringify(createFCData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {

        $("NewFulfillmentCenterSection").hide();

        Swal.fire({
          icon: "success", // Use a success icon
          title: "Your Fulfillment Center has been successfully added. Thank you!",
          showCancelButton: false,
          confirmButtonText: "Okay",
        }).then((result) => {
          if (result.isConfirmed) {
            const redirectUrl = "https://izba-exchange.webflow.io/invoice-estimator";
            window.location.href = redirectUrl;
          }
        });

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });


  // hide the no result section
  let data2 = document.getElementById("centers").length;
  if (data2 <= 0) {
    document.getElementById("fcConatainer").style.display = "block";
  }
});

//-------------------------------------------------- New tings ----------------------------------------------------//////////

// formate Date
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Click on update button to set data in the fields 

//update Estimator by id
$("#updateButton").click(function () {
$("#updateSummrydata").show();
$("#EstimateDetailSection").hide();
$("#EstimateEnvoice").hide();
  
    // get estimator data for update
fetch(
      `https://cleanstation.backendless.app/api/services/Estimate/LogOutEstimateIDToData?EstimateID=${EstimatBrandId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
    .then((response) => response.json())
    .then((Data) => {
      console.log(Data,"Dataaaa");
         //Brand name
    document.getElementById("bname").value = Data.Fulfillment_contract.Contract_name;
          // Set the current values in the input fields
    document.getElementById("updatestart").value = formatDate(Data.Fulfillment_contract.Start_Date);
    document.getElementById("updateEnddate").value = formatDate(Data.Fulfillment_contract.End_Date);
    document.getElementById("updateManagementFee").value = Data.Fulfillment_contract.Management_Fee;
    document.getElementById("updateMInimumFee").value = Data.Fulfillment_contract.Minimum_Fee;
    document.getElementById("updateWarehouseFee").value = Data.Fulfillment_contract.Labor_Warehouse_Rate;
    document.getElementById("updateOTLabor").value = Data.Fulfillment_contract.Labor_OT_Rate;
    document.getElementById("updateITLabor").value = Data.Fulfillment_contract.Labor_IT_Rate;
    document.getElementById("updateBaseOrderFee").value = Data.Fulfillment_contract.Base_Per_Order_Fee;
    document.getElementById("updateAdditionalPickFee").value = Data.Fulfillment_contract.Additional_Pick_Fee;
    document.getElementById("updateBaseReturnFee").value = Data.Fulfillment_contract.Base_Per_Return_Fee;
    document.getElementById("updatePerKitFee").value = Data.Fulfillment_contract.Additional_Pick_Kit;
    document.getElementById("updateStoragePerBin").value = Data.Fulfillment_contract.Storage_Per_Bin;
    document.getElementById("updateStoragePerShelf").value = Data.Fulfillment_contract.Storage_Per_Shelf;
    document.getElementById("updateStoragePerPallet").value = Data.Fulfillment_contract.Storage_Per_Pallet;
    document.getElementById("updateReceiptPerPallet").value = Data.Fulfillment_contract.Receipt_Per_Pallet_Fee;
    document.getElementById("updateReceiptPerCase").value = Data.Fulfillment_contract.Receipt_Per_Case_Fee;

        // Pick Fee
        document.getElementById("UpdateTotalBaseOrder").value = Data.TotalOrders;
        document.getElementById("updateNumberAdditionlPick").value = Data.ExtraPicks;
        document.getElementById("updateNumberBaseReturn").value = Data.Returns;
        document.getElementById("updatePerKitCreated").value = Data.KitsBuilt;

        // Storage
        document.getElementById("updatePalletStorage").value = Data.Pallets;
        document.getElementById("UpdateShelfOccupied").value = Data.Shelfs;
        document.getElementById("updateBinOccupied").value = Data.Bins;

        // Receiving
        document.getElementById("updatePalletReceived").value = Data.ReceiptPallet;
        document.getElementById("UpdateCaseReceived").value = Data.ReceiptCase;
        // Labour
        document.getElementById("updateStandardHours").value = Data.WHHours;
        document.getElementById("updateOTHourConsumed").value = Data.OTHours;
        document.getElementById("updateITHourConsumed").value = Data.ITHours;
    
    })
     .catch((error) => console.error("Error:", error));


});


//------------------------------------------------ End New tings ---------------------------------------------------//

// // Click on update button to set Data in the fields 
//   //update Estimator by id
//   $("#updateButton").click(function () {
//     $("#updateSummrydata").show();
//     $("#EstimateDetailSection").hide();
//     $("#EstimateEnvoice").hide();

//     // BrandName
//     fetch(`https://cleanstation.backendless.app/api/data/Brand/${BrandId}`).then(
//       (res) => {
//         res.json().then((data) => {
//           document.getElementById("bname").value = data.brand_name;
//         });
//       }
//     );

//      // formate Date
//     function formatDate(dateString) {
//       const date = new Date(dateString);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       return `${year}-${month}-${day}`;
//     }

//     fetch(
//       `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         // Set the current values in the input fields
//         document.getElementById("updatestart").value = formatDate( data.Start_Date );
//         document.getElementById("updateEnddate").value = formatDate(data.End_Date );
//         document.getElementById("updateManagementFee").value = data.Management_Fee;
//         document.getElementById("updateMInimumFee").value = data.Minimum_Fee;
//         document.getElementById("updateWarehouseFee").value = data.Labor_Warehouse_Rate;
//         document.getElementById("updateOTLabor").value = data.Labor_OT_Rate;
//         document.getElementById("updateITLabor").value = data.Labor_IT_Rate;
//         document.getElementById("updateBaseOrderFee").value = data.Base_Per_Order_Fee;
//         document.getElementById("updateAdditionalPickFee").value = data.Additional_Pick_Fee;
//         document.getElementById("updateBaseReturnFee").value = data.Base_Per_Return_Fee;
//         document.getElementById("updatePerKitFee").value = data.Additional_Pick_Kit;
//         document.getElementById("updateStoragePerBin").value = data.Storage_Per_Bin;
//         document.getElementById("updateStoragePerShelf").value = data.Storage_Per_Shelf;
//         document.getElementById("updateStoragePerPallet").value = data.Storage_Per_Pallet;
//         document.getElementById("updateReceiptPerPallet").value = data.Receipt_Per_Pallet_Fee;
//         document.getElementById("updateReceiptPerCase").value = data.Receipt_Per_Case_Fee;

//         // get estimator data for update
//         fetch(
//           `https://cleanstation.backendless.app/api/data/Estimate/${EstimatBrandId}?loadRelations=Fulfillment_Contract`
//         ).then((res) => {
//           res.json().then((data) => {
//             console.log("get estimater Data", data);
//             // Pick Fee
//             document.getElementById("UpdateTotalBaseOrder").value = data.TotalOrders;
//             document.getElementById("updateNumberAdditionlPick").value = data.ExtraPicks;
//             document.getElementById("updateNumberBaseReturn").value = data.Returns;
//             document.getElementById("updatePerKitCreated").value = data.KitsBuilt;

//             // Storage
//             document.getElementById("updatePalletStorage").value = data.Pallets;
//             document.getElementById("UpdateShelfOccupied").value = data.Shelfs;
//             document.getElementById("updateBinOccupied").value = data.Bins;

//             // Receiving
//             document.getElementById("updatePalletReceived").value = data.ReceiptPallet;
//             document.getElementById("UpdateCaseReceived").value = data.ReceiptCase;
//             // Labour
//             document.getElementById("updateStandardHours").value = data.WHHours;
//             document.getElementById("updateOTHourConsumed").value = data.OTHours;
//             document.getElementById("updateITHourConsumed").value = data.ITHours;
//           });
//         });
//       })
//       .catch((error) => console.error("Error:", error));
//   });

// Update button click event for saving the updated values



//-------------------------------------------------- New Tings ----------------------------------------------------//

// Update button click event for saving the updated values
$("#FinalupdateButton").click(function () {

  const UpdateEstimateData = {
    Fulfillment_Contract : {
      Contract_name : document.getElementById("bname").value,
      Start_Date: document.getElementById("updatestart").value,
    End_Date: document.getElementById("updateEnddate").value,
    Management_Fee:
      document.getElementById("updateManagementFee").value === "" ? 0 : parseFloat(document.getElementById("updateManagementFee").value),
    Minimum_Fee:
      document.getElementById("updateMInimumFee").value === "" ? 0 : parseFloat(document.getElementById("updateMInimumFee").value),
    Labor_Warehouse_Rate:
      document.getElementById("updateWarehouseFee").value === "" ? 0 : parseFloat(document.getElementById("updateWarehouseFee").value),
    Labor_OT_Rate:
      document.getElementById("updateOTLabor").value === "" ? 0 : parseFloat(document.getElementById("updateOTLabor").value),
    Labor_IT_Rate:
      document.getElementById("updateITLabor").value === "" ? 0 : parseFloat(document.getElementById("updateITLabor").value),
    Base_Per_Order_Fee:
      document.getElementById("updateBaseOrderFee").value === "" ? 0 : parseFloat(document.getElementById("updateBaseOrderFee").value),
    Additional_Pick_Fee:
      document.getElementById("updateAdditionalPickFee").value === "" ? 0 : parseFloat(document.getElementById("updateAdditionalPickFee").value),
    Base_Per_Return_Fee:
      document.getElementById("updateBaseReturnFee").value === "" ? 0 : parseFloat(document.getElementById("updateBaseReturnFee").value),
    Additional_Pick_Kit:
      document.getElementById("updatePerKitFee").value === "" ? 0 : parseFloat(document.getElementById("updatePerKitFee").value),
    Storage_Per_Bin:
      document.getElementById("updateStoragePerBin").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerBin").value),
    Storage_Per_Shelf:
      document.getElementById("updateStoragePerShelf").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerShelf").value),
    Storage_Per_Pallet:
      document.getElementById("updateStoragePerPallet").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerPallet").value),
    Receipt_Per_Pallet_Fee:
      document.getElementById("updateReceiptPerPallet").value === "" ? 0 : parseFloat(document.getElementById("updateReceiptPerPallet").value),
    Receipt_Per_Case_Fee:
      document.getElementById("updateReceiptPerCase").value === "" ? 0 : parseFloat(document.getElementById("updateReceiptPerCase").value)    
},
  Estimate: {
    objectId: EstimatBrandId,
    ReceiptPallet: +document.getElementById("updatePalletReceived").value || 0,
    ReceiptCase: +document.getElementById("UpdateCaseReceived").value || 0,
    Pallets: +document.getElementById("updatePalletStorage").value || 0,
    Shelfs: +document.getElementById("UpdateShelfOccupied").value || 0,
    Bins: +document.getElementById("updateBinOccupied").value || 0,
    TotalOrders: +document.getElementById("UpdateTotalBaseOrder").value || 0,
    ExtraPicks: +document.getElementById("updateNumberAdditionlPick").value || 0,
    Returns: +document.getElementById("updateNumberBaseReturn").value || 0,
    KitsBuilt: +document.getElementById("updatePerKitCreated").value || 0,
    WHHours: +document.getElementById("updateStandardHours").value || 0,
    OTHours: +document.getElementById("updateOTHourConsumed").value || 0,
    ITHours: +document.getElementById("updateITHourConsumed").value || 0,
  }

};

fetch(`https://cleanstation.backendless.app/api/services/Estimate/LogOutUpdate`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UpdateEstimateData),
  })
    .then((response) => response.json())
    .then((data) => {

      //Brand
      document.getElementById("brandNameText").innerHTML = data.Fulfillment_Contract.Contract_name;

      //Contract
      const startDate = new Date(data.Fulfillment_Contract.Start_Date);
      const endDate = new Date(data.Fulfillment_Contract.End_Date);
      document.getElementById("startDateText").innerHTML = `${startDate.getDate()}/${startDate.getMonth() + 1 }/${startDate.getFullYear()}`;
      document.getElementById("endDateText").innerHTML = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
      const timeDifference = endDate.getTime() - startDate.getTime();

      // Convert the time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);
      
      document.getElementById("daysDifference").innerHTML = daysDifference + " " + "Days";
      document.getElementById("managementFeeText").innerHTML = "$" + data.Fulfillment_Contract.Management_Fee;
      document.getElementById("minimunFeeText").innerHTML = "$" + data.Fulfillment_Contract.Minimum_Fee;
      document.getElementById("standardHourlyLaborText").innerHTML = "$" + data.Fulfillment_Contract.Labor_Warehouse_Rate;
      document.getElementById("OTHourlytext").innerHTML = "$" + data.Fulfillment_Contract.Labor_OT_Rate;
      document.getElementById("ITHourlyText").innerHTML = "$" + data.Fulfillment_Contract.Labor_IT_Rate;
      document.getElementById("baseOrderFeeText").innerHTML = "$" + data.Fulfillment_Contract.Base_Per_Order_Fee;
      document.getElementById("additionalPickFeeText").innerHTML = "$" + data.Fulfillment_Contract.Additional_Pick_Fee;
      document.getElementById("baseReturnFeeText").innerHTML = "$" + data.Fulfillment_Contract.Base_Per_Return_Fee;
      document.getElementById("perKitFeeText").innerHTML = "$" + data.Fulfillment_Contract.Additional_Pick_Kit;
      document.getElementById("storagePerBinText").innerHTML = "$" + data.Fulfillment_Contract.Storage_Per_Bin;
      document.getElementById("storagePerShelftext").innerHTML = "$" + data.Fulfillment_Contract.Storage_Per_Shelf;
      document.getElementById("storagePerPalletText").innerHTML = "$" + data.Fulfillment_Contract.Storage_Per_Pallet;
      document.getElementById("receiptPerPalletText").innerHTML = "$" + data.Fulfillment_Contract.Receipt_Per_Pallet_Fee;
      document.getElementById("receiptPerCaseText").innerHTML = "$" + data.Fulfillment_Contract.Receipt_Per_Case_Fee;

      //

      // Pick Fee
      
      document.getElementById("totalBaseOrderText").innerHTML = data.TotalOrders;
      document.getElementById("totalAdditionalPickText").innerHTML = data.ExtraPicks;
      document.getElementById("totalBaseReturnText").innerHTML = data.Returns;
      document.getElementById("totalKitText").innerHTML = data.KitsBuilt;

      // Storage
      document.getElementById("totalPalletStorageText").innerHTML = data.Pallets;
      document.getElementById("totalShelfStorageText").innerHTML = data.Shelfs;
      document.getElementById("totalBinStorageText").innerHTML = data.Bins;

      // Receiving
      document.getElementById("totalPalletReceivedText").innerHTML = data.ReceiptPallet;
      document.getElementById("totalcasesReceivedText").innerHTML = data.ReceiptCase;

      // Labour
      document.getElementById("totalStandardHourtext").innerHTML = data.WHHours + "hrs";
      document.getElementById("totalOTHourlyText").innerHTML = data.OTHours + "hrs";
      document.getElementById("totalITHourlyText").innerHTML = data.ITHours + "hrs";

      const chartData = {
        totalStorage: data.TotalStorageCharge,
        totalPicCharges: data.TotalPickCharge,
        totalReceipts: data.TotalReceiptCharge,
        totalMisc: data.TotalMiscCharge,
      };
      createDoughnutChart(chartData);
    })
    .catch((error) => console.error("Error:", error));

    $("#updateSummrydata").hide();
    $("#EstimateDetailSection").show();
    $("#EstimateEnvoice").show();
  });

//--------------------------------------------------End New tings----------------------------------------------------//////////

// $("#FinalupdateButton").click(function () {
//   const updateBrandData = {
//     brand_name: document.getElementById("bname").value,
//   };

//   // Retrieve the updated values from the input fields
//   const updatedData = {
//     Start_Date: document.getElementById("updatestart").value,
//     End_Date: document.getElementById("updateEnddate").value,
//     Management_Fee:
//       document.getElementById("updateManagementFee").value === "" ? 0 : parseFloat(document.getElementById("updateManagementFee").value),
//     Minimum_Fee:
//       document.getElementById("updateMInimumFee").value === "" ? 0 : parseFloat(document.getElementById("updateMInimumFee").value),
//     Labor_Warehouse_Rate:
//       document.getElementById("updateWarehouseFee").value === "" ? 0 : parseFloat(document.getElementById("updateWarehouseFee").value),
//     Labor_OT_Rate:
//       document.getElementById("updateOTLabor").value === "" ? 0 : parseFloat(document.getElementById("updateOTLabor").value),
//     Labor_IT_Rate:
//       document.getElementById("updateITLabor").value === "" ? 0 : parseFloat(document.getElementById("updateITLabor").value),
//     Base_Per_Order_Fee:
//       document.getElementById("updateBaseOrderFee").value === "" ? 0 : parseFloat(document.getElementById("updateBaseOrderFee").value),
//     Additional_Pick_Fee:
//       document.getElementById("updateAdditionalPickFee").value === "" ? 0 : parseFloat(document.getElementById("updateAdditionalPickFee").value),
//     Base_Per_Return_Fee:
//       document.getElementById("updateBaseReturnFee").value === "" ? 0 : parseFloat(document.getElementById("updateBaseReturnFee").value),
//     Additional_Pick_Kit:
//       document.getElementById("updatePerKitFee").value === "" ? 0 : parseFloat(document.getElementById("updatePerKitFee").value),
//     Storage_Per_Bin:
//       document.getElementById("updateStoragePerBin").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerBin").value),
//     Storage_Per_Shelf:
//       document.getElementById("updateStoragePerShelf").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerShelf").value),
//     Storage_Per_Pallet:
//       document.getElementById("updateStoragePerPallet").value === "" ? 0 : parseFloat(document.getElementById("updateStoragePerPallet").value),
//     Receipt_Per_Pallet_Fee:
//       document.getElementById("updateReceiptPerPallet").value === "" ? 0 : parseFloat(document.getElementById("updateReceiptPerPallet").value),
//     Receipt_Per_Case_Fee:
//       document.getElementById("updateReceiptPerCase").value === "" ? 0 : parseFloat(document.getElementById("updateReceiptPerCase").value),
//   };

//   // object for Estimator for update
//   const UpdateEstimatorqunt = {
//     ReceiptPallet: +document.getElementById("updatePalletReceived").value || 0,
//     ReceiptCase: +document.getElementById("UpdateCaseReceived").value || 0,
//     Pallets: +document.getElementById("updatePalletStorage").value || 0,
//     Shelfs: +document.getElementById("UpdateShelfOccupied").value || 0,
//     Bins: +document.getElementById("updateBinOccupied").value || 0,
//     TotalOrders: +document.getElementById("UpdateTotalBaseOrder").value || 0,
//     ExtraPicks: +document.getElementById("updateNumberAdditionlPick").value || 0,
//     Returns: +document.getElementById("updateNumberBaseReturn").value || 0,
//     KitsBuilt: +document.getElementById("updatePerKitCreated").value || 0,
//     WHHours: +document.getElementById("updateStandardHours").value || 0,
//     OTHours: +document.getElementById("updateOTHourConsumed").value || 0,
//     ITHours: +document.getElementById("updateITHourConsumed").value || 0,
//   };

//   // Update Brand Name
//   fetch(`https://cleanstation.backendless.app/api/data/Brand/${BrandId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updateBrandData),
//   })
//     .then((response) => response.json())
//     .then((updateBrandData) => {
//       console.log("Data updated:", updateBrandData);
//       // Update the displayed data without refreshing the page
//       document.getElementById("brandNameText").innerHTML =
//         updateBrandData.brand_name;
//     });

//   // Perform the update by sending a PUT request to the API
//   fetch(
//     `https://cleanstation.backendless.app/api/data/Fulfillment_Contract/${fcobjId}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     }
//   )
//     .then((response) => response.json())
//     .then((updatedData) => {
//       console.log(updatedData,"final update dataaa");
//       Swal.fire("Success", "Contarct Data Updated Successfully", "success");

//       // Update the displayed data without refreshing the page
//       const startDate = new Date(updatedData.Start_Date);
//       const endDate = new Date(updatedData.End_Date);
//       document.getElementById(
//         "startDateText"
//       ).innerHTML = `${startDate.getDate()}/${
//         startDate.getMonth() + 1
//       }/${startDate.getFullYear()}`;
//       document.getElementById(
//         "endDateText"
//       ).innerHTML = `${endDate.getDate()}/${
//         endDate.getMonth() + 1
//       }/${endDate.getFullYear()}`;

//       const timeDifference = endDate.getTime() - startDate.getTime();
//       // Convert the time difference to days
//       const daysDifference = timeDifference / (1000 * 3600 * 24);
//       document.getElementById("daysDifference").innerHTML = daysDifference + " " + "Days";
//       document.getElementById("managementFeeText").innerHTML = "$" + updatedData.Management_Fee;
//       document.getElementById("minimunFeeText").innerHTML = "$" + updatedData.Minimum_Fee;
//       document.getElementById("standardHourlyLaborText").innerHTML = "$" + updatedData.Labor_Warehouse_Rate;
//       document.getElementById("OTHourlytext").innerHTML = "$" + updatedData.Labor_OT_Rate;
//       document.getElementById("ITHourlyText").innerHTML = "$" + updatedData.Labor_IT_Rate;
//       document.getElementById("baseOrderFeeText").innerHTML = "$" + updatedData.Base_Per_Order_Fee;
//       document.getElementById("additionalPickFeeText").innerHTML = "$" + updatedData.Additional_Pick_Fee;
//       document.getElementById("baseReturnFeeText").innerHTML = "$" + updatedData.Base_Per_Return_Fee;
//       document.getElementById("perKitFeeText").innerHTML = "$" + updatedData.Additional_Pick_Kit;
//       document.getElementById("storagePerBinText").innerHTML = "$" + updatedData.Storage_Per_Bin;
//       document.getElementById("storagePerShelftext").innerHTML = "$" + updatedData.Storage_Per_Shelf;
//       document.getElementById("storagePerPalletText").innerHTML = "$" + updatedData.Storage_Per_Pallet;
//       document.getElementById("receiptPerPalletText").innerHTML = "$" + updatedData.Receipt_Per_Pallet_Fee;
//       document.getElementById("receiptPerCaseText").innerHTML = "$" + updatedData.Receipt_Per_Case_Fee;

//     })
//     .catch((error) => console.error("Error:", error));

//   // Update Estimate quantity data and show without refreshing
//   fetch(
//     `https://cleanstation.backendless.app/api/data/Estimate/${EstimatBrandId}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(UpdateEstimatorqunt),
//     }
//   )
//     .then((response) => response.json())
//     .then((updatedEdata) => {
//       console.log(updatedEdata,"update dataaaaaaa");
//       // Update the displayed data without refreshing the page

//       // Pick Fee
//       document.getElementById("totalBaseOrderText").innerHTML = updatedEdata.TotalOrders;
//       document.getElementById("totalAdditionalPickText").innerHTML = updatedEdata.ExtraPicks;
//       document.getElementById("totalBaseReturnText").innerHTML = updatedEdata.Returns;
//       document.getElementById("totalKitText").innerHTML = updatedEdata.KitsBuilt;

//       // Storage
//       document.getElementById("totalPalletStorageText").innerHTML = updatedEdata.Pallets;
//       document.getElementById("totalShelfStorageText").innerHTML = updatedEdata.Shelfs;
//       document.getElementById("totalBinStorageText").innerHTML = updatedEdata.Bins;

//       // Receiving
//       document.getElementById("totalPalletReceivedText").innerHTML = updatedEdata.ReceiptPallet;
//       document.getElementById("totalcasesReceivedText").innerHTML = updatedEdata.ReceiptCase;

//       // Labour
//       document.getElementById("totalStandardHourtext").innerHTML = updatedEdata.WHHours + "hrs";
//       document.getElementById("totalOTHourlyText").innerHTML = updatedEdata.OTHours + "hrs";
//       document.getElementById("totalITHourlyText").innerHTML = updatedEdata.ITHours + "hrs";
//     })
//     .catch((error) => console.error("Error:", error));
//   // Show the original data section and hide the update section
//   $("#updateSummrydata").hide();
//   $("#EstimateDetailSection").show();
//   $("#EstimateEnvoice").show();

//   fetch(
//     `https://cleanstation.backendless.app/api/data/Estimate/${EstimatBrandId}`
//   ).then((res) => {
//     res.json().then((data) => {
//       console.log(data,"data for dognught");
//       const chartData = {
//         totalStorage: data.TotalStorageCharge,
//         totalPicCharges: data.TotalPickCharge,
//         totalReceipts: data.TotalReceiptCharge,
//         totalMisc: data.TotalMiscCharge,
//       };
//       console.log(chartData,"chartData");
//       // Create the doughnut chart using the provided function
//       createDoughnutChart(chartData);
//     });
//   });
// });

//CanselUpdate button logic
$(document).ready(function () {
  $("#CanselUpdate").click(function () {
    $("#updateSummrydata").hide();
    $("#EstimateDetailSection").show();
    $("#EstimateEnvoice").show();
  });
});


// Set calculate days
function calculateDays() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const totalDaysElement = document.getElementById("total-Days");

  // Get the input values
  const startDateValue = startDateInput.value;
  const endDateValue = endDateInput.value;

  // Check if the input values are not empty
  if (startDateValue && endDateValue) {
    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    // One day in milliseconds
    const oneDay = 24 * 60 * 60 * 1000;
    // Calculate the difference in days
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    // Display the result
    totalDaysElement.textContent = diffDays + " " + "days";

    // Set the minimum selectable date in the end date picker
    const maxStartDate = new Date(endDate);
    maxStartDate.setDate(maxStartDate.getDate() - 1); // Increment by 1 day to disable the selected start date
    startDateInput.max = maxStartDate.toISOString().slice(0, 10);
  } else {
    // Handle the case when either input is empty
    totalDaysElement.textContent = ""; // Clear the total days
  }
}

// Set calculate days
// function calculateUpdateDays() {
//   var startDate = new Date(document.getElementById("updatestart").value);
//   var endDate = new Date(document.getElementById("updateEnddate").value);
//   // One day in milliseconds
//   var oneDay = 24 * 60 * 60 * 1000;
//   // Calculate the difference in days
//   var diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
//   // Display the result
//   document.getElementById("updatetotalDays").textContent = diffDays + " " + "days";
// }

function setEndDateMin() {
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");
  const errorElement = document.getElementById("errBrand");

  const startDate = new Date(startDateInput.value);
  const today = new Date();

  // Check if startDate is before today
  if (endDate < startDate) {
    errorElement.innerHTML = "Start date cannot be before today.";
    errorElement.style.color = "red";
    errorElement.style.display = "block";
    startDateInput.value = ""; // Reset the start date input value
    endDateInput.value = ""; // Reset the end date input value
    endDateInput.disabled = true; // Disable the end date input
  } else {
    errorElement.style.display = "none";
    endDateInput.disabled = false; // Enable the end date input
  }

  // Set the minimum selectable date in the end date picker
  const minEndDate = new Date(startDate);
  minEndDate.setDate(minEndDate.getDate() + 1); // Increment by 1 day to disable the selected start date
  endDateInput.min = minEndDate.toISOString().slice(0, 10);
  // Recalculate total days
  calculateDays();
}

function createDoughnutChart(dataValues) {
  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: [
        "Total Pick Fee",
        "Total Storage",
        "Total Receipts",
        "Misc Labor",
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#00AFF0", "#FFC107", "#FF8423", "#7F63F4"],
          data: [
            dataValues.totalPicCharges,
            dataValues.totalStorage,
            dataValues.totalReceipts,
            dataValues.totalMisc,
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
