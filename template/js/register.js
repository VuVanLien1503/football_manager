let imgInp = document.getElementById("avatar");
let blah = document.getElementById("blah");

function showAvatar() {
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
            alert("Đăng ký thành công");
            location.href = "../index.html";
        },
        error: function (err) {
            alert("Tài khoản đã tồn tại")
            console.log(err)
        }
    })
}