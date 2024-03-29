const projectOneQueries = {
    GetProjectList: 'SELECT * FROM projectone.projects;',
    AddProject: 'INSERT INTO projectone.projects (title, descn, effort) VALUES (?,?,?);',
    DeleteProject: 'DELETE FROM projectone.projects WHERE projectone.projects.id = ?;',
};

module.exports = { projectOneQueries };