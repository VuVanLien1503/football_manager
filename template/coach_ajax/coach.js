    displayTypicalCoach()
    function displayTypicalCoach(){
        $.ajax({
            url : "http://localhost:8081/coaches/typical",
            type: "GET",
            success(data){
                let context = ""
                for (let i = 0; i < data.length; i++) {
                    context += `<div class="col-sm-12 col-md-4">
                                    <div class="coach-item">
                                      <div class="gambar">
                                        <img src="${data[i].imagePath}" style="width: 500px; height: 500px" alt="Coach" class="img-responsive">
                                      </div>
                                      <div class="item-body">
                                        <div class="name">
                                          ${data[i].name}
                                        </div>
                                        <div class="position">
                                          ${data[i].position.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
                }
                document.getElementById("typicalCoach").innerHTML = context;

            }
        })
    }
    function displayTypicalCoachAdmin(){
        $.ajax({
            url : "http://localhost:8081/admin/coaches/typical",
            type: "GET",
            success(data){
                let context = ""
                for (let i = 0; i < data.length; i++) {
                    context += `<div class="col-sm-12 col-md-4">
                                    <div class="coach-item">
                                      <div class="gambar">
                                        <img src="${data[i].imagePath}" style="width: 500px; height: 500px" alt="Coach" class="img-responsive">
                                      </div>
                                      <div class="item-body">
                                        <div class="name">
                                          ${data[i].name}
                                        </div>
                                        <div class="position">
                                          ${data[i].position.name}
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
                }
                document.getElementById("typicalCoach").innerHTML = context;
            }
        })
    }

    function displayAllCoach(){
        $.ajax({
            url : "http://localhost:8081/coaches",
            type : "GET",
            success(data){

            }
        })
    }
    function  displayTableCoach(data){

    let context = `<div class="container">
            <h2 style="text-align: center">List Coach</h2>
            <table class="table table-striped-columns">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th></th>
                    <th colspan="2" style="text-align: center">Action</th>
                </tr>
                </thead>
                <tbody>`
    }