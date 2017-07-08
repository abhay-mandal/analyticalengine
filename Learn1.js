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
var object = count;
var sortedCount = [];

for (var property in object) { 
    if (object.hasOwnProperty(property)) {
        var arr = Object.keys(object).map(function (key) { return object[key]; });
        var max = Math.max(...arr);
        for (var p in object) { 
            if (object.hasOwnProperty(p)) {
                if(object[p] == max){
                    sortedCount.push(p);
                    object[p] = 0;
                    break;
                }
            }
        }
    }
}


for (var i = 0; i < data.length; i++) {
    data[i].interest = sortData(sortedCount, data[i].interest);
}

function sortData(sortedCount, data) {
    var solution = [];
    for (var i = 0; i < sortedCount.length; i++) {
        if (isPresent(sortedCount[i], data)) {
            solution.push(sortedCount[i]);
        }
    }
    return solution;
}
function isPresent(value, data) {
    for (var i = 0; i < data.length; i++) {
        if (value == data[i])
            return true;
    }
    return false;
}





var root = { label: 'root', child: [] };

for (var i = 0; i < data.length; i++) {
    var currNode = root;
    for (var j = 0; j < data[i].interest.length; j++) {
        currNode = appendChild(currNode, data[i].interest[j]);
    }
}
console.log(JSON.stringify(root));
function appendChild(currNode, label) {
    for (var i = 0; i < currNode.child.length; i++) {
        if (currNode.child[i].label == label) {
            currNode.child[i].count++;
            return currNode.child[i];
        }
    }
    var childNode = {
        label: label,
        count: 1,
        child: []
    };
    currNode.child.push(childNode);
    return childNode;
}

//Done generation of FP-Tree, Now need to find association rule [root]
function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

var allPatern = {};
function traverseTree(path,currNode){
    path.push(currNode.label);
    for(var i=0; i<currNode.child.length;i++){
        if(!allPatern[currNode.child[i].label])
            allPatern[currNode.child[i].label] = [];
        allPatern[currNode.child[i].label].push({path:clone(path),count:currNode.child[i].count});
        traverseTree(path,currNode.child[i]);
    }
    path.pop();
}

traverseTree([],root);
console.log(JSON.stringify (allPatern));