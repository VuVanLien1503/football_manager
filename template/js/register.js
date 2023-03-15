
function showAvatar() {
    let imgInp = document.getElementById("avatar");
    let blah = document.getElementById("blah");

    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}

function upAvatar() {
    alert("vao`")
    let fileImg = document.getElementById("avatar").files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);

    $.ajax({
        contentType: false,
        processData: false,
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8081/users/upAvatar",
        success: function (avatar) {
            createAccount(avatar)
        }, error: function (err) {
            alert("co loi xay ra")
            console.log(err)
        }
    })
}

function createAccount(avatar) {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let password1 = document.getElementById("password1").value;
    let role = document.getElementById("role").value;

    if(password!== password1){
        document.getElementById("thongBao").innerHTML = "MK không trùng khớp"
        return
    }
    if(username.toUpperCase()==="ADMIN"){
        document.getElementById("thongBao").innerHTML = "Bạn không thể đăng ký bằng tài khoản này"
        return;
    }
    if(password.length<5){
        document.getElementById("thongBao").innerHTML = "Mk quá ngắn,dưới 5 ký tự, ko khả thi"
        return;
    }

    let account = {
        "username": username,
        "password": password,
        "avatar": avatar,
        "role": role
    }

    $.ajax({
        type: "Post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8081/users/register",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            console.log(account)
            alert("Đăng ký thành công");
            location.href = "../index.html";
        },
        error: function (err) {
            alert("Tài khoản đã tồn tại")
            console.log(err)
        }
    })
}



function showAvatar1() {
    let imgInp = document.getElementById("avatar1");
    let blah = document.getElementById("blah1");
    let file = imgInp.files;
    blah.src = URL.createObjectURL(file[0])
}


function upDateAvatar() {
    // alert("vao`")
    let fileImg = document.getElementById("avatar1").files;
    var formData = new FormData();
    formData.append("fileImg", fileImg[0]);


    $.ajax({
        contentType: false,
        processData: false,
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        type: "POST",
        data: formData,
        url: "http://localhost:8081/users/upAvatar",
        success: function (avatar) {
            updateAccount(avatar)
        }, error: function (err) {
            console.log(formData)
            alert("Có lỗi xảy ra khi upload ảnh")
            console.log(err)
        }
    })
}

function updateAccount(avatar) {
    // alert("jo")
    let id = document.getElementById("id").value;
    let fullName = document.getElementById("fullName").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let address = document.getElementById("address").value;

    let account = {
        "id": id,
        "fullName": fullName,
        "username": username,
        "password": password,
        "phoneNumber": phoneNumber,
        "address": address,
        "avatar": avatar
    }
    console.log( localStorage.getItem("user"))


    $.ajax({
        type: "Put",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        url: "http://localhost:8081/users/update/" + id,
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            alert("Cập nhật thành công");
            location.href = "user_information.html";
        },
        error: function (err) {
            alert("error")
            console.log(err)
        }
    })
}