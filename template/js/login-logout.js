function loginUser() {

    let account = {
        "username": $("#username").val(),
        "password": $("#password").val()
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8081/users/login",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));
            alert("Đăng nhập thành công")
            location.href = "../index.html";
        },
        error: function (err) {
            console.log(err)
            alert("có lỗi")
        }
    })
}

function logout(){
    localStorage.removeItem("token");
    location.href="../index.html";
}


function onLoad() {

    if(localStorage.getItem("token")){
        document.getElementById("login-logout").innerHTML = "<a href='login-logout/user_information.html'>Profile</a>"
    }
    else {
        document.getElementById("login-logout").innerHTML = "<a href='login-logout/login.html' >login</a>"
    }
}
onLoad()
//
// function accountDetail(id) {
//     $.ajax({
//         type: "GET",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem("token")
//         },
//         url: "http://localhost:8081/users/" + id,
//         data: JSON.stringify(id),
//         //xử lý khi thành công
//         success: function (user) {
//             document.getElementById("id").value = user.id;
//             $("#fullName").val(user.fullName)
//             $("#username").val(user.username);
//             $("#password").val(user.password);
//             $("#avatar").val(user.avatar);
//             $("#address").val(user.address);
//             $("#phoneNumber").val(user.phoneNumber);
//
//             document.getElementById("fullName1").innerHTML = user.fullName;
//             document.getElementById("address1").innerHTML = user.address;
//             document.getElementById("role").innerHTML = user.role.name;
//         },
//         error: function (err) {
//             console.log(err)
//             alert("có lỗi")
//         }
//     })
// }