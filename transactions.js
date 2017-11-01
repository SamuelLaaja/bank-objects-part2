var transactionObjects = {};

transactionObjects.transaction = function (id, iban, amount, timeStamp) {
    return {
        id: id,
        iban: iban,
        amount: amount,
        timeStamp: timeStamp
    }
};

//used with on-the-fly created buttons. Called first
transactionObjects.addTransactionToAccount = function (iban, amount, accountId, customerId, bankId) {
    transactionObjects.addNewTransaction(data.transactions.length+1 , iban, amount, new Date().toLocaleString(), accountId, customerId, bankId);
    // find and update account's transaction number field
    var thisAccountsUpdatedBalanceAmount = data.bankAccounts[(accountId-1)].balance + amount;
    var transactionAmountTag = 'balanceInAccount' + accountId;
    var transactionElement = document.getElementById(transactionAmountTag);
    transactionElement.innerText = thisAccountsUpdatedBalanceAmount.toString();
    data.bankAccounts[(accountId-1)].balance = thisAccountsUpdatedBalanceAmount;
};

// Called second. Pointless to keep separate.
transactionObjects.addNewTransaction = function(id, iban, amount, timeStamp, accountId, customerId, bankId){
    //creates new transaction and adds to transactions array
    var transaction = new transactionObjects.transaction(id, iban, amount, timeStamp);
    data.transactions.push(transaction);

    //create a visible panel for the new transaction
    var transactionListElements = document.getElementById('transaction-list');
    var newTransactionElement = transactionObjects.createTransactionElement(data.transactions.length, accountId, customerId, bankId);
    //adds new transaction element under html 'transaction-list' element
    transactionListElements.appendChild(newTransactionElement);
    //document.transaction-list.newTransactionElement innerHTML needs to be updated separately.
    transactionListElements.lastElementChild.innerHTML = newTransactionElement.innerHTML;
};


transactionObjects.createTransactionElement = function (transactionId, accountId, customerId, bankId){
    var element = document.createElement("element");
    element.setAttribute("id", "transaction"+transactionId);
    element.classList.add('account'+accountId, 'transaction-list');
    element.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    element.addEventListener('mouseleave', function() {
        this.classList.remove('hover')
    });
    //reusable element
    var valueElement = document.createElement("value");

    element.addEventListener('click', function() {
        var idList = ['bank'+bankId, 'customer'+customerId, 'account'+accountId];
        data.disableAll(idList);
        this.classList.add('selected');
        //data.showChildren('bank'+bankId, 'surface0'); // customers under bankId
        //data.showChildren('customer'+customerId, 'surface0'); //accounts under customerId
        data.showChildren('account'+accountId, 'surface3'); //transactions under accountId
    });

    //Title
    var headerElement = document.createElement("panelHeader");
    headerElement.innerHTML = "TRANSACTION";
    element.appendChild(headerElement);

    element.innerHTML += '<br>IBAN number: ';
    valueElement.id = 'ibanOfTransaction'+(transactionId);
    valueElement.innerText = data.transactions[transactionId-1].iban;
    element.appendChild(valueElement);

    element.innerHTML += "<br>Amount of money transacted: ";
    valueElement.id = 'amountOfTransaction'+(transactionId);
    valueElement.innerText = data.transactions[transactionId-1].amount;
    element.appendChild(valueElement);
    element.innerHTML += "<br> ";

    element.innerHTML += '<br>Transaction date & time: ';
    valueElement.id = 'dateOfTransaction'+(transactionId);
    valueElement.innerText = data.transactions[transactionId-1].timeStamp;
    element.appendChild(valueElement);

    // var transactionButton = document.createElement("button");
    // transactionButton.setAttribute('id', "transaction-button");
    // transactionButton.textContent = "Add transaction";
    // var onClickString = 'transactionObjects.addTransactionToTransaction(' + data.bankTransactions[transactionId-1].iban + ' , 100 ,' + transactionId + ')';
    // transactionButton.setAttribute('onclick', onClickString);
    // transactionElement.appendChild(transactionButton);
    // transactionElement.innerHTML += "<br>";
    return element;
};