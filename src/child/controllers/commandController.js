const { exec } = require('child_process');

exports.executeCommand = (req, res) => {
    const command = req.query.cmd || 'dir'; 

    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.render('result', { output: `Помилка: ${error ? error.message : stderr}`, command });
        }
        res.render('result', { output: stdout, command });
    });
};
