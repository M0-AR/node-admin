
# To start the application run 'npm start'
# To create fake role's data 'npm run roles:seed'

# To remove the data from those tables 
`SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE `node_admin`.`role_permissions`;
TRUNCATE `node_admin`.`permission`;
TRUNCATE `node_admin`.`role`;

SET FOREIGN_KEY_CHECKS = 1;`