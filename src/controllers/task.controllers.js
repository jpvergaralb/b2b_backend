export const getTasks = async (req, res) => {
  res.send("This will fetch all tasks")
}

export const getTask = async (req, res) => {
  res.send(`This corresponds to task ${req.params.id}`)
}

export const postTask = async (req, res) => {
  res.send(`Creating task`)
}

export const updateTask = async (req, res) => {
  res.send(`Updating task ${req.params.id}`)
}


export const deleteTask = async (req, res) => {
  res.send(`Deleting task ${req.params.id}`)
}
