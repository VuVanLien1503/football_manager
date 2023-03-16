    function displayPlayer(){
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            type: "GET",
            url: "http://localhost:8081/api/player-primary-teams",
            success : function (data){
                console.log(data)
                let content = ``;
                for (let i = 0; i < data.content.length; i++){
                    content += `<div class="position">
                        <a onclick="onePlayer(${data.content[i].id})" title=""><span class="${data.content[i].position.name}">${data.content[i].position.name}</span> ${data.content[i].shirtNumber}. ${data.content[i].name}</a></div>`
                }
                document.getElementById("primary-nav").innerHTML = content;
            }
        })
    }
    function displaySecondaryPlayer(){
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            type: "GET",
            url: "http://localhost:8081/api/player-secondary-teams",
            success : function (data){
                let content = ``;
                for (let i = 0; i < data.content.length; i++){
                    content += `<div class="position">
                        <a onclick="onePlayer(${data.content[i].id})" title=""><span class="${data.content[i].position.name}">${data.content[i].position.name}</span> ${data.content[i].shirtNumber}. ${data.content[i].name}</a></div>`
                }
                document.getElementById("secondary-nav").innerHTML = content;
            }
        })
    }
    function resultBmi(bmi) {
    let result = "";
    if (bmi<18.5){
        result = "Underweight"
    }if (18.5<=bmi<=24.9){
        result = "Normal"
        }if (25.0<=bmi<=29.9){
        result = "overweight"
        }else {
        result = "fat"
        } return result;
    }
    function onePlayer(id) {
   //  console.log("cmm")
   // console.log( salaryPlayer(id,1))
        $.ajax({
            type: "GET",
            url: "http://localhost:8081/api/players/" + id,
            // url:"http://localhost:8081/api/salaries?id1="+id +"&id2="+1,
            success : function (data){
                $.ajax({
                    url:"http://localhost:8081/api/salaries?id1="+id+"&id2="+1,
                    success:function (data1){

                        let bmi = `${data.weight/(data.height*data.height)}`
                        let result = resultBmi(bmi)
                        let content =`<div class="item">
<!--                     ảnh cầu thủ-->
                    <div class="teams-image">
                      <img src="${data.img}" alt="" class="img-responsive" />
                    </div>
<!--                    Thông tin cầu thủ-->
                    <div class="teams-description">
                      <p><span class="title">NATIONAL : </span>${data.address}</p>
                      <p><span class="title">DATE OF BIRTH : </span>${data.date}</p>
                      <p><span class="title">HEIGHT : </span>${data.height} M</p>
                      <p><span class="title">WEIGHT : </span>${data.weight} Kg</p>
                      <p><span class="title">POSITION : </span>${data.position.name}</p>
                      <p><span class="title">BMI : </span>${result}</p>
                      <p><span class="title">HARDSALARY : </span>${data1.hardSalary}</p>
                      <p><span class="title">SALARYBORNUS : </span>${data1.salaryBonus}</p>
                      <p><span class="title">SALARYBORNUS : </span>${data1.workingHours}</p>
                      <p><span class="title">SALARYBORNUS : </span>${data1.workingHours*data1.capacitySalary}</p>
                      <p class="font-normal">Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis.</p>
                    </div>
                  </div>`;
                        document.getElementById("show-one").innerHTML=content;
                        document.getElementById("show-tow").innerHTML=content;
                    }
                })

            }
                })

    }
