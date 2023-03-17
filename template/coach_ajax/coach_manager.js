
    function homeCoach(){
        displayTypicalCoachAdmin()
    }
    window.onload = homeCoach()

    //Hiển thị HLV tiêu biểu bên admin
    function displayTypicalCoachAdmin(){
        $.ajax({
            url : "http://localhost:8081/admin/coaches/typical",
            type: "GET",
            success(data){
                let context = ""
                for (let i = 0; i < data.length; i++) {
                    context += `<div class="col-sm-12 col-md-4">
                                        <div class="coach-item">
                                          <div class="gambar">
                                            <img src="${data[i].imagePath}" onclick="detailCoach(${data[i].id})" style="width: 500px; height: 500px" alt="Coach" class="img-responsive">
                                          </div>
                                          <div class="item-body">
                                            <div class="name">
                                              ${data[i].name}
                                            </div>
                                            <div class="position">
                                              ${data[i].position.name}
                                            </div>
                                          </div>
                                        </div>
                                      </div>`
                }
                document.getElementById("typicalCoach").innerHTML = context;

            }
        })
    }

    //Hiển thi danh sách tất cả HLV
    function displayAllCoach(page){
        $.ajax({
            url : "http://localhost:8081/admin/coaches?page=" + page + "&size=3",
            type : "GET",
            success(data){
                displayTableCoach(data.content)
                displayCoachPage(data)
                if (data.pageable.pageNumber === 0) {
                    document.getElementById("backup").hidden = true
                }
                //điều kiện bỏ nút next
                if (data.pageable.pageNumber + 1 === data.totalPages) {
                    document.getElementById("next").hidden = true
                }
                $("#tableCoach").show()
            }
        })
    }

    //Hiển thị bảng HVL
    function  displayTableCoach(data){
        let context = `<div class="container">
                    <h2 style="text-align: center">List Coach</h2>
                    <table class="table table-striped-columns">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Work Position</th>
                            <th>Hard Salary</th>
                            <th>Bonus Salary</th>              
                            <th colspan="2" style="text-align: center">Action</th>
                        </tr>
                        </thead>
                        <tbody>`
        for (let i = 0; i < data.length; i++) {
            context += `<tr>
                                <td>${i+1}</td>
                                <td><img src="${data[i].imagePath}" onclick="detailCoach(${data[i].id})" alt="Coach" style="width: 50px"; height="50px"></td>
                                <td>${data[i].name}</td>
                                <td>${data[i].date}</td>
                                <td>${data[i].address}</td>
                                <td>${data[i].position.name}</td>
                                <td>${data[i].sumHardSalary}</td>
                                <td>${data[i].sumBonusSalary}</td>
                                <td><button  class="btn btn-warning" onclick="updateFormCoach(${data[i].id})">Update</button></td>
                                <td><button  class="btn btn-danger" onclick="deleteFormCoach(${data[i].id})">Delete</button></td>
                                </tr>`
        }
        context += `</tbody> </table> </div>`
        document.getElementById("showCoach").innerHTML = context;
    }
    function displayCoachPage(data){

        let content = `<button class="btn btn-primary" id="backup" onclick="isPreviousCoach(${data.pageable.pageNumber})">Previous</button>
        <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
        <button class="btn btn-primary" id="next" onclick="isNextCoach(${data.pageable.pageNumber})">Next</button>
        <button class="btn btn-success" onclick="createFormCoach()" id="creatFormCoach" style="margin-left: 800px">Create Coach</button>`
        document.getElementById('pageCoach').innerHTML = content;
    }
    //hàm lùi page
    function isPreviousCoach(pageNumber) {
        displayAllCoach(pageNumber-1)
    }

    //hàm tiến page
    function isNextCoach(pageNumber) {
        displayAllCoach(pageNumber+1)
    }

    //Truy cập form tạo mới HVL
    function createFormCoach(){
    // goi modal creat
        $('#myModalCrate').modal('show');
        document.getElementById("coachForm").reset()
        getSelectTypical()
        getWorkPosition()
    }

    // Truy xuat danh sách vị tr HLV
    function getWorkPosition(){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            url : "http://localhost:8081/admin/coaches/positions",
            type: "GET",
            success(data){
                console.log(data)
                let context = `<label for="positions" class="form-label">Work Position</label><br>
                                        <select id="positions" class="form-control"  style="width: 25%">`
                for (let i =0; i <data.length; i++){
                    context+=`<option value="${data[i].id}">${data[i].name}</option>`
                }
                context += `</select>`
                document.getElementById("workPosition").innerHTML = context
                document.getElementById("updateWorkPosition").innerHTML = context
            },
        })
    }

    function getSelectTypical(){
        let arr = [true, false]
        let context = `<label for="positions" class="form-label">Typical Coach</label><br>
                                        <select id="optionType" class="form-control"  style="width: 25%">`
        for (let i =0; i <arr.length; i++){
            context+=`<option value="${arr[i]}">${arr[i]}</option>`
        }
        context += `</select>`
        document.getElementById("selectTypical").innerHTML = context

    }
    function getUpdateSelectTypical(){
        let arr = [true, false]
        let context = `<label for="positions" class="form-label">Typical Coach</label><br>
                                        <select id="optionType" class="form-control"  style="width: 25%">`
        for (let i =0; i <arr.length; i++){
            context+=`<option value="${arr[i]}">${arr[i]}</option>`
        }
        context += `</select>`
        document.getElementById("updateSelectTypical").innerHTML = context
    }

    // Tạo mới 1 HLV
    function creatCoach(){
        let coach = {
            name : $("#nameCoach").val(),
            date : $("#ageCoach").val(),
            address : $("#addressCoach").val(),
            position : {
                id : $("#positions").val(),
            },
            typicalCoach : $("#optionType").val(),

        }
        console.log(coach)
        let formData = new FormData();
        formData.append("file", $('#file')[0].files[0])
        formData.append("coach",
            new Blob([JSON.stringify(coach)], {type: 'application/json'}))
        console.log(formData)
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            contentType: false,
            processData: false,
            url: "http://localhost:8081/admin/coaches/save",
            type: "POST",
            data: formData,
            success() {
                alert("Success!")
                document.getElementById("coachForm").reset()
                displayAllCoach(0)
            }
        })
        event.preventDefault()
    }

    //Back danh sách HVL
    function backToDisplayCoach(){
        $("#tableCoach").show()
        $('#myModalUpdate').addClass('hidden');

    }

    function updateFormCoach(id){
        $('#myModalUpdate').modal('show')
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            url : `http://localhost:8081/admin/coaches/${id}`,
            type: "GET",
            success(data) {
                $("#idUpdateCoach").val(data.id)
                $("#nameUpdateCoach").val(data.name)
                $("#ageUpdateCoach").val(data.date)
                $("#addressUpdateCoach").val(data.address)
                getWorkPosition()
                getUpdateSelectTypical()
                $("#updateFormCoach").show()
                $("#detailCoach").hide()
            }
        })
    }

    function updateCoach(){
        let coach = {
            id : $("#idUpdateCoach").val(),
            name : $("#nameUpdateCoach").val(),
            date : $("#ageUpdateCoach").val(),
            address : $("#addressUpdateCoach").val(),
            position : {
                id : $("#positions").val(),
            },
            typicalCoach : $("#optionType").val(),
        }
        console.log(coach)
        let formData = new FormData();
        formData.append("file", $('#fileUpdate')[0].files[0])
        formData.append("coach",
            new Blob([JSON.stringify(coach)], {type: 'application/json'}))
        console.log(formData)
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            contentType: false,
            processData: false,
            url: "http://localhost:8081/admin/coaches/save",
            type: "POST",
            data: formData,
            success() {
                alert("Success!")
                document.getElementById("coachForm").reset()
                displayAllCoach(0)

            }
        })
        event.preventDefault()
    }


    // Xóa HLV
    function deleteFormCoach(id){
        if (confirm("Do you want to delete ?")) {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                url: `http://localhost:8081/admin/coaches/${id}`,
                type: "DELETE",
                success() {
                    alert("Delete successfully!")
                    displayAllCoach(0)
                }
            })
        }
    }

    function detailCoach(id){
        $('#myModal').modal('show');
        $.ajax({
            url: `http://localhost:8081/admin/coaches/${id}`,
            type : "GET",
            success(data){
                let context=`<div class="card" style="width: 100%">
                                <div style="width:  50%">
                                <img class="card-img-top" src="${data.imagePath}" style="width: 200px"; height="200px"alt="Card image cap">                        
                                </div>
                              
                                <div class="card-body" >
                                 <div style="width: 50%">
                                    <h4 class="card-title" style="color: red"><i>NAME  : </i>${data.name}</h4>
                                    <p>BirDay   :  ${data.date}</p>
                                    <p>Position :  ${data.position.name}</p>
                                    <p>Salary   :  ${data.sumHardSalary}</p>
                                    <p>Bonus    :  ${data.sumBonusSalary}</p>
                                </div>
                                </div>
                              </div>`
                document.getElementById("detailCoach").innerHTML = context
                $("#detailCoach").show()
            }

        })
    }




