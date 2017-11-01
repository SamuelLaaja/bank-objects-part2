var customerObjects = {};

customerObjects.customer = function (id, firstName, lastName, bankId) {
    var bankAccounts = [];
    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        bankId: bankId,
        bankAccounts: bankAccounts
    }
};

//used with on-the-fly created buttons. Called first
customerObjects.addCustomerToBank = function(firstName, lastName, bankId) {
    customerObjects.addNewCustomer(firstName,lastName,bankId);
    // find and update bank's customers number field
    var thisBankCustomerAmount = data.banks[(bankId-1)].customers.length;
    var customerAmountTag = 'customersInBank' + bankId;
    var customerElement = document.getElementById(customerAmountTag);
    customerElement.innerText = thisBankCustomerAmount.toString();
};

// Called second
customerObjects.addNewCustomer = function(firstName, lastName, bankId){
    //creates new customer and adds to customers array
    var customer = new customerObjects.customer((data.customers.length+1), firstName, lastName, bankId);
    data.customers.push(customer);
    data.banks[bankId-1].customers.push(customer);

    //create a visible panel for the new customer
    var customerListElements = document.getElementById('customer-list');
    var newCustomerElement = customerObjects.createCustomerElement(customer.id, bankId);
    //adds new customer element under html 'customer-list' element
    customerListElements.appendChild(newCustomerElement);
    //document.customer-list.newCustomerElement innerHTML needs to be updated separately.
    customerListElements.lastElementChild.innerHTML = newCustomerElement.innerHTML;
};


customerObjects.createCustomerElement = function (customerId, bankId){
    var element = document.createElement("element");
    element.setAttribute("id", "customer"+customerId);
    element.classList.add('bank'+bankId, 'customer-list');
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });

    element.addEventListener('click', function() {
        var idList = ['bank'+bankId,'customer'+customerId];
        data.disableAll(idList);
        this.classList.add('selected');
        data.showChildren('bank'+bankId, 'surface3'); // customers under bankId
        data.showChildren('customer'+customerId, 'surface2'); //accounts under customerId
    });

    //reusable element
    var valueElement = document.createElement("value");

    //Title
    var headerElement = document.createElement("panelHeader");
    headerElement.innerHTML = "CUSTOMER";
    element.appendChild(headerElement);

    element.innerHTML += '<br>First name: ';
    valueElement.id = 'firstNameOfCustomer'+(customerId);
    valueElement.innerText = data.customers[customerId-1].firstName;
    element.appendChild(valueElement);

    element.innerHTML += '<br>Last Name: ';
    valueElement.id = 'lastNameOfCustomer'+(customerId);
    valueElement.innerText = data.customers[customerId-1].lastName;
    element.appendChild(valueElement);

    element.innerHTML += "<br>Amount of bank accounts: ";
    valueElement.id = 'accountsInCustomer'+(customerId);
    valueElement.innerText = data.customers[customerId-1].bankAccounts.length;
    element.appendChild(valueElement);
    element.innerHTML += "<br> ";

    var accountButton = document.createElement("button");
    accountButton.setAttribute('id', "account-button");
    accountButton.textContent = "Add account";
    var onClickString = 'accountObjects.addAccountToCustomer(\'FI2352980620030163\' , \'Joku tili\' ,'+ bankId +','  + customerId + ')';
    accountButton.setAttribute('onclick', onClickString);
    element.appendChild(accountButton);
    element.innerHTML += "<br>";
    return element;
};



