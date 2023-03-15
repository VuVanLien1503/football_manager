
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
                        </tr>
                        </thead>
                        <tbody>`;
            for (const user of users) {
                str += `  
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.fullName}</td>
                            <td>${user.username}</td>
                            <td>${user.roles[0]}</td>
                            <td>
                                <a type="button" class="btn btn-primary" href="accountManager.html" onclick="accountManager(${user.id})"
                                >Detail
                                </a>
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
