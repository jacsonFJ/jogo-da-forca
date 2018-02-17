module.exports = (mongoose) => {
    return {
        palavra: require('../schema/palavra-schema')(mongoose),

        listar: function(req, res){
            this.palavra.find((erro, palavras) => {
                if(erro){
                    res.json({msg: 'Erro no banco de dados: '+erro, status: false});
                }
                res.json({status: true, palavras: palavras});
            });
        },

        novo: function(req, res){
            let palavra = new this.palavra();
            palavra.palavra = req.body.palavra
            palavra.letras = req.body.letras;
            palavra.dicas = req.body.dicas;
            
            palavra.save((erro) => {
                if(erro){
                    res.json({msg: 'Erro ao tentar salvar a Palavra....: ' + erro, status: false});
                }
                res.json({ msg: 'Palavra Cadastrado com Sucesso!', status: true });
            });
        },

        abrir: function(req, res){
            this.palavra.findById(req.params.id, (erro, palavra) => {
                if(erro){
                    res.json({msg: 'Erro no banco de dados: '+erro, status: false});
                }
                res.json({status: true, palavra: palavra});
            });
        }
    };
};