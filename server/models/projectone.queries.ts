const projectOneQueries = {
    GetProjectList: 'SELECT * FROM projectone.projects;',
    AddProject: 'INSERT INTO projectone.projects (title, descn, effort) VALUES (?,?,?);',
};

module.exports = { projectOneQueries };