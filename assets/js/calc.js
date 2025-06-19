// Mortgage calculator




// How much is spent in a week for miscelaneous
// var housePrice = document.querySelector('input[name="yourInputName"]').value;

/* Mortgage 

// Bank stuff
var percentDown = document.querySelector('input[name="yourInputName"]').value; // 20% down
var cashDown = housePrice * percentDown;
var loanAmount = housePrice - cashDown;

var loanDurationYr = document.querySelector('input[name="yourInputName"]').value;
var loanDurationMo = loanDurationYr*12;
var interestrate = document.querySelector('input[name="yourInputName"]').value;
var PMI = document.querySelector('input[name="yourInputName"]').value;// Private mortgage insurance

// Town stuff
var assessedPropertyValue = document.querySelector('input[name="yourInputName"]').value;
var taxRate = document.querySelector('input[name="yourInputName"]').value; // Tax charge per $1000 of assessed value
var propertyTaxYr = (assessedPropertyValue*taxRate)/1000; // Tax charge per $1000 of assessed value
var propertyTaxMo = propertyTaxYr/12;

// Property attached charges
var hoa = document.querySelector('input[name="yourInputName"]').value; // Monthly HOA fee
var propertyElectricalBill = document.querySelector('input[name="yourInputName"]').value;
var propertyWaterBill = document.querySelector('input[name="yourInputName"]').value;
var propertyInsurance = document.querySelector('input[name="yourInputName"]').value;
var propertyGasBill = document.querySelector('input[name="yourInputName"]').value;
var propertyOilBill = document.querySelector('input[name="yourInputName"]').value;

// Initial monthly payment
var principalPerMo = loanAmount / loanDurationMo;
var interesrtForMo = (interestrate/12) * principalPerMo;
var townCharges = propertyTaxMo;
var propertyCharges = hoa + propertyInsurance;
var initialMonthlyPayment = principalPerMo + interesrtForMo + townCharges + propertyCharges;

var demo = document.getElementById("demo");
demo.innerHTML = "<p>Your cash payment will be ("+percentDown*100+"%):<br> $"+cashDown.toFixed(2)+"</p>";
demo.innerHTML += "<p>Montthly property Tax:<br> $"+propertyTaxMo.toFixed(2)+"</p>";
demo.innerHTML += "<p>Your monthy payment will be:<br> $"+initialMonthlyPayment.toFixed(2)+"</p>";
console.log(initialMonthlyPayment);*/

oninput = (event) => {
	// var income = get_amount("gross_income");
	// var savings = document.querySelector('input[name="yourInputName"]').value;

	/* expense */
	let rent = get_amount("rent");

	// Utilities
	let cellPhone = get_amount("cell_phone_bill");
	var homeInternet = get_amount("home_internet_bill");
	var water = get_amount("water_bill");
	var gas = get_amount("gas_bill");
	var oil = get_amount("oil_bill");
	var electrical = get_amount("electrical_bill");

	// Transportation expense
	var carInsurance = get_amount("car_insurance");
	var carNote = get_amount("car_note");
	var costOfFullTank = get_amount("full_tank");
	var gasoline = costOfFullTank * 4; // one full tank a week times 4 weeks
	var oilChange = get_amount("oil_change");

	var utilities = cellPhone + homeInternet + water + electrical + gas + oil;
	var transport = oilChange + gasoline + carInsurance + carNote;
	var expense = rent + transport + utilities;

	/* Income */
	var grossIncome = get_amount("gross_income");
	var netIncome = get_amount("net_income");
	var rentContengency = get_amount("rent_contengency");
	var murphyContengency = get_amount("murphy_contengency");
	var savings = get_amount("savings");

	var income = netIncome;

	/* Mortgage*/
	// var rate = get_amount("rate");
	// Bank stuff
	var percentDown = document.querySelector('input[name="percent_down"]').value; // 20% down
	// var cashDown = housePrice * percentDown;
	// var loanAmount = housePrice - cashDown;

	var loanDurationYr = document.querySelector('input[name="loan_term"]').value;
	var loanDurationMo = loanDurationYr*12;
	var interestrate = document.querySelector('input[name="interst_rate"]').value;

	// Savings pre-allocations
	var preallocatedSavings = savings + rentContengency + murphyContengency;
	var disposableIncome = (netIncome/12)-(preallocatedSavings + expense) ;

	if(expense != 0 ){
		document.querySelector("#expense").className = "show";
		document.querySelector("#expense p").innerHTML = "<span>$"+expense+"</span> /mo"
	}
	if(income != 0 ){
		document.querySelector("#income").className = "show";
		document.querySelector("#income p").innerHTML = "<span>$"+disposableIncome+"</span> /mo"
		console.log(income)
	}	
	// calculate mortgage payment if there is rate and principal
	if(rent && interestrate){
		var homePrice = houseprice(rent, interestrate, loanDurationYr);
		// document.querySelector("#houseprice").className = "show";
		document.querySelector("#houseprice").innerHTML = "You can afford: <span class=\"text-success fw-bolder\"> $ "+homePrice.toFixed(2)+"</span>";
		console.log(homePrice)
	}
}

function get_amount(name){
	var cost = Number(document.querySelector('input[name='+name+']').value);
	return cost;
}

function houseprice(rent, mrate, loanTerm){
	// m = principal*((rate*(1+rate)^loanTerm)/((1+rate)^loanTerm -1))
	mrate = (mrate/100)/12;
	loanTerm = loanTerm*12;
	var onePlusRate = 1+mrate;
	var onePlusRatePowTerm = Math.pow(onePlusRate, loanTerm);
	var price = mrate == 0 ? rent*loanTerm : rent*(onePlusRatePowTerm-1)/(mrate*onePlusRatePowTerm);
	console.log(price)
	return price;
}

function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}
