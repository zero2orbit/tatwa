var userId = null;
$( document ).ready(function() {
  getEmployees()
});



function getEmployees() {

  $.ajax({
    type : "GET",
    url : "/employees",
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
 
  var html = [];

  html.push("<tbody>");


  html.push("<tr>");

  html.push("<th> <h3>" + "Employee Id" + " </h3></td>");
  html.push("<th> <h3>" + "Employee Name" + "</h3> </td>");
  html.push("<th> <h3>" + "Employee Email " + "</h3> </td>");

  html.push("<th> <h3>" + "Action " + "</h3> </td>");



  // <td>' + '	<button type="button" onclick= "editById(' + item[key] + ')" class="btn btn-link">edit</button><button type="button" onclick="deleteRecordById(' + item[key] + ')" class="btn btn-link">delete</button>' + '</td>'


  html.push("</tr>");

  console.log(json); 

 
  json.forEach(function (item) {

    html.push("<tr>");

   

    html.push('<td><h4>' + item['id'] + '</h4></td>');
    html.push('<td><h4>' + item['name'] + '</h4></td>');
    html.push('<td><h4>' + item['email'] + '</h4></td>');

    html.push('<td>' + '	<button type="button" onclick= "editById(' + item['id'] + ')" class="btn btn-link"><h4>Update</h4></button><button type="button" onclick="deleteRecordById(' + item['id'] + ')" class="btn btn-link"><h4>Delete</h4></button>' + '</td>');


    html.push("</tr>");
  }); 
  html.push("</tbody>");

  document.getElementById(selector).innerHTML = html.join("");
} 


function openForm() {
  const result = getAllDepartment();
  document.getElementById("myForm").style.display = "block";

  // $.ajax({
  //   type : "GET",
  //   url : "/projects",
  //   dataType : "JSON",
  //   contentType : "application/json",
  //   success : success,
  //   error : error
  // });
  // function success(response) {
  //   var subList = '<option hidden>Subject Type</option>';
  //   const result = response.data;

  //   for (let i = 0; i < result.length; i++) {
      
  //     subList += '<option value="'+ result[i].id + '">'+ result[i].projectName + '</option>';
      
  //   }
  //   document.getElementById("drop_down_sub").innerHTML = subList;
  
  // }
  // function error(e) {
  //   alert(JSON.stringify(e));
  // }








  console.log(result)

 


}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


function addEmp(){


  if (userId) {
    updateEmployee(userId);
    return ;
  }

  var input = {};
  input.name = $("#name").val();
  input.email = $("#email").val()

  // var intd =$("#drop_down_sub").val()
  // var cD =  parseInt(intd)


  // input.proj_id = cD

  

  $.ajax({
    type : "POST",
    url : "/employee/add",
    dataType : "JSON",
    data : JSON.stringify(input),
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
  
    getEmployees()
  }
  function error(e){
    console.log(e);
    alert(JSON.stringify(e))
  }

}



function editById(params) {

  userId = params;

  $.ajax({
    type : "GET",
    url : "/employee/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {


    

    openForm()
    $('#email').val(response.data['email']);
    $('#name').val(response.data['name']);
    // if (response.data['project']['projectName']) {
    //   $('#drop_down_sub').val(response.data['project']['projectName']);
    // }
   

    
  }
  function error(e){
    console.log(e);
  }
  
}

function updateEmployee(params) {



  var input = {};
  input.name = $("#name").val();
  input.email = $("#email").val();
  //input.dept_id = $("#drop_down_sub").val();

  alert(JSON.stringify(input))

  $.ajax({
    type : "PUT",
    url : "/employee/update/"+params,
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
    alert(JSON.stringify(e))
  }
  
}


function deleteRecordById(params) {

  $.ajax({
    type : "DELETE",
    url : "/employee/delete/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
    
    getEmployees()
  }
  function error(e){
    console.log(e);
  }

  
}



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
    return response.data;
  }
  function error(e) {
    alert(JSON.stringify(e));
  }
}