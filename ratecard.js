// Check if the user is logged in
const uData = localStorage.getItem("userData");
const datarate = JSON.parse(uData);

if (!datarate) {
  Swal.fire({
    icon: "info",
    title: "Unlock the Power of Auditing",
    text : "Please log in to access the Audit page and explore our audit services!",
    confirmButtonText: "Login",
    confirmButtonColor: '#146a94',
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  }).then((result) => {
    if (result.isConfirmed) {
      const redirectUrl = "https://izba-exchange.webflow.io/log-in";
      window.location.href = redirectUrl;
    }
  });
}

const objctID = datarate.objectId;
const usertoken = datarate.token;


$("#loginBtn").hide();
$("#UserNameBlock").show();
$("#GetStartedButton").hide();
$("#tabBlockAfterlogin").show();
$("#tabBlockBeforelogin").hide();
$("#LogOutButton").show();
document.getElementById("UserNameText").innerHTML = datarate.first_name;

//Logout the User and data data from the local Storage
$(document).ready(function () {
  $("#LogOutButton").click(function () {
    localStorage.removeItem("userData");
    const redirectUrl = "https://izba-exchange.webflow.io/log-in";
    window.location.href = redirectUrl;
  });
});

function showError(selector) {
  $(selector).show();
}

function hideError(selector) {
  $(selector).hide();
}

function hideErrorOfInput(inputId, errorId) {
  $(inputId).on("input", function () {
    if ($(this).val()) {
      hideError(errorId);
    } else {
      showError(errorId);
    }
  }); 
}

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Find all elements with the class "nav-link"
  const navLinks = document.querySelectorAll(".nav-link");

  // Loop through each element and apply custom styles
  navLinks.forEach(function (link) {
    link.style.display = "inline";
    link.style.color = "#84889a";
    link.style.textDecoration = "none";
    link.style.transition = "none";
  });
});

