const projectOneQueries = {
    GetProjectList: 'SELECT * FROM projectone.projects;',
    AddProject: 'INSERT INTO projectone.projects (title, descn, effort) VALUES (?,?,?);',
    DeleteProjects: 'DELETE FROM projectone.projects WHERE projectone.projects.pid IN (?);',
};

module.exports = { projectOneQueries };