var data = {};

data.banks = [];
data.customers = [];
data.bankAccounts = [];
data.transactions = [];


//hides everything except banks and idList heritage path
data.disableAll = function (idList) {
    var elements = document.getElementsByTagName('element');

    for (i=0;i<elements.length;i++){

        var foundHeritage = false;
        for (j=0; j<idList.length; j++){
            if (elements[i].id === (idList[j]))
                foundHeritage = true;
        }
        if (!foundHeritage) {
            elements[i].classList.remove('selected');
            //if (!elements[i].classList.contains('bank-list'))
                elements[i].setAttribute('hidden', true);
        }
    }

};

//delete all data under x. Rebuild references.
data.eraseThisAndChildren = function (id){

    // elements are deleted first
    var bank = [];
    var customers = [];
    var accounts = [];
    var transactions = [];
    bank.push(document.getElementById(id));

    //fill in customer array
    if (bank !== null){
        customers = document.getElementsByClassName(id);
    }
    else {
        customers.push(document.getElementById(id));
    }

    //fill in accounts array
    if (customers !== null){
        accounts = document.getElementsByClassName(id);
    }
    else {
        accounts.push(document.getElementById(id));
    }

    //fill in transactions array
    if (accounts !== null){
        transactions = document.getElementsByClassName(id);
    }
    else {
        transactions.push(document.getElementById(id));
    }

    console.log(bank.length);
    console.log(customers.length);
    console.log(accounts.length);
    console.log(transactions.length);
    elementDel = function (arr) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i]) {
                console.log(i + arr.toString());
                arr[i].remove();
            }
        }
    };
    elementDel(bank);
    elementDel(customers);
    elementDel(accounts);
    elementDel(transactions);
};

data.showChildren = function (className, hideSiblings) {
    var childrenInSelectedNode = document.getElementsByClassName(className);
    for (i=0;i<childrenInSelectedNode.length;i++){
        childrenInSelectedNode[i].classList.remove('surface1', 'surface2', 'surface3', 'surface4');
        childrenInSelectedNode[i].classList.add(hideSiblings);
        childrenInSelectedNode[i].removeAttribute('hidden');
    }

};