async function setAuditDataInFields(objectId) {
  try {
    const response = await fetch(`https://cleanstation.backendless.app/api/services/Audit/InvoiceToAudit?Id=${objectId}` );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const auditData = await response.json();
    console.log("Console audit data", auditData);
    // let status=auditData.Audit_Status;
    if (auditData && auditData.Audit_Status == "Completed") {
      // Set data in the fields

      document.getElementById("No_of_orders").innerHTML = auditData.Invoice_dashboard.No_of_orders || 0;
      document.getElementById("Picks").innerHTML = auditData.Invoice_dashboard.Picks || 0;
      document.getElementById("Packages").innerHTML = auditData.Invoice_dashboard.Packages || 0;
      document.getElementById("Picker_Per_Order").innerHTML = auditData.Invoice_dashboard.Picker_Per_Order.toFixed(3) || 0;
      document.getElementById("Packages_Per_Order").innerHTML = auditData.Invoice_dashboard.Packages_Per_Order || 0;
      document.getElementById("Shipping_Cost").innerHTML = auditData.Invoice_dashboard.Shipping_Cost || 0;
      document.getElementById("Shipping_Cost_Per_Order").innerHTML = auditData.Invoice_dashboard.Shipping_Cost_Per_Order.toFixed(3) || 0;
      document.getElementById("Fulfillment_Cost").innerHTML = auditData.Invoice_dashboard.Fulfillment_Cost || 0;
      document.getElementById("Fulfillment_Cost_Per_Order").innerHTML = auditData.Invoice_dashboard.Fulfillment_Cost_Per_Order.toFixed(3) || 0;
      document.getElementById("Outbound_Cost").innerHTML = auditData.Invoice_dashboard.Outbound_Cost || 0;
      document.getElementById("Outbound_Cost_Per_Order").innerHTML = auditData.Invoice_dashboard.Outbound_Cost_Per_Order.toFixed(3) || 0;
      document.getElementById("Shipping_Weight").innerHTML = auditData.Invoice_dashboard.Shipping_Weight || 0;
      document.getElementById("Shipping_Weight_Per_Order").innerHTML = auditData.Invoice_dashboard.Shipping_Weight_Per_Order.toFixed(3) || 0;
      document.getElementById("Shipping_Weight_Unit").innerHTML = auditData.Invoice_dashboard.Shipping_Weight_Unit || 0;

      // Domestic Data
      document.getElementById("Domestic.Orders").innerHTML = auditData.Invoice_dashboard.Domestic.Orders || 0;
      document.getElementById("Domestic.Shipping_Cost").innerHTML = auditData.Invoice_dashboard.Domestic.Shipping_Cost || 0;
      document.getElementById("Domestic.Shipping_Cost_Per_Order").innerHTML = auditData.Invoice_dashboard.Domestic.Shipping_Cost_Per_Order.toFixed(3) || 0;
      document.getElementById("Domestic.Weight").innerHTML = auditData.Invoice_dashboard.Domestic.Weight || 0;
      document.getElementById("Domestic.Weight_Per_Order").innerHTML = auditData.Invoice_dashboard.Domestic.Weight_Per_Order.toFixed(3) || 0;
      document.getElementById("Domestic.Weight_Unit").innerHTML = auditData.Invoice_dashboard.Domestic.Weight_Unit || 0;

      // International Data
      document.getElementById("International.Orders").innerHTML = auditData.Invoice_dashboard.International.Orders || 0;
      document.getElementById("International.Shipping_Cost").innerHTML = auditData.Invoice_dashboard.International.Shipping_Cost || 0;
      document.getElementById("International.Shipping_Cost_Per_Order").innerHTML = auditData.Invoice_dashboard.International.Shipping_Cost_Per_Order.toFixed(3) || 0;
      document.getElementById("International.Weight").innerHTML = auditData.Invoice_dashboard.International.Weight || 0;
      document.getElementById("International.Weight_Per_Order").innerHTML = auditData.Invoice_dashboard.International.Weight_Per_Order.toFixed(3) || 0;
      document.getElementById("International.Weight_Unit").innerHTML = auditData.Invoice_dashboard.International.Weight_Unit || 0;

      // Audit Dashboard Data

      // Additional Fee
      document.getElementById("Additional_Fee.Compliance").innerHTML = auditData.Audit_dashboard.Additional_Fee.Compliance || 0;
      document.getElementById("Additional_Fee.Non_Compliance").innerHTML = auditData.Audit_dashboard.Additional_Fee.Non_Compliance || 0;
      document.getElementById("Additional_Fee.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Additional_Fee.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Operating Fee
      document.getElementById("Operating_Fee.Compliance").innerHTML = auditData.Audit_dashboard.Operating_Fee.Compliance || 0;
      document.getElementById("Operating_Fee.Non_Compliance").innerHTML = auditData.Audit_dashboard.Operating_Fee.Non_Compliance || 0;
      document.getElementById("Operating_Fee.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Operating_Fee.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Fuel Surcharge
      document.getElementById("Fuel_Surcharge.Compliance").innerHTML = auditData.Audit_dashboard.Fuel_Surcharge.Compliance || 0;
      document.getElementById("Fuel_Surcharge.Non_Compliance").innerHTML = auditData.Audit_dashboard.Fuel_Surcharge.Non_Compliance || 0;
      document.getElementById("Fuel_Surcharge.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Fuel_Surcharge.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Delivery Area Surcharge
      document.getElementById("Delivery_Area_Surcharge.Compliance").innerHTML = auditData.Audit_dashboard.Delivery_Area_Surcharge.Compliance || 0;
      document.getElementById("Delivery_Area_Surcharge.Non_Compliance").innerHTML = auditData.Audit_dashboard.Delivery_Area_Surcharge.Non_Compliance || 0;
      document.getElementById("Delivery_Area_Surcharge.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Delivery_Area_Surcharge.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Zone
      document.getElementById("Zone.Compliance").innerHTML = auditData.Audit_dashboard.Zone.Compliance || 0;
      document.getElementById("Zone.Non_Compliance").innerHTML = auditData.Audit_dashboard.Zone.Non_Compliance || 0;
      document.getElementById("Zone.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Zone.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Packaging Audit
      document.getElementById("Packaging_Audit.Compliance").innerHTML = auditData.Audit_dashboard.Packaging_Audit.Compliance || 0;
      document.getElementById("Packaging_Audit.Non_Compliance").innerHTML = auditData.Audit_dashboard.Packaging_Audit.Non_Compliance || 0;
      document.getElementById("Packaging_Audit.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Packaging_Audit.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Weight Audit
      document.getElementById("Weight_Audit.Compliance").innerHTML = auditData.Audit_dashboard.Weight_Audit.Compliance || 0;
      document.getElementById("Weight_Audit.Non_Compliance").innerHTML = auditData.Audit_dashboard.Weight_Audit.Non_Compliance || 0;
      document.getElementById("Weight_Audit.Compliance_Percentage").innerHTML = auditData.Audit_dashboard.Weight_Audit.Compliance_Percentage.toFixed(3) + "%" || 0;

      // Audit Status
      // document.getElementById("auditStatusMsgBlock").style.display = "none";
      // document.getElementById("AuditStatusBlock").style.display = "Block";
      document.getElementById("auditStatusDisplay").innerHTML = auditData.Audit_Status;
      $("#StatusNotYetSubmitted").hide();
      $("#auditStatusMsgBlock").hide();
      $("#AuditStatusBlock").show();
      $("#InvoiceToAuditWrapper").show();
      displayServiceData(auditData);
      displayZoneData(auditData);
      displayStorageData(auditData);
      displayStateData(auditData);
      displayAuditServiceData(auditData);
    } else if (!auditData) {
      $("#StatusNotYetSubmitted").show();
      $("#auditStatusMsgBlock").hide();
      $("#AuditStatusBlock").hide();

    } else if(auditData.Audit_Status !== "Completed" && auditData.Audit_Status == "Submitted" || auditData.Audit_Status == "Ready for Audit" || auditData.Audit_Status == "Audit in Progress" || auditData.Audit_Status == "On Hold" || auditData.Audit_Status == "Rejected"){

      $("#StatusNotYetSubmitted").hide();
      $("#AuditStatusBlock").show();
      $("#auditStatusMsgBlock").show();
      // document.getElementById("AuditStatusBlock").style.display = "Block";
      document.getElementById("auditStatusDisplay").innerHTML = auditData.Audit_Status;
      document.getElementById("auditStatusText").innerHTML = auditData.Audit_Status;

    }  else if (auditData == null || auditData.Audit_dashboard == null) {
      $("#auditStatusMsgBlock").hide();
      $("#AuditStatusBlock").hide();
      $("#StatusNotYetSubmitted").show();
    }
    else {
      $("#InvoiceToAuditWrapper").hide();
      $("#StatusNotYetSubmitted").show();
      $("#auditStatusMsgBlock").hide();
    }
   
    

  } catch (error) {
    Swal.fire({
      icon:'error', 
      title:'Error',
      text:'Something went wrong int fetching and setting audit data!',
      confirmButtonColor: '#146a94'
    });
  }
}





// Service Data Display

function displayServiceData(auditData) {
  const table = document.getElementById("customers");
  const totalbaseorder = auditData.Invoice_dashboard.Service || 0;
  if (totalbaseorder.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("service-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("service-no-data-message").style.display = "none";
    totalbaseorder.forEach((item) => {
      const row = table.insertRow(-1);
      const serviceCell = row.insertCell(0);
      const totalOrdersCell = row.insertCell(1);
      const percentageCell = row.insertCell(2);
      serviceCell.textContent = item.Service || "N/A";
      const totalServiceOrders = item.Orders || 0;
      totalOrdersCell.textContent = totalServiceOrders;

      // Calculate percentage
      const percentageOfOrders = (
        (totalServiceOrders / auditData.Invoice_dashboard.No_of_orders) * 100 ).toFixed(2);
      percentageCell.textContent = `${percentageOfOrders}%`;
    });
  }
}

// Storage Dashboard Data Display

function displayStorageData(auditData) {
  const table2 = document.getElementById("storage_dashboard");
  const totalStorageDashboard = auditData.Storage_dashboard || 0;

  if (totalStorageDashboard.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("storage-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("storage-no-data-message").style.display = "none";
    const row = table2.insertRow(-1);
    const storageDashboardCell = row.insertCell(0);
    const totalStorageOrdersCell = row.insertCell(1);
    storageDashboardCell.textContent = totalStorageDashboard.Storage_Cost || 0;
    totalStorageOrdersCell.textContent = "$" + totalStorageDashboard.Storage_Cost_Per_Order.toFixed(3) || 0;
  }

  // Storage Unit Data display*****************************
  const table = document.getElementById("storage_unit");
  const totalStorage = auditData.Storage_dashboard.Storage_Unit || 0;

  if (totalStorage.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("storage-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("storage-no-data-message").style.display = "none";
    totalStorage.forEach((item) => {
      const row = table.insertRow(-1);
      const storageCell = row.insertCell(0);
      const totalOrdersCell = row.insertCell(1);
      storageCell.textContent = item.Storage_Unit || "N/A";
      const totalStorageUnitOrders = item.Quantity || 0;
      totalOrdersCell.textContent = totalStorageUnitOrders;
    });
  }
}

// Zone Data Display

function displayZoneData(auditData) {
  const table1 = document.getElementById("zone");
  const Zones = auditData.Invoice_dashboard.Zone || 0;

  if (Zones.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("zone-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("zone-no-data-message").style.display = "none";

    Zones.forEach((item) => {
      const row = table1.insertRow(-1);
      const zoneCell = row.insertCell(0);
      const totalZoneCell = row.insertCell(1);
      const percentageCell = row.insertCell(2);
      const totalZone = item.Zone || 0;
      const totalZoneCount = item.Orders || 0;
      zoneCell.textContent = totalZone;
      totalZoneCell.textContent = item.Orders || "N/A";

      // Calculate percentage
      const percentageOfOrders = (
        (totalZoneCount / auditData.Invoice_dashboard.No_of_orders) * 100 ).toFixed(3);
      percentageCell.textContent = `${percentageOfOrders}%`;
    });
  }
}

// State Data Display

function displayStateData(auditData) {
  const table3 = document.getElementById("state");
  const State = auditData.Invoice_dashboard.State || 0;

  if (State.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("state-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("state-no-data-message").style.display = "none";

    State.forEach((item) => {
      const row = table3.insertRow(-1);
      const StateCell = row.insertCell(0);
      const totalStateCell = row.insertCell(1);
      const percentageCell = row.insertCell(2);
      const totalState = item.State || "N/A";
      StateCell.textContent = totalState;
      const totalStateCount = item.Orders || 0;
      totalStateCell.textContent = item.Orders || 0;
      // Calculate percentage
      const percentageOfOrders = (
        (totalStateCount / auditData.Invoice_dashboard.No_of_orders) * 100 ).toFixed(3);
      percentageCell.textContent = `${percentageOfOrders}%`;
    });
  }
}

//  auditService data display*******************************************
function displayAuditServiceData(auditData) {
  const table4 = document.getElementById("auditService");
  const auditService = auditData.Audit_dashboard.Service || 0;

  if (auditService.length === 0) {
    // Display the "No Service Data Found" message
    document.getElementById("auditService-no-data-message").style.display = "block";
  } else {
    // Hide the "No Service Data Found" message
    document.getElementById("auditService-no-data-message").style.display = "none";

    auditService.forEach((item) => {
      const row = table4.insertRow(-1);
      const Service = row.insertCell(0);
      const totalComplianceCell = row.insertCell(1);
      const Non_Compliance = row.insertCell(2);
      const Compliance_Percentage = row.insertCell(3);

      Service.textContent = item.Service || "N/A";
      totalComplianceCell.textContent = item.Compliance || 0;
      Non_Compliance.textContent = item.Non_Compliance || 0;
      Compliance_Percentage.textContent = item.Compliance_Percentage.toFixed(3) + "%" || 0;
    });
  }
}

// Show Invoices
// Global variables

let invoiceCurrentPage = 1;
const invoiceItemsPerPage = 100; // You can change the number of items per page here

// Function to fetch data from API
async function fetchInvoiceData() {
  try {
    const response = await fetch(
      `https://cleanstation.backendless.app/api/services/Invoice/UserTOInvoice?ID=${objctID}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Swal.fire({
      icon:'error', 
      title:'Error',
      text:'Failed to fetching invoice data!',
      confirmButtonColor: '#146a94'
    });
    return null;
  }
}

// Function to render the table
async function renderInvoiceTable(page) {
  const data = await fetchInvoiceData();

  if (data.length === 0) {
    $("#invoice-no-data-message").show();
    $("#invoiceTable").hide();
    return;
  } else {

      const invoicestartIndex = (page - 1) * invoiceItemsPerPage;
      const invoiceendIndex = invoicestartIndex + invoiceItemsPerPage;
      const paginatedDatainvoice = data.slice(invoicestartIndex, invoiceendIndex);

      $("#invoice-no-data-message").hide();
      $("#invoiceTable").show();

      const tableBody = document.getElementById("invoice-table-body");
      tableBody.innerHTML = paginatedDatainvoice
        .map((invoice) => {
          const status = invoice.Audit_Status;
          localStorage.setItem("audit-status", status);
          // const statusColor = status === 'Completed' ? 'green' : 'red';
          const statusColor =
            status === "Completed" ? "green" : status === "Ready for Audit" ? "orange" : status === "Submitted" ? "orange" : "red";

          return `
                <tr> <td onclick="handleInvoiceData('${invoice.objectId}')"><a href="#"> ${invoice.Invoice_name } </a></td>
                    <td style="color: ${statusColor}">${status}</td>
                    <td>${new Date(invoice.created).toLocaleString()}</td>
                    <td>
                        <span class="delete-btn glyphicon glyphicon-trash" onclick="handleInvoiceDelete('${invoice.objectId }')"></span>
                    </td>
                </tr>
            `;
        })
        .join("");

      renderinvoicePagination(data.length);
  }

}

// Function to render pagination
function renderinvoicePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / invoiceItemsPerPage);
  const paginationElement = document.getElementById("invoice-pagination");

  let paginationHtmlInvoice = `
         <li${invoiceCurrentPage === 1 ? ' class="disabled"' : ""}>
             <a href="#" aria-label="Previous" onclick="prevInvoicePage()">
                 <span aria-hidden="true">&laquo; Previous</span>
             </a>
         </li>
     `;
  for (let i = 1; i <= totalPages; i++) {
    paginationHtmlInvoice += `<li${
      invoiceCurrentPage === i ? ' class="active"' : ""
    }><a href="#" onclick="changeInvoicePage(${i})">${i}</a></li>`;
  }
  paginationHtmlInvoice += `
         <li${invoiceCurrentPage === totalPages ? ' class="disabled"' : ""}>
             <a href="#" aria-label="Next" onclick="nextInvoicePage()">
                 <span aria-hidden="true">Next &raquo;</span>
             </a>
         </li>
     `;
  paginationElement.innerHTML = paginationHtmlInvoice;
}

// Function to change to the previous page
function prevInvoicePage() {
  if (invoiceCurrentPage > 1) {
    invoiceCurrentPage--;
    renderInvoiceTable(invoiceCurrentPage);
    renderinvoicePagination(fetchInvoiceData().length); // Pass the totalItems argument here
  }
}
// Function to change to the next page
function nextInvoicePage() {
  const data = fetchInvoiceData();
  data
    .then((result) => {
      const totalPages = Math.ceil(result.length / invoiceItemsPerPage);
      if (invoiceCurrentPage < totalPages) {
        invoiceCurrentPage++;
        renderInvoiceTable(invoiceCurrentPage);
        renderinvoicePagination(result.length);
      }
    })
    .catch((error) => {
      Swal.fire({
        icon:'error', 
        title:'Error',
        text:'Failed to fetching rate data!',
        confirmButtonColor: '#146a94'
      });
    });
}

function changeInvoicePage(pageNumber) {
  invoiceCurrentPage = pageNumber; // Set the current page to the clicked page number
  renderInvoiceTable(invoiceCurrentPage);
}

// Function to handle Delete button click
function handleInvoiceDelete(objectId) {
  Swal.fire({
    icon: "warning",
    title: "Are You sure you want to delete this invoice?",
    confirmButtonText: "Delete",
    confirmButtonColor: '#ff5f5f',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // Delete
      // If user confirms the deletion, proceed with the actual deletion
      const invoiceID = {
        objectId: objectId,
      };

      fetch(
        "https://cleanstation.backendless.app/api/services/Invoice/InvoiceDelete",
        {
          method: "DELETE",
          body: JSON.stringify(invoiceID),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response for delete:", data);
          Swal.fire({
            icon:'success', 
            title:'Success',
            text:'Invoice Delete SuccessFully',
            confirmButtonColor: '#146a94'
          });
          renderInvoiceTable(invoiceCurrentPage);
        })
        .catch((error) => {
          Swal.fire({
            icon:'error', 
            title:'Error',
            text:'Failed to deleting invoice!',
            confirmButtonColor: '#146a94'
          });
        });
    }
  });
}

$("#AddInvoiceButton").click(function () {
  $("#UploadInvoiceSection").show();
  $("#UploadInvoice").css("display", "block");
  $("#InvoiceListSection").hide();
});

// handle click for particular invoice
function handleInvoiceData(objectId) {
  $("#AuditSection").show();
  $("#InvoiceDetail").show();
  $("#InvoiceListSection").hide();
  setAuditDataInFields(objectId);
  
  // create audit for particular invoice
//   function fetchContracts(objctID) {
//     fetch(
//     `https://cleanstation.backendless.app/api/services/Brand/BrandContract?User_id=${objctID}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const contractDropdown = document.getElementById("field2");
//       data.forEach((contract) => {
//         const option = document.createElement("option");
//         option.textContent = contract.Contract_name;
//         option.value = contract.objectId; // Set the value attribute to objectId
//         contractDropdown.appendChild(option);
//       });

//       // Initialize MultiselectDropdown when contracts are fetched
//       MultiselectDropdown(window.MultiselectDropdownOptions);
//     })
//     .catch((error) => {
//       console.error("Error fetching contracts:", error);
//     });
// }


$(document).ready(function () {
    // // Fetch contracts and populate dropdown
    // fetch(
    //   `https://cleanstation.backendless.app/api/services/Brand/BrandContract?User_id=${objctID}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const contractDropdown = document.getElementById("field2");
    //     data.forEach((contract) => {
    //       const option = document.createElement("option");
    //       option.textContent = contract.Contract_name;
    //       option.value = contract.objectId; // Set the value attribute to objectId
    //       contractDropdown.appendChild(option);
    //     });

    //     // Initialize MultiselectDropdown when contracts are fetched
    //     MultiselectDropdown(window.MultiselectDropdown);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching contracts:", error);
    //   });

    // Define the CreateNewAuditButton click event handler
    const auditContractError = document.getElementById("auditContractError");

    $("#field2").on("change", function () {
      if ($(this).val()) {
        auditContractError.style.display = "none";
      } else {
        auditContractError.style.display = "block";
      }
    });
    
    $("#CreateNewAuditButton").click(function () {
      let AuditContract = [];
      const field2Value = $("#field2").val();

      if (!field2Value) {
        auditContractError.style.display = "block";
        return false;
      } else{
         // Field2 is not empty, so add its value to AuditContract
        AuditContract.push(field2Value);
        let AuditDescriptionInput = $("#AuditDescriptionInput").val();

        auditContractError.style.display = "none";
          let requestData = {
            InvoiceID: {
              objectId: objectId,
            },
            Description: AuditDescriptionInput,
            Fulfillment_Contracts: AuditContract,
          };

          fetch(
            "https://cleanstation.backendless.app/api/services/Invoice/CrateAudit",
            {
              method: "POST",
              body: JSON.stringify(requestData),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          ).then((response) => response.json())
          .then((data) => {
            Swal.fire({
              icon:'success', 
              title:'Success',
              text:'Audit request successfully submitted',
              confirmButtonColor: '#146a94'
            });
              $("#AuditDescriptionInput").val("");
              $("#field2").val("");

              $("#AuditSection").hide();
              $("#InvoiceListSection").show();
              $("#CreateAudit").hide();
              $("#AuditCreateSection").hide();
              renderInvoiceTable(invoiceCurrentPage);
          })
          .catch((error) => {
            Swal.fire({
              icon:'error', 
              title:'Error',
              text:'Failed to requesting for audit!',
              confirmButtonColor: '#146a94'
            });
        });
      }     
    });
  });
}

// request for Audit for particular invoice
$("#requestForAudit").click(function () {

  fetch(
    `https://cleanstation.backendless.app/api/services/Audit/ContractAndProductCount?UserID=${objctID}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {

      if (data.ContractCount > 0 ) {

        if (data.ProductCount > 0 ) {
          
      $("#AuditCreateSection").show();
      $("#CreateAudit").show();
      $("#AuditSection").hide();
        } else {

          Swal.fire({
            title: 'Product not found!',
            text: "Please add products to request for audit.",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#146a94',
            cancelButtonColor: '#9b9fa1',
            confirmButtonText: 'Add Product'
          }).then((result) => {
            if (result.isConfirmed) {
              const redirectUrl = "https://izba-exchange.webflow.io/fulfillment-contract";
              window.location.href = redirectUrl;
            } });
        }         
      }else {
        Swal.fire({
          title: 'Contract not found!',
          text: "Please add fullfillment contract to request for audit.",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#146a94',
          cancelButtonColor: '#9b9fa1',
          confirmButtonText: 'Add Contract'
        }).then((result) => {
          if (result.isConfirmed) {
            const redirectUrl = "https://izba-exchange.webflow.io/fulfillment-contract";
            window.location.href = redirectUrl;       
          } });
      }
      })
    .catch((error) => {
      console.error("Error fetching contracts:", error);
    });
});


// // Multiselector dropdown of contractStartError 
// function MultiselectDropdown(options) {
//   var config = {
//     search: true,
//     height: "15rem",
//     width: "15rem",
//     placeholder: "Select Contract",
//     txtSelected: "Contract Selected",
//     txtAll: "All Contract",
//     txtRemove: "Remove Contract",
//     txtSearch: "Search Contract",
//     ...options,
//   };
//   function newEl(tag, attrs) {
//     var e = document.createElement(tag);
//     if (attrs !== undefined)
//       Object.keys(attrs).forEach((k) => {
//         if (k === "class") {
//           Array.isArray(attrs[k])
//             ? attrs[k].forEach((o) => (o !== "" ? e.classList.add(o) : 0))
//             : attrs[k] !== ""
//             ? e.classList.add(attrs[k])
//             : 0;
//         } else if (k === "style") {
//           Object.keys(attrs[k]).forEach((ks) => {
//             e.style[ks] = attrs[k][ks];
//           });
//         } else if (k === "text") {
//           attrs[k] === ""
//             ? (e.innerHTML = "&nbsp;")
//             : (e.innerText = attrs[k]);
//         } else e[k] = attrs[k];
//       });
//     return e;
//   }

//   document.querySelectorAll("select[multiple]").forEach((el, k) => {
//     var div = newEl("div", {
//       class: "multiselect-dropdown",
//       style: {
//         width: config.style?.width ?? 100 % +"px",
//         padding: config.style?.padding ?? "",
//       },
//     });
//     el.style.display = "none";
//     el.parentNode.insertBefore(div, el.nextSibling);
//     var listWrap = newEl("div", {
//       class: "multiselect-dropdown-list-wrapper",
//     });
//     var list = newEl("div", {
//       class: "multiselect-dropdown-list",
//       style: { height: config.height },
//     });
//     var search = newEl("input", {
//       class: ["multiselect-dropdown-search"].concat([
//         config.searchInput?.class ?? "form-control",
//       ]),
//       style: {
//         width: "100%",
//         display:
//           el.attributes["multiselect-search"]?.value === "true"
//             ? "block"
//             : "none",
//       },
//       placeholder: config.txtSearch,
//     });
//     listWrap.appendChild(search);
//     div.appendChild(listWrap);
//     listWrap.appendChild(list);

//     el.loadOptions = () => {
//       list.innerHTML = "";

//       if (el.attributes["multiselect-select-all"]?.value == "true") {
//         var op = newEl("div", { class: "multiselect-dropdown-all-selector" });
//         var ic = newEl("input", { type: "checkbox" });
//         op.appendChild(ic);
//         op.appendChild(newEl("label", { text: config.txtAll }));

//         op.addEventListener("click", () => {
//           op.classList.toggle("checked");
//           op.querySelector("input").checked =
//             !op.querySelector("input").checked;

//           var ch = op.querySelector("input").checked;
//           list
//             .querySelectorAll(
//               ":scope > div:not(.multiselect-dropdown-all-selector)"
//             )
//             .forEach((i) => {
//               if (i.style.display !== "none") {
//                 i.querySelector("input").checked = ch;
//                 i.optEl.selected = ch;
//               }
//             });

//           el.dispatchEvent(new Event("change"));
//         });
//         ic.addEventListener("click", (ev) => {
//           ic.checked = !ic.checked;
//         });
//         el.addEventListener("change", (ev) => {
//           let itms = Array.from(
//             list.querySelectorAll(
//               ":scope > div:not(.multiselect-dropdown-all-selector)"
//             )
//           ).filter((e) => e.style.display !== "none");
//           let existsNotSelected = itms.find(
//             (i) => !i.querySelector("input").checked
//           );
//           if (ic.checked && existsNotSelected) ic.checked = false;
//           else if (ic.checked == false && existsNotSelected === undefined)
//             ic.checked = true;
//         });

//         list.appendChild(op);
//       }

//       Array.from(el.options).map((o) => {
//         var op = newEl("div", {
//           class: o.selected ? "checked" : "",
//           optEl: o,
//         });
//         var ic = newEl("input", { type: "checkbox", checked: o.selected });
//         op.appendChild(ic);
//         op.appendChild(newEl("label", { text: o.text }));

//         op.addEventListener("click", () => {
//           op.classList.toggle("checked");
//           op.querySelector("input").checked =
//             !op.querySelector("input").checked;
//           op.optEl.selected = !!!op.optEl.selected;
//           el.dispatchEvent(new Event("change"));
//         });
//         ic.addEventListener("click", (ev) => {
//           ic.checked = !ic.checked;
//         });
//         o.listitemEl = op;
//         list.appendChild(op);
//       });
//       div.listEl = listWrap;

//       div.refresh = () => {
//         div
//           .querySelectorAll("span.optext, span.placeholder")
//           .forEach((t) => div.removeChild(t));
//         var sels = Array.from(el.selectedOptions);
//         if (
//           sels.length > (el.attributes["multiselect-max-items"]?.value ?? 5)
//         ) {
//           div.appendChild(
//             newEl("span", {
//               class: ["optext", "maxselected"],
//               text: sels.length + " " + config.txtSelected,
//             })
//           );
//         } else {
//           sels.map((x) => {
//             var c = newEl("span", {
//               class: "optext",
//               text: x.text,
//               srcOption: x,
//             });
//             if (el.attributes["multiselect-hide-x"]?.value !== "true")
//               c.appendChild(
//                 newEl("span", {
//                   class: "optdel",
//                   text: "🗙",
//                   title: config.txtRemove,
//                   onclick: (ev) => {
//                     c.srcOption.listitemEl.dispatchEvent(new Event("click"));
//                     div.refresh();
//                     ev.stopPropagation();
//                   },
//                 })
//               );

//             div.appendChild(c);
//           });
//         }
//         if (0 == el.selectedOptions.length)
//           div.appendChild(
//             newEl("span", {
//               class: "placeholder",
//               text: el.attributes["placeholder"]?.value ?? config.placeholder,
//             })
//           );
//       };
//       div.refresh();
//     };
//     el.loadOptions();

//     search.addEventListener("input", () => {
//       list
//         .querySelectorAll(
//           ":scope div:not(.multiselect-dropdown-all-selector)"
//         )
//         .forEach((d) => {
//           var txt = d.querySelector("label").innerText.toUpperCase();
//           d.style.display = txt.includes(search.value.toUpperCase())
//             ? "block"
//             : "none";
//         });
//     });

//     div.addEventListener("click", () => {
//       div.listEl.style.display = "block";
//       search.focus();
//       search.select();
//     });

//     document.addEventListener("click", function (event) {
//       if (!div.contains(event.target)) {
//         listWrap.style.display = "none";
//         div.refresh();
//       }
//     });
//   });
// }

 // show detail for particular invoice
 $("#InvoiceDetailButton").click(function () {
  $("#InvoiceDetailSection").show();
  $("#AuditSection").hide();
  // showAuditCSVforinvoice(objectId);
});

// *************************************************************************

$("#CancelCreateAudit").click(function () {
  $("#auditContractError").hide();
  $("#AuditSection").show();
  $("#CreateAudit").hide();
  $("#AuditCreateSection").hide();
  // reset input fields 
  $("#AuditDescriptionInput").val("");
  $("#field2").val("");
});

// Initialize the table on page load
renderInvoiceTable(invoiceCurrentPage);

// ******************* Uplaod Invoice **********
$("#CancelUploadInvoice").click(function () {
  $("#InvoiceListSection").show();
  $("#UploadInvoice").hide();
  $("#UploadInvoiceSection").hide();
});

$(document).ready(function () {

  hideErrorOfInput("#InvoiceNameInput", "#invoiceNameError");
  hideErrorOfInput("#fileInput", "#invoiceFileError");

  $("#UploadInvoiceButton").click(function () {
    $("#UploadInvoiceButton").prop("disabled", true); // Disable the button to prevent multiple clicks
    
    async function sendInvoiceData(requestData) {
      try {
        const response = await fetch(
          "https://cleanstation.backendless.app/api/services/Invoice/AddInvoice",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );
        const data = await response.json();
        console.log(data); // Handle the response data here
        // Hide the loader on success
        $("#loader").hide();
        $("#uploadInvoiceButtonBlock").show();
        Swal.fire({
          icon:'success', 
          title:'Success',
          text:'File uploaded successfully',
          confirmButtonColor: '#146a94'
        });
        // Swal.fire("Success", "File uploaded successfully", "success");
        document.getElementById("InvoiceNameInput").value = "";
        document.getElementById("fileInput").value = "";
        renderInvoiceTable(invoiceCurrentPage);
        // $("#InvoiceListSection").show();
        $("#UploadInvoice").hide();
        $("#UploadInvoiceSection").hide();
        handleInvoiceData(data.objectId);
      } catch (error) {
    
        Swal.fire({
          icon:'error', 
          title:'Error',
          text:'Something went wrong!! try again',
          confirmButtonColor: '#146a94'
        });
        // Swal.fire("Error", "Something went wrong!! try again", "error");
        document.getElementById("InvoiceNameInput").value = "";
        document.getElementById("fileInput").value = "";
        // Hide the loader on failure
        $("#uploadInvoiceButtonBlock").show();
        $("#loader").hide();
      } finally {
        $("#UploadInvoiceButton").prop("disabled", false); // Re-enable the button after the API call is complete
      }
    }

    // Helper function to convert ArrayBuffer to Base64
    function arrayBufferToBase64(buffer) {
      let binary = "";
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }

    let invoiceName = $("#InvoiceNameInput").val();
    let fileInput = document.getElementById("fileInput").files[0];

    if (invoiceName && fileInput) {
      $("#invoiceNameError").hide();
      $("#invoiceFileError").hide();
      let fileReader = new FileReader();

      fileReader.onload = function (event) {
        let fileBytes = event.target.result;
        let invoiceData = arrayBufferToBase64(fileBytes);

        let requestData = {
          Invoice_name: invoiceName,
          Invoice_data: invoiceData,
          User_Id: {
            objectId: objctID,
          },
        };

        // Show the loader before making the API request
        $("#loader").show();
        $("#uploadInvoiceButtonBlock").hide();

        sendInvoiceData(requestData);
      };

      fileReader.readAsArrayBuffer(fileInput);
    } else {
      $("#UploadInvoiceButton").prop("disabled", false); // Re-enable the button if required data is missing
      if (invoiceName == "") {
        showError("#invoiceNameError");
      } else {
        hideError("#invoiceNameError");
      }
      fileInput = document.getElementById("fileInput").value;      
      if (fileInput == "") {
        showError("#invoiceFileError");
      } else {
        hideError("#invoiceFileError");
      }
    }
  });
});

// BreadCrump
$("#Home").click(function () {
  // $("#Detail, #Create, #Update, #RCDetail, #RCCreate, #RCUpdate, #CreateService, #CreateFC, #ProductDetail, #UploadProduct, #InvoiceList, #InvoiceDetail, #CreateAudit, #UploadInvoice").hide();
  // fetchAndShowContracts();
  // $("#MainSection").show();
  // document.getElementById("fcBlockTab").style.borderBottom = "2px solid #78C045";
  // $("#createServiceSection").hide();
  // $("#ratecardDetailSection").hide();
  // $("#UpdateRateCard").hide();
  // $("#CreateRateCardSection").hide();
  // $("#NewFulfillmentCenterSection").hide();
  // $("#UpdateFulfillmentContractSection").hide();
  // $("#FulfillmentContractDetailSection").hide();
  // $("#fulfillmentContractSection").hide();
  // $("#CreateFulfillmentContractSection").hide();

  const redirectUrl = "https://izba-exchange.webflow.io/fulfillment-contract";
  window.location.href = redirectUrl;
 
});


$("#InvoiceList").click(function () {
  $("#UploadInvoice, #CreateAudit, #InvoiceDetail").hide();
  $("#InvoiceDetail").hide();
  $("#InvoiceToAuditWrapper").hide();
  $("#CreateAudit").hide();
  $("#UploadInvoice").hide();
  $("#InvoiceListSection").show();
  $("#UploadInvoiceSection").hide();
  $("#AuditSection").hide();
  $("#AuditCreateSection").hide();
  renderInvoiceTable(invoiceCurrentPage);
});

$("#InvoiceDetail").click(function () {
  $("#UploadInvoice").hide();
  $("#InvoiceToAuditWrapper").hide();
  $("#CreateAudit").hide();
  $("#InvoiceListSection").hide();
  $("#UploadInvoiceSection").hide();
  $("#AuditSection").show();
  $("#CreateService").show();
  $("#AuditCreateSection").hide();
});

$("#CreateAudit").click(function () {
  $("#UploadInvoice").hide();
});

$("#UploadInvoice").click(function () {
});
