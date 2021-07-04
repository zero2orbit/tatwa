var userId = null;
$( document ).ready(function() {
  getAllDepartment()
});



function getAllDepartment() {

  $.ajax({
    type : "GET",
    url : "/departments",
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
    var selector = "tableId";
    jsonToTable(response.data, selector);
  }
  function error(e) {
    alert(JSON.stringify(e));
  }
}



function jsonToTable(json, selector) {
  //begin function

  //array to hold the html for the table
  var html = [];

  //add the opening table and tablebody tags
  html.push("<tbody>");

  //begin adding the table headers
  html.push("<tr>");

  html.push("<th> <h3>" + "Department Id" + " </h3></td>");
  html.push("<th> <h3>" + "Department Name" + "</h3> </td>");
  html.push("<th> <h3>" + "Department Email " + "</h3> </td>");

  html.push("<th> <h3>" + "Action " + "</h3> </td>");



  // <td>' + '	<button type="button" onclick= "editById(' + item[key] + ')" class="btn btn-link">edit</button><button type="button" onclick="deleteRecordById(' + item[key] + ')" class="btn btn-link">delete</button>' + '</td>'


  html.push("</tr>");

  console.log(json); //add the closing table and table body tags

  //loop through the array of objects
  json.forEach(function (item) {
    //begin forEach

    //add the opening table row tag
    html.push("<tr>");

    //loop though each of the objects properties
    // for (var key in item) {

    //   console.log(item,    key);


    //   //begin for in loop

    //   //append the table data containing the objects property value
    //   html.push('<td><h4>' + item[key] + '</h4></td>');


    // } //end for in loop
    

    html.push('<td><h4>' + item['id'] + '</h4></td>');
    html.push('<td><h4>' + item['depaertmentName'] + '</h4></td>');
    html.push('<td><h4>' + item['depaertmentDesc'] + '</h4></td>');



    html.push('<td>' + '	<button type="button" onclick= "editById(' + item['id'] + ')" class="btn btn-link"><h4>Update</h4></button><button type="button" onclick="deleteRecordById(' + item['id'] + ')" class="btn btn-link"><h4>Delete</h4></button>' + '</td>');

    //add the closing table row tag
    html.push("</tr>");
  }); //end forEach

  html.push("</tbody>");

  //testing display of results
  document.getElementById(selector).innerHTML = html.join("");
} //end function


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


function addDept(){


  if (userId) {
    updateEmployee(userId);
    return ;
  }

  var input = {};
  input.depaertmentName = $("#deptName").val();
  input.depaertmentDesc = $("#deptDesc").val();

  $.ajax({
    type : "POST",
    url : "/department/add",
    dataType : "JSON",
    data : JSON.stringify(input),
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
    getAllDepartment()
  }
  function error(e){
    console.log(e);
  }

}



function editById(params) {

  userId = params;

  $.ajax({
    type : "GET",
    url : "/department/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {

    openForm()
    $('#deptName').val(response.data['depaertmentName']);
    $('#deptDesc').val(response.data['depaertmentDesc']);
    
  }
  function error(e){
    console.log(e);
  }
  
}

function updateEmployee(params) {



  var input = {};
  input.depaertmentName = $("#deptName").val();
  input.depaertmentDesc = $("#deptDesc").val()

  $.ajax({
    type : "PUT",
    url : "/department/update/"+params,
    dataType : "JSON",
    data : JSON.stringify(input),
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
  
  }
  function error(e){
    console.log(e);
  }
  
}


function deleteRecordById(params) {


  $.ajax({
    type : "DELETE",
    url : "/department/delete/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
    
    getAllDepartment()
  }
  function error(e){
    console.log(e);
  }

  
}