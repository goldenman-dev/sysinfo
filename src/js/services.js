var ProgressBar = require('progressbar.js');

// bit converter function
window.formatBytes = function(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

//  =============progress init===================
const config_main = {
    color: '#aaa',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    text: {
        autoStyleContainer: false
    },
    from: { color: ' #151b2c', width: 1 },
    to: { color: '#edd43e', width: 4 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
            circle.setText('');
        } else {
            circle.setText(value);
        }

    }
}
const config = {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#edd43e',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' }
}
window.main_bar = new ProgressBar.Circle(welcom_progress, config_main);
window.hard_bar = new ProgressBar.Circle(drive_pro, config);
window.cpu_bar = new ProgressBar.Circle(cpu_load, config);
window.ram_bar = new ProgressBar.Circle(ram_load, config);
window.pc_bar = new ProgressBar.Circle(pc_load, config);