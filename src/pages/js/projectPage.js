var userId = null;
$( document ).ready(function() {
  getProjects()
});



function getProjects() {

  $.ajax({
    type : "GET",
    url : "/projects",
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

  html.push("<th> <h3>" + "Project Id" + " </h3></td>");
  html.push("<th> <h3>" + "Project Name" + "</h3> </td>");
  html.push("<th> <h3>" + "Project Desc " + "</h3> </td>");

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
    html.push('<td><h4>' + item['projectName'] + '</h4></td>');
    html.push('<td><h4>' + item['projectDesc'] + '</h4></td>');



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



  
  // $.ajax({
  //   type : "GET",
  //   url : "/departments",
  //   dataType : "JSON",
  //   contentType : "application/json",
  //   success : success,
  //   error : error
  // });
  // function success(response) {
  //   var subList = '<option hidden>Subject Type</option>';
  //   const result = response.data;

  //   console.log(result);

  //   for (let i = 0; i < result.length; i++) {
      
  //     subList += '<option value="'+ result[i].id + '">'+ result[i].depaertmentName + '</option>';
      
  //   }
  //   document.getElementById("drop_down_sub").innerHTML = subList;
  
  // }
  // function error(e) {
  //   alert(JSON.stringify(e));
  // }








}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


function addPro(){


  if (userId) {
    updateProjects(userId);
    return ;
  }

  var input = {};
  input.projectName = $("#proName").val();
  input.projectDesc = $("#proDesc").val();
  // var intd =$("#drop_down_sub").val()
  // var cD =  parseInt(intd)


  // input.dept_id = cD

  $.ajax({
    type : "POST",
    url : "/project/add",
    dataType : "JSON",
    data : JSON.stringify(input),
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
  
    getProjects()
  }
  function error(e){
   alert(JSON.stringify(e));
  }

}



function editById(params) {

  userId = params;
  

  $.ajax({
    type : "GET",
    url : "/project/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {


    openForm()
    $('#proName').val(response.data['projectName']);
    $('#proDesc').val(response.data['projectDesc']);
    
  }
  function error(e){
    console.log(e);
  }
  
}

function updateProjects(params) {



  var input = {};
  input.projectName = $("#proName").val();
  input.projectDesc = $("#proDesc").val();
  // var intd =$("#drop_down_sub").val()
  // var cD =  parseInt(intd)


  // input.dept_id = cD


  $.ajax({
    type : "PUT",
    url : "/project/update/"+params,
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
    url : "/project/delete/"+params,
    dataType : "JSON",
    contentType : "application/json",
    success : success,
    error : error
  });
  function success(response) {
    
    getProjects()
  }
  function error(e){
    console.log(e);
  }

  
}