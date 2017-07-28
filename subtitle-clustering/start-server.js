const args = ['start','D:\\VM\\subtitles_source\\opensubtitles\\test','D:\\VM\\pdae-repo-python'];
const opts = {
    stdio: 'inherit',
    cwd: 'server',
    shell: true
};
require('child_process').spawn('npm', args, opts);