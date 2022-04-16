const dateFormat = (d) => {
    const string = d.toString()
    var parts = string.split(" ");
    var months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
}
export default dateFormat;