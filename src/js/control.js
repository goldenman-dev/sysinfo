// control left bar click event 
$('.left-bar ul li').on('click', (ev) => {
    let btnid = ev.currentTarget.id
    if ($('.left-bar').hasClass('active')) {
        $.map($("li"), function(el, indexOrKey) {
            if (el.id == btnid) {
                let elnow = $(el)[0].childNodes[3]
                $('.left-bar h2').remove()
                $('.left-bar').removeClass('active')
                $(elnow).removeClass('active')
                $('#item_table').empty()
                $(el).show()

            } else {
                $(el).show()
            };
        });
    } else {

        $.map($("li"), function(el, indexOrKey) {
            if (el.id == btnid) {
                let elnow = $(el)[0].childNodes[3]
                $('.left-bar').addClass('active')
                $(elnow).addClass('active')
                config_left_bar(el.id) //call manu builde function
                $(el).show()

            } else {

                $(el).hide()

            };
        });
    }


})





//bulide manu items with data

function config_left_bar(id) {

    let sec_name = id
    let sec_data = alldata[id]
    switch (sec_name) {
        case 'hard':
            build_diskLayout(sec_name, sec_data)
            break;
        case 'graphics':
            build_graphics(sec_name, sec_data)
            break;
        case 'processes':
            build_processes(sec_name, sec_data)
            break;
        case 'net':
            build_net(sec_name, sec_data)
            break;

        default:
            builde_sec(sec_name, sec_data)
            break;
    }



}

function builde_sec(name, data) {


    $('#item_table').empty()
    $('.left-bar').append(`<h2>${name.toUpperCase() } INFORMATION</h2>`)
    for (const key in data) {
        if (data[key]) {

            $('#item_table').append(` <tr>
           <td>${key.toUpperCase()} </td>
           <td>${ data[key]} </td>
           </tr>
           `)

        }
    }
}

function build_diskLayout(sec_name, sec_data) {

    $('#item_table').empty()
    $('.left-bar').append(`<h2>${sec_name.toUpperCase() } INFORMATION</h2>`)
    data = sec_data['0']

    for (const key in data) {

        $('#item_table').append(`
                    <tr>
                    <td>${key.toUpperCase()} </td>
                    <td>${data[key]} </td>
                    </tr>
                    `)
    }
}

function build_graphics(sec_name, sec_data) {

    $('#item_table').empty()

    $('.left-bar').append(`<h2>${sec_name.toUpperCase() } INFORMATION</h2>`)
    for (const property in sec_data) {
        if (Object.hasOwnProperty.call(sec_data, property)) {
            const el = sec_data[property];
            $('#item_table').append(`
            <h1>${property.toUpperCase()}</h1>
            `)
            for (const key in el) {
                if (el[key]) {
                    property !== "displays" ? $('#item_table').append(`<h3>card ${parseInt(key) + 1} </h3>`) : ''
                    for (const it in el[key]) {
                        $('#item_table').append(`
                                               <tr><td>${it.toUpperCase()} </td>
                                               <td>${el[key][it]} </td>
                                               </tr>
                                               `)
                    }
                }

            }
        }
    }
}

function build_processes(sec_name, sec_data) {

    $('#item_table').empty()
    $('.left-bar').append(`<h2>${sec_name.toUpperCase() } INFORMATION</h2>`)
    for (const property in sec_data) {
        if (Object.hasOwnProperty.call(sec_data, property)) {
            if (property == 'all') {
                $('#item_table').append(`
                                <h1>${property.toUpperCase()} = ${sec_data[property]}</h1>
                                `)
                $('#item_table').append(`
                                    <tr><td><h3>name</h3></td>
                                    <td><h3>pid</h3></td>
                                    <td><h3>parentPid</h3></td>
                                    <td><h3>priority</h3></td>
                                    </tr>
                                `)

                for (const key in sec_data['list']) {



                    $('#item_table').append(`
                
                                            <tr><td>${sec_data['list'][key]['name']}</td>
                                            <td>${sec_data['list'][key]['pid']}</td>
                                            <td>${sec_data['list'][key]['parentPid']}</td>
                                            <td>${sec_data['list'][key]['priority']}</td>
                                            </tr>
                                            `)

                }

            }

        }
    }

}

function build_net(sec_name, sec_data) {
    $('#item_table').empty()

    $('.left-bar').append(`<h2>${sec_name.toUpperCase() } INFORMATION</h2>`)
    for (const property in sec_data) {
        $('#item_table').append(`
                    <h1>${sec_data[property]['iface']}</h1>
                    `)
        for (const key in sec_data[property]) {
            if (sec_data[property][key]) {
                $('#item_table').append(`
                            <tr><td>${key.toUpperCase()} </td>
                            <td>${sec_data[property][key]} </td>
                            </tr>
                            `)
            }

        }
    }
}

// model control 
let model = (ev) => {


        let item = ev.currentTarget
        $(`#${item.id}`).addClass('test')
        $(`#${item.id} table`).addClass('ac')
        $(`#${item.id} table`).removeClass('hide')
        $(ev.currentTarget.childNodes[5]).addClass('hide')

        $(item.childNodes[1]).removeClass('hide')
        $('.info_item').off('click', model)
    }
    // get click event  
$('.info_item').on('click', model)

//exit  click event  
$('.exit_m').on('click', (ev) => {
    ev.stopPropagation();
    let parent = ev.currentTarget.parentNode.parentElement
    let bar = ev.currentTarget.parentElement

    $(parent).removeClass('test')
    $(parent).find("table").removeClass('ac')
    $(parent).find("table").addClass('hide')
    $(bar).addClass('hide')
    $(parent.childNodes[5]).removeClass('hide')
    $('.info_item').on('click', model)
})
$(".app_min").on('click', (ev) => {
    ipcRenderer.send("min")
})
$(".app_exit").on('click', (ev) => {
    ipcRenderer.send("exit")
})
$(".app_down").on('click', (ev) => {
    download()
})