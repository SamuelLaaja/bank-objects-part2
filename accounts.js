var accountObjects = {};

accountObjects.account = function (iban, accountName, bankId, customerId, balance) {
    return {
        iban: iban,
        accountName: accountName,
        bankId: bankId,
        customerId: customerId,
        balance: balance,
    }
};


//used with on-the-fly created buttons. Called first
accountObjects.addAccountToCustomer = function (iban, accountName, bankId, customerId) {
    accountObjects.addNewAccount(iban, accountName, bankId, customerId);
    // find and update customer's account number field
    var thisCustomerAccountAmount = data.customers[(customerId-1)].bankAccounts.length;
    var accountAmountTag = 'accountsInCustomer' + customerId;
    var accountElement = document.getElementById(accountAmountTag);
    accountElement.innerText = thisCustomerAccountAmount.toString();
};

// Called second. Pointless to keep separate.
accountObjects.addNewAccount = function(iban, accountName, bankId, customerId){
    //creates new account and adds to accounts array
    var account = new accountObjects.account(iban, accountName, bankId, customerId, 0);
    data.bankAccounts.push(account);
    data.customers[customerId-1].bankAccounts.push(account);

    //create a visible panel for the new account
    var accountListElements = document.getElementById('account-list');
    var newAccountElement = accountObjects.createAccountElement(data.bankAccounts.length, customerId, bankId);
    //adds new account element under html 'account-list' element
    accountListElements.appendChild(newAccountElement);
    //document.account-list.newAccountElement innerHTML needs to be updated separately.
    accountListElements.lastElementChild.innerHTML = newAccountElement.innerHTML;
};


accountObjects.createAccountElement = function (accountId, customerId, bankId){
    var element = document.createElement("element");
    element.setAttribute("id", "account"+accountId);
    element.classList.add('customer'+customerId, 'account-list');
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });

    element.addEventListener('click', function() {
        var idList = ['bank'+bankId, 'customer'+customerId];
        data.disableAll(idList);
        this.classList.add('selected');
        //data.showChildren('bank'+bankId, 'surface0'); // customers under bankId
        data.showChildren('customer'+customerId, 'surface3'); //accounts under customerId
        data.showChildren('account'+accountId, 'surface2'); //transactions under accountId
    });

    //reusable element
    var valueElement = document.createElement("value");

    //Title
    var headerElement = document.createElement("panelHeader");
    headerElement.innerHTML = "ACCOUNT";
    element.appendChild(headerElement);

    element.innerHTML += '<br>IBAN number: ';
    valueElement.id = 'ibanOfAccount'+(accountId);
    valueElement.innerText = data.bankAccounts[accountId-1].iban;
    element.appendChild(valueElement);

    element.innerHTML += '<br>Account name: ';
    valueElement.id = 'nameOfAccount'+(accountId);
    valueElement.innerText = data.bankAccounts[accountId-1].accountName;
    element.appendChild(valueElement);

    element.innerHTML += "<br>Amount of money on account: ";
    valueElement.id = 'balanceInAccount'+(accountId);
    valueElement.innerText = data.bankAccounts[accountId-1].balance;
    element.appendChild(valueElement);
    element.innerHTML += "<br> ";

    var transactionButton = document.createElement("button");
    transactionButton.setAttribute('id', "transaction-button");
    transactionButton.textContent = "Add transaction";
    var onClickString = 'transactionObjects.addTransactionToAccount(\"' + data.bankAccounts[accountId-1].iban + '\", 100 ,' + accountId + ',' + customerId + ',' + bankId + ')';
    transactionButton.setAttribute('onclick', onClickString);
    element.appendChild(transactionButton);
    element.innerHTML += "<br>";
    return element;
};