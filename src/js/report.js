    // updat section info
    let infor = ''

    function config_report(section, data) {
        infor += `<th> ${section} </th>`

        for (const item in data) {
            let property = item
            let val = data[item]
            section == 'memory' ? val = formatBytes(data[item]) : ''
            infor += `
                <tr>
                <td>${property} </td>
                <td>${val} </td>
                </tr>
               
              
               `
        }

    }


    function build_report() {

        config_report('os', alldata.os)
        config_report('system', alldata.system)
        config_report('baseboard', alldata.baseboard)
        config_report('bios', alldata.bios)
        config_report('cpu', alldata.cpu)
        config_report('memory', alldata.mem)
        let gpu = alldata.graphics.controllers
        for (const key in gpu) {
            config_report(`gpu ${key}`, gpu[key])
        }
        let hard = alldata.hard
        for (const key in hard) {
            config_report(`HHD ${key}`, hard[key])
        }





    }

    function download(params) {
        let chack = confirm('Download PC Report ??')
        if (chack) {

            build_report()
            const filename = 'pc_report.html';
            const jsonStr = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>report</title>
            <style>
            :root {
                --pra: #21325E;
                --pra1: #151b2c;
                --sec: #334283;
                --acc: #ffe965;
                --wit: #f0f0f0b8;
                --black: #080d1a;
            }
            body{
                background-color:var(--pra1);
                color: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100vw;
                height: 100vh;
                overflow: hidden;  
            }
            ::-webkit-scrollbar-track
            {
                -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
                background-color: #F5F5F5;
            }
            ::-webkit-scrollbar
            {
                width: 10px;
                background-color: #F5F5F5;
            }
            ::-webkit-scrollbar-thumb
            {
                background-color: #F90;	
                background-image: -webkit-linear-gradient(45deg,
                                                          rgba(255, 255, 255, .2) 25%,
                                                          transparent 25%,
                                                          transparent 50%,
                                                          rgba(255, 255, 255, .2) 50%,
                                                          rgba(255, 255, 255, .2) 75%,
                                                          transparent 75%,
                                                          transparent)
            }
    
            .table {
                flex: .9;
                display: flex;
                overflow: scroll;
        overflow-x: hidden;
            }
            .table tbody {
                display: flex;
                flex-direction: column;
              
                align-items: center;
                flex: 1;
            }
            h2{
                letter-spacing: 2px; 
            }
            
            .table td:first-child {
                color: var(--wit);
                flex: 1;
                font-family: 'se';
                font-size: 15px;
                padding: 0 1em;
                /* border-right: 1px solid; */
                text-align: center;
                letter-spacing: 3px;
            }
            .table th{
                margin: 1em;
                font-size: 1.2em;
                color: var(--acc);
                border: 2px solid;
                padding: 0.4mm 0.7em;
                border-radius: 10px;
                line-height: 2;
                width: 20%;
                font-family: system-ui;
            }
            
            td:nth-child(2) {
                flex: 1;
                font-family: 'se';
                font-size: 15px;
                padding: 0 1em;
                color: var(--acc);
                text-align: center;
                letter-spacing: 1px;
            }
            
            td {
                flex: 1;
                font-family: 'se';
                font-size: 15px;
                padding: 0 1em;
                color: var(--acc);
                text-align: center;
                letter-spacing: 1px;
                max-width: 50%;
            }
         
            
            .table tr {
                flex: 1;
                display: flex;
                width: 100%;
                text-align: center;
                border-bottom: 1px solid var(--black);
                padding: 5px;
            }
            
            </style>
        </head>
        <body>
        <h2> PC-REPORT </h2>
        <table class="table">
    
        <tbody class="t_body" id="item_table">
       
    ${infor}
        </tbody>
        </table>
        </body>
        </html>`

            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        } else {
            console.log("not download");
        }
    }