const si = require('systeminformation');
module.exports.getdata = async function() {
    let all = []

    await si.bios().then(data => {
        all['bios'] = data
    }).catch(error => console.error(error));


    await si.baseboard().then(data => {
        all['baseboard'] = data
    }).catch(error => console.error(error));

    await si.cpu().then(data => {
        all['cpu'] = data
    }).catch(error => console.error(error));
    await si.currentLoad().then(data => {
        all['currentLoad'] = data
    }).catch(error => console.error(error));
    await si.fullLoad().then(data => {
        all['fullLoad'] = data
    }).catch(error => console.error(error));
    await si.mem().then(data => {
        all['mem'] = data
    }).catch(error => console.error(error));
    await si.diskLayout().then(data => {
        all['hard'] = data
    }).catch(error => console.error(error));
    await si.fsSize().then(data => {
        all['fsSize'] = data
    }).catch(error => console.error(error));

    await si.graphics().then(data => {
        all['graphics'] = data
    }).catch(error => console.error(error));
    await si.battery().then(data => {
        all['battery'] = data
    }).catch(error => console.error(error));
    await si.versions().then(data => {
        all['versions'] = data
    }).catch(error => console.error(error));
    await si.processes().then(data => {
        all['processes'] = data
    }).catch(error => console.error(error));
    await si.system().then(data => {
        all['system'] = data

    }).catch(error => console.error(error));
    await si.networkInterfaces().then(data => {
        all['net'] = data

    }).catch(error => console.error(error));
    await si.osInfo().then(data => {

        all['os'] = data

    }).catch(error => console.error(error));


    return all
}