function show() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8081/users/listUser",
        //xử lý khi thành công
        success: function (users) {
            console.log(users)
            let str = `  <table class="table table-striped">
                        <h1 STYLE="color: #d58512">USER LIST</h1>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>`;
            for (const user of users) {
                console.log(user)
                str += `  
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.fullName}</td>
                            <td>${user.username}</td>
                            <td>${user.roles[0].name}</td>
                            <td>
                                <a type="button" class="btn btn-primary"  onclick="accountManager(${user.id})"
                                >Detail
                                </a>
                            </td>
                            <td>
                                <a onclick="xoaUser(${user.id})" class="btn btn-danger">Xoa</a>
                            </td>
                           

                        </tr>`
            }

            str += `    </tbody>
                    </table>`

            document.getElementById("show").innerHTML = str;

        },
        error: function (err) {
            console.log(err)
        }
    })
    // event.preventDefault();
}


if (localStorage.getItem("username") === "admin") {
    show();
}

function accountManager(id) {

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8081/users/" + id,
        //xử lý khi thành công
        success: function (user) {

            document.getElementById("id").value = user.id;
            $("#fullName").val(user.fullName)
            $("#username").val(user.username);
            $("#password").val(user.password);
            $("#address").val(user.address);
            $("#phoneNumber").val(user.phoneNumber);

            let img = `
                      <img id="blah" src="${user.avatar}" width="120" class="rounded-circle" />
                      `


            // document.getElementById("showAvatar1").innerHTML = img;

            let str = `
                  <div class="col-sm-3">
                                    <h6 class="mb-0">Grant access</h6>
                                    <select class="btn btn-primary" id="role">
                                        <option value="1">ADMIN</option>
                                        <option value="2">COACH</option>
                                        <option value="3">PLAYER</option>
                                        <option value="4">USER</option>
                                    </select>
                                </div>
            `

            document.getElementById("showDetail").innerHTML = str;
            document.getElementById("profileImg").innerHTML = img;
            document.getElementById("fullName1").innerHTML = user.fullName;
            document.getElementById("address1").innerHTML = user.address;

            let role = user.roles[0].name
            role = role.slice(5)
            document.getElementById("roleUser").innerHTML = role

        },
        error: function (err) {
            console.log(err)
            alert("có lỗi")
        }
    });
event.preventDefault()
}

function xoaUser(id) {
    if(confirm("Bạn có chắc chắn muốn xóa tài khỏan này ???")=== false){
        return
    }

    $.ajax({
        type: "DELETE",
        url: "http://localhost:8081/users/" + id,
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        success: function (data) {
            alert("Xóa account thành công ")
            show()
        },
        error:function (err) {
            console.log(err)
            alert("Bạn không thể xóa account này")
        }
    })
}