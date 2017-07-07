var data = [
    {
        mobile: 1234,
        interest: ["a", "b", "c"]
    },
    {
        mobile: 3214,
        interest: ["d", "f", "s"]
    },
    {
        mobile: 4311,
        interest: ["f", "d", "c"]
    },
    {
        mobile: 4321,
        interest: ["f", "b", "s"]
    },
    {
        mobile: 6543,
        interest: ["s", "d", "c"]
    }
]

var count = {};

for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var intrst = obj.interest;
    for (var j = 0; j < intrst.length; j++) {
        if (count[intrst[j]]) {
            count[intrst[j]]++;
        } else {
            count[intrst[j]] = 1;
        }
    }
}
console.log(count);
var object = count;
var sortedCount = [];
for (var property in object) { //TODO: Check the algorithm
    if (object.hasOwnProperty(property)) {
        var prop=null;
        for (var property2 in object) {
            if (object.hasOwnProperty(property2)) {
                if(object[property]>=object[property2])
                    prop = property;
                else
                    prop = property2;
            }
        }
        object[prop] = 0;
    }
}
sortedCount = ["c","d","f","s","b","a"];
console.log(sortedCount);

for(var i=0; i<data.length; i++){
    data[i].interest = sortData(sortedCount,data[i].interest);
}

console.log(data);
function sortData (sortedCount, data){
    var solution=[];
    for( var i = 0; i < sortedCount.length; i++){
        if(isPresent(sortedCount[i], data)){
            solution.push(sortedCount[i]);
        }
    }
    return solution;
}
 function isPresent(value,data ){
    for(var i=0;i<data.length;i++){
        if(value == data[i])
            return true;
    }
    return false;
}





var root = {label:'root',child:[]};

for(var i=0;i<data.length;i++){
    var currNode = root;
    // console.log(data[i].interest[0]);
    for(var j=0; j<data[i].interest.length;j++){
        currNode = appendChild(currNode,data[i].interest[j]);
        // console.log(currNode);
    }
}
console.log(root);
function appendChild(currNode, label){
    for(var i=0;i<currNode.child.length;i++){
        if(currNode.child[i].label == label){
            currNode.child[i].count ++;
            return currNode.child[i];
        }
    }
    var childNode = {
        label : label,
        count : 1,
        child : []
    };
    currNode.child.push(childNode);
    return childNode;
}