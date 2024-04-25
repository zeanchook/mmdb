// // let ob1 = []

// // let ob2 = [...ob1,1,2,3]

// // console.log(ob2)

// let data = {
//     "records": [
//         {
//             "id": "recDyczRJ9HKGZya5",
//             "createdTime": "2024-04-19T05:20:41.000Z",
//             "fields": {
//                 "Name": "2",
//                 "SearchName": "testjing"
//             }
//         },
//         {
//             "id": "recLDWoa1IJEAIZVG",
//             "createdTime": "2024-04-18T09:06:07.000Z",
//             "fields": {
//                 "Name": "1",
//                 "SearchName": "testjing"
//             }
//         },
//         {
//             "id": "recbvEr6hDW5zDf0c",
//             "createdTime": "2024-04-19T05:21:35.000Z",
//             "fields": {
//                 "Name": "3",
//                 "SearchName": "testjing"
//             }
//         },
//         {
//             "id": "recosza2rm96l4Nwq",
//             "createdTime": "2024-04-20T02:05:18.000Z",
//             "fields": {
//                 "Name": "5",
//                 "SearchName": "testjing"
//             }
//         },
//         {
//             "id": "recrfhXUGho3kfv7M",
//             "createdTime": "2024-04-19T05:23:19.000Z",
//             "fields": {
//                 "Name": "4",
//                 "SearchName": "4"
//             }
//         }
//     ]
// }
// let obj2 = [
//     "his%20namesss",
//     "his%20namess",
//     "his%20names",
//     "his%20name",
//     "your%20name"
// ]
// // let newData = data.records.map((item,idx) => ({ id: item.id, searchName: obj2[item.fields.Name] }));
// // let newData = data.records.map((item,idx) => ({...item, fields:{...item.fields,SearchName: obj2[item.fields.Name]} }));


// // let newData = data.records.sort()
// // console.log(newData)



// let test2 = [
//     {
//         "id": "recDyczRJ9HKGZya5",
//         "createdTime": "2024-04-19T05:20:41.000Z",
//         "fields": {
//             "Name": "2",
//             "SearchName": "your%20name"
//         }
//     },
//     {
//         "id": "recLDWoa1IJEAIZVG",
//         "createdTime": "2024-04-18T09:06:07.000Z",
//         "fields": {
//             "Name": "1",
//             "SearchName": "my%20name"
//         }
//     },
//     {
//         "id": "recbvEr6hDW5zDf0c",
//         "createdTime": "2024-04-19T05:21:35.000Z",
//         "fields": {
//             "Name": "3",
//             "SearchName": "y"
//         }
//     },
//     {
//         "id": "recosza2rm96l4Nwq",
//         "createdTime": "2024-04-20T02:05:18.000Z",
//         "fields": {
//             "Name": "5",
//             "SearchName": "n"
//         }
//     },
//     {
//         "id": "recrfhXUGho3kfv7M",
//         "createdTime": "2024-04-19T05:23:19.000Z",
//         "fields": {
//             "Name": "4",
//             "SearchName": "ya"
//         }
//     }
// ]

// let test3 = test2.sort( (a,b) => 
// {
//     if(a.fields.Name > b.fields.Name) 
//     {
//         return 1;
//     }
//     if(a.fields.Name < b.fields.Name)
//     {
//         return -1;
//     }
//     return 0;

// })

// console.log(test3)

// // console.log(test3)

// // let test4 = test3.map( (x,idx) => 
// // {
// //     // console.log(test3[idx].fields)
// //     // test3[idx+1].fields.SearchName = test3[idx].fields.SearchName
// //     console.log(test3[idx+1].fields)
// // }) 

// // console.log(test4)


// // Assuming `newData` is your existing array and `newSearchName` is the new search name you want to add
// let newSearchName = "new%20search%20name";

// let index = test3.findIndex(item => item.fields.Name === '1');
// if (index !== -1) {
    
//     for (let i = test3.length - 1; i > 0; i--) {
//         test3[i].fields.SearchName = test3[i - 1].fields.SearchName;
//     }
    
//     test3[index].fields.SearchName = newSearchName;
// }

// console.log("after",test3);

// let ob1 = [{fields:{
//                 "Name": "1",
//                 "SearchName": "my%20name"
//             }}]
// let ob2 = [...ob1,ob1[0].fields.Name = 2]
// console.log(ob2.slice(0))


let obj1 = [
    "Animation,Romance,Drama",
    "Science Fiction,Action,Adventure",
    "Adventure,Action,Science Fiction"
]
let ob2 = obj1.join(",").split(",")

let ob3 = [];

ob2.forEach(x => {
    let existingItem = ob3.find(item => item === x);
    if (existingItem) {
        existingItem.x++;
    } else {
        ob3.push({x: 1 });
    }
});


    console.log(ob3)
