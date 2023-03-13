function displayPlayer(page){
    $ajax({
        // headers: {
        //     Authorization: "Bearer " + sessionStorage.getItem("token"),
        // },
        type: "GET",
        url: "http://localhost:8080/api/players",
        success : function (data){
            let content = ``;
            for (let i = 0; i < data.content.length; i++){
                content += `<div class="position">
                    <a title=""><span class="cb">${data.content[i].position.name}</span> ${data.content[i].shirt_number}. ${data.content[i].name}/a>
                  </div>`;
            }
            document.getElementById("primary-nav").innerHTML = content;
        }
    })
}