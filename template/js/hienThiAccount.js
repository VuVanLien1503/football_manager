
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
                        <h1>Users manage</h1>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>`;
            for (const user of users) {
                str += `  
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.fullName}</td>
                            <td>${user.username}</td>
                            <td>${user.password}</td>
                            <td>${user.roles[0]}</td>
                            <td>${user.address}</td>
                            <td>
                                <button type="button" class="btn btn-primary" onclick="accountDetail(${user.id})"
                                >Detail
                                </button>
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
}
if(localStorage.getItem("username")=== "admin"){
    show();
}
