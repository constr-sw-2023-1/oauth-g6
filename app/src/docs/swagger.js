/**
 * @swagger
 * /login:
 *   post:
 *     description: Realiza login na API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Retorna os dados do token de acesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token_type:
 *                   type: string
 *                 access_token:
 *                   type: string
 *                 expires_in:
 *                   type: number
 *                 refresh_token:
 *                   type: string
 *                 referesh_expires_in:
 *                   type: number
 *       401:
 *         description: Usuário ou senha inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário do servidor Keycloak pelo seu ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID do usuário.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Update the user with the given ID in the realm.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: User object that needs to be updated.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/users/{id}/reset-password:
 *   put:
 *     summary: Reset user's password by ID.
 *     description: Reset the password for a specific user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to reset the password.
 *         schema:
 *           type: string
 *       - in: body
 *         name: password
 *         required: true
 *         description: New password to be set.
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Password successfully reset.
 *       '400':
 *         description: Bad Request. Invalid password format.
 *       '401':
 *         description: Unauthorized. User must be authenticated and authorized.
 *       '404':
 *         description: Not Found. User with ID not found.
 *       '500':
 *         description: Internal Server Error. An error occurred while processing the request.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user by ID.
 *     description: Deletes a user from the Keycloak server by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna uma lista de usuários do servidor Keycloak.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *       500:
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 *
 * /createUser:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Cria um novo usuário no Keycloak.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Objeto com as informações do usuário a ser criado.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             createdTimestamp:
 *               type: number
 *             username:
 *               type: string
 *             enabled:
 *               type: boolean
 *             totp:
 *               type: boolean
 *             emailVerified:
 *               type: boolean
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             disableableCredentialTypes:
 *               type: array
 *               items:
 *                 type: string
 *             requiredActions:
 *               type: array
 *               items:
 *                 type: string
 *             notBefore:
 *               type: number
 *             access:
 *               type: object
 *               properties:
 *                 manageGroupMembership:
 *                   type: boolean
 *                 view:
 *                   type: boolean
 *                 mapRoles:
 *                   type: boolean
 *                 impersonate:
 *                   type: boolean
 *                 manage:
 *                   type: boolean
 *             realmRoles:
 *               type: array
 *               items:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *         schema:
 *           type: object
 *           properties:
 *             createdTimestamp:
 *               type: number
 *             username:
 *               type: string
 *             enabled:
 *               type: boolean
 *             totp:
 *               type: boolean
 *             emailVerified:
 *               type: boolean
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             disableableCredentialTypes:
 *               type: array
 *               items:
 *                 type: string
 *             requiredActions:
 *               type: array
 *               items:
 *                 type: string
 *             notBefore:
 *               type: number
 *             access:
 *               type: object
 *               properties:
 *                 manageGroupMembership:
 *                   type: boolean
 *                 view:
 *                   type: boolean
 *                 mapRoles:
 *                   type: boolean
 *                 impersonate:
 *                   type: boolean
 *                 manage:
 *                   type: boolean
 *             realmRoles:
 *               type: array
 *               items:
 *                 type: string
 *       400:
 *         description: Erro ao criar usuário.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: Erro interno do servidor.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */
