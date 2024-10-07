/** @module projectone-queries
 *  @description Contains the CRUD queries for project list items.
 */
const projectOneQueries = {
    GetProjectList: 'SELECT * FROM projectone.projects;',
    AddProject: 'INSERT INTO projectone.projects (title, descn, effort, file) VALUES (?,?,?,?);',
    DeleteProjects: 'DELETE FROM projectone.projects WHERE projectone.projects.pid IN (?);',
    UpdateProject: 'UPDATE projectone.projects SET projectone.projects.title = ?, projectone.projects.descn = ?, projectone.projects.effort = ?, projectone.projects.file = ? WHERE projectone.projects.pid = ?;',
};

export { projectOneQueries };