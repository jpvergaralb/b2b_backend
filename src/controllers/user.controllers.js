export const getUsers = async (req, res) => {
  res.send("This will fetch all users")
}

export const getUser = async (req, res) => {
  res.send(
    {"response": `This corresponds to user ${req.params.id}`}
    )
}

export const postUser = async (req, res) => {
  res.send(`Creating user`)
}

export const updateUser = async (req, res) => {
  res.send(`Updating user ${req.params.id}`)
}

export const deleteUser = async (req, res) => {
  res.send(`Deleting user ${req.params.id}`)
}

