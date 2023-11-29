var User = require("../models/User")
var PasswordToken = require("../models/PasswordToken")

class UserController{

    async index(req, res){
        var users = await User.findAll();
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        } else {
            res.status(200);
            res.json(user);
        }
    }

    async create(req, res){
        var { email, name, password } = req.body;

        if(email == undefined){
            res.status(400);
            res.json({ error: "O e-mail não foi definido!"})
            return;
        }

        var emailExists = await User.findEmail(email);;

        if(emailExists){
            res.status(406);
            res.json({ error: "O e-mail já está cadastrado."});
            return;
        }

        await User.newUser(email, password, name);

        res.status(200);
        res.send("Usuário cadastrado!")
    }

    async edit(req, res){
        var {id, email, nome, role} = req.body;
        var result = await User.update(id, email, nome, role);

        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Editado com sucesso!")
            } else {
                res.status(406);
                res.send(result.error);
            }
        } else {
            res.status(406);
            res.send("Erro no servidor!");
        }
    }

    async delete(req, res){
        var id = req.params.id;
        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Excluído com sucesso!");
        } else {
            res.status(406);
            res.send(result.error);
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email;
        var result = await PasswordToken.create(email);

        if(result.status){
            res.status(200);
            res.send("" + result.token);
        } else {
            res.status(406);
            res.send(result.error);
        }
    }
}

module.exports = new UserController();