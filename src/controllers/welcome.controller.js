const getWelcome = (req, res) => {
    res.status(200).send('Welcome to my API!')
}

module.exports = {
    getWelcome
}