import Papa from "papaparse";
// parsing the data for hospitals_db.csv located in public folder
export function getObjectFromCSV(){
    return fetch("./Hospitals_DB.csv")
      .then((res) => res.text())
      .then((result) => {
        var data = []
        Papa.parse(result, {
          header: true,
          complete: (parsed_data) => {
                data = parsed_data["data"]
          },
        });

        return data


    });
}
// sorting function for table
export function sortTable(index, order, data){
    var sortedData
    if (order === "ascending") {
      sortedData = data.sort((a, b) =>{
        return (a[index] > b[index]) ? 1 : -1;
      })
    }
    else{
        sortedData = data.sort((a, b) =>{
            return (a[index] < b[index]) ? 1 : -1;
          })
    }
    return sortedData
  };
