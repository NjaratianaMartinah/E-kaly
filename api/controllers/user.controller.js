const users = [
    {email: "njara@gmail.com",  password: "123456"},
    {email: "toavina@gmail.com", password: "123456"},
    {email: "zo@gmail.com", password: "123456"}
]

module.exports = {
    login: (req, res) => res.json({token: 'TOKEN'}),
    findAll: (req, res) => res.json(users)
}