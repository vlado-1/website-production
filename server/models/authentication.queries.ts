const AuthenticationQueries = {
    CheckAccount: 'SELECT * FROM projectone.accounts WHERE accounts.uid = ?;',
};

export { AuthenticationQueries };