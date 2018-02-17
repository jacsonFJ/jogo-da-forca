module.exports = (mongoose) => {
    var PalavraSchema = mongoose.Schema({
        palavra: String,
        letras: Array,
        dicas: Array
    });
    return mongoose.model('Palavra', PalavraSchema);
};