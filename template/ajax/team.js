let myRadarChart
function displayPlayer() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8081/api/player-primary-teams",
        success: function (data) {
            let content = ``;
            for (let i = 0; i < data.content.length; i++) {
                onePlayer(i)
                content += `<div class="position">
                        <a onclick="onePlayer(${data.content[i].id})" title=""><span class="${data.content[i].position.name}">${data.content[i].position.name}</span> ${data.content[i].shirtNumber}. ${data.content[i].name}</a></div>`
            }
            document.getElementById("primary-nav").innerHTML = content;
        }
    })
}

function displaySecondaryPlayer() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8081/api/player-secondary-teams",
        success: function (data) {
            let content = ``;
            for (let i = 0; i < data.content.length; i++) {
                onePlayer(i)
                content += `<div class="position">
                        <a onclick="onePlayer(${data.content[i].id})" title=""><span class="${data.content[i].position.name}">${data.content[i].position.name}</span> ${data.content[i].shirtNumber}. ${data.content[i].name}</a></div>`
            }
            document.getElementById("secondary-nav").innerHTML = content;
        }
    })
}

function resultBmi(bmi) {
    let result = "";
    if (bmi < 18.5) {
        result = "Underweight"
    }
    if (18.5 <= bmi <= 24.9) {
        result = "Normal"
    }
    if (25.0 <= bmi <= 29.9) {
        result = "overweight"
    } else {
        result = "fat"
    }
    return result;
}

function onePlayer(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8081/api/players/" + id,
        success: function (data) {
            $.ajax({
                url: "http://localhost:8081/api/salaries?id1=" + id + "&id2=" + 1,
                success: function (data1) {

                    let bmi = `${data.weight / (data.height * data.height)}`
                    let result = resultBmi(bmi)
                    let content = `<div class="item">
<!--                     ảnh cầu thủ-->
                    <div class="teams-image">
                      <img src="${data.img}" alt="" class="img-responsive" />
                      <div><canvas id="myChart" style="width: 350px;height: 350px"></canvas></div>
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
                      <p><span class="title">SALARYBORNUS : </span>${data1.workingHours * data1.capacitySalary}</p>
                      <p class="font-normal">Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis.</p>
                    </div>
                  </div>`;
                    document.getElementById("show-one").innerHTML = content;
                    document.getElementById("show-tow").innerHTML = content;

                }
            })
            indexPlayer(id)

        }
    })

}

function indexPlayer(id) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8081/api/index?id=" + id,
        success: function (index) {
            console.log("index")
            console.log(index)
            let ctx = document.getElementById('myChart');
            // if (myRadarChart != undefined){
            //     myRadarChart.destroy();
            // }
             myRadarChart = new Chart(ctx, {
                type: 'radar',
                options: {
                    scale: {

                        pointLabels: {
                            fontColor: 'red'
                        },
                        ticks: {
                            beginAtZero: true
                        },
                        backgroundColor: 'rgba(243,243,246,0.96)',
                    }
                },
                data: {
                    labels: ['acceleration', 'shotPower', 'pass', 'dribbling', 'marking', 'physical'],
                    datasets: [{
                        label: 'indexPlayer',
                        // data: [index.acceleration,index.shotPower, index.pass, index.dribbling,index.marking,index.phisical],
                        // data: [90, 85, 50, 70, 80],
                        data: [index.indexPlayer.acceleration, index.indexPlayer.shotPower, index.indexPlayer.pass, index.indexPlayer.dribbling, index.indexPlayer.marking,index.indexPlayer.physical],
                        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                        borderWidth: 1,
                        pointRadius: [5, 5, 5, 5, 5]
                    }]
                }
            });
        }
    })
}
function showSumSalary(id){
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url:"http://localhost:8081/api/one-week-by-salaries?id=" + id,
        success: function (salary){
            let name =[];
            let sumSalary =[];
            for (let i = 0; i <salary.length ; i++) {
                name.push(salary[i].player.name)
                let sum=salary[i].hardSalary+salary[i].salaryBonus+(salary[i].capacitySalary*salary[i].workingHours)
                sumSalary.push(sum)

                // "hardSalary": 10000.0,
                //     "salaryBonus": 500.0,
                //     "workingHours": 40,
                //     "capacitySalary": 200.0
            }
            console.log(name)
            let ctx = document.getElementById('barChart');

            let data = {
                labels: name,
                // labels: ["week1","week1","week1","week1","week1","week1","week1","week1","week1","week1","week1",],
                datasets: [{
                    label: 'Salary',
                    data: sumSalary,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            let options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };

            let barChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        }
    })
}
window.onLoad(showSumSalary(2))
