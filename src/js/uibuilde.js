// ======================================================info
const { ipcRenderer } = require("electron");
let user = localStorage.getItem('user')
let alldata //data from server or localStorage

const stage = {
    start: 'Start Scan pc ...',
    getdata: 'Get Information From Drives ...',
    end: 'Your PC Scan IS completed successfully !',
    error: 'An Error Occurred, Please Restart The Application '
}
let state = false //true if resve data

// get user name and update ui
ipcRenderer.on('user', (ev, data) => {
    if (data) {
        localStorage.removeItem("user")
        localStorage.setItem('user', data)

    }


})


$('.welcom_name').append((` Wellcome <b>${user== null ? "..": user} </b>.`).toUpperCase())


// get scan pc information 
ipcRenderer.send('main')
$('.welcom_text').text(stage.start) //app state is start
setTimeout(() => {
    if ($('.welcom_text').text() !== stage.end) {
        $('.welcom_text').text(stage.getdata)
    } //app state get data  
}, 3000);
// resave pc information and set data in localstorag var =alldata
ipcRenderer.on('main_re', (ev, data) => {
        try {

            if (data && data !== undefined && data !== null) {

                localStorage.removeItem("data")
                let data_from_nod = JSON.stringify({...data })
                localStorage.setItem('data', data_from_nod)
                alldata = data
                state = true // set true if getdata
                $('.welcom_text').text(stage.end) //app end get data  
                $('.welcom_text').css('animation-play-state', 'paused')

            } else {

                alldata = JSON.parse(localStorage.getItem('data'))
                state = true
                $('.welcom_text').text(stage.end) //app end get data  
                $('.welcom_text').css('animation-play-state', 'paused')
            }

        } catch (error) {

            $('.welcom_text').text(stage.error)

        }
        setTimeout(() => {
            ui_builder(alldata)
        }, 2000); //start builde ui
    })
    //config ui data with info and update progress stage
const ui_config = {
    update_m_bar: () => {

        var width = 2;
        if (state == false) {
            const incresse = setInterval(scene, 800);



            function scene() {

                if (width / 100 == 1.0) {
                    $('.welcom_text').text(stage.error)
                    $('.welcom_text').append('<p style="text-align: center;">  try get data agein</p>');
                    setTimeout(() => {
                        alldata = JSON.parse(localStorage.getItem('data'))
                        state = true // set true if getdata
                        ui_builder(alldata)
                    }, 3000);
                    width = 1
                } else {
                    if (state == true) {
                        clearInterval(incresse)
                        main_bar.animate(1)
                        $('.welcom_text').text(stage.end)
                        $('.welcom_text').css('animation-play-state', 'paused')
                    } else {
                        width++
                        main_bar.animate(width / 100)
                    }

                }

            }
        }
    },

    updet_hard_load: (data) => {
        let ssd = data[0]
        let available = formatBytes(ssd.available)
        let size = formatBytes(ssd.size)

        let used = formatBytes(ssd.used)
        $('.name').text(`Drive ${ssd.fs}`)
        $('.h_size').text(`size ${size} `)
        $('.h_av').text(`available ${available}`)
        $('.h_us').text(`used ${used}`)
        data.forEach(el => {

            $('#hard_table').append(` <h1>${el['fs'] } drive</h1>`)
            for (const key in el) {
                let val = el[key]

                if (Object.hasOwnProperty.call(el, key) && key !== "fs") {
                    typeof(val) == 'number' ? val = formatBytes(el[key]): val

                    $('#hard_table').append(` <tr>
                    <td>${key.toUpperCase()} </td>
                    <td>${val} </td>
                    </tr>
                    `)


                }
            }
        });

        let use = ssd.use / 100
        hard_bar.animate(use)
    },


    updet_cpu_load: (data, cpu) => {
        let all = data.cpus.length
        let load = data.currentLoad.toFixed(1)
        let free = data.currentLoadIdle.toFixed(1)

        $('.c_size').text(`cpus ${all} `)
        $('.c_us').text(` load ${load} %`)
        $('.c_av').text(`available ${free} %`)


        cpu_bar.animate(load / 100)



        for (const key in cpu) {
            $('#cpu_table').append(` <tr>
            <td>${key.toUpperCase()} </td>
            <td>${key == 'cache' ? "caches":cpu[key]} </td>
            </tr>
            `)
            if (key == 'cache') {
                for (const key in cpu.cache) {
                    $('#cpu_table').append(` <tr>
            <td>${key.toUpperCase()} </td>
            <td>${cpu.cache[key]} </td>
            </tr>
            `)
                }

            }
        }

    },

    updet_ram_load: (data) => {
        let load = formatBytes(data.used)
        let free = formatBytes(data.free)
        let size = formatBytes(data.total)
        let act = formatBytes(data.active)


        $('.r_si').text(` size ${size}`)
        $('.r_us').text(` load ${load}`)
        $('.r_av').text(` available ${free}`)
        let active = act.split(" ")[0] / 10
        ram_bar.animate(active.toFixed(1) / 1)
        for (const key in data) {
            if (data[key]) {
                $('#ram_table').append(` <tr>
            <td>${key.toUpperCase()} </td>
            <td>${formatBytes(data[key])} </td>
            </tr>
            `)
            }
        }
    },

    updet_pc_load: (data) => {
        let pc_info = data



        $('.g_si').text(`  ${pc_info.manufacturer}`)
        $('.g_us').text(` ${pc_info.model}`)
        $('.g_av').text(`  ${pc_info.serial}`)



        pc_bar.animate(1)
        for (const key in data) {
            if (data[key]) {
                $('#os_table').append(` <tr>
            <td>${key.toUpperCase()} </td>
            <td>${data[key]} </td>
            </tr>
            `)
            }
        }
    }
}

main_bar.animate(0.01) //start progress bar

ui_config.update_m_bar()

//builde ui 
function ui_builder(data) {

    ui_config.updet_hard_load(data.fsSize)
    ui_config.updet_cpu_load(data.currentLoad, data.cpu)
    ui_config.updet_ram_load(data.mem)
    ui_config.updet_pc_load(data.system)


}