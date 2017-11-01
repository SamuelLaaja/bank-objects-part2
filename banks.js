var bankObjects = {};

// Bank object
bankObjects.Bank = function (id, name, bic) {
    var customers = [];

    return {
        id: id,
        bankName: name,
        bic: bic,
        customers: customers
    }
};

//called from index.html
bankObjects.onBankButtonClick = function() {
    var id = (data.banks.length+1);
    bankObjects.addNewBank(id, 'Bank #'+id, 'BANKFIHH');
};

bankObjects.addNewBank = function(id, name, bic){
    //creates new bank and adds to banks array
    var newBank = new bankObjects.Bank(id, name, bic);
    data.banks.push(newBank); //index 0 for id 1, index 1 for id 2, etc. Not very neat way...

    //adds new individual bank element under html 'bank-list' collective element
    var bankListElements = document.getElementById('bank-list');
    //if this is the first bank, clear out innerHTML
    if (id === 1){
        bankListElements.innerHTML = null;
    }
    var newBankElement = bankObjects.createBankElement(id);
    bankListElements.appendChild(newBankElement);
    //document.bank-list.newBankElement innerHTML needs to be updated separately.
    bankListElements.lastElementChild.innerHTML = newBankElement.innerHTML;
};

// create visible html panel for bank
bankObjects.createBankElement = function (bankId){
    var element = document.createElement("element");
    element.setAttribute("id", "bank"+bankId);
    element.classList.add('surface3', 'bank-list');
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });

    element.addEventListener('click', function() {
        var idList = ['bank'+bankId];
        data.disableAll(idList);
        this.classList.add('selected');
        data.showChildren('bank'+bankId, 'surface2');
        data.showChildren('bank-list', 'surface3');
    });

    //reusable element
    var valueElement = document.createElement("value");

    //Title
    var headerElement = document.createElement("panelHeader");
    headerElement.innerHTML = "BANK";
    element.appendChild(headerElement);

    element.innerHTML += "<br>Bank name: ";
    valueElement.id = 'nameOfBank'+(bankId);
    valueElement.innerText = data.banks[bankId-1].bankName;
    element.appendChild(valueElement);

    element.innerHTML += "<br>BIC code: ";
    valueElement.id = 'bicOfBank'+(bankId);
    valueElement.innerText = data.banks[bankId-1].bic;
    element.appendChild(valueElement);

    element.innerHTML += "<br>Customer amount: ";
    valueElement.id = 'customersInBank'+(bankId);
    valueElement.innerText = data.banks[bankId-1].customers.length;
    element.appendChild(valueElement);
    element.innerHTML += "<br> ";

    //Edit this bank information
    var button =  document.createElement("button");
    button.setAttribute('id', "edit-button");
    button.textContent = "Edit bank";
    var onClickString = 'bankObjects.editBank('+bankId+')';
    button.setAttribute('onclick', onClickString);
    element.appendChild(button);
    element.innerHTML += "<br>";

    //Remove this bank
    button.setAttribute('id', "remove-button");
    button.textContent = "Delete bank";
    onClickString = 'data.eraseThisAndChildren(\'bank'+bankId+'\')';
    button.setAttribute('onclick', onClickString);
    element.appendChild(button);
    element.innerHTML += "<br>";

    // Add customer
    //var button =  document.createElement("button");
    button.setAttribute('id', "customer-button");
    button.textContent = "Add customer";
    // create a button that calls a function with new customer data
    onClickString = 'customerObjects.addCustomerToBank( \'Jaska\',\'Jokunen\',' + bankId +')';
    button.setAttribute('onclick', onClickString);
    element.appendChild(button);

    element.innerHTML += "<br>";
    return element;
};

bankObjects.deleteBank = function(bankId){
    document.getElementById('bank'+bankId).remove();

};

bankObjects.getBanks = function(innerHTML){
    var bankList = document.getElementById('bank-list');
    if (data.banks.length > 0) {
        bankList.innerHTML = innerHTML;
    } else
        bankList.innerHTML = 'No banks found.';
};
