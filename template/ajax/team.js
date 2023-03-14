    function displayPlayer(){
        $.ajax({
            // headers: {
            //     Authorization: "Bearer " + sessionStorage.getItem("token"),
            // },
            type: "GET",
            url: "http://localhost:8080/api/players",
            success : function (data){
                let content = ``;
                for (let i = 0; i < data.content.length; i++){
                    content += `<div class="position">
                        <a onload="onePlayer(${data.content.id}})" title=""><span class="${data.content[i].position.name}">${data.content[i].position.name}</span> ${data.content[i].shirtNumber}. ${data.content[i].name}</a>
                      </div>`;
                }
                document.getElementById("primary-nav").innerHTML = content;
            }
        })
    }
    function onePlayer(id) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/players/" + id,
            success : function (data){
                         let content = `<div class="item">
                        <div class="teams-image">
                          <img src="images/Gabriel%20Jesus.jpg" alt="" class="img-responsive" />
                        </div>
                        <div class="teams-description" id="one_player">
                          <p><span class="title">NATIONAL : </span>${data.address}</p>
                          <p><span class="title">DATE OF BIRTH : </span>${data.date}</p>
                          <p><span class="title">HEIGHT : </span>${data.height} cm</p>
                          <p><span class="title">WEIGHT : </span>${data.weight} kg</p>
                          <p><span class="title">POSITION : </span>${data.position.name}</p>
                          <p><span class="title">PLAYED : </span>180</p>
                          <p><span class="title">GOAL : </span>25</p>
                          <p><span class="title">RED CARDS : </span>3</p>
                          <p><span class="title">YELLOW CARDS : </span>10</p>
                          <p><span class="title">INFORMATION </span></p>
                          <p class="font-normal">Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis.</p>
                        </div>
                      </div>`
                document.getElementById("primary-team-caro").innerHTML=content;
            }
        })

    